<template>
  <v-layout column justify-center>
    <v-flex xs12>
      <v-card dark color="primary">
        <v-card-text>
          <v-textarea
            dark
            flat
            v-model="review_text"
            label="เขียนรีวิว"
            required
          ></v-textarea>
          <v-card-actions>
          คุณแนะนำซีรีส์เรื่องนี้หรือไม่&nbsp;<v-btn flat round color="success"><v-icon>thumb_up</v-icon> แนะนำ</v-btn> <v-btn flat round color="error"><v-icon>thumb_down</v-icon> ไม่แนะนำ</v-btn>
          <v-btn large color="secondary" @click="reviewSave">โพสต์รีวิว</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 v-for="(review, index) in reviews" :key="index">
      <v-card dark>
        <v-card-title>
         <v-avatar size="38"><v-img :src="review.user.avatar"></v-img></v-avatar>
          <v-chip color="success" v-if="review.recommend"><strong>&nbsp;{{ review.user.name }}</strong>&nbsp;<v-icon>thumb_up</v-icon>&nbsp;แนะนำ</v-chip>
          <v-chip color="error" v-else><strong>&nbsp;{{ review.user.name }}</strong>&nbsp;<v-icon>thumb_down</v-icon>&nbsp;ไม่แนะนำ</v-chip>
          <v-spacer></v-spacer>
          <v-menu name="more" bottom left>
            <v-btn
              slot="activator"
              dark
              icon
            >
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="reviewEditClick(index)">
                <v-list-tile-title>แก้ไข</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="reviewDel(review._id, index)">
                <v-list-tile-title>ลบ</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-divider dark></v-divider>
        <v-card-text>
          {{ review.reviewText }}
        </v-card-text>
        <v-card-actions>
          <span v-if="review.replyCount > 0"><v-icon>comment</v-icon>&nbsp;{{ review.replyCount }}</span>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-dialog v-model="replyDialog">

    </v-dialog>
    <v-dialog v-model="reviewEditDialog">
      <v-card dark color="primary">
        <v-card-text>
          <v-textarea
            dark
            flat
            v-model="currentEdit.reviewText"
            label="แก้ไขรีวิว"
            required
          ></v-textarea>
          <v-card-actions>
          แนะนำซีรีส์เรื่องนี้หรือไม่ <v-btn flat round color="success"><v-icon>thumb_up</v-icon> แนะนำ</v-btn> <v-btn flat round color="error"><v-icon>thumb_down</v-icon> ไม่แนะนำ</v-btn>
          <v-btn large color="secondary" @click="reviewEdit">แก้ไขรีวิว</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      valid: false,
      review_text: '',
      reviews: [],
      upvote: false,
      downvote: false,
      replyDialog: false,
      replyIndex: 0,
      reviewEditDialog: false,
      currentEdit: {
        _id: '',
        reviewText: '',
        index: ''
      }
    }
  },
  async asyncData ({ app }) {
    const reviews = await app.$axios.$get(process.env.restMongoUrl + '/reviews')
    return { reviews }
  },
  methods: {
    reviewEditClick (index) {
      this.currentEdit.reviewText = this.reviews[index].reviewText
      this.currentEdit._id = this.reviews[index]._id
      this.reviewEditDialog = true   
      this.currentEdit.index = index
    },
    reviewDel(id, index) {
      this.$axios.$delete(process.env.restMongoUrl + '/reviews/delete/' + id)
      this.reviews.splice(index, 1)
    },
    async reviewEdit () {
      const res = await this.$axios.$put(process.env.restMongoUrl + '/reviews/edit',
      { _id: this.currentEdit._id, reviewText: this.currentEdit.reviewText })
      this.reviews[this.currentEdit.index].reviewText = this.currentEdit.reviewText
      this.reviewEditDialog = false
    },
    async reviewInit (tmp) {
      const res = await this.$axios.$post(process.env.restMongoUrl + '/reviews/add', tmp)
    },
    async reviewSave () {
      const res = await this.$axios.$post(process.env.restMongoUrl + '/reviews/add', this.review)
      this.review_text = ''
    },
    reviewGet () {
      const res = this.$axios.$get(process.env.restMongoUrl + '/reviews')
    },
    reply (index) {
      this.replyIndex = index 
      this.replyDialog = true
    }
  },
  mounted () {
    const tmp = {
      user: {
        user_id: 1,
        avatar: 'https://materiell.com/wp-content/uploads/2015/03/doug_full1.png',
        name: 'Doug Clark'
      },
      reviewText: `แรกๆแฮซูมีความสุขมากตอนย้อนอดีตมาใหม่ๆตอนที่เป็นน้องเมียขององค์ชาย8 แต่พอหลังๆอะไรจะดราม่าขนาดนั้น ร้องไห้ตลอด สงสารมาก พวกองค์ชายคนอื่นๆก็เหมือนกัน ยิ่งตอนหลังๆที่ต้องตายแบบจ้องจะฆ่ากันเพื่อบังลลังก์โอยยยย ปวดใจเครียดตาม หายใจไม่ทั่วท้อง แต่ยังไงก็เป็นอีกเรื่องที่ชอบมากๆเลย ต้องฟินก็ฟิ๊นฟิน 
  ปล. องค์ชายสี่หมี่เกี๊ยวนี่หล่อทะลุหน้ากากมากกกกกกกกกกกกกก`,
      created: new Date(),
      updated: new Date(),
      recommend: true,
      like: 2,
      replyCount: 1,
      reply: [{
        user: {
          user_id: 2,
          avatar: 'http://www.machiseo.com/sites/default/files/styles/thumbnail/public/pictures/2018-08/Screen%20Shot%202560-09-18%20at%2017.01.42_0.png?itok=BeKMb_Ip',
          name: 'ballmdr'
        },
        replyText: 'ดีจริงดิ',
        created: new Date(),
        updated: new Date()
      }]
    }
    const tmp2 = {
      user: {
        user_id: 4,
        avatar: 'https://materiell.com/wp-content/uploads/2015/03/john-full.png',
        name: 'John Reeve'
      },
      reviewText: `เน่าเกิ๊น ดูแต่ไอ้ฉากถอดเสื้อนั่นแหละ`,
      created: new Date(),
      updated: new Date(),
      recommend: false,
      like: 0,
      replyCount: 0,
      reply: [{
        user: {
        },
        replyText: '',
        created: null,
        updated: null
      }]
    }
    const tmp3 = {
      user: {
        user_id: 3,
        avatar: 'https://materiell.com/wp-content/uploads/2015/04/susan-full.png',
        name: 'Susan C. Daniero'
      },
      reviewText: `เป็นเรื่องที่องค์ชายแต่ละคนดีงามมากๆ โดยเฉพาะองค์ชายสี่ทูนหัวของหม่อมชั้น
ติดตามมาตั้งแต่เวอร์ชั่นจีนแล้ว ปู้ปู้ จิงชิง มาเวอร์ชั่นเกาหลีโครงเรื่องมาแบบเวอร์ชั่นจีนก็จริงแต่ก็ต้องมานั่งลุ้นกันต่อ
ว่าจะมีจุดจบแบบไหน `,
      created: new Date(),
      updated: new Date(),
      recommend: true,
      like: 10,
      replyCount: 0,
      reply: [{
        user: {
        },
        replyText: '',
        created: null,
        updated: null
      }]
    }
    const listTmp = [tmp, tmp2, tmp3]
    for (let i=0;i<3;i++) {
      this.reviewInit(listTmp[i])
    }
  },
}
</script>

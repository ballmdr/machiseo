<template>
    <v-layout column>
      <v-divider></v-divider>
      <v-flex xs12>
        <h2>{{ listName }}</h2>
      </v-flex>
      <v-flex xs12>
        <v-layout row>
          <v-flex xs6>
            <div class="card-container">
              <section :class="'card card'+ (index+1)" v-for="(serie, index) in listSerie" :key="serie._id" v-if="index < 5">
                <img :src="baseUrl + serie.poster" />
              </section>
            </div>
          </v-flex>
          <v-flex xs6 style="overflow:scroll;">
            <v-form>
              <v-text-field label="ใส่ path /series/xxx" v-model="pathField"></v-text-field>
              <v-btn @click="addSerieList">เพิ่ม</v-btn>
            </v-form>
            <div v-for="(serie, index) in listSerie" :key="index">
              <a target="_blank" :href="'http://www.machiseo.com' + serie.path">{{ serie.title }}</a>
              <v-btn flat icon @click="deleteSerieInList(serie.uuid, index)"><v-icon>delete_outline</v-icon></v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
</template>

<script>
import { getSerieByUUID } from '~/assets/js/api'

export default {
  props: ['listID', 'listName'],   
  data() {
    return {
      listSerie: [],
      baseUrl: process.env.baseUrl,
      pathField: '',
      serie: null,
      drupalUUID: ''
    }
  },
  methods: {
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    deleteSerieInList(uuid, index) {
      this.$axios.$put(process.env.restMongoUrl + '/series/list/delete', {
        uuid: uuid,
        listID: this.listID
      })
      this.listSerie.splice(index, 1)
    },
    async checkSerieExist (path) {
      const drupal = await this.$axios.$get('/router/translate-path?path=' + path)
      const res = await this.$axios.$get(process.env.restMongoUrl + '/series/' + drupal.entity.uuid)
      if (res.length > 0) { 
        this.serie = res
        return true
      } else {
        this.drupalUUID = drupal.entity.uuid
        return false
      }
    },
    async addSerieList () {
      if (await this.checkSerieExist(this.pathField)) {
        this.$axios.$put(process.env.restMongoUrl + '/series/list/update',
        {
          listID: this.listID,
          uuid: this.serie[0].uuid
        })
        this.listSerie.push(this.serie[0])
      } else {
        const serie = await getSerieByUUID(this.drupalUUID)
        const serieMongo = 
        {
          title: serie.title,
          nid: serie.nid,
          uuid: serie.uuid,
          poster: serie.field_poster[0].url,
          path: serie.path.alias
        }
        this.$axios.$post(process.env.restMongoUrl + '/series/add', serieMongo)
        this.$axios.$put(process.env.restMongoUrl + '/series/list/update',
        {
          listID: this.listID,
          uuid: serie.uuid
        })
        this.listSerie.push(serieMongo)
      }
    }
  },
  created () {
    this.$axios.$get(process.env.restMongoUrl + '/list/admin/' + this.listID).then(res => {
      for (let i=0;i<res.length;i++) {
        this.listSerie.push(res[i])
      }
      this.listSerie = this.shuffle(this.listSerie)
    })
  }
}
</script>

<style lang="less" scoped>
.card1 {
    left:50%;
    margin-left:-13em;
    z-index:10;
    transform: rotateZ(-6deg);
    -moz-transform: rotateZ(-6deg);
    -webkit-transform: rotateZ(-6deg);
    transition: all 0.5s ease-out 0.3s;
}
.card2 {
    left:50%;
    margin-left:-12.5em;
    z-index:9;
    transform: rotateZ(-3deg);
    -moz-transform: rotateZ(-3deg);
    -webkit-transform: rotateZ(-3deg);
    transition: all 0.5s ease-out 0.3s;
}
.card3 {
    left:50%;
    margin-left:-11em;
    z-index:8;
    transform: rotateZ(3deg);
    -webkit-transform: rotateZ(3deg); 
    -moz-transform: rotateZ(3deg); 
    transition: all 0.5s ease-out;
}
.card4 {
    left:50%;
    margin-left:-9em;
    z-index:7;
    transform: rotateZ(7deg);
    -webkit-transform: rotateZ(7deg); 
    -moz-transform: rotateZ(7deg); 
    transition: all 0.5s ease-out;
}

.card5{
    left:50%;
    margin-left:-8em;
    z-index:6;
    transform: rotateZ(11deg);
    -webkit-transform: rotateZ(11deg); 
    -moz-transform: rotateZ(11deg); 
    transition: all 0.5s ease-out;
}

.card-container {
    position:relative;
    width: 18em;
    margin:1em auto;
    left:-10%;
}

.card {
    position:absolute;
    top:0;
    box-shadow: 1px 1px 7px rgba(0,0,0,.65); 
    border-radius:1em;
    padding:0em;
    overflow: hidden;
    backface-visibility: hidden;
    height:280px;
    background-color: purple;
}


.card-container:hover,
.card-container.hover {
    .card {
        opacity:0.9;
        transform: scale(0.95);
         -webkit-transform: scale(0.95);
        margin-left:-12em;
        &:hover,
        &.hover {
            opacity:1;   
            z-index:11;
                transform: scale(1);
         -webkit-transform: scale(1);
        }
    }

    .card2 {
        left:100%;  
    }
    .card3 {
         left:150%;
    }
				.card4 {
					left: 200%;
        }
        .card5 {
          left: 250%;
        }
    
}

.card img { 
  max-height:280px;
  max-width:200px;
}


</style>
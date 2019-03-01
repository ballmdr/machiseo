export default function({ store, app }){
    if (app.$auth.$state.loggedIn){
        const user = {}
        switch (app.$auth.$state.strategy) {
          case "facebook":
            user.sub_id = app.$auth.$state.strategy + '|' + app.$auth.$state.user.id
            user.name = app.$auth.$state.user.name
            user.picture = app.$auth.$state.user.picture.data.url
            user.email = app.$auth.$state.user.email
            break
          case "google":
            user.sub_id = app.$auth.$state.strategy + '|' + app.$auth.$state.user.sub
            user.name = app.$auth.$state.user.name
            user.picture = app.$auth.$state.user.picture
            user.email = app.$auth.$state.user.email
            break
        }
        console.log('user', user)
        store.dispatch('users/setUser', user)
    }
}
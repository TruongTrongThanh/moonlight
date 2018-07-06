import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    console.log('entry-server START --------------------------------------------------------')
    const { app, router, store } = createApp()
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes, reject with 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      let promises = matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({
            store, router
          })
        }
      })
      promises.push(store.dispatch('currentUser', {token: context.token}))

      Promise.all(promises)
      .then(() => {
        console.log(store.state)
        context.state = store.state
        resolve(app)
      })
      .catch(reject)
    }, reject)
  })
}
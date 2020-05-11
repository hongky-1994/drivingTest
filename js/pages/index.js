<<<<<<< HEAD
window.addEventListener('load' ,function(event) {  
  loadingView.show()
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      authModel.user = {
        name: user.displayName || authModel.user.name,
        email: user.email || null,
        photoUrl: user.photoURL || "./js/assets/images/anonymous-icon.png",
        emailVerified: user.emailVerified,
        uid: user.uid,
        isAnonymous: user.isAnonymous
      }
      layoutView.show(".header")
      push(window.location.hash.replace('#',''),'replace')
    } else {
      layoutView.hide(".header")
      push('signIn')
      authModel.user = {}
=======
firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    authModel.user = {
      name: user.displayName || authModel.user.name,
      email: user.email || null,
      photoUrl: user.photoURL || "./js/assets/images/anonymous-icon.png", //get url from userController?
      emailVerified: user.emailVerified,
      uid: user.uid,
      isAnonymous: user.isAnonymous
>>>>>>> a518b98504da83fc1f313fc51c4b5c0319fbd887
    }
  })
  loadingView.hide()
})


window.onpopstate = (popStateEvent) => {

  if (popStateEvent.state !== null) {
    let screen = popStateEvent.state.screen
    push(screen, 'no save history')
  } else {
    let screen = window.location.hash.split("#")[1]
    push(screen, 'no save history')
  }
}

// Khai báo các routes ở đây

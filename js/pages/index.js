firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    authModel.user = {
      name: user.displayName || null,
      email: user.email || null,
      photoUrl: user.photoURL || "./js/assets/images/anonymous-icon.png",
      emailVerified: user.emailVerified,
      uid: user.uid,
      isAnonymous: user.isAnonymous
    }
    userView.showScreen("user")
    layoutView.show(".header")
    
  } else {
    authModel.user = {}
    layoutView.hide(".header")
    authView.showScreen("signIn")
  }
})
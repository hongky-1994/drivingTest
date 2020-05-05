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
    userView.showScreen("user")

  } else {
    authModel.user = {}
    layoutView.hide(".header")
    authView.showScreen("signIn")
  }
})
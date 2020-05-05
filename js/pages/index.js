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

    // check current path 
    const current =  localStorage.getItem("currentLocation")
    layoutView.show(".header")
    console.log("Location", current)

    switch (current) {
      case "testType":
        examView.showScreen('testType')
        console.log("Open test type")
        break;
      
      
      default:
        userView.showScreen("user")
        break;
    }


  } else {
    authModel.user = {}
    layoutView.hide(".header")
    authView.showScreen("signIn")
  }
})


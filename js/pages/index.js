firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; 
    authModel.user = {name, email, photoUrl, emailVerified, uid}
    mainView.showScreen("main")
  } else {
    authModel.user = {}
    authView.showScreen("signIn")
  }
})
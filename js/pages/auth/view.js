const authView = {
  showScreen: (screen) => {
    console.log("Show screen ", screen)
    const app = document.querySelector("#app")
    app.innerHTML = authComponents[screen]
  },
  signIn: (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    if(authView.validateAuthentication('signIn', {email, password})) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=>{
          authView.openModal(true,"Thông báo" ,"Đăng nhập thành công")
          mainView.showScreen("main")
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          authView.openModal(true, errorCode, errorMessage)
        })
    }
  },
  signUp: (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value
    const rePassword = e.target.rePassword.value

    if(authView.validateAuthentication("signUp",{email, password, rePassword})) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(()=>{
          console.log("loioioioi roi ")
          authView.openModal(true,"Thông báo" ,"Đăng ký thành công")
          authView.showScreen("signIn")
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          authView.openModal(true, errorCode, errorMessage)
        })
        

    }
  },
  signOut: () => {
    firebase.auth().signOut()
    authModel.user = {}
  },
  openModal: (open, title, content) => {
    const modal = document.querySelector(".modal__container")
    if(open) {
      console.log("OPEN MODAL RUN")
      modal.innerHTML = authComponents.modal
      
      // Pass data to modal
      const modalTitle = document.querySelector(".modal-title")
      const modalContent = document.querySelector('.modal-body>p')
      modalTitle.innerHTML = title
      modalContent.innerHTML = content

      // No scroll white open modal
      document.body.style.position = 'fixed';
      document.body.style.width = '100vw';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      modal.innerHTML = ''

      // Keep position after close modal
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  },
  validateAuthentication : (action, data) => {
    if(action === "signIn") {
      const {email, password} = data
      
      // check email 
      if(!email || !email.includes("@")) {
        authView.showError(".error__email", "Vui lòng nhập đúng định dạng email.")
        return false
      } else {
        authView.showError(".error__email", "")
      }

      // check password
      if(!password) {
        authView.showError(".error__password", "Vui lòng nhập mật khẩu.")
        return false
      } else {
        authView.showError(".error__password", "")
      }

      // no error return true
      return true
    }

    if(action === "signUp") {
      const {email, password, rePassword} = data
      let checkeResult = true

      // check email
      if(!email || !email.includes("@")) {
        authView.showError(".error__email", "Vui lòng nhập đúng định dạng email.")
        checkeResult = false
      } else {
        authView.showError(".error__email", "")
      }

      // check password 
      if(!password || password.length < 6) {
        authView.showError(".error__password", "Mật khẩu dài hơn 6 ký tự.")
        checkeResult = false
      } else {
        authView.showError(".error__password", "")
      }
      
      // check repassword
      if(password !== rePassword) {
        authView.showError(".error__rePassword", "Nhập lại mật khẩu không trùng khớp")
        checkeResult = false
      } else {
        authView.showError(".error__rePassword", "")
      }

      return checkeResult
    }
  },
  showError : (query, message) => {
    const target = document.querySelector(query)
    target.innerHTML = message
  }
  
}
const authView = {
  showScreen: (screen) => {
    const app = document.querySelector(".app-container")
    app.innerHTML = authComponents[screen]
  },
  
  signIn: (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    if (authView.validateAuthentication('signIn', {email,password})) {
      loadingView.show()
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          authView.openModal(true, "Thông báo","success", "Đăng nhập thành công")
          // userView.showScreen("user", 'user')
          push('user')
          loadingView.hide()

        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          authView.openModal(true, errorCode,"error", errorMessage)
          loadingView.hide()
        })
    }
  },
  
  signUp: (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const name = e.target.name.value
    const password = e.target.password.value
    const rePassword = e.target.rePassword.value
    authModel.user = {name};

    if (authView.validateAuthentication("signUp", {
        email,
        name,
        password,
        rePassword
      })) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          authView.openModal(true, "Thông báo", "success", "Đăng ký thành công")
        })
        .catch(error => authView.openModal(true, error.code, "error", error.message))
    
    }
  },
  
  signAnonymouse: () => {
    firebase.auth().signInAnonymously()
    .then(
      authView.openModal(true, "Đăng nhập", "success", `Đăng nhập ẩn danh thành công`)
    )
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      authView.openModal(true, errorCode, "error", errorMessage)
    });
  },
  
  signOut: () => {
    firebase.auth().signOut()
    localStorage.clear()    
    authModel.user = {}
  },
  
  resetPassword: (e) => {
    e.preventDefault()
    // var auth = firebase.auth();
    const emailAddress = e.target.email.value

    console.log('email to reset', emailAddress)


    if (authView.validateAuthentication("resetPassword", emailAddress)) {

      firebase.auth()
        .sendPasswordResetEmail(emailAddress)
        .then(() => {
            authView.openModal(true, "Thông báo","success",`Đã gửi email thay đổi mật khẩu về hòm thư "${emailAddress}". Vui lòng kiểm tra hòm thư của bạn`)
            authView.showScreen('signIn')
          })

        .catch(error => authView.openModal(true, error.code, "error", error.message));
    }
  },
  
  openModal: (open, title, icon, content) => {
    const modal = document.querySelector(".modal__container")
    if (open) {
      console.log("OPEN MODAL RUN")
      modal.innerHTML = authComponents.modal

      // Pass data to modal
      const modalTitle = document.querySelector(".modal-title")
      const modalContent = document.querySelector('.modal-body>p')
      const modalIcon = document.querySelector('.modal-icon')

      modalTitle.innerHTML = title
      modalContent.innerHTML = content
      switch (icon) {
        case "success": {
          modalIcon.innerHTML = `<i class="fas fa-check-circle fa-5x mb-3 text-success"></i>`
          break
        }
        case "error": {
          modalIcon.innerHTML = `<i class="fas fa-times-circle fa-5x mb-3 text-danger"></i>`
          break
        }
        default:{
          modalIcon.innerHTML = ""
        }
      }

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
  
  validateAuthentication: (action, data) => {
    switch (action) {
      case "signIn":{
        const { email,password } = data
        const checkeResult = [
          authView.validate(!email || !email.includes("@"),".error__email", "Vui lòng nhập đúng định dạng email."),
          authView.validate(!password,".error__password", "Vui lòng nhập mật khẩu.")
        ] 
        // no error return true
        return authView.allPassed(checkeResult)
      }
        
      case "signUp": {
        const { email, name, password, rePassword } = data
        const checkeResult = [
          authView.validate(!email || !email.includes("@"),".error__email", "Vui lòng nhập đúng định dạng email."),
          authView.validate(!name,".error__name", "Vui lòng nhập tên của bạn."),
          authView.validate(!password || password.length < 6,".error__password", "Mật khẩu dài hơn 6 ký tự."),
          authView.validate(password !== rePassword,".error__rePassword", "Nhập lại mật khẩu không trùng khớp")
        ]
        return authView.allPassed(checkeResult)
      }
      case "resetPassword": {
        const email = data
        return authView.validate(!email || !email.includes("@"),".error__email", "Vui lòng nhập đúng định dạng email.")
      }
      default:
        break;
    }
  },
  
  showInputError: (query, message) => {
    const target = document.querySelector(query)
    target.innerHTML = message
  },
  
  validate: (condition, queryLogError, errorMessage) => {
    if(condition) {
      authView.showInputError(queryLogError,errorMessage)
      return false
    } 
    authView.showInputError(queryLogError,"")
    return true
  },
  
  allPassed: (validateResult) => {
    for(let result of validateResult){
        if(!result){
            return false
        }
    }
    return true
  }   

}
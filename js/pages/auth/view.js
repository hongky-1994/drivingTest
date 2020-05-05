const authView = {
  showScreen: (screen) => {
    console.log("Show screen ", screen)
    const app = document.querySelector(".app-container")
    app.innerHTML = authComponents[screen]
  },
  signIn: (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    if (authView.validateAuthentication('signIn', {
        email,
        password
      })) {
      loadingView.show()
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          authView.openModal(true, "Thông báo","success", "Đăng nhập thành công")
          userView.showScreen("user")
          console.log("Open user page")
          layoutView.saveLocation("userPage")
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
    if (action === "signIn") {
      const { email,password } = data
      let checkeResult = true

      // check email 
      if (!email || !email.includes("@")) {
        authView.showInputError(".error__email", "Vui lòng nhập đúng định dạng email.")
        checkeResult = false
      } else {
        authView.showInputError(".error__email", "")
      }

      // check password
      if (!password) {
        authView.showInputError(".error__password", "Vui lòng nhập mật khẩu.")
        checkeResult = false
      } else {
        authView.showInputError(".error__password", "")
      }

      // no error return true
      return checkeResult
    }

    if (action === "signUp") {
      const {
        email,
        name,
        password,
        rePassword
      } = data
      let checkeResult = true

      // check email
      if (!email || !email.includes("@")) {
        authView.showInputError(".error__email", "Vui lòng nhập đúng định dạng email.")
        checkeResult = false
      } else {
        authView.showInputError(".error__email", "")
      }

      if (!name) {
        authView.showInputError(".error__name", "Vui lòng nhập tên của bạn.")
        checkeResult = false
      } else {
        authView.showInputError(".error__name", "")
      }

      // check password 
      if (!password || password.length < 6) {
        authView.showInputError(".error__password", "Mật khẩu dài hơn 6 ký tự.")
        checkeResult = false
      } else {
        authView.showInputError(".error__password", "")
      }

      // check repassword
      if (password !== rePassword) {
        authView.showInputError(".error__rePassword", "Nhập lại mật khẩu không trùng khớp")
        checkeResult = false
      } else {
        authView.showInputError(".error__rePassword", "")
      }

      return checkeResult
    }
  },
  showInputError: (query, message) => {
    const target = document.querySelector(query)
    target.innerHTML = message
  }

}
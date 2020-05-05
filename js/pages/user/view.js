const userView = {
    showScreen: (screen) => {
        let app = document.querySelector('.app-container')
        console.log("app",app)

        switch (screen) {
            case 'user':{
                app.innerHTML = userComponents.user

                userView.showCurrentUserInfo()

                //su kien: sign-out
                let btnSignOut = document.querySelector('.btn-sign-out')
                btnSignOut.onclick = function(){
                    userController.signOut()
                } 

                //su kien: load test history from firestore -> display

                //su kien: edit email -> display modal
                let btnEditEmail = document.querySelector('.icon-email')
                let modalEditEmail = document.querySelector('.modal-edit-email')
                let closeModal = document.querySelector('.close-modal-edit-email')
                let submitModal = document.querySelector('.submit-modal-edit-email') 
                let formEditEmail = document.querySelector('.form-input-edit-email') 
                btnEditEmail.onclick = function(){
                    //display modal
                    modalEditEmail.style.display = "block"
                }
                closeModal.onclick = function(){
                    modalEditEmail.style.display = "none"
                    userView.setText('#input-email-error', '')
                    userView.setText('#input-password-error', '')
                }
                submitModal.onclick = function(event){
                    event.preventDefault()
                    userView.validateEditEmail()

                    // modalEditEmail.style.display = "none"
                    // userView.showScreen('user')
                }
                formEditEmail.onsubmit = function(event){
                    event.preventDefault()

                    userView.validateEditEmail()
                }
                window.onclick = function(){
                    if(this.event.target == modalEditEmail){
                        modalEditEmail.style.display = "none"
                        userView.setText('#input-email-error', '')
                        userView.setText('#input-password-error', '')
                    }
                }
                break;
            }
            default : {return}
        
        }
    },
    
    //functions in use
    showCurrentUserInfo: () => {
        //display user email
        let userEmailHtml = document.querySelector('.user-email-html')
        let currentEmail = firebase.auth().currentUser.email || ""
<<<<<<< HEAD
        console.log(currentEmail)
=======
        // console.log(currentEmail)
>>>>>>> 63706ea4ed35cc1a8227e48f16ae2a8c3d37b0d8
        userEmailHtml.innerHTML += currentEmail
    },
    validateEditEmail: () => {
        //get data
        let modalEditEmail = document.querySelector('.modal-edit-email')
        let formEditEmail = document.querySelector('.form-input-edit-email')
        let inputInfo = {
            email: formEditEmail.currentEmail.value.trim().toLowerCase(),
            password: formEditEmail.currentPassword.value,
        }
        console.log(inputInfo);
        
        //validate data
        let validateResult = [
            userView.validate(inputInfo.email, '#input-email-error', "Missing email"),
            userView.validate(inputInfo.password, '#input-password-error', "Missing password")
        ]

        //submit data
        if(userView.allPassed(validateResult)){
            modalEditEmail.style.display = "none"
            userView.setText('#input-email-error', '')
            userView.setText('#input-password-error', '')
            userController.editEmail(inputInfo.email, inputInfo.password)
            console.log("submitted to userController")
        }else{
            modalEditEmail.style.display = "block"
        }
    },


    validate: (condition, queryError, messageError) => {    //validate input
        if(condition){
            userView.setText(queryError, '')
            return true
        }else{
            userView.setText(queryError, messageError)
            return false
        }
    },
    setText: (query, text) => {
        document.querySelector(query).innerHTML = text
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
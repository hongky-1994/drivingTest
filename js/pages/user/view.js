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
                let btnEditPassword = document.querySelector('.icon-password')
                let modalEditPassword = document.querySelector('.modal-edit-password')
                let closeModal = document.querySelector('.close-modal-edit-password')
                let submitModal = document.querySelector('.submit-modal-edit-password') 
                let formEditPassword = document.querySelector('.form-input-edit-password') 
                btnEditPassword.onclick = function(){
                    //display modal
                    modalEditPassword.style.display = "block"
                }
                closeModal.onclick = function(){
                    modalEditPassword.style.display = "none"
                    //clear message error
                    userView.setText('#input-current-password-error', '')
                    userView.setText('#input-new-password-error', '')
                    userView.setText('#input-confirm-new-password-error', '')

                    //clear input
                    formEditPassword.currentPassword.value = ''
                    formEditPassword.newPassword.value = ''
                    formEditPassword.confirmNewPassword.value = ''
                }
                submitModal.onclick = function(event){
                    event.preventDefault()
                    userView.validateEditPassword()
                }
                formEditPassword.onsubmit = function(event){
                    event.preventDefault()

                    userView.validateEditPassword()
                }
                window.onclick = function(){
                    if(this.event.target == modalEditPassword){
                        modalEditPassword.style.display = "none"
                        //clear message error
                        userView.setText('#input-current-password-error', '')
                        userView.setText('#input-new-password-error', '')
                        userView.setText('#input-confirm-new-password-error', '')

                        //clear input
                        formEditPassword.currentPassword.value = ''
                        formEditPassword.newPassword.value = ''
                        formEditPassword.confirmNewPassword.value = ''
                    }
                }

                let btnEditProfileImage = document.querySelector('.user-profile-icon')
                let btnSubmitProfileImage = document.querySelector('.btn-submit-user-image')


                btnEditProfileImage.onclick = function(){
                    btnSubmitProfileImage.style.display = "block"
                    const file = document.querySelector('#photo').files[0]
                    if(file){
                        btnSubmitProfileImage.onsubmit = userController.editProfileImage(file)
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
        userEmailHtml.innerHTML += currentEmail

        //display profile image
        let profileImage = document.querySelector('.user-image')
        let storageRef = firebase.storage().refFromURL("gs://driving-test-exam.appspot.com/")
        let listRef = storageRef.child(`user-image/${currentEmail}`)

        listRef.listAll().then((res)=>{
            if(res.items.length){
                let item = res.items[0]
                item
                .getDownloadURL()
                .then(url => {
                    profileImage.style.backgroundImage = `url('${url}')`
                })
                //pick the earliest url in the (???)
            }else{
                profileImage.style.backgroundImage = "url('https://vn112.com/wp-content/uploads/2018/01/1516131509lc4p8.jpg')"
            }
        })
    },
    validateEditPassword: () => {
        //get data
        let modalEditPassword = document.querySelector('.modal-edit-password')
        let formEditPassword = document.querySelector('.form-input-edit-password')
        let inputInfo = {
            //need current password to reauthenticate
            currentPassword: formEditPassword.currentPassword.value,
            newPassword: formEditPassword.newPassword.value,
            confirmNewPassword: formEditPassword.confirmNewPassword.value,
        }
        
        //validate data
        let validateResult = [
            userView.validate(inputInfo.currentPassword, '#input-current-password-error', "Missing current password"),
            userView.validate(inputInfo.newPassword, '#input-new-password-error', "Missing new password"),
            userView.validate(inputInfo.confirmNewPassword==inputInfo.newPassword, '#input-confirm-new-password-error', "Confirm password not match")
        ]

        //submit data
        if(userView.allPassed(validateResult)){
            modalEditPassword.style.display = "none"
            userView.setText('#input-current-password-error', '')
            userView.setText('#input-new-password-error', '')
            userView.setText('#input-confirm-new-password-error', '')

            formEditPassword.currentPassword.value = ''
            formEditPassword.newPassword.value = ''
            formEditPassword.confirmNewPassword.value = ''
            userController.editPassword(inputInfo.currentPassword ,inputInfo.newPassword)
        }else{
            modalEditPassword.style.display = "block"
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
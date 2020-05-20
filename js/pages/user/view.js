const userView = {
    showScreen: (screen) => {
        let app = document.querySelector('.app-container')
        // userController.addNewUser()
        switch (screen) {
            case 'user':{
                app.innerHTML = userComponents.user
                userView.showCurrentUserInfo()

                //su kien: sign-out
                let btnSignOut = document.querySelector('.btn-sign-out')
                btnSignOut.onclick = function(){
                    authView.signOut()
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
                    userView.submitToValidate()
                }
                formEditPassword.onsubmit = function(event){
                    event.preventDefault()

                    userView.submitToValidate()
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
                        btnSubmitProfileImage.onchange = userController.editProfileImage(file)
                    }
                }


                ////////see history///////
                let seeHistory = document.querySelector('.test-history-see-all')
                seeHistory.onclick = function(){
                    userView.showScreen('history')
                }

                break
            }
            case 'dang test' /*'history'*/:{
                app.innerHTML = userComponents.history
                // userController.uploadTestToFirebase();
                break
            }
            case 'history': {
                console.log("đang ở trang history")
                examModel.currentPage = "resultDetail"
                examModel.list30Question = [] 
                userController.getTestFromFirebaseToExamModel(0/*index*/) //sẽ add event vào button chọn test
                .then(console.log("đã lấy đủ data về"))
                .then(() => {
                    Promise.all(examController.getQuestionObject())
                    .then(() => {
                        app.innerHTML = examComponents.resultDetail
                        examView.showQuestionBoxes() // không phụ thuộc
                        examView.showFirstQuestion() 
                        //showQuestion //phải lấy list30Question done
                        //changeCurrentQuestionBoxColor 
                        //changeCorrectAndWrongAnswerColor // phải cập nhật thisQuestionName (lấy từ examController), phải có list30Question và list30Answer
                        //changeCorrectAndWrongQuestionBoxColor // phải cập nhật answerNotCorrect
                        examView.setUpButtons()
                        //có hàm Savethisquestionname   
                    })
                })  
                break
            }

            default : {return}
        }
    },
    
    //functions in use
    showCurrentUserInfo:() => {
        //display user email
        let userEmailHtml = document.querySelector('.user-email-html')
        let user = firebase.auth().currentUser
        let profileImage = document.querySelector('.user-image')
        let profileIcon = document.querySelector('.user-profile-icon')
        let userNameHtml = document.querySelector('.user-greetings-content')

        const {email, name, photoURL} = user
        userEmailHtml.innerHTML = email
        userNameHtml.innerHTML += name
        //display profile image
        if(photoURL==null){
            profileIcon.style.display = "none"
            profileImage.style.backgroundImage = "url('./js/assets/images/anonymous-icon.png')" 
            profileImage.onmousemove = function(){
                profileIcon.style.display = "block"
            }
            profileImage.onmouseout = function(){
                profileIcon.style.display = "none"
            }
        }else{
            profileImage.style.backgroundImage = `url('${photoURL}')`
        }
    },
    
    submitToValidate: () => {
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
    },
    
    
}
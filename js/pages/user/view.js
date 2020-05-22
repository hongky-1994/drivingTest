const userView = {
    showScreen: async (screen) => {
        let app = document.querySelector('.app-container')
        switch (screen) {
            case 'user':{
                app.innerHTML = userComponents.user
                userView.showCurrentUserInfo()
                await userController.getTestFromFirebase()
                userView.showShortenHistory()
                let email = firebase.auth().currentUser.email
                userController.addNewUser(email)
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
                let modalHistory = document.querySelector('.modal-show-history')
                let seeHistory = document.querySelector('.test-history-see-all')
                seeHistory.onclick = function(){
                    modalHistory.style.display = "block"
                        userView.displayHistory()
                        userController.addHistoryElementEvent()   
                }

                break
            }
            case 'dang test' /*'history'*/:{
                app.innerHTML = userComponents.history
                // userController.uploadTestToFirebase();
                break
            }
            case 'history': {
                examModel.currentPage = "resultDetail"
                examModel.list30Question = [] 
                Promise.all(examController.getQuestionObject())
                .then(() => {
                    app.innerHTML = examComponents.resultDetail
                    examView.showQuestionBoxes() 
                    examView.showFirstQuestion() 
                    examView.setUpButtons()
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
    displayHistory: () => {
        let historyContent = document.querySelector(".history-content")
        historyContent.innerHTML = ''
        userModel.testData.forEach((element, index) => {
            historyContent.innerHTML += `
                <div class = "history-tests history-${index}">
                    <div class= "history-test-type">${element.testType}</div>
                    <div class= "history-test-score">Điểm số: ${element.correctAnswers}/30</div>
                    <div class= "history-test-total-time">Tổng thời gian: ${element.testTotalTime[0] + ':' + element.testTotalTime[1] }</div>
                    <div class= "history-submit-at">Nộp lúc: ${moment.utc(element.submitAt).local().format('HH:mm:ss - DD/MM/YYYY')}</div>
                </div>
            `
            // let historyElement = document.querySelector(`.history-${index}`)
            // historyElement.addEventListener("click",() => {
            //     userController.getSelectedTest(index)
            //     userView.showScreen('history')
            // }) 
        })
    },
    closeModal: (selector) => {
        let modal = document.querySelector(selector)
        modal.style.display = "none"
    },
    showShortenHistory: () => {
        let t1r2c1 =  document.querySelector('.table-1-row-2-col-1')
        let t1r2c2 =  document.querySelector('.table-1-row-2-col-2')
        let t1r2c3 =  document.querySelector('.table-1-row-2-col-3')
        let t1r3c1 =  document.querySelector('.table-1-row-3-col-1')
        let t1r3c2 =  document.querySelector('.table-1-row-3-col-2')
        let t1r3c3 =  document.querySelector('.table-1-row-3-col-3')
        t1r2c1.innerHTML = userModel.testData[0].testType
        t1r3c1.innerHTML = userModel.testData[1].testType
        t1r2c2.innerHTML = userModel.testData[0].correctAnswers + '/30'
        t1r3c2.innerHTML = userModel.testData[1].correctAnswers + '/30'
        t1r2c3.innerHTML = moment.utc(userModel.testData[0].submitAt).local().format('HH:mm:ss - DD/MM/YYYY')
        t1r3c3.innerHTML = moment.utc(userModel.testData[1].submitAt).local().format('HH:mm:ss - DD/MM/YYYY')
    }
    
}
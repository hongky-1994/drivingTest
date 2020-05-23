const userView = {
    showScreen: async (screen) => {
        let app = document.querySelector('.app-container')
        switch (screen) {
            case 'user':{
                app.innerHTML = userComponents.user
                userView.showCurrentUserInfo()
                await userController.getTestFromFirebase()
                userView.showShortenHistory()
                const email = firebase.auth().currentUser.email
                userController.addNewUser(email)

                // listen to UPDATE IMAGE 
                const btnEditProfileImage = document.querySelector('.custom-file-input')
                btnEditProfileImage.addEventListener('change', (event) => {
                    const file = event.target.files[0]
                    if(file) userController.editProfileImage(file)
                })
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
        const {email, name, photoURL} = authModel.user

        //Select all DOM
        const userEmailHtml = document.querySelector('.user-email-html')
        const userNameHtml = document.querySelector('.user-greetings-content')
        const url = photoURL || './js/assets/images/anonymous-icon.png'
        loadingView.imgLoading('.image_holder', url)
        userEmailHtml.innerHTML = `Email: ${email|| "Chưa cập nhật email"}` 
        userNameHtml.innerHTML = `Xin chào, ${name || "Người lạ"}`
    },
    
   
    setText: (query, text) => {
        document.querySelector(query).innerHTML = text
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
    showShortenHistory: () => {
        let t1r2c1 =  document.querySelector('.table-1-row-2-col-1')
        let t1r2c2 =  document.querySelector('.table-1-row-2-col-2')
        let t1r2c3 =  document.querySelector('.table-1-row-2-col-3')
        let t1r3c1 =  document.querySelector('.table-1-row-3-col-1')
        let t1r3c2 =  document.querySelector('.table-1-row-3-col-2')
        let t1r3c3 =  document.querySelector('.table-1-row-3-col-3')
        // t1r2c1.innerHTML = userModel.testData[0].testType
        // t1r3c1.innerHTML = userModel.testData[1].testType
        // t1r2c2.innerHTML = userModel.testData[0].correctAnswers + '/30'
        // t1r3c2.innerHTML = userModel.testData[1].correctAnswers + '/30'
        // t1r2c3.innerHTML = moment.utc(userModel.testData[0].submitAt).local().format('HH:mm:ss - DD/MM/YYYY')
        // t1r3c3.innerHTML = moment.utc(userModel.testData[1].submitAt).local().format('HH:mm:ss - DD/MM/YYYY')
    },



    //Modal edit các thể loại 
    openModalEditPassword: (open) => {
        // get DOM
        const modal = document.querySelector(".modal__container")
        // pass Data
        modal.innerHTML = open ? userComponents.modelEditPassword : ""
    },
    openModalUpdateOption: (open) => {
        const modal = document.querySelector(".modal__container")
        modal.innerHTML = open ? userComponents.modal : ""
    },
    
    openModalHistory: (open) => {
        //get DOM
        const modal = document.querySelector(".modal__container")
        //pass Data
        modal.innerHTML = open ? userComponents.modelHistory : ""
        console.log(modal.innerHTML)
    }
}
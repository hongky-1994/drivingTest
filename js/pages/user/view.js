const userView = {
    showScreen: async (screen) => {
        let app = document.querySelector('.app-container')
        switch (screen) {
            case 'user':{
                app.innerHTML = userComponents.user
                userView.showCurrentUserInfo()
                const email = firebase.auth().currentUser.email
                await userController.addNewUser(email)
                await userController.getTestFromFirebase()
                userView.showShortenHistory()

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
    
    //HIstory table
    showShortenHistory: () => {
        //get all DOM
        tableHistory = document.querySelector(".user-test-history table tbody")
        if (!userModel.testData) userModel.testData = []
        tableHistory.innerHTML = ""
        for (let index = 0; index <= 5; index++) {
            const item = userModel.testData[index];
            if (item) tableHistory.innerHTML +=   `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.submitAt.substring(0, 10)}</td>
                    <td>${item.testType}</td>
                    <td>${item.answerResult.filter(v=>v).length}/30</td>
                </tr>
            `
        }
        if (!userModel.testData.length) tableHistory.innerHTML = `
        <tr>
            <td span="4" class='text-center color--grey3'>Chưa có dữ liệu bài thi</td>
        </tr>`

    },
    displayHistory: () => {
        let historyContent = document.querySelector(".history-content")
        historyContent.innerHTML = ''
        userModel.testData.forEach((element, index) => {
            historyContent.innerHTML += `
                <tr class = "test__record">
                    <td class="small test__record-time">${moment.utc(element.submitAt).local().format('DD/MM/YYYY - HH:mm')}</td>
                    <td class="small test__record-type">${element.testType}</td>
                    <td class="small test__record-score">${element.answerResult.filter(v=>v).length}/30</td>
                    <td class="small test__record-total-time">${element.testTotalTime[0] + ':' + element.testTotalTime[1] }</td>
                    <td class="small test__recode-action color--blue1 color--hover--purple1"
                        onclick="userView.showDetailHistoryRecord(${index})"
                    >Xem chi tiết</td>
                </tr>
            `
        })
    },
    showDetailHistoryRecord: (index) => {
        // prepair data to show detail
        examModel.answerResult = userModel.testData[index].answerResult,
        examModel.list30Answer = userModel.testData[index].list30Answer,
        examModel.list30Index = userModel.testData[index].list30Index,
        examModel.list30Question = userModel.testData[index].list30Question,
        examModel.submitAt = userModel.testData[index].submitAt,
        examModel.testTotalTime = userModel.testData[index].testTotalTime,
        examModel.testType = userModel.testData[index].testType,

        // Show detail and close modal
        userView.openModalHistory(false)
        examView.showScreen('resultDetail')

    },

    //Modal edit các thể loại 
    openModalUpdateOption: (open) => {
        const modal = document.querySelector(".modal__container")
        modal.innerHTML = open ? userComponents.modal : ""
    },
    openModalEditPassword: (open) => {
        // get DOM
        const modal = document.querySelector(".modal__container")
        // pass Data
        modal.innerHTML = open ? userComponents.modelEditPassword : ""
    },
    openModalEditProfile: (opem) => {
        //get DOM
        const modal = document.querySelector(".modal__container")
        //pass Data
        modal.innerHTML = open ? userComponents.modelEditProfile : ""
        if( open ) {
            document.querySelector('.input__displayName').defaultValue = authModel.user.name
            document.querySelector('.input__photoURL').defaultValue = authModel.user.photoURL
        }
    },
    openModalHistory: (open) => {
        //get DOM
        const modal = document.querySelector(".modal__container")
        //pass Data
        modal.innerHTML = open ? userComponents.modelHistory : ""
        open && userView.displayHistory()
    }
}

 
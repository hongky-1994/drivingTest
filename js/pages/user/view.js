const userView = {
    showScreen: async (screen) => {
        let app = document.querySelector('.app-container')
        switch (screen) {
            case 'user':{
                app.innerHTML = userComponents.user
                userView.showCurrentUserInfo()
                const email = firebase.auth().currentUser.email
                if(!authModel.user.isAnonymous){
                    await userController.addNewUser(email)
                    await userController.getTestFromFirebase()
                }
                userView.showShortenHistory()
                userView.showShortenSumUp()
                userView.showNeedPractise()
                // listen to UPDATE IMAGE 
                const btnEditProfileImage = document.querySelector('.custom-file-input')
                btnEditProfileImage.addEventListener('change', (event) => {
                    const file = event.target.files[0]
                    if(file) userController.editProfileImage(file)
                })
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
   

    //Modal edit các thể loại 
    openModalUpdateOption: (open) => {
        const modal = document.querySelector(".modal__container")
        
        if (authModel.user.isAnonymous) {
            modal.innerHTML = open ? userComponents.modelAnonymous : ""
        } else {
            modal.innerHTML = open ? userComponents.modal : ""
        }
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
    },
    openModelSumUp: (open) => {
        //get DOM
        const modal = document.querySelector(".modal__container")
        //pass Data
        modal.innerHTML = open ? userComponents.modelSumUp : ""
        open && userView.displaySumUp()
    },
    openNeedPractise: (open) => {
        //get DOM
        const modal = document.querySelector(".modal__container")
        //pass Data
        modal.innerHTML = open ? userComponents.modelNeedPractise : ""
        open && userView.displayNeedPractise()
    },

    //Hiển thị nội dung trong bảng chi tiết
    displayHistory: () => {
        let historyContent = document.querySelector(".history-content")
        historyContent.innerHTML = ''
        userModel.testData.length 
        ? userModel.testData.forEach((element, index) => {
            historyContent.innerHTML += `
                <tr class = "test__record">
                    <td class="small test__record-time">${moment.utc(element.submitAt).local().format('DD/MM/YYYY - HH:mm')}</td>
                    <td class="small test__record-type">${element.testType}</td>
                    <td class="small test__record-score">${element.testScore|| element.answerResult.filter(v=>v).length}/30</td>
                    <td class="small test__record-total-time">${element.testTotalTime[0] + ':' + element.testTotalTime[1] }</td>
                    <td class="small test__recode-action color--blue1 color--hover--purple1"
                        onclick="userView.showDetailHistoryRecord(${index})"
                    >Xem chi tiết</td>
                </tr>
            `
        })
        : historyContent.innerHTML += `
            <tr>
                <td colspan="5" class='text-center color--grey3'>Chưa có dữ liệu bài thi</td>
            </tr>`
    },
    displaySumUp: () => {
        let historyContent = document.querySelector(".history-content")
        historyContent.innerHTML = ''
        userModel.sumUp.forEach((element) => {
            historyContent.innerHTML += `
                <tr class = "test__record">
                    <td class="small">${element.name}</td>
                    <td class="small">${element.value}</td>
                </tr>
            `
        })
    },
    displayNeedPractise: () => {
        let historyContent = document.querySelector(".history-content")
        historyContent.innerHTML = ''
        userModel.calculateResult.forEach(element => {
            historyContent.innerHTML += `
                <tr class = "test__record">
                    <td class="small ">${element.category}</td>
                    <td class="small ">${element.fail}</td>
                    <td class="small ">${element.done}</td>
                    <td class="small ">${Math.floor(element.fail*10000/element.done)/100 || 0}%</td>
                </tr>
            `
        })
    },

    //Thống kê và hiển thị bảng nhỏ
    showShortenHistory: () => {
        //get all DOM
        tableHistory = document.querySelector(".user-test-history table tbody")
        if (!userModel.testData) userModel.testData = []
        tableHistory.innerHTML = ""
        for (let index = 0; index < 2; index++) {
            const item = userModel.testData[index];
            if (item) tableHistory.innerHTML +=   `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.submitAt.substring(0, 10)}</td>
                    <td>${item.testType}</td>
                    <td>${item.testScore || item.answerResult.filter(v=>v).length}/30</td>
                </tr>
            `
        }
        if (!userModel.testData.length) tableHistory.innerHTML = `
        <tr>
            <td colspan="4" class='text-center color--grey3'>Chưa có dữ liệu bài thi</td>
        </tr>`

    },
    showShortenSumUp: () => {
        const {testData} = userModel
        // caculation result
        const numberTakingTest = testData.length
        const maxScoreTime = testData.filter(item => item.testScore === 30).length        
        const passTestTime = testData.filter(item => item.testScore >= 26).length        
        let last10Test = []
        if(testData.length > 10) {
            last10Test = Array.from(testData.slice(testData.length - 10), item => item.testScore || 0)
        } else { last10Test = Array.from(testData,item => item.testScore || 0)}

        const averageScore = Math.floor(last10Test.reduce((a,b) => a + b, 0) / last10Test.length)

        // show sumUP
        const sumUpTableBody = document.querySelector('.user-pros table tbody')
        userModel.sumUp = [
            {name: 'Số lần làm bài thi', value: numberTakingTest + " lần"},
            {name: "Số lần đạt điểm tuyệt đối", value: maxScoreTime + " lần"},
            {name: "Số lần đỗ lý thuyết", value: passTestTime + " lần"},
            {name: "Điểm trung bình 10 bài gần nhất", value: averageScore || 0 + "/30"}
        ]
        sumUpTableBody.innerHTML= ` 
        <tr>
            <td>Số lần làm bài thi</td>
            <td>${numberTakingTest} lần</td>
        </tr>
        <tr>
            <td>Số lần đạt điểm tuyệt đối</td>
            <td>${maxScoreTime} lần</td>
        </tr>
        `
    },
    showNeedPractise: () => {
        const {testData} = userModel
        const list = [
            { fail: 0, done: 0, category:'Khái niệm'},
            { fail: 0, done: 0, category:'Quy tắc'},
            { fail: 0, done: 0, category:'Tốc độ'},
            { fail: 0, done: 0, category:'Nghiệp vụ vận tải'},
            { fail: 0, done: 0, category:'Văn hóa, đạo đức nghề nghiệp người lái xe'},
            { fail: 0, done: 0, category:'Kỹ thuật lái xe ô tô'},
            { fail: 0, done: 0, category:'Cấu tạo và sửa chữa xe ô tô'},
            { fail: 0, done: 0, category:'Hệ thống biển báo hiệu đường bộ'},
            { fail: 0, done: 0, category:'Giải các thế sa hình' }
        ]
        const soSanh = (x , min, max) => {
            if(x >= min && x  <= max) return true
            return false
        }
        testData.forEach(element => {
            for (let i = 0; i < 30; i++) {
                if(soSanh(element.list30Index[i], 1, 21)) { list[0].done += 1; if(!element.answerResult[i]) list[0].fail += 1 }
                if(soSanh(element.list30Index[i], 22, 131)) { list[1].done += 1; if(!element.answerResult[i]) list[1].fail += 1 }
                if(soSanh(element.list30Index[i], 132, 145)) { list[2].done += 1; if(!element.answerResult[i]) list[2].fail += 1 }
                if(soSanh(element.list30Index[i], 146, 175)) { list[3].done += 1; if(!element.answerResult[i]) list[3].fail += 1 }
                if(soSanh(element.list30Index[i], 176, 200)) { list[4].done += 1; if(!element.answerResult[i]) list[4].fail += 1 }
                if(soSanh(element.list30Index[i], 201, 235)) { list[5].done += 1; if(!element.answerResult[i]) list[5].fail += 1 }
                if(soSanh(element.list30Index[i], 226, 255)) { list[6].done += 1; if(!element.answerResult[i]) list[6].fail += 1 }
                if(soSanh(element.list30Index[i], 256, 355)) { list[7].done += 1; if(!element.answerResult[i]) list[7].fail += 1 }
                if(soSanh(element.list30Index[i], 356, 450)) { list[8].done += 1; if(!element.answerResult[i]) list[8].fail += 1 }
            }
        })

        // show % wrong
        userModel.calculateResult = list

        const needPractiseTableBody = document.querySelector('.user-cons table tbody')
        needPractiseTableBody.innerHTML = list.slice(0, 2).map(item => `
        <tr>
            <td>${item.category}</td>
            <td>${Math.floor(item.fail*10000/item.done)/100 || 0}%</td>
        </tr>
        `).join('')
        
    },

    //Xem lại lịch sử làm bài
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
}

 
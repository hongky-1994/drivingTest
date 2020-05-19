const examView = {
    showScreen: async (screen) => {
        let app = document.querySelector('.app-container')
        switch (screen) {
            case 'testType': {
                examModel.currentPage = 'testType' 
                app.innerHTML = examComponents.testType
                break
            }
            case 'structuredTest': {
                examModel.currentPage = 'structuredTest' 
                examModel.list30Question = []
                examController.getStructuredIndex()
                loadingView.show()
                Promise
                    .all(examController.getQuestionObject())// lấy hết data về xong chạy tiếp code dưới
                    .then(() => {
                        examController.createList30Answer()
                        app.innerHTML = examComponents.test
                        examView.showQuestionBoxes()
                        examView.showFirstQuestion()
                        examView.setUpButtons()
                        const testAnswerForm = document.querySelector(".test-answer-form")
                        testAnswerForm.addEventListener("change", () => { // lưu đáp án mới
                            examController.saveUserAnswerTo(examModel.thisQuestionName)
                            examView.changeDoneQuestionBoxColor()
                        })
                        examView.timer.showRemainingTime()
                        loadingView.hide()
                    }
                    )
                
                break
            }
            case 'randomTest': {
                examModel.currentPage = 'randomTest' 
                examModel.list30Question = []
                examController.getRandomIndex()
                loadingView.show()
<<<<<<< HEAD
                Promise.all( examController.getQuestionObject())
                .then( () => {
                    console.log('30 question', examModel.list30Question)
                    app.innerHTML = examComponents.structuredTest
                    examController.createList30Answer()
                    examView.showQuestionBoxes()
                    examView.showFirstQuestion(examModel.list30Question)
                    examView.setUpButtons()
                    const testAnswerForm = document.querySelector(".test-answer-form")
                    testAnswerForm.addEventListener("change",() => {
                        examController.saveUserAnswerTo(examModel.thisQuestionName)
                        examView.changeDoneQuestionBoxColor()
                    })
                    loadingView.hide()
                    
                    //upload test to firebase
                    let submitUserAnswer = document.querySelector(".submit-answer")
                    submitUserAnswer.onclick = function(){
                        // console.log(examModel.list30Answer)
                        userController.uploadTestToFirebase();                    
                    }
                })
=======
                Promise
                    .all(examController.getQuestionObject())
                    .then(() => {
                        examController.createList30Answer()
                        app.innerHTML = examComponents.test
                        examView.showQuestionBoxes()
                        examView.showFirstQuestion()
                        examView.setUpButtons()
                        const testAnswerForm = document.querySelector(".test-answer-form")
                        testAnswerForm.addEventListener("change", () => {
                            examController.saveUserAnswerTo(examModel.thisQuestionName)
                            examView.changeDoneQuestionBoxColor()
                        })
                        examView.timer.showRemainingTime()
                        loadingView.hide()
                    }
                    )
>>>>>>> 526ce2bb9730badd58625d7fa9f8581852216c84

                break
            }
            case 'testResult': {
                examModel.currentPage = 'testResult' 
                app.innerHTML = examComponents.testResult
                examController.scoreTest()
                break
            }
            case 'resultDetail': {
                examModel.currentPage = 'resultDetail' 
                if (examModel.currentPage = 'resultDetail') {
                    console.log("đang ở trang resultDetail")
                }
                app.innerHTML = examComponents.resultDetail
                // examController.createListAnswerState()
                examView.showQuestionBoxes()
                examView.showFirstQuestion()
                examView.setUpButtons()
            }
        }
    },

    showQuestionBoxes: () => { // hiển thị các ô chọn câu hỏi nhưng chưa gán sự kiện
        let questionContainer = document.querySelector(".question-container")                     
        for (let i = 0; i < 30; i += 5) {
            questionContainer.innerHTML += `
            <div class="row col-container justify-content-between mx-0 mb-3">
                <div class="col-2 px-0 ">
                    <div class="question-box bg--grey2 color--white1" 
                    id="question-${i + 1}">${i + 1}</div>
                </div>
                <div class="col-2 px-0 ">
                    <div class="question-box bg--grey2 color--white1" 
                    id="question-${i + 2}">${i + 2}</div>
                </div>
                <div class="col-2 px-0 ">
                    <div class="question-box bg--grey2 color--white1" 
                    id="question-${i + 3}">${i + 3}</div>
                </div>
                <div class="col-2 px-0 ">
                    <div class="question-box bg--grey2 color--white1" 
                    id="question-${i + 4}">${i + 4}</div>
                </div>
                <div class="col-2 px-0 ">
                    <div class="question-box bg--grey2 color--white1" 
                    id="question-${i + 5}">${i + 5}</div>
                </div>
            </div>
            `
        }
    },

    showQuestion: (index) => { // hiển thị từng các thành phần của 1 câu hỏi
        let list30Question = examModel.list30Question        
        let questionObject = list30Question[index]        
        let testQuestion = document.querySelector(".test-question")
        let testImage = document.querySelector(".test-image")
        testQuestion.innerHTML = questionObject.question
        testImage.innerHTML = (questionObject.images) ?
            (`<img src=${questionObject.images}>`) 
            : 
            ('')
        let questionAnwerContainers = document.querySelectorAll(".test-answer-container")
        questionObject.answers.forEach( (element,index) => { // hiển thị câu trả lời
            if (questionObject.answers[index].value) { // check giá trị của câu trả lời cho khác null
                switch (examModel.currentPage) {
                    case 'structuredTest': // các case test thì sẽ để là input
                        questionAnwerContainers[index].innerHTML = `
                            <input type="checkbox" id="answer-${index + 1}" name="answer-${index + 1}" >
                            <label for="answer-${index + 1}">
                                ${questionObject.answers[index].no + ". " + questionObject.answers[index].value}
                            </label>
                        `
                        console.log("questionObject.answers[index].no", questionObject.answers[index].no)
                    case 'randomTest':
                        questionAnwerContainers[index].innerHTML = `
                            <input type="checkbox" id="answer-${index + 1}" name="answer-${index + 1}" >
                            <label for="answer-${index + 1}">
                                ${questionObject.answers[index].no + ". " + questionObject.answers[index].value}
                            </label>
                        `
                        break
                    case 'resultDetail': // các case result sẽ để là div
                        questionAnwerContainers[index].innerHTML = `
                            <div class"result-detail-answer" id="answer-${index + 1}">
                                ${questionObject.answers[index].no + ". " + questionObject.answers[index].value}
                            </div>
                        `
                    
                }
            } else if (questionObject.answers[index].value == null) {
                questionAnwerContainers[index].innerHTML = []
            }
        })
        
        let userAnswer = examModel.list30Answer[index].userAnswer 
        userAnswer.forEach((element) => { // hiển thị lại các câu trả lời đã được click
            let checkedAnswer = document.querySelector(`#answer-${element}`)
            checkedAnswer.setAttribute("checked","")
        })
    },

    changeCurrentQuestionBoxColor: (currentQuestionBox) => { // đổi màu của câu hỏi đang hiển thị
        let questionBoxes = document.querySelectorAll('.question-box') 
        questionBoxes.forEach(element => {
            element.classList.remove('current-question')
        })
        currentQuestionBox.classList.add('current-question')
    },

    changeDoneQuestionBoxColor: () => { // đổi màu của các câu hỏi đã làm xong
        let list30Answer = examModel.list30Answer
        list30Answer.forEach((element, index) => {
            let userAnswer = element.userAnswer
            let questionBox = document.querySelector(`#question-${index + 1}`)
            if (userAnswer.length) {
                questionBox.classList.add('done-question')
            } else {
                questionBox.classList.remove('done-question')
            }
        })
    },

    showFirstQuestion: () => { // hiển thị câu hỏi đầu tiên
            examView.showQuestion(0)
            examView.changeCurrentQuestionBoxColor(document.getElementById('question-1'))
            if (examModel.currentPage == 'resultDetail') {
                examView.changeCorrectAndWrongAnswerColor() 
                examView.changeCorrectAndWrongQuestionBoxColor() 
            } 
    },

    setUpButtons: () => {
        let list30Index = examModel.list30Index
        list30Index.forEach((element, index) => {                 
            let questionBox = document.querySelector(`#question-${index + 1}`)
            questionBox.addEventListener("click", () => { // gán sự kiện click cho các ô câu hỏi
                examView.showQuestion(index) // hiển thị câu hỏi đó
                examView.changeCurrentQuestionBoxColor(questionBox) // đổi màu câu hỏi đó
                examController.saveThisQuestionName(index + 1) // lưu câu hỏi lại để lưu đáp án đã trả lời
                if (examModel.currentPage == 'resultDetail') {
                    examView.changeCorrectAndWrongAnswerColor() 
                } 
            })
        })
    },

    timer: {
        endDate: null,
        calculateEndDate: () => { examView.timer.endDate = new Date().getTime() + 20*60*1000},
        calculateRemainingTime: () => {
            let remainingTime 
            let remainingMins
            let remainingSecs
            remainingTime = examView.timer.endDate - new Date().getTime()
            if( remainingTime > 0) {
                remainingMins = Math.floor(remainingTime / (1000 * 60))
                remainingSecs = Math.round((remainingTime - remainingMins * 60 *1000) / (1000)) 
                if ( remainingSecs == 60 ) {
                    remainingSecs = 0
                    remainingMins += 1
                }
            } else if (remainingTime == 0) {
                remainingSecs = 0
                remainingMins = 0
            } else if (remainingTime < 0) {
                // examView.showScreen("testResult")
            }
            return [remainingMins, remainingSecs]
        },
        showRemainingTime: () => {
            examView.timer.calculateEndDate()
            setInterval(() => {
                let minute = document.querySelector("#minute")
                let second = document.querySelector("#second")
                if(minute != undefined) {
                    minute.innerHTML = ""
                    second.innerHTML = ""
                    if (examView.timer.calculateRemainingTime()[0] < 10) {
                        minute.innerHTML += "0" + examView.timer.calculateRemainingTime()[0]
                    }
                    else {
                        minute.innerHTML += examView.timer.calculateRemainingTime()[0]
                    }
                    if (examView.timer.calculateRemainingTime()[1] < 10) {
                        second.innerHTML += "0" + examView.timer.calculateRemainingTime()[1]
                    }
                    else {
                        second.innerHTML += examView.timer.calculateRemainingTime()[1]
                    }
                    let totalRemainingTime = Number(minute.innerHTML) * 60 + Number(second.innerHTML)
                    let testTotalTime = (20 * 60) - totalRemainingTime
                    //tính ra giá trị giây
                    examModel.testTotalTime[0] = Math.floor(testTotalTime / 60)
                    //thêm 0 nếu số nhỏ hơn 10
                    examModel.testTotalTime[0] = (examModel.testTotalTime[0] > 10) ?
                        examModel.testTotalTime[0]
                        :
                        "0" + examModel.testTotalTime[0] 
                    //tính ra giá trị giây
                    examModel.testTotalTime[1] = Math.round(testTotalTime - examModel.testTotalTime[0]*60)
                    //thêm 0 nếu số nhỏ hơn 10
                    examModel.testTotalTime[1] = (examModel.testTotalTime[1] > 10) ?
                    examModel.testTotalTime[1]
                    :
                    "0" + examModel.testTotalTime[1]   
                }
                }, 1000)
        },
    },

    loadTest: (testType, testSelector) => {
        let testTypeHTML = document.querySelector(testSelector)
            testTypeHTML.addEventListener("click", 
                authView.openModal(true, 
                    "Chuẩn bị làm bài",
                    "success", 
                    "Thời gian làm bài là 20 phút. Chúc bạn làm bài thật tốt.",
                    testType))
    },

    changeCorrectAndWrongAnswerColor: () => {
        let answers = document.querySelectorAll(".test-answer-container")
        // phòng khi cần xem kết quả câu hỏi
        // console.log(examModel.thisQuestionName ,examModel.list30Question[examModel.thisQuestionName - 1].correct)     
        answers.forEach((element, index) => {
            let thisQuestionIndex = examModel.thisQuestionName - 1
            let correctAnswers = examModel.list30Question[thisQuestionIndex].correct
            let userAnswer = examModel.list30Answer[thisQuestionIndex].userAnswer
            element.classList.remove('correct-answer')
            element.classList.remove('wrong-answer')
            // examModel.answerNotCorrect[thisQuestionIndex] = false
            if (correctAnswers.includes(index + 1)) {
                element.classList.add('correct-answer')
            } else if (!(correctAnswers.includes(index + 1)) && userAnswer.includes(index + 1) ){ 
                element.classList.add('wrong-answer')
                // examModel.answerNotCorrect[thisQuestionName] = true
            } else if (userAnswer.length == 0) {
                // examModel.answerNotCorrect[thisQuestionName] = true
            }
        } )
    },
    changeCorrectAndWrongQuestionBoxColor:() => { 
        // lỗi màu lung tung
        // khi chuyển câu sai thì tất cả chuyển đỏ, khi đổi câu đúng thì tất cả chuyển xanh
        // hướng giải quyết: tạo array mới để mỗi câu có một answerNotCorrect riêng
        let questionBoxes = document.querySelectorAll(".question-box")
        questionBoxes.forEach((element, index) => {
            element.classList.remove("wrong-question-box")
            element.classList.remove("correct-question-box")
            if(examModel.answerNotCorrect[index]) {
                element.classList.add("wrong-question-box")
            } else {
                element.classList.add("correct-question-box")
            }
        })
    },
}
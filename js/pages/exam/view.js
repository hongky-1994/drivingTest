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
                examModel.testType = 'Cấu trúc'
                examModel.currentPage = 'structuredTest' 
                examModel.list30Question = []
                examController.getStructuredIndex()
                app.innerHTML = examComponents.test
                const testAnswerForm = document.querySelector(".test-answer-form")

                loadingView.show()
                Promise
                .all(examController.getQuestionObject())// lấy hết data về xong chạy tiếp code dưới
                .then(() => {
                    examController.createList30Answer()
                    examView.leftBox.setUpButtons()
                    testAnswerForm.addEventListener("change", () => { // lưu đáp án mới
                        
                    })
                    examView.timer.showRemainingTime()
                    loadingView.hide()
                })
                window.addEventListener("beforeunload", (event) => {
                    event.returnValue = "Bạn sẽ mất hết dữ liệu bài thi hiện tại. Bạn có muốn rời trang."
                })
                break
            }
            case 'randomTest': {
                examModel.testType = 'Tổng hợp'
                examModel.currentPage = 'randomTest' 
                examModel.list30Question = []
                examController.getRandomIndex()
                loadingView.show()
                Promise
                .all(examController.getQuestionObject())
                .then(() => {
                    examController.createList30Answer()
                    app.innerHTML = examComponents.test
                    examView.leftBox.setUpButtons()
                    const testAnswerForm = document.querySelector(".test-answer-form")
                    examView.timer.showRemainingTime()
                    loadingView.hide()
                }
                )
                window.addEventListener("beforeunload", (event) => {
                    event.returnValue = "Bạn sẽ mất hết dữ liệu bài thi hiện tại. Bạn có muốn rời trang."
                })

                break
            }
            case 'testResult': {
                examModel.currentPage = 'testResult' 
                app.innerHTML = examComponents.testResult
                examController.showScoreTest()
                break
            }
            case 'resultDetail': {
                examModel.currentPage = 'resultDetail' 
                app.innerHTML = examComponents.resultDetail
                examView.leftBox.setUpButtons()
                break
            }
        }
    },
    



    // LEFT SIDE QUES BOX COLOR
    leftBox: {
        setUpButtons: () => {
            const questionContainer = document.querySelector(".question-container")                     
            for (let i = 0; i < 30; i ++) {
                questionContainer.innerHTML += `
                    <div class="mx-auto mb-3">
                        <div 
                            class="question-box bg--grey2 color--white1"  
                            id="question-${i + 1}"
                            onclick="examView.question.showQuestion(${i})">
                            ${i + 1}
                        </div>
                    </div>
                `
            }
            examView.question.showQuestion(0)
            if (examModel.currentPage === 'resultDetail') examView.leftBox.changeCorrectAndWrongQuestionBoxColor()
        },
        changeColor: (query) => {
            // PINK for current question
            const questionBoxes = document.querySelectorAll('.question-box') 
            questionBoxes.forEach(element => {
                element.classList.remove('current-question')
            })
            document.querySelector(query).classList.add('current-question')
    
            //Purple for done question (ques has answered)
            const list30Answer = examModel.list30Answer
            list30Answer.forEach((element, index) => {
                const questionBox = document.querySelector(`#question-${index + 1}`)
                questionBox.classList.remove('done-question')
                if (element.userAnswer.length) questionBox.classList.add('done-question')
            })
        },
        changeCorrectAndWrongQuestionBoxColor: () => { 
            console.log("changeCorrectAndWrongQuestionBoxColor")
            let questionBoxes = document.querySelectorAll(".question-box")
            questionBoxes.forEach((element, index) => {
                element.classList.remove("wrong-question-box")
                element.classList.remove("correct-question-box")
                if(examModel.answerResult[index]) {
                    element.classList.add("correct-question-box")
                } else {
                    element.classList.add("wrong-question-box")
                }
            })
        },
    
        
    },



    // RIGHT SIDE QUES CONTAINER _ COLOR ANSWER
    question:{
        showQuestion: (questionIndex) => {
            console.log('--------------------------------------')
            console.log('Show question index', questionIndex)
            //get all DOM and Question list 
            examModel.currentQues = questionIndex
            const questionObject = examModel.list30Question[questionIndex]        
            const testQuestion = document.querySelector(".test-question")
            const testImage = document.querySelector(".test-image")
            const questionAnwerContainers = document.querySelectorAll(".test-answer-container")
    
            // passing data to HTML
            testQuestion.innerHTML = `Câu ${questionIndex + 1}: ${questionObject.question}`
            testImage.innerHTML = questionObject.images ? '<img class="ques__image__holder">' : ''
            loadingView.imgLoading('.ques__image__holder', questionObject.images) //preloading image.gif
            questionObject.answers.forEach((element,index) => {
                if (element.value) { 
                    switch (examModel.currentPage) {
                        case 'structuredTest':
                        case 'randomTest':
                            questionAnwerContainers[index].innerHTML = `
                                <input type="checkbox" id="answer-${element.no}" 
                                    name="answer-${element.no}"
                                    onchange="examController.saveUserAnswerTo(${questionIndex})"
                                >
                                <label for="answer-${element.no}">${element.no}.  ${element.value}</label>
                            `
                            break
                        case 'resultDetail':
                            questionAnwerContainers[index].innerHTML = `
                                <div class="result-detail-answer px-3 py-2 w-100" id="answer-${element.no}">
                                    ${element.no + ". " + element.value}
                                </div>
                            `
                            break
                    }
                } else { questionAnwerContainers[index].innerHTML = ''}
            })

            // Hiển thị các câu trả lời đã được chọn.
            let userAnswer = examModel.list30Answer[questionIndex].userAnswer 
            userAnswer.forEach((element) => {
                let checkedAnswer = document.querySelector(`#answer-${element}`)
                checkedAnswer.setAttribute("checked","")
            })

            // Thay đổi màu button câu hỏi, button next và prev
            if (examModel.currentPage === 'resultDetail') {
                examView.question.changeCorrectAndWrongAnswerColor(questionIndex) 
            } else {
                examView.leftBox.changeColor(`#question-${questionIndex+1}`)
                const nextQues = document.querySelector('.next__ques')
                const prevQues = document.querySelector('.prev__ques')
                if(questionIndex === 29) {nextQues.disabled = true} else {nextQues.disabled = false}
                if(questionIndex === 0) {prevQues.disabled = true} else {prevQues.disabled = false}
            }
        },
        changeCorrectAndWrongAnswerColor: (questionIndex) => {
            let answers = document.querySelectorAll(".result-detail-answer")
            console.log("answers", answers)
            
            answers.forEach((element, index) => {
                let correctAnswers = examModel.list30Question[questionIndex].correct
                console.log("correctAnswers", correctAnswers)
                let userAnswer = examModel.list30Answer[questionIndex].userAnswer
                console.log("userAnswer", userAnswer)
                
                element.classList.remove('correct-answer')
                element.classList.remove('wrong-answer')
                
                if (correctAnswers.includes(index + 1)) element.classList.add('correct-answer')
                if (userAnswer.includes(index + 1)) element.classList.add('user-answer')

            } )
        }
       
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
}
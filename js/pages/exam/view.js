const examView = {
    showScreen: async (screen) => {
        let app = document.querySelector('.app-container')
        switch (screen) {
            case 'testType': {
                app.innerHTML = examComponents.testType
                layoutView.saveLocation('testType')
                break
            }
            case 'structuredTest': {
                examController.getStructuredIndex()
                examController.lockTestTypeButton(".structured-test")
                let promiseList = new Promise((resolve,reject) => {
                    // examController.getQuestionObject()
                    examModel.list30Index.forEach((index) => {
                        firebase.firestore().doc(`tests/B2/question-list/question-${index}`)
                            .get()
                            .then(result => examModel.list30Question.push(result.data()))
                        
                    })
                    resolve(examModel.list30Question)
                })
                Promise
                    .all(promiseList)
                    .then(_ => {
                        examController.createList30Answer()
                        app.innerHTML = examComponents.structuredTest
                        examView.showQuestionBoxes()
                        examView.showFirstQuestion()
                        examView.setUpButtons()
                        let testAnswerForm = document.querySelector(".test-answer-form")
                        testAnswerForm.addEventListener("change", () => {
                            examController.saveUserAnswerTo(examModel.thisQuestionName)
                            examView.changeDoneQuestionBoxColor()
                        })
                        examView.timer.showRemainingTime()
                        examController.openTestTypeButton(".structured-test")
                    }
                    )
                
                break
            }
        }
    },

    showQuestionBoxes: () => {
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

    showQuestion: (index) => {
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
        questionObject.answers.forEach( (element,index) => {
            if (questionObject.answers[index].value) {
                questionAnwerContainers[index].innerHTML = `
                <input type="checkbox" id="answer-${index + 1}" name="answer-${index + 1}" >
                <label for="answer-${index + 1}">
                    ${questionObject.answers[index].value}
                </label>
                `
            } else if (questionObject.answers[index].value == null) {
                questionAnwerContainers[index].innerHTML = []
            }
        })
        
        let userAnswer = examModel.list30Answer[index].userAnswer
        userAnswer.forEach((element) => {
            let checkedAnswer = document.querySelector(`#answer-${element}`)
            checkedAnswer.setAttribute("checked","")
        })
    },

    changeCurrentQuestionBoxColor: (currentQuestionBox) => {
        let questionBoxes = document.querySelectorAll('.question-box') 
        questionBoxes.forEach(element => {
            element.classList.remove('current-question')
        })
        currentQuestionBox.classList.add('current-question')
    },

    changeDoneQuestionBoxColor: () => {
        let list30Answer = examModel.list30Answer
        list30Answer.forEach((element, index) => {
            let userAnswer = list30Answer[index].userAnswer
            let questionBox = document.querySelector(`#question-${index + 1}`)
            if (userAnswer.length) {
                questionBox.classList.add('done-question')
            } else {
                questionBox.classList.remove('done-question')
            }
        })
    },

    showFirstQuestion: () => {
            examView.showQuestion(0)
            examView.changeCurrentQuestionBoxColor(document.getElementById('question-1'))
    },

    setUpButtons: () => {
        let list30Index = examModel.list30Index
        list30Index.forEach((element, index) => {                 
            let questionBox = document.querySelector(`#question-${index + 1}`)
            questionBox.addEventListener("click", () => {
                examView.showQuestion(index)
                examView.changeCurrentQuestionBoxColor(questionBox)
                examController.saveThisQuestionName(index + 1)
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
            }        
            return [remainingMins, remainingSecs]
        },
        showRemainingTime: () => {
            examView.timer.calculateEndDate()
            setInterval(() => {
                let minute = document.querySelector("#minute")
                let second = document.querySelector("#second")
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
                
                }, 1000)
        }
    },
    
    


}
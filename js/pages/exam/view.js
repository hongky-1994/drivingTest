const examView = {
    showScreen:   (screen) => {
        let app = document.querySelector('.app-container')
        switch (screen) {
            case 'testType': {
                app.innerHTML = examComponents.testType
                layoutView.saveLocation('testType')
                break
            }
            case 'structuredTest': {
                examController.getStructuredIndex()
                examController.getQuestionObject()
                app.innerHTML = examComponents.structuredTest
                let list30Index = examModel.list30Index
                let questionContainer = document.querySelector(".question-container") 
                
                for (i = 0; i < 30; i += 5) {
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

                examView.showFirstQuestion()

                list30Index.forEach((element, index) => {                 
                    let questionBox = document.querySelector(`#question-${index + 1}`)
                    questionBox.addEventListener("click", () => {
                        examView.showQuestion(index)
                        examView.changeCurrentQuestionBoxColor(questionBox)
                        examController.saveThisQuestionName(index + 1)
                    })
                })

                let testAnswerForm = document.querySelector(".test-answer-form")
                testAnswerForm.addEventListener("change",() => {
                    console.log("form changed")
                    examController.saveUserAnswerTo(examModel.thisQuestionName)
                })
                // let examRightColumn = document.querySelector(".exam-right-column")
                // const callback = () => {}
                // const observer = new MutationObserver(callback)
                // observer.observe(examRightColumn, { characterData:true, subtree:true, childList: true })

            }
        }
    },

    showQuestion: async (index) => {        
        let questionObject = examModel.list30Question[index] 
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
            }    
        });
    },

    changeCurrentQuestionBoxColor: (currentQuestionBox) => {
        let questionBoxes = document.querySelectorAll('.question-box') 
        questionBoxes.forEach(element => {
            element.classList.remove('current-question')
        })
        currentQuestionBox.classList.add('current-question')
    },

    showFirstQuestion: () => {
        setTimeout(() => {
            examView.showQuestion(0)
            examView.changeCurrentQuestionBoxColor(document.getElementById('question-1'))
        }, 1500) 
    }


}
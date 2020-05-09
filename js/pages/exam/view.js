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

                list30Index.forEach((element, index) => {                 
                    let questionBox = document.querySelector(`#question-${index + 1}`)
                    questionBox.addEventListener("click", () => {
                        examView.showQuestion(index)
                    })  
                })
            }
        }
    },

    showQuestion: (index) => {        
        let questionObject = examModel.list30Question[index] 
        let testQuestion = document.querySelector(".test-question")
        let testAnswer1 = document.querySelector('label[for="answer1"]')
        let testAnswer2 = document.querySelector('label[for="answer2"]')
        let testAnswer3 = document.querySelector('label[for="answer3"]')
        let testAnswer4 = document.querySelector('label[for="answer4"]')
        
        testQuestion.innerHTML = questionObject.question
        testAnswer1.innerHTML = questionObject.answers[0].value
        testAnswer2.innerHTML = questionObject.answers[1].value
        testAnswer3.innerHTML = questionObject.answers[2].value
        testAnswer4.innerHTML = (questionObject.answers[3].value) ? (questionObject.answers[3].value) : ('')


    },
}
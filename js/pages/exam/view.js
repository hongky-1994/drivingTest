const examView = {
    showScreen: (screen) => {
        let app = document.querySelector('.app-container')

        switch (screen) {
            case 'testType': {
                app.innerHTML = examComponents.testType
                break
            }
            case 'structuredTest': {
                
                loadingView.show()
                Promise.all( examController.getQuestionObject())
                .then( () => {
                    console.log('30 question', examModel.list30Question)
                    app.innerHTML = examComponents.structuredTest
                    examController.createList30Answer()
                    examView.showQuestionBoxes()
                    examView.showFirstQuestion(examModel.list30Question)
                    examView.setUpButtons(list30Index)
                    const testAnswerForm = document.querySelector(".test-answer-form")
                    testAnswerForm.addEventListener("change",() => {
                        examController.saveUserAnswerTo(examModel.thisQuestionName)
                        examView.changeDoneQuestionBoxColor()
                    })
                    loadingView.hide()
                    
                    //upload test to firebase
                    userController.uploadTestToFirebase();
                })

                break
            }
        }
    }
}
const examController = {
    getStructuredIndex: () => {
        let list30Index = []
        const getRandomInt = (max) => {
            return Math.floor(Math.random() * Math.floor(max));
        }
    
        const randomNumber = (startNumber, queryLength) => {
            return startNumber + getRandomInt(queryLength)
        }

        const randomSelectCategory = (numberOfQuestion, startQuestion, queryLength, arrayList ) => {
            let index = 0
            while (index < numberOfQuestion) {
                let question = randomNumber(startQuestion,queryLength)
                if(!arrayList.includes(question)) {
                    arrayList.push(question)
                    index ++
                }
            }
            return arrayList
        }
    
        // Get array of index
        list30Index.push(randomNumber(1,21))                          // Khai niem          1-21    (21  ques)  pick-1
        list30Index = randomSelectCategory( 7, 22, 110,list30Index)   // Quy tac            22-131  (110 ques)  pick-7
        list30Index = randomSelectCategory( 1, 132, 14,list30Index)   // Toc do             132-145 (14  ques)  pick-1
        list30Index = randomSelectCategory( 1, 146, 30,list30Index)   // Nghiep vu van tai  146-175 (30  ques)  pick-1
        list30Index = randomSelectCategory( 1, 176, 25,list30Index)   // van hoa dao duc    176-200 (25  ques)  pick-1
        list30Index = randomSelectCategory( 1, 201, 55,list30Index)   // ky thuat,cau tao   21-255  (55  ques)  pick-1
        list30Index = randomSelectCategory( 9, 256, 100,list30Index)  // bien bao           256-355 (100 ques)  pick-9
        list30Index = randomSelectCategory( 9, 356, 95,list30Index)   // Sa hinh            356-450 (95  ques)  pick-9    
        
        examModel.list30Index = list30Index

    },
    getQuestionObject: () => {
        return examModel.list30Index.map((element) => {
            return firebase.firestore().doc(`tests/B2/question-list/question-${element}`)
                .get()
                .then((result) => {
                    examModel.list30Question.push(result.data())
                })
                .catch((err) => console.log("có lỗi ở controller", err))
            })

    },
    saveUserAnswerTo: (thisQuestionName) => {
        let checkedAnswers = document.querySelectorAll('input:checked')
        let userAnswerNotSaved = []
        checkedAnswers.forEach(element => {
            let answerId = element.id
            let answerIdShorten = answerId.replace("answer-", "")
            userAnswerNotSaved.push(answerIdShorten)
        })
        userAnswerNotSaved.sort((a, b) => a - b)
        examModel.list30Answer[thisQuestionName - 1].userAnswer = userAnswerNotSaved        
    },
    saveThisQuestionName: (thisQuestionName) => {
        examModel.thisQuestionName = thisQuestionName
    },

    createList30Answer: () => {
        examModel.list30Answer = [...Array(30)].map((value, index) => {
            return {
                question: `question-${examModel.list30Index[index]}`,
                userAnswer: [],
            }
        })
    }, 
    
    scoreTest: () => {
        let list30Answer = examModel.list30Answer
        let list30Question = examModel.list30Question
        let list30UserAnswerShorten = examModel.list30UserAnswerShorten
        let list30CorrectAnswer = examModel.list30CorrectAnswer
        let correctAnswers = examModel.correctAnswers
        list30Answer.forEach((element) => {
            list30UserAnswerShorten.push(JSON.stringify(element.userAnswer))
        })
        list30Question.forEach((element) => {
            let correct = element.correct.filter((value) => value != null)
            list30CorrectAnswer.push(JSON.stringify(correct))
        })
        for (let i = 0; i < 30; i++ ) {
            if (list30CorrectAnswer[i] != list30UserAnswerShorten[i]) {
                correctAnswers--
            }
        }
    }, 
}


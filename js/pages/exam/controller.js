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
        
        // await list30Index.forEach( (e) => {
        //     firebase.firestore().doc(`tests/B2/question-list/question-${e}`)
        //         .get()
        //         .then( result => list30Questions.push(result.data()))
        //         .catch(err => console.log("Error:  ", err))
        // })
        
        examModel.list30Index = list30Index

    },
    getQuestionObject: () => {
        examModel.list30Index.forEach( async (element) => {
            await firebase.firestore().doc(`tests/B2/question-list/question-${element}`)
                .get()
                .then((result) => {
                    examModel.list30Question.push(result.data())
                })
                .catch((err) => console.log("Co loi:", err))
        }
        )
    },
    saveUserAnswerTo: (thisQuestionName) => {
        let checkedAnswers = document.querySelectorAll('input:checked')
        let userAnswerNotSaved = []
        checkedAnswers.forEach(element => {
            let answerId = element.id
            let answerIdShorten = answerId.replace("answer-", "")
            userAnswerNotSaved.push(answerIdShorten)
            userAnswerNotSaved.sort((a, b) => a - b)
        })
        console.log("userAnswerNotSaved", userAnswerNotSaved)
        let userAnswer = examModel.list30Answer()[thisQuestionName - 1].userAnswer
        userAnswer = userAnswerNotSaved
        console.log("userAnswer", userAnswer);
        

    },
    saveThisQuestionName: (thisQuestionName) => {
        examModel.thisQuestionName = thisQuestionName
    }
}


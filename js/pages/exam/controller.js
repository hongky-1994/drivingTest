const examController = {
    getStructuredIndex: () => {
        console.log('examController.getStructuredIndex')
        let list30Index = []
        const getRandomInt = (max) => (Math.floor(Math.random() * Math.floor(max)))
    
        const randomNumber = (startNumber, queryLength) => (startNumber + getRandomInt(queryLength))

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
    getRandomIndex: () => {
        console.log('examController.getRandomIndex')
        let list30Index = []
        const getRandomInt = (max) => (Math.floor(Math.random() * Math.floor(max)))
            
        const randomNumber = (startNumber, queryLength) => (startNumber + getRandomInt(queryLength))

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

        list30Index = randomSelectCategory(30, 1, 450, list30Index)

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
    createList30Answer: () => {
        examModel.list30Answer = [...Array(30)].map((value, index) => {
            return {
                question: `question-${examModel.list30Index[index]}`,
                userAnswer: [],
            }
        })
    }, 
    saveUserAnswerTo: (questionIndex) => {
        const checkedAnswers = document.querySelectorAll('input:checked')
        const userAnswerNotSaved = []
        checkedAnswers.forEach(element => {
            let answerIdShorten = element.id.replace("answer-", "")
            userAnswerNotSaved.push(Number(answerIdShorten))
        })
        examModel.list30Answer[questionIndex].userAnswer = userAnswerNotSaved    
        console.log("save answer to question", questionIndex, userAnswerNotSaved)

    },
    showScoreTest: () => {
        let list30Answer = examModel.list30Answer
        let list30Question = examModel.list30Question

        examModel.answerResult = [...Array(30)].map(() => false)

        const userAnswers = list30Answer.map( element => element.userAnswer.sort((a, b) => a - b))
        const correctAnswers = list30Question.map(element => element.correct.filter((value) => value !== null))
        
        for (let i = 0; i < 30; i++ ) {
            if (JSON.stringify(userAnswers[i]) === JSON.stringify(correctAnswers[i])) examModel.answerResult[i] = true 
        }
        const testScore = document.querySelector(".test-score")
        const minute = document.querySelector(".total-minute")
        const second = document.querySelector(".total-second")
        examModel.testScore = examModel.answerResult.filter(v=>v).length
        testScore.innerHTML = examModel.testScore
        minute.innerHTML = examModel.testTotalTime[0]
        second.innerHTML = examModel.testTotalTime[1]
    }, 
}


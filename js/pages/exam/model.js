const examModel = {
    list30Index: [],
    list30Question: [],
    list30Answer: () => {
        return [...Array(30)].map((value, index) => {
            return {
                question: `question-${examModel.list30Index[index]}`,
                userAnswer: [],
            }
        })
    },
    thisQuestionName: 1

}

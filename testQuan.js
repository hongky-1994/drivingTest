// so sánh kết quả
// let array1 = [1, null].filter((value) => value != null) 
// let array2 = [1]
// console.log("array", array1);
// console.log(JSON.stringify(array1) == JSON.stringify(array2));

// tạo array chứa 30 object chứa kết quả
// let list30Index = [11, 114, 94, 53, 54, 101, 45, 102, 145, 153, 192, 229, 318, 344, 332, 354, 331, 282, 266, 327, 321, 430, 372, 367, 444, 363, 437, 450, 433, 387]
// let list30Answer = () => {
//     return [...Array(30)].map((value, index) => {
//         return {
//             question: `question-${list30Index[index]}`,
//             userAnswer: [],
//         }
//     })
// }

// console.log(list30Answer());

//trừ string
// console.log("question-1".replace("question-", ""));

//thêm event change cho form
// let form = document.querySelector("form")
// form.addEventListener('change', () => {alert("form changed")})

//tìm bug
let checkedAnswers = document.querySelectorAll('input:checked')
let userAnswerNotSaved = []
checkedAnswers.forEach(element => {
    let answerId = element.id
    let answerIdShorten = answerId.replace("answer-", "")
    userAnswerNotSaved.push(answerIdShorten)
    userAnswerNotSaved.sort((a, b) => a - b)
})

let userAnswer = examModel.list30Answer()[thisQuestionName - 1].userAnswer
userAnswer = userAnswerNotSaved
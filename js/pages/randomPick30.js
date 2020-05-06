const listIndex = document.querySelector(".list__index")
const listQuestion = document.querySelector(".list__questions")
const btnShowIndex = document.querySelector(".btn.btn-primary")
const btnShowQues = document.querySelector(".btn.btn-success")
let list30Index = []
const list30Questions =[]


const showList = () => {
  
  //Get list array of index
    list30Index.push(randomNumber(1,21))                          // Khai niem          1-21    (21  ques)  pick-1
    list30Index = randomSelectCategory( 7, 22, 110,list30Index)   // Quy tac            22-131  (110 ques)  pick-7
    list30Index = randomSelectCategory( 1, 132, 14,list30Index)   // Toc do             132-145 (14  ques)  pick-1
    list30Index = randomSelectCategory( 1, 146, 30,list30Index)   // Nghiep vu van tai  146-175 (30  ques)  pick-1
    list30Index = randomSelectCategory( 1, 176, 25,list30Index)   // van hoa dao duc    176-200 (25  ques)  pick-1
    list30Index = randomSelectCategory( 1, 201, 55,list30Index)   // ky thuat,cau tao   21-255  (55  ques)  pick-1
    list30Index = randomSelectCategory( 9, 256, 100,list30Index)  // bien bao           256-355 (100 ques)  pick-9
    list30Index = randomSelectCategory( 9, 356, 95,list30Index)   // Sa hinh            356-450 (95  ques)  pick-9
   
    console.log("list",list30Index)
  listIndex.innerHTML = JSON.stringify(list30Index)
}
  // get data firebase from list array
const showQues =  () => {
   list30Index.forEach( (e) => {
    firebase.firestore().doc(`tests/B2/question-list/question-${e}`)
      .get()
      .then( result => list30Questions.push(result.data()))
      .catch(err => console.log("Co error:  ", err))
  })

  
  setTimeout(()=>{
    console.log("List30Question", list30Questions)
  
    listQuestion.innerHTML = list30Questions.map(ques => `
      <p class="col-6">${ques.question}</p>
      <img class="col-6" src="${ques.images}">
      `)},1000)
  

}
btnShowIndex.addEventListener('click', showList)
btnShowQues.addEventListener('click', showQues)

// random question each category
const randomSelectCategory = ( numberOfQuestion, startQuestion, queryLength, arrayList ) => {
  let index = 0
  while ( index < numberOfQuestion ) {
    let question = randomNumber(startQuestion,queryLength)
    if(!arrayList.includes(question)) {
      arrayList.push(question)
      index ++
    }
  }
  return arrayList
}


// random number
const randomNumber = (startNumber, queryLength) => {
  return startNumber + getRandomInt(queryLength)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
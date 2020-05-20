const libraryView = {
  showScreen: (screen) => {
    const appContainer = document.querySelector(".app-container")
    appContainer.innerHTML = libraryComponents[screen]
    libraryController.changeCategory('Khái niệm')
  },
  changeActiveLeft: (index) => {
    const leftItems = document.querySelectorAll('.item')
    leftItems.forEach(item => item.classList.remove('active'))
    leftItems[index].classList.add('active')
  },
  showQues: (index) => {
    const questionList = libraryModel.list[index].questionsList
    document.querySelector('.title__category').innerHTML = libraryModel.list[index].category
    const libraryQues = document.querySelector('.library__question')
    const abc = questionList.map(item => (
      `<div class="mb-3">
      <div class="question__container d-flex align-items-center pointer " id="ques${item.index}"onclick="libraryView.showAns(${item.index})">
        <p class="flex-grow-1 mb-0">Câu ${item.index}: ${item.question}</p>
      </div>
      <div class="answers row answers${item.index}">
        <div class="col-8">
          ${item.answers[0].value 
            ? `<p class="pl-5 py-2 ${item.correct.includes(item.answers[0].no) ? "color--green1" : "color--orange1" } ">
                  ${item.answers[0].no}. ${item.answers[0].value}
            </p>` 
            : ''}  
          ${item.answers[1].value 
            ? `<p class="pl-5 py-2 ${item.correct.includes(item.answers[1].no) ? "color--green1" : "color--orange1" } ">
                  ${item.answers[1].no}. ${item.answers[1].value}
            </p>` 
            : ''}  
          ${item.answers[2].value 
            ? `<p class="pl-5 py-2 ${item.correct.includes(item.answers[2].no) ? "color--green1" : "color--orange1" } ">
                  ${item.answers[2].no}. ${item.answers[2].value}
            </p>` 
            : ''}  
          ${item.answers[3].value 
            ? `<p class="pl-5 py-2 ${item.correct.includes(item.answers[3].no) ? "color--green1" : "color--orange1" } ">
                  ${item.answers[3].no}. ${item.answers[3].value}
            </p>` 
            : ''}  
        </div>
        <img class="library__image--container col-4"
          src=${item.images || "./js/assets/images/no-image.png"} 
        >
      </div>
    </div>`
     )).join('')
      libraryQues.innerHTML = abc
  },
  showAns: (index) => {
    const allAnswers = document.querySelectorAll('.answers')
    const answer = document.querySelector(`.answers${index}`)
    allAnswers.forEach(ans => ans.classList.remove('show'))
    answer.classList.add('show')
    
    const allQues = document.querySelectorAll('.question__container')
    const ques = document.querySelector(`#ques${index}`)
    allQues.forEach(ques => ques.classList.remove('bg--green1'))
    ques.classList.add('bg--green1')
  }
}
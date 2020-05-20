const adminController = {
  getAndShowData: async (page) => {
    const tableBody = document.querySelector('.table__body')
    tableBody.innerHTML = ''
    const db = firebase.firestore()
    const condition = document.querySelector('#search__condition').value
    const valueSearch = document.querySelector('#searchInput').value
    console.log("valueSearch", valueSearch)
    console.log('condition', condition)

    loadingView.show()
    let ref
    if(condition) {
      ref = db.collection('tests/B2/question-list')
      .orderBy('index')
      .where(condition, '==', valueSearch)
      .limit(10)
      .startAfter((page - 1)*10)
    } else {
      ref = db.collection('tests/B2/question-list')
      .orderBy('index')
      .limit(10)
      .startAfter((page - 1)*10)
    }
      
    await ref.get()
      .then(collection => {
        collection.forEach(item => {
          const doc = item.data()
          adminModel.question.push(doc)
          let images = ''
          if(doc.images) images = `
          <img src=${doc.images} alt='hello'/>`
          tableBody.innerHTML += `
          <tr>
            <td class='text-wrap small'><input type='checkbox' /></td>
            <td class='text-wrap small'>${doc.index}</td>
            <td class='text-wrap small'>${doc.category}</td>
            <td class='text-wrap small'>${doc.question}</td>
            <td class='text-wrap small d-flex'>
              <button class='btn btn-info mr-3' onclick="adminView.openModalEdit(true, ${doc.index})"><i class="fas fa-tools"></i></button>
              <button class='btn btn-danger'><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
          `
        })
    }).then(() => loadingView.hide())
  },
  fillInputValueWithData : (query, key,value) => {
    document.querySelector(query)[key] = value
  },
  submitUpdate: async (event) => {
    event.preventDefault()
    loadingView.show()

    // get all DOM
    const question = document.querySelector('#question__container').value
    const category = document.querySelector('#category__container').value
    const answer1 = document.querySelector('#answer1').value
    const answer2 = document.querySelector('#answer2').value
    const answer3 = document.querySelector('#answer3').value
    const answer4 = document.querySelector('#answer4').value
    const correct1 = document.querySelector('#correct1').checked ? 1 : null
    const correct2 = document.querySelector('#correct2').checked ? 2 : null
    const correct3 = document.querySelector('#correct3').checked ? 3 : null
    const correct4 = document.querySelector('#correct4').checked ? 4 : null
    const isQuesHaveImg = document.querySelector('#noImage').checked
    const imgFilesContainer = document.querySelector('#image').files
    const correct = [correct1, correct2, correct3, correct4 ].filter(item => item !== null)
    const updateData = {
      index: adminModel.currentQuesIndex,
      question, category, 
      answers: [
        {no: 1, value: answer1},
        {no: 2, value: answer2},
        {no: 3, value: answer3},
        {no: 4, value: answer4}],
      correct,
      images: null,
      createdAt: new Date()
    }

    // kiem tra du lieu nhap
      // check answers
    if(!updateData.correct.length) document.querySelector('.form__check__answer').style.color = "red"
      // check others
    const checkSumitInput = [
    adminController.checkValueSubmit(question,'#question__container'),
    adminController.checkValueSubmit(category,'#category__container'),
    adminController.checkValueSubmit(answer1,'#answer1'),
    adminController.checkValueSubmit(answer2,'#answer2'),
    Boolean(updateData.correct.length)]
    if(checkSumitInput.includes(false)) return

    // Uploading 
    if(isQuesHaveImg && imgFilesContainer.length > 0) {
      const storage = firebase.storage()
      const gsReference = storage.refFromURL(`gs://driving-test-exam.appspot.com/B2/${updateData.index}`)
      const metadata = { contentType: imgFilesContainer[0].type || 'image/jpeg'}
      await gsReference.put(imgFilesContainer[0], metadata)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => updateData.images = url)
    } else { updateData.images = null }

    await firebase.firestore().doc(`tests/B2/question-list/question-${updateData.index}`)
      .set({...updateData},{merge: true})
      .then(function() {
        console.log(`Uploaded question ${updateData.index} done`)
      })
      .catch(function(error) {
          console.error("Error writing document: ", error)
      })

    // Close modal and resfresh page
    authView.openModal(false)
    adminController.changePage(adminModel.currentPage)
    loadingView.hide()


  },
  changePage: (specificPageNum, change) => {
    console.log("specificPageNum", specificPageNum)
    console.log("change", change)
    const inputPage = document.querySelector('.admin__pagination--input')
    adminModel.question = []

    if(specificPageNum) adminModel.currentPage = specificPageNum

    if(change) adminModel.currentPage += change

    if(adminModel.currentPage <= 0) adminModel.currentPage = 1
    if(adminModel.currentPage > 45) adminModel.currentPage = 45

    inputPage.value = adminModel.currentPage
    adminController.getAndShowData(adminModel.currentPage)

  },
  inputChange: (event) => {
    adminModel.currentPage = Number(event.target.value)
  },
  imgChooseCheckbox: () => {
    const inputImage = document.querySelector('#noImage')
    if(inputImage.checked) {
      document.querySelector('#image').style.display = 'block'
      document.querySelector('#output_image').style.display = 'block'

    } else {
      document.querySelector('#image').style.display = 'none'
      document.querySelector('#output_image').style.display = 'none'

    }
  },
  checkValueSubmit: (value, query) => {
    document.querySelector(query).style.outlineColor = ""
    if (!value) {
      document.querySelector(query).style.outlineColor = "red"
      return false
    }
    return true
  }
}
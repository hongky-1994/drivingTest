const adminView = {
  showScreen: (screen) => {
    const appContainer = document.querySelector(".app-container")
    appContainer.innerHTML = adminComponents[screen]
  },
  changeTab: (tabNo) => {
    const leftSideTabs = document.querySelectorAll('.left__item')
    const manageTabs = document.querySelectorAll('.manage__tab')
    leftSideTabs.forEach(item => {
      item.classList.remove('active')
    })
    manageTabs.forEach(item => {
      item.classList.remove('active')
    })
    leftSideTabs[tabNo].classList.add("active")
    manageTabs[tabNo].classList.add("active")
  },
  getData: () => {
    const tableBody = document.querySelector('.table__body')
    tableBody.innerHTML = ''
    const db = firebase.firestore()
    db.collection('tests/B2/question-list')
      .where('index','>=', 420)
      .limit(10)
      .get()
      .then(collection => {
        collection.forEach(item => {
          const doc = item.data()
          
          let images = ''
          if(doc.images) images = `
          <img src=${doc.images} alt='hello'/>`
          
          let answers = ''
          doc.answers.forEach(item => {
            if(item.value) answers += `<p>${item.no}. ${item.value}</p>`
          })

          tableBody.innerHTML += `
          <tr>
            <td class='text-wrap small'><input type='checkbox' /></td>
            <td class='text-wrap small'>${doc.index}</td>
            <td class='text-wrap small'>${doc.category}</td>
            <td class='text-wrap small'>${doc.question}</td>
            <td class='text-wrap small'>${answers}</td>
            <td class='text-wrap small'>
              <button class='btn btn-info'>Chỉnh sửa</button>
              <button class='btn btn-danger'>Xóa</button>
            </td>
          </tr>
          `
        })
    })
  }
  
}
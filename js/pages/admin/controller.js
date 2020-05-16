const adminController = {
  getData: async () => {
    const tableBody = document.querySelector('.table__body')
    tableBody.innerHTML = ''
    const db = firebase.firestore()
    loadingView.show()
    await db.collection('tests/B2/question-list')
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
            <td class='text-wrap small d-flex'>
              <button class='btn btn-info mr-3' onclick="adminView.openModalEdit(true, ${doc.index})"><i class="fas fa-tools"></i></button>
              <button class='btn btn-danger'><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
          `
        })
    }).then(() => loadingView.hide())
  }
}
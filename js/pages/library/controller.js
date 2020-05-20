const libraryController = {
  changeCategory: async (cate) => {
  console.log("cate", cate)
    const index = libraryModel.list.findIndex(item => item.category === cate)
    console.log("libraryModel.list.findIndex(item => item.category === cate)", libraryModel.list.findIndex(item => item.category === cate))
    console.log("index", index)
    
    if(libraryModel.list[index].questionsList.length === 0) {
      console.log("questionsList", libraryModel.list[index].questionsList)
      loadingView.show()
      const db = firebase.firestore()
      await db.collection('tests/B2/question-list')
      .orderBy('index')
      .where('category', '==', cate)
      .get()
      .then(collection => {
        collection.forEach(item => {
          const doc = item.data()
          libraryModel.list[index].questionsList.push(doc)
        })
      })
      .then(() => loadingView.hide())
    }

    libraryView.changeActiveLeft(index)
    libraryView.showQues(index)
  }
}
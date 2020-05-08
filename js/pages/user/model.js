const examModel = {
    getStructuredQuestion: () => {
        let questionLists = firebase.firestore().doc(`tests/B2/question-list/question-1`)
        questionLists
            .get()
            .then( 
                (snapshot) => {
                    snapshot.docs.forEach(doc => {
                        console.log(doc.data());
                    })
                }
            )
    }
}
examModel.getStructuredQuestion()
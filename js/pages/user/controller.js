const userController = {
    addNewUser: async(email)=> {
        let userDoc = await firebase.firestore()
            .collection('users')
            .doc(email)
            .get()
            .then(doc=> {return doc.data()})
        
        if(!userDoc){
            userModel.currentUser = firebase.auth().currentUser
            console.log(userModel);

            //set id of each document on firebase = user's email
            let email = firebase.auth().currentUser.email
            let user = {email: email,}

            await firebase.firestore()
                .collection('users')
                .doc(`${email}`)
                .set({user})

            userModel.currentUserId = email
            userModel.saveUserId(email)
        }
    },
    //still need to change a little bit
    editPassword: async(currentPassword, newPassword) => {
        let user = firebase.auth().currentUser
        let currentEmail = firebase.auth().currentUser.email
        let modalEditPassword = document.querySelector('.modal-edit-password')
        //reauthenticate user
        let credential = firebase.auth.EmailAuthProvider.credential(
            currentEmail,
            currentPassword,
        )
        console.log('credential', credential);
        
        let reauthenticatedTrue = true
        await user.reauthenticateWithCredential(credential).then(()=>{
            reauthenticatedTrue = true
        }).catch((error)=>{
            let messageError = error.code
            userView.setText('#input-current-password-error', messageError)
            reauthenticatedTrue = false
            modalEditPassword.style.display = "block"
        })

        // console.log(newPassword)
        if(reauthenticatedTrue == true){
            await user.updatePassword(newPassword).then(() => {
                console.log('update password successfully');
                
            }).catch((error)=> {
                console.log('error', error);    
            })
        }
    },
    editProfileImage: (file) => {
        console.log("user's profile image")
        let email = firebase.auth().currentUser.email
        const ref = firebase.storage().refFromURL(`gs://driving-test-exam.appspot.com/user-image/${email}`)
        
        const name = email + '-' + file.name + '-' + new Date()
        // const name = new Date()
        const metadata = {
            contentType: file.type,
        }
        
        const task = ref.child(name).put(file, metadata)
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                let user = firebase.auth().currentUser
                let profileImage = document.querySelector('.user-image')
                let btnSubmitProfileImage = document.querySelector('.btn-submit-user-image')
            
                user.updateProfile({
                    photoURL: url
                }).then(()=>{
                    authModel.user.photoURL = url
                    console.log('updated photo');
                    authView.openModal(true, "Thông báo","success", "Update succesfully")
                    console.log(authModel.user, user);
                    
                })
                // console.log(url);
                console.log('upload successful');

                profileImage.style.backgroundImage = `url('${url}')`
                btnSubmitProfileImage.style.display = "none"
            })
        
    },
    uploadTestToFirebase: async() => {
        let email = firebase.auth().currentUser.email
        let list30Answer = examModel.list30Answer
        let answerNotCorrect = examModel.answerNotCorrect
        let testTotalTime = examModel.testTotalTime
        let list30Index = examModel.list30Index   
        let testType = examModel.testType 
        let correctAnswers = examModel.correctAnswers
        let now = new Date().toISOString()
        // let userId = userModel.currentUserId
        // console.log(userId);

        let newTest = {
            list30Index: list30Index,
            list30Answer: list30Answer,
            answerNotCorrect: answerNotCorrect,
            testTotalTime: testTotalTime,
            testType: testType,
            correctAnswers: correctAnswers,
            submitAt: now,
        }
        await firebase.firestore()
            .collection('users')
            .doc(`${email}`)
            .update({
                submissions:firebase.firestore.FieldValue.arrayUnion(newTest)
            })
    },
    getTestFromFirebase: async () => {
        let email = firebase.auth().currentUser.email
        userModel.testData = await firebase.firestore()
            .collection('users')
            .doc(`${email}`)
            .get()
            .then(doc => doc.data().submissions)
    },
    getSelectedTest: (index) => {
        examModel.list30Index = userModel.testData[index].list30Index
        examModel.list30Answer = userModel.testData[index].list30Answer
        examModel.answerNotCorrect = userModel.testData[index].answerNotCorrect
    }, 
    addHistoryElementEvent: () => {
        for(let i = 0; i < 30; i++) {
            let historyElement = document.querySelector(`.history-${i}`)
            historyElement.addEventListener("click",() => {
                userController.getSelectedTest(i)
                userView.showScreen('history')
            })
        }
    }
}
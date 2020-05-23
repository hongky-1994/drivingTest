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
    editPassword: async(currentPassword, newPassword) => {
        loadingView.show()
        const user = firebase.auth().currentUser
        const currentEmail = user.email
        
        //reauthenticate user
        const credential = firebase.auth.EmailAuthProvider.credential(
            currentEmail,
            currentPassword,
        )
        
        let reauthenticatedTrue;
        await user.reauthenticateWithCredential(credential)
            .then(()=>{
                reauthenticatedTrue = true
            }).catch( error =>{
                const messageError = error.code
                document.querySelector('#input-current-password-error').innerHTML = "Mật khẩu hiện tại sai."
                reauthenticatedTrue = false
            })

        if(reauthenticatedTrue === true){
            await user.updatePassword(newPassword)
            .then(() => {
                userView.openModalEditPassword(false)
                authView.openModal(true, '', 'success', "Thay đổi mật khẩu thành công.")
            }).catch(error => {
                console.log('error', error);  
                document.querySelector('#input-new-password-error').innerHTML = "Độ dài mật khẩu cần lớn hơn 6 ký tự"
            })
        }
        loadingView.hide()

    },
    editProfileImage: async (file) => {
        const user = firebase.auth().currentUser
        const ref = firebase.storage().refFromURL(`gs://driving-test-exam.appspot.com/user-image/${authModel.user.email}`)
        const name = authModel.user.email + '-' + file.name + '-' + new Date()
        const metadata = {contentType: file.type}
        
        loadingView.show()

        // upload to fireStorage
        await ref.child(name)
        .put(file, metadata)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            authModel.user.photoURL = url
        })

        // update to userInfo fireauth
        await user.updateProfile({photoURL: authModel.user.photoURL})
        
        // Cập nhật luôn url đã lấy vào các ô ảnh
        loadingView.imgLoading('.image_holder', authModel.user.photoURL)
        // document.querySelector('.user-image__container').src = authModel.user.photoURL
        document.querySelector(".avata__img").src = authModel.user.photoURL
        authView.openModal(true, "Thông báo","success", "Update succesfully")
        
        loadingView.hide()
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
    },


    submitChangePassword: (event) => {
        event.preventDefault()
        // validate password changeer
        const formEditPassword = event.target
        
        // password object
        const inputInfo = {
            currentPassword: formEditPassword.currentPassword.value,
            newPassword: formEditPassword.newPassword.value,
            confirmNewPassword: formEditPassword.confirmNewPassword.value,
        }
        console.log("inputInfo", inputInfo)
        
        //validate data
        const validateResult = [
            userController.validate(inputInfo.currentPassword, '#input-current-password-error', "Mật khẩu hiện tại bị bỏ trống."),
            userController.validate(inputInfo.newPassword, '#input-new-password-error', "Chưa nhập mật khẩu mới"),
            userController.validate(inputInfo.currentPassword !== inputInfo.newPassword, '#input-new-password-error', "Mật khẩu mới bị trùng mật khẩu cũ."),
            userController.validate(inputInfo.confirmNewPassword === inputInfo.newPassword, '#input-confirm-new-password-error', "Chưa khớp với mật khẩu mới")
        ]

        //submit data and close model
        if(!validateResult.includes(false)){
            userController.editPassword(inputInfo.currentPassword ,inputInfo.newPassword)
        }
    },
    validate: (condition, queryError, messageError) => {
        if(condition){
            userView.setText(queryError, '')
            return true
        }else{
            userView.setText(queryError, messageError)
            return false
        }
    },
}
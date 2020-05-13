const userController = {
    signOut: () => {
        firebase.auth().signOut()
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
    
}
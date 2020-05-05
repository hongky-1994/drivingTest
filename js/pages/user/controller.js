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

}
const userController = {
    signOut: () => {
        firebase.auth().signOut()
    },
    editEmail: (email, password) => {
        //verify if email exists

        //reauthenticate -> change email
    },

}
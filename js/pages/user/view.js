const userView = {
    showScreen: (screen) => {
        let app = document.querySelector('#app')

        switch (screen) {
            case 'user':{
                app.innerHTML = userComponents.user

                userView.showCurrentUserInfo()
            }
        
        }
    },
    
    //functions in use
    showCurrentUserInfo: () => {
        //display user email
        let userEmailHtml = document.querySelector('.user-email-html')
        let currentEmail = firebase.auth().currentUser.email
        userEmailHtml.innerHTML += currentEmail
    }
}
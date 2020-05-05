const examView = {
    showScreen: (screen) => {
        let app = document.querySelector('.app-container')

        switch (screen) {
            case 'testType': {
                app.innerHTML = examComponents.testType
                break
            }
            case 'structuredTest': {
                
            }
        }
    }
}
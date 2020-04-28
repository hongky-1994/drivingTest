const userView = {
    showScreen: (screen) => {
        console.log("Show screen", screen);
        let app = document.querySelector('#app')
        app.innerHTML = userComponents.main
    },
    
}
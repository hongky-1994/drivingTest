const mainView ={
  showScreen: (screen) => {
    const app = document.querySelector(".app-container")
    app.innerHTML = mainComponents[screen]
  }
}
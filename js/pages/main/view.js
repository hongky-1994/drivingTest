const mainView ={
  showScreen: (screen) => {
    console.log("SHOW SCREEN ",screen)
    const app = document.querySelector(".app-container")
    app.innerHTML = mainComponents[screen]
  }
}
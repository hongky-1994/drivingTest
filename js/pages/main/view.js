const mainView ={
  showScreen: (screen) => {
    console.log("SHOW SCREEN ",screen)
    const app = document.querySelector("#app")
    app.innerHTML = mainComponents[screen]
  }
}
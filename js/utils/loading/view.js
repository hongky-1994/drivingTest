const loadingView = {
  show: () => {
    const app = document.querySelector(".loader")
    app.innerHTML = `<div class="loading__container"><div class="loading"></div></div>`
  },
  hide: () => {
    const app = document.querySelector(".loader")
    app.innerHTML = ""
  }

}
const loadingView = {
  show: () => {
    const loadingDiv = document.querySelector(".loader")
    loadingDiv.innerHTML = `<div class="loading__container"><div class="loading"></div></div>`
  },
  hide: () => {
    const loadingDiv = document.querySelector(".loader")
    loadingDiv.innerHTML = ""
  }

}
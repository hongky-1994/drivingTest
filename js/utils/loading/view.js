const loadingView = {
  show: () => {
    const loadingDiv = document.querySelector(".loader")
    loadingDiv.innerHTML = `<div class="loading__container"><div class="loading"></div></div>`
  },
  hide: () => {
    const loadingDiv = document.querySelector(".loader")
    loadingDiv.innerHTML = ""
  },
  imgLoading: (query, src) => {
    const imageContainer = document.querySelector(query)
    console.log("query", query)
    console.log("imageContainer", imageContainer)

    console.log('loading img src', src)
    if (imageContainer) {imageContainer.src = '../../js/assets/images/loading.gif'
      const newImg = new Image()
      newImg.src = src
      newImg.setAttribute('class', imageContainer.classList.value)
      newImg.onload = () => imageContainer.replaceWith(newImg)
    } return
  }

}
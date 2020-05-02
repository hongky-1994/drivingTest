const layoutView = {
  show: (screen) => {
    const div = document.querySelector(screen)
    div.innerHTML = headerComponents[screen.replace(".","")]
    
    // change avata
    document.querySelector(".avata__img").src = authModel.user.photoUrl
    document.querySelector(".header__welcome").innerText = "Xin chào "+ (authModel.user.name === null ? "Người lạ." : authModel.user.name)
  },
  hide: (screen) => {
    const div = document.querySelector(screen)
    div.innerHTML = ""
  },
  showNav: () => {
    const navbar = document.querySelector('.header__nav')
    const navbarOverlay = document.querySelector('.header__nav--overlay')
    const app = document.querySelector('#app')
    console.log("nav bar navbar", navbar.style.display)
    console.log("nav bar navbar overlay", navbarOverlay.style.display)
    if(navbar.style.display === "none" || !navbar.style.display) {
      navbarOverlay.style.display = navbar.style.display = "block"
      app.style.height = "100vh"
    } else {
      navbar.style.display = "none"
      navbarOverlay.style.display = "none"
      app.style.height = ""
    }
  }
}



// layout component
const headerComponents = {
  header: `
  <section class="header">
    <div class="bg--purple1 py-2"></div>
    <div class="bg--purple2 d-flex w-100 justify-content-between align-items-center px-5 py-4">
      <h1 class="color--white1 px-5 my-1" onclick="userView.showScreen('user')">DRIVING TEST</h1>
      <div class="color--white1 px-5 d-flex align-items-center">
        <div class="d-flex align-items-center pr-4">
          <div class="avata__container">
            <img class="avata__img" src="" alt="user avata"/>
          </div>
          <h2 class="mb-0 px-3 border-right header__welcome">Xin chào </h2>
        </div>
        <i class="fas fa-bars fa-3x pointer" onclick="layoutView.showNav()" ></i>
      </div>
      </div> 
    </div>
    <div class="header__nav--overlay" onclick="layoutView.showNav()"></div>
    <div class="header__nav">
      <div class="header__item pl-4 py-3 color--grey3 h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--purple2">Kiểm tra kiến thức</div>
      <div class="header__item pl-4 py-3 color--grey3 h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--purple2">Thư viện đề thi</div>
      <div class="header__item pl-4 py-3 color--grey3 h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--purple2">Thông tin các nhân</div>
      <div onclick="authView.signOut()" class="header__item pl-4 py-3 text-danger h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--red1">Đăng xuất</div>
    </div>
  </section>
  `
}
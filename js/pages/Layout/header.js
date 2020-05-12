const layoutView = {
  show: (screen) => {
    const div = document.querySelector(screen)
    div.innerHTML = headerComponents[screen.replace(".","")]
    
    // change avata
    document.querySelector(".avata__img").src = authModel.user.photoUrl
    document.querySelector(".header__welcome").innerText = ((authModel.user.name === null || authModel.user.name === undefined) ? "Người lạ" : authModel.user.name)
  },
  hide: (screen) => {
    const div = document.querySelector(screen)
    div.innerHTML = ""
  },
  showNav: () => {
    const navbar = document.querySelector('.header__nav')
    const navbarOverlay = document.querySelector('.header__nav--overlay')
    const app = document.querySelector('#app')
    if(navbar.style.display === "none" || !navbar.style.display) {
      navbarOverlay.style.display = navbar.style.display = "block"
      app.style.height = "100vh"
      app.style.overFlow = "hidden"
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
    <div class="bg--purple2 d-flex w-100 justify-content-between align-items-center py-2 px-lg-5 px-md-4 px-2">
      <h1 class="color--white1 my-1 pointer pl-lg-5 pl-md-4 pl-2" onclick="push('main')">DRIVING TEST</h1>
      <div class="color--white1 d-flex align-items-center pr-lg-5 pr-md-4 pr-2">
        <div class="d-sm-flex d-none align-items-center pr-4">
          <div class="avata__container pointer">
            <img class="avata__img" src="" alt="user avata"/>
          </div>
          <h2 class="mb-0 px-3 border-right header__welcome pointer" onclick="push('user')">Xin chào </h2>
        </div>
        <i class="fas fa-bars fa-3x pointer" onclick="layoutView.showNav()" ></i>
      </div>
    </div>

    <div class="header__nav--overlay" onclick="layoutView.showNav()"></div>

    <div class="header__nav">
      <div class="header__item pl-4 py-3 color--grey3 h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--purple2" 
        onclick="push('testType'); layoutView.showNav()">
        Kiểm tra kiến thức
      </div>

      <div class="header__item pl-4 py-3 color--grey3 h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--purple2"
        onclick="layoutView.showNav()">
        Thư viện đề thi
      </div>

      <div class="header__item pl-4 py-3 color--grey3 h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--purple2"
        onclick="push('user'); layoutView.showNav()">
        Thông tin cá nhân
      </div>

      <div class="header__item pl-4 py-3 color--grey3 h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--purple2"
        onclick="push('admin'); layoutView.showNav()">
        Trang quản lý câu hỏi của admin (chỉ admin mới thẩy -- bổ sung sau)
      </div>

      <div class="header__item pl-4 py-3 text-danger h2 font-weight-lighter m-0 bg--white1 bg--hover--grey2 color--hover--red1"
        onclick="authView.signOut()">
        Đăng xuất
      </div>

    </div>
  </section>
  `
}
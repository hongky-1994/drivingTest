const authComponents = {
  signIn: `
    <div class="container auth-container pt-5">
      <form class="w-100 bg-white rounded--10" onsubmit="authView.signIn(event)">
        <h1 class="font-weight-bold text-center mb-5 color--blue2">DRIVING REAL TEST</h1>
        <div class="row mb-5 bg--grey1 p-2 rounded--10">
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10 pointer text-white bg--blue2">Đăng nhập</h2>
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10 pointer color--blue2" onclick="authView.showScreen('signUp')">Đăng ký</h2>
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10 pointer color--blue2" onclick="authView.showScreen('anonymous')">Ẩn danh</h2>
        </div>
        <div class="form-group row mb-3">
          <label for="email" class="col-2">Email của bạn</label>
          <div class="input-wrapper col-10">
            <input type="text" class="form-control" name="email" placeholder="VD: test1@gmail.com"/>
            <span class="error__message error__email text-danger"></span>
          </div>  
        </div>
        <div class="form-group row mb-3">
          <label for="password" class="col-2">Mật khẩu</label>
          <div class="input-wrapper col-10">
            <input type="password" class="form-control" name="password" placeholder="******************"/>
            <span class="error__message error__password text-danger"></span>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn bg--blue2 text-white px-4">Đăng nhập</button>
        </div>
      </form>
    </div>`,
  signUp: `
    <div class="container auth-container pt-5">
      <form class="w-100 bg-white rounded--10" onsubmit="authView.signUp(event)">
        <h1 class="font-weight-bold text-center mb-5 color--blue2">DRIVING REAL TEST</h1>
        <div class="row mb-5 bg--grey1 p-2 rounded--10 ">
        <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10  pointer color--blue2" onclick="authView.showScreen('signIn')">Đăng nhập</h2>
        <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10  pointer text-white bg--blue2">Đăng ký</h2>
        <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10  pointer color--blue2" onclick="authView.showScreen('anonymous')">Ẩn danh</h2>
        </div>
        <div class="form-group row mb-3">
          <label for="email" class="col-2">Email của bạn</label>
          <div class="input-wrapper col-10">
            <input type="text" class="form-control" name="email" placeholder="VD: test1@gmail.com"/>
            <span class="error__message error__email text-danger"></span>
          </div>  
        </div>
        <div class="form-group row mb-3">
          <label for="password" class="col-2">Mật khẩu</label>
          <div class="input-wrapper col-10">
            <input type="password" class="form-control" name="password" placeholder="******************"/>
            <span class="error__message error__password text-danger"></span>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="rePassword" class="col-2">Nhập lại mật khẩu</label>
          <div class="input-wrapper col-10">
            <input type="password" class="form-control" name="rePassword" placeholder="******************"/>
            <span class="error__message error__rePassword text-danger"></span>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn bg--blue2 text-white px-4">Đăng ký</button>
        </div>
      </form>
    </div>`,
  anonymous: `
    <div class="container auth-container pt-5">
      <form class="w-100 bg-white rounded--10" onsubmit="authView.signUp(event)">
        <h1 class="font-weight-bold text-center mb-5 color--blue2">DRIVING REAL TEST</h1>
        <div class="row mb-5 bg--grey1 p-2 rounded--10">
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10 pointer color--blue2" onclick="authView.showScreen('signIn')">Đăng nhập</h2>
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10 pointer color--blue2" onclick="authView.showScreen('signUp')">Đăng ký</h2>
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded--10 pointer text-white bg--blue2">Ẩn danh</h2>
        </div>
        <div class="form-group mb-5">
          <h3 class="text-justify color--blue2">Đăng nhập ẩn danh sẽ không lưu lại kết quả thi của bạn. Để có thể lưu trữ kết quả và xem lại lịch sử thi, vui lòng đăng nhập hoặc đăng ký tài khoản.</h3>
        </div>
        <button type="submit" class="btn bg--blue2 text-white px-4" onclick="authView.signAnonymouse()">Đăng nhập ẩn danh</button>
      </form>
    </div>
  `,
  modal: `
  <div class="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-capitalize">Modal title</h5>
          <button type="button" class="close" onclick="authView.openModal(false)">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body d-flex flex-column align-items-center">
          <div class="modal-icon"></div>
          <p class="text-capitalize"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="authView.openModal(false)">Close</button>
        </div>
      </div>
    </div>
  </div>`
}
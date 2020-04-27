const authComponents = {
  signIn: `
    <div class="container auth-container mt-5">
      <form action="" class="w-100 bg-white rounded" onsubmit="authView.signIn(event)">
        <h1 class="font-weight-bold text-center mb-5 text-primary">DRIVING REAL TEST</h1>
        <div class="row mb-4 bg-light rounded">
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-white bg-primary">Đăng nhập</h2>
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-secondary" onclick="authView.showScreen('signUp')">Đăng ký</h2>
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-secondary" onclick="authView.showScreen('anonymous')">Ẩn danh</h2>
        </div>
        <div class="form-group ">
          <label for="">Email của bạn</label>
          <div class="input-wrapper">
            <input type="text" class="form-control" name="email"/>
            <span class="error__message error__email text-danger"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input type="password" class="form-control" name="password"/>
          <span class="error__message error__password text-danger"></span>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Đăng nhập</button>
        </div>
      </form>
    </div>`,
  signUp: `
    <div class="container auth-container mt-5">
      <form action="" class="w-100 bg-white rounded" onsubmit="authView.signUp(event)">
        <h1 class="font-weight-bold text-center mb-5 text-primary">DRIVING REAL TEST</h1>
        <div class="row mb-4 bg-light rounded">
        <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-secondary" onclick="authView.showScreen('signIn')">Đăng nhập</h2>
        <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-white bg-primary">Đăng ký</h2>
        <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-secondary" onclick="authView.showScreen('anonymous')">Ẩn danh</h2>
        </div>
        <div class="form-group ">
          <label for="">Email của bạn</label>
          <input type="text" name="email" class="form-control" />
          <span class="error__message error__email text-danger"></span>
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input type="password" name="password" class="form-control" />
          <span class="error__message error__password text-danger"></span>
        </div>
        <div class="form-group">
          <label for="password">Nhập lại mật khẩu</label>
          <input type="password" name="rePassword" class="form-control" />
          <span class="error__message error__rePassword text-danger"></span>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Đăng ký</button>
        </div>
      </form>
    </div>`,
  anonymous: `
    <div class="container auth-container mt-5">
      <form class="w-100 bg-white rounded" onsubmit="authView.signUp(event)">
        <h1 class="font-weight-bold text-center mb-5 text-primary">DRIVING REAL TEST</h1>
        <div class="row mb-4 bg-light rounded">
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-secondary" onclick="authView.showScreen('signIn')">Đăng nhập</h2>
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-secondary" onclick="authView.showScreen('signUp')">Đăng ký</h2>
          <h2 class="font-weight-bold col-4 m-0 py-2 text-center rounded pointer text-white bg-primary">Ẩn danh</h2>
        </div>
        <div class="form-group">
          <h3 class="text-justify text-secondary my-3">Đăng nhập ẩn danh sẽ không lưu lại kết quả thi của bạn. Để có thể lưu trữ kết quả và xem lại lịch sử thi, vui lòng đăng nhập hoặc đăng ký tài khoản.</h3>
          <button type="submit" class="btn btn-primary">Đăng nhập ẩn danh</button>
        </div>
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
        <div class="modal-body">
          <p class="text-capitalize"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="authView.openModal(false)">Close</button>
        </div>
      </div>
    </div>
  </div>`
}
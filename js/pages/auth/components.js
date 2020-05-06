const authComponents = {
  signIn: `
    <div class="container auth-container pt-5">
      <form class="w-100 bg-white rounded--15" onsubmit="authView.signIn(event)">
        <h1 class="auth--title display-4 font-weight-bold text-center mb-5 color--purple2 text-shadow">DRIVING TEST EXAM</h1>
        <div class="row mb-5 bg--grey1 p-2 rounded--15 shadow">
          <h2 class="col-4 m-0 py-2 text-center rounded--15 pointer text-white bg--purple2">Đăng nhập</h2>
          <h2 class="col-4 m-0 py-2 text-center rounded--15 pointer color--purple2" onclick="authView.showScreen('signUp')">Đăng ký</h2>
          <h2 class="col-4 m-0 py-2 text-center rounded--15 pointer color--purple2" onclick="authView.showScreen('anonymous')">Ẩn danh</h2>
        </div>
        <div class="form-group row mb-3">
          <label for="email" class="col-3 h4">Email của bạn</label>
          <div class="input-wrapper col-9">
            <input type="text" class="form-control h4" name="email" placeholder="VD: test1@gmail.com"/>
            <span class="error__message error__email text-danger"></span>
          </div>  
        </div>
        <div class="form-group row mb-3">
          <label for="password" class="col-3 h4">Mật khẩu</label>
          <div class="input-wrapper col-9">
            <input type="password" class="form-control h4" name="password" placeholder="******************"/>
            <span class="error__message error__password text-danger"></span>
          </div>
        </div>
        <div class="form-group">
          <p class="font-italic mb-5 h5 color--gray2 color--hover--blue1 pointer"
            onclick="authView.showScreen('resetPassword')"  
          >Quên mật khẩu ?</p>
        </div>
        <div class="form-group">
          <button type="submit" class="h2 w-100 bg--purple2 text-white p-2 border-0 rounded--15 shadow">Đăng nhập</button>
        </div>
      </form>
    </div>`,
  signUp: `
    <div class="container auth-container pt-5">
      <form class="w-100 bg-white rounded--15" onsubmit="authView.signUp(event)">
        <h1 class="auth--title display-4 font-weight-bold text-center mb-5 color--purple2 text-shadow">DRIVING TEST EXAM</h1>
        <div class="row mb-5 bg--grey1 p-2 rounded--15 shadow">
        <h2 class="col-4 m-0 py-2 text-center rounded--15  pointer color--purple2" onclick="authView.showScreen('signIn')">Đăng nhập</h2>
        <h2 class="col-4 m-0 py-2 text-center rounded--15  pointer text-white bg--purple2">Đăng ký</h2>
        <h2 class="col-4 m-0 py-2 text-center rounded--15  pointer color--purple2" onclick="authView.showScreen('anonymous')">Ẩn danh</h2>
        </div>
        <div class="form-group row mb-3">
          <label for="email" class="col-3 h4">Email của bạn</label>
          <div class="input-wrapper col-9">
            <input type="text" class="form-control h4" name="email" placeholder="VD: test1@gmail.com"/>
            <span class="error__message error__email text-danger"></span>
          </div>  
        </div>
        <div class="form-group row mb-3">
          <label for="name" class="col-3 h4">Tên của bạn</label>
          <div class="input-wrapper col-9">
            <input type="text" class="form-control h4" name="name" placeholder="VD: Nguyễn Xuân Anh"/>
            <span class="error__message error__name text-danger"></span>
          </div>  
        </div>
        <div class="form-group row mb-3">
          <label for="password" class="col-3 h4">Mật khẩu</label>
          <div class="input-wrapper col-9">
            <input type="password" class="form-control h4" name="password" placeholder="******************"/>
            <span class="error__message error__password text-danger"></span>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="rePassword" class="col-3 h4">Nhập lại mật khẩu</label>
          <div class="input-wrapper col-9">
            <input type="password" class="form-control h4" name="rePassword" placeholder="******************"/>
            <span class="error__message error__rePassword text-danger"></span>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="h2 w-100 bg--purple2 text-white p-2 border-0 rounded--15 shadow">Đăng ký</button>
        </div>
      </form>
    </div>`,
  anonymous: `
    <div class="container auth-container pt-5">
      <form class="w-100 bg-white rounded--15" onsubmit="authView.signAnonymouse()">
        <h1 class="auth--title display-4 font-weight-bold text-center mb-5 color--purple2 text-shadow">DRIVING TEST EXAM</h1>
        <div class="row mb-5 bg--grey1 p-2 rounded--15 shadow">
          <h2 class="col-4 m-0 py-2 text-center rounded--15 pointer color--purple2" onclick="authView.showScreen('signIn')">Đăng nhập</h2>
          <h2 class="col-4 m-0 py-2 text-center rounded--15 pointer color--purple2" onclick="authView.showScreen('signUp')">Đăng ký</h2>
          <h2 class="col-4 m-0 py-2 text-center rounded--15 pointer text-white bg--purple2">Ẩn danh</h2>
        </div>
        <div class="form-group mb-5">
          <h3 class="text-justify color--grey3">- Đăng nhập ẩn danh sẽ không lưu lại kết quả thi của bạn.</h3>
          <br/>
          <h3 class="text-justify color--grey3">- Để có thể lưu trữ kết quả và xem lại lịch sử thi, vui lòng đăng nhập hoặc đăng ký tài khoản.</h3>
        </div>
        <button type="submit" class="h2 w-100 bg--purple2 text-white p-2 border-0 rounded--15 shadow" >Đăng nhập ẩn danh</button>
      </form>
    </div>
  `,
  resetPassword: `
  <div class="container auth-container pt-5">
      <form class="w-100 bg-white rounded--15" onsubmit="authView.resetPassword(event)">
        <h1 class="auth--title display-4 font-weight-bold text-center mb-5 color--purple2 text-shadow">DRIVING TEST EXAM</h1>
        <div class="row mb-5 bg--grey1 p-2 rounded--15 shadow">
          <h2 class="col-4 m-0 py-2 text-center rounded--15 pointer color--purple2" onclick="authView.showScreen('signIn')">Quay lại</h2>
          <h2 class="col-8 m-0 py-2 text-center rounded--15 pointer text-white bg--purple2">Lấy lại mật khẩu</h2>
        </div>
        <div class="form-group row mb-3">
          <label for="email" class="col-3 h4">Email đăng ký của bạn</label>
          <div class="input-wrapper col-9">
            <input type="text" class="form-control h4" name="email" placeholder="VD: test1@gmail.com"/>
            <span class="error__message error__email text-danger"></span>
          </div>  
        </div>
        <div class="form-group">
          <button type="submit" class="h2 w-100 bg--purple2 text-white p-2 border-0 rounded--15 shadow">Gửi email xác nhận.</button>
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
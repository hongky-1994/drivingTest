const mainComponents = {
  main:`
  <div class="main">
      <div class="container border">
        <div class="main__header py-5 d-flex justify-content-between">
          <h1>Xin chào người dùng</h1>
          <button class="btn btn-danger" onclick="authView.signOut()">Đăng xuất</button>
        </div>
        <div class="main__body">
          <div class="tests row bg-light">
            <div class="col-12 h2 pt-4 font-weight-bold text-primary">Bằng lái B2</div>

            <div class="col-sm-6 col-lg-3 p-4">
              <h3 class="text-center justify-content-center align-items-center d-flex w-100 h-100 font-weight-bold p-4 pointer text-white rounded bg-info">Thông tin bằng lái</h3>
            </div>
            <div class="col-sm-6 col-lg-3 p-4">
              <h3 class="text-center justify-content-center align-items-center d-flex w-100 h-100 font-weight-bold p-4 pointer text-white rounded bg-primary">Làm đề thi</h3>
            </div>
            <div class="col-sm-6 col-lg-3 p-4">
              <h3 class="text-center justify-content-center align-items-center d-flex w-100 h-100 font-weight-bold p-4 pointer text-white rounded bg-success">Ngân hàng câu hỏi</h3>
            </div>
            <div class="col-sm-6 col-lg-3 p-4">
              <h3 class="text-center justify-content-center align-items-center d-flex w-100 h-100 font-weight-bold p-4 pointer text-white rounded bg-warning">Thống kê kết quả</h3>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  `
}
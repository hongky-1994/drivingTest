const userComponents = {
  user: `
    <section class="user-container ">
      <div class="px-5 pt-5 pb-3 row m-0">
        <!-- user info -->
        <div class="user-info col-12 col-lg-5">
          <div class="user-greetings d-flex justify-content-between">
            <div class="user-greetings-content h2 font-weight-bold">Xin chào, </div>
            <button class="btn-edit-icon icon-greetings" onclick="userView.openModalUpdateOption(true)">
              <i class="far fa-edit fa-2x"></i>
            </button>
          </div>
          <div class="btn-sign-out pointer" onclick="authView.signOut()"><u>Không phải tôi? Đăng xuất</u></div>
          <div class="user-image-container my-3">
            <div class="image__overlay w-100 h-100 rounded-circle"></div>
            <i class="far fa-edit fa-3x icon__edit"></i>
            <input type="file" id="photo" class="custom-file-input pointer" onchange="userController.editProfileImage(event)">
            <image class="image_holder w-100 h-100" />
          </div>
          <div class="user-email mb-4">
            <div class="user-email-html h4 font-weight-bold text-center">Email: </div>
          </div>
        </div>

        <!-- user test result -->
        <div class="user-result col-12 col-lg-7">
          <div class='row'>
            <div class="user-test-history col-12 mb-4">
              <table class="user__table rounded--20">
                <thead>
                  <tr class="">
                    <th colspan="4" class="bg--blue1 py-3 color--white1 text-center">Lịch sử làm bài</th>
                  </tr>
                </thead>

                <tbody>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" class="bg--blue1 py-3 color--white1 text-center">
                      <div class="test-history-see-all pointer" onclick="userView.openModalHistory(true)">Xem tất cả</div>
                    </td>
                  </tr>
              </tfoot>
              </table>
            </div>

            <div class="user-pros col-12 col-lg-6 mb-4">
              <table class="user__table rounded--20">
                <thead>
                  <tr class="">
                    <th colspan="2" class="bg--green1 py-3  color--white1 text-center">Đạt yêu cầu</th>
                  </tr>
                </thead>
    
                <tbody>
                  <tr>
                    <td>Khái niệm và quy tắc giao thông</td>
                    <td>11/12</td>
                  </tr>
                  <tr>
                    <td>Nghiệp vụ vận tải</td>
                    <td>9/10</td>
                  </tr>
    
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" class="bg--green1 py-3  color--white1 text-center">
                        <div class="pros-see-all pointer">Xem tất cả</div>
                      </td>
                    </tr>
                  </tfoot>
              </table>
            </div>
        
            <div class="user-cons col-12 col-lg-6 mb-4">
              <table class="user__table rounded--20">
                <thead>
                  <tr class="">
                    <th colspan="2" class="bg--orange2 py-3 color--white1 text-center">Cần luyện thêm</th>
                  </tr>
                </thead>
    
                <tbody>
                  <tr>
                    <td>Giải các thế sa hình</td>
                    <td>1/12</td>
                  </tr>
                  <tr>
                    <td>Kỹ thuật lái ôtô</td>
                    <td>3/10</td>
                  </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" class="bg--orange2 py-3 color--white1 text-center">
                        <div class="cons-see-all pointer">Xem tất cả</div>
                      </td>
                    </tr>
                  </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    `,
  modal:`
  <div class="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title text-capitalize">Cập nhật thông tin</h5>
          <button type="button" class="close" onclick="userView.openModalUpdateOption(false)">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="modal__option p-3 rounded pointer" 
              onclick="userView.openModalEditProfile(true)">
              Thông tin cá nhân
            </div>
            <div class="modal__option p-3 rounded pointer" 
              onclick="userView.openModalEditPassword(true)">
              Thay đổi mật khẩu
            </div>
        </div>

      </div>
    </div>
  </div>
    `,
  modelEditPassword: `
    <div class="modal-edit-password">
      <div class="modal-edit-password-container">
        <form class="form-input-edit-password" onsubmit="userController.submitChangePassword(event)">
          <div class='d-flex justify-content-between'>
            <button class="password-edit-button" onclick="userView.openModalEditPassword(false)">Cancel</button>
            <button class="password-edit-button" type="submit">Done</button>
          </div>

          <div class="input-wrapper-edit-password my-3">
            <input class="form-control" type="password" name="currentPassword" placeholder="Enter your current password">
            <div id="input-current-password-error" class="message-error"></div>
          </div>
          <div class="input-wrapper-edit-password my-3">
            <input class="form-control" type="password" name="newPassword" placeholder="Enter your new password">
            <div id="input-new-password-error" class="message-error"></div>
          </div>
          <div class="input-wrapper-edit-password my-3">
            <input class="form-control" type="password" name="confirmNewPassword" placeholder="Confirm your new password">
            <div id="input-confirm-new-password-error" class="message-error"></div>
          </div>

        </form>
      </div>
    </div>
  `,
  modelEditProfile: `
    <div class="modal-edit-password">
      <div class="modal-edit-password-container">
        <form class="form-input-edit-password" onsubmit="userController.submitUserProfile(event)">
          <div class='d-flex justify-content-between'>
            <button class="password-edit-button" onclick="userView.openModalEditProfile(false)">Cancel</button>
            <button class="password-edit-button" type="submit">Done</button>
          </div>

          <div class="input-wrapper-edit-password my-3">
            <input class="form-control input__displayName" type="text" name="displayName" placeholder="Enter your name">
            <div id="input-displayName-error" class="message-error"></div>
          </div>
          <div class="input-wrapper-edit-password my-3">
            <input class="form-control input__photoURL" type="text" name="photoURL" placeholder="Change your profile URL">
            <div id="input-photoURL-error" class="message-error"></div>
          </div>

        </form>
      </div>
    </div>
  `,
  modelHistory: `
  <!-- modal history -->
  <div class="modal">
    <div class="history__modal" role="document">
      <div class="modal-content">

        <div class="modal-header bg--purple1">
          <h5 class="modal-title text-capitalize font-weight-bold color--white1">Lịch sử</h5>
          <button type="button" class="close" onclick="userView.openModalUpdateOption(false)">
            <span aria-hidden="true" class="color--white1">&times;</span>
          </button>
        </div>
        <div class="modal-body p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Ngày làm</th>
                  <th>Loại đề</th>
                  <th>Điểm số</th>
                  <th>Thời gian làm</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="history-content"></tbody>
            </table>
        </div>

        <div class="modal-footer bg--purple1 py-1">
          <button type="button" class="btn btn-light" onclick="userView.openModalHistory(false)">Đóng</button>
        </div>

      </div>
    </div>
  </div>
`,
}
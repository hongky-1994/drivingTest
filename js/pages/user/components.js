const userComponents = {
    user: `
    <section class="user-container">
    <div class="user-content">
      <!-- user info -->
      <div class="user-info">
        <div class="user-greetings">
          <div class="user-greetings-content">Xin chào, </div>
          <button class="btn-edit-icon icon-greetings">
            <i class="far fa-edit fa-2x"></i>
          </button>
        </div>
        <div class="btn-sign-out">Không phải tôi? Đăng xuất</div>
        <div class="user-image-container">
          <div class="user-image">
            <button class="user-profile-icon">
              <i class="far fa-edit fa-3x"></i>
              <input type="file" id="photo" class="custom-file-input">
              <input type="submit" value="Submit" class="btn-submit-user-image">
            </button>
          </div>
        </div>
        <div class="user-email">
          <div class="user-email-html">Email: </div>
          <button class="btn-edit-icon icon-password">
            <i class="far fa-edit fa-2x"></i>
          </button>
        </div>
      </div>

      <!-- user test result -->
      <div class="user-result">
        <div class="user-test-history">
          <table class="table-test-history">
            <thead class="table-header">
              <tr>
                <th colspan="3" class="table-1-header-footer">Lịch sử làm bài</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="table-1-row-2-col-1">Tổng hợp</td>
                <td class="table-1-row-2-col-2">30/30</td>
                <td class="table-1-row-2-col-3">12:00:00 - 29/04/2020</td>
              </tr>
              <tr>
                <td class="table-1-row-3-col-1">Cấu trúc</td>
                <td class="table-1-row-3-col-2">29/30</td>
                <td class="table-1-row-3-col-3">12:00:00 - 30/04/2020</td>
              </tr>

              <tr class="table-footer">
                <td colspan="3" class="table-1-header-footer">
                  <div class="test-history-see-all">Xem tất cả</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="user-pros-cons">
          <div class="user-pros">
            <table class="table-test-pros">
              <thead class="table-header">
                <tr>
                  <th colspan="2" class="table-2-header-footer">Đạt yêu cầu</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td class="table-2-row-2-col-1">Khái niệm và quy tắc giao thông</td>
                  <td class="table-2-row-2-col-2">11/12</td>
                </tr>
                <tr>
                  <td class="table-2-row-3-col-1">Nghiệp vụ vận tải</td>
                  <td class="table-2-row-3-col-2">9/10</td>
                </tr>
  
                <tr class="table-footer">
                  <td colspan="2" class="table-2-header-footer">
                    <div class="pros-see-all">Xem tất cả</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      
          <div class="user-cons">
            <table class="table-test-cons">
              <thead class="table-header">
                <tr>
                  <th colspan="2" class="table-3-header-footer">Cần luyện thêm</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td class="table-3-row-2-col-1">Giải các thế sa hình</td>
                  <td class="table-3-row-2-col-2">1/12</td>
                </tr>
                <tr>
                  <td class="table-3-row-3-col-1">Kỹ thuật lái ôtô</td>
                  <td class="table-3-row-3-col-2">3/10</td>
                </tr>
  
                <tr class="table-footer">
                  <td colspan="2" class="table-3-header-footer">
                    <div class="cons-see-all">Xem tất cả</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- modal edit password --> 
    <div class="modal-edit-password">
      <div class="modal-edit-password-container">
        <form class="form-input-edit-password">
          <span class="close-modal-edit-password">Cancel</span>
          <button class="submit-modal-edit-password">Done</button>

          <div class="input-wrapper-edit-password">
            <input type="password" name="currentPassword" placeholder="Enter your current password">
            <div id="input-current-password-error" class="message-error"></div>
          </div>
          <div class="input-wrapper-edit-password">
            <input type="password" name="newPassword" placeholder="Enter your new password">
            <div id="input-new-password-error" class="message-error"></div>
          </div>
          <div class="input-wrapper-edit-password">
            <input type="password" name="confirmNewPassword" placeholder="Confirm your new password">
            <div id="input-confirm-new-password-error" class="message-error"></div>
          </div>

        </form>
      </div>
    </div>
  </section>
    `,
    modal:`
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
    </div>
    `,
    modalHistory: `
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
  </div>
    `,

}
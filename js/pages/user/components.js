const userComponents = {
    user: `
    <section class="user-container">
    <div class="user-content">
      <!-- user info -->
      <div class="user-info">
        <div class="user-greetings">
          <div>Xin chào, user</div>
          <button class="btn-edit-icon icon-greetings">
            <i class="far fa-edit fa-2x"></i>
          </button>
        </div>
        <div class="btn-sign-out">Không phải tôi? Đăng xuất</div>
        <div class="user-image">
          <button class="user-profile-icon">
            <i class="far fa-edit fa-3x"></i>
          </button>
        </div>
        <div class="user-email">
          <div class="user-email-html">Email: </div>
          <button class="btn-edit-icon icon-password">
            <i class="far fa-edit fa-2x"></i>
          </button>
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


      <!-- user test result -->
      <div class="user-result">
        <div class="user-test-history">
          <table class="table-test-history">
            <thead class="table-header">
              <tr>
                <th colspan="3" style="background: #5067ff;">Lịch sử làm bài</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style="width: 15%; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: center; border-left: 1px solid black; ">Tổng hợp</td>
                <td style="width: 15%; padding-top: 1.5vh; padding-bottom: 1.5vh; border-left: none; border-right: none; text-align: center;">30/30</td>
                <td style="width: 70%; border-left: none; padding-right: 2vw; text-align: end; border-right: 2px solid black; color: #a09595; text-decoration: none;">12:00:00 - 29/04/2020</td>
              </tr>
              <tr>
                <td style="width: 15%; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: center;border-left: 1px solid black;border-top: 1px solid black">Cấu trúc</td>
                <td style="width: 15%; padding-top: 1.5vh; padding-bottom: 1.5vh; border-left: none; border-right: none; text-align: center;border-top: 1px solid black">29/30</td>
                <td style="width: 70%; border-left: none; padding-right: 2vw; text-align: end; border-right: 2px solid black;border-top: 1px solid black; color: #a09595; text-decoration: none;">12:00:00 - 30/04/2020</td>
              </tr>

              <tr class="table-footer">
                <td colspan="3" style="background: #5067ff;">
                  <button class="test-history-see-all">Xem tất cả</button>
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
                  <th colspan="2" style="background: #a0d400;">Đạt yêu cầu</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;border-left: 1px solid black;">Khái niệm và quy tắc giao thông</td>
                  <td style="width: 30%;; border-left: none; padding-right: 1vw; text-align: end;border-right: 2px solid black;">11/12</td>
                </tr>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;border-left: 1px solid black;border-top: 1px solid black">Nghiệp vụ vận tải</td>
                  <td style="width: 30%;; border-left: none; padding-right: 1vw; text-align: end;border-right: 2px solid black;border-top: 1px solid black">9/10</td>
                </tr>
  
                <tr class="table-footer">
                  <td colspan="2" style="background: #a0d400;">
                    <button class="pros-see-all">Xem tất cả</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      
          <div class="user-cons">
            <table class="table-test-cons">
              <thead class="table-header">
                <tr>
                  <th colspan="2" style="background: #e68516;">Cần luyện thêm</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;border-left: 1px solid black;">Giải các thế sa hình</td>
                  <td style="width: 30%;; border-left: none; padding-right: 1vw; text-align: end;border-right: 2px solid black;">1/12</td>
                </tr>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;border-left: 1px solid black;border-top: 1px solid black">Kỹ thuật lái ôtô</td>
                  <td style="width: 30%;; border-left: none; padding-right: 1vw; text-align: end;border-right: 2px solid black;border-top: 1px solid black">3/10</td>
                </tr>
  
                <tr class="table-footer">
                  <td colspan="2" style="background: #e68516;">
                    <button class="cons-see-all">Xem tất cả</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
    `,

}
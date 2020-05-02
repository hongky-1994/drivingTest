const userComponents = {
    user: `
    <section class="user-container">
    <div class="user-nav-header"></div>
    <div class="user-nav">
    <button class="logo-nav-header" onclick="mainView.showScreen('main')">DRIVING TEST</button>
      <button class="btn-user-menu">
        <i class="fas fa-bars"></i>
      </button>
    </div> 
    <div class="user-nav-footer"></div>
    <div class="user-content">
      <!-- user info -->
      <div class="user-info">
        <div class="user-greetings">
          <div>Xin chào, user</div>
          <button class="btn-edit-icon icon-greetings">
            <i class="far fa-edit fa-2x"></i>
          </button>
        </div>
        <div class="user-image">
          <button class="user-profile-icon">
            <i class="far fa-edit fa-3x"></i>
          </button>
        </div>
        <div class="user-email">
          <div class="user-email-html">Email: </div>
          <button class="btn-edit-icon icon-email">
            <i class="far fa-edit fa-2x"></i>
          </button>
        </div>
      </div>

      <!-- modal edit email --> 
      <div class="modal-edit-email">
        <div class="modal-edit-email-container">
          <form class="form-input-edit-email">
            <span class="close-modal-edit-email">Cancel</span>
            <button class="submit-modal-edit-email">Done</button>
            <div class="input-wrapper">
              <input type="email" name="currentEmail" placeholder="Enter your email">
              <div id="input-email-error" class="message-error"></div>
            </div>
            <div class="input-wrapper">
              <input type="password" name="currentPassword" placeholder="Enter your password">
              <div id="input-password-error" class="message-error"></div>
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
                <td style="width: 15%; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: center; border-left: 1px solid black;border-top: 1px solid black;border-bottom: 1px solid black;">
                Tổng hợp
                </td>
                <td style="width: 15%;; padding-top: 1.5vh; padding-bottom: 1.5vh; border-left: none; border-right: none; text-align: center;border-bottom: 1px solid black;">
                30/30
                </td>
                <td style="width: 70%;; border-left: none; padding-right: 2vw; text-align: end; border-right: 2px solid black;border-bottom: 1px solid black;">12:00:00 - 29/04/2020</td>
              </tr>
              <tr>
                <td style="width: 15%; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: center;border-left: 1px solid black;border-bottom: 1px solid black;">
                Cấu trúc
                </td>
                <td style="width: 15%;; padding-top: 1.5vh; padding-bottom: 1.5vh; border-left: none; border-right: none; text-align: center;border-bottom: 1px solid black;">29/30</td>
                <td style="width: 70%;; border-left: none; padding-right: 2vw; text-align: end; border-right: 2px solid black;border-bottom: 1px solid black;">12:00:00 - 30/04/2020</td>
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
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;border-left: 1px solid black;border-top: 1px solid black;border-bottom: 1px solid black;">Khái niệm và quy tắc giao thông</td>
                  <td style="width: 30%;; border-left: none; padding-right: 2vw; text-align: end;border-right: 2px solid black;border-bottom: 1px solid black;">11/12</td>
                </tr>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;border-left: 1px solid black;border-bottom: 1px solid black;">Nghiệp vụ vận tải</td>
                  <td style="width: 30%;; border-left: none; padding-right: 2vw; text-align: end;border-right: 2px solid black;border-bottom: 1px solid black;">9/10</td>
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
                  <th colspan="2" style="padding-bottom: 1.5vh; padding-top: 1.5vh; text-align: center; background: #e68516; color: white;">Cần luyện thêm</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;border-left: 1px solid black;border-top: 1px solid black;border-bottom: 1px solid black;">Giải các thế sa hình</td>
                  <td style="width: 30%;; border-left: none; padding-right: 2vw; text-align: end;border-right: 2px solid black;border-bottom: 1px solid black;">1/12</td>
                </tr>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;border-left: 1px solid black;border-bottom: 1px solid black;">Kỹ thuật lái ôtô</td>
                  <td style="width: 30%;; border-left: none; padding-right: 2vw; text-align: end;border-right: 2px solid black;">3/10</td>
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
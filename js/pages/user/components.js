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
            <i class="far fa-edit fa-5x"></i>
          </button>
        </div>
        <div class="user-email">
          <div class="user-email-html">Email: </div>
          <button class="btn-edit-icon icon-email">
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
                <th colspan="3" style="padding-bottom: 1.5vh; padding-top: 1.5vh; text-align: center; background: #5067ff; color: white;">Lịch sử làm bài</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style="width: 15%; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: center;">Đề 123</td>
                <td style="width: 15%;; padding-top: 1.5vh; padding-bottom: 1.5vh; border-left: none; border-right: none; text-align: center;">30/30</td>
                <td style="width: 70%;; border-left: none; padding-right: 2vw; text-align: end;">12:00:00 - 29/04/2020</td>
              </tr>
              <tr>
                <td style="width: 15%; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: center;">Đề 124</td>
                <td style="width: 15%;; padding-top: 1.5vh; padding-bottom: 1.5vh; border-left: none; border-right: none; text-align: center;">29/30</td>
                <td style="width: 70%;; border-left: none; padding-right: 2vw; text-align: end;">12:00:00 - 30/04/2020</td>
              </tr>

              <tr class="table-footer">
                <td colspan="3" style="padding-bottom: 1.5vh; padding-top: 1.5vh; text-align: center; background: #5067ff; color: white;">
                  <button class="test-history-see-all">Xem tất cả</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="user-pros-cons">
          <div class="user-pros">
            <table>
              <thead class="table-header">
                <tr>
                  <th colspan="2" style="padding-bottom: 1.5vh; padding-top: 1.5vh; text-align: center; background: #a0d400; color: white;">Đạt yêu cầu</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;">Khái niệm và quy tắc giao thông</td>
                  <td style="width: 30%;; border-left: none; padding-right: 2vw; text-align: end;">11/12</td>
                </tr>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;">Nghiệp vụ vận tải</td>
                  <td style="width: 30%;; border-left: none; padding-right: 2vw; text-align: end;">9/10</td>
                </tr>
  
                <tr class="table-footer">
                  <td colspan="2" style="padding-bottom: 1.5vh; padding-top: 1.5vh; text-align: center; background: #a0d400; color: white;">
                    <button class="pros-see-all">Xem tất cả</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="user-cons">
            <table>
              <thead class="table-header">
                <tr>
                  <th colspan="2" style="padding-bottom: 1.5vh; padding-top: 1.5vh; text-align: center; background: #e68516; color: white;">Cần luyện thêm</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;">Giải các thế sa hình</td>
                  <td style="width: 30%;; border-left: none; padding-right: 2vw; text-align: end;">1/12</td>
                </tr>
                <tr>
                  <td style="width: 70%; padding-left: 1vw; padding-top: 1.5vh; padding-bottom: 1.5vh; border-right: none; text-align: start;">Kỹ thuật lái ôtô</td>
                  <td style="width: 30%;; border-left: none; padding-right: 2vw; text-align: end;">3/10</td>
                </tr>
  
                <tr class="table-footer">
                  <td colspan="2" style="padding-bottom: 1.5vh; padding-top: 1.5vh; text-align: center; background: #e68516; color: white;">
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
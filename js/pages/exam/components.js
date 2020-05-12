const examComponents={
    testType: `
    <div class="title-holder">
        <div class="test-type-title color--purple1">CHỌN HÌNH THỨC THI</div>
    </div>
    <section class="test-type-section">
        <div class="test-type-container structured-test" onclick = "examView.showScreen('structuredTest')">
            <div class="test-type bg--blue1 color--white1">
                Cấu trúc
            </div>
            <div class="test-type-description color--grey3" >
                <div class="color--purple2">30 câu hỏi trong 20 phút</div>
                <p>    
                    1. Khái niệm và quy tắc giao thông đường bộ: <br>
                    <span style="padding-left: 2rem;"></span>Khái niệm: 1 câu <br>
                    <span style="padding-left: 2rem;"></span>Quy tắc: 7 câu <br>
                    <span style="padding-left: 2rem;"></span>Tốc độ: 1 câu <br>
                    2. Nghiệp vụ vận tải: 1 câu <br>
                    3. Văn hóa, đạo đức nghề nghiệp người lái xe ô tô: 1 câu <br>
                    4. Kỹ thuật lái xe ô tô + 5. Cấu tạo và sửa chữa xe ô tô: 1 câu <br>
                    6. Hệ thống biển báo hiệu đường bộ: 9 câu <br>
                    7. Giải các thế sa hình: 9 câu
                </p>                
            </div>
        </div>
        <div class="test-type-container random-test" onclick="examView.showScreen('randomTest')">    
            <div class="test-type bg--purple1 color--white1">
                Tổng hợp
            </div>
            <div class="test-type-description color--grey3">
                <div class="color--purple2">30 câu hỏi trong 20 phút</div>
                <p>30 câu ngẫu nhiên từ tất cả các phần đã học</p>
            </div>
        </div>
    </section>
    `,
    structuredTest: `
    <div class="section-container">
      <div class="exam-left-column">
        <div class="timer-container bg--pink2">
          Thời gian còn lại<br>
          <div class="timer-time-container">
            <span id="minute" class="timer-time"></span>:<span class="timer-time" id="second"></span>
          </div>
        </div>
        <div class="question-container">
        </div>
      </div>
      <div class="exam-right-column">
        <p class="test-question"></p>
        <div class="test-image"></div>
        <form class="test-answer-form">
          <div class="test-answer-container col-xl-6">
            <!--<input type="checkbox" id="answer0" name="answer0" >
            <label for="answer0" >
            </label>-->
          </div>

          <div class="test-answer-container col-xl-6">
            <!--<input type="checkbox" id="answer2" name="answer2">
            <label for="answer2">
            </label>-->
          </div>

          <div class="test-answer-container col-xl-6">
            <!--<input type="checkbox" id="answer3" name="answer3">
            <label for="answer3">
            </label>-->
          </div>

          <div class="test-answer-container col-xl-6">
            <!--<input type="checkbox" id="answer4" name="answer4">
            <label for="answer4">
            </label>-->
          </div>  

          <button class="exam-button submit-answer" type="submit">Nộp bài</button>
        </form>
      </div>
    </div>
    `
}
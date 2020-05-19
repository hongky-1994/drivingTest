const adminComponents = {
 admin: `
 <div class="h-100 w-100">
 <ul class='left__sidebar bg--purple1 bg--purple1 mb-0 w-open '>
    <li class="left__controll px-3 py-3 color--white1 w-100 bg--grey3 d-flex justify-content-end"
    onclick="adminView.openSideBar()">
      <i class="fas fa-angle-double-left"></i>
    </li>
     <li class="left__item pl-3 pr-2 py-3 active"
       onclick="adminView.changeTab(0)"
     >Danh sách câu hỏi</li>
     <li class="left__item pl-3 pr-2 py-3"
       onclick="adminView.changeTab(1)"
     >Import dữ liệu</li>
     <li class="left__item pl-3 pr-2 py-3"
       onclick="adminView.changeTab(2)"
     >Phản hồi người dùng</li>
   </ul>

   <div class="manage__container w-open-right">
      <div class="manage__tab active">
        <div>
          <div class='manage__search mb-3 d-flex input-group'>
            <div class="input-group-prepend">
              <select class="btn btn-outline-secondary dropdown-toggle">
                <option value="">Danh mục tìm kiếm</option>
                <option value="option1">option 1</option>
                <option value="option2">option 2</option>
              </select>
            </div>
            <input type="text" class="p-2 rounded border" placeholder="search something here">
            <div class="input-group-append">
              <button class="btn btn-success">Tìm kiếm</button>
            </div>
          </div>

          <table class="mr-3 table table-striped question__table">
            <thead>
              <tr>
                <th><input type='checkbox'/></th>
                <th>Mã</th>
                <th>Phân loại</th>
                <th>Câu hỏi</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody class='table__body'></tbody>
            <tfoot class='table__footer'>
              <tr>
                <td colspan="5">
                  <button class="admin__pagination--item btn btn-info" onclick="adminController.changePage(1)"><i class="fas fa-angle-double-left"></i></button>
                  <button class="admin__pagination--item btn btn-info" onclick="adminController.changePage(null, -1)"><i class="fas fa-angle-left"></i></button>
                  <input class="admin__pagination--input btn bg--white1 border" type="number" max="45" onchange="adminController.inputChange(event)">
                  <button class="admin__pagination--item btn btn-info" onclick="adminController.changePage(null, 1)"><i class="fas fa-angle-right"></i></button>
                  <button class="admin__pagination--item btn btn-info" onclick="adminController.changePage(45)"><i class="fas fa-angle-double-right"></i></button>
                  <button class="btn btn-success" onclick="adminController.changePage()">Đi đến</button>
                  
                </td>
              </tr>
            </tfoot>
          </table>

         </div>
       </div>
       <div class="manage__tab">
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
         Import du lieu<br/>
       </div>
       <div class="manage__tab scrollit">
         phản hồi của người dùng
       </div>
   </div>

 </div>`, 
 modalEdit: `
 <form>
  <div class="form-group">
    <label>Câu hỏi<span class='color--red1'>*</span></label>
    <textarea row='2' type="text" class="form-control" id="question__container" placeholder="Câu hỏi"></textarea>
  </div>
  <div class="form-group">
  <label>Phân loại<span class='color--red1'>*</span></label>
  <select type="text" class="form-control" id="category__container" placeholder="Phân loại">
    <option value="">----Chọn phân loại câu hỏi----</option>
    <option value="Khái niệm">Khái niệm</option>
    <option value="Quy tắc">Quy tắc</option>
    <option value="Tốc độ">Tốc độ</option>
    <option value="Nghiệp vụ vận tải">Nghiệp vụ vận tải</option>
    <option value="Văn hóa, đạo đức nghề nghiệp người lái xe">Văn hóa, đạo đức nghề nghiệp người lái xe</option>
    <option value="Kỹ thuật lái xe ô tô">Kỹ thuật lái xe ô tô</option>
    <option value="Cấu tạo và sửa chữa xe ô tô">Cấu tạo và sửa chữa xe ô tô</option>
    <option value="Hệ thống biển báo hiệu đường bộ">Hệ thống biển báo hiệu đường bộ</option>
    <option value="Giải các thế sa hình">Giải các thế sa hình</option>
  </select>
</div>
  <div class="form-group">
    <label>Câu trả lời<span class='color--red1'>*</span></label>
    <input type="text" class="form-control" id="answer1" placeholder="Đáp án thứ 1">
    <input type="text" class="form-control" id="answer2" placeholder="Đáp án thứ 2">
    <input type="text" class="form-control" id="answer3" placeholder="Đáp án thứ 3">
    <input type="text" class="form-control" id="answer4" placeholder="Đáp án thứ 4">
  </div>
  <div class="form-group">
    <label class="form__check__answer mr-3">Đáp án đúng <span class='color--red1'>*</span></label>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" name='corrects' id="correct1" value="1">
      <label class="form-check-label" for="correct1">1</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" name='corrects' id="correct2" value="2">
      <label class="form-check-label" for="correct2">2</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" name='corrects' id="correct3" value="3">
      <label class="form-check-label" for="correct3">3</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" name='corrects' id="correct4" value="4">
      <label class="form-check-label" for="correct4">4</label>
    </div>
  </div>
  <div class="form-group-inline image__div">
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" name='noImage' id="noImage" onchange="adminController.imgChooseCheckbox()">
      <label>Hình ảnh đính kèm</label>
    </div>
    <input type="file" class="form-control-file" id="image" onchange="adminView.previewImage(event)">
    <image id="output_image" class="image__preview my-3"/>
  </div>
  
    <button type="submit" class="btn btn-primary mt-3" onclick="adminController.submitUpdate(event)">Cập nhật</button>
</form>
`
}
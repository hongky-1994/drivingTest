const adminComponents = {
 admin: `
 <div class="h-100 w-100 d-flex">
   <ul class='left__sidebar w-25 bg--purple1 bg--purple1 mb-0'>
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

   <div class=" manage__container w-75">
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
                <th>Đáp án</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody class='table__body'>

            </tbody>
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

 </div>`
}
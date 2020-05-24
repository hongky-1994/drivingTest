const libraryComponents = {
  library: `
  <div class="left__library">
        <ul>
          <li>
            <div class="item active" onclick="libraryController.changeCategory('Khái niệm')">
              <div class="icon__library"><i class="fas fa-book"></i></div>
              <div class="category__library">Khái niệm</div>
            </div>
          </li>
          <li>
            <div class="item" onclick="libraryController.changeCategory('Quy tắc')">
              <div class="icon__library"><i class="fas fa-ruler-vertical"></i></div>
              <div class="category__library">Quy tắc</div>
            </div>
          </li>
          <li>
            <div class="item" onclick="libraryController.changeCategory('Tốc độ')">
              <div class="icon__library"><i class="fas fa-stopwatch-20"></i></div>
              <div class="category__library">Tốc độ</div>
            </div>
          </li>
          <li>
            <div class="item" onclick="libraryController.changeCategory('Nghiệp vụ vận tải')">
              <div class="icon__library"><i class="fas fa-dolly"></i></div>
              <div class="category__library">Nghiệm vụ vận tải</div>
            </div>
          </li>
          <li>
            <div class="item" onclick="libraryController.changeCategory('Văn hóa, đạo đức nghề nghiệp người lái xe')">
              <div class="icon__library"><i class="fas fa-american-sign-language-interpreting"></i></div>
              <div class="category__library">Văn hóa đạo đức nghề nghiệp</div>
            </div>
          </li>
          
          <li>
            <div class="item" onclick="libraryController.changeCategory('Kỹ thuật lái xe ô tô')">
              <div class="icon__library"><i class="fas fa-dharmachakra"></i></div>
              <div class="category__library">Kỹ thuật lái xe</div>
            </div>
          </li>
          <li>
            <div class="item" onclick="libraryController.changeCategory('Cấu tạo và sửa chữa xe ô tô')">
              <div class="icon__library"><i class="fas fa-tools"></i></div>
              <div class="category__library">Cấu tạo và sửa chữa xe ô tô</div>
            </div>
          </li>
          <li>
            <div class="item" onclick="libraryController.changeCategory('Hệ thống biển báo hiệu đường bộ')">
              <div class="icon__library"><i class="fas fa-directions"></i></div>
              <div class="category__library">Hệ thống biển báo hiệu đường bộ</div>
            </div>
          </li>
          <li>
            <div class="item" onclick="libraryController.changeCategory('Giải các thế sa hình')">
              <div class="icon__library"><i class="fas fa-route"></i></div>
              <div class="category__library">Giải thế các sa hình</div>
            </div>
          </li>
        </ul>
      </div>
    
      <div class="right__library pl-0 pr-3">
        <p class="title__category">CATEGORY</p>

        <div class="library__question">
        </div>
      </div>
  `
}
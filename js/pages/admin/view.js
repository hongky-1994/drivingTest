const adminView = {
  showScreen: (screen) => {
    const appContainer = document.querySelector(".app-container")
    appContainer.innerHTML = adminComponents[screen]
    adminController.getData()
  },
  changeTab: (tabNo) => {
    const leftSideTabs = document.querySelectorAll('.left__item')
    const manageTabs = document.querySelectorAll('.manage__tab')
    leftSideTabs.forEach(item => {
      item.classList.remove('active')
    })
    manageTabs.forEach(item => {
      item.classList.remove('active')
    })
    leftSideTabs[tabNo].classList.add("active")
    manageTabs[tabNo].classList.add("active")
    // if(tabNo === 0 ) {
    //   loadingView.show()
    //   loadingView.hide()
    // }
  },
  openSideBar: () => {
    const sideBar = document.querySelector('.left__sidebar')
    const tabContainer = document.querySelector('.manage__container')
    const items = document.querySelectorAll('.left__item')
    const iconOpen = document.querySelector('.left__controll')
    const textList = ['Danh sách câu hỏi', 'Import dữ liệu', 'Phản hồi người dùng']
    const iconList = [
      '<i class="fas fa-list-alt"></i>',
      '<i class="fas fa-cloud-upload-alt"></i>',
      '<i class="fas fa-user-shield"></i>']
    if( adminModel.sideBarIsOpen) {
      adminModel.sideBarIsOpen = false
      sideBar.classList.remove('w-open')
      tabContainer.classList.remove('w-open-right')
      items.forEach((item, index) =>{
        item.innerHTML = iconList[index]
      } )
      iconOpen.innerHTML = '<i class="fas fa-angle-double-right"></i>'
    } else {
      adminModel.sideBarIsOpen = true
      sideBar.classList.add('w-open')
      tabContainer.classList.add('w-open-right')
      items.forEach((item, index) =>{
        item.innerHTML = textList[index]
      } )
      iconOpen.innerHTML = '<i class="fas fa-angle-double-left"></i>'

    }
  },
  openModalEdit: (open, index) => {
    // get DOM
    const modal = document.querySelector(".modal__container")
    modal.innerHTML = authComponents.modal
    const modalTitle = document.querySelector(".modal-title")
    const modalContent = document.querySelector('.modal-body>.edit')
    const modalFooter = document.querySelector('.modal-footer')

    // pass Data
    if(open) {
      // modal.innerHTML = "OPEN ROI NE`"
      modalTitle.innerHTML = `CHỈNH SỬA CÂU HỎI SỐ ${index}`
      modalContent.innerHTML = adminComponents.modalEdit
      modalFooter.innerHTML = ''
      modalFooter.style.padding = '0'
       
      // No scroll white open modal
       document.body.style.position = 'fixed';
       document.body.style.width = '100vw';
       document.body.style.top = `-${window.scrollY}px`;
    } else {
      modal.innerHTML = ''
      // Keep position after close modal
       const scrollY = document.body.style.top;
       document.body.style.position = '';
       document.body.style.top = '';
       window.scrollTo(0, parseInt(scrollY || '0') * -1);
 
    }
  },
  previewImage: (event) =>  {
   var reader = new FileReader();
   reader.onload = function()
   {
    var output = document.getElementById('output_image');
    output.src = reader.result;
   }
   reader.readAsDataURL(event.target.files[0]);
  }
}
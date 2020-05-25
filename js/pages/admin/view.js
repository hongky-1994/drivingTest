const adminView = {
  showScreen: (screen) => {
    const appContainer = document.querySelector(".app-container")
    appContainer.innerHTML = adminComponents[screen]
    adminController.changePage(1)
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
    // get question data.
    const currentQues = adminModel.question.find(item => item.index === index)
    // pass Data
    if(open) {
      // modal.innerHTML = "OPEN ROI NE`"
      modalTitle.innerHTML = `CHỈNH SỬA CÂU HỎI SỐ ${index}`
      adminModel.currentQuesIndex = index
      modalContent.innerHTML = adminComponents.modalEdit
      modalFooter.innerHTML = ''
      modalFooter.style.padding = '0'

         // question
      adminController.fillInputValueWithData('#question__container','value', currentQues.question)
      adminController.fillInputValueWithData('#category__container','value', currentQues.category)
      adminController.fillInputValueWithData('#answer1','value', currentQues.answers[0].value)
      adminController.fillInputValueWithData('#answer2','value', currentQues.answers[1].value)
      adminController.fillInputValueWithData('#answer3','value', currentQues.answers[2].value)
      adminController.fillInputValueWithData('#answer4','value', currentQues.answers[3].value)
      adminController.fillInputValueWithData('#correct1', 'checked', currentQues.correct.includes(1))
      adminController.fillInputValueWithData('#correct2', 'checked', currentQues.correct.includes(2))
      adminController.fillInputValueWithData('#correct3', 'checked', currentQues.correct.includes(3))
      adminController.fillInputValueWithData('#correct4', 'checked', currentQues.correct.includes(4))
      
      adminController.fillInputValueWithData('#noImage', 'checked',Boolean(currentQues.images))
      if (currentQues.images) {
        // adminController.fillInputValueWithData('#output_image','src', currentQues.images)
        loadingView.imgLoading('#output_image', currentQues.images)

      } else {
        adminController.imgChooseCheckbox()
      }
       
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
    var reader = new FileReader()
    reader.onload = () => {
      var output = document.getElementById('output_image')
      // output.src = reader.result || '../../../js/assets/images/no-image.png';
      loadingView.imgLoading('#output_image', reader.result || '../../../js/assets/images/no-image.png')
    }
    event.target.files.length > 0 && 
    reader.readAsDataURL(event.target.files[0])
  }
}
const push = (screen, historyMethod) => {
  //Tìm page chưa screen
  let page
  switch (screen) {
    case 'signIn':
    case 'signUp':
    case 'signAnonymous':
      if(authModel.user.uid === undefined) {
        page = "auth"
      } else {
        page = 'user'
        screen = 'user'
      }
      break

    case 'user':
      page = 'user'
      break

    case 'testType':
    case 'structuredTest':
      page = 'exam'
      break
    case 'admin':
      page = 'admin'
      break
    default:
      page = 'user'
      screen = 'user'
      break
  }
  // Open screen 
  switch (page) {
    case 'auth': 
      common.changePageTitle('Driving exam')
      authView.showScreen(screen)
      break
    case 'user':
      common.changePageTitle('User Profile')
      userView.showScreen(screen)
      break
    case 'exam':
      common.changePageTitle('Doing some test')
      examView.showScreen(screen)
      break
    case 'admin':
      common.changePageTitle('ADMIN PAGE')
      adminView.showScreen(screen)
      break
    default:
      authView.showScreen('signIn')
      break
  }

  // Lưu lịch sử nếu có.
  if(window.location.hash.slice(1) !== screen ) {
    switch (historyMethod) {
      case undefined:
      case 'push': 
        window.history.pushState({screen},`${screen}`,`#${screen}`)
        break
      case 'replace':
        window.history.replaceState({screen},`${screen}`,`#${screen}`)
        break
      default:
        break
    } 
  }
}



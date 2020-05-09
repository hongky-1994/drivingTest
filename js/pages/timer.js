// const timer = {
//     endDate: new Date().getTime() + 20*60*1000,
//     calculateRemainingTime: () => {
//         let remainingTime 
//         let remainingMins
//         let remainingSecs
//         remainingTime = timer.endDate - new Date().getTime()
//         if( remainingTime > 0) {
//             remainingMins = Math.floor(remainingTime / (1000 * 60))
//             remainingSecs = Math.round((remainingTime - remainingMins * 60 *1000) / (1000)) 
//         }        
//         return [remainingMins, remainingSecs]
//     },
// }
// setInterval(() => {
//     let minute = document.querySelector("#minute")
//     let second = document.querySelector("#second")
//     minute.innerHTML = ""
//     second.innerHTML = ""
//     if (timer.calculateRemainingTime()[0] < 10) {
//         minute.innerHTML += "0" + timer.calculateRemainingTime()[0]
//     }
//     else {
//         minute.innerHTML += timer.calculateRemainingTime()[0]
//     }
//     if (timer.calculateRemainingTime()[1] < 10) {
//         second.innerHTML += "0" + timer.calculateRemainingTime()[1]
//     }
//     else {
//         second.innerHTML += timer.calculateRemainingTime()[1]
//     }
    
//     }, 1000)



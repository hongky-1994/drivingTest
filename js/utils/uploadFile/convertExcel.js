const inputFile = document.querySelector('#file')
const result = document.querySelector('.results')
const btnShow = document.querySelector('.show')
const btnfire = document.querySelector(".upload")
const collection = document.querySelector("#collection")
const actionType = document.querySelector('#actionType')
const progress = document.querySelector(".upload-progress")
const storage = firebase.storage()

var db = firebase.firestore();
let newData =[]
var excelFile;
var fileReader = new FileReader();

inputFile.addEventListener('change', (e) => {
  excelFile = e.target.files[0]

   if(excelFile) {
    fileReader.onload = (e) => {
      var data = e.target.result;
      var workbook = XLSX.read(data, {type: "binary"})
      let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]])
      newData = [...rowObject]
      
      newData.forEach(async (item, index) => {
        const gsReference = storage.refFromURL(`gs://driving-test-exam.appspot.com/B2/${item.index}`)
        let img = ''
        await gsReference.getDownloadURL().then(url => img = url).catch(error => img = null)
        newData[index].images = img
      })
      console.log("DATA: ", newData)
      showInTable(newData, result)
    }
  }
  
  fileReader.readAsBinaryString(excelFile)
})

btnfire.addEventListener('click', () => {
  !excelFile && alert("Chưa upload file excel mà đòi upload  hả !!!!")
  !collection.value === "" && alert("Chưa điền đường link collection kìa ?")
  
  // covert location to url
  // newData.forEach(item => {
  //     const gsReference = storage.refFromURL(`gs://driving-test-exam.appspot.com/B2/${item.index}`)
  //     let img = ''
  //     gsReference.getDownloadURL().then(url => img = url).catch(error => img = null)
  //     item = {...item, img}
  // })

  let size = 0
  collection.value 
  && db.collection(collection.value)
    .get()
    .then(col => {size = col.size})
    .then(() => {

      if (actionType.value === "update" && size === 0 ){
        console.log("collection.value",collection.value)
        alert("Collection không tồn tại để cập nhật")
      } else {
        newData.forEach((item, index) => {
          db.collection(collection.value).doc(`question-${item.index}`).set({
            answers:[
              {no: 1, value: item.answer1 === 'null' ? null : item.answer1},
              {no: 2, value: item.answer2 === 'null' ? null : item.answer2},
              {no: 3, value: item.answer3 === 'null' ? null : item.answer3},
              {no: 4, value: item.answer4 === 'null' ? null : item.answer4},
            ],
            correct: [
              item.correct1 ==="null" ? null: item.correct1,
              item.correct2 ==="null" ? null: item.correct2],
            question: item.question,
            category: item.category,
            index: item.index,
            images: item.images,
            createdAt: new Date()
          },{merge: true})
          .then(function() {
              console.log("Uploaded question: ", item.index, " Hooray...");
              progress.style.width = progress.innerText = `${Math.floor((index+1)/newData.length*10000)/100}%`
          })
          .catch(function(error) {
              console.error("Error writing document: ", error)
          })
        })
      }
    })
})


showInTable = (array, object) => {
  console.log('SHOW IN TABLE')
  let tableHeader = ''
  let tableData = ''
  let headerArray = []
  array.forEach(item => {
    if(Object.keys(item).length > headerArray.length ) headerArray = [...Object.keys(item)]
  })
  headerArray.forEach(item => {
    tableHeader +=`<th>${item}</th>`
  })
  array.forEach(item => {
    let row = "<tr>"
    Object.values(item).forEach(tdData => {
      row += `<td class="table__data">${tdData}</td>`
    })
    row +="</tr>"
    tableData += row
  })
  object.innerHTML = `
  <table class='table w-100'>
    <thead>
      <tr>${tableHeader}</tr>
    </thead>
    <tbody>
      ${tableData}
    </tbody>
  </table>`
}
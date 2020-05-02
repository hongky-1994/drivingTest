const inputFile = document.querySelector('#file')
const result = document.querySelector('.results')
const btnShow = document.querySelector('.show')
const btnfire = document.querySelector(".upload")
const collection = document.querySelector("#collection")
const actionType = document.querySelector('#actionType')
const progress = document.querySelector(".upload-progress")

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
      showInTable(rowObject, result)
    }
  }
  fileReader.readAsBinaryString(excelFile)
})

btnfire.addEventListener('click', () => {
  !excelFile && alert("Chưa upload file excel mà đòi upload  hả !!!!")
  !collection.value === "" && alert("Chưa điền đường link collection kìa ?")

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
          db.collection(collection.value).doc(`question${item.index}`).set({
            ...item,
            images: null,
            createdAt: new Date()
          },{merge: true})
          .then(function() {
              console.log("Document successfully written! question: ", item.index);
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
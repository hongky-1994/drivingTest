  const input = document.querySelector('#excel')
  const btn = document.querySelector('.uploadExcel')
  const result = document.querySelector('.results')
  const btnfire = document.querySelector(".uploadFIRESTORE")

  var db = firebase.firestore();
  let newData =[]
  const newArray = []


  var excelFile;

  input.addEventListener('change', (e) => {
    excelFile = e.target.files[0]
  })


  btn.addEventListener('click', () => {
    console.log("BTN click")

    if(excelFile) {
      console.log('Starting converting file ...')
      var fileReader = new FileReader();
      
      console.log('fileReader')
      fileReader.onload = function(e) {
        
        // Get Binary data 
        var data = e.target.result;

        // Get Workbook data from binary
        var workbook = XLSX.read(data, {type: "binary"})
        console.log('Workbook convert')

        // Get data from each Sheet in workbook
        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
          console.log('RowObject')
          
          newData = [...rowObject]

          const array= JSON.stringify(rowObject)
          showInTable(rowObject, result)
        })
    
        // conver to object for firestore
        
        newData.forEach(item => {
          let answer = []
          if(item.answer1) answer.push(item.answer1)
          if(item.answer2) answer.push(item.answer2)
          if(item.answer3) answer.push(item.answer3)
          if(item.answer4) answer.push(item.answer4)
          newArray.push({
            ...item,
            answers: answer,
            images: null,
          })
          
        })

      }
    }
    fileReader.readAsBinaryString(excelFile)
    console.log("NewArray", newArray)
    



  })

  showInTable = (array, object) => {
    let tableHeader = ''


    Object.keys(array[0]).forEach(item => {
      tableHeader +=`<th class="table__head">${item}</th>`
    })
    
    
    
    let tableData = ''
    

    array.forEach(item => {
      let row = "<tr class='table__row'>"
      Object.values(item).forEach(tdData => {
        row += `<td class="table__data">${tdData}</td>`
      })
      row +="</tr>"
      tableData += row
    })
    
    
    object.innerHTML = `
    <table class='table'>btnfire
        <thead>
          <tr>${tableHeader}</tr>
        </thead>
        <tbody>
          ${tableData}
        </tbody>
      </table>
    `
    
  }

  btnfire.addEventListener('click', () => {
    console.log('DATA ADD TO FIRESTORE', newArray)
    newArray.forEach(item => {
      db.collection("B2-driving-test").doc(`question${item.index}`).set({
        ...item,
        images: item.images,
        createdAt: new Date()
      },{merge: true})
      .then(function() {
          console.log("Document successfully written! question: ", item.index);
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      })

    })
    
  })

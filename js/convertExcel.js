const convert = () => {
  const input = document.querySelector('#excel')
  const btn = document.querySelector('#uploadExcel')
  const result = document.querySelector('#results')

  var excelFile;

  input.addEventListener('change', (e) => {
    excelFile = e.target.files[0]
  })


  btn.addEventListener('click', () => {
    if(excelFile) {
      console.log('Starting converting file ...')
      var fileReader = new FileReader();
      
      console.log('fileReader', fileReader)
      fileReader.onload = function(e) {
        
        // Get Binary data 
        var data = e.target.result;

        // Get Workbook data from binary
        var workbook = XLSX.read(data, {type: "binary"})
        console.log('Workbook convert', workbook)

        // Get data from each Sheet in workbook
        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
          console.log('RowObject', rowObject)

          const array= JSON.stringify(rowObject)
          showInTable(rowObject, result)
        })

      }
    }
    fileReader.readAsBinaryString(excelFile)
  })

  showInTable = (array, object) => {
    let tableHeader = ''

    console.log( array[0])

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
    <table class='table'>
        <thead>
          <tr>${tableHeader}</tr>
        </thead>
        <tbody>
          ${tableData}
        </tbody>
      </table>
    `
    
  }
}
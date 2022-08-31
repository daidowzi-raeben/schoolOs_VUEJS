<template>
  <div>
    <input
      type="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @change="readFile"
    />
    <div>
      {{ studentList }}
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      studentList: {
        classNumber: [],
        name: [],
      },
    }
  },
  methods: {
    readFile(event) {
      this.file = event.target.files ? event.target.files[0] : null
      if (this.file) {
        const reader = new FileReader()
        this.studentList.classNumber = []
        this.studentList.name = []

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          /* Get first worksheet */
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
          // console.log(data)
          data.forEach((element, key) => {
            if (element.length === 2 && key !== 0) {
              this.studentList.classNumber.push(element[0])
              this.studentList.name.push(element[1])
              // console.log(element)
            }
          })
          console.log(this.studentList)
        }

        reader.readAsBinaryString(this.file)
      }
    },
  },
}
</script>

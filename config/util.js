import axios from 'axios'

export const historyBack = function () {
  console.log('hitoryBackhitoryBackhitoryBack')
}

export const axiosForm = function (frm, url) {
  axios
    .post(process.env.VUE_APP_API + url, frm, {
      header: {
        'Context-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((res) => {
      console.log('AXIOS FALSE', res)
    })
}

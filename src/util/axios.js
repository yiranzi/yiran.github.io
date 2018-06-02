import axios from 'axios'

let AxiosUtil = {}

function request (param) {
  return new Promise((resolve, reject) => {
    axios(param).then((res) => {
      if (res.status === 200) {
        resolve(res.data)
      }
    }).catch((error) => {
    })
  })
}

AxiosUtil.get = function (url, cache, isShowError = false) {
  const param = {
    method: 'get',
    url: url,
    isShowError: isShowError
  }
  return request(param)
}

AxiosUtil.post = function (url, data, isShowError = false) {
  const param = {
    headers: {'Content-Type': 'application/json'},
    method: 'post',
    url: url,
    data: data,
    isShowError: isShowError
  }
  return request(param)
}

export default AxiosUtil

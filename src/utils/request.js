/*
  封装通用的接口调用方法
*/

const request = function (path, type) {
  return new Promise(function (resolve, reject) {
    mpvue.request({
      url: 'https://www.ehomespace.com/api/public/v1/' + path,
      method: type,
      success: (res) => {
        // 获取接口通用数据
        resolve(res)
      }
    })
  })
}
export default request

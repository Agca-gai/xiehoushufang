import req from '../fetch/index.js'

const config = {
  UpdateUser: {
    url: 'UserData/updateUser',
    method: 'post'
  },
  GetOperaLog: {
    url: 'UserData/operaLog',
    method: 'post'
  },
  UpdateOperaLog: {
    url: 'UserData/getoperaLog',
    method: 'post'
  },
  DeleteOperaLog: {
    url: 'UserData/deleteoperaLog',
    method: 'post'
  }

}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

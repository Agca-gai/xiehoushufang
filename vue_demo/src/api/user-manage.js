import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getTableData: {
    url: 'UserManage/getTableData',
    method: 'post'
  },
  addUserData: {
    url: 'UserManage/addUserData',
    method: 'post'
  },
  deleteUserData: {
    url: 'UserManage/deleteUserData',
    method: 'post'
  },
  xiugaiUserData: {
    url: 'UserManage/updateUserData',
    method: 'post'
  },
  findUserData: {
    url: 'UserManage/reachUserData',
    method: 'post'
  },
  findreachNav: {
    url: 'UserManage/getreachNav',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

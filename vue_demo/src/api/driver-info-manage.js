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
  findDriverData: {
    url: 'DriverManage/getTableData',
    method: 'post'
  },
  addDriverData: {
    url: '/pc/driver/addDriver',
    method: 'post'
  },
  updateDriverData: {
    url: 'DriverManage/updateDriver',
    method: 'post'
  },
  listDriverData: {
    url: '/pc/driver/listDriver',
    method: 'post'
  },
  findProvinceData: {
    url: 'DriverManage/findProvince',
    method: 'post'
  },
  findCityData: {
    url: 'DriverManage/findCity',
    method: 'post'
  },
  findQuData: {
    url: 'DriverManage/findQu',
    method: 'post'
  },
  findProCityQuData: {
    url: 'StoreManage/getProCityQu',
    method: 'post'
  },
  findInvitation: {
    url: 'DriverManage/findInvitation',
    method: 'post'
  },
  deleteDriverData: {
    url: 'DriverManage/deleteDriverData',
    method: 'post'
  },
  reachDriverData: {
    url: 'DriverManage/reachUserData',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

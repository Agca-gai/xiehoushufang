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
  findStoreData: {
    url: 'StoreManage/getTableData',
    method: 'post'
  },
  addStoreData: {
    url: 'StoreManage/addStoreData',
    method: 'post'
  },
  updateStoreData: {
    url: 'StoreManage/updateStoreData',
    method: 'post'
  },
  reachStoreData: {
    url: 'StoreManage/reachStoreData',
    method: 'post'
  },
  findProvinceData: {
    url: 'StoreManage/findProvince',
    method: 'post'
  },
  findCityData: {
    url: 'StoreManage/findCity',
    method: 'post'
  },
  findQuData: {
    url: 'StoreManage/findQu',
    method: 'post'
  },
  findProCityQuData: {
    url: 'StoreManage/getProCityQu',
    method: 'post'
  },
  deleteStoreData: {
    url: 'StoreManage/deleteStoreData',
    method: 'post'
  },
  findBossData: {
    url: '/pc/store/findBoss',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

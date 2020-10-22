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
  listGoodsData: {
    url: 'HomePicManage/getTableData',
    method: 'post'
  },
  addViewPageData: {
    url: 'HomePicManage/addviewImageData',
    method: 'post'
  },
  deleteViewPageData: {
    url: 'HomePicManage/deleteViewPage',
    method: 'post'
  },
  updateViewPageStateData: {
    url: 'HomePicManage/updateViewPageState',
    method: 'post'
  },
  findGoodsData: {
    url: 'CommData/getTableData',
    method: 'post'
  },
  reachViewPageData: {
    url: 'HomePicManage/reachViewPage',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

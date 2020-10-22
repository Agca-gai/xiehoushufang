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
    url: 'CommDetailManage/getTableData',
    method: 'post'
  },
  addViewPageData: {
    url: 'CommDetailManage/addviewImageData',
    method: 'post'
  },
  deleteViewPageData: {
    url: 'CommDetailManage/deleteViewPage',
    method: 'post'
  },
  updateViewPageStateData: {
    url: 'CommDetailManage/updateViewPageState',
    method: 'post'
  },
  findGoodsData: {
    url: 'CommData/getTableData',
    method: 'post'
  },
  reachViewPageData: {
    url: 'CommDetailManage/reachViewPage',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

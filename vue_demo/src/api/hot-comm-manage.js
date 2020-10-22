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
  findHotGoodsData: {
    url: 'HotCommManage/reachHotComm',
    method: 'post'
  },
  addHotGoodsData: {
    url: 'HotCommManage/addHotCommData',
    method: 'post'
  },
  deleteHotGoodsData: {
    url: 'HotCommManage/deleteHotComm',
    method: 'post'
  },
  updateHotGoodsData: {
    url: 'HotCommManage/updateHotComm',
    method: 'post'
  },
  listHotGoodsData: {
    url: 'HotCommManage/getTableData',
    method: 'post'
  },
  findGoodsData: {
    url: 'CommData/getTableData',
    method: 'post'
  },
  findShowNumberData: {
    url: '/pc/hotGoods/findShowNumber',
    method: 'post'
  },
  updateShowNumberData: {
    url: '/pc/hotGoods/updateShowNumber',
    method: 'post'
  },
  listGoodsData: {
    url: '/pc/viewPage/listGoods',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

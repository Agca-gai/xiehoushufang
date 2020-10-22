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
  findOrderData: {
    url: 'OrderManage/reachOrderData',
    method: 'post'
  },
  updateOrderStateData: {
    url: 'OrderManage/updateOrderData',
    method: 'post'
  },
  listOrderData: {
    url: 'OrderManage/getTableData',
    method: 'post'
  },
  listxiangqingOrderData: {
    url: 'OrderManage/getxiangqingTableData',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

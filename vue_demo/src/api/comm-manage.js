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
  findGoodsData: {
    url: 'CommData/reachCommData',
    method: 'post'
  },
  addGoodsData: {
    url: 'CommData/addCommData',
    method: 'post'
  },
  deleteGoodsData: {
    url: 'CommData/deleteCommData',
    method: 'post'
  },
  updateGoodsData: {
    url: 'CommData/updateCommData',
    method: 'post'
  },
  listGoodsData: {
    url: 'CommData/getTableData',
    method: 'post'
  },
  // 店铺编号和名称
  StoreListData: {
    url: 'CommData/getStoreData',
    method: 'post'
  },
  // 一级分类
  oneLevelData: {
    url: 'CommData/findoneLevel',
    method: 'post'
  },
  // 二级分类
  twoLevelData: {
    url: 'CommData/findtwoLevel',
    method: 'post'
  },
  // 上下架
  updateGoodsStateData: {
    url: '/pc/goods/updateGoodsState',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

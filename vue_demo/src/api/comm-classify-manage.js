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
  // 一级分类
  oneLevelData: {
    url: 'CommClassify/findoneLevel',
    method: 'post'
  },
  // 二级分类
  twoLevelData: {
    url: 'CommClassify/findtwoLevel',
    method: 'post'
  },
  findCateData: {
    url: '/pc/goodsCate/findCate',
    method: 'post'
  },
  addCommClassify: {
    url: 'CommClassify/addCommClassify',
    method: 'post'
  },
  deleteCateData: {
    url: 'CommClassify/deleteCommClassify',
    method: 'post'
  },
  updateCateData: {
    url: 'CommClassify/updateCommClassify',
    method: 'post'
  },
  listCateData: {
    url: '/pc/goodsCate/listCate',
    method: 'post'
  }
  // // 一级分类
  // oneLevelData: {
  //   url: '/pc/goodsCate/oneLevel',
  //   method: 'post'
  // }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

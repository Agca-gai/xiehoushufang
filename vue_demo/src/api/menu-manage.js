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
  findMenuData: {
    url: '/pc/menu/findMenu',
    method: 'post'
  },
  addMenuData: {
    url: '/pc/menu/addMenu',
    method: 'post'
  },
  deleteMenuData: {
    url: '/pc/menu/deleteMenu',
    method: 'post'
  },
  updateMenuData: {
    url: '/pc/menu/updateMenu',
    method: 'post'
  },
  listMenuData: {
    url: '/pc/menu/listMenu',
    method: 'post'
  }

}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

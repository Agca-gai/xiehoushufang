<template>
    <div>
    <i-search ref="iSearch" :model="formData">
      <el-form-item prop="UserName">
        <el-input v-model="formData.UserName" placeholder="请输入下单人"></el-input>
      </el-form-item>
      <el-form-item prop="OrderId">
        <el-input v-model="formData.OrderId" placeholder="请输入订单编号"></el-input>
      </el-form-item>
      <el-form-item prop="Phone">
        <el-input v-model="formData.Phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item  prop="OrderState">
        <el-select v-model="formData.OrderState" placeholder="请选择订单状态">
          <el-option v-for="item in OrderStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </i-search>

    <i-table :toolBar="toolBar" :itemList="columnlist" :frominput="frominput" :pageInfo="pageInfo" :tableData="tableData"
    @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
    :selectionShow="true" @selection-change="handleSelectionChange">
      <el-table-column v-for="(item, index) in columnlist" :label="item.label" :prop="item.prop" :key="index" align="center" :formatter="columnFormatter">
      </el-table-column>
    </i-table>
<!-- 详情按钮 -->
    <i-dialog :title="dialogTitle" :pageInfo="pageInfo" v-model="dialogVisible" @dialog-confirm="dialogConfirm" @dialog-cancel="dialogCancel">
      <i-table :tableData="detailtableData" class="dialog_table" :selectionShow="false">
        <el-table-column v-for="(item, index) in detailcolumnlist" :label="item.label" :prop="item.prop" :key="index" :width="item.width" align="center"></el-table-column>
      </i-table>
    </i-dialog>
    </div>
</template>

<script>
import ITable from '../../components/i-table.vue'
import IDialog from '../../components/i-dialog.vue'
import IFile from '../../components/i-file.vue'
import ISearch from '../../components/i-search'
// import upImg from '../../components/uploadImg.vue'
import qer from '../../api/order-manage'
import qer2 from '../../api/user-data'
export default {
  components: {ITable, IDialog, IFile, ISearch},
  data () {
    return {
      toolBar: [
        {btnname: '详情',
          type: 'primary',
          icon: 'el-icon-view',
          func: () => {
            this.dialogVisible = true
            // for (let i = 0; i < this.SelectData.length; i++) {
            //   if (i === this.SelectData.length - 1) {
            //     this.viewPagerCodeList += this.SelectData[i].orderCode
            //   } else {
            //     this.viewPagerCodeList += this.SelectData[i].orderCode + ','
            //   }
            // }
            if (this.selectDataarray.length === 1) {
              qer('listxiangqingOrderData', {
                // ...userCode
                OrderId: this.selectDataarray[0].OrderId
              }).then(data => {
                console.log(data)
                this.detailtableData = data.data
                if (data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '查询详情成功'
                  })
                }
              })
            } else if (this.selectDataarray.length === 0) {
              this.dialogVisible = false
              this.$message({
                type: 'error',
                message: '请选择需要查询的订单！'
              })
            } else {
              this.dialogVisible = false
              this.$message({
                type: 'error',
                message: '只能选择一组数据查询！'
              })
            }
          }},
        {btnname: '订单取消',
          type: 'warning',
          icon: 'el-icon-close',
          func: () => {
            if (this.selectDataarray.length > 0) {
              this.$confirm('是否取消订单？').then(() => {
                // console.log('vcode', this.selectDataarray)
                for (let i = 0; i < this.selectDataarray.length; i++) {
                  if (this.selectDataarray[i].OrderState === 1) {
                    var array = []
                    for (var j in this.selectDataarray) {
                      array.push(this.selectDataarray[j].OrderId)
                    }
                    qer('updateOrderStateData', {
                      // ...userCode
                      'array': array,
                      OrderState: 2
                    }).then(data => {
                      console.log(data)
                      if (data.code === 0) {
                        this.$message({
                          type: 'success',
                          message: '取消订单成功'
                        })
                        this.getTableData()
                      }
                    })
                  } else {
                    // alert('请选择已下单的订单！')
                    this.$message({
                      type: 'error',
                      message: '请选择已下单的订单！'
                    })
                  }
                }
                // console.log('删除data类型', typeof (this.viewPagerCodeList))
                // console.log('删除data', this.viewPagerCodeList)
              }).catch((e) => {})
            } else {
              this.$message({
                type: 'error',
                message: '请选择订单！'
              })
            }
          }},
        {btnname: '订单到货',
          type: 'success',
          icon: 'el-icon-check',
          func: () => {
            if (this.selectDataarray.length > 0) {
              this.$confirm('是否订单到货？').then(() => {
                // console.log('vcode', this.selectDataarray)
                for (let i = 0; i < this.selectDataarray.length; i++) {
                  if (this.selectDataarray[i].OrderState === 1) {
                    var array = []
                    for (var j in this.selectDataarray) {
                      array.push(this.selectDataarray[j].OrderId)
                    }
                    qer('updateOrderStateData', {
                      // ...userCode
                      'array': array,
                      OrderState: 3
                    }).then(data => {
                      console.log(data)
                      if (data.code === 0) {
                        this.$message({
                          type: 'success',
                          message: '订单到货成功'
                        })
                        this.getTableData()
                      }
                    })
                  } else {
                    // alert('请选择已下单的订单！')
                    this.$message({
                      type: 'error',
                      message: '请选择已下单的订单！'
                    })
                  }
                }
                // console.log('删除data类型', typeof (this.viewPagerCodeList))
                // console.log('删除data', this.viewPagerCodeList)
              }).catch((e) => {})
            } else {
              this.$message({
                type: 'error',
                message: '请选择订单！'
              })
            }
          }},
        {btnname: '取消到货',
          type: 'danger',
          icon: 'el-icon-close',
          func: () => {
            if (this.selectDataarray.length > 0) {
              this.$confirm('是否取消订单到货？').then(() => {
                // console.log('vcode', this.selectDataarray)
                for (let i = 0; i < this.selectDataarray.length; i++) {
                  if (this.selectDataarray[i].OrderState === 3) {
                    var array = []
                    for (var j in this.selectDataarray) {
                      array.push(this.selectDataarray[j].OrderId)
                    }
                    qer('updateOrderStateData', {
                      // ...userCode
                      'array': array,
                      OrderState: 1
                    }).then(data => {
                      console.log(data)
                      if (data.code === 0) {
                        this.$message({
                          type: 'success',
                          message: '订单取消到货成功'
                        })
                        this.getTableData()
                      }
                    })
                  } else {
                    // alert('请选择已下单的订单！')
                    this.$message({
                      type: 'error',
                      message: '请选择已到货的订单！'
                    })
                  }
                }
                // console.log('删除data类型', typeof (this.viewPagerCodeList))
                // console.log('删除data', this.viewPagerCodeList)
              }).catch((e) => {})
            } else {
              this.$message({
                type: 'error',
                message: '请选择订单！'
              })
            }
          }},
        {btnname: '订单已取货',
          type: 'success',
          icon: 'el-icon-check',
          func: () => {
            if (this.selectDataarray.length > 0) {
              this.$confirm('订单是否已经取货？').then(() => {
                // console.log('vcode', this.selectDataarray)
                for (let i = 0; i < this.selectDataarray.length; i++) {
                  if (this.selectDataarray[i].OrderState === 3) {
                    var array = []
                    for (var j in this.selectDataarray) {
                      array.push(this.selectDataarray[j].OrderId)
                    }
                    qer('updateOrderStateData', {
                      // ...userCode
                      'array': array,
                      OrderState: 4
                    }).then(data => {
                      console.log(data)
                      if (data.code === 0) {
                        this.$message({
                          type: 'success',
                          message: '订单取货成功'
                        })
                        this.getTableData()
                      }
                    })
                  } else {
                    // alert('请选择已下单的订单！')
                    this.$message({
                      type: 'error',
                      message: '请选择已到货的订单！'
                    })
                  }
                }
                // console.log('删除data类型', typeof (this.viewPagerCodeList))
                // console.log('删除data', this.viewPagerCodeList)
              }).catch((e) => {})
            } else {
              this.$message({
                type: 'error',
                message: '请选择订单！'
              })
            }
          }},
        {btnname: '取消已取货',
          type: 'danger',
          icon: 'el-icon-close',
          func: () => {
            if (this.selectDataarray.length > 0) {
              this.$confirm('订单取消已经取货？').then(() => {
                // console.log('vcode', this.selectDataarray)
                for (let i = 0; i < this.selectDataarray.length; i++) {
                  if (this.selectDataarray[i].OrderState === 4) {
                    var array = []
                    for (var j in this.selectDataarray) {
                      array.push(this.selectDataarray[j].OrderId)
                    }
                    qer('updateOrderStateData', {
                      // ...userCode
                      'array': array,
                      OrderState: 3
                    }).then(data => {
                      console.log(data)
                      if (data.code === 0) {
                        this.$message({
                          type: 'success',
                          message: '订单取消取货成功'
                        })
                        this.getTableData()
                      }
                    })
                  } else {
                    // alert('请选择已下单的订单！')
                    this.$message({
                      type: 'error',
                      message: '请选择已取货的订单！'
                    })
                  }
                }
                // console.log('删除data类型', typeof (this.viewPagerCodeList))
                // console.log('删除data', this.viewPagerCodeList)
              }).catch((e) => {})
            } else {
              this.$message({
                type: 'error',
                message: '请选择订单！'
              })
            }
          }},
        {btnname: '查询',
          type: 'info',
          icon: 'el-icon-search',
          func: () => {
            this.reachBtn()
          }},
        {btnname: '重置',
          type: 'info',
          icon: 'el-icon-loading',
          func: () => {
            this.formData.UserName = ''
            this.formData.OrderId = ''
            this.formData.Phone = ''
            this.formData.OrderState = ''
          }}
      ],
      dialogFromData: {
        paixun: '',
        HomePicUrl: '',
        HomePicState: '',
        CreateTime: '',
        EndTime: '',
        CommId: ''
      },
      homedialogFromData: {
        CommId: '',
        CommName: ''
      },
      formData: {
        UserName: '',
        OrderId: '',
        Phone: '',
        OrderState: ''
      },
      formRules: {
        paixun: [
          {required: true, message: '请输入排序', trigger: 'blur'},
          {type: 'number', message: '请输入数字', trigger: 'blur'}
        ],
        HomePicUrl: [
          {required: true, message: '请选择图片', trigger: 'change'}
        ],
        HomePicState: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ],
        CreateTime: [
          {required: true, message: '请选择起始时间', trigger: 'change'}
        ],
        EndTime: [
          {required: true, message: '请选择结束时间', trigger: 'change'}
        ],
        CommId: [
          {required: true, message: '请选择商品', trigger: 'change'}
        ]
      },
      startTimePickerOptions: {
        disabledDate: (value) => {
          // console.log(value)
          return this.dialogFromData.EndTime < value
        }
      },
      endTimePickerOptions: {
        disabledDate: (value) => {
          // console.log(value)
          return this.dialogFromData.CreateTime > value
        }
      },
      dialogTitle: '订单详情',
      dialogVisible: false,
      frominput: '',
      selectDataarray: '',
      OrderStateList: [
        {label: '已下单', value: 1},
        {label: '已取消', value: 2},
        {label: '已到货', value: 3},
        {label: '已取货 ', value: 4},
        {label: '已完成已评价', value: 5},
        {label: '已完成未评价', value: 6}
      ],
      options: [
        {label: '支付', value: 1},
        {label: '未支付', value: 2}
      ],
      AdressValueList: [
        {label: '自提', value: 0},
        {label: '快递', value: 1}
      ],
      columnlist: [
        {label: '订单编号', prop: 'OrderId'},
        {label: '订单总价', prop: 'OrderPriceSum'},
        {label: '订单状态', prop: 'OrderState', distName: 'OrderStateList'},
        {label: '支付状态', prop: 'PayState', distName: 'options'},
        {label: '门店编号', prop: 'StoreId'},
        {label: '下单人姓名', prop: 'UserName'},
        {label: '下单人手机号', prop: 'Phone'},
        {label: '配送方式', prop: 'AdressValue', distName: 'AdressValueList'},
        {label: '配送地址', prop: 'UserAdressName'},
        {label: '下单人备注', prop: 'beizhu'},
        {label: '确认付款时间', prop: 'CreateTime'}
      ],
      detailcolumnlist: [
        {label: '订单编码', prop: 'OrderId', width: '100'},
        {label: '商品编码', prop: 'CommId', width: '100'},
        {label: '商品名称', prop: 'CommName', width: '200'},
        {label: '购买数量', prop: 'UserBuyCount', width: ''},
        {label: '总金额', prop: 'CommPriceSum', width: ''},
        {label: '售价', prop: 'CommSell', width: ''},
        {label: '定价', prop: 'CommPrice', width: ''}
      ],
      detailtableData: [],
      isreach: false,
      tableData: [],
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      homepageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    reachBtn () {
      console.log(this.formData)
      qer('findOrderData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize,
        UserName: this.formData.UserName,
        OrderId: this.formData.OrderId,
        Phone: this.formData.Phone,
        OrderState: this.formData.OrderState
      }).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.tableData = data.data
          this.pageInfo.total = data.pageTotal
          this.$message({
            type: 'success',
            message: data.mes
          })
          this.isreach = true
        } else {
          this.tableData = data.data
          this.pageInfo.total = data.pageTotal
          this.$message({
            type: 'error',
            message: data.mes
          })
        }
      })
    },
    getTableData () {
      qer('listOrderData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize
      }).then(data => {
        console.log(data)
        this.pageInfo.total = data.pageTotal
        this.tableData = data.data
      })
    },
    // 点击选择显示数据
    getGoodsData () {
      this.homedialogVisible = true
      qer('findGoodsData', {
        currentPage: this.homepageInfo.pageIndex,
        pageSize: this.homepageInfo.pageSize
      }).then(data => {
        console.log(data)
        this.hometableData = data.data
        this.homepageInfo.total = data.pageTotal
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: '查询列表数据成功'
          })
        }
      })
    },
    // 预览图
    watchImg (data) {
      console.log(data)
      window.open(data.HomePicUrl)
    },
    // 转换字典
    filterDist (value, item) {
      if (item.distName) {
        return this[item.distName].filter(distItem => {
          return distItem.value === value
        })[0].label
      } else {
        return value
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pageSize = val
      if (this.isreach === false) {
        this.getTableData()
      } else {
        this.reachBtn()
      }
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pageIndex = val
      if (this.isreach === false) {
        this.getTableData()
      } else {
        this.reachBtn()
      }
    },
    // 商品选择里面的表格分页
    homehandleSizeChange (value) {
      console.log('每页条数', value)
      this.homepageInfo.pageSize = value
      this.getGoodsData()
    },
    homehandleCurrentChange (value) {
      console.log('当前页数', value)
      this.homepageInfo.pageIndex = value
      this.getGoodsData()
    },
    // 多选框点击显示点击的数据
    handleSelectionChange (rows) {
      console.log('rows', rows)
      this.selectDataarray = rows
    },
    // 关掉dialog中点击选择的里面之前清空表单值
    homedialogBeforeClose () {
      console.log(111)
      this.$refs.homeform.resetFields()
      this.homedialogVisible = false
    },
    homehandleSelectionChange (rows) {
      console.log('rows', rows)
      this.homeselectDataarray = rows
    },
    // 点击i-dialog里面的选择按钮的取消按钮
    homedialogCancel () {
      this.homedialogVisible = false
    },
    homedialogConfirm () {
      console.log('确定按钮被点击了')
      this.$refs.homeform.validate((valid) => {
        if (valid) {
          console.log('表单检验通过了')
          if (this.homeselectDataarray.length === 1) {
            this.dialogFromData.CommId = this.homeselectDataarray[0].CommId
            console.log(this.homeselectDataarray[0].CommId)
            this.homedialogVisible = false
          } else if (this.homeselectDataarray.length === 0) {
            this.$message({
              type: 'error',
              message: '请选择一组数据'
            })
          } else {
            this.$message({
              type: 'error',
              message: '只能选择一组数据'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击取消按钮
    dialogCancel () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    // 关掉dialog之前清空表单值
    dialogBeforeClose () {
      console.log(111)
      this.$refs.form.resetFields()
    },
    dialogConfirm () {
      console.log('确定按钮被点击了')
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('表单检验通过了')
          // 新增用户发送请求
          qer('addViewPageData', {
            // access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token,
            ...this.dialogFromData
          }).then(data => {
            console.log(data)
            if (data.code === 0) {
              this.$message({
                type: 'success',
                message: data.mes
              })
              // 操作日志接口
              qer2('UpdateOperaLog', {
                Content: '新增轮播图',
                State: 1
              }).then(data => {
                // console.log(data)
              })
              // this.fetchsearch()
              this.dialogVisible = false
              this.$refs.form.resetFields()
              this.getTableData()
            } else {
              this.$message({
                type: 'error',
                message: data.mes
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    columnFormatter (row, column, cellValue, index) {
      let distName = this.columnlist.filter(item => {
        return item.prop === column.property
      })[0].distName
      if (distName) {
        // console.log(row[column.property])
        // console.log(this[distName])
        return this[distName].filter(item => {
          return item.value === row[column.property]
        })[0].label
      } else {
        return row[column.property]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog {
    .el-dialog__body {
      .el-form {
        .el-row {
          .el-col {
            .form-item-button {
              .el-form-item__content {
              margin-left: 10px !important;
              }
            }
          }
            .form-item-table {
              .el-form-item__content {
              margin-left: 0px !important;
              width: 100%;
              }
            }
            .el-date-editor {
              width: 100%;
            }
        }
      }
    }
  }
  /deep/ .el-dialog {
  width: 70% !important;
  .dialog_table {
    .pageInfo {
      display: none;
    }
  }
}
</style>

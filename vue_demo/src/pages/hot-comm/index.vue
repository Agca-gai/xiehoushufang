<template>
    <div>
    <i-search ref="iSearch" :model="formData">
      <el-form-item prop="CommId">
        <el-input v-model="formData.CommId" placeholder="请输入商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="CommName">
        <el-input v-model="formData.CommName" placeholder="请输入商品名称"></el-input>
      </el-form-item>
    </i-search>

    <i-table :toolBar="toolBar" :itemList="columnlist" :frominput="frominput" :pageInfo="pageInfo" :tableData="tableData"
    @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
    :selectionShow="true" @selection-change="handleSelectionChange">
      <el-table-column v-for="(item, index) in columnlist" :label="item.label" :prop="item.prop" :key="index" align="center" :formatter="columnFormatter">
        <template slot-scope="scope">
        <img v-if="item.prop === 'CommImage'" type= "text" @click="watchImg(scope.row)" :src="scope.row.CommImage" alt="" style="cursor: pointer; width: 50px">
        <span v-else>{{filterDist(scope.row[item.prop], item)}}</span>
      </template>
      </el-table-column>
    </i-table>
        <!-- 新增按钮 -->
    <i-dialog :title="dialogTitle" v-model="dialogVisible" @dialog-confirm="dialogConfirm" @dialog-cancel="dialogCancel" @dialog-before-close="dialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="dialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                <el-form-item label="排序" class="form-item" prop="paixun">
                    <el-input v-model.number="dialogFromData.paixun"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="商品" class="form-item" prop="CommId">
                    <el-input v-model="dialogFromData.CommId"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item class="form-item-button" prop="test6">
                    <el-button type="primary" v-model="dialogFromData.test6" @click="getGoodsData">选择</el-button>
                </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
    </i-dialog>
        <!-- 修改按钮 -->
    <i-dialog :title="xiugaidialogTitle" v-model="xiugaidialogVisible" @dialog-confirm="xiugaidialogConfirm" @dialog-cancel="xiugaidialogCancel" @dialog-before-close="xiugaidialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="xiugaidialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                <el-form-item label="排序" class="form-item" prop="paixun">
                    <el-input v-model.number="xiugaidialogFromData.paixun"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="商品" class="form-item" prop="CommId">
                    <el-input v-model="xiugaidialogFromData.CommId"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item class="form-item-button" prop="test6">
                    <el-button type="primary" v-model="xiugaidialogFromData.test6" @click="getGoodsData">选择</el-button>
                </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
    </i-dialog>
        <!-- 展示数量按钮 -->
    <i-dialog :title="zhanshidialogTitle" v-model="zhanshidialogVisible" @dialog-confirm="zhanshidialogConfirm" @dialog-cancel="zhanshidialogCancel" @dialog-before-close="zhanshidialogBeforeClose">
      <el-form :rules="zhanshiformRules" ref="zhanshiform"  :model="zhanshidialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                <el-form-item label="展示数量" class="form-item" prop="showCount">
                    <el-input v-model.number="zhanshidialogFromData.showCount"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
    </i-dialog>
          <!-- 点击i-dialog里面的选择按钮 -->
    <el-dialog title="轮播商品选择" :visible.sync="homedialogVisible" :before-close="homedialogBeforeClose" width="60% !important">
      <el-form  ref="homeform"  :model="homedialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="8">
                <el-form-item label="商品ID" class="form-item" prop="CommId">
                    <el-input v-model="homedialogFromData.CommId" placeholder="请输入商品ID"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="8">
                <el-form-item label="商品名称" class="form-item" prop="CommName">
                    <el-input v-model="homedialogFromData.CommName" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="8">
                <el-form-item class="form-item-button">
                    <el-button type="success" icon='el-icon-search'>查询</el-button>
                    <el-button type="warning" icon='el-icon-loading'>重置</el-button>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                <el-form-item class="form-item-table" prop="test3">
                      <i-table :pageInfo="homepageInfo" :tableData="hometableData"
                      @handleSizeChange="homehandleSizeChange" @handleCurrentChange="homehandleCurrentChange"
                      :selectionShow="true" @selection-change="homehandleSelectionChange">
                        <el-table-column height="80px" v-for="(item, index) in homecolumnlist" :label="item.label" :prop="item.prop" :key="index" :width="item.width" align="center"></el-table-column>
                      </i-table>
                </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="homedialogCancel">取 消</el-button>
        <el-button type="primary" @click="homedialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import ITable from '../../components/i-table.vue'
import IDialog from '../../components/i-dialog.vue'
import IFile from '../../components/i-file.vue'
import ISearch from '../../components/i-search'
// import upImg from '../../components/uploadImg.vue'
import qer from '../../api/hot-comm-manage'
import qer2 from '../../api/user-data'
export default {
  components: {ITable, IDialog, IFile, ISearch},
  data () {
    return {
      toolBar: [
        {btnname: '新增',
          type: 'primary',
          icon: 'el-icon-plus',
          func: () => {
            this.isxiugai = false
            this.dialogVisible = true
          }},
        {btnname: '修改',
          type: 'success',
          icon: 'el-icon-edit',
          func: () => {
            this.isxiugai = true
            if (this.selectDataarray === '') {
              this.$message({
                type: 'error',
                message: '请选择一组数据进行修改！'
              })
            } else if (this.selectDataarray.length > 1) {
              this.$message({
                type: 'error',
                message: '只能选择一组数据进行修改！'
              })
            } else {
              this.xiugaidialogVisible = true
              this.xiugaidialogFromData = this.selectDataarray[0]
            }
          }},
        {btnname: '删除',
          type: 'danger',
          icon: 'el-icon-delete',
          func: () => {
            if (this.selectDataarray === '') {
              this.$message({
                type: 'error',
                message: '请选择一组数据进行删除！'
              })
            } else {
              var array = []
              for (var i in this.selectDataarray) {
                array.push(this.selectDataarray[i].HotCommId)
              }
              // console.log(array)
              // 删除用户发送请求
              qer('deleteHotGoodsData', {
                'array': array
              }).then(data => {
                console.log(data)
                if (data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '删除成功！'
                  })
                  this.getTableData()
                  // 操作日志接口
                  qer2('UpdateOperaLog', {
                    Content: '删除热门位商品' + array,
                    State: 1
                  }).then(data => {
                    // console.log(data)
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败！'
                  })
                }
              })
            }
          }},
        {btnname: '设置展示数量',
          type: 'warning',
          icon: 'el-icon-view',
          func: () => {
            this.zhanshidialogVisible = true
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
            this.formData.CommId = ''
            this.formData.CommName = ''
          }}
      ],
      dialogFromData: {
        paixun: '',
        CommId: ''
      },
      xiugaidialogFromData: {
        paixun: '',
        CommId: ''
      },
      homedialogFromData: {
        CommId: '',
        CommName: ''
      },
      zhanshidialogFromData: {
        showCount: ''
      },
      formData: {
        CommId: '',
        CommName: ''
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
      zhanshiformRules: {
        showCount: [
          {required: true, message: '请输入数量', trigger: 'blur'},
          {type: 'number', message: '请输入数字', trigger: 'blur'}
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
      dialogTitle: '新增热门位商品',
      dialogVisible: false,
      xiugaidialogTitle: '修改热门位商品',
      xiugaidialogVisible: false,
      zhanshidialogTitle: '设置数量展示',
      zhanshidialogVisible: false,
      homedialogVisible: false,
      frominput: '',
      selectDataarray: '',
      homeselectDataarray: '',
      HomePicStateList: [
        {label: '启用', value: 0},
        {label: '禁用', value: 1}
      ],
      columnlist: [
        {label: '排序', prop: 'paixun'},
        {label: '商品编号', prop: 'CommId'},
        {label: '商品名称', prop: 'CommName'},
        {label: '商品图片', prop: 'CommImage'},
        {label: '商品价格', prop: 'CommSell'},
        {label: '销售量', prop: 'CommSellSum'}
      ],
      homecolumnlist: [
        {label: '商品编号', prop: 'CommId'},
        {label: '商品名称', prop: 'CommName'},
        {label: '商品状态', prop: 'CommState'},
        {label: '一级分类', prop: 'OneLevel'},
        {label: '二级分类', prop: 'TwoLevel'}
      ],
      hometableData: [],
      isreach: false,
      isxiugai: false,
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
      qer('findHotGoodsData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize,
        CommId: this.formData.CommId,
        CommName: this.formData.CommName
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
      qer('listHotGoodsData', {
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
            if (this.isxiugai === false) {
              this.dialogFromData.CommId = this.homeselectDataarray[0].CommId
            } else {
              this.xiugaidialogFromData.CommId = this.homeselectDataarray[0].CommId
            }
            // console.log(this.homeselectDataarray[0].CommId)
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
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 关掉dialog之前清空表单值
    dialogBeforeClose () {
      this.$refs.form.resetFields()
      console.log(111)
    },
    dialogConfirm () {
      console.log('确定按钮被点击了')
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('表单检验通过了')
          // 新增用户发送请求
          qer('addHotGoodsData', {
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
    // 点击展示按钮
    zhanshidialogCancel () {
      this.$refs.zhanshiform.resetFields()
      this.zhanshidialogVisible = false
    },
    // 关掉dialog之前清空表单值
    zhanshidialogBeforeClose () {
      this.$refs.zhanshiform.resetFields()
      console.log(111)
    },
    zhanshidialogConfirm () {
      console.log('确定按钮被点击了')
      this.$refs.zhanshiform.validate((valid) => {
        if (valid) {
          console.log('表单检验通过了')
          // 新增用户发送请求
          qer('addHotGoodsData', {
            // access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token,
            ...this.zhanshidialogFromData
          }).then(data => {
            console.log(data)
            if (data.code === 0) {
              this.$message({
                type: 'success',
                message: data.mes
              })
              // 操作日志接口
              qer2('UpdateOperaLog', {
                Content: '设置热门位商品展示数量',
                State: 1
              }).then(data => {
                // console.log(data)
              })
              // this.fetchsearch()
              this.zhanshidialogVisible = false
              this.$refs.zhanshiform.resetFields()
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
    // 点击修改的取消按钮
    xiugaidialogCancel () {
      this.xiugaidialogVisible = false
      this.getTableData()
      // this.$refs.form.resetFields()
    },
    // 关掉dialog之前清空表单值
    xiugaidialogBeforeClose () {
      console.log(111)
      this.getTableData()
      // this.$refs.form.resetFields()
    },
    xiugaidialogConfirm () {
      console.log('确定按钮被点击了')
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('表单检验通过了')
          // 修改用户发送请求
          qer('updateHotGoodsData', {
            // access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token,
            ...this.xiugaidialogFromData
          }).then(data => {
            console.log(data)
            if (data.code === 0) {
              this.$message({
                type: 'success',
                message: data.mes
              })
              qer2('UpdateOperaLog', {
                Content: '修改热门位商品' + this.xiugaidialogFromData.CommId,
                State: 1
              }).then(data => {
                // console.log(data)
              })
              // this.fetchsearch()
              this.$refs.form.resetFields()
              this.xiugaidialogVisible = false
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
</style>

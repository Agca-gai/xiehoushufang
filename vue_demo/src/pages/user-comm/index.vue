<template>
    <div>
      <i-search ref="iSearch" :model="formData">
      <el-form-item prop="Mid">
        <el-input v-model="formData.Mid" placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item  prop="ManName">
        <el-input v-model="formData.ManName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item  prop="userRole">
        <el-select v-model="formData.userRole" placeholder="请选择角色">
          <el-option v-for="item in RoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </i-search>

    <i-table :toolBar="toolBar" :itemList="reachNav" :pageInfo="pageInfo" :tableData="tableData"
    @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
    :selectionShow="true" @selection-change="handleSelectionChange">
      <el-table-column v-for="(item, index) in columnlist" :label="item.label" :prop="item.prop" :key="index" align="center" :formatter="columnFormatter">
      <template slot-scope="scope">
        <img v-if="item.prop === 'ManImage'" type= "text" @click="watchImg(scope.row)" :src="scope.row.ManImage" alt="" style="cursor: pointer; width: 50px">
        <span v-else>{{filterDist(scope.row[item.prop], item)}}</span>
      </template>
      </el-table-column>
    </i-table>
        <!-- 新增按钮 -->
    <i-dialog :title="dialogTitle" v-model="dialogVisible" @dialog-confirm="dialogConfirm" @dialog-cancel="dialogCancel" @dialog-before-close="dialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="dialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                <el-form-item label="用户账号" class="form-item" prop="Mid">
                    <el-input v-model="dialogFromData.Mid"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="用户姓名" class="form-item" prop="ManName">
                    <el-input v-model="dialogFromData.ManName"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="用户性别" class="form-item" prop="ManSex">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="dialogFromData.ManSex" placeholder="请选择">
                      <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="手机号" class="form-item" prop="ManPhone">
                    <el-input v-model="dialogFromData.ManPhone"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="用户密码" class="form-item" prop="ManPassword">
                    <el-input v-model="dialogFromData.ManPassword" show-password></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="用户角色" class="form-item" prop="userRole">
                    <el-select v-model="dialogFromData.userRole" placeholder="请选择">
                      <el-option v-for="item in RoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="用户头像" class="form-item" prop="ManImage">
                    <!-- <input type="file" id="file" @change="inputchange($event)"> -->
                    <i-file v-model="dialogFromData.ManImage"></i-file>
                    <!-- <up-img @imgUrl="imgUrl"></up-img> -->
                </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
    </i-dialog>

    <!-- // 修改按钮 -->
    <i-dialog :title="xiugaidialogTitle" v-model="xiugaidialogVisible" @dialog-confirm="xiugaidialogConfirm" @dialog-cancel="xiugaidialogCancel" @dialog-before-close="xiugaidialogBeforeClose">
      <el-form :rules="formRules" ref="form" :model="xiugaidialogFromData" label-width="100px">
        <el-row>
              <el-col :span="12">
            <el-form-item label="用户账号" class="form-item" prop="Mid">
                <el-input v-model="xiugaidialogFromData.Mid"></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="用户姓名" class="form-item" prop="ManName">
                <el-input v-model="xiugaidialogFromData.ManName"></el-input>
            </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
            <el-form-item label="用户性别" class="form-item" prop="ManSex">
                <el-select v-model="xiugaidialogFromData.ManSex" placeholder="请选择">
                  <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="手机号" class="form-item" prop="ManPhone">
                <el-input v-model="xiugaidialogFromData.ManPhone"></el-input>
            </el-form-item>
              </el-col>
            </el-row>
            <el-row class="el-row">
              <el-col :span="12">
            <el-form-item label="用户角色" class="form-item" prop="userRole">
                <el-select v-model="xiugaidialogFromData.userRole" placeholder="请选择">
                  <el-option v-for="item in RoleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
              </el-col>
            </el-row>
            <el-row class="el-row">
              <el-col :span="12">
            <el-form-item label="用户头像" class="form-item" prop="ManImage">
                <i-file v-model="xiugaidialogFromData.ManImage"></i-file>
                <!-- <up-img @imgUrl="imgUrl"></up-img> -->
            </el-form-item>
              </el-col>
        </el-row>
      </el-form>
    </i-dialog>
    </div>
</template>

<script>
import ITable from '../../components/i-table.vue'
import IDialog from '../../components/i-dialog.vue'
import IFile from '../../components/i-file.vue'
import ISearch from '../../components/i-search'
import upImg from '../../components/uploadImg.vue'
import qer from '../../api/user-manage'
import qer2 from '../../api/user-data'
export default {
  components: {ITable, IDialog, IFile, upImg, ISearch},
  data () {
    return {
      toolBar: [
        {btnname: '新增',
          type: 'primary',
          icon: 'el-icon-plus',
          func: () => {
            this.dialogVisible = true
          }},
        {btnname: '修改',
          type: 'success',
          icon: 'el-icon-edit',
          func: () => {
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
                array.push(this.selectDataarray[i].Mid)
              }
              // console.log(array)
              // 删除用户发送请求
              qer('deleteUserData', {
                'array': array
              }).then(data => {
                console.log(data)
                if (data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '删除成功！'
                  })
                  this.gettableData()
                  // 操作日志接口
                  qer2('UpdateOperaLog', {
                    Content: '删除用户' + array,
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
        {btnname: '查询',
          type: 'warning',
          icon: 'el-icon-search',
          func: () => {
            this.reachBtn()
          }},
        {btnname: '重置',
          type: 'info',
          icon: 'el-icon-loading',
          func: () => {
            this.formData.Mid = ''
            this.formData.ManName = ''
            this.formData.userRole = ''
          }}
      ],
      formData: {
        Mid: '',
        ManName: '',
        userRole: ''
      },
      dialogFromData: {
        Mid: '',
        ManName: '',
        ManSex: 0,
        ManImage: '',
        userRole: 1,
        ManPhone: '',
        ManPassword: ''
      },
      xiugaidialogFromData: {
        Mid: '',
        ManName: '',
        ManSex: 0,
        ManImage: '',
        userRole: 1,
        ManPhone: ''
      },
      formRules: {
        Mid: [
          {required: true, message: '请输入用户账号', trigger: 'blur'},
          {min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur'}
        ],
        ManName: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        ManSex: [
          {required: true, message: '请输入用户性别', trigger: 'change'}
          // {type: 'Number', min: 1, max: 2, message: '0 或者 1', trigger: 'change'}
        ],
        ManPhone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的11位手机号', trigger: 'blur'}
        ],
        ManPassword: [
          {required: true, message: '请输入用户密码', trigger: 'change'},
          {validator: this.validaterpassword, trigger: 'change'}
        ],
        userRole: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
      dialogTitle: '新增用户',
      dialogVisible: false,
      xiugaidialogTitle: '修改用户',
      xiugaidialogVisible: false,
      frominput: '',
      fromselect: '',
      selectDataarray: '',
      sexList: [
        {label: '女', value: 1},
        {label: '男', value: 0}
      ],
      RoleList: [
        {label: '管理员', value: 1},
        {label: '店长', value: 2},
        {label: '司机', value: 3}
      ],
      columnlist: [
        {label: '用户ID', prop: 'Mid'},
        {label: '用户名', prop: 'ManName'},
        {label: '手机号', prop: 'ManPhone'},
        {label: '性别', prop: 'ManSex', distName: 'sexList'},
        {label: '头像', prop: 'ManImage'},
        {label: '角色', prop: 'userRole', distName: 'RoleList'}
      ],
      reachNav: [
        {label: '用户ID', prop: 'Mid'},
        {label: '用户名', prop: 'ManName'},
        {label: '手机号', prop: 'ManPhone'},
        {label: '性别', prop: 'ManSex', distName: 'sexList'},
        {label: '角色', prop: 'userRole', distName: 'RoleList'}
      ],
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      isreach: false,
      tableData: []
    }
  },
  methods: {
    reachBtn () {
      console.log(this.formData)
      qer('findUserData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize,
        Mid: this.formData.Mid,
        ManName: this.formData.ManName,
        userRole: this.formData.userRole
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
    // 预览图
    watchImg (data) {
      console.log(data)
      window.open(data.ManImage)
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
    imgUrl (imgUrl) {
      console.log(imgUrl)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.pageSize = val
      if (this.isreach === false) {
        this.gettableData()
      } else {
        this.reachBtn()
      }
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.pageIndex = val
      if (this.isreach === false) {
        this.gettableData()
      } else {
        this.reachBtn()
      }
    },
    // 多选框点击显示点击的数据
    handleSelectionChange (rows) {
      console.log('rows', rows)
      this.selectDataarray = rows
      // console.log(this.selectDataarray)
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
          qer('addUserData', {
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
                Content: '新增用户' + this.dialogFromData.Mid,
                State: 1
              }).then(data => {
                // console.log(data)
              })
              // this.fetchsearch()
              this.dialogVisible = false
              this.$refs.form.resetFields()
              this.gettableData()
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
      this.gettableData()
      // this.$refs.form.resetFields()
    },
    // 关掉dialog之前清空表单值
    xiugaidialogBeforeClose () {
      console.log(111)
      this.gettableData()
      // this.$refs.form.resetFields()
    },
    xiugaidialogConfirm () {
      console.log('确定按钮被点击了')
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('表单检验通过了')
          // 修改用户发送请求
          qer('xiugaiUserData', {
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
                Content: '修改用户' + this.xiugaidialogFromData.Mid,
                State: 1
              }).then(data => {
                // console.log(data)
              })
              // this.fetchsearch()
              this.xiugaidialogVisible = false
              this.$refs.form.resetFields()
              this.gettableData()
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
    // 获取表格数据
    gettableData () {
      qer('getTableData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize
      }).then(data => {
        // console.log(data)
        this.tableData = data.data
        this.pageInfo.total = data.pageTotal
        this.isreach = false
      })
    },
    // 数字转化为文字
    columnFormatter (row, column, cellValue, index) {
      // console.log(column)
      let distName = this.columnlist.filter(item => {
        return item.prop === column.property
      })[0].distName
      // console.log('distName', distName)
      if (distName) {
        return this[distName].filter(item => {
          return item.value === row[column.property]
        })[0].label
      } else {
        return row[column.property]
      }
    }
  },
  mounted () {
    this.gettableData()
  }
}
</script>

<style lang="scss" scoped>

</style>

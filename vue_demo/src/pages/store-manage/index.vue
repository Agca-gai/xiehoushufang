<template>
    <div>
    <i-search ref="iSearch" :model="formData">
      <el-form-item prop="StoreId">
        <el-input v-model="formData.StoreId" placeholder="请输入门店ID"></el-input>
      </el-form-item>
      <el-form-item prop="StoreName">
        <el-input v-model="formData.StoreName" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item  prop="StoreProvince">
        <el-select v-model="formData.StoreProvince" placeholder="请选择省份" @click.native="getProvice" @change="changeProvince">
          <el-option v-for="item in ProvinceList1" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="StoreCity">
        <el-select v-model="formData.StoreCity" placeholder="请选择城市" @click.native="getCity" @change="changeCity">
          <el-option v-for="item in CityList2" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="StoreQu">
        <el-select v-model="formData.StoreQu" placeholder="请选择区域" @click.native="getQu" >
          <el-option v-for="item in QuList3" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
    </i-search>
    <i-table :toolBar="toolBar" :itemList="columnlist" :pageInfo="pageInfo" :tableData="tableData"
    @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
    :selectionShow="true" @selection-change="handleSelectionChange">
      <el-table-column v-for="(item, index) in columnlist" :label="item.label" :prop="item.prop" :key="index" align="center" :formatter="columnFormatter"></el-table-column>
    </i-table>
        <!-- 新增按钮 -->
    <i-dialog :title="dialogTitle" v-model="dialogVisible" @dialog-confirm="dialogConfirm" @dialog-cancel="dialogCancel" @dialog-before-close="dialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="dialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                <el-form-item label="门店ID" class="form-item" prop="StoreId">
                    <el-input v-model="dialogFromData.StoreId"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="门店名称" class="form-item" prop="StoreName">
                    <el-input v-model="dialogFromData.StoreName"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="门店电话" class="form-item" prop="StorePhone">
                    <el-input v-model="dialogFromData.StorePhone"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="门店省份" class="form-item" prop="StoreProvince">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="dialogFromData.StoreProvince" placeholder="请选择" @click.native="getProvice" @change="changeProvince">
                      <el-option v-for="item in ProvinceList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="门店城市" class="form-item" prop="StoreCity">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="dialogFromData.StoreCity" placeholder="请选择" @click.native="getCity"  @change="changeCity">
                      <el-option v-for="item in CityList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="门店区域" class="form-item" prop="StoreQu">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="dialogFromData.StoreQu" placeholder="请选择" @click.native="getQu" >
                      <el-option v-for="item in QuList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="详细地址" class="form-item" prop="StoreAdress">
                    <el-input v-model="dialogFromData.StoreAdress"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="店长名称" class="form-item" prop="StoreManName">
                    <el-input v-model="dialogFromData.StoreManName"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="邀请码" class="form-item" prop="InvitationCode">
                    <el-input v-model="dialogFromData.InvitationCode"></el-input>
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
                <el-form-item label="门店ID" class="form-item" prop="StoreId">
                    <el-input v-model="xiugaidialogFromData.StoreId" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="门店名称" class="form-item" prop="StoreName">
                    <el-input v-model="xiugaidialogFromData.StoreName"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="门店电话" class="form-item" prop="StorePhone">
                    <el-input v-model="xiugaidialogFromData.StorePhone"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="门店省份" class="form-item" prop="StoreProvince">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.StoreProvince" placeholder="请选择" @click.native="getProvice" @change="changeProvince">
                      <el-option v-for="item in ProvinceList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="门店城市" class="form-item" prop="StoreCity">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.StoreCity" placeholder="请选择" @click.native="getCity" @change="changeCity">
                      <el-option v-for="item in CityList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="门店区域" class="form-item" prop="StoreQu">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.StoreQu" placeholder="请选择" @click.native="getQu" >
                      <el-option v-for="item in QuList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="详细地址" class="form-item" prop="StoreAdress">
                    <el-input v-model="xiugaidialogFromData.StoreAdress"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="店长名称" class="form-item" prop="StoreManName">
                    <el-input v-model="xiugaidialogFromData.StoreManName"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="邀请码" class="form-item" prop="InvitationCode">
                    <el-input v-model="xiugaidialogFromData.InvitationCode"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
    </i-dialog>
    </div>
</template>

<script>
import ITable from '../../components/i-table'
import ISearch from '../../components/i-search'
import IDialog from '../../components/i-dialog.vue'
import qer from '../../api/shop-info-manage'
import qer2 from '../../api/user-data'
export default {
  components: {ITable, IDialog, ISearch},
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
                array.push(this.selectDataarray[i].StoreId)
              }
              // console.log(array)
              // 删除用户发送请求
              qer('deleteStoreData', {
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
            this.formData.StoreId = ''
            this.formData.StoreName = ''
            this.formData.StoreProvince = ''
            this.formData.StoreCity = ''
            this.formData.StoreQu = ''
          }}
      ],
      formData: {
        StoreId: '',
        StoreName: '',
        StoreProvince: '',
        StoreCity: '',
        StoreQu: ''
      },
      dialogFromData: {
        StoreId: '',
        StoreName: '',
        StorePhone: '',
        StoreProvince: '',
        StoreCity: '',
        StoreQu: '',
        StoreAdress: '',
        StoreManName: '',
        InvitationCode: ''
      },
      xiugaidialogFromData: {
        StoreId: '',
        StoreName: '',
        StorePhone: '',
        StoreProvince: '',
        StoreCity: '',
        StoreQu: '',
        StoreAdress: '',
        StoreManName: '',
        InvitationCode: ''
      },
      ProvinceList: [],
      CityList: [],
      QuList: [],
      ProvinceList1: [],
      CityList2: [],
      QuList3: [],
      provincecode: '',
      citycode: '',
      formRules: {
        StoreId: [
          {required: true, message: '请输入门店ID', trigger: 'blur'},
          {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
        ],
        StoreName: [
          {required: true, message: '请输入门店名称', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        StoreProvince: [
          {required: true, message: '请输入门店省份', trigger: 'change'}
        ],
        StoreCity: [
          {required: true, message: '请输入门店城市', trigger: 'change'}
        ],
        StoreQu: [
          {required: true, message: '请输入门店区域', trigger: 'change'}
        ],
        StorePhone: [
          {required: true, message: '请输入门店电话', trigger: 'blur'},
          {pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的11位手机号', trigger: 'blur'}
        ],
        StoreAdress: [
          {required: true, message: '请输入详细地址', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        StoreManName: [
          {required: true, message: '请输入店长名称', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        InvitationCode: [
          {required: true, message: '请输入邀请码', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ]
      },
      dialogTitle: '新增用户',
      dialogVisible: false,
      xiugaidialogTitle: '修改用户',
      xiugaidialogVisible: false,
      frominput: '',
      fromselect: '',
      selectDataarray: '',
      columnlist: [
        {label: '门店ID', prop: 'StoreId'},
        {label: '门店名称', prop: 'StoreName'},
        {label: '门店电话', prop: 'StorePhone'},
        {label: '门店省份', prop: 'StoreProvinceName'},
        {label: '门店城市', prop: 'StoreCityName'},
        {label: '门店区域', prop: 'StoreQuName'},
        {label: '详细地址', prop: 'StoreAdress'},
        {label: '店长名称', prop: 'StoreManName'},
        {label: '邀请码', prop: 'InvitationCode'}
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
  mounted () {
    this.gettableData()
  },
  created () {
    this.getProCityQu()
  },
  methods: {
    gettableData () {
      qer('findStoreData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize
      }).then(data => {
        console.log(data)
        this.pageInfo.total = data.pageTotal
        this.tableData = data.data
      })
    },
    reachBtn () {
      // console.log(this.formData)
      qer('reachStoreData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize,
        StoreId: this.formData.StoreId,
        StoreName: this.formData.StoreName,
        StoreProvince: this.formData.StoreProvince,
        StoreCity: this.formData.StoreCity,
        StoreQu: this.formData.StoreQu
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
    // 获取省份的接口
    getProvice () {
      qer('findProvinceData', {
      }).then(data => {
        // console.log(data)
        this.ProvinceList = data.data
        // console.log(this.ProvinceList)
      })
    },
    changeProvince (value) {
      this.provincecode = value
    },
    // 获取城市的接口
    getCity () {
      qer('findCityData', {
        provicecode: this.provincecode
      }).then(data => {
        // console.log(data)
        this.CityList = data.data
      })
    },
    changeCity (value) {
      this.citycode = value
    },
    // 获取区域的接口
    getQu () {
      qer('findQuData', {
        citycode: this.citycode
      }).then(data => {
        // console.log(data)
        this.QuList = data.data
      })
    },
    // 获取省份城市区域的接口
    getProCityQu () {
      qer('findProCityQuData', {
      }).then(data => {
        // console.log(data)
        this.ProvinceList1 = data.province
        this.CityList2 = data.city
        this.QuList3 = data.area
        // console.log(this.ProvinceList)
      })
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
          qer('addStoreData', {
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
                Content: '新增门店' + this.dialogFromData.StoreId,
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
          qer('updateStoreData', {
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
                Content: '修改门店' + this.xiugaidialogFromData.StoreId,
                State: 1
              }).then(data => {
                // console.log(data)
              })
              // this.fetchsearch()
              this.$refs.form.resetFields()
              this.xiugaidialogVisible = false
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
    // 数字转化为文字
    columnFormatter (row, column, cellValue, index) {
      // console.log(row)
      let distName = this.columnlist.filter(item => {
        return item.prop === column.property
      })[0].distName
      // console.log('distName', distName)
      if (distName) {
        // console.log('item', this[distName].length)
        for (var i = 0; i < this[distName].length; i++) {
          if (this[distName][i].code === row[column.property]) {
            return this[distName][i].name
          }
          // return this[distName].filter(item => {
          //   return item.code === row[column.property]
          // })[i].name
        }
      } else {
        return row[column.property]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

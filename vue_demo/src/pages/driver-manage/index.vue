<template>
    <div>
      <i-search ref="iSearch" :model="formData">
      <el-form-item prop="Mid">
        <el-input v-model="formData.Mid" placeholder="请输入用户ID"></el-input>
      </el-form-item>
      <el-form-item  prop="ManName">
        <el-input v-model="formData.ManName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item  prop="DriverProvince">
        <el-select v-model="formData.DriverProvince" placeholder="请选择省份" @click.native="getProvice" @change="changeProvince">
          <el-option v-for="item in ProvinceList1" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="DriverCity">
        <el-select v-model="formData.DriverCity" placeholder="请选择城市" @click.native="getCity" @change="changeCity">
          <el-option v-for="item in CityList2" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="DriverQu">
        <el-select v-model="formData.DriverQu" placeholder="请选择区域" @click.native="getQu" >
          <el-option v-for="item in QuList3" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      </i-search>

    <i-table :toolBar="toolBar" :itemList="columnlist" :pageInfo="pageInfo" :tableData="tableData"
    @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
    :selectionShow="true" @selection-change="handleSelectionChange">
      <el-table-column v-for="(item, index) in columnlist" :label="item.label" :prop="item.prop" :key="index" align="center" :formatter="columnFormatter"></el-table-column>
    </i-table>
        <!-- 修改按钮 -->
    <i-dialog :title="xiugaidialogTitle" v-model="xiugaidialogVisible" @dialog-confirm="xiugaidialogConfirm" @dialog-cancel="xiugaidialogCancel" @dialog-before-close="xiugaidialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="xiugaidialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                <el-form-item label="司机编号" class="form-item" prop="DriverId">
                    <el-input v-model="xiugaidialogFromData.DriverId" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="司机名称" class="form-item" prop="ManName">
                    <el-input v-model="xiugaidialogFromData.ManName"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="司机电话" class="form-item" prop="ManPhone">
                    <el-input v-model="xiugaidialogFromData.ManPhone"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="所在省份" class="form-item" prop="DriverProvince">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.DriverProvince" placeholder="请选择" @click.native="getProvice" @change="changeProvince">
                      <el-option v-for="item in ProvinceList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="所在城市" class="form-item" prop="DriverCity">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.DriverCity" placeholder="请选择" @click.native="getCity" @change="changeCity">
                      <el-option v-for="item in CityList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="所在区域" class="form-item" prop="DriverQu">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.DriverQu" placeholder="请选择" @click.native="getQu" >
                      <el-option v-for="item in QuList" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="司机ID" class="form-item" prop="Mid">
                    <el-input v-model="xiugaidialogFromData.Mid" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="邀请码" class="form-item" prop="InvitationCode">
                    <!-- <el-input v-model="xiugaidialogFromData.InvitationCode"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.InvitationCode" placeholder="请选择" @click.native="getInvitation">
                      <el-option v-for="item in InvitationList" :key="item.InvitationCode" :label="item.StoreName" :value="item.InvitationCode"></el-option>
                    </el-select>
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
import qer from '../../api/driver-info-manage'
import qer2 from '../../api/user-data'
export default {
  components: {ITable, IDialog, ISearch},
  data () {
    return {
      toolBar: [
        // {btnname: '详情',
        //   type: 'info',
        //   icon: 'el-icon-view',
        //   func: () => {
        //   }},
        // {btnname: '新增',
        //   type: 'primary',
        //   icon: 'el-icon-plus',
        //   func: () => {
        //   }},
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
                array.push(this.selectDataarray[i].DriverId)
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
                    Content: '删除司机' + array,
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
            this.formData.DriverProvince = ''
            this.formData.DriverCity = ''
            this.formData.DriverQu = ''
          }}
      ],
      frominput: '',
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      formData: {
        Mid: '',
        ManName: '',
        DriverProvince: '',
        DriverCity: '',
        DriverQu: ''
      },
      xiugaidialogFromData: {
        DriverId: '',
        ManName: '',
        ManPhone: '',
        DriverProvince: '',
        DriverCity: '',
        DriverQu: '',
        Mid: '',
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
      InvitationList: [],
      xiugaidialogTitle: '修改司机',
      xiugaidialogVisible: false,
      formRules: {
        DriverId: [
          {required: true, message: '请输入门店ID', trigger: 'blur'},
          {min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur'}
        ],
        ManName: [
          {required: true, message: '请输入门店名称', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        DriverProvince: [
          {required: true, message: '请输入门店省份', trigger: 'change'}
        ],
        DriverCity: [
          {required: true, message: '请输入门店城市', trigger: 'change'}
        ],
        DriverQu: [
          {required: true, message: '请输入门店区域', trigger: 'change'}
        ],
        ManPhone: [
          {required: true, message: '请输入门店电话', trigger: 'blur'},
          {pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的11位手机号', trigger: 'blur'}
        ],
        Mid: [
          {required: true, message: '请输入详细地址', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        InvitationCode: [
          {required: true, message: '请输入邀请码', trigger: 'blur'}
        ]
      },
      fromselect: '',
      selectDataarray: '',
      isreach: false,
      columnlist: [
        {label: '司机编号', prop: 'DriverId'},
        {label: '司机名称', prop: 'ManName'},
        {label: '司机手机号', prop: 'ManPhone'},
        {label: '司机ID', prop: 'Mid'},
        {label: '所在省份', prop: 'DriverProvinceName'},
        {label: '所在城市', prop: 'DriverCityName'},
        {label: '所在区域', prop: 'DriverQuName'},
        {label: '绑定门店', prop: 'InvitationCode'}
      ],
      tableData: []
    }
  },
  created () {
    this.getProCityQu()
  },
  methods: {
    getTableData () {
      qer('findDriverData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize
      }).then(data => {
        // console.log(data)
        this.tableData = data.data
        this.pageInfo.total = data.pageTotal
      })
    },
    reachBtn () {
      console.log(this.formData)
      qer('reachDriverData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize,
        Mid: this.formData.Mid,
        ManName: this.formData.ManName,
        DriverProvince: this.formData.DriverProvince,
        DriverCity: this.formData.DriverCity,
        DriverQu: this.formData.DriverQu
      }).then(data => {
        // console.log(data)
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
    // 获取店长邀请码
    getInvitation () {
      qer('findInvitation', {
      }).then(data => {
        console.log(data)
        this.InvitationList = data.Invitation
        // console.log(this.ProvinceList)
      })
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
    // 多选框点击显示点击的数据
    handleSelectionChange (rows) {
      console.log('rows', rows)
      this.selectDataarray = rows
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
          qer('updateDriverData', {
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
                Content: '修改司机' + this.xiugaidialogFromData.DriverId,
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
    // 数字转化为文字
    columnFormatter (row, column) {
      // console.log(row)
      let distName = this.columnlist.filter(item => {
        return item.prop === column.property
      })[0].distName
      if (distName) {
        var size = this[distName].length
        var procode = row[column.property]
        for (var i = 0; i < size; i++) {
          if (this[distName][i].code === procode) {
            return this[distName][i].name
          }
        }
      } else {
        return row[column.property]
      }
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
    <div>
    <i-table :toolBar="toolBar" :itemList="columnlist" :pageInfo="pageInfo" :tableData="tableData"
    @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
    :selectionShow="false" @selection-change="handleSelectionChange" :reachBtn="reachBtn" @change1="changeFun" @getoption="getoption">
      <el-table-column v-for="(item, index) in columnlist" :label="item.label" :prop="item.prop" :key="index" align="center" :formatter="columnFormatter">
        <template slot-scope="scope">
        <img v-if="item.prop === 'userImage'" type= "text" @click="watchImg(scope.row)" :src="scope.row.userImage" alt="" style="cursor: pointer; width: 50px">
        <span v-else>{{filterDist(scope.row[item.prop], item)}}</span>
      </template>
      </el-table-column>
    </i-table>
    </div>
</template>

<script>
import qer from '../../api/client-manage'
import ITable from '../../components/i-table'
export default {
  components: {ITable},
  data () {
    return {
      toolBar: [
      ],
      frominput: '',
      fromselect: '',
      SexList: [
        {label: '无', value: 0},
        {label: '男', value: 1},
        {label: '女', value: 2}
      ],
      columnlist: [
        {label: '用户ID', prop: 'AppId'},
        {label: '用户名', prop: 'UserName'},
        {label: '性别', prop: 'Sex', distName: 'SexList'},
        {label: '手机号', prop: 'Phone'},
        {label: '年龄', prop: 'Age'},
        {label: '头像', prop: 'userImage'}
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
  methods: {
    gettableData () {
      qer('listCustomerData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize
      }).then(data => {
        console.log(data)
        this.pageInfo.total = data.pageTotal
        this.tableData = data.data
      })
    },
    // 点击搜索按钮
    reachBtn () {
      console.log(this.frominput, this.fromselect)
      qer('findUserData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize,
        fromselect: this.fromselect,
        frominput: this.frominput
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
          this.$message({
            type: 'error',
            message: data.mes
          })
        }
      })
    },
    // 搜索输入框的值
    changeFun (value) {
      // console.log(value)
      this.frominput = value
    },
    // 搜索区域的值
    getoption (value) {
      // console.log(value)
      this.fromselect = value
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
    },
    // 预览图
    watchImg (data) {
      console.log(data)
      window.open(data.userImage)
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
    columnFormatter (row, column) {
      let distName = this.columnlist.filter(item => {
        return item.prop === column.property
      })[0].distName
      if (distName) {
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

</style>

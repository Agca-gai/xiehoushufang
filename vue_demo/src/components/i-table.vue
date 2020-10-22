<template>
    <div>
      <div class="user-header">
        <div>
          <el-row>
            <el-col :span="24">
              <el-button v-for="(item, index) in toolBar" :icon="item.icon" @click="item.func" :type="item.type" :key="index">{{item.btnname}}</el-button>
            </el-col>
            <!-- <el-col :span="8">
              <div class="input-grounp">
                <div>
                  <el-input placeholder="请输入内容" v-model="inputData" class="input-with-select" clearable>
                    <el-select v-model="itemList.label" slot="prepend" placeholder="查询区域" @change="getoption">
                      <el-option :label="item.label" :value="item.prop" v-for="(item, index) in itemList" :key="index"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="reachBtn()"></el-button>
                  </el-input>
                </div>
              </div>
            </el-col> -->
          </el-row>
        </div>
      </div>
      <el-card class="box-card">
        <div class="i-table">
          <!-- 表格 -->
          <div>
              <el-table @selection-change="handleSelectionChange" border :data="tableData">
                <el-table-column
                v-if="selectionShow"
                  type="selection"
                  width="55"
                  align="center"
                  >
                </el-table-column>
                <slot></slot>
              </el-table>
          </div>
          <!-- // 表格分页 -->
          <div class="pageInfo" v-show="tableData.length">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.pageIndex"
              :page-sizes="[5, 8, 10, 20]"
              :page-size="pageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'i-table',
  props: {
    toolBar: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    fromData: {
      type: String
    },
    itemList: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageInfo: {
      type: Object,
      default: () => {
        return {
          pageIndex: 1,
          pageSize: 5,
          total: 0
        }
      }
    },
    selectionShow: {
      type: Boolean,
      default: false
    },
    reachBtn: {
      type: Function
    }
  },
  data () {
    return {
      inputData: this.formData
    }
  },
  watch: {
    inputData (newValue) {
      this.inputData = newValue
      this.$emit('change1', this.inputData)
    }
  },
  methods: {
    // 每页条数
    handleSizeChange (value) {
      this.$emit('handleSizeChange', value)
      this.pageInfo.pageSize = value
    },
    getoption (value) {
      this.$emit('getoption', value)
    },
    // 当前页数
    handleCurrentChange (value) {
      this.$emit('handleCurrentChange', value)
      this.pageInfo.currentPage = value
    },
    // 多选框
    handleSelectionChange (rows) {
      this.$emit('selection-change', rows)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .user-header {
  margin-bottom: 10px;
  .input-grounp {
    display: flex;
    align-items: center;
    .el-input-group__prepend {
      .el-select {
        .el-input {
          width: 100px;
          .el-input__inner {
          width: 100px;
          padding: 0 10px;
          background-color: #fff;
          border-top: 1px solid #dfe1e8;
          border-bottom: 1px solid #dfe1e8;
          }
        }
      }
    }
    .el-input {
      width: 200px;
      .el-input__inner {
        width: 200px;
        border-radius: 0px;
      }
    }
  }
}
.i-table {
  padding: 10px 0;
}
.el-pagination {
  text-align: right;
}
.el-table--border  {
  margin: 10px 0;
}
</style>

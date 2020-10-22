<template>
    <div class="container">
        <el-card class="box-card">
            <div class="user-data-left">
                <div class="logo-change-nav">
                    <img :src="form.ManImage" alt="">
                    <i-file v-model="form.ManImage"></i-file>
                </div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.Mid" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="form.ManName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="form.ManSex" :label='0' border>男</el-radio>
                        <el-radio v-model="form.ManSex" :label='1' border>女</el-radio>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-input v-model="form.userRole" :disabled="true" @input="changeinput(event)"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.ManPhone"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 10px;">
                        <el-button type="primary" @click="onSubmit()">保存</el-button>
                        <el-button @click="getuser()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="box-card2">
            <div slot="header" class="clearfix">
                <span>操作日志</span>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="CreateTime"
                    label="日期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="Content"
                    label="日志"
                    width="180">
                    </el-table-column>
                        <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span :class="(scope.row.State===1) ? 'state-span' : 'state2-span'" v-if="scope.row.State===1">正常</span>
                            <span :class="(scope.row.State===1) ? 'state-span' : 'state2-span'" v-else>异常</span>
                        </template>
                        </el-table-column>
                        <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleEdit(scope.$index, scope.row)"></el-button>
                        </template>
                        </el-table-column>
                </el-table>
                <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="pageTotal" :page-size="9">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import qer from '../../api/user-data'
import qer2 from '../../api/home'
import IFile from '../../components/i-file.vue'
export default {
  components: {IFile},
  data () {
    return {
      form: {
        ManImage: '',
        Mid: '',
        ManName: '',
        ManSex: '',
        ManPhone: '',
        userRole: ''
      },
      tableData: [{
        CreateTime: '',
        Content: '',
        State: 1
      }],
      currentPage: 1,
      pageTotal: 0
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除接口
        qer('DeleteOperaLog', {
          LogId: row.LogId
        }).then(data => {
          console.log(data)
          if (data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getuser()
          } else {
            this.$message({
              type: 'success',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(index, row)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getuser()
    },
    onSubmit () {
    // 修改个人信息接口
      qer('UpdateUser', {
        formdata: this.form
      }).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: data.mes
          })
          // 操作日志接口
          qer('UpdateOperaLog', {
            Content: '修改保存个人信息',
            State: 1
          }).then(data => {
            // console.log(data)
            this.getuser()
          })
        } else {
          this.$message({
            type: 'error',
            message: data.mes
          })
        }
      })
    },
    getuser () {
      qer2('getLoginData', {
        Mid: JSON.parse(sessionStorage.getItem('userInfo'))[0].Mid
      }).then(data => {
        console.log('data', data)
        this.form.ManImage = data[0].ManImage
        this.form.Mid = data[0].Mid
        this.form.ManName = data[0].ManName
        this.form.ManSex = data[0].ManSex
        this.form.ManPhone = data[0].ManPhone
        this.form.userRole = data[0].userRole
      })
      qer('GetOperaLog', {
        currentPage: this.currentPage
      }).then(data => {
        console.log(data)
        this.tableData = data.data
        this.pageTotal = data.pageTotal
      })
    },
    changeinput (val) {
      console.log(val)
    }
  },
  mounted () {
    this.getuser()
  }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    height: 100%;
    .box-card {
        height: 100%;
        background-color: #fff;
        width: 50%;
        margin-right: 5px;
        .logo-change-nav {
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            // border-bottom: 1px solid #ddd;
            img {
                width: 100px;
                height: 100px;
                margin-right: 20px;
            }
            p {
                font-size: 18px;
                color: #333;
            }
            span {
                font-size: 12px;
                color: #999;
            }
            /deep/ .upload-demo {
                display: flex;
                .el-upload {
                    .el-button--primary {
                            color: #FFF;
                        background-color: #33cabb;
                        border-color: #33cabb;
                    }
                }
            }
        }
        /deep/ .el-form {
            .el-form-item {
                display: flex;
                flex-direction: column;
                margin-bottom: 0px;
                .el-form-item__label {
                    text-align: left;
                    font-weight: 700;
                }
                .el-form-item__content {
                    margin-left: 0px !important;
                    .el-button--primary {
                        color: #FFF;
                        background-color: #33cabb;
                        border-color: #33cabb;
                    }
                }
            }
        }
    }
    /deep/ .box-card2 {
        width: 50%;
        height: 100%;
        margin-left: 5px;
        position: relative;
        .el-pagination {
            position: absolute;
            bottom: 15px;
            left: 50%;
            margin-left: -200px;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: #33cabb;
        }
        .el-table {
            .el-table__body-wrapper {
                .el-table__body {
                    .el-table__row {
                        .state-span {
                            background-color: #15c377;
                            display: inline;
                            padding: .2em .6em .3em;
                            font-size: 75%;
                            line-height: 1;
                            color: #fff;
                            text-align: center;
                            white-space: nowrap;
                            vertical-align: baseline;
                            border-radius: .25em;
                        }
                        .state2-span {
                            background-color: #f96868;
                            display: inline;
                            padding: .2em .6em .3em;
                            font-size: 75%;
                            line-height: 1;
                            color: #fff;
                            text-align: center;
                            white-space: nowrap;
                            vertical-align: baseline;
                            border-radius: .25em;
                        }
                    }
                }
            }
        }
    }
}
</style>

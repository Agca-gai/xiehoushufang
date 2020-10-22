<template>
    <div style="height: 100%">
        <el-card class="box-card">
            <el-container>
                <el-header>
                    <div class="user-header">
                        <div>
                        <el-row>
                            <el-col :span="12">
                            <el-button v-for="(item, index) in toolBar" :icon="item.icon" @click="item.func" :type="item.type" :key="index">{{item.btnname}}</el-button>
                            </el-col>
                            <el-col :span="12">
                                <span>分类详情</span>
                            </el-col>
                        </el-row>
                        </div>
                    </div>
                </el-header>
                <el-container>
                    <el-aside width="50%">
                        <img src="../../assets/images/166282680.jpg" alt="">
                        <div class="content-nav">
                            <div class="content-title">
                                <span>商品分类</span>
                                <img src="../../assets/images/xiaochengxu.png" alt="">
                            </div>
                            <div class="content-center">
                                <ul class="book-classify">
                                <li class="classify-li" :class="{active: item.OneLevelCode === oneLevelListclass.OneLevelCode}" v-for="(item, index) in oneLevelList" :key="index" @click="gotoLevel(item)">
                                    <b></b>
                                    <span>{{item.OneLevelName}}</span>
                                </li>
                                </ul>
                                <ul class="book-classify-conteiner">
                                    <li class="book-classify-item" v-for="(item, index) in commList" :key="index">
                                        <span class="book-classify-item-title" :class="{active: item.TwoLevelCode === twoLevelListclass.TwoLevelCode}" @click="getTwoLevel(item)">{{item.TwoLevelName}}</span>
                                        <ul class="book-list">
                                            <div class="nulldata"><span>暂时没有数据</span></div>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-aside>
                    <el-main>
                        <el-card class="box-card">
                            <el-row :gutter="20" v-for="(item, index) in classifyList" :key="index">
                                <el-col :span="6">
                                    <span>{{item.classifyName}}</span>
                                </el-col>
                                <el-col :span="18">
                                    <div>
                                        <el-input v-model="item.value"></el-input>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-main>
                </el-container>
            </el-container>
        </el-card>
                <!-- 新增按钮 -->
    <i-dialog :title="dialogTitle" v-model="dialogVisible" @dialog-confirm="dialogConfirm" @dialog-cancel="dialogCancel" @dialog-before-close="dialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="dialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类编号" class="form-item" prop="LevelCode">
                        <el-input v-model="dialogFromData.LevelCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="分类名称" class="form-item" prop="LevelName">
                        <el-input v-model="dialogFromData.LevelName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="几级分类" class="form-item" prop="WhatClassify">
                            <el-select v-model="dialogFromData.WhatClassify" placeholder="请选择">
                            <el-option v-for="item in LevelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="dialogFromData.WhatClassify === 2">
                    <el-col :span="24">
                        <el-form-item label="父级名称" class="form-item" prop="FaterLevelCode">
                            <el-select v-model="dialogFromData.FaterLevelCode" placeholder="请选择">
                            <el-option v-for="item in oneLevelList" :key="item.OneLevelCode" :label="item.OneLevelName" :value="item.OneLevelCode"></el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注" class="form-item" prop="remarks">
                        <el-input v-model="dialogFromData.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
    </i-dialog>
                <!-- 修改按钮 -->
    <i-dialog :title="xiugaidialogTitle" v-model="xiugaidialogVisible" @dialog-confirm="xiugaidialogConfirm" @dialog-cancel="xiugaidialogCancel" @dialog-before-close="xiugaidialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="xiugaidialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="分类编号" class="form-item" prop="LevelCode">
                        <el-input v-model="xiugaidialogFromData.LevelCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="分类名称" class="form-item" prop="LevelName">
                        <el-input v-model="xiugaidialogFromData.LevelName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="几级分类" class="form-item" prop="WhatClassify">
                            <el-select v-model="xiugaidialogFromData.WhatClassify" placeholder="请选择">
                            <el-option v-for="item in LevelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="xiugaidialogFromData.WhatClassify === 2">
                    <el-col :span="24">
                        <el-form-item label="父级名称" class="form-item" prop="FaterLevelCode">
                            <el-select v-model="xiugaidialogFromData.FaterLevelCode" placeholder="请选择">
                            <el-option v-for="item in oneLevelList" :key="item.OneLevelCode" :label="item.OneLevelName" :value="item.OneLevelCode"></el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注" class="form-item" prop="remarks">
                        <el-input v-model="xiugaidialogFromData.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
    </i-dialog>
    </div>
</template>

<script>
import qer from '../../api/comm-classify-manage'
import qer2 from '../../api/user-data'
import IDialog from '../../components/i-dialog.vue'

export default {
  components: {IDialog},
  data () {
    return {
      dialogFromData: {
        LevelCode: '',
        LevelName: '',
        WhatClassify: '',
        FaterLevelCode: '',
        remarks: ''
      },
      xiugaidialogFromData: {
        LevelCode: '',
        LevelName: '',
        WhatClassify: '',
        FaterLevelCode: '',
        remarks: ''
      },
      formRules: {
        LevelCode: [
          {required: true, message: '请输入分类编号', trigger: 'blur'},
          {min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur'}
        ],
        LevelName: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
        ],
        WhatClassify: [
          {required: true, message: '请选择几级分类', trigger: 'change'}
        ],
        FaterLevelCode: [
          {required: true, message: '请选择父级分类', trigger: 'change'}
        ],
        remarks: [
          {required: true, message: '请输入备注', trigger: 'change'}
        ]
      },
      dialogVisible: false,
      dialogTitle: '新增分类',
      xiugaidialogVisible: false,
      xiugaidialogTitle: '修改分类',
      selectData: [],
      LevelList: [
        {label: '一级', value: 1},
        {label: '二级', value: 2}
      ],
      oneLevelList: [],
      oneLevelListclass: {OneLevelCode: ''},
      commList: [],
      twoLevelListclass: {},
      classifyList: [
        {classifyName: '分类编码', value: ''},
        {classifyName: '分类名称', value: ''},
        {classifyName: '几级分类', value: ''},
        {classifyName: '备注', value: ''}
      ],
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
            this.xiugaidialogVisible = true
            if (this.selectData.WhatClassify === 1) {
              this.xiugaidialogFromData.LevelCode = this.selectData.OneLevelCode
              this.xiugaidialogFromData.LevelName = this.selectData.OneLevelName
              this.xiugaidialogFromData.WhatClassify = this.selectData.WhatClassify
              this.xiugaidialogFromData.remarks = this.selectData.Oneremarks
            } else {
              this.xiugaidialogFromData.LevelCode = this.selectData.TwoLevelCode
              this.xiugaidialogFromData.LevelName = this.selectData.TwoLevelName
              this.xiugaidialogFromData.WhatClassify = this.selectData.WhatClassify
              this.xiugaidialogFromData.FaterLevelCode = this.selectData.OneLevelCode
              this.xiugaidialogFromData.remarks = this.selectData.Tworemarks
            }
          }},
        {btnname: '删除',
          type: 'danger',
          icon: 'el-icon-delete',
          func: () => {
            qer('deleteCateData', {
              WhatClassify: this.selectData.WhatClassify,
              OneLevelCode: this.selectData.OneLevelCode,
              TwoLevelCode: this.selectData.TwoLevelCode
            }).then(data => {
              console.log(data)
              if (data.code === 0) {
                this.$message({
                  type: 'success',
                  message: data.mes
                })
                this.getoneLevelData()
                this.gettwoLevelData()
                // 操作日志接口
                qer2('UpdateOperaLog', {
                  Content: '删除分类',
                  State: 1
                }).then(data => {
                  // console.log(data)
                })
              } else {
                this.$message({
                  type: 'error',
                  message: data.mes
                })
              }
            })
          }},
        {btnname: '刷新',
          type: 'warning',
          icon: 'el-icon-loading',
          func: () => {
            this.getoneLevelData()
            this.gettwoLevelData()
          }}
      ]
    }
  },
  mounted () {
    this.getoneLevelData()
    var that = this
    setTimeout(function () {
      that.gettwoLevelData()
    }, 500)
  },
  methods: {
    // 一级分类
    getoneLevelData () {
      qer('oneLevelData', {
      }).then(data => {
        // console.log(data)
        this.oneLevelList = data.data
        this.oneLevelListclass.OneLevelCode = data.data[0].OneLevelCode
      })
    },
    // 二级分类
    gettwoLevelData () {
      qer('twoLevelData', {
        OneLevelCode: this.oneLevelListclass.OneLevelCode
      }).then(data => {
        // console.log(data)
        this.commList = data.data
      })
    },
    gotoLevel (item) {
      console.log(item)
      this.selectData = item
      console.log(this.selectData)
      this.classifyList[0].value = item.OneLevelCode
      this.classifyList[1].value = item.OneLevelName
      this.classifyList[2].value = item.WhatClassify
      this.classifyList[3].value = item.Oneremarks
      this.oneLevelListclass.OneLevelCode = item.OneLevelCode
      this.gettwoLevelData()
    },
    getTwoLevel (item) {
      console.log(item)
      this.selectData = item
      this.classifyList[0].value = item.TwoLevelCode
      this.classifyList[1].value = item.TwoLevelName
      this.classifyList[2].value = item.WhatClassify
      this.classifyList[3].value = item.Tworemarks
      this.twoLevelListclass = item
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
          qer('addCommClassify', {
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
                Content: '新增分类' + this.dialogFromData.LevelCode,
                State: 1
              }).then(data => {
                // console.log(data)
              })
              // this.fetchsearch()
              this.dialogVisible = false
              this.$refs.form.resetFields()
              this.getoneLevelData()
              this.gettwoLevelData()
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
    // 点击取消按钮
    xiugaidialogCancel () {
      this.xiugaidialogVisible = false
      this.$refs.form.resetFields()
    },
    // 关掉dialog之前清空表单值
    xiugaidialogBeforeClose () {
      console.log(111)
      this.$refs.form.resetFields()
    },
    xiugaidialogConfirm () {
      console.log('确定按钮被点击了')
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('表单检验通过了')
          // 新增用户发送请求
          qer('updateCateData', {
            // access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token,
            ...this.xiugaidialogFromData
          }).then(data => {
            console.log(data)
            if (data.code === 0) {
              this.$message({
                type: 'success',
                message: data.mes
              })
              // 操作日志接口
              qer2('UpdateOperaLog', {
                Content: '修改分类' + this.xiugaidialogFromData.LevelCode,
                State: 1
              }).then(data => {
                // console.log(data)
              })
              // this.fetchsearch()
              this.xiugaidialogVisible = false
              this.$refs.form.resetFields()
              this.getoneLevelData()
              this.gettwoLevelData()
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
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-card {
    height: 100%;
    .el-card__body {
        height: 100%;
        box-sizing: border-box;
        .el-container {
            height: 100%;
            .el-header {
                border: 1px solid #ddd;
                background-color: #fff;
                line-height: 60px;
            }
            .el-container {
                .el-aside {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    text-align: center;
                    position: relative;
                    img {
                        width: 60%;
                    }
                    .content-nav {
                        position: absolute;
                        top: 8.5%;
                        left: 30.8%;
                        width: 38.5%;
                        height: 80%;
                        // border: 1px solid #ddd;
                        .content-title {
                            padding: 2px 5px;
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            height: 6.5%;
                            span {
                                color: #fff;
                                font-size: 14px;
                            }
                            img {
                                width: 25px;
                                height: 25px;
                            }
                        }
                        .content-center {
                            height: 93.5%;
                            background-color: rgb(247, 247, 247);
                            position: relative;
                              .book-classify {
                                position: absolute;
                                top: 0;
                                left: 0;
                                bottom: 0;
                                width: 35%;
                                background: #fff;
                                li {
                                position: relative;
                                width: 100%;
                                // height: 50px;
                                // text-align: center;
                                line-height: 50px;
                                font-size: 14px;
                                color: #5a5a5a;
                                font-weight: 600;
                                cursor: pointer;
                                >span {
                                    display: inline-block;
                                    width: 100%;
                                    height: 100%;
                                    box-sizing: border-box;
                                    padding-left: 15px;
                                }
                                }
                                li.active {
                                color: rgb(197, 156, 104);
                                font-weight: 600;
                                background: rgb(246, 246, 246);
                                b {
                                    position: absolute;
                                    left: 0;
                                    top: 50%;
                                    width: 3px;
                                    height: 20px;
                                    background: rgb(197, 156, 104);
                                    margin-top: -10px;
                                }
                                }
                            }
                              .book-classify-conteiner {
                                position: absolute;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                overflow: auto;
                                width: 65%;
                                .book-classify-item {
                                width: 90%;
                                margin: 0 auto;
                                .book-classify-item-title {
                                    width: 100%;
                                    height: 50px;
                                    box-sizing: border-box;
                                    line-height: 50px;
                                    font-size: 14px;
                                    color: #5a5a5a;
                                    font-weight: 600;
                                    cursor: pointer;
                                }
                                span.active {
                                    color: #CDA36F;
                                }
                                .book-list {
                                    width: 100%;
                                    background: #fff;
                                    display: flex;
                                    flex-wrap: wrap;
                                    padding: 10px 0;
                                    box-sizing: border-box;
                                    border-radius: 10px;
                                    .nulldata {
                                    height: 50px;
                                    width: 100%;
                                    margin: 5px 0;
                                    line-height: 50px;
                                    text-align: center;
                                    span {
                                    font-size: 16px;
                                    color: #ddd;
                                    font-weight: 600;
                                    }
                                    }
                                    .book-list-item {
                                    width: 120px;
                                    margin: 0 auto;
                                    height: 180px;
                                    font-size: 14px;
                                    font-weight: 600;
                                    color: rgb(90, 90, 90);
                                    padding: 10px 0;
                                    box-sizing: border-box;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: space-evenly;
                                    img {
                                        width: 100px;
                                        height: 100px;
                                    }

                                    div:nth-child(2) {
                                        width: 100px;
                                        font-size: 14px;
                                        font-weight: 600;
                                        text-align: center;
                                        color: #999;
                                            display: block;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }

                                    div:nth-child(3) {
                                        color: red;
                                        font-size: 14px;
                                        font-weight: bold;

                                        span {
                                        color: #999;
                                        font-weight: normal;
                                        text-decoration: line-through;
                                        font-size: 12px;

                                        }
                                    }
                                    }
                                }
                                }
                            }
                        }
                    }
                }
                .el-main {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    .el-card {
                        box-sizing: border-box;
                        .el-row {
                            margin: 10px;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
        }
    }
}
</style>

<template>
    <div>
      <el-container>
        <el-header>
          <div class="data-header">
            <el-row :gutter="20">
              <el-col :span="6">
                <div style="margin-bottom: 24px;background-color: #33cabb; padding: 24px">
                  <div class="data-content">
                    <i class="data-icon"><img src="../../assets/images/jinqian.png" alt=""></i>
                    <div class="data-data">
                      <span>今日销售总额</span>
                      <p>12132132</p>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="margin-bottom: 24px;background-color: #f96868; padding: 24px">
                  <div class="data-content">
                    <i class="data-icon"><img src="../../assets/images/dingdan.png" alt=""></i>
                    <div class="data-data">
                      <span>今日销售单</span>
                      <p>12132132</p>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="margin-bottom: 24px;background-color: #15c377; padding: 24px">
                  <div class="data-content">
                    <i class="data-icon"><img src="../../assets/images/yonghu.png" alt=""></i>
                    <div class="data-data">
                      <span>微信用户总数</span>
                      <p>12132132</p>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="margin-bottom: 24px;background-color: #926dde; padding: 24px">
                  <div class="data-content">
                    <i class="data-icon"><img src="../../assets/images/xiaoshou.png" alt=""></i>
                    <div class="data-data">
                      <span>新增微信用户</span>
                      <p>12132132</p>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-main style="padding: 0px;">
          <dataecharts></dataecharts>
        </el-main>
        <el-footer>
          <div class="footer-data-nav">
            <div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>数据信息</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div class="footer-data-content">
                </div>
              </el-card>
            </div>
            <div>

            </div>
          </div>
        </el-footer>
    </el-container>
    </div>
</template>

<script>
import dataecharts from '../home-data/data-echarts'
export default {
  components: {dataecharts},
  data () {
    return {
      footerDataList: [
        {footerDataName: '标题', footerData: '内容'},
        {footerDataName: '标题', footerData: '内容'},
        {footerDataName: '标题', footerData: '内容'},
        {footerDataName: '标题', footerData: '内容'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-header {
      height: 124px !important;
      padding: 0;
  .data-header {
    .el-row {
      .el-col {
        .data-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .data-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.175);
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 25px;
              height: 25px;
            }
          }
          .data-data {
            span {
              font-size: 14px;
              color: #fff;
              margin-bottom: 5px;
            }
            p {
              font-size: 24px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
.el-footer {
  margin-top: 20px;
  padding: 0;
  .footer-data-nav {
    .footer-data-content {
    }
  }
}
</style>

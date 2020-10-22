<template>
    <div class="echarts">
        <!-- //ref 被用来给DOM元素或子组件注册引用信息,想要在Vue中直接操作DOM元素，就必须用ref属性进行注册 -->
        <el-card class="box-card" style="margin-right: 10px;">
          <div slot="header" class="clearfix">
            <span>往日销售量</span>
            <el-button style="float: right; padding: 3px 0" type="text">查看全部</el-button>
          </div>
          <div class="text item">
            <div class="chart1" ref="myEchartPillar"></div>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-left: 10px;">
          <div slot="header" class="clearfix">
            <span>热门书籍销售量</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            <div class="chart2" ref="myEchartPie"></div>
          </div>
        </el-card>
    </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 饼状图
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// 引入legend模块
require('echarts/lib/component/legend')
export default {
  mounted () {
    this.getPillar()
    this.getPie()
  },
  methods: {
    getPillar () {
      let that = this
      // 基于准备好的dom(myEchartPillar)，初始化echarts实例
      let mycharts = echarts.init(that.$refs.myEchartPillar)
      // 指定图表的配置项和数据，绘制图表
      mycharts.setOption({
        // 图表名称
        title: {
          text: '柱形',
          left: 'center',
          textStyle: {
            color: '#333',
            fontWeight: 'normal',
            fontSize: '16'
          }
        },
        // 图表颜色
        color: ['RGBa(51,202,187, 0.5)'],
        // 提示
        tooltip: {
          // 触发类型,axis:坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效，默认为直线，可选为：'line' | 'shadow'
            type: 'shadow'
          }
        },
        grid: {
          show: true,
          // grid 组件离容器左侧的距离。
          left: '8%',
          // grid 组件离容器右侧的距离。
          right: '8%',
          // grid 组件离容器下侧的距离。
          bottom: '3%',
          // grid 区域是否包含坐标轴的刻度标签。true这常用于『防止标签溢出』的场景，标签溢出指的是，标签长度动态变化时，可能会溢出容器或者覆盖其他组件。
          containLabel: true,
          // 网格背景色，此配置项生效的前提是，设置了 show: true
          backgroundColor: 'RGBa(231,247,245,0.5)'
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis: [
          {
            // 'category' 类目轴
            type: 'category',
            // 坐标轴名称
            name: '时间',
            // 坐标轴名称显示位置
            nameLocation: 'end',
            // 坐标数据
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            // 坐标轴刻度相关设置
            axisTick: {
            // 为 true 可以保证刻度线和标签对齐
              alignWithLabel: true
            },
            // 坐标轴名称与轴线之间的距离
            nameGap: 2
          }
        ],
        // 直角坐标系 grid 中的 y 轴
        yAxis: [
          {
            // 'value' 数值轴，适用于连续数据
            type: 'value',
            // 坐标轴名称
            name: '使用量（次数）',
            // 坐标轴的标签是否响应和触发鼠标事件，默认不响应
            triggerEvent: true
          }
        ],
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            name: '柜子使用量',
            // 类型为柱状/条形图
            type: 'bar',
            // 柱条的宽度，不设时自适应。支持设置成相对于类目宽度的百分比。
            barWidth: '60%',
            // 图形上的文本标签，可用于说明图形的一些数据信息
            label: {
              normal: {
                // 是否显示标签
                show: true,
                // 通过相对的百分比或者绝对像素值表示标签相对于图形包围盒左上角的位置
                position: 'top'
              }
            },
            // 系列中的数据内容数组
            data: [1, 3, 5, 7, 9, 11, 13]
          }
        ]
      })
      // // 解决自适应
      // setTimeout(function () {
      //   window.addEventListener('resize', () => {
      //     myChart.resize()
      //   })
      // }, 500)
    },
    getPie () {
      let that = this
      let mycharts = echarts.init(that.$refs.myEchartPie)
      mycharts.setOption({
        title: {
          text: '天气情况统计',
          left: 'center',
          textStyle: {
            color: '#333',
            fontWeight: 'normal',
            fontSize: '16'
          }
        },
        tooltip: {
          show: true,
          trigger: 'item',
          triggerOn: 'mousemove|click',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['西凉', '益州', '兖州', '荆州', '幽州']
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              {value: 1548, name: '幽州'},
              {value: 535, name: '荆州'},
              {value: 510, name: '兖州'},
              {value: 634, name: '益州'},
              {value: 735, name: '西凉'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 50%;
}
    .echarts {
        // height: 500px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .chart1 {
        background-color: #fff;
        height: 400px;
        margin-right: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        }
        .chart2 {
        background-color: #fff;
        height: 400px;
        margin-left: 10px;
        box-sizing: border-box;
                display: flex;
        align-items: center;
        justify-content: center;
        }
    }
</style>

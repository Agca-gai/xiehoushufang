<template>
    <div>
        <el-container>
        <el-header>
            <div class="title-nav">
                <p>邂逅书坊后台管理系统</p>
            </div>
            <div class="title-line"></div>
            <div class="title-caidan">
                <img v-show="showaside === true" src="../assets/images/caidan2.png" alt="" @click="showAside">
                <img v-show="showaside === false" src="../assets/images/caidan.png" alt="" @click="disshowAside">
                <p>{{caidanNmae}}</p>
            </div>
            <div class="title-user-nav">
                <img :src="userImage" alt="">
                <div class="title-user">
                    <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-s-custom" @click.native="gotouserData">个人信息</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" @click.native="tologin()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
        <el-container style="position: absolute; top: 60px; bottom: 0; width: 100%;">
            <el-aside width="200px" :class="showaside ? 'aside2' : 'aside'">
                <el-menu class="el-menu-vertical-demo" background-color="rgb(70, 81, 97)"
                text-color="#fff" active-text-color="#33cabb" @select="gotopage" :default-openeds="openeds" :default-active="activeMune">
                <el-submenu :index="index.toString()" v-for="(item, index) in submenuList" :key="item.menuCode">
                    <template slot="title">
                    <img :src="item.submenuIcon" alt="">
                    <span>{{item.submenuName}}</span>
                    </template>
                    <el-menu-item @click="getpage(goodsitem)" :index="goodsitem.menuPath" v-for="goodsitem in item.goodsmenu" :key="goodsitem.menuCode">{{goodsitem.menuName}}</el-menu-item>
                </el-submenu>
                <el-menu-item :index="item.menuPath" v-for="item in menuList" :key="item.menuCode" @click="getpage(item)">
                    <img :src="item.menuicon" alt="">
                    <span slot="title">{{item.menuName}}</span>
                </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main :class="showaside ? 'main2' : 'mian'"><router-view></router-view></el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import qer from '../api/home'
// import axios from 'axios'
// const qs = require('qs')
export default {
  data () {
    return {
      userImage: require('../assets/images/head_pic.png'),
      userName: 'Agca-概',
      caidanNmae: this.$route.name,
      showaside: true,
      openeds: ['0'],
      activeMune: this.$route.path,
      submenuList: [
        {submenuIcon: require('../assets/images/pchome.png'),
          submenuName: '后台首页',
          menuCode: '888',
          goodsmenu: [
            {menuCode: '11', menuName: '数据视觉', menuPath: '/home-data'}
          ]},
        {submenuIcon: require('../assets/images/shangpin.png'),
          submenuName: '商品管理',
          menuCode: '998',
          goodsmenu: [
            {menuName: '商品数据', menuPath: '/comm-data'},
            {menuName: '商品分类', menuPath: '/comm-classify-manage'},
            {menuName: '商品详情图', menuPath: '/comm-detail-pic'},
            {menuName: '热门位商品', menuPath: '/hot-comm'},
            {menuName: '首页轮播图', menuPath: '/home-pic-manage'}
          ]}
      ],
      menuList: [
        {menuCode: '1', menuicon: require('../assets/images/yonghuguanli.png'), menuName: '用户管理', menuPath: '/user-comm'},
        {menuicon: require('../assets/images/kehu.png'), menuName: '客户管理', menuPath: '/kehu-manage'},
        {menuicon: require('../assets/images/mendianguanli.png'), menuName: '门店管理', menuPath: '/store-manage'},
        {menuicon: require('../assets/images/sijiguanli.png'), menuName: '司机管理', menuPath: '/driver-manage'},
        {menuicon: require('../assets/images/caidanguanli.png'), menuName: '菜单管理', menuPath: '/menu-manage'},
        {menuicon: require('../assets/images/dingdanguanli.png'), menuName: '订单管理', menuPath: '/order-manage'}
      ]
    }
  },
  mounted () {
    qer('getLoginData', {
      Mid: JSON.parse(sessionStorage.getItem('userInfo'))[0].Mid
    }).then(data => {
      // console.log(data)
      this.userName = data[0].ManName
      this.userImage = data[0].ManImage
    })
  },
  methods: {
    gotopage (key, keyPath) {
      if (key !== this.$route.path) {
        this.$router.replace({path: key})
      }
    },
    getpage (item) {
      this.caidanNmae = item.menuName
    },
    showAside () {
      this.showaside = false
    },
    disshowAside () {
      this.showaside = true
    },
    gotouserData () {
      var that = this
      this.$router.replace('/user-data')
      setTimeout(function () {
        that.caidanNmae = that.$route.name
      }, 100)
    },
    tologin () {
      sessionStorage.clear('userInfo')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
    background-color: rgb(70, 81, 97);
    display: flex;
    align-items: center;
    padding: 0;
    border-bottom: 1px solid rgb(59, 68, 83);
    .title-nav {
        width: 200px;
        height: 60px;
        line-height: 60px;
        padding-left: 10px;
        box-sizing: border-box;
        p {
            font-size: 16px;
            color: #fff;
        }
    }
    .title-line {
        height: 60px;
        width: 1px;
        background-image: linear-gradient(rgb(70, 81, 97), rgb(36, 42, 51), rgb(70, 81, 97));
    }
    .title-caidan {
        display: flex;
        align-items: center;
        margin-left: 20px;
        img {
            width: 30px;
            margin-right: 10px;
        }
        p {
            color: #fff;
            font-size: 16px;
        }
    }
    .title-user-nav {
        position: absolute;
        right: 10px;
        display: flex;
        align-items: center;
        img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
        .title-user {
            .el-dropdown-link {
                cursor: default;
                color: #fff;
            }
        }
    }
}
/deep/ .el-container {
    .el-aside {
        background-color: rgb(70, 81, 97);
        transition: left .3s linear;
        .el-menu {
            .el-submenu {
                width: 200px;
                /deep/ .el-submenu__title {
                    height: 50px;
                    line-height: 50px;
                }
                img {
                  width: 20px;
                  height: 20px;
                }
            }
            /deep/ .el-submenu:hover .el-submenu__title {
                background-color: rgba(255, 255, 255, .2) !important;
            }
            .el-menu-item  {
                width: 200px;
                height: 50px;
                line-height: 50px;
                  img {
                  width: 20px;
                  height: 20px;
                }
            }
            .el-menu-item:hover, .el-menu-item.is-active {
                background-color: rgba(255, 255, 255, .2) !important;
            }
        }
    }
        /*滚动条样式*/
    .el-aside::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    }
    .el-aside::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius   : 10px;
    background-color: #33cabb;
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
    }
    .el-aside::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background   : rgb(70, 81, 97);
    border-radius: 10px;
    }
    .aside {
        display: block;
        position: absolute;
        left: -200px;
        top: 0;
        bottom: 0;
    }
    .aside2 {
        position: absolute;
        left: 0px;
        top: 0;
        bottom: 0;
    }
    .main2 {
        padding-left: 215px !important;
    }
    .main {
        padding-left: 15px;
    }
    .el-main {
        background-color: #f5f6fa;
        padding: 15px;
        transition: padding .3s linear;
    }
}
</style>

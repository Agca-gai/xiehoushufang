<template>
    <div>
    <i-search ref="iSearch" :model="formData">
      <el-form-item prop="CommId">
        <el-input v-model="formData.CommId" placeholder="请输入书号"></el-input>
      </el-form-item>
      <el-form-item prop="CommName">
        <el-input v-model="formData.CommName" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item  prop="OneLevel">
        <el-select v-model="formData.OneLevel" placeholder="请选择一级分类" @click.native="getOneLevel" @change="changeOneLevel">
          <el-option v-for="item in OneLevelList" :key="item.OneLevelCode" :label="item.OneLevelName" :value="item.OneLevelCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="TwoLevel">
        <el-select v-model="formData.TwoLevel" placeholder="请选择二级分类" @click.native="getTwoLevel">
          <el-option v-for="item in TwoLevelList" :key="item.TwoLevelCode" :label="item.TwoLevelName" :value="item.TwoLevelCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="CommState">
        <el-select v-model="formData.CommState" placeholder="请选择商品状态">
          <el-option v-for="item in CommStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </i-search>

    <i-table :toolBar="toolBar" :itemList="columnlist" :pageInfo="pageInfo" :tableData="tableData"
    @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
    :selectionShow="true" @selection-change="handleSelectionChange">
      <el-table-column v-for="(item, index) in columnlist" :label="item.label" :prop="item.prop" :width="item.width" :key="index" align="center" :formatter="columnFormatter">
        <template slot-scope="scope">
        <img v-if="item.prop === 'CommImage'" type= "text" @click="watchImg(scope.row)" :src="scope.row.CommImage" alt="" style="cursor: pointer; width: 50px">
        <span v-else>{{filterDist(scope.row[item.prop], item)}}</span>
      </template>
      </el-table-column>
    </i-table>
        <!-- 详情按钮 -->
    <i-dialog :title="xiangqingdialogTitle" v-model="xiangqingdialogVisible" @dialog-confirm="xiangqingdialogConfirm" @dialog-cancel="xiangqingdialogCancel" @dialog-before-close="xiangqingdialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="xiangqingdialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                <el-form-item label="书号" class="form-item" prop="CommId">
                    <el-input v-model="xiangqingdialogFromData.CommId" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品名称" class="form-item" prop="CommName">
                    <el-input v-model="xiangqingdialogFromData.CommName" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="现价" class="form-item" prop="CommPrice">
                    <el-input v-model="xiangqingdialogFromData.CommPrice" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="售价" class="form-item" prop="CommSell">
                    <el-input v-model="xiangqingdialogFromData.CommSell" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="销售量" class="form-item" prop="CommSellSum">
                    <el-input v-model="xiangqingdialogFromData.CommSellSum" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="一级分类" class="form-item" prop="OneLevel">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiangqingdialogFromData.OneLevel" :disabled="true" placeholder="请选择" @click.native="getOneLevel" @change="changeOneLevel">
                      <el-option v-for="item in OneLevelList" :key="item.OneLevelCode" :label="item.OneLevelName" :value="item.OneLevelCode"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="二级分类" class="form-item" prop="TwoLevel">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiangqingdialogFromData.TwoLevel" :disabled="true" placeholder="请选择" @click.native="getTwoLevel">
                      <el-option v-for="item in TwoLevelList" :key="item.TwoLevelCode" :label="item.TwoLevelName" :value="item.TwoLevelCode"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品状态" class="form-item" prop="CommState">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiangqingdialogFromData.CommState" :disabled="true" placeholder="请选择">
                      <el-option v-for="item in CommStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="广告词" class="form-item" prop="CommMessage">
                    <el-input v-model="xiangqingdialogFromData.CommMessage" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品介绍" class="form-item" prop="CommIntroduce">
                    <el-input v-model="xiangqingdialogFromData.CommIntroduce" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="上架时间" class="form-item" prop="CreateTime">
                    <el-input v-model="xiangqingdialogFromData.CreateTime" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="浏览量" class="form-item" prop="PageView">
                    <el-input v-model="xiangqingdialogFromData.PageView" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="商家编号" class="form-item" prop="StoreId">
                    <el-input v-model="xiangqingdialogFromData.StoreId" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商家名称" class="form-item" prop="StoreName">
                    <el-input v-model="xiangqingdialogFromData.StoreName" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="库存" class="form-item" prop="CommInventory">
                    <el-input v-model="xiangqingdialogFromData.CommInventory" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品评分" class="form-item" prop="CommRank">
                    <el-input v-model="xiangqingdialogFromData.CommRank" :disabled="true"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
    </i-dialog>
        <!-- 新增按钮 -->
    <i-dialog :title="dialogTitle" v-model="dialogVisible" @dialog-confirm="dialogConfirm" @dialog-cancel="dialogCancel" @dialog-before-close="dialogBeforeClose">
      <el-form :rules="formRules" ref="form"  :model="dialogFromData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                <el-form-item label="商品书号" class="form-item" prop="CommId">
                    <el-input v-model="dialogFromData.CommId"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品名称" class="form-item" prop="CommName">
                    <el-input v-model="dialogFromData.CommName"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="商品现价" class="form-item" prop="CommPrice">
                    <el-input v-model="dialogFromData.CommPrice"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品售价" class="form-item" prop="CommSell">
                    <el-input v-model="dialogFromData.CommSell"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="一级分类" class="form-item" prop="OneLevel">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="dialogFromData.OneLevel" placeholder="请选择" @click.native="getOneLevel" @change="changeOneLevel">
                      <el-option v-for="item in OneLevelList" :key="item.OneLevelCode" :label="item.OneLevelName" :value="item.OneLevelCode"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="二级分类" class="form-item" prop="TwoLevel">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="dialogFromData.TwoLevel" placeholder="请选择" @click.native="getTwoLevel">
                      <el-option v-for="item in TwoLevelList" :key="item.TwoLevelCode" :label="item.TwoLevelName" :value="item.TwoLevelCode"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="商品状态" class="form-item" prop="CommState">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="dialogFromData.CommState" placeholder="请选择">
                      <el-option v-for="item in CommStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品库存" class="form-item" prop="CommInventory">
                    <el-input v-model="dialogFromData.CommInventory"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="广告词" class="form-item" prop="CommMessage">
                    <el-input v-model="dialogFromData.CommMessage"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品介绍" class="form-item" prop="CommIntroduce">
                    <el-input v-model="dialogFromData.CommIntroduce"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="商家编号" class="form-item" prop="StoreId">
                    <!-- <el-input v-model="dialogFromData.StoreId"></el-input> -->
                    <el-select v-model="dialogFromData.StoreId" placeholder="请选择" @click.native="getStoreIdList" @change="changeStoreIdList">
                      <el-option v-for="item in StoreList" :key="item.StoreId" :label="item.StoreId" :value="item.StoreId"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商家名称" class="form-item" prop="StoreName">
                    <!-- <el-input v-model="dialogFromData.StoreName"></el-input> -->
                    <el-select v-model="dialogFromData.StoreName" placeholder="请选择" @click.native="getStoreNameList">
                      <el-option v-for="item in StoreList" :key="item.StoreName" :label="item.StoreName" :value="item.StoreName"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="选择图片" class="form-item" prop="CommImage">
                    <!-- <el-input v-model="dialogFromData.HomePicUrl"></el-input> -->
                    <i-file v-model="dialogFromData.CommImage"></i-file>
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
                <el-form-item label="商品书号" class="form-item" prop="CommId">
                    <el-input v-model="xiugaidialogFromData.CommId"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品名称" class="form-item" prop="CommName">
                    <el-input v-model="xiugaidialogFromData.CommName"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="商品现价" class="form-item" prop="CommPrice">
                    <el-input v-model="xiugaidialogFromData.CommPrice"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品售价" class="form-item" prop="CommSell">
                    <el-input v-model="xiugaidialogFromData.CommSell"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                <el-form-item label="一级分类" class="form-item" prop="OneLevel">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.OneLevel" placeholder="请选择" @click.native="getOneLevel" @change="changeOneLevel">
                      <el-option v-for="item in OneLevelList" :key="item.OneLevelCode" :label="item.OneLevelName" :value="item.OneLevelCode"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="二级分类" class="form-item" prop="TwoLevel">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.TwoLevel" placeholder="请选择" @click.native="getTwoLevel">
                      <el-option v-for="item in TwoLevelList" :key="item.TwoLevelCode" :label="item.TwoLevelName" :value="item.TwoLevelCode"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="上架时间" class="form-item" prop="CreateTime">
                    <!-- <el-input v-model="xiugaidialogFromData.CreateTime" placeholder="默认获取当地时间" :disabled="true"></el-input> -->
                    <el-date-picker
                      v-model="xiugaidialogFromData.CreateTime"
                      type="datetime"
                      placeholder="选择日期"
                      :default-value="xiugaidialogFromData.CreateTime"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品状态" class="form-item" prop="CommState">
                    <!-- <el-input v-model="dialogFromData.userSex"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.CommState" placeholder="请选择" @click.native="getCommState" >
                      <el-option v-for="item in CommStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="广告词" class="form-item" prop="CommMessage">
                    <el-input v-model="xiugaidialogFromData.CommMessage"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商品介绍" class="form-item" prop="CommIntroduce">
                    <el-input v-model="xiugaidialogFromData.CommIntroduce"></el-input>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="商家编号" class="form-item" prop="StoreId">
                    <!-- <el-input v-model="dialogFromData.StoreId"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.StoreId" placeholder="请选择" @click.native="getStoreIdList" @change="changeStoreIdList">
                      <el-option v-for="item in StoreList" :key="item.StoreId" :label="item.StoreId" :value="item.StoreId"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="商家名称" class="form-item" prop="StoreName">
                    <!-- <el-input v-model="dialogFromData.StoreName"></el-input> -->
                    <el-select v-model="xiugaidialogFromData.StoreName" placeholder="请选择" @click.native="getStoreNameList">
                      <el-option v-for="item in StoreList" :key="item.StoreName" :label="item.StoreName" :value="item.StoreName"></el-option>
                    </el-select>
                </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="el-row">
                  <el-col :span="12">
                <el-form-item label="商品库存" class="form-item" prop="CommInventory">
                    <el-input v-model="xiugaidialogFromData.CommInventory"></el-input>
                </el-form-item>
                  </el-col>
                  <el-col :span="12">
                <el-form-item label="选择图片" class="form-item" prop="CommImage">
                    <!-- <el-input v-model="dialogFromData.HomePicUrl"></el-input> -->
                    <i-file v-model="xiugaidialogFromData.CommImage"></i-file>
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
import IFile from '../../components/i-file.vue'
import qer from '../../api/comm-manage'
import qer2 from '../../api/user-data'
export default {
  components: {ITable, IDialog, ISearch, IFile},
  data () {
    return {
      toolBar: [
        {btnname: '详情',
          icon: 'el-icon-view',
          func: () => {
            if (this.selectDataarray === '') {
              this.$message({
                type: 'error',
                message: '请选择一组数据进行查看！'
              })
            } else if (this.selectDataarray.length > 1) {
              this.$message({
                type: 'error',
                message: '只能选择一组数据进行查看！'
              })
            } else {
              this.xiangqingdialogVisible = true
              this.xiangqingdialogFromData = this.selectDataarray[0]
            }
          }},
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
                array.push(this.selectDataarray[i].CommId)
              }
              // console.log(array)
              // 删除用户发送请求
              qer('deleteGoodsData', {
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
                    Content: '删除商品' + array,
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
            this.formData.CommId = ''
            this.formData.CommName = ''
            this.formData.OneLevel = ''
            this.formData.TwoLevel = ''
            this.formData.CommState = ''
          }}
      ],
      formData: {
        CommId: '',
        CommName: '',
        OneLevel: '',
        TwoLevel: '',
        CommState: ''
      },
      xiangqingdialogFromData: {
        CommId: '',
        CommName: '',
        CommPrice: '',
        CommSell: '',
        // CommSellSum: '',
        OneLevel: '',
        TwoLevel: '',
        CommMessage: '',
        CommIntroduce: '',
        CommState: '',
        CreateTime: '',
        // PageView: '',
        StoreId: '',
        StoreName: '',
        CommInventory: ''
        // CommRank: ''
      },
      dialogFromData: {
        CommId: '',
        CommName: '',
        CommPrice: '',
        CommSell: '',
        // CommSellSum: '',
        OneLevel: '',
        TwoLevel: '',
        CommMessage: '',
        CommIntroduce: '',
        CommState: '',
        // CreateTime: '',
        // PageView: '',
        StoreId: '',
        StoreName: '',
        CommInventory: '',
        CommImage: ''
        // CommRank: ''
      },
      xiugaidialogFromData: {
        CommId: '',
        CommName: '',
        CommPrice: '',
        CommSell: '',
        CommSellSum: '',
        OneLevel: '',
        TwoLevel: '',
        CommMessage: '',
        CommIntroduce: '',
        CommState: '',
        CreateTime: '',
        PageView: '',
        StoreId: '',
        StoreName: '',
        CommInventory: '',
        CommRank: '',
        CommImage: ''
      },
      ProvinceList: [],
      CityList: [],
      OneLevelList: [],
      TwoLevelList: [],
      OneLevelCode: '',
      StoreList: [],
      CommStateList: [
        {label: '在售', value: 0},
        {label: '下架', value: 1}
      ],
      formRules: {
        CommId: [
          {required: true, message: '请输入商品ID', trigger: 'blur'},
          {min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur'}
        ],
        CommName: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        CommPrice: [
          {required: true, message: '请输入现价', trigger: 'change'}
        ],
        CommSell: [
          {required: true, message: '请输入售价', trigger: 'change'}
        ],
        CommSellSum: [
          {required: true, message: '请输入销售量', trigger: 'change'}
        ],
        OneLevel: [
          {required: true, message: '请选择一级分类', trigger: 'change'}
        ],
        TwoLevel: [
          {required: true, message: '请选择二级分类', trigger: 'change'}
        ],
        // CommMessage: [
        //   {required: true, message: '请输入广告词', trigger: 'change'},
        //   {min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur'}
        // ],
        // CommIntroduce: [
        //   {required: true, message: '请输入商品介绍', trigger: 'change'},
        //   {min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur'}
        // ],
        CommState: [
          {required: true, message: '请选择商品状态', trigger: 'change'}
        ],
        StoreId: [
          {required: true, message: '请选择门店ID', trigger: 'change'}
        ],
        StoreName: [
          {required: true, message: '请选择门店名称', trigger: 'change'}
        ],
        // StorePhone: [
        //   {required: true, message: '请输入门店电话', trigger: 'blur'},
        //   {pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的11位手机号', trigger: 'blur'}
        // ],
        CreateTime: [
          {required: true, message: '请选择上架时间', trigger: 'change'}
        ],
        PageView: [
          {required: true, message: '请输入浏览量', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        CommInventory: [
          {required: true, message: '请输入库存', trigger: 'change'}
        ],
        CommRank: [
          {required: true, message: '请输入商品', trigger: 'blur'},
          {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
        ],
        CommImage: [
          {required: true, message: '请选择图片', trigger: 'change'}
        ]
      },
      xiangqingdialogTitle: '商品详情',
      xiangqingdialogVisible: false,
      dialogTitle: '新增商品',
      dialogVisible: false,
      xiugaidialogTitle: '修改商品',
      xiugaidialogVisible: false,
      frominput: '',
      fromselect: '',
      selectDataarray: '',
      storeIdCode: '',
      columnlist: [
        {label: 'ISBN书号', prop: 'CommId', width: '100px'},
        {label: '商品名称', prop: 'CommName', width: '150px'},
        {label: '现价', prop: 'CommPrice', width: '100px'},
        {label: '售价', prop: 'CommSell', width: '100px'},
        {label: '销售量', prop: 'CommSellSum', width: '100px'},
        {label: '一级分类', prop: 'OneLevel', width: '100px'},
        {label: '二级分类', prop: 'TwoLevel', width: '100px'},
        {label: '图片', prop: 'CommImage', width: '200px'},
        {label: '广告词', prop: 'CommMessage', width: '200px'},
        {label: '商品介绍', prop: 'CommIntroduce', width: '200px'},
        {label: '商品状态', prop: 'CommState', width: '100px'},
        {label: '上架时间', prop: 'CreateTime', width: '200px'},
        {label: '浏览量', prop: 'PageView', width: '100px'},
        {label: '商家编号', prop: 'StoreId', width: '100px'},
        {label: '商家名称', prop: 'StoreName', width: '150px'},
        {label: '库存', prop: 'CommInventory', width: '100px'},
        {label: '商品评分', prop: 'CommRank', width: '100px'}
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
      qer('listGoodsData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize
      }).then(data => {
        // console.log(data)
        this.pageInfo.total = data.pageTotal
        this.tableData = data.data
      })
    },
    reachBtn () {
      // console.log(this.formData)
      qer('findGoodsData', {
        currentPage: this.pageInfo.pageIndex,
        pageSize: this.pageInfo.pageSize,
        CommId: this.formData.CommId,
        CommName: this.formData.CommName,
        OneLevel: this.formData.OneLevel,
        TwoLevel: this.formData.TwoLevel,
        CommState: this.formData.CommState
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
      window.open(data.CommImage)
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
    // 获取店铺编号
    getStoreIdList () {
      qer('StoreListData', {
        StoreId: ''
      }).then(data => {
        // console.log(data)
        this.StoreList = data.StoreData
        // console.log(this.ProvinceList)
      })
    },
    changeStoreIdList (value) {
      this.storeIdCode = value
    },
    // 获取店铺编号
    getStoreNameList () {
      if (this.storeIdCode !== '') {
        qer('StoreListData', {
          StoreId: this.storeIdCode
        }).then(data => {
        // console.log(data)
          this.StoreList = data.StoreData
        // console.log(this.ProvinceList)
        })
      } else {
        this.StoreList = []
      }
    },
    // 获取省份的接口
    getOneLevel () {
      qer('oneLevelData', {
      }).then(data => {
        // console.log(data)
        this.OneLevelList = data.data
        // console.log(this.ProvinceList)
      })
    },
    changeOneLevel (value) {
      this.OneLevelCode = value
    },
    // 获取城市的接口
    getTwoLevel () {
      qer('twoLevelData', {
        OneLevelCode: this.OneLevelCode
      }).then(data => {
        // console.log(data)
        this.TwoLevelList = data.data
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
    // 点击详情按钮
    xiangqingdialogCancel () {
      this.xiangqingdialogVisible = false
      this.$refs.form.resetFields()
    },
    // 关掉dialog之前清空表单值
    xiangqingdialogBeforeClose () {
      console.log(111)
      this.$refs.form.resetFields()
    },
    xiangqingdialogConfirm () {
      console.log('确定按钮被点击了')
      this.xiangqingdialogVisible = false
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
          qer('addGoodsData', {
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
                Content: '新增商品' + this.dialogFromData.CommId,
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
      this.OneLevelCode = ''
      this.storeIdCode = ''
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('表单检验通过了')
          // 修改用户发送请求
          qer('updateGoodsData', {
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
                Content: '修改商品数据' + this.xiugaidialogFromData.CommId,
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
/deep/.el-date-editor.el-input {
width: 100%;
}
        /*滚动条样式*/
    /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 1px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
    }
    /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
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
    /deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background   : rgb(221, 218, 218);
    // border-radius: 10px;
    }
</style>

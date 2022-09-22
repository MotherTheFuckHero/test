<template>
  <div class="return-purchase">
    <el-form ref="purchase" :inline="true" :model="purchase" label-width="85px" class="demo-addForm order-shop">
      <el-row>
        <el-col :lg="6" :xl="6">
          <el-form-item label="商家" prop="useMerchantId" :rules="[{ required: true, trigger: 'change', message: '商家不能为空' }]">
            <el-select
              size="mini"
              v-model="purchase.useMerchantId"
              clearable
              filterable
              remote
              reserve-keyword
              placeholder="商家"
              :remote-method="merchantRemoteMethod"
              :loading="merchantRemoteLoading"
            >
              <el-option
                v-for="item in merchantList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="6">
          <el-form-item label="供应商" prop="supplierId" :rules="[{ required: true, trigger: 'change', message: '供应商不能为空' }]">
            <el-select v-model="purchase.supplierId" size="mini" clearable placeholder="请选择供应商" @focus="getSupplier">
              <el-option
                v-for="item in supplierLists"
                :key="item.id"
                :label="item.supplierName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="6">
          <el-form-item label="选择仓库" prop="warehouseId" :rules="[{ required: true, trigger: 'change', message: '仓库不能为空' }]">
            <el-select v-model="purchase.warehouseId" clearable placeholder="请选择仓库" filterable size="mini" @focus="getWarehouse">
              <el-option
                v-for="item in wareOptions"
                :key="item.id"
                :label="item.warehouseName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="6">
          <el-form-item label="负责人" prop="userId" :rules="[{ required: true, message: '请选择负责人', trigger: 'change' }]">
            <el-select v-model="purchase.userId" size="mini" clearable placeholder="请选择负责人" @focus="getUser">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.userName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="6">
          <el-form-item label="制单日期" prop="tradeTime" :rules="[{ required: true, message: '请选择制单日期', trigger: 'blur' }]">
            <el-date-picker
              v-model="purchase.tradeTime"
              type="datetime"
              size="mini"
              class="date-item"
              style="width: 250px;"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择制单日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-card shadow="hover">
      <el-form ref="purchaseSmall" :model="purchaseSmall" class="demo-addForm table-form">
        <el-table :data="purchaseSmall.stockProductList" style="width: 100%">
          <el-table-column type="index" label="#" />
          <el-table-column prop="code" label="商品编号" align="center" />
          <el-table-column prop="title" label="商品名称" align="center" />
          <el-table-column prop="productSpecs" label="规格" align="center" />
          <el-table-column prop="unit" label="单位" align="center" />
          <el-table-column prop="productNum" label="退货数量" align="center" >
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.productNum" size="mini" placeholder="请输入商品数量" @input="getTotalPrice(scope.row,scope.$index)"/>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="进货价" align="center" />
          <el-table-column prop="amount" label="小计" align="center" />
          <el-table-column prop="remarks" label="备注" align="center" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.remarks" size="mini"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="toDelete(scope.row.productId, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div style="display: flex;justify-content: center;margin-top: 10px">
        <el-button class="filter-item" size="mini" type="warning" @click="getProduct">选择商品</el-button>
      </div>
    </el-card>
    <div>
      <slot name="right" />
      <el-button class="filter-item" style="float: right;margin-top: 10px;" size="medium" type="primary" @click="shopSave">保存</el-button>
      <el-button class="filter-item" style="float: right;margin-top: 10px;margin-right: 10px" size="medium" type="warning" @click="shopSaveSubmit">保存并提交</el-button>
    </div>
    <allComponents :interface="1" :postmerchant="postmerchant" :type="zjDialog" @dialogType="getDialogType" @productData="getProductData"/>
  </div>
</template>

<script>
import { getShop } from '@/api/purchaseSaleInventory/shopPurchase'
import { getProductList, submitShop} from '@/api/purchaseSaleInventory/purchaseReturn'
import { getUserList } from '@/api/purchaseSaleInventory/shopPurchase'
import { getWareHouseInfoListss } from '@/api/purchaseSaleInventory/warehouseManage'
import { getWareHouseInfoLists } from '@/api/purchaseSaleInventory/inventory'
import { getmerchantLists } from '@/api/purchaseSaleInventory/warehouseManage'
import allComponents from '../../allComponents'

export default {
  components: {
      allComponents
  },
  name: 'PurchaseReturn',
  data() {
    return {
      postmerchant: '',
      zjDialog: false,
      purchase: {
        useMerchantId: '',
        warehouseId: '',
        supplierId: '', // 供应商
        userId: '', // 负责人
        merchantId: '', // 商家id
        // productName: '', // 自定义单号
        tradeTime: new Date().getFullYear() + '-' +
                        ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
                        (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' ' +
                        (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' +
                        (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + ':' +
                        (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()), // 制单日期
        stockType: 3, //
        status: null, //
        payStatus: '', // 支付状态
        payPrice: 0, // 已付金额
        orderPrice: 0// 应付金额
      },
      warehouseIdLists: [],
      supplierLists: [],
      userList: [],
      shopeLists: [],
      productLists: [],
      wareOptions: [],
      purchaseSmall: {
        stockProductList: []
      },
      merchantList: [],
      merchantRemoteLoading: false,
      tableData: [],
      afterMerchantList: [],
    }
  },
  created() {
    getWareHouseInfoListss({}).then(res => {
      this.warehouseIdLists = res.data
    })
  },
  mounted() {
      this.initData()
  },
    watch: {
        tableData(newData){
            for (var i = 0; i < newData.length; i++) {
                for (var j = i + 1; j < newData.length; j++) {
                    if (newData[i].specId == newData[j].specId) {
                        this.$notify({
                            title: '警告',
                            message: '该商品已选择，请勿重复选择',
                            type: 'warning'
                        });
                        this.purchaseSmall.stockProductList.splice(j, 1);
                        j--;
                    }
                }
            }
        }
    },
  methods: {
      getProduct(){
          if (this.purchase.useMerchantId){
              this.zjDialog = true
              this.postmerchant = this.purchase.useMerchantId
          }else{
              this.$message.warning('请先选择商家')
          }
      },
      //根据选择商家得到供应商列表
      getSupplier(){
          if (this.purchase.useMerchantId){
              getShop({merchantId:this.purchase.useMerchantId}).then(res => {
                  this.supplierLists = res.data
              })
          }else{
              this.$message.warning('请先选择商家')
          }
      },
      getWarehouse(){
          if (this.purchase.useMerchantId){
              getWareHouseInfoLists({useMerchantId:this.purchase.useMerchantId}).then(res => {
                  this.wareOptions = res.data
              })
          }else{
              this.$message.warning('请先选择商家')
          }
      },
      getUser(){
          if (this.purchase.useMerchantId){
              getUserList({merchantId:this.purchase.useMerchantId}).then(res => {
                  this.userList = res.data
              })
          }else{
              this.$message.warning('请先选择商家')
          }
      },
      // 得到使用仓库商家的列表
      initData() {
          // 远程搜索机构
          let allOrds = []
          getmerchantLists({ status: 3 }).then(res => {
              if (res.code === '0') {
                  allOrds = res.data
                  this.afterMerchantList = allOrds.map(item => {
                      return { value: item.id, label: item.name }
                  })
              } else {
                  this.$notify({
                      title: '警告',
                      message: res.msg,
                      type: 'warning'
                  })
              }
          })
      },
      // 使用仓库的商家远程搜索
      merchantRemoteMethod(query) {
          if (query !== '') {
              this.merchantRemoteLoading = true
              setTimeout(() => {
                  this.merchantRemoteLoading = false
                  this.merchantList = this.afterMerchantList.filter(item => {
                      return item.label.indexOf(query) > -1
                  })
              }, 200)
          } else {
              this.merchantList = []
          }
      },
    // supplierIdchange(value) {
    //   for (var i = 0; i < this.supplierLists.length; i++) {
    //     if (value === this.supplierLists[i].id) {
    //       this.purchase.merchantId = this.supplierLists[i].merchantId
    //       getUserList(this.purchase.merchantId).then(res => {
    //         this.userList = res.data
    //       })
    //     }
    //   }
    // },
      getDialogType(data){
          this.zjDialog = data
      },
      getProductData(data){
          this.tableData = []
          // productId: '', // 商品名
          //     specId: '', // 商品规格名称
          //     productNum: '', // 商品数量
          //     lastPrice: '', // 上次进价
          //     price: '', // 商品价格
          //     totalPrice: '', // 商品总价
          //     unit: '', // 单位
          //     remarks: '', // 备注
          //     warehouseId: 0,
          //     supplierId: null
          let newData = {
              productId: data.id,
              code: data.code,
              title: data.title,
              unit: data.unit,
              lastPrice: '',
              productNum: '',
              price: data.purchasePrice,
              specId: data.specId,
              productSpecs: data.productSpecs,
              remarks: '',
              warehouseId: 0,
              amount: 0,
              supplierId: null,
              totalPrice: ''
          }
          this.purchaseSmall.stockProductList.push(newData)
          this.tableData = this.purchaseSmall.stockProductList
      },
      getTotalPrice(v, i) {
          if (v.productNum !== '' && v.price !== '') {
              v.amount = Number((Number(v.productNum) * Number(v.price)).toFixed(2))
              v.totalPrice = Number((Number(v.productNum) * Number(v.price)).toFixed(2))
          } else if (v.productNum === '' || v.price === '') {
              v.amount = ''
              v.totalPrice = ''
          }
      },
      toDelete(id, data){
          this.purchaseSmall.stockProductList = this.purchaseSmall.stockProductList.filter(function (item) {
              return item.productId != id
          })
      },
    // 保存商品
    shopSave() {
      const p1 = new Promise((resolve, reject) => {
        this.$refs['purchase'].validate(valid => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([p1]).then(() => {
        this.purchase.merchantId = this.purchase.useMerchantId
        // 表单验证通过，写业务代码
        let shopAllPrice = 0
        for (const i in this.purchaseSmall.stockProductList) {
          this.purchaseSmall.stockProductList[i].supplierId = this.purchase.supplierId
          shopAllPrice += this.purchaseSmall.stockProductList[i].totalPrice
        }
        this.purchase.totalPrice = shopAllPrice
        if (this.purchase.payPrice === '') {
          this.purchase.payStatus = 2
          this.purchase.payPrice = 0
        } else {
          this.purchase.payStatus = 1
        }
        this.purchase.status = 1
        const stockInfo = this.purchase
        const stockProductList = this.purchaseSmall.stockProductList
        const data = {
          stockInfo: stockInfo,
          stockProductList: stockProductList
        }
        submitShop(data).then(res => {
          if (res.code === '0') {
            this.$notify({
              title: '保存成功',
              message: '已加入草稿箱',
              type: 'success'
            })
            this.$refs['purchase'].resetFields()
            this.$refs['purchaseSmall'].resetFields()
            this.purchaseSmall.stockProductList = []
          } else {
            this.$notify.error({
              title: '保存失败',
              message: ''
            })
          }
        })
      })
    },
    // 保存并提交
    shopSaveSubmit() {
      const p1 = new Promise((resolve, reject) => {
        this.$refs['purchase'].validate(valid => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([p1]).then(() => {
        this.purchase.merchantId = this.purchase.useMerchantId
        // 表单验证通过，写业务代码
        let shopAllPrice = 0
        for (const i in this.purchaseSmall.stockProductList) {
          this.purchaseSmall.stockProductList[i].supplierId = this.purchase.supplierId
          shopAllPrice += this.purchaseSmall.stockProductList[i].totalPrice
        }
        this.purchase.totalPrice = shopAllPrice
        if (this.purchase.payPrice === '') {
          this.purchase.payStatus = 2
          this.purchase.payPrice = 0
        } else {
          this.purchase.payStatus = 1
        }
        this.purchase.status = 2
        const stockInfo = this.purchase
        const stockProductList = this.purchaseSmall.stockProductList
        const data = {
          stockInfo: stockInfo,
          stockProductList: stockProductList
        }
        submitShop(data).then(res => {
          if (res.code === '0') {
            this.$notify({
              title: '保存并提交成功',
              message: '已加入审核',
              type: 'success'
            })
            this.$refs['purchase'].resetFields()
            this.$refs['purchaseSmall'].resetFields()
            this.purchaseSmall.stockProductList = []
          } else {
            this.$notify.error({
              title: '保存并提交失败',
              message: ''
            })
          }
        })
      })
    },
    oninputinteger(num) {
      let str = num
      const len = str.substr(0, 1)
      // 如果第一位是0就替换为空，数量必须大于等于1
      if (len === '0') {
        str = ''
      }
      // 正则替换
      str = str.replace(/[^\.\d]/g, '')
      str = str.replace('.', '')
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .order-shop .el-input {
    width: 170px;
  }
  .down-order-shop{
    margin-top: 20px;
  }
  /deep/.table-form .el-table__body .el-table__row td .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
</style>

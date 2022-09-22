<template>
  <div class="order-purchase">
    <el-form ref="purchase" :inline="true" :model="purchase" label-width="85px">
      <el-row>
        <el-col :lg="8" :xl="6">
          <el-form-item label="仓库" prop="warehouseId" :rules="[{ required: true, trigger: 'change', message: '仓库不能为空' }]">
            <el-select v-model="purchase.warehouseId" size="small" style="width: 250px !important;" clearable placeholder="请选择仓库" @change="warehousechange">
              <el-option
                v-for="item in warehouseIdLists"
                :key="item.id"
                :label="item.warehouseName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="6">
          <el-form-item label="负责人" prop="userId" :rules="[{ required: true, trigger: 'change', message: '负责人不能为空' }]">
            <el-select v-model="purchase.userId" size="small" placeholder="请选择负责人" style="width: 250px;">
              <el-option
                v-for="item in userIdList"
                :key="item.userId"
                :label="item.employName"
                :value="item.userId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :xl="6">
          <el-form-item label="制单日期" prop="tradeTime" :rules="[{ required: true, message: '请选择制单日期', trigger: 'blur' }]">
            <el-date-picker
              v-model="purchase.tradeTime"
              type="datetime"
              size="small"
              class="date-item"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择制单日期"
              style="width: 250px;"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-card shadow="hover">
      <el-form ref="purchaseSmall" :model="purchaseSmall" class="demo-addForm table-form">
        <el-table :data="purchaseSmall.stockProductList" style="width: 100%">
          <el-table-column align="center" prop="productId" label="商品名称">
            <template slot-scope="scope">
              <el-form-item :prop="'stockProductList.'+scope.$index + '.productId'" :rules="[{ required: true, message: '请选择商品', trigger: 'change' }]">
                <el-select
                  v-model="scope.row.productId"
                  clearable
                  placeholder="请选择商品"
                  filterable
                  size="mini"
                  @change="getShopLast(scope.row,scope.$index)"
                >
                  <el-option
                    v-for="item in shopeLists"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="specId" label="商品规格名称">
            <template slot-scope="scope">
              <el-form-item :prop="'stockProductList.'+scope.$index + '.specId'" :rules="[{ required: true, message: '请选择商品规格', trigger: 'change' }]">
                <el-select
                  v-model="scope.row.specId"
                  clearable
                  placeholder="请选择商品规格"
                  filterable
                  size="mini"
                  @change="getShopLastPrice(scope.row,scope.$index)"
                >
                  <el-option
                    v-for="item in productLists"
                    :key="item.id"
                    :label="item.productSpecs"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="price" label="采购单价">
            <template slot-scope="scope">
              <el-form-item :prop="'stockProductList.'+scope.$index + '.price'">
                <el-input v-model="scope.row.price" size="mini" :disabled="true" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="stockCount" label="库存">
            <template slot-scope="scope">
              <el-form-item :prop="'stockProductList.'+scope.$index + '.stockCount'">
                <el-input v-model="scope.row.stockCount" size="mini" :disabled="true" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="unit" label="单位">
            <template slot-scope="scope">
              <el-form-item :prop="'stockProductList.'+scope.$index + '.unit'">
                <el-input v-model="scope.row.unit" size="mini" :disabled="true" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="productNum" label="报损数量">
            <template slot-scope="scope">
              <el-form-item :prop="'stockProductList.'+scope.$index + '.productNum'" :rules="[{ required: true, message: '请填写报损数量', trigger: 'blur' }]">
                <el-input v-model.number="scope.row.productNum" size="mini" placeholder="请填写报损数量" @keyup.native="scope.row.productNum = oninputinteger(scope.row.productNum,scope.row)" @change="getTotalPrice(scope.row,scope.$index)" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="totalPrice" label="报损总价">
            <template slot-scope="scope">
              <el-form-item :prop="'stockProductList.'+scope.$index + '.totalPrice'">
                <el-input v-model="scope.row.totalPrice" size="mini" :disabled="true" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remarks" label="备注">
            <template slot-scope="scope">
              <el-form-item :prop="'stockProductList.'+scope.$index + '.remarks'">
                <el-input v-model="scope.row.remarks" size="mini" placeholder="备注" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remarks" label="操作" width="250px">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="delShop(scope.row,scope.$index)">删除</el-button>
              <el-button v-if="scope.$index === 0" size="mini" type="primary" plain icon="el-icon-plus" @click="addShop">添加下一个</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
    <div>
      <slot name="right" />
      <el-button class="filter-item" style="float: right;margin-top: 10px;" size="medium" type="primary" @click="shopSave">保存</el-button>
      <el-button class="filter-item" style="float: right;margin-top: 10px;margin-right: 10px" size="medium" type="warning" @click="shopSaveSubmit">保存并提交</el-button>
    </div>
  </div>
</template>

<script>
import { getShopDetil, submitShop } from '@/api/purchaseSaleInventory/shopPurchase'
import { getProductList } from '@/api/purchaseSaleInventory/purchaseReturn'
import { getWareHouseInfoListss } from '@/api/purchaseSaleInventory/warehouseManage'
import { getstockInfoUserlist } from '@/api/order/order'
export default {
  name: 'PurchaseOrder',
  data() {
    return {
      purchase: {
        supplierId: 0, // 供应商
        warehouseId: null, // 仓库
        merchantId: null, // 商户
        userId: '', // 负责人
        productName: 0, // 自定义单号
        tradeTime: new Date().getFullYear() + '-' +
            ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
            (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' ' +
            (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' +
            (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + ':' +
            (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()), // 制单日期
        totalPrice: 0, // 订单总价
        stockType: 2, // 报损传2
        status: null, //
        payStatus: 0, // 支付状态
        payPrice: 0, // 已付金额
        orderPrice: 0// 应付金额
      },
      warehouseIdLists: [],
      userIdList: [],
      payStatusLists: [
        {
          name: '已支付',
          id: 1
        },
        {
          name: '未支付',
          id: 2
        }
      ],
      purchaseSmall: {
        stockProductList: [
          {
            productId: '', // 商品名
            specId: '', // 商品规格名称
            productNum: '', // 商品数量
            price: '', // 上次进价
            stockCount: '', // 商品库存
            totalPrice: '', // 商品总价
            unit: '', // 单位
            remarks: '', // 备注
            warehouseId: null, // 仓库
            supplierId: 0 // 供应商
          }
        ]
      },
      shopeLists: [],
      productLists: [],
      warehouseLists: []
    }
  },
  created() {
    getWareHouseInfoListss({}).then(res => {
      this.warehouseIdLists = res.data
    })
  },
  methods: {
    warehousechange() {
      this.shopeLists = []
      const newdata = {
        warehouseId: this.purchase.warehouseId
      }
      getProductList(newdata).then(res => {
        this.shopeLists = res.data
      })
      for (var s = 0; s < this.warehouseIdLists.length; s++) {
        if (this.purchase.warehouseId === this.warehouseIdLists[s].id) {
          this.purchase.merchantId = this.warehouseIdLists[s].merchantId
          getstockInfoUserlist(this.purchase.merchantId).then(res => {
            this.userIdList = res.data
          })
        }
      }
    },
    getProduct() {
      const datas = {
      }
      getProductList(datas).then(res => {
        this.shopeLists = res.data
      })
    },
    // 商品规格远程搜索
    remoteMethod(query) {
      const data = {
        specName: query
      }
      getShopDetil(data).then(res => {
        this.productLists = res.data
      })
    },
    getShopLast(v, i) {
      this.productLists = []
      for (const j in this.shopeLists) {
        if (v.productId === this.shopeLists[j].id) {
          this.productLists = this.shopeLists[j].productSpecRequestList
        }
      }
    },
    getShopLastPrice(v, i) {
      for (const j in this.productLists) {
        if (v.specId === this.productLists[j].id) {
          v.price = this.productLists[j].productSpecStock.lastPrice
          v.stockCount = this.productLists[j].productSpecStock.stockCount
          v.unit = this.productLists[j].unit
        }
      }
    },
    oninputinteger(num, e) {
      const newstockCount = e.stockCount
      let str = num
      if (str > newstockCount) {
        return newstockCount
      } else if (num === 0) {
        return 1
      }
      const len = str.substr(0, 1)
      // 如果第一位是0就替换为空，数量必须大于等于1
      if (len === '0') {
        str = ''
      }
      // 正则替换
      str = str.replace(/[^\.\d]/g, '')
      str = str.replace('.', '')
      return str
    },
    getTotalPrice(v, i) {
      if (v.productNum !== '' && v.price !== '') {
        v.totalPrice = v.price * v.productNum
      } else if (v.productNum === '' || v.price === '') {
        v.totalPrice = ''
      }
    },
    // 添加商品
    addShop() {
      this.purchaseSmall.stockProductList.push({
        productId: '', // 商品名
        specId: '', // 商品规格名称
        productNum: '', // 商品数量
        price: '', // 上次进价
        stockCount: '', // 商品库存
        totalPrice: '', // 商品总价
        unit: '', // 单位
        remarks: '', // 备注
        warehouseId: null, // 仓库
        supplierId: 0 // 供应商
      })
    },
    // 移除商品
    delShop(v, i) {
      if (this.purchaseSmall.stockProductList.length !== 1) {
        this.purchaseSmall.stockProductList.splice(i, 1)
      }
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
      const p2 = new Promise((resolve, reject) => {
        this.$refs['purchaseSmall'].validate(valid => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([p1, p2]).then(() => {
        // 表单验证通过，写业务代码
        let shopAllPrice = 0
        for (const i in this.purchaseSmall.stockProductList) {
          this.purchaseSmall.stockProductList[i].warehouseId = this.purchase.warehouseId
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
            this.purchaseSmall.stockProductList = [{
              productId: '', // 商品名
              specId: '', // 商品规格名称
              productNum: '', // 商品数量
              price: '', // 上次进价
              stockCount: '', // 商品库存
              totalPrice: '', // 商品总价
              unit: '', // 单位
              remarks: '', // 备注
              warehouseId: null, // 仓库
              supplierId: 0 // 供应商
            }]
          } else {
            this.$notify.error({
              title: '保存失败',
              message: res.msg
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
      const p2 = new Promise((resolve, reject) => {
        this.$refs['purchaseSmall'].validate(valid => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([p1, p2]).then(() => {
        // 表单验证通过，写业务代码
        let shopAllPrice = 0
        for (const i in this.purchaseSmall.stockProductList) {
          this.purchaseSmall.stockProductList[i].warehouseId = this.purchase.warehouseId
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
            this.purchaseSmall.stockProductList = [{
              productId: '', // 商品名
              specId: '', // 商品规格名称
              productNum: '', // 商品数量
              price: '', // 上次进价
              stockCount: '', // 商品库存
              totalPrice: '', // 商品总价
              unit: '', // 单位
              remarks: '', // 备注
              warehouseId: null, // 仓库
              supplierId: 0 // 供货商
            }]
          } else {
            this.$notify.error({
              title: '保存并提交失败',
              message: res.msg
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .order-shop .el-input {
    width: 178px;
  }
  .down-order-shop{
    margin-top: 20px;
  }
  /deep/.table-form .el-table__body .el-table__row td .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
</style>

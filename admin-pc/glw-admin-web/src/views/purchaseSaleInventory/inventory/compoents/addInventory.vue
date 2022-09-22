<template>
  <div class="add-inventory">
    <el-form ref="addInventoryForm" :inline="true" :model="addInventoryForm" label-width="100px" class="demo-addForm order-shop">
      <el-row>
        <el-col :lg="6" :xl="6">
          <el-form-item label="仓位" prop="warehouseId" :rules="[{ required: true, trigger: 'change', message: '仓库不能为空' }]">
            <el-select v-model="addInventoryForm.warehouseId" size="mini" clearable placeholder="请选择仓库" @change="wareHouseChange">
              <el-option
                v-for="item in warehouseIdLists"
                :key="item.id"
                :label="item.warehouseName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="6">
          <el-form-item label="盘点人" prop="userId" :rules="[{ required: true, message: '请选择盘点人', trigger: 'change' }]">
            <el-select v-model="addInventoryForm.userId" size="mini" clearable placeholder="请选择盘点人">
              <el-option
                v-for="item in userList"
                :key="item.userId"
                :label="item.employName"
                :value="item.userId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="6">
          <el-form-item label="盘点时间" prop="checkTime" :rules="[{ required: true, message: '请选择盘点时间', trigger: 'blur' }]">
            <el-date-picker
              v-model="addInventoryForm.checkTime"
              type="datetime"
              size="mini"
              class="date-item"
              style="width: 180px;"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择盘点时间"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :xl="6">
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="addInventoryForm.remarks" size="mini" placeholder="备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <el-button :disabled="addInventoryForm.stockcheckProducts.length === 0" style="float: right;" size="mini" type="warning" icon="el-icon-printer" @click="exportPrint">打印</el-button>
          <el-button :disabled="addInventoryForm.stockcheckProducts.length === 0" style="float: right;margin-right: 10px" size="mini" type="warning" icon="el-icon-download" @click="exportExcel">导出</el-button>
          <el-button :disabled="addInventoryForm.stockcheckProducts.length === 0" style="float: right;margin-right: 5px" size="mini" type="primary" plain icon="el-icon-plus" @click="addShop">添加商品</el-button>
        </div>
        <div ref="print">
          <el-table :data="addInventoryForm.stockcheckProducts" class="table-form" style="width: 100%">
            <el-table-column prop="productId" label="商品名称">
              <template slot-scope="scope">
                <el-form-item v-if="scope.row.productName !== ''">
                  <el-input v-model="scope.row.productName" size="mini" :disabled="true" />
                </el-form-item>
                <el-form-item v-else :prop="'stockcheckProducts.'+scope.$index + '.productId'" :rules="[{ required: true, message: '请选择商品', trigger: 'change' }]">
                  <el-select
                    v-model="scope.row.productId"
                    clearable
                    placeholder="请选择商品"
                    filterable
                    size="mini"
                    :disabled="scope.row.productId !== ''"
                  >
                    <el-option
                      v-for="item in showCityList(scope.row.productId)"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="specId" label="商品规格名称">
              <template slot-scope="scope">
                <el-form-item v-if="scope.row.specName !== ''">
                  <el-input v-model="scope.row.specName" size="mini" :disabled="true" />
                </el-form-item>
                <el-form-item v-else :prop="'stockcheckProducts.'+scope.$index + '.specId'" :rules="[{ required: true, message: '请选择商品规格', trigger: 'change' }]">
                  <el-select
                    v-model="scope.row.specId"
                    clearable
                    placeholder="请选择商品规格"
                    filterable
                    size="mini"
                    @focus="getShopLast(scope.row,scope.$index)"
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
            <el-table-column prop="stockPrice" label="上次进价">
              <template slot-scope="scope">
                <el-form-item :prop="'stockcheckProducts.'+scope.$index + '.stockPrice'">
                  <el-input v-model="scope.row.stockPrice" size="mini" :disabled="true" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="stockNum" label="库存数">
              <template slot-scope="scope">
                <el-form-item :prop="'stockcheckProducts.'+scope.$index + '.stockNum'">
                  <el-input v-model="scope.row.stockNum" size="mini" :disabled="true" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="checkNum" label="盘点数">
              <template slot-scope="scope">
                <el-form-item :prop="'stockcheckProducts.'+scope.$index + '.checkNum'" :rules="[{ required: true, message: '请填写盘点数量', trigger: 'blur' }]">
                  <el-input v-model="scope.row.checkNum" size="mini" placeholder="请填写盘点数量" @keyup.native="scope.row.checkNum = oninputinteger(scope.row.checkNum)" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="remarks" label="备注">
              <template slot-scope="scope">
                <el-form-item :prop="'stockcheckProducts.'+scope.$index + '.remarks'">
                  <el-input v-model="scope.row.remarks" size="mini" placeholder="备注" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
              <template slot-scope="scope">
                <el-button v-if="scope.$index >= checkProductsListLength" size="mini" type="danger" plain icon="el-icon-delete" @click="delShop(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-form>
    <div>
      <slot name="right" />
      <el-button class="filter-item" style="float: right;margin-top: 10px;" size="medium" type="primary" @click="shopSave">保存</el-button>
      <el-button class="filter-item" style="float: right;margin-top: 10px;margin-right: 10px" size="medium" type="warning" @click="shopSaveSubmit">保存并提交</el-button>
    </div>
  </div>
</template>

<script>
import { getWareHouseInfoLists, getUserList, getInventoryNoList, getProductList, addInventoryNum, exportList } from '@/api/purchaseSaleInventory/inventory'
export default {
  name: 'AddInventory',
  data() {
    return {
      warehouseIdLists: [],
      userList: [],
      addInventoryForm: {
        warehouseId: '',
        merchantId: '',
        userId: '',
        checkTime: new Date().getFullYear() + '-' +
                        ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
                        (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' ' +
                        (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' +
                        (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + ':' +
                        (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()), // 制单日期
        remarks: '',
        status: null,
        stockcheckProducts: [
          // {
          //     productName:'',
          //     productId:'',//商品id
          //     specName:'',
          //     specId:'',//规格id
          //     stockNum:'',//库存数
          //     checkNum:'',//盘点数
          //     remarks:'',//备注
          //     stockPrice:''//上次进价
          // }
        ]
      },
      shopeLists: [],
      productLists: [],
      checkProductsListLength: null
    }
  },
  computed: {
    showCityList() {
      return (val) => {
        // 讲option的显示数据进行深拷贝
        let newList = JSON.parse(JSON.stringify(this.shopeLists))
        // 处理selectList数据，返回一个新数组arr
        // arr数组就相当于所有Select选中的数据集合（没有选中的为''，不影响判断），只要在这个集合里面，其他的下拉框就不应该有这个选项
        const arr = this.addInventoryForm.stockcheckProducts.map(item => {
          // 将其格式{value：'NewYork'}变成['NewYork'],方便使用indexOf进行判断
          return (item = item.productId)
        })

        // 过滤出newList里面需要显示的数据
        newList = newList.filter(item => {
          // 当前下拉框的选中的数据需要显示
          // val就是当前下拉框选中的值
          if (val === item.id) {
            return item
          } else {
            // 再判断在arr这个数组中是不是有这个数据，如果不在，说明是需要显示的
            if (arr.indexOf(item.id) === -1) {
              return item
            }
          }
        })
        // 返回Options显示数据
        return newList
      }
    }
  },
  created() {
    getWareHouseInfoLists({}).then(res => {
      this.warehouseIdLists = res.data
    })
    getProductList({ status: 3 }).then(res => {
      this.shopeLists = res.data
    })
  },
  methods: {
    exportPrint() {
      this.$print(this.$refs.print)
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
          v.stockPrice = this.productLists[j].productSpecStock.lastPrice
          v.stockNum = this.productLists[j].productSpecStock.stockCount
        }
      }
    },
    // 根据选择仓库查出该仓库已有商品
    wareHouseChange(val) {
      for (var s = 0; s < this.warehouseIdLists.length; s++) {
        if (val === this.warehouseIdLists[s].id) {
          this.addInventoryForm.merchantId = this.warehouseIdLists[s].useMerchantId
          getUserList(this.addInventoryForm.merchantId).then(res => {
            this.userList = res.data
          })
        }
      }
      this.addInventoryForm.stockcheckProducts = []
      const data = {
        warehouseId: val
      }
      getInventoryNoList(data).then(res => {
        if (res.code === '0') {
          const newArr = []
          const parentArr = res.data
          for (const i in parentArr) {
            for (const j in parentArr[i].productSpecRequestList) {
              const obj = {
                productName: parentArr[i].title,
                productId: parentArr[i].productSpecRequestList[j].productId,
                specName: parentArr[i].productSpecRequestList[j].productSpecs,
                specId: parentArr[i].productSpecRequestList[j].productSpecStock !== null ? parentArr[i].productSpecRequestList[j].productSpecStock.specId : '',
                stockNum: parentArr[i].productSpecRequestList[j].productSpecStock !== null ? parentArr[i].productSpecRequestList[j].productSpecStock.stockCount : '',
                checkNum: '',
                remarks: '',
                stockPrice: parentArr[i].productSpecRequestList[j].productSpecStock !== null ? parentArr[i].productSpecRequestList[j].productSpecStock.lastPrice : ''
              }
              newArr.push(obj)
            }
          }
          console.log(newArr)
          this.checkProductsListLength = newArr.length
          this.addInventoryForm.stockcheckProducts = newArr
        } else {
          this.$notify.error({
            title: '请求失败',
            message: res.msg
          })
        }
      })
    },
    // 添加商品
    addShop() {
      this.addInventoryForm.stockcheckProducts.push({
        productName: '',
        productId: '', // 商品id
        specName: '',
        specId: '', // 规格id
        stockNum: '', // 库存数
        checkNum: '', // 盘点数
        remarks: '', // 备注
        stockPrice: ''// 上次进价
      })
    },
    // 移除商品
    delShop(v, i) {
      if ((this.addInventoryForm.stockcheckProducts.length - this.checkProductsListLength) !== 0) {
        this.addInventoryForm.stockcheckProducts.splice(i, 1)
      }
    },
    shopSave() {
      this.$refs['addInventoryForm'].validate(valid => {
        if (valid) {
          const oldArr = this.addInventoryForm.stockcheckProducts
          for (const i in oldArr) {
            delete oldArr[i].productName
            delete oldArr[i].specName
          }
          this.addInventoryForm.stockcheckProducts = oldArr
          this.addInventoryForm.status = 1
          console.log(this.addInventoryForm)
          addInventoryNum(this.addInventoryForm).then(res => {
            if (res.code === '0') {
              this.$notify.success({
                title: '保存成功',
                message: '已加入草稿箱'
              })
              this.$refs['addInventoryForm'].resetFields()
              this.addInventoryForm.stockcheckProducts = []
            } else {
              this.$notify.error({
                title: '保存失败',
                message: res.msg
              })
            }
          })
        }
      })
    },
    shopSaveSubmit() {
      this.$refs['addInventoryForm'].validate(valid => {
        if (valid) {
          const oldArr = this.addInventoryForm.stockcheckProducts
          for (const i in oldArr) {
            delete oldArr[i].productName
            delete oldArr[i].specName
          }
          this.addInventoryForm.stockcheckProducts = oldArr
          this.addInventoryForm.status = 2
          console.log(this.addInventoryForm)
          addInventoryNum(this.addInventoryForm).then(res => {
            if (res.code === '0') {
              this.$notify.success({
                title: '保存并提交成功',
                message: '已加入审核'
              })
              this.$refs['addInventoryForm'].resetFields()
              this.addInventoryForm.stockcheckProducts = []
            } else {
              this.$notify.error({
                title: '保存并提交失败',
                message: res.msg
              })
            }
          })
        }
      })
    },
    exportExcel() {
      var data = {
        warehouseId: this.addInventoryForm.warehouseId
      }
      exportList(data).then(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel,charset=utf-8' })
        const fileName = '盘点单.xlsx'
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = window.URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      }).catch(err => {
        this.$notify.error({
          title: '导出失败',
          message: err.response.data.message
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
  /deep/.order-shop .el-input {
    width: 170px;
  }
  .down-order-shop{
    margin-top: 20px;
  }
  /deep/.table-form .el-table__body .el-table__row td .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
</style>

<template>
  <div class="order-review">
    <div class="head-container">
      <el-select
        class="filter-item"
        size="small"
        v-model="useMerchantId"
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
      <el-select
        v-model="supplierId"
        class="filter-item"
        size="small"
        clearable
        placeholder="选择供货商搜索"
        @focus="getSupplier"
      >
        <el-option
          v-for="item in supplierLists"
          :key="item.id"
          :label="item.supplierName"
          :value="item.id"
        />
      </el-select>
      <el-input
        v-model="shopId"
        clearable
        size="small"
        placeholder="输入采购单号搜索"
        style="width: 200px;"
        class="filter-item"
        @input="numValid('shopId')"
      />
      <el-select
        v-model="type"
        class="filter-item"
        size="small"
        clearable
        placeholder="选择审核状态搜索"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="startOrderCreatedTime"
        default-time="00:00:00"
        type="datetime"
        size="small"
        class="date-item"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="开始日期"
      />
      <el-date-picker
        v-model="endOrderCreatedTime"
        default-time="23:59:59"
        type="datetime"
        size="small"
        class="date-item"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="结束日期"
      />
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="reviewSearch">搜索</el-button>
    </div>
    <el-table ref="table" v-loading="reviewLoading" :data="reviewData" style="width: 100%;">
      <el-table-column show-overflow-tooltip property="tradeTime" label="制单日期" />
      <el-table-column show-overflow-tooltip property="id" label="采购单号" />
      <el-table-column show-overflow-tooltip property="warehouseDesc" label="仓库" />
      <el-table-column show-overflow-tooltip property="supplierDesc" label="供应商名称" />
      <el-table-column show-overflow-tooltip property="userName" label="负责人" />
      <el-table-column show-overflow-tooltip property="totalPrice" label="采购总价" />
      <el-table-column show-overflow-tooltip property="orderPrice" label="应付金额" />
      <el-table-column show-overflow-tooltip property="payPrice" label="已付金额" />
      <el-table-column show-overflow-tooltip property="payStatusDesc" label="支付状态" />
      <el-table-column show-overflow-tooltip property="statusDesc" label="审核状态" />
      <el-table-column label="操作" width="400px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1" size="mini" type="primary" @click="draftsUpdata(scope.$index, scope.row)">提交审核</el-button>
          <!--          <el-button v-if="(scope.row.status === 2 || scope.row.status === 3) && scope.row.payFlag === '1'" size="mini" type="primary" @click="reviewUpdata(scope.$index, scope.row)">审核</el-button>-->
          <el-button v-if="scope.row.status === 2 || scope.row.status === 3" size="mini" type="primary" @click="reviewUpdata(scope.$index, scope.row)">审核</el-button>
          <el-button size="mini" type="info" @click="reviewDetail(scope.$index, scope.row)">商品详情</el-button>
          <el-button v-if="scope.row.status === 4" size="mini" type="primary" @click="wareDetail(scope.$index, scope.row)">入库</el-button>
          <el-button v-if="scope.row.payStatus === 2" size="mini" type="warning" @click="reviewConfirm(scope.$index, scope.row)">确认付款</el-button>
          <el-button
            v-if="scope.row.status===5"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="reviewCancel(scope.$index, scope.row)"
          >作废
          </el-button>
<!--          <el-button-->
<!--            v-else-->
<!--            size="mini"-->
<!--            type="danger"-->
<!--            icon="el-icon-delete"-->
<!--            @click="reviewDel(scope.$index, scope.row)"-->
<!--          >删除-->
<!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="reviewCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="reviewPageSize"
        layout="total, prev, pager, next"
        :total="reviewTotal"
        @size-change="reviewHandleSizeChange"
        @current-change="reviewHandleCurrentChange"
      />
    </div>
    <!--入库-->
    <el-dialog title="入库" :close-on-click-modal="false" :visible.sync="dialogShopWareVisible">
      <el-form ref="goWareForm" :model="goWareForm" class="demo-addForm table-form">
        <el-table v-loading="shopWareLoading" :data="goWareForm.ShopWareData">
          <el-table-column prop="warehouseId" label="仓库名称">
            <template slot-scope="scope">
              <el-form-item :prop="'ShopWareData.'+scope.$index + '.warehouseId'" :rules="[{ required: true, message: '请选择仓库', trigger: 'change' }]">
                <el-select
                  :disabled="true"
                  v-model="scope.row.warehouseId"
                  clearable
                  placeholder="请选择仓库"
                  filterable
                  size="mini"
                >
                  <el-option
                    v-for="item in wareOptions"
                    :key="item.id"
                    :label="item.warehouseName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center" property="productName" label="商品名称" />
          <el-table-column align="center" property="specDesc" label="商品规格" />
          <el-table-column align="center" property="unit" label="单位" />
          <el-table-column align="center" property="price" label="商品单价" />
          <el-table-column align="center" property="productNum" label="商品数量" />
          <el-table-column align="center" property="totalPrice" label="商品总价" />
        </el-table>
      </el-form>
      <el-button style="float: right;margin-top: 5px;" size="mini" type="primary" @click="confirmHowWare">确认入库</el-button>
      <div class="block">
        <el-pagination
          :current-page="shopWareCurrentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="shopWarePageSize"
          layout="total, prev, pager, next"
          :total="shopWareTotal"
          @size-change="shopWareHandleSizeChange"
          @current-change="shopWareHandleCurrentChange"
        />
      </div>
    </el-dialog>
    <!--    确认付款-->
    <el-dialog title="确认付款" width="30%" :visible.sync="dialogShopReviewConfirmVisible" :close-on-click-modal="false" @close="shopReviewCancel">
      <el-form ref="reviewConfirmform" :model="reviewConfirmform" :rules="rules" label-width="120px">
        <el-form-item label="付款金额" prop="payPrice">
          <el-input
            v-model="reviewConfirmform.payPrice"
            style="width:150px"
            :placeholder="holder"
            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
          />
        </el-form-item>
        <el-form-item label="摘要" prop="remarks">
          <el-input v-model="reviewConfirmform.remarks" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="付款凭证">
          <el-upload
            ref="upload"
            action="/"
            :http-request="licenseAdd"
            :limit="1"
            :file-list="licenseList"
            :on-exceed="licenseExceed"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :on-remove="licenseRemove"
          >
            <em class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shopReviewCancel">取 消</el-button>
        <el-button type="primary" @click="shopReviewConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!--商品详情-->
    <el-dialog title="采购商品详情" :visible.sync="dialogShopReviewVisible" :close-on-click-modal="false">
      <el-table v-loading="shopReviewLoading" :data="ShopReviewData">
        <el-table-column align="center" property="productId" label="商品编号" />
        <el-table-column align="center" property="productName" label="商品名称" />
        <el-table-column align="center" property="specDesc" label="商品规格" />
        <el-table-column align="center" property="unit" label="单位" />
        <el-table-column align="center" property="price" label="商品单价" />
        <el-table-column align="center" property="productNum" label="商品数量" />
        <el-table-column align="center" property="totalPrice" label="商品总价" />
        <el-table-column align="center" property="remarks" label="备注" />
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="shopReviewCurrentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="shopReviewPageSize"
          layout="total, prev, pager, next"
          :total="shopReviewTotal"
          @size-change="shopReviewHandleSizeChange"
          @current-change="shopReviewHandleCurrentChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderReview, editShopReview, getShopReviewDetail, delShopReview, putShopReviewImg } from '@/api/purchaseSaleInventory/orderReview'
import { getWareHouseInfoLists } from '@/api/purchaseSaleInventory/inventory'
import { statusListss } from '@/api/order/order'
import { sysfileAdds } from '@/api/upload'
import { getShop, enterhouse } from '@/api/purchaseSaleInventory/shopPurchase'
import { getmerchantLists } from '@/api/purchaseSaleInventory/warehouseManage'
export default {
  name: 'OrderReview',
  data() {
    return {
      useMerchantId: '',
      merchantRemoteLoading: false,
      reviewLoading: false,
      reviewData: [],
      reviewCurrentPage: 1,
      reviewPageSize: 10,
      reviewTotal: 0,
      shopId: '',
      supplierId: '',
      startOrderCreatedTime: '',
      endOrderCreatedTime: '',
      nowTime: new Date().getFullYear() + '-' +
                    ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
                    (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' 23:59:59',
      pretermitTime: new Date().getFullYear() + '-' +
                    ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' +
                    (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + ' 00:00:00',
      typeOptions: [],
      type: null,
      // 商品详情
      dialogShopWareVisible: false,
      shopWareLoading: false,
      goWareForm: {
        ShopWareData: []
      },
      wareOptions: [],
      shopWareCurrentPage: 1,
      shopWarePageSize: 10,
      shopWareTotal: 0,
      // 入库
      dialogShopReviewConfirmVisible: false,
      reviewConfirmform: {
        payPrice: '',
        remarks: '',
        stockInfoId: '',
        orderPrice: '',
        oldPayPrice: ''
      },
      licenseList: [],
      rules: {
        payPrice: [{ required: true, message: '请输入付款金额', trigger: 'blur' }],
        remarks: [{ required: true, message: '请输入摘要内容', trigger: 'blur' }]
      },
      // 商品详情
      dialogShopReviewVisible: false,
      shopReviewLoading: false,
      ShopReviewData: [],
      shopReviewCurrentPage: 1,
      shopReviewPageSize: 10,
      shopReviewTotal: 0,
      holder: '',
      supplierLists: [],
      merchantList: [],
      afterMerchantList: [],
    }
  },
  created() {
    this.reviewLoading = true
    this.startOrderCreatedTime = this.pretermitTime
    this.endOrderCreatedTime = this.nowTime
    statusListss({}).then(res => {
      this.typeOptions = res.data
    })
    getWareHouseInfoLists({}).then(res => {
      this.wareOptions = res.data
    })
  },
  mounted() {
      this.initData()
  },
  methods: {
    //根据选择商家得到供应商列表
    getSupplier(){
        if (this.useMerchantId){
            getShop({merchantId:this.useMerchantId}).then(res => {
                this.supplierLists = res.data
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
    getReview(n1, n2) {
      this.reviewLoading = true
      var pageSize = n1
      var pageNo = n2
      const data = {
        supplierId: this.supplierId,
        status: this.type,
        stockType: 1,
        id: parseInt(this.shopId),
        startCreatedTime: this.startOrderCreatedTime !== '' ? this.startOrderCreatedTime : this.pretermitTime,
        endCreatedTime: this.endOrderCreatedTime !== '' ? this.endOrderCreatedTime : this.nowTime
      }
      getOrderReview(pageNo, pageSize, data).then(res => {
        if (res.code === '0') {
          this.reviewData = res.data.resultList
          this.reviewTotal = res.data.totalCount
          this.reviewLoading = false
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 搜索
    reviewSearch() {
      this.getReview(10, 1)
    },
    // 入库
    wareDetail(index, row) {
      this.dialogShopWareVisible = true
      this.shopWareLoading = true
      this.tableRowId = row.id
      this.getShopWareDetail(10, 1, row.id)
    },
    // 商品详情
    reviewDetail(index, row) {
      this.dialogShopReviewVisible = true
      this.shopReviewLoading = true
      this.tableRowId = row.id
      this.getShopReviewDetail(10, 1, row.id)
    },
    // 商品详情
    getShopReviewDetail(n1, n2, Id) {
      var pageSize = n1
      var pageNo = n2
      const data = {
        stockInfoId: Id
      }
      getShopReviewDetail(pageNo, pageSize, data).then(res => {
        if (res.code === '0') {
          this.ShopReviewData = res.data.resultList
          this.shopReviewTotal = res.data.totalCount
          this.shopReviewLoading = false
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    // 审核
    reviewUpdata(index, row) {
      this.$confirm('审核是否通过?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是，审核通过',
        cancelButtonText: '否，审核未通过',
        type: 'warning',
        center: true
      }).then(() => {
        editShopReview(row.id, 4).then(res => {
          this.getReview(10, 1)
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        }).catch(err => {
          this.$notify({
            title: '警告',
            message: err.msg,
            type: 'warning'
          })
        })
      }).catch(action => {
        if (action === 'cancel') {
          editShopReview(row.id, 3).then(res => {
            this.getReview(10, 1)
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          }).catch(err => {
            this.$notify({
              title: '警告',
              message: err.msg,
              type: 'warning'
            })
          })
        } else {
          this.$message({
            type: 'info',
            message: '取消审核'
          })
        }
      })
    },
    // 确认付款
    reviewConfirm(index, row) {
      this.licenseList = []
      this.dialogShopReviewConfirmVisible = true
      this.reviewConfirmform.stockInfoId = row.id
      this.reviewConfirmform.orderPrice = row.orderPrice
      this.reviewConfirmform.oldPayPrice = row.payPrice
      this.holder = '还差' + (parseFloat(this.reviewConfirmform.orderPrice) - parseFloat(this.reviewConfirmform.oldPayPrice)) + '元未付'
    },
    // 选择文件
    licenseAdd(licenseList) {
      const myfile = licenseList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData)
        .then(
          function(response) {
            var license = {
              'type': 2,
              'name': response.data.fileName,
              'key': response.data.key,
              'size': response.data.size,
              'url': response.data.url
            }
            _this.licenseList.push(license)
          })
    },
    licenseExceed(licenseList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.licenseList = licenseList
    },
    // 凭证提交
    licenseRemove(licenseList) {
      const _this = this
      _this.licenseList = []
    },
    //  确认付款确定
    shopReviewConfirm() {
      this.$refs['reviewConfirmform'].validate(valid => {
        if (valid) {
          if (parseFloat(this.reviewConfirmform.payPrice) > (parseFloat(this.reviewConfirmform.orderPrice) - parseFloat(this.reviewConfirmform.oldPayPrice))) {
            this.reviewConfirmform.payPrice = 0
            this.$message({
              message: '付款金额不能大于应付金额',
              type: 'warning'
            })
          } else {
            if (this.licenseList.length !== 0) {
              const data = {
                payPrice: Number(this.reviewConfirmform.payPrice),
                remarks: this.reviewConfirmform.remarks,
                stockInfoId: this.reviewConfirmform.stockInfoId,
                evidenceImg: this.licenseList[0].key
              }
              console.log(data)
              putShopReviewImg(data).then(res => {
                if (res.code === '0') {
                  this.$message({
                    message: '确认付款成功',
                    type: 'success'
                  })
                  this.dialogShopReviewConfirmVisible = false
                  this.getReview(10, 1)
                  this.$refs['reviewConfirmform'].resetFields()
                  this.licenseList = []
                } else {
                  this.$notify({
                    title: '警告',
                    message: res.msg,
                    type: 'error'
                  })
                }
              })
            } else {
              this.$message.error('请上传付款凭证')
            }
          }
        }
      })
    },
    //  确认付款取消
    shopReviewCancel() {
      this.dialogShopReviewConfirmVisible = false
      this.$refs['reviewConfirmform'].resetFields()
      this.licenseList = []
    },
    reviewCancel(index, row) {
      this.$confirm('此操作将作废该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        editShopReview(row.id, 6).then(res => {
          if (res.code === '0') {
            this.getReview(10, 1)
            this.$message.success('操作成功')
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch(err => {
          this.$notify({
            title: '警告',
            message: err.msg,
            type: 'warning'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 作废
    reviewDel(index, row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delShopReview(row.id).then(res => {
          if (res.code === '0') {
            this.getReview(10, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        }).catch(err => {
          console.log(err.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 入库
    getShopWareDetail(n1, n2, Id) {
      var pageSize = n1
      var pageNo = n2
      const data = {
        stockInfoId: Id
      }
      getShopReviewDetail(pageNo, pageSize, data).then(res => {
        if (res.code === '0') {
          const newArr = res.data.resultList
          for (const i in newArr) {
            if (newArr[i].warehouseId === 0) {
              newArr[i].warehouseId = ''
            }
          }
          this.goWareForm.ShopWareData = newArr
          this.shopWareTotal = res.data.totalCount
          this.shopWareLoading = false
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    //  确认入库
    confirmHowWare() {
      this.$refs['goWareForm'].validate(valid => {
        if (valid) {
          enterhouse(this.tableRowId, this.goWareForm.ShopWareData).then(res => {
            if (res.code === '0') {
              this.dialogShopWareVisible = false
              this.getReview(10, 1)
              this.$message({
                type: 'success',
                message: '入库成功!'
              })
            } else {
              this.$notify({
                title: '警告',
                message: res.msg,
                type: 'warning'
              })
            }
          })
        }
      })
    },
    //  提交审核
    draftsUpdata(index, row) {
      this.$confirm('此操作将提交审核, 是否继续?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true
      }).then(() => {
        editShopReview(row.id, 2).then(res => {
          if (res.code === '0') {
            this.getReview(10, 1)
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          } else {
            this.$notify({
              title: '警告',
              message: res.msg,
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    reviewHandleSizeChange(val) {
      this.reviewPageSize = val
      this.getReview(val, 1)
      console.log(`每页 ${val} 条`)
      this.reviewCurrentPage = 1
    },
    reviewHandleCurrentChange(val) {
      this.reviewCurrentPage = val
      this.getReview(10, val)
      console.log(`当前页: ${val}`)
    },
    shopWareHandleSizeChange(val) {
      this.shopWareLoading = true
      this.shopWarePageSize = val
      this.getShopWareDetail(val, 1, this.tableRowId)
      console.log(`每页 ${val} 条`)
      this.shopWareCurrentPage = 1
    },
    shopWareHandleCurrentChange(val) {
      this.shopWareLoading = true
      this.shopWareCurrentPage = val
      this.getShopWareDetail(10, val, this.tableRowId)
      console.log(`当前页: ${val}`)
    },
    shopReviewHandleSizeChange(val) {
      this.shopReviewLoading = true
      this.shopReviewPageSize = val
      this.getShopReviewDetail(val, 1, this.tableRowId)
      console.log(`每页 ${val} 条`)
      this.shopReviewCurrentPage = 1
    },
    shopReviewHandleCurrentChange(val) {
      this.shopReviewLoading = true
      this.shopReviewCurrentPage = val
      this.getShopReviewDetail(10, val, this.tableRowId)
      console.log(`当前页: ${val}`)
    },
    numValid(val) {
      // 只能输入数字
      this[val] = this[val].replace(/[^0-9]/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/.table-form .el-table__body .el-table__row td .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
</style>

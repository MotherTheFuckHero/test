<template>
  <div class="app-container">
    <div class="head-container">
      <el-input v-model="warehouseId" clearable size="small" placeholder="输入仓库编号搜索" style="width: 200px;" class="filter-item" />
      <el-input v-model="warehouseName" clearable size="small" placeholder="输入仓库名称搜索" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchWarehouse">搜索</el-button>
    </div>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="dialogWarehouseVisible = true">新增</el-button>
    <el-table ref="table" v-loading="warehouseLoading" :data="warehouseData" style="width: 100%;" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column show-overflow-tooltip align="center" prop="id" label="编号" />
      <el-table-column show-overflow-tooltip align="center" prop="warehouseName" label="仓库名称" />
      <el-table-column show-overflow-tooltip align="center" prop="useMerchantName" label="使用商家" />
      <el-table-column show-overflow-tooltip align="center" prop="lon" label="经度" />
      <el-table-column show-overflow-tooltip align="center" prop="lat" label="纬度" />
      <el-table-column show-overflow-tooltip align="center" prop="warehouseAddress" label="仓库位置" />
      <el-table-column show-overflow-tooltip align="center" prop="statusName" label="仓库状态" />
      <el-table-column show-overflow-tooltip align="center" prop="warehouseType" label="仓库类型">
        <template slot-scope="scope">
          {{ scope.row.warehouseType === 0?"仓库":scope.row.warehouseType === 1?"仓位":"" }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="remark" label="备注" />
      <el-table-column label="创建人" prop="createdUserName" />
      <el-table-column label="创建时间" prop="createdTime" />
      <el-table-column label="修改人" prop="updatedUserName" />
      <el-table-column label="修改时间" prop="updatedTime" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="editWarehouse(scope.$index,scope.row)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delWarehouse(scope.$index,scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增仓库" :visible.sync="dialogWarehouseVisible" :close-on-click-modal="false" width="680px" @close="addCancelDialog('form')">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="仓库名称" prop="warehouseName">
          <el-input v-model="form.warehouseName	" style="width: 200px" />
        </el-form-item>
<!--        <el-form-item label="仓库编号" prop="numbering">-->
<!--          <el-input v-model="form.numbering	" style="width: 200px" />-->
<!--        </el-form-item>-->
        <el-form-item label="仓库类型" prop="warehouseType">
          <el-select v-model="form.warehouseType" clearable filterable style="width: 200px;" placeholder="类型">
            <el-option
              v-for="item in warehouseTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库状态" prop="status">
          <el-select v-model="form.status" clearable filterable style="width: 200px;" placeholder="状态">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="使用商家" prop="useMerchantId">
          <el-select
            @change="MerchantIdchange"
            v-model="form.useMerchantId"
            clearable
            filterable
            remote
            reserve-keyword
            style="width: 200px;"
            placeholder="使用商家"
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
<!--        <el-form-item label="仓库负责人" prop="userId">-->
<!--          <el-select v-model="form.userId" size="mini" style="width: 200px" clearable placeholder="请选择负责人" @focus="getUser">-->
<!--            <el-option-->
<!--              v-for="item in userList"-->
<!--              :key="item.id"-->
<!--              :label="item.userName"-->
<!--              :value="item.id"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="经度" prop="lon">
          <el-input v-model.number="form.lon" style="width: 200px" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model.number="form.lat" style="width: 200px" />
        </el-form-item>
        <el-form-item label="仓库位置" prop="warehouseAddress">
          <el-input id="address" v-model="form.warehouseAddress" style="width: 505px;" placeholder="根据经纬度自动生成" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" style="width: 505px;" />
        </el-form-item>
        <el-form-item v-if="form.warehouseType === 1" label="父级仓库" prop="parentid">
          <el-select v-model="form.parentid" clearable filterable style="width: 505px;" placeholder="仓库" @change="getChildWare">
            <el-option
              v-for="item in parentWareList"
              :key="item.id"
              :label="item.warehouseName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键字搜索">
          <el-input id="tipinput" v-model="locationMsg.keyword" style="width:505px;" placeholder="所在地址模糊搜索" />
        </el-form-item>

        <div id="container" class="mymap" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="addCancelDialog('form')">取消</el-button>
        <el-button type="primary" @click="addConfirmDialog('form')">确认</el-button>
      </div>
    </el-dialog>
    <eForm ref="eForm" />
  </div>
</template>

<script>
import { getmerchantLists, getWareHouseInfoLists, addWareHouse, delWareHouse, WarehouseTypeEnumList } from '@/api/purchaseSaleInventory/warehouseManage'
import { getUserList } from '@/api/purchaseSaleInventory/shopPurchase'
import eForm from './form'
import MapLoader from '@/api/aMap'
export default {
  name: '仓库管理',
  components: { eForm },
  data() {
    return {
      merchantRemoteLoading: false,
      warehouseId: '',
      warehouseName: '',
      warehouseLoading: false,
      warehouseData: [],
      dialogWarehouseVisible: false,
      form: {
        merchantId: 0,
        warehouseName: '',
        // numbering: '', //仓库编号
        // userId: '', //仓库负责人
        warehouseAddress: '',
        status: null,
        lon: '',
        lat: '',
        provinceId: 0,
        cityId: 0,
        areaId: 0,
        warehouseType: null,
        remark: '',
        parentid: 0,
        useMerchantId: ''
      },
      statusList: [
        {
          value: 0,
          name: '筹建中'
        },
        {
          value: 1,
          name: '未使用'
        },
        {
          value: 2,
          name: '使用中'
        }
      ],
      warehouseTypeList: [],
      parentWareList: [],
      rules: {
        warehouseName: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' }
        ],
          numbering: [
              { required: true, message: '请输入仓库编号', trigger: 'blur' }
          ],
        status: [
          { required: true, message: '请选择仓库状态', trigger: 'change' }
        ],
        warehouseType: [
          { required: true, message: '请选择仓库类型', trigger: 'change' }
        ],
        warehouseAddress: [
          { required: true, message: '请输入仓库地址', trigger: 'blur' }
        ],
        userId: [
            { required: true, message: '请选择负责人', trigger: 'blur' }
        ],
        lon: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        lat: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ],
        parentid: [
          { required: true, message: '请选择所属父级仓库', trigger: 'change' }
        ],
        useMerchantId: [
          { required: true, message: '请选择使用该仓库的商家', trigger: 'change' }
        ]
      },
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      },
      merchantList: [],
      afterMerchantList: [],
      map: null,
      userList: [],
    }
  },
  created() {
    this.getList(10, 1)
    getWareHouseInfoLists(1, 1000, {}).then(res => {
      this.parentWareList = res.data
    })
    WarehouseTypeEnumList().then(res => {
      this.warehouseTypeList = res.data
    })
  },
  updated() {
    if (this.locationMsg.keyword !== '' || this.locationMsg.lnglat !== '') return
    MapLoader().then(AMap => {
      setTimeout(() => {
        var _this = this
        _this.map = new AMap.Map('container', {
          zoom: 9,
          resizeEnable: true,
          keyboardEnable: false
        })
        // 为地图注册click事件获取鼠标点击出的经纬度坐标
        _this.map.on('click', function(e) {
          _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
          _this.form.lon = e.lnglat.getLng()
          _this.form.lat = e.lnglat.getLat()
        })
        // 输入搜索和点击获取经纬度
        AMap.plugin(
          ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'],
          function() {
            // 回调函数
            // 实例化Autocomplete  输入搜索
            var autoOptions = {
              input: 'tipinput' // 使用联想输入的input的id
            }
            var autocomplete = new AMap.Autocomplete(autoOptions)
            // 点击获取经纬度
            var placeSearch = new AMap.PlaceSearch({
              map: _this.map
            })
            AMap.event.addListener(autocomplete, 'select', function(e) {
              // TODO 针对选中的poi实现自己的功能
              placeSearch.setCity(e.poi.adcode)
              placeSearch.search(e.poi.name)
            }) // 注册监听，当选中某条记录时会触发

            // 点击设置地址
            var geocoder = new AMap.Geocoder({
              map: _this.map
            })
            _this.map.on('click', function(e) {
              geocoder.getAddress(e.lnglat, function(status, result) {
                // 判断是否存在位置信息
                if (status === 'complete') {
                  _this.form.warehouseAddress = result.regeocode.formattedAddress
                } else {
                  _this.form.warehouseAddress = ''
                  _this.$message.error('无法获取当前位置信息')
                }
              })
            })
            if (_this.form.lon !== '' && _this.form.lat !== '') {
              _this.map.setCenter([_this.form.lon, _this.form.lat])
              geocoder.getAddress([_this.form.lon, _this.form.lat], function(status, result) {
                // 判断是否存在位置信息
                if (status === 'complete') {
                  _this.form.warehouseAddress = result.regeocode.formattedAddress
                } else {
                  _this.form.warehouseAddress = ''
                  _this.$message.error('无法获取当前位置信息')
                }
              })
              _this.map.setZoom(15)
            }
          }
        )
      }, 500)
    })
  },
  mounted() {
    this.initData()
  },
  methods: {
    getUser(){
        if (this.form.useMerchantId){
            getUserList({merchantId:this.form.useMerchantId}).then(res => {
                this.userList = res.data
            })
        }else{
            this.$message.warning('请先选择商家')
        }
    },
    MerchantIdchange(val){
        this.form.merchantId=val
    },
    getChildWare(val) {
      for (const i in this.parentWareList) {
        if (val === this.parentWareList[i].id) {
          this.form.lon = this.parentWareList[i].lon
          this.form.lat = this.parentWareList[i].lat
        }
      }
    },
    searchWarehouse() {
      this.getList(10, 1)
    },
    getList(n1, n2) {
      this.warehouseLoading = true
      var pageSize = n1
      var pageNo = n2
      const data = {
        id: this.warehouseId,
        warehouseName: this.warehouseName
      }
      getWareHouseInfoLists(pageNo, pageSize, data).then(res => {
        if (res.code === '0') {
          this.warehouseLoading = false
          this.warehouseData = res.data
        } else {
          this.warehouseLoading = false
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    addConfirmDialog(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          addWareHouse(this.form).then(res => {
            if (res.code === '0') {
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success'
              })
              this.dialogWarehouseVisible = false
              this.form = {
                merchantId: 0,
                warehouseName: '',
                warehouseAddress: '',
                status: null,
                lon: '',
                lat: '',
                provinceId: 0,
                cityId: 0,
                areaId: 0,
                warehouseType: null,
                remark: '',
                parentid: 0,
                useMerchantId: ''
              }
              this.map.destroy()
              this.getList(10, 1)
              getWareHouseInfoLists(1, 1000, {}).then(res => {
                this.parentWareList = res.data
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
    addCancelDialog(form) {
      this.$refs[form].resetFields()
      this.form = {
        merchantId: 0,
        warehouseName: '',
        warehouseAddress: '',
        status: null,
        lon: '',
        lat: '',
        provinceId: 0,
        cityId: 0,
        areaId: 0,
        warehouseType: null,
        remark: '',
        parentid: 0,
        useMerchantId: ''
      }
      this.map.destroy()
      this.dialogWarehouseVisible = false
    },
    delWarehouse(index, row) {
      this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delWareHouse(row.id).then(res => {
          if (res.code === '0') {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            this.getList(10, 1)
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
          message: '已取消删除'
        })
      })
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
    editWarehouse(index, row) {
      let newList = []
      getWareHouseInfoLists(1, 1000, {}).then(res => {
        newList = res.data
        this.$refs.eForm.dialogEdit(row, newList)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-form-item{
    display: inline-block;
  }
</style>
<style>
  .mymap {
    width: 100%;
    height: 500px;
  }
  .amap-sug-result {
    z-index: 4000!important;
  }
  #tangram-suggestion--TANGRAM__u-main{
    z-index: 3000!important;
  }
</style>

<template>
  <el-dialog title="修改仓库" :visible.sync="dialogWarehouseVisible" :close-on-click-modal="false" width="680px" @close="editCancelDialog('editForm')">
    <el-form ref="editForm" :model="editForm" :rules="rules" size="small" label-width="100px">
      <el-form-item label="仓库名称" prop="warehouseName">
        <el-input v-model="editForm.warehouseName	" style="width: 200px" />
      </el-form-item>
<!--      <el-form-item label="仓库编号" prop="numbering">-->
<!--        <el-input v-model="editForm.numbering	" style="width: 200px" />-->
<!--      </el-form-item>-->
      <el-form-item label="仓库类型" prop="warehouseType">
        <el-select v-model="editForm.warehouseType" clearable filterable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in warehouseTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="仓库状态" prop="status">
        <el-select v-model="editForm.status" clearable filterable style="width: 200px;" placeholder="状态">
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
          v-model="editForm.useMerchantId"
          clearable
          filterable
          style="width: 200px;"
          placeholder="使用商家"
        >
          <el-option
            v-for="item in afterMerchantList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="仓库负责人" prop="userId">-->
<!--        <el-select v-model="editForm.userId" size="mini" style="width: 200px" clearable placeholder="请选择负责人" @focus="getUser">-->
<!--          <el-option-->
<!--            v-for="item in userList"-->
<!--            :key="item.id"-->
<!--            :label="item.userName"-->
<!--            :value="item.id"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="经度" prop="lon">
        <el-input v-model.number="editForm.lon" style="width: 200px" />
      </el-form-item>
      <el-form-item label="纬度" prop="lat">
        <el-input v-model.number="editForm.lat" style="width: 200px" />
      </el-form-item>
      <el-form-item label="仓库位置" prop="warehouseAddress">
        <el-input id="address" v-model="editForm.warehouseAddress" style="width: 505px;" placeholder="根据经纬度自动生成" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="editForm.remark" style="width: 505px;" />
      </el-form-item>
      <el-form-item v-if="editForm.warehouseType === 1" label="父级仓库" prop="parentid">
        <el-select v-model="editForm.parentid" clearable filterable style="width: 505px;" placeholder="仓库" @change="getChildWare">
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
      <el-button type="text" @click="editCancelDialog('editForm')">取消</el-button>
      <el-button type="primary" @click="editConfirmDialog('editForm')">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getmerchantLists, editWareHouse, WarehouseTypeEnumList } from '@/api/purchaseSaleInventory/warehouseManage'
import MapLoader from '@/api/aMap'
import { getUserList } from '@/api/purchaseSaleInventory/shopPurchase'
export default {
  data() {
    return {
      dialogWarehouseVisible: false,
      editForm: {
        merchantId: 0,
        warehouseName: '',
        warehouseAddress: '',
        // numbering: '', //仓库编号
        // userId: '', //仓库负责人
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
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
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
          userId: [
              { required: true, message: '请选择负责人', trigger: 'blur' }
          ],
        warehouseType: [
          { required: true, message: '请选择仓库类型', trigger: 'change' }
        ],
        warehouseAddress: [
          { required: true, message: '请输入仓库地址', trigger: 'blur' }
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
      afterMerchantList: [],
      editWarehouseId: '',
      allOrds: [],
      map: null,
        userList: [],
    }
  },
  created() {
    getmerchantLists({ status: 3 }).then(res => {
      if (res.code === '0') {
        this.allOrds = res.data
        this.afterMerchantList = this.allOrds.map(item => {
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
    WarehouseTypeEnumList().then(res => {
      this.warehouseTypeList = res.data
    })
  },
  updated() {
    if (this.locationMsg.keyword !== '' || this.locationMsg.lnglat !== '') return
    MapLoader().then(AMap => {
      setTimeout(() => {
        var _this = this
        // var windowsArr = []
        // var marker = [];
        _this.map = new AMap.Map('container', {
          zoom: 9,
          resizeEnable: true,
          keyboardEnable: false
        })
        if (_this.editForm.lon !== '' && _this.editForm.lat !== '') {
          _this.map.setCenter([_this.editForm.lon, _this.editForm.lat])
          _this.map.setZoom(15)
        }
        // 为地图注册click事件获取鼠标点击出的经纬度坐标
        _this.map.on('click', function(e) {
          _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
          _this.editForm.lon = e.lnglat.getLng()
          _this.editForm.lat = e.lnglat.getLat()
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
                  _this.editForm.warehouseAddress = result.regeocode.formattedAddress
                } else {
                  _this.editForm.warehouseAddress = ''
                  _this.$message.error('无法获取当前位置信息')
                }
              })
            })
            if (_this.editForm.lon !== '' && _this.editForm.lat !== '') {
              _this.map.setCenter([_this.editForm.lon, _this.editForm.lat])
              geocoder.getAddress([_this.editForm.lon, _this.editForm.lat], function(status, result) {
                // 判断是否存在位置信息
                if (status === 'complete') {
                  _this.editForm.warehouseAddress = result.regeocode.formattedAddress
                } else {
                  _this.editForm.warehouseAddress = ''
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
  methods: {
      getUser(){
          if (this.editForm.useMerchantId){
              getUserList({merchantId:this.editForm.useMerchantId}).then(res => {
                  this.userList = res.data
              })
          }else{
              this.$message.warning('请先选择商家')
          }
      },
    MerchantIdchange(val){
        this.editForm.merchantId=val
    },
    getChildWare(val) {
      for (const i in this.parentWareList) {
        if (val === this.parentWareList[i].id) {
          this.editForm.lon = this.parentWareList[i].lon
          this.editForm.lat = this.parentWareList[i].lat
        }
      }
    },
    dialogEdit(row, newList) {
      this.parentWareList = newList
      this.dialogWarehouseVisible = true
      this.editForm.warehouseName = row.warehouseName
      this.editForm.warehouseAddress = row.warehouseAddress
      this.editForm.status = row.status
      this.editForm.lon = row.lon
      this.editForm.lat = row.lat
      this.editForm.warehouseType = row.warehouseType
      this.editForm.remark = row.remark
      this.editForm.parentid = row.parentid
      this.editForm.useMerchantId = row.useMerchantId
      this.editWarehouseId = row.id
    },
    editConfirmDialog(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          editWareHouse(this.editWarehouseId, this.editForm).then(res => {
            if (res.code === '0') {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              })
              this.dialogWarehouseVisible = false
              this.$refs[form].resetFields()
              this.editForm = {
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
              this.$parent.getList(10, 1)
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
    editCancelDialog(editForm) {
      this.$refs[editForm].resetFields()
      this.editForm = {
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
      this.dialogWarehouseVisible = false
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

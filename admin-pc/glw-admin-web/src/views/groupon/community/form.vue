<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="680px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="社区名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="所在区/县" prop="districtId">
        <el-select v-model="form.districtId" clearable filterable style="width: 200px;" placeholder="所在区/县">
          <el-option
            v-for="item in parentIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="经度" prop="lon">
        <el-input v-model.number="form.lon" style="width: 200px" />
      </el-form-item>
      <el-form-item label="纬度" prop="lat">
        <el-input v-model.number="form.lat" style="width: 200px" />
      </el-form-item>
      <el-form-item label="关键字搜索">
        <el-input id="tipinput" v-model="locationMsg.keyword" style="width:200px;" placeholder="所在地址模糊搜索" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" clearable filterable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在地址">
        <el-input id="address" v-model="locationMsg.address" style="width: 505px;" placeholder="根据经纬度自动生成" />
      </el-form-item>
      <div id="container" class="mymap" />
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="crud.cancelCU"
      >
        取消
      </el-button>
      <el-button
        :loading="crud.status.cu === 2"
        type="primary"
        @click="crud.submitCU"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
import { getcityLists } from '@/api/system/city'
import { getCommunityType } from '@/api/groupon/community'
import AMap from 'AMap'
const defaultForm = {
  id: null,
  name: '',
  districtId: '',
  type: '',
  lon: '',
  lat: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      },
      parentIdList: [],
      typeList: [],
      rules: {
        name: [
          { required: true, message: '请输入社区名称', trigger: 'blur' }
        ],
        districtId: [
          { required: true, message: '请选择所在区县', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        lon: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        lat: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const data = {
      status: 1,
      levelType: 3
    }
    const datas = {
    }
    getcityLists(data).then(res => {
      this.parentIdList = res.data
    })
    getCommunityType(datas).then(res => {
      this.typeList = res.data
    })
  },
  updated() {
    if (this.locationMsg.keyword !== '' || this.locationMsg.lnglat !== '') return
    this.loadmap()
  },
  methods: {
    // 地图js
    loadmap() {
      var _this = this
      // var windowsArr = []
      // var marker = [];
      var map = new AMap.Map('container', {
        zoom: 9,
        resizeEnable: true,
        keyboardEnable: false
      })
      if (this.form.lon !== '') {
        map.setCenter([this.form.lon, this.form.lat])
        map.setZoom(15)
      }
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
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
            map: map
          })
          AMap.event.addListener(autocomplete, 'select', function(e) {
            // TODO 针对选中的poi实现自己的功能
            placeSearch.setCity(e.poi.adcode)
            placeSearch.search(e.poi.name)
          }) // 注册监听，当选中某条记录时会触发

          // 点击设置地址
          var geocoder = new AMap.Geocoder({
            map: map
          })
          map.on('click', function(e) {
            geocoder.getAddress(e.lnglat, function(status, result) {
              // 判断是否存在位置信息
              if (status === 'complete') {
                _this.locationMsg.address = result.regeocode.formattedAddress
              } else {
                _this.locationMsg.address = ''
                _this.$message.error('无法获取当前位置信息')
              }
            })
          })
        }
      )
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

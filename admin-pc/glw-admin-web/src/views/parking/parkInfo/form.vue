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
      <el-form-item label="商家名称" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable style="width: 200px;" placeholder="商家名称">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="停车场名称" prop="parkName">
        <el-input v-model="form.parkName" style="width: 200px" />
      </el-form-item>
      <el-form-item label="经度" prop="parkLon">
        <el-input v-model.number="form.parkLon" style="width: 200px" />
      </el-form-item>
      <el-form-item label="纬度" prop="parkLat">
        <el-input v-model.number="form.parkLat" style="width: 200px" />
      </el-form-item>
      <el-form-item label="关键字搜索">
        <el-input id="tipinput" v-model="locationMsg.keyword" style="width:200px;" placeholder="所在地址模糊搜索" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable filterable style="width: 200px;" placeholder="状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="停车场图片" prop="parkPic">
        <el-upload
          v-model="form.parkPic"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.icon"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="所在地址">
        <el-input id="address" v-model="form.parkAddress" style="width: 505px;" placeholder="根据经纬度自动生成" />
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
import { getmerchantLists } from '@/api/merchant/merchant'
import { ParkInfoStatusLists } from '@/api/parking/parkInfo'
import { sysfileAdds } from '@/api/upload'
import AMap from 'AMap'
const defaultForm = {
  id: null,
  merchantId: '',
  parkName: '',
  parkAddress: '',
  status: 1,
  parkPic: '',
  fileList: [],
  parkLon: '',
  parkLat: ''
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
      merchantIdList: [],
      statusList: [],
      rules: {
        parkName: [
          { required: true, message: '请输入停车场名称', trigger: 'blur' }
        ],
        merchantId: [
          { required: true, message: '请选择所在商家', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        parkPic: [
          { required: true, message: '请添加停车场图片', trigger: 'blur' }
        ],
        parkAddress: [
          { required: true, message: '请输入停车场地址', trigger: 'blur' }
        ],
        parkLon: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        parkLat: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
    const data = {
    }
    ParkInfoStatusLists(data).then(res => {
      this.statusList = res.data
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
      if (this.form.parkLon !== '') {
        map.setCenter([this.form.parkLon, this.form.parkLat])
        map.setZoom(15)
      }
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
        _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        _this.form.parkLon = e.lnglat.getLng()
        _this.form.parkLat = e.lnglat.getLat()
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
                _this.form.parkAddress = result.regeocode.formattedAddress
              } else {
                _this.form.parkAddress = ''
                _this.$message.error('无法获取当前位置信息')
              }
            })
          })
        }
      )
    },

    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.fileList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.parkPic = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
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

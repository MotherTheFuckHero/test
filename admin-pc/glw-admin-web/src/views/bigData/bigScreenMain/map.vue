<template>
  <div style="padding:0.3rem 0.3rem 0.4rem">
    <div id="container" class="mymap" />
  </div>
</template>

<script>
import AMap from 'AMap'
import Img from '../../assets/newmap.png'
export default {
  name: 'Maps',
  data() {
    return {
      img: Img,
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      }
    }
  },
  mounted() {
    this.loadmap()
  },
  methods: {
    // 地图js
    loadmap() {
      var _this = this
      var imageLayer = new AMap.ImageLayer({
        url: this.img,
        bounds: new AMap.Bounds(
          [117.395364, 39.949033],
          [118.515969, 40.412258],
        ),
        zooms: [1, 20]
      })
      var map = new AMap.Map('container', {
        zoom: 11,
        resizeEnable: true,
        center: [117.968026, 40.184451],
        keyboardEnable: false
      })
      map.add(imageLayer)
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
        _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        console.log(_this.locationMsg.lnglat)
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

<style scoped>
  .mymap {
    padding: 0.7rem;
    height:11.2rem;
    min-width: 13.95rem;
    border-radius: 0.0625rem;
  }
  .amap-sug-result {
    z-index: 4000!important;
  }
  #tangram-suggestion--TANGRAM__u-main{
    z-index: 3000!important;
  }
</style>

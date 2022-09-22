<template>
  <div class="min-body">
    <div style="text-align: center;">
      <dv-decoration-7 style="height:0.3rem;font-size: 0.3rem">已接入景区</dv-decoration-7>
    </div>
    <div id="ChinaLineMap" />
  </div>
</template>

<script>
import 'echarts/map/js/china' // 引入中国地图
import { getbigData } from '@/api/bigData/dataManagement'
export default {
  data() {
    return {
      newDat: []/* 已经接入的省份*/
    }
  },
  mounted() {
    const type = 21
    getbigData(type).then(ress => {
      const code = ress.code
      if (code === '0') {
        for (var i = 0; i < ress.data.length; i++) {
          this.newDat.push({
            name: ress.data[i].name,
            value: Number(ress.data[i].value)
          })
        }
        this.loadChinaLineMap()
      }
    })
  },
  methods: {
    // 加载中国飞线地图
    loadChinaLineMap() {
      var newarray = []
      var echarts = require('echarts')
      var myCharts = echarts.init(document.getElementById('ChinaLineMap'))
      var geoCoordMap = {
        '黑龙江': [127.9688, 45.368],
        '内蒙古': [110.3467, 41.4899],
        '吉林': [125.8154, 44.2584],
        '北京': [116.4551, 40.2539],
        '辽宁': [123.1238, 42.1216],
        '河北': [114.4995, 38.1006],
        '天津': [117.4219, 39.4189],
        '山西': [112.3352, 37.9413],
        '陕西': [109.1162, 34.2004],
        '甘肃': [103.5901, 36.3043],
        '宁夏': [106.3586, 38.1775],
        '青海': [101.4038, 36.8207],
        '新疆': [87.9236, 43.5883],
        '西藏': [91.11, 29.97],
        '四川': [103.9526, 30.7617],
        '重庆': [108.384366, 30.439702],
        '山东': [117.1582, 36.8701],
        '河南': [113.4668, 34.6234],
        '江苏': [118.8062, 31.9208],
        '安徽': [117.29, 32.0581],
        '湖北': [114.3896, 30.6628],
        '浙江': [119.5313, 29.8773],
        '福建': [119.4543, 25.9222],
        '江西': [116.0046, 28.6633],
        '湖南': [113.0823, 28.2568],
        '贵州': [106.6992, 26.7682],
        '云南': [102.9199, 25.4663],
        '广东': [113.12244, 23.009505],
        '广西': [108.479, 23.1152],
        '海南': [110.3893, 19.8516],
        '上海': [121.4648, 31.2891],
        '台湾': [124.3430, 25.5630]
      }
      var geoCoordColor = [
        { name: '黑龙江', value: 1 },
        { name: '内蒙古', value: 2 },
        { name: '吉林', value: 3 },
        { name: '北京', value: 4 },
        { name: '辽宁', value: 5 },
        { name: '河北', value: 6 },
        { name: '天津', value: 7 },
        { name: '山西', value: 8 },
        { name: '陕西', value: 9 },
        { name: '甘肃', value: 10 },
        { name: '宁夏', value: 11 },
        { name: '青海', value: 12 },
        { name: '新疆', value: 13 },
        { name: '西藏', value: 14 },
        { name: '四川', value: 15 },
        { name: '重庆', value: 16 },
        { name: '山东', value: 17 },
        { name: '河南', value: 18 },
        { name: '江苏', value: 19 },
        { name: '安徽', value: 20 },
        { name: '湖北', value: 21 },
        { name: '浙江', value: 22 },
        { name: '福建', value: 23 },
        { name: '江西', value: 24 },
        { name: '湖南', value: 25 },
        { name: '贵州', value: 26 },
        { name: '云南', value: 27 },
        { name: '广东', value: 28 },
        { name: '广西', value: 29 },
        { name: '海南', value: 30 },
        { name: '上海', value: 31 },
        { name: '台湾', value: 31 }
      ]
      var convertData = function(data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = geoCoordMap[dataItem[0].name]
          var toCoord = geoCoordMap[dataItem[1].name]
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord]
            })
          }
        }
        return res
      }
      // 飞线数据（多点同时）
      var chinaData = [
        // [{name: '上海'}, {name: '江苏'}],
        // [{name: '北京'}, {name: '江苏'}],
        // [{name: '新疆'}, {name: '江苏'}],
        // [{name: '西藏'}, {name: '江苏'}]
      ]
      // 获取飞线数据
      var res = this.newDat
      res.forEach(function(item) {
        newarray.push(item.value)
        var array = []
        var o = {}
        var o1 = {}
        o.name = item.name
        o1.name = '河北'
        o.value = item.value
        array.push(o)
        array.push(o1)
        chinaData.push(array)
      })
      var series = [];
      [['河北', chinaData]].forEach(function(item) {
        series.push(
          {
            name: item[2],
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 4, // 箭头指向速度，值越小速度越快
              trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', // 箭头图标
              symbolSize: 10 // 图标大小
            },
            lineStyle: {
              normal: {
                color: '#FCE931',
                width: 0.8, // 尾迹线条宽度
                opacity: 0.5, // 尾迹线条透明度
                curveness: 0.3 // 尾迹线条曲直度
              }
            },
            data: convertData(item[1])
          },
          {
            //       name: item[1],
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 3,
            rippleEffect: {
              brushType: 'stroke',
              color: '#FCE931',
              scale: 4,
              period: 3
            },
            symbolSize: function(val) { /* 光晕大小*/
              // return 3 + val[2] / 10;
              return 10
            },
            itemStyle: {
              normal: {
                color: '#FCE931'
              }
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[0].name,
                value: geoCoordMap[dataItem[0].name].concat(33)
              }
            })
          },
          {
            name: '中国',
            type: 'map',
            zlevel: 0,
            mapType: 'china',
            zoom: 1,
            height: 1000,
            width: 550,
            selectedMode: 'single',
            itemStyle: {
              normal: {
                label: {
                  color: '#fff',
                  show: true
                },
                borderWidth: 0.5,
                borderColor: '#009fe0',
                areaColor: '#009fe0'
              },
              emphasis: {
                borderWidth: 0.5,
                borderColor: '#37A2DA',
                shadowColor: '#37A2DA',
                shadowBlur: 10,
                areaColor: '#37A2DA'
              }
            },
            data: geoCoordColor.map(function(dataItem) {
              return {
                name: dataItem.name,
                value: geoCoordMap[dataItem.name].concat([dataItem.value])
              }
            })

          }
        )
      })
      var option = {
        background: 'none',
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.componentSubType === 'map') {
              if (params.data) {
                return params.name + ' : ' + params.data.value
              }
              return params.name + ' : 0'
            }
          }
        },
        visualMap: {
          type: 'piecewise',
          min: 0,
          max: 33,
          realtime: false,
          calculable: true,
          splitNumber: 21,
          show: false,
          inRange: {
            // color:['#3679C8', '#3679C8', '#3679C8', '#3679C8', '#3679C8']
            color: ['rgba(0,0,0,0.4)']
          }
        },
        selectedMode: 'multiple',
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          zoom: 1,
          height: 1000,
          width: 550,
          roam: false,
          itemStyle: {
            normal: {
              borderColor: '#3b56b5',
              borderWidth: 2,
              areaColor: 'rgba(0,0,0,0.1)',
              shadowColor: '#2485af',
              shadowBlur: 20
            },
            emphasis: {
              areaColor: 'green'
            }
          }
        },
        series: series
      }
      // var max = Math.max.apply(Math, newarray);
      // option.visualMap.max = max;
      myCharts.clear()
      myCharts.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
  #ChinaLineMap{
    width: 100%;
    //height:2900px;
    //margin-top: -800px;
    height:1100px;
  }
  .min-body {
    width: 100%;
    height: 1100px;
    padding: .18rem;
    overflow: hidden;
    /*background: #010827;*/
  }

</style>

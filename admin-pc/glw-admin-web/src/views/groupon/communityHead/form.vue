<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="950px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="用户" prop="userId">
        <el-select v-model="form.userId" clearable filterable remote placeholder="请输入用户昵称关键字搜索" :remote-method="remoteMethod" style="width: 200px;">
          <el-option
            v-for="item in userIdList"
            :key="item.id"
            :label="item.userName+'('+item.nickName+')'"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="团长昵称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" type="number" maxlength="11" style="width:200px;" />
      </el-form-item>
      <el-form-item label="提现方式" prop="withdrawType">
        <el-select v-model="form.withdrawType" clearable placeholder="提现方式" style="width: 200px;">
          <el-option
            v-for="item in withdrawTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.withdrawType===2" label="微信号" prop="wechatNum" :rules="[{ required: true, message: '请输入微信号', trigger: 'blur' },{ pattern: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message: '请输入正确的微信号' }]">
        <el-input v-model="form.wechatNum" style="width:200px;" />
      </el-form-item>
      <el-form-item v-if="form.withdrawType===1" label="银行卡号" prop="bankCard" :rules="[{ required: true, message: '请输入银行卡号', trigger: 'blur' },{ pattern: /^[1-9]\d{9,29}$/, message: '请输入正确的银行卡号' }]">
        <el-input v-model="form.bankCard" type="number" maxlength="19" style="width:200px;" />
      </el-form-item>
      <el-form-item label="费用类型" prop="expensesType">
        <el-select v-model="form.expensesType" clearable placeholder="费用类型" style="width: 200px;">
          <el-option
            v-for="item in expensesTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="费用" prop="expensesValue">
        <el-input v-model="form.expensesValue" style="width:200px;" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" style="width: 300px;">
          <el-radio class="radio" :label="1">审核通过</el-radio>
          <el-radio class="radio" :label="2">审核拒绝</el-radio>
          <el-radio class="radio" :label="5">冻结</el-radio>
        </el-radio-group>
      </el-form-item>
      <div>
        <el-form-item label="社区" prop="communityHeadAddress">
          <el-select v-model="form.communityHeadAddress.communityId" clearable filterable style="width: 200px;" placeholder="社区">
            <el-option
              v-for="item in communityIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="经度" prop="communityHeadAddress" style="display: inline-block">
          <el-input v-model="form.communityHeadAddress.lon" type="number" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="纬度" prop="communityHeadAddress" style="display: inline-block">
          <el-input v-model="form.communityHeadAddress.lat" type="number" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="关键字">
          <el-input id="tipinput" v-model="locationMsg.keyword" style="width:810px;" placeholder="所在地址模糊搜索" />
        </el-form-item>
        <el-form-item label="地址" prop="communityHeadAddress.address" :rules="[[`communityHeadAddress.address`],{ required: true, message: '请输入地址', trigger: 'blur' }]">
          <el-input v-model="form.communityHeadAddress.address" style="width: 810px;" type="textarea" />
        </el-form-item>
        <el-form-item label="所在地门头照" prop="headImg" style="display:block">
          <el-upload
            v-model="form.communityHeadAddress.headImg"
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
        <div id="container" class="mymap" />
      </div>
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
import { getuserinfoLists } from '@/api/user/userinfo'
import { getWithdrawType, getExpensesTypeEnum } from '@/api/groupon/communityHead'
import { getcommunityLists } from '@/api/groupon/community'
import { sysfileAdds } from '@/api/upload'
import AMap from 'AMap'
const defaultForm = {
  id: null,
  name: '',
  userId: '',
  phone: '',
  income: 0,
  sale: 0,
  fromRecommendUuid: '',
  isRecommendRewardGrant: false,
  status: 1,
  wechatNum: '',
  bankCard: '',
  expensesType: '',
  withdrawType: '',
  expensesValue: 0,
  fileList: [],
  communityHeadAddress: {
    address: '',
    communityId: '',
    headImg: '',
    lat: '',
    lon: ''
  }
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      communityIdList: [],
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      },
      userIdList: [],
      withdrawTypeList: [],
      expensesTypeList: [],
      rules: {
        name: [
          { required: true, message: '请输入团长昵称', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请选择用户', trigger: 'blur' }
        ],
        withdrawType: [
          { required: true, message: '请选择提现方式', trigger: 'blur' }
        ],
        expensesType: [
          { required: true, message: '请选择费用类型', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择审核结果', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(19[0-9])|(18[0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的手机号' }
        ],
        communityHeadAddress: [
          { required: true, message: '请选择审核结果', trigger: 'blur' }
        ]
        // bankCard: [
        //   { required: true, message: '请输入银行卡号', trigger: 'blur' },
        //   { pattern: /^[1-9]\d{9,29}$/, message: '请输入正确的银行卡号' }
        // ],
        // wechatNum: [
        //   { required: true, message: '请输入微信号', trigger: 'blur' },
        //   { pattern: /^[a-zA-Z1-9]+$/, message: '请输入正确的微信号' }
        // ]
      }
    }
  },
  watch: {
    'form.userId': function(newQuestion, oldQuestion) {
      if (this.form.userId !== '') {
        const data = {
          id: this.form.userId,
          status: 1
        }
        getuserinfoLists(data).then(res => {
          this.userIdList = res.data
        })
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getWithdrawType(data).then(res => {
      this.withdrawTypeList = res.data
    })
    getExpensesTypeEnum(data).then(res => {
      this.expensesTypeList = res.data
    })
    getcommunityLists(data).then(res => {
      this.communityIdList = res.data
    })
  },
  updated() {
    if (this.locationMsg.keyword !== '' || this.locationMsg.lnglat !== '') return
    this.loadmap()
  },
  methods: {
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
          _this.form.communityHeadAddress.headImg = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    remoteMethod(query) {
      const data = {
        nickName: query,
        status: 1
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
    },
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
      if (this.form.communityHeadAddress.lon !== '') {
        map.setCenter([this.form.communityHeadAddress.lon, this.form.communityHeadAddress.lat])
        map.setZoom(15)
      }
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
        _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        _this.form.communityHeadAddress.lon = e.lnglat.getLng()
        _this.form.communityHeadAddress.lat = e.lnglat.getLat()
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
                _this.form.communityHeadAddress.address = result.regeocode.formattedAddress
              } else {
                _this.form.communityHeadAddress.address = ''
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

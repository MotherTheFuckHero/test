<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" width="50" />
      <el-table-column prop="name" label="团长昵称" width="100px" />
      <el-table-column prop="userName" label="用户名称" width="80px" />
      <el-table-column prop="phone" label="手机号" width="100px" />
      <el-table-column prop="communityHeadAddress.community.name" label="社区名称" width="150px" />
      <el-table-column label="团长位置" width="350px" align="center">
        <el-table-column prop="communityHeadAddress.address" label="团长地址" show-overflow-tooltip />
        <el-table-column prop="communityHeadAddress.lat" label="经度" align="center" width="100px" />
        <el-table-column prop="communityHeadAddress.lon" label="纬度" align="center" width="100px" />
        <el-table-column label="所在地门头照" prop="communityHeadAddress.headImg" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.communityHeadAddress !== null">
              <a v-if="scope.row.communityHeadAddress.headImgUrl !== null" :href="scope.row.communityHeadAddress.headImgUrl">
                <img alt="" :src="scope.row.communityHeadAddress.headImgUrl" width="40" height="40">
              </a>
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="statusDesc" label="状态" width="80px" />
      <el-table-column prop="withdrawTypeDesc" label="提现方式" width="80px" />
      <el-table-column prop="wechatNum" label="微信号" width="150px" />
      <el-table-column prop="bankCard" label="银行卡号" width="150px" show-overflow-tooltip />
      <el-table-column prop="expensesTypeDesc" label="费用类型" width="80px" />
      <el-table-column prop="expensesValue" label="费用" width="60px" />
      <!--      <el-table-column label="创建人" prop="createdUserName" width="200" />-->
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <!--      <el-table-column label="修改人" prop="updatedUserName" width="200" />-->
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['community_head_update','community_head_delete']"
        label="操作"
        width="210px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-permission="['community_head_update']" size="mini" type="primary" @click="address(scope.$index, scope.row)">地址管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />

    <el-dialog title="团长地址" :visible.sync="dialogFormVisibleaddress" width="600px">
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="70px" class="demo-addForm">
        <el-form-item label="社区" prop="communityId">
          <el-select v-model="addForm.communityId" clearable filterable style="width: 490px;" placeholder="社区">
            <el-option
              v-for="item in communityIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="经度" prop="lon" style="display: inline-block">
          <el-input v-model="addForm.lon" type="number" style="width: 207px;" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat" style="display: inline-block">
          <el-input v-model="addForm.lat" type="number" style="width: 207px;" />
        </el-form-item>
        <el-form-item label="关键字">
          <el-input id="tipinput" v-model="locationMsg.keyword" style="width: 490px;" placeholder="所在地址模糊搜索" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addForm.address" style="width: 490px;" type="textarea" />
        </el-form-item>
        <div id="container" class="mymap" />

        <el-form-item>
          <el-button v-if="adds" type="primary" style="float: right" @click="addsubmitForms('addForm')">添加</el-button>
          <el-button v-if="edits" type="primary" style="float: right" @click="editsubmitForms('addForm')">完成</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import crudJob, { getaddress, addaddress, editaddress } from '@/api/groupon/communityHead'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
import { getcommunityLists } from '@/api/groupon/community'
import AMap from 'AMap'
export default {
  name: '社区团长列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '社区团长管理',
      url: process.env.VUE_APP_community_API + '/admin/community_head/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      dialogFormVisibleaddress: false,
      adds: false,
      edits: false,
      headId: '',
      editId: '',
      communityIdList: [],
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      },
      addForm: {
        address: '',
        communityId: '',
        lat: '',
        lon: ''
      },
      rules: {
        address: [
          {
            required: true,
            message: '请输入团长地址',
            trigger: 'blur'
          }
        ],
        communityId: [
          {
            required: true,
            message: '请选择社区',
            trigger: 'blur'
          }
        ],
        lon: [
          {
            required: true,
            message: '请输入经度',
            trigger: 'blur'
          }
        ],
        lat: [
          {
            required: true,
            message: '请输入纬度',
            trigger: 'blur'
          }
        ]
      },
      permission: {
        add: ['community_head_add'],
        edit: ['community_head_update'],
        del: ['community_head_delete']
      }
    }
  },
  created() {
    const datas = {
      status: 1
    }
    getcommunityLists(datas).then(res => {
      this.communityIdList = res.data
    })
  },
  updated() {
    if (this.locationMsg.keyword !== '' || this.locationMsg.lnglat !== '') return
    this.loadmap()
  },
  methods: {
    address(index, row) {
      var obj = Object.assign({}, row)
      var headId = obj.id
      this.headId = headId
      this.dialogFormVisibleaddress = true
      getaddress(headId).then(res => {
        if (res.data === undefined) {
          this.adds = true
          this.edits = false
          this.addForm.address = ''
          this.addForm.communityId = ''
          this.addForm.lat = ''
          this.addForm.lon = ''
        } else {
          this.adds = false
          this.edits = true
          this.addForm.address = res.data.address
          this.addForm.communityId = res.data.communityId
          this.addForm.lat = res.data.lat
          this.addForm.lon = res.data.lon
          this.editId = res.data.id
        }
      })
    },
    addsubmitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          const data = {
            address: this.addForm.address,
            headId: this.headId,
            communityId: this.addForm.communityId,
            lat: this.addForm.lat,
            lon: this.addForm.lon
          }
          this.$confirm('确认添加吗？', '提示', {}).then(() => {
            addaddress(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.dialogFormVisibleaddress = false
              } else {
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
          })
        }
      })
    },
    editsubmitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          const data = {
            address: this.addForm.address,
            headId: this.headId,
            communityId: this.addForm.communityId,
            lat: this.addForm.lat,
            lon: this.addForm.lon
          }
          const id = this.editId
          this.$confirm('确认修改吗？', '提示', {}).then(() => {
            editaddress(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.dialogFormVisibleaddress = false
              } else {
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
          })
        }
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
      if (this.addForm.lon !== '') {
        map.setCenter([this.addForm.lon, this.addForm.lat])
        map.setZoom(15)
      }
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
        _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        _this.addForm.lon = e.lnglat.getLng()
        _this.addForm.lat = e.lnglat.getLat()
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
                _this.addForm.address = result.regeocode.formattedAddress
              } else {
                _this.addForm.address = ''
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

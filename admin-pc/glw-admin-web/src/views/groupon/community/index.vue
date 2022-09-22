<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="name" label="社区名称" width="150px" />
      <el-table-column prop="typeDesc" label="类型" width="150px" />
      <el-table-column prop="districtName" label="所在区/县" width="150px" />
      <el-table-column prop="lon" label="经度" width="150px" />
      <el-table-column prop="lat" label="纬度" width="150px" />
      <el-table-column label="团长数量" width="150px">
        <template slot-scope="scope">
          {{ scope.row.communityHeadAddressList === null ? '暂无': scope.row.communityHeadAddressList.length }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['community_update','community_delete']"
        label="操作"
        width="200px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-if="scope.row.communityHeadAddressList !== undefined" v-permission="['community_update']" size="mini" type="primary" @click="editHeadList(scope.$index, scope.row)">更换团长</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <el-dialog title="社区团长列表" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="headList">
        <el-table-column property="id" label="编号" width="100" />
        <el-table-column property="communityHead.name" label="社区团长" />
        <el-table-column property="communityHead.phone" label="团长手机号" />
        <el-table-column property="lon" label="经度" />
        <el-table-column property="lat" label="纬度" />
        <el-table-column property="address" label="团长位置" />
        <el-table-column label="所在地门头照" prop="headImgUrl" width="100" align="center">
          <template slot-scope="scope">
            <a v-if="scope.row.headImgUrl !== null" :href="scope.row.headImgUrl">
              <img alt="" :src="scope.row.headImgUrl" width="40" height="40">
            </a>
          </template>
        </el-table-column>
        <el-table-column
          v-permission="['community_update']"
          label="操作"
          width="180px"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="editHead(scope.$index, scope.row)">更换团长</el-button>
            <el-button size="mini" type="danger" plain @click="delHead(scope.$index,scope.row.id)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="更换团长" :visible.sync="dialogFormVisible" width="680px">
      <el-form ref="headForm" :rules="rules" :model="headForm" label-width="100px" class="demo-addForm">
        <el-form-item label="社区团长" prop="headId">
          <el-select v-model="headForm.headId" clearable size="small" style="width:207px" filterable placeholder="请选择团长">
            <el-option
              v-for="item in headIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="经度" prop="lon" style="display: inline-block">
          <el-input v-model="headForm.lon" type="number" style="width: 207px;" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat" style="display: inline-block">
          <el-input v-model="headForm.lat" type="number" style="width: 207px;" />
        </el-form-item>
        <el-form-item label="关键字">
          <el-input id="tipinput" v-model="locationMsg.keyword" style="width: 517px;" placeholder="所在地址模糊搜索" />
        </el-form-item>
        <el-form-item label="团长位置" prop="address">
          <el-input v-model="headForm.address" style="width: 517px;" type="textarea" />
        </el-form-item>
        <el-form-item label="所在地门头照" prop="headImg" style="display:block">
          <el-upload
            v-model="headForm.headImg"
            action="/"
            :http-request="fileAdd"
            :limit="1"
            :file-list="headForm.fileList"
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
        <el-form-item>
          <el-button type="primary" style="float: right" @click="submitForms('headForm')">完成</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <eForm />
  </div>
</template>

<script>
import crudJob, { editheadAddress, delheadAddress } from '@/api/groupon/community'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
import { getcommunityheadLists } from '@/api/groupon/communityHead'
import { sysfileAdds } from '@/api/upload'
import AMap from 'AMap'
export default {
  name: '社区列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '社区管理',
      url: process.env.VUE_APP_community_API + '/admin/community/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      headList: [],
      headIdList: [],
      headForm: {},
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      },
      rules: {
        headId: [
          { required: true, message: '请选择团长', trigger: 'blur' }
        ],
        lon: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        lat: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入团长位置', trigger: 'blur' }
        ]
      },
      permission: {
        add: ['community_add'],
        edit: ['community_update'],
        del: ['community_delete']
      }
    }
  },
  updated() {
    if (this.locationMsg.keyword !== '' || this.locationMsg.lnglat !== '') return
    this.loadmap()
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.headForm.fileList = []
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.headForm.fileList = fileList
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
          _this.headForm.fileList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.headForm.headImg = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },

    editHeadList(index, row) {
      var obj = Object.assign({}, row)
      this.headList = obj.communityHeadAddressList
      this.dialogTableVisible = true
    },
    delHead(index, id) {
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        delheadAddress(id).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.headList.splice(index, 1)
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    editHead(index, row) {
      var obj = Object.assign({}, row)
      this.headForm = obj
      this.headForm.fileList = []
      if (this.headForm.headImg !== null) {
        this.headForm.fileList.push({
          'key': this.headForm.headImg,
          'url': this.headForm.headImgUrl
        })
      }
      this.dialogFormVisible = true
      const data = {
        communityId: obj.communityId
      }
      getcommunityheadLists(data).then(res => {
        this.headIdList = res.data
      })
    },
    submitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          const data = this.headForm
          const id = this.headForm.id
          this.$confirm('确认修改吗？', '提示', {}).then(() => {
            editheadAddress(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.crud.refresh()
                this.dialogFormVisible = false
                this.dialogTableVisible = false
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
      if (this.headForm.lon !== '') {
        map.setCenter([this.headForm.lon, this.headForm.lat])
        map.setZoom(15)
      }
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
        _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        _this.headForm.lon = e.lnglat.getLng()
        _this.headForm.lat = e.lnglat.getLat()
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
                _this.headForm.address = result.regeocode.formattedAddress
              } else {
                _this.headForm.address = ''
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

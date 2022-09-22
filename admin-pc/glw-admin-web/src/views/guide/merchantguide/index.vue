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
      <el-table-column prop="merchantName" label="商户名称" width="150px" />
      <el-table-column prop="name" label="导览名称" width="150px" />
      <el-table-column prop="scaling" label="地图缩放比例" width="150px" />
      <el-table-column label="导览地图" prop="guideImgUrl" width="100">
        <template slot-scope="scope">
          <a v-show="scope.row.guideImgUrl === undefined ? false: true " :href="scope.row.guideImgUrl"><img alt="" :src="scope.row.guideImgUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column label="是否室内" prop="indoor" width="120">
        <template slot-scope="scope">
          {{ scope.row.indoor === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否多层" prop="multiStorey" width="120">
        <template slot-scope="scope">
          {{ scope.row.multiStorey === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="介绍" :show-overflow-tooltip="true" prop="introduction" width="300" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['merchant_guide_update','merchant_guide_delete']"
        label="操作"
        width="340px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-permission="['merchant_guide_voice_select']" size="mini" type="primary" style="display: inline-block" @click="voiceEdit(scope.$index, scope.row)">语音管理</el-button>
          <el-button v-permission="['merchant_guide_img_point_select']" size="mini" type="primary" style="display: inline-block" @click="imgEdit(scope.$index, scope.row)">导览图经纬度管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog title="导览图语音列表" :visible.sync="dialogTableVisible">
      <el-button
        v-permission="['merchant_guide_voice_add']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="handleAdd"
      >
        新增
      </el-button>
      <el-table :data="resultList">
        <el-table-column property="voiceTypeDesc" label="语音类型" width="150" />
        <el-table-column property="voiceLanguageDesc" label="语音种类" width="150" />
        <el-table-column property="voiceUrl" label="导览语音" width="150">
          <template slot-scope="scope">
            <a v-show="scope.row.voiceUrl === undefined ? false: true " :href="scope.row.voiceUrl">语音下载</a>
          </template>
        </el-table-column>
        <el-table-column label="是否默认" prop="isDefault" width="150">
          <template slot-scope="scope">
            {{ scope.row.isDefault === true ? '是': '否' }}
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="createdUserName" width="200" />
        <el-table-column label="创建时间" prop="createdTime" width="200" />
        <el-table-column label="修改人" prop="updatedUserName" width="200" />
        <el-table-column label="修改时间" prop="updatedTime" width="200" />
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button v-permission="['merchant_guide_voice_update']" size="mini" type="primary" plain icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-permission="['merchant_guide_voice_delete']" size="mini" type="danger" plain icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        width="680px"
        title="导览图语音管理"
        :visible.sync="innerVisible"
        append-to-body
      >

        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
          <el-form-item label="语音类型" prop="voiceType">
            <el-select v-model="form.voiceType" clearable placeholder="语音类型" style="width: 200px;">
              <el-option
                v-for="item in VoiceTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="语音种类" prop="voiceLanguage">
            <el-select v-model="form.voiceLanguage" clearable placeholder="语音种类" style="width: 200px;">
              <el-option
                v-for="item in VoiceLanguageTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否默认" prop="isDefault">
            <el-radio-group v-model="form.isDefault" style="width:200px;">
              <el-radio class="radio" :label="true">是</el-radio>
              <el-radio class="radio" :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="语言文件" prop="voiceKey" style="display: block">
            <el-upload
              v-model="form.voiceKey"
              class="upload-demo"
              action="/"
              :http-request="fileAdd"
              :limit="1"
              accept="audio/mpeg,audio/mp4,video/mp4,text/plain"
              :file-list="form.fileList"
              :on-preview="handlePreview"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              list-type="text"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" />
            </el-upload>
          </el-form-item>
          <el-button
            v-if="adds"
            v-permission="['merchant_guide_voice_add']"
            class="filter-item"
            type="primary"
            style="float: right;margin:0 40px 20px 0"
            @click="handleAdds('form')"
          >
            添加
          </el-button>
          <el-button
            v-if="edits"
            v-permission="['merchant_guide_voice_update']"
            class="filter-item"
            type="primary"
            style="float: right;margin:0 40px 20px 0"
            @click="handleEdits('form')"
          >
            完成
          </el-button>
        </el-form>

      </el-dialog>
    </el-dialog>

    <el-dialog title="导览图经纬度列表" :visible.sync="dialogTableVisibles">
      <el-button
        v-permission="['merchant_guide_img_point_add']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="handleimgAdd"
      >
        新增
      </el-button>
      <el-table :data="resultLists">
        <el-table-column property="id" label="编号" width="70" />
        <el-table-column property="pointLongitude" label="导览图经度" width="100" />
        <el-table-column property="pointLatitude" label="导览图纬度" width="100" />
        <el-table-column property="typeDesc" label="导览图类型" width="100" />
        <el-table-column label="创建人" prop="createdUserName" width="100" />
        <el-table-column label="创建时间" prop="createdTime" width="140" />
        <el-table-column label="修改人" prop="updatedUserName" width="100" />
        <el-table-column label="修改时间" prop="updatedTime" width="140" />
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button v-permission="['merchant_guide_img_point_update']" size="mini" type="primary" plain icon="el-icon-edit" @click="handleimgEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-permission="['merchant_guide_img_point_delete']" size="mini" type="danger" plain icon="el-icon-delete" @click="handleimgDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="960px"
        title="导览图经纬度管理"
        :visible.sync="imgVisible"
        append-to-body
      >
        <el-form ref="addForm" :model="addForm" :rules="ruless" size="small" label-width="100px">
          <el-form-item label="导览图经度" prop="pointLongitude">
            <el-input v-model.number="addForm.pointLongitude" style="width: 355px" />
          </el-form-item>
          <el-form-item label="导览图纬度" prop="pointLatitude">
            <el-input v-model.number="addForm.pointLatitude" style="width: 355px" />
          </el-form-item>
          <el-form-item label="导览图类型" prop="type">
            <el-select v-model="addForm.type" clearable placeholder="导览图类型" style="width: 355px;">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键字搜索">
            <el-input id="tipinput" v-model="locationMsg.keyword" style="width:355px;" placeholder="所在地址模糊搜索" />
          </el-form-item>
          <el-form-item label="所在地址">
            <el-input id="address" v-model="locationMsg.address" style="width: 815px;" placeholder="根据经纬度自动生成" />
          </el-form-item>
          <div id="container" class="mymap" />
          <el-button
            v-if="imgadds"
            v-permission="['merchant_guide_img_point_add']"
            class="filter-item"
            type="primary"
            style="float: right;margin:0 40px 20px 0"
            @click="handleimgAdds('addForm')"
          >
            添加
          </el-button>
          <el-button
            v-if="imgedits"
            v-permission="['merchant_guide_img_point_update']"
            class="filter-item"
            type="primary"
            style="float: right;margin:0 40px 20px 0"
            @click="handleimgEdits('addForm')"
          >
            完成
          </el-button>
        </el-form>

      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import crudJob, { guideVoiceListGet, voiceadd, VoiceTypeLists, GuideImagePointTypeLists, VoiceLanguageTypeLists, voicedel, voiceedit, guideimgGet, guideimgadd, guideimgedit, guideimgdel } from '@/api/guide/merchantguide'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
import { sysfileAdds } from '@/api/upload'
import AMap from 'AMap'
export default {
  name: '导览图列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '导览图管理',
      url: 'admin/merchant_guide/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      locationMsg: {
        keyword: '',
        lnglat: '',
        address: ''
      },
      adds: false,
      edits: false,
      imgadds: false,
      imgedits: false,
      form: {
        id: '',
        editId: '',
        voiceType: '',
        voiceLanguage: '',
        isDefault: '',
        voiceKey: '',
        fileList: []
      },
      rules: {

        voiceType: [
          {
            required: true,
            message: '请选择语音类型',
            trigger: 'blur'
          }
        ],
        voiceLanguage: [
          {
            required: true,
            message: '请选择语音种类',
            trigger: 'blur'
          }
        ],
        isDefault: [
          {
            required: true,
            message: '请选择是否默认',
            trigger: 'blur'
          }
        ],
        voiceKey: [
          {
            required: true,
            message: '请选择语音文件',
            trigger: 'blur'
          }
        ]
      },
      resultList: [],
      resultLists: [],
      typeList: [],
      VoiceTypeList: [],
      VoiceLanguageTypeList: [],
      dialogTableVisible: false,
      dialogTableVisibles: false,
      innerVisible: false,
      imgVisible: false,
      permission: {
        add: ['merchant_guide_add'],
        edit: ['merchant_guide_update'],
        del: ['merchant_guide_delete']
      },
      addForm: {
        id: '',
        guideId: '',
        pointLongitude: '',
        type: '',
        pointLatitude: ''
      },
      ruless: {
        pointLongitude: [
          {
            required: true,
            message: '请输入地图经度',
            trigger: 'blur'
          }
        ],
        pointLatitude: [
          {
            required: true,
            message: '请输入地图纬度',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    VoiceTypeLists(data).then(res => {
      this.VoiceTypeList = res.data
    })
    GuideImagePointTypeLists(data).then(res => {
      this.typeList = res.data
    })
    VoiceLanguageTypeLists(data).then(res => {
      this.VoiceLanguageTypeList = res.data
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
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      map.on('click', function(e) {
        _this.locationMsg.lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
        _this.addForm.pointLongitude = e.lnglat.getLng()
        _this.addForm.pointLatitude = e.lnglat.getLat()
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
    },

    // 导览语音列表
    voiceEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      this.form.id = urlId
      guideVoiceListGet(urlId).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.resultList = res.data
          this.dialogTableVisible = true
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    /* 导览语言添加*/
    handleAdd() {
      this.innerVisible = true
      this.adds = true
      this.edits = false
    },
    handleAdds(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              guideId: this.form.id,
              voiceType: this.form.voiceType,
              voiceLanguage: this.form.voiceLanguage,
              isDefault: this.form.isDefault,
              voiceKey: this.form.voiceKey
            }
            voiceadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.dialogTableVisible = false
                this.innerVisible = false
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
    handleDelete(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        voicedel(urlId).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.dialogTableVisible = false
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },
    handleEdit(index, row) {
      this.adds = false
      this.edits = true
      var obj = Object.assign({}, row)
      this.form.editId = obj.id
      this.form.fileList = []
      this.form.guideId = obj.guideId
      this.form.voiceType = obj.voiceType
      this.form.voiceLanguage = obj.voiceLanguage
      this.form.isDefault = obj.isDefault
      this.form.voiceKey = obj.voiceKey
      this.form.fileList.push({
        'key': obj.voiceKey,
        'name': obj.voiceKey
      })
      this.innerVisible = true
    },
    handleEdits(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              guideId: this.form.id,
              voiceType: this.form.voiceType,
              voiceLanguage: this.form.voiceLanguage,
              isDefault: this.form.isDefault,
              voiceKey: this.form.voiceKey
            }
            const id = this.form.editId
            voiceedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.dialogTableVisible = false
                this.innerVisible = false
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
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileList = fileList
    },
    handlePreview(file, fileList) {
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
          _this.form.voiceKey = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },

    // 导览图经纬度列表
    imgEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      this.addForm.guideId = urlId
      guideimgGet(urlId).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.resultLists = res.data
          this.dialogTableVisibles = true
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    handleimgAdd() {
      this.imgVisible = true
      this.imgadds = true
      this.imgedits = false
    },
    handleimgAdds(addForm) {
      const data = {
        guideId: this.addForm.guideId,
        pointLongitude: this.addForm.pointLongitude,
        type: this.addForm.type,
        pointLatitude: this.addForm.pointLatitude
      }
      this.$refs[addForm].validate(valid => {
        if (valid) {
          guideimgadd(data).then(res => {
            const code = res.code
            const msg = res.msg
            if (code === '0') {
              this.$message({
                message: msg,
                type: 'success'
              })
              this.imgVisible = false
              this.addForm.pointLongitude = ''
              this.addForm.type = ''
              this.addForm.pointLatitude = ''
              this.locationMsg.keyword = ''
              this.locationMsg.lnglat = ''
              this.locationMsg.address = ''
              var urlId = this.addForm.guideId
              guideimgGet(urlId).then(res => {
                const code = res.code
                const msg = res.msg
                if (code === '0') {
                  this.resultLists = res.data
                  this.dialogTableVisibles = true
                } else {
                  this.$message({
                    message: msg,
                    type: 'warning'
                  })
                }
              })
            } else {
              this.$message({
                message: msg,
                type: 'warning'
              })
            }
          })
        }
      })
    },
    handleimgEdit(index, row) {
      var obj = Object.assign({}, row)
      this.imgVisible = true
      this.imgadds = false
      this.imgedits = true
      this.addForm.id = obj.id
      this.addForm.guideId = obj.guideId
      this.addForm.pointLongitude = obj.pointLongitude
      this.addForm.type = obj.type
      this.addForm.pointLatitude = obj.pointLatitude
    },
    handleimgEdits(addForm) {
      const id = this.addForm.id
      const data = {
        guideId: this.addForm.guideId,
        pointLongitude: this.addForm.pointLongitude,
        type: this.addForm.type,
        pointLatitude: this.addForm.pointLatitude
      }
      this.$refs[addForm].validate(valid => {
        if (valid) {
          guideimgedit(id, data).then(res => {
            const code = res.code
            const msg = res.msg
            if (code === '0') {
              this.$message({
                message: msg,
                type: 'success'
              })
              this.imgVisible = false
              this.addForm.pointLongitude = ''
              this.addForm.pointLatitude = ''
              this.addForm.type = ''
              this.locationMsg.keyword = ''
              this.locationMsg.lnglat = ''
              this.locationMsg.address = ''
              var urlId = this.addForm.guideId
              guideimgGet(urlId).then(res => {
                const code = res.code
                const msg = res.msg
                if (code === '0') {
                  this.resultLists = res.data
                  this.dialogTableVisibles = true
                } else {
                  this.$message({
                    message: msg,
                    type: 'warning'
                  })
                }
              })
            } else {
              this.$message({
                message: msg,
                type: 'warning'
              })
            }
          })
        }
      })
    },
    handleimgDelete(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      var _this = this
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        guideimgdel(urlId).then(res => {
          const code = res.code
          if (code === '0') {
            _this.$message({
              message: '删除成功',
              type: 'success'
            })
            var urlId = this.addForm.guideId
            guideimgGet(urlId).then(res => {
              const code = res.code
              const msg = res.msg
              if (code === '0') {
                this.resultLists = res.data
                this.dialogTableVisibles = true
              } else {
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
          }
        })
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
  .el-dialog__body{
    padding: 40px 20px !important;
  }
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

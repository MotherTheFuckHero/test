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
      <el-table-column prop="guideName" label="导览图" width="150px" />
      <el-table-column prop="name" label="导览点名称" width="150px" />
      <el-table-column label="导览点图" prop="pointImgUrl" width="100">
        <template slot-scope="scope">
          <a v-show="scope.row.pointImgUrl === undefined ? false: true " :href="scope.row.pointImgUrl">
            <img alt="" :src="scope.row.pointImgUrl" width="40" height="40">
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="pointLongitude" label="坐标经度" width="80" />
      <el-table-column prop="pointLatitude" label="坐标纬度" width="80" />
      <el-table-column prop="scaleTypeDesc" label="导览点规模" width="80" />
      <el-table-column prop="floor" label="楼层" width="80" />
      <el-table-column prop="scope" label="讲解范围" width="80" />
      <el-table-column label="是否入口" prop="entrance" width="80">
        <template slot-scope="scope">
          {{ scope.row.entrance === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否讲解" prop="explain" width="120">
        <template slot-scope="scope">
          {{ scope.row.explain === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="introduction" :show-overflow-tooltip="true" label="介绍" width="300" />
      <el-table-column prop="nextPointName" label="下一个讲解点" width="150" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['merchant_guide_point_update','merchant_guide_point_delete']"
        label="操作"
        width="250px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-permission="['merchant_guide_point_voice_select']" size="mini" type="primary" style="display: inline-block" @click="voiceEdit(scope.$index, scope.row)">语音管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog title="导览点语音列表" :visible.sync="dialogTableVisible">
      <el-button
        v-permission="['merchant_guide_point_voice_add']"
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
            <el-button v-permission="['merchant_guide_point_voice_update']" size="mini" type="primary" plain icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-permission="['merchant_guide_point_voice_delete']" size="mini" type="danger" plain icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="680px"
        title="导览点语音管理"
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
            v-permission="['merchant_guide_point_voice_add']"
            class="filter-item"
            type="primary"
            style="float: right;margin:0 40px 20px 0"
            @click="handleAdds('form')"
          >
            添加
          </el-button>
          <el-button
            v-if="edits"
            v-permission="['merchant_guide_point_voice_update']"
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
  </div>
</template>

<script>
import crudJob, { guideVoiceListGet, voiceadd, voicedel, voiceedit } from '@/api/guide/merchantguidepoint'
import { VoiceTypeLists, VoiceLanguageTypeLists } from '@/api/guide/merchantguide'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
import { sysfileAdds } from '@/api/upload'
export default {
  name: '导览点列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '导览点管理',
      url: 'admin/merchant_guide_point/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      adds: false,
      edits: false,
      form: {
        id: '',
        editId: '',
        guideId: '',
        guidePointId: '',
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
      VoiceTypeList: [],
      VoiceLanguageTypeList: [],
      dialogTableVisible: false,
      innerVisible: false,
      permission: {
        add: ['merchant_guide_point_add'],
        edit: ['merchant_guide_point_update'],
        del: ['merchant_guide_point_delete']
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
    VoiceLanguageTypeLists(data).then(res => {
      this.VoiceLanguageTypeList = res.data
    })
  },
  methods: {
    // 导览语音列表
    voiceEdit(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      this.form.guideId = obj.guideId
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
              guideId: this.form.guideId,
              guidePointId: this.form.id,
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
      this.form.guidePointId = obj.guidePointId
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
              guideId: this.form.guideId,
              guidePointId: this.form.guidePointId,
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
  .el-dialog__body{
    padding: 40px 20px !important;
  }
</style>

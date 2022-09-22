<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="980px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="分公司" prop="companyId">
        <el-select v-model="form.companyId" clearable style="width: 200px;" placeholder="分公司">
          <el-option
            v-for="item in companyIdList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="语言" prop="languageId">
        <el-select v-model="form.languageId" clearable style="width: 200px;" placeholder="语言">
          <el-option
            v-for="item in languageIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="来源" prop="sourceName">
        <el-input v-model="form.sourceName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="状态" prop="status">-->
      <!--        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="状态">-->
      <!--          <el-option-->
      <!--            v-for="item in statusList"-->
      <!--            :key="item.value"-->
      <!--            :label="item.name"-->
      <!--            :value="item.value"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="发布日期" prop="releaseTime">
        <el-date-picker
          v-model="form.releaseTime"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 200px;"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="是否原创" prop="isSelf">
        <el-radio-group v-model="form.isSelf" style="width: 200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否置顶" prop="isTop">
        <el-radio-group v-model="form.isTop" style="width: 200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="缩略图" prop="topImage" style="display:block">
        <el-upload
          v-model="form.topImage"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.topImage"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor v-model="form.content" />
      </el-form-item>
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
import { getlanguageLists } from '@/api/system/language'
import { getcompanyLists } from '@/api/system/company'
import { sysfileAdds } from '@/api/upload'
import { StatusList, TypeList } from '@/api/system/news'
import Editor from '../../Editor'
import CRUD from '@crud/crud'
const defaultForm = {
  id: null,
  title: '',
  content: '',
  isSelf: true,
  isTop: true,
  releaseTime: '',
  sourceName: '',
  topImage: '',
  companyId: '',
  status: 1,
  type: '',
  languageId: '',
  auditOpinion: '',
  fileList: []
}
export default {
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      languageIdList: [],
      companyIdList: [],
      typeList: [],
      statusList: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入新闻标题',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入新闻内容',
            trigger: 'blur'
          }
        ],
        companyId: [
          {
            required: true,
            message: '请选择分公司',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择新闻类型',
            trigger: 'blur'
          }
        ],
        languageId: [
          {
            required: true,
            message: '请选择语言',
            trigger: 'blur'
          }
        ],
        releaseTime: [
          {
            required: true,
            message: '请选择发布日期',
            trigger: 'blur'
          }
        ],
        sourceName: [
          {
            required: true,
            message: '请输入新闻来源',
            trigger: 'blur'
          }
        ],
        topImage: [
          {
            required: true,
            message: '请选择新闻缩略图',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
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
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    StatusList(data).then(res => {
      this.statusList = res.data
    })
    TypeList(data).then(res => {
      this.typeList = res.data
    })
  },
  methods: {
    // 编辑前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.form.fileList.push({
        'key': crud.form.topImage,
        'url': crud.form.topImageUrl
      })
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
          _this.form.topImage = res.data.key
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
  ::v-deep .editor{
    width: 810px !important;
  }
</style>

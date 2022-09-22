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
import Editor from '../../../Editor'
import { sysfileAdds } from '@/api/upload'
import CRUD from '@crud/crud'
const defaultForm = {
  id: null,
  newsId: '',
  languageId: '',
  title: '',
  content: '',
  sourceName: '',
  topImage: '',
  fileList: []
}
export default {
  components: { Editor },
  mixins: [form(defaultForm)],
  data() {
    return {
      languageIdList: [],
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
        languageId: [
          {
            required: true,
            message: '请选择语言',
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
  },
  methods: {
    // 编辑前做的操作
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.form.fileList.push({
        'key': crud.form.topImage,
        'url': crud.form.topImageUrl
      })
    },
    // 新增与编辑提交前做的操作
    [CRUD.HOOK.beforeSubmit](crud, form) {
      if (crud.form.newsId === '') {
        crud.form.newsId = JSON.parse(localStorage.getItem('newsId'))
      }
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

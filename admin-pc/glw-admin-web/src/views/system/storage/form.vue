<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="650px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="系统" prop="systemId">
        <el-select v-model="form.systemId" clearable style="width: 200px;" placeholder="系统">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
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
      <el-form-item label="文件类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px;" placeholder="文件类型">
          <el-option
            v-for="item in typeList"
            :key="parseFloat(item.dataCode)"
            :label="item.dataDesc"
            :value="parseFloat(item.dataCode)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文件名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <div v-if="uploads">
        <el-form-item label="系统文件" prop="key">
          <el-upload
            v-model="form.key"
            class="upload-demo"
            action="/"
            :http-request="fileAdd"
            :limit="1"
            accept="image/gif,image.jpg,image/png,image/jpeg,audio/mpeg,audio/mp4,video/mp4,text/plain"
            :file-list="form.filestorageList"
            :on-preview="handlePreview"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :list-type="types"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" />
          </el-upload>
        </el-form-item>
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
import { getsystemLists } from '@/api/system/sys'
import { getlanguageLists } from '@/api/system/language'
import { typeLists } from '@/api/system/storage'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  name: '',
  systemId: '',
  languageId: '',
  type: '',
  url: '',
  key: '',
  size: '',
  filestorageList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      systemIdList: [],
      types: '',
      uploads: false,
      typeList: [],
      languageIdList: [],
      rules: {

        name: [
          {
            required: true,
            message: '请输入文件名称',
            trigger: 'blur'
          }
        ],
        systemId: [
          {
            required: true,
            message: '请选择系统',
            trigger: 'blur'
          }
        ],
        languageId: [
          {
            required: true,
            message: '请请选择语言',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择文件类型',
            trigger: 'blur'
          }
        ],
        key: [
          {
            required: true,
            message: '请选择提交文件',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    'form.type': function(newQuestion, oldQuestion) {
      if (this.form.type === '') {
        this.uploads = false
      } else if (this.form.type === 1) {
        this.types = 'picture'
        this.uploads = true
      } else {
        this.types = 'text'
        this.uploads = true
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    typeLists(data).then(res => {
      this.typeList = res.data
    })
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.filestorageList = fileList
    },
    handlePreview(file, fileList) {
      this.form.filestorageList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.filestorageList = fileList
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
          _this.form.filestorageList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          this.form.name = res.data.fileName
          this.form.size = res.data.size
          _this.form.key = res.data.key
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

<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="680px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="文章" prop="articleid">
        <el-select v-model="form.articleid" style="width: 200px;" clearable filterable>
          <el-option
            v-for="item in articleIdList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
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
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          style="width: 504px;"
        />
      </el-form-item>
      <el-form-item label="图片/视频" prop="url" style="width: 100%">
        <el-upload
          v-model="form.url"
          class="upload-demo"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileurlList"
          :on-preview="handlePreview"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          :list-type="types"
        >
          <el-button size="small" type="primary">点击上传图片/视频</el-button>
          <div slot="tip" class="el-upload__tip" />
        </el-upload>
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
import { getarticleLists } from '@/api/system/article'
import { sysfileAdd } from '@/api/upload'
const defaultForm = {
  id: null,
  articleid: '',
  content: '',
  type: '',
  url: '',
  fileurlList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      types: 'text',
      articleIdList: [],
      typeList: [
        {
          value: 0,
          name: '图片'
        },
        {
          value: 1,
          name: '文字'
        },
        {
          value: 2,
          name: '视频'
        }
      ],
      rules: {
        articleid: [
          {
            required: true,
            message: '请选择文章',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '请选择图片或视频',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {
    }
    getarticleLists(data).then(res => {
      this.articleIdList = res.data
    })
  },
  methods: {
    handleRemove(file, fileList) {
      this.form.fileurlList = fileList
    },
    handlePreview(file, fileList) {
      this.form.fileurlList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileurlList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdd(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.fileurlList.push({
            'name': res.data.url,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.url = res.data.url
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
<style>
  .editor{
    width: 500px !important;
  }
</style>

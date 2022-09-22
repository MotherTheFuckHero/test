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
      <el-form-item label="礼物名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="礼物价格（金币）" prop="price" label-width="120px">
        <el-input v-model="form.price" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="礼物图片" prop="cover">
        <el-upload
          v-model="form.cover"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.filegiftPicKeyList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.cover"
          multiple
        >
          <em class="el-icon-plus" />
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
import { sysfileAdd } from '@/api/upload'
const defaultForm = {
  id: null,
  name: '',
  price: '',
  cover: '',
  filegiftPicKeyList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入礼物名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入礼物价格', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请选择礼物图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.filegiftPicKeyList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.filegiftPicKeyList = fileList
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
          _this.form.filegiftPicKeyList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.cover = res.data.url
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

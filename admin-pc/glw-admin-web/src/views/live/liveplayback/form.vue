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
      <el-form-item label="直播" prop="liveId">
        <el-select v-model="form.liveId" clearable style="width: 200px;" placeholder="选择直播">
          <el-option
            v-for="item in liveIdList"
            :key="item.id"
            :label="item.liveName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="回放名称" prop="playName">
        <el-input v-model="form.playName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="海报" prop="imageKey" style="display: block">
        <el-upload
          v-model="form.imageKey"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileimageKeyList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.imageKey"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="文件" prop="playKey">
        <el-upload
          v-model="form.playKey"
          class="upload-demo"
          action="/"
          :http-request="fileAdds"
          :limit="1"
          accept="audio/mp4,video/mp4"
          :file-list="form.filestorageList"
          :on-preview="handlePreviews"
          :on-exceed="handleExceeds"
          :on-remove="handleRemoves"
        >
          <el-button size="small" type="primary">点击上传</el-button>
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
import { sysfileAdds } from '@/api/upload'
import { getliveroomLists } from '@/api/live/liveroom'
const defaultForm = {
  id: null,
  playName: '',
  playSize: '',
  liveId: '',
  imageKey: '',
  playKey: '',
  fileimageKeyList: [],
  filestorageList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      liveIdList: [],
      rules: {
        playName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
        liveId: [
          { required: true, message: '请选择直播', trigger: 'blur' }
        ],
        playKey: [
          { required: true, message: '请选择文件', trigger: 'blur' }
        ],
        imageKey: [
          { required: true, message: '请选择海报', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const data = {}
    getliveroomLists(data).then(res => {
      this.liveIdList = res.data
    })
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileimageKeyList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileimageKeyList = fileList
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
          _this.form.fileimageKeyList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.imageKey = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },

    // 图片提交
    handleRemoves(file, fileList) {
      this.form.filestorageList = fileList
    },
    handlePreviews(file, fileList) {
      this.form.filestorageList = fileList
    },
    handleExceeds(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.filestorageList = fileList
    },
    // 选择文件
    fileAdds(fileList) {
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
          this.form.playName = res.data.fileName
          this.form.playSize = res.data.size
          _this.form.playKey = res.data.key
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

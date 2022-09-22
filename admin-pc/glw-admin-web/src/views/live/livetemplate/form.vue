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
      <el-form-item label="主播" prop="userId" style="display: inline-block">
        <el-select v-model="form.userId" clearable placeholder="主播" style="width: 200px;">
          <el-option
            v-for="item in liveActorList"
            :key="item.userId"
            :label="item.nickName"
            :value="item.userId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="name">
        <el-input v-model="form.name" style="width:200px;" />
      </el-form-item>
      <el-form-item label="分辨率" prop="resolution">
        <el-input v-model="form.resolution" style="width:200px;" />
      </el-form-item>
      <el-form-item label="码率" prop="bitrate">
        <el-input v-model="form.bitrate" style="width:200px;" />
      </el-form-item>
      <el-form-item label="帧率" prop="fps">
        <el-input v-model="form.fps" style="width:200px;" />
      </el-form-item>
      <el-form-item label="宽高比" prop="ratio">
        <el-input v-model="form.ratio" style="width:200px;" />
      </el-form-item>
      <el-form-item label="顶部字幕" prop="subtitleTop">
        <el-input v-model="form.subtitleTop" style="width:505px;" />
      </el-form-item>
      <div>
        <el-form-item label="台标" prop="stationLogo">
          <el-upload
            v-model="form.stationLogo"
            action="/"
            :http-request="fileAdds"
            :limit="1"
            :file-list="form.filestationLogoList"
            :on-exceed="handleExceeds"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :on-remove="handleRemoves"
            multiple
          >
            <em class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item label="垫片" prop="backfile" style="width: 100%">
        <el-upload
          v-model="form.backfile"
          class="upload-demo"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.filestorageList"
          :on-preview="handlePreview"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          :list-type="types"
        >
          <el-button size="small" type="primary">点击上传垫片</el-button>
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
import { getliveActorLists } from '@/api/live/liveproduct'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  name: '',
  userId: '',
  resolution: '',
  bitrate: '',
  fps: '',
  ratio: '',
  backfile: '',
  stationLogo: '',
  subtitleTop: '',
  filestorageList: [],
  filestationLogoList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      liveActorList: [],
      types: 'text',
      rules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请选择主播', trigger: 'blur' }
        ],
        resolution: [
          { required: true, message: '请输入分辨率', trigger: 'blur' }
        ],
        bitrate: [
          { required: true, message: '请输入码率', trigger: 'blur' }
        ],
        fps: [
          { required: true, message: '请输入帧率', trigger: 'blur' }
        ],
        ratio: [
          { required: true, message: '请输入高宽比', trigger: 'blur' }
        ]
        // subtitleTop: [
        //   { required: true, message: '请输入顶部字幕', trigger: 'blur' }
        // ],
        // backfile: [
        //   { required: true, message: '请选择垫片上传', trigger: 'blur' }
        // ],
        // stationLogo: [
        //   { required: true, message: '请选择台标上传', trigger: 'blur' }
        // ]
      }
    }
  },
  created() {
    const data = {}
    getliveActorLists(data).then(res => {
      this.liveActorList = res.data
    })
  },
  methods: {
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
            'name': res.data.url,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.backfile = res.data.key
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    handleRemoves(file, fileList) {
      this.form.filestationLogoList = fileList
    },
    handleExceeds(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.filestationLogoList = fileList
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
          _this.form.filestationLogoList.push({
            'key': res.data.key,
            'url': res.data.url
          })
          _this.form.stationLogo = res.data.key
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

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
      <el-form-item label="停车场层" prop="layerId">
        <el-select v-model="form.layerId" clearable filterable placeholder="停车场层" style="width: 200px;">
          <el-option
            v-for="item in layerIdList"
            :key="item.id"
            :label="item.layerName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区名称" prop="areaName">
        <el-input v-model="form.areaName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="层状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="层状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区图片" prop="areaPic" style="display: inline">
        <el-upload
          v-model="form.areaPic"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
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
import { getparkLayerLists } from '@/api/parking/parkLayer'
import { ParkAreaStatusLists } from '@/api/parking/parkArea'
const defaultForm = {
  id: null,
  layerId: '',
  areaName: '',
  areaPic: '',
  fileList: [],
  status: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      statusList: [],
      layerIdList: [],
      rules: {
        layerId: [
          { required: true, message: '请选择停车场层', trigger: 'blur' }
        ],
        areaName: [
          {
            required: true,
            message: '请输入区名称',
            trigger: 'blur'
          }
        ],
        areaPic: [
          {
            required: true,
            message: '请上传区图片',
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
    const datas = {
      status: 1
    }
    getparkLayerLists(datas).then(res => {
      this.layerIdList = res.data
    })
    const data = {
    }
    ParkAreaStatusLists(data).then(res => {
      this.statusList = res.data
    })
  },
  methods: {
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
          _this.form.areaPic = res.data.key
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

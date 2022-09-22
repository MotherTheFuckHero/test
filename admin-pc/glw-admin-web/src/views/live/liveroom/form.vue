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
      <el-form-item label="直播间名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="播放地址" prop="previewUrl">
        <el-input v-model="form.previewUrl" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="所属分类" prop="columnId">
        <el-select v-model="form.columnId" clearable filterable style="width: 200px;" placeholder="所属分类">
          <el-option
            v-for="item in columnIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="直播模板" prop="templateId">
        <el-select v-model="form.templateId" clearable filterable style="width: 200px;" placeholder="直播模板">
          <el-option
            v-for="item in templateIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 200px;"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 200px;"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" style="width: 400px;">
          <el-radio class="radio" :label="true">开播</el-radio>
          <el-radio class="radio" :label="false">停播</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="海报地址" prop="cover">
        <el-upload
          v-model="form.cover"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.filecoverPicKeyList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.coverPicKey"
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
import { getlivetemplateLists } from '@/api/live/livetemplate'
import { getlivecolumnLists } from '@/api/live/livecolumn'
const defaultForm = {
  id: null,
  name: '',
  columnId: '',
  templateId: '',
  cover: '',
  actorId: 0,
  status: false,
  cameraCount: 1,
  surpport: 0,
  viwerCount: 0,
  previewUrl: '',
  endTime: '',
  startTime: '',
  position: '遵化',
  longitude: '117.949718',
  latitude: '40.196894',
  filecoverPicKeyList: []

  // // 新直播添加字段
  // nickName: '',
  // actorId: 0,
  // headImg: '',
  // headImgList: [],
  // peopleNum: '',
  // liveType: '',
  // equipNum: '',
  // isMerchant: '',
  // cardType: '',
  // cardNum: '',

}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      columnIdList: [],
      templateIdList: [],
      rules: {
        name: [
          { required: true, message: '请输入直播名称', trigger: 'blur' }
        ],
        previewUrl: [
          { required: true, message: '请输入播放地址', trigger: 'blur' }
        ],
        columnId: [
          { required: true, message: '请选择直播分类', trigger: 'blur' }
        ],
        templateId: [
          { required: true, message: '请选择直播模板', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请选择直播海报', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const data = {
    }
    getlivecolumnLists(data).then(res => {
      this.columnIdList = res.data
    })
    getlivetemplateLists(data).then(res => {
      this.templateIdList = res.data
    })
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.filecoverPicKeyList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.filecoverPicKeyList = fileList
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
          _this.form.filecoverPicKeyList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.cover = res.data.key
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

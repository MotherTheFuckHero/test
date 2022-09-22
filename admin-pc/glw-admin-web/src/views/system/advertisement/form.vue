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
      <el-form-item label="位置" prop="position">
        <el-select v-model="form.position" clearable style="width: 200px;" placeholder="位置">
          <el-option
            v-for="item in positionList"
            :key="parseFloat(item.dataCode)"
            :label="item.dataDesc"
            :value="parseFloat(item.dataCode)"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="标题" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="链接地址" prop="link">
        <el-input v-model="form.link" maxlength="255" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          style="width: 200px;"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          style="width: 200px;"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="活动内容" prop="content">
        <el-input v-model="form.content" type="textarea" style="width: 505px;" maxlength="255" />
      </el-form-item>
      <el-form-item label="图片" prop="image">
        <el-upload
          v-model="form.image"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileimageList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.image"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="form.dialogVisible">
          <img width="100%" :src="form.dialogImageUrl" alt="">
        </el-dialog>
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
import { getcompanyLists } from '@/api/system/company'
import { getsystemLists } from '@/api/system/sys'
import { positionLists } from '@/api/system/advertisement'
import { getlanguageLists } from '@/api/system/language'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  name: '',
  systemId: '',
  languageId: '',
  link: '',
  position: '',
  content: '',
  startTime: '',
  endTime: '',
  image: '',
  dialogImageUrl: '',
  dialogVisible: false,
  fileimageList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      systemIdList: [],
      companyIdList: [],
      positionList: [],
      languageIdList: [],
      rules: {

        name: [
          {
            required: true,
            message: '请输入标题',
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
            message: '请选择语言',
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
        link: [
          {
            required: true,
            message: '请输入链接地址',
            trigger: 'blur'
          }
        ],
        image: [
          {
            required: true,
            message: '请选择图片',
            trigger: 'blur'
          }
        ],
        position: [
          {
            required: true,
            message: '请选择位置',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入活动内容',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请选择结束时间',
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
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    positionLists(data).then(res => {
      this.positionList = res.data
    })
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileimageList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileimageList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData).then(res => {
        console.log(res)
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.fileimageList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.image = res.data.key
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

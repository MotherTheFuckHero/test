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
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="板块" prop="panelId">
        <el-select v-model="form.panelId" clearable style="width: 200px;" placeholder="板块">
          <el-option
            v-for="item in panelList"
            :key="item.id"
            :label="item.name+'('+item.companyName+')'"
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
      <el-form-item label="排序" prop="sortNo">
        <el-input v-model="form.sortNo" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" style="width: 200px;">
          <el-radio class="radio" :label="1">显示</el-radio>
          <el-radio class="radio" :label="2">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否推荐" prop="isRecommend">
        <el-radio-group v-model="form.isRecommend" style="width: 200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标" prop="icon" style="display: block">
        <el-upload
          v-model="form.icon"
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
import { getpanelLists } from '@/api/panel/panel'
import { getlanguageLists } from '@/api/system/language'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  panelId: '',
  name: '',
  parentId: 0,
  status: 1,
  icon: '',
  sortNo: 1,
  languageId: 1,
  isRecommend: false,
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      panelList: [],
      languageIdList: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }
        ],
        panelId: [
          {
            required: true,
            message: '请选择板块分类',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ],
        isRecommend: [
          {
            required: true,
            message: '请选择是否推荐',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {
      status: 1,
      type: 2
    }
    getpanelLists(data).then(res => {
      this.panelList = res.data
    })
    const datas = {
      status: 1
    }
    getlanguageLists(datas).then(res => {
      this.languageIdList = res.data
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
          _this.form.icon = res.data.key
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

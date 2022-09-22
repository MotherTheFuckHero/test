<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.communityName" clearable size="small" placeholder="输入社区名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <rrOperation />
    <el-upload
      class="upload-demo"
      action="/"
      :http-request="downloadss"
      :limit="1"
      :file-list="newList"
      :on-preview="handlePreview"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      style="display: inline-block"
    >
      <el-button size="mini" type="warning" class="filter-item">导入楼门长表</el-button>
    </el-upload>
    <el-button size="mini" type="warning" icon="el-icon-download" class="filter-item" @click="crud.doExport">导出楼门长数据格式模板</el-button>
  </div>
</template>

<script>
import { header } from '@crud/crud'
import { userDoordownload } from '@/api/user/userinfo'
import rrOperation from '@crud/RR.operation'
export default {
  components: { rrOperation },
  mixins: [header()],
  props: {
    permission: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newList: []
    }
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.newList = fileList
    },
    handlePreview(file, fileList) {
      this.newList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.newList = fileList
    },
    downloadss(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      userDoordownload(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.$message({
            message: res.data,
            type: 'success'
          })
          this.newList = []
          this.crud.refresh()
        } else {
          this.newList = []
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

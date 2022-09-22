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
      <el-form-item label="活动列表" prop="activityId">
        <el-select v-model="form.activityId" clearable placeholder="活动列表" style="width: 200px;">
          <el-option
            v-for="item in activityIdList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="奖品名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="奖品类型" prop="type">
        <el-select v-model="form.type" clearable placeholder="奖品类型" style="width: 200px;">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="奖品等级" prop="level">
        <el-select v-model="form.level" clearable placeholder="奖品等级" style="width: 200px;">
          <el-option
            v-for="item in levelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <el-input v-model="form.sortNo" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="库存" prop="inventory">
        <el-input v-model="form.inventory" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="奖品描述" prop="desc">
        <el-input v-model="form.desc" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="是否受限" prop="limit">
        <el-radio-group v-model="form.limit" style="width: 200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="奖品图标" prop="icon">
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
import { getraffleactivityLists } from '@/api/activity/raffleactivity'
import { activitiestypeLists } from '@/api/activity/raffleprize'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  activityId: '',
  type: '',
  name: '',
  icon: '',
  desc: '',
  level: '',
  sortNo: 1,
  limit: '',
  inventory: 0,
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      activityIdList: [],
      typeList: [],
      levelList: [
        {
          value: 1,
          label: '一等奖'
        },
        {
          value: 2,
          label: '二等奖'
        },
        {
          value: 3,
          label: '三等奖'
        }
      ],
      rules: {
        activityId: [
          {
            required: true,
            message: '请选择活动',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择奖品类型',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入奖品名称',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            required: true,
            message: '请选择奖品图标',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入奖品说明',
            trigger: 'blur'
          }
        ],
        level: [
          {
            required: true,
            message: '请选择奖品等级',
            trigger: 'blur'
          }
        ],
        sortNo: [
          {
            required: true,
            message: '请输入奖品排序',
            trigger: 'blur'
          }
        ],
        limit: [
          {
            required: true,
            message: '请选择是否限制',
            trigger: 'blur'
          }
        ],
        inventory: [
          {
            required: true,
            message: '请输入奖品库存',
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
    getraffleactivityLists(data).then(res => {
      this.activityIdList = res.data
    })
    activitiestypeLists(data).then(res => {
      this.typeList = res.data
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

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
      <el-form-item label="导游名称" prop="name">
        <el-input v-model="form.name" style="width: 200px" />
      </el-form-item>
      <el-form-item label="选择用户" prop="userId">
        <el-select v-model="form.userId" clearable filterable remote placeholder="请输入用户昵称关键字搜索" :remote-method="remoteMethod" style="width: 200px;">
          <template v-for="item in userIdList">
            <el-option
              v-if="item.nickName !==''"
              :key="item.id"
              :label="item.userName+'('+item.nickName+')'"
              :value="item.id"
            />
            <el-option
              v-else-if="item.nickName ===''"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="带团手机号" prop="guidePhone">
        <el-input v-model.number="form.guidePhone" type="number" style="width: 200px" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="费用类型" prop="expensesType">
        <el-select v-model="form.expensesType" clearable filterable style="width: 200px;" placeholder="费用类型" @change="expensesTypechange">
          <el-option
            v-for="item in expensesTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="结算费用" prop="expensesValue">
        <el-input v-model.number="form.expensesValue" type="number" style="width: 200px" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="导游费用/天" prop="price">
        <el-input v-model="form.price" type="number" style="width: 200px" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="带团年限" prop="workYear">
        <el-input v-model.number="form.workYear" type="number" style="width: 200px" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable filterable style="width: 200px;" placeholder="状态">
          <el-option
            v-for="item in StatusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="导游级别" prop="levelId">
        <el-select v-model="form.levelId" clearable style="width: 200px;" placeholder="导游级别">
          <el-option
            v-for="item in levelIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.status===2" label="拒绝原因" prop="rejectReason" :rules="[{ required: true, message: '请输入拒绝原因', trigger: 'blur' }]">
        <el-input v-model="form.rejectReason" style="width: 504px" />
      </el-form-item>
      <el-form-item label="导游分类" prop="categoryList">
        <el-select v-model="form.categoryList" clearable multiple style="width: 504px;" placeholder="导游分类">
          <el-option
            v-for="item in categoryListList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="游玩类型" prop="playList">
        <el-select v-model="form.playList" clearable multiple style="width: 504px;" placeholder="游玩类型">
          <el-option
            v-for="item in playListList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="带团语言" prop="languageList">
        <el-select v-model="form.languageList" clearable multiple style="width: 504px;" placeholder="带团语言">
          <el-option
            v-for="item in languageIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="个性签名" prop="remark">
        <el-input v-model="form.remark" style="width: 504px" />
      </el-form-item>
      <el-form-item label="导游证件号" prop="certificateNo">
        <el-input v-model.number="form.certificateNo" type="number" style="width: 504px" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="导游证" prop="certificateImg">
        <el-upload
          v-model="form.certificateImg"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
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
import { guideUserStatus } from '@/api/guide/guideUser'
import { getguideCategoryLists } from '@/api/guide/guideCategory'
import { getcompanyLists } from '@/api/system/company'
import { getuserinfoLists } from '@/api/user/userinfo'
import { sysfileAdds } from '@/api/upload'
const defaultForm = {
  id: null,
  companyId: '',
  userId: '',
  levelId: '',
  name: '',
  rejectReason: '',
  guidePhone: '',
  price: '',
  remark: '',
  workYear: '',
  status: 0,
  income: 0,
  expensesType: 1,
  expensesValue: 0,
  certificateNo: '',
  certificateImg: '',
  playList: [],
  languageList: [],
  categoryList: [],
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      StatusList: [],
      companyIdList: [],
      languageIdList: [],
      userIdList: [],
      levelIdList: [],
      playListList: [],
      categoryListList: [],
      expensesTypeList: [
        {
          value: 1,
          name: '比例'
        },
        {
          value: 2,
          name: '佣金'
        },
        {
          value: 3,
          name: '无费用'
        }
      ],
      rules: {
        playList: [
          { required: true, message: '请选择游玩类型', trigger: 'blur' }
        ],
        categoryList: [
          { required: true, message: '请选择导游分类', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请选择所属分公司', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请选择用户', trigger: 'blur' }
        ],
        levelId: [
          { required: true, message: '请选择导游级别', trigger: 'blur' }
        ],
        languageList: [
          { required: true, message: '请选择带团语言', trigger: 'blur' }
        ],
        expensesType: [
          { required: true, message: '请选择费用类型', trigger: 'blur' }
        ],
        expensesValue: [
          { required: true, message: '请输入费用值', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入导游名称', trigger: 'blur' }
        ],
        guidePhone: [
          { required: true, message: '请输入带团手机号', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入导游费用/天', trigger: 'blur' }
        ],
        workYear: [
          { required: true, message: '请输入带团年限', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.userId': function(newQuestion, oldQuestion) {
      if (this.form.userId !== '') {
        const data = {
          id: this.form.userId,
          status: 1
        }
        getuserinfoLists(data).then(res => {
          this.userIdList = res.data
        })
      }
    }
  },
  created() {
    const data = {
    }
    guideUserStatus(data).then(res => {
      this.StatusList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    getguideCategoryLists({ languageId: 1 }).then(res => {
      for (var s = 0; s < res.data.length; s++) {
        if (res.data[s].type === 1) {
          this.categoryListList.push({
            id: res.data[s].id,
            name: res.data[s].name
          })
        } else if (res.data[s].type === 2) {
          this.playListList.push({
            id: res.data[s].id,
            name: res.data[s].name
          })
        } else if (res.data[s].type === 3) {
          this.levelIdList.push({
            id: res.data[s].id,
            name: res.data[s].name
          })
        } else if (res.data[s].type === 4) {
          this.languageIdList.push({
            id: res.data[s].id,
            name: res.data[s].name
          })
        }
      }
    })
  },
  methods: {
    expensesTypechange() {
      this.form.expensesValue = 0
    },
    remoteMethod(query) {
      const data = {
        nickName: query,
        status: 1
      }
      getuserinfoLists(data).then(res => {
        this.userIdList = res.data
      })
    },
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
          _this.form.certificateImg = res.data.key
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
  .mymap {
    width: 100%;
    height: 500px;
  }
  .amap-sug-result {
    z-index: 4000!important;
  }
  #tangram-suggestion--TANGRAM__u-main{
    z-index: 3000!important;
  }
</style>

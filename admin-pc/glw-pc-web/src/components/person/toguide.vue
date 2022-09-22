<template>
    <div class="service-container">
      <h2>导游申请
        <span v-if="guideData.status == 0">(审核中)</span>
        <span v-if="guideData.status == 2">(审核拒绝--拒绝原因:{{guideData.rejectReason}})</span>
        <span v-if="guideData.status == 3">(冻结)</span>
      </h2>
      <div class="service-body">
        <div style="margin-top: 30px;">
          <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
            <el-form-item label="导游名称" prop="name">
              <el-input v-model="form.name"  :disabled="readOnlied" style="width: 200px" />
            </el-form-item>
            <el-form-item label="带团手机号" prop="guidePhone">
              <el-input v-model.number="form.guidePhone"  :disabled="readOnlied" type="number" style="width: 200px" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="导游费用/天" prop="price">
              <el-input v-model="form.price" type="number"  :disabled="readOnlied" style="width: 200px" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="带团年限" prop="workYear">
              <el-input v-model.number="form.workYear"  :disabled="readOnlied"  type="number" style="width: 200px" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="导游级别" prop="levelId">
              <el-select v-model="form.levelId"  :disabled="readOnlied" clearable style="width: 504px;" placeholder="导游级别">
                <el-option
                  v-for="item in levelIdList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="导游分类" prop="categoryList">
              <el-select v-model="form.categoryList"  :disabled="readOnlied" clearable multiple style="width: 504px;" placeholder="导游分类">
                <el-option
                  v-for="item in categoryListList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="游玩类型" prop="playList">
              <el-select v-model="form.playList"  :disabled="readOnlied" clearable multiple style="width: 504px;" placeholder="游玩类型">
                <el-option
                  v-for="item in playListList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="带团语言" prop="languageList">
              <el-select v-model="form.languageList"  :disabled="readOnlied" clearable multiple style="width: 504px;" placeholder="带团语言">
                <el-option
                  v-for="item in languageIdList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="个性签名" prop="remark">
              <el-input v-model="form.remark"  :disabled="readOnlied" style="width: 504px" />
            </el-form-item>
            <el-form-item label="导游证件号" prop="certificateNo">
              <el-input v-model.number="form.certificateNo"  :disabled="readOnlied" type="number" style="width: 504px" @mousewheel.native.prevent />
            </el-form-item>
            <el-form-item label="导游证" prop="certificateImg">
              <el-upload
                v-model="form.certificateImg"
                action="/"
                :disabled="readOnlied"
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
            <el-form-item style="width: 100%" v-if="form.id == null">
              <el-button type="primary" @click="submitForm('form')">提交申请</el-button>
            </el-form-item>
            <el-form-item style="width: 100%" v-if="guideData.status == 2">
              <el-button type="primary" @click="submitForms('form')">再次提交申请</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
</template>

<script>
import {fileAdd} from  '../../api/file'
import {guideList,postguide,postguides,getisguide} from  '../../api/guide'
export default {
  name: 'AfterService',
  data(){
    return{
      guideData:{},
      readOnlied: false,
      form:{
        id: null,
        companyId: '',
        levelId: '',
        name: '',
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
        fileList: [],
      },
      languageIdList: [],
      levelIdList: [],
      playListList: [],
      categoryListList: [],
      rules: {
        playList: [
          { required: true, message: '请选择游玩类型', trigger: 'blur' }
        ],
        categoryList: [
          { required: true, message: '请选择导游分类', trigger: 'blur' }
        ],
        levelId: [
          { required: true, message: '请选择导游级别', trigger: 'blur' }
        ],
        languageList: [
          { required: true, message: '请选择带团语言', trigger: 'blur' }
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
      }
    }
  },
  created () {
   this.getguide()
    let companyId = JSON.parse(localStorage.getItem("companyId"));
    this.form.companyId = companyId
    let data={
      languageId:1
    }
    guideList(data).then(res=>{
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
  methods:{
    getguide(){
      getisguide().then(res=>{
        if(res.data !=null){
          this.guideData=res.data
          this.form.id=res.data.id
          this.form.companyId=res.data.companyId
          this.form.levelId=res.data.levelId
          this.form.name=res.data.name
          this.form.guidePhone=res.data.guidePhone
          this.form.price=res.data.price
          this.form.remark=res.data.remark
          this.form.workYear=res.data.workYear
          this.form.status=res.data.status
          this.form.income=res.data.income
          this.form.expensesType=res.data.expensesType
          this.form.expensesValue=res.data.expensesValue
          this.form.certificateNo=res.data.certificateNo
          this.form.certificateImg=res.data.certificateImg
          this.form.playList=res.data.playList
          this.form.languageList=res.data.languageList
          this.form.languageList=res.data.languageList
          this.form.categoryList=res.data.categoryList
          if(res.data.certificateImg){
            this.form.fileList=[{
              key:res.data.certificateImg,
              url:res.data.certificateImgUrl,
            }]
          }
          if(res.data.status==0 || res.data.status==4){
               this.readOnlied=true
          }else {
            this.readOnlied=false
          }
        }
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
      fileAdd(formData).then(res => {
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
    },
    // 添加提交
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //判断是否填写完整  --true
          this.$confirm("确认提交申请吗？", "提示", {}).then(() => {
            var data = this.form
            postguide(data)
              .then(
                function(response) {
                  var code = response.code;
                  var msg = response.msg;
                  if(code === "0"){
                    this.$message({
                      message: msg,
                      type: 'success'
                    });
                    this.getguide()
                  }else{
                    this.$message({
                      message: msg,
                      type: 'warning'
                    });
                    this.$refs["form"].resetFields();  // 表单重置
                  }
                }.bind(this)
              )
          });
        } else {
          return false;
        }
      });
    },
    // 再次提交申请
    submitForms(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //判断是否填写完整  --true
          this.$confirm("确认提交申请吗？", "提示", {}).then(() => {
            var data = this.form
            data.status=0
            var id = this.form.id
            postguides(id,data)
              .then(
                function(response) {
                  var code = response.code;
                  var msg = response.msg;
                  if(code === "0"){
                    this.$message({
                      message: msg,
                      type: 'success'
                    });
                    this.getguide()
                  }else{
                    this.$message({
                      message: msg,
                      type: 'warning'
                    });
                    this.$refs["form"].resetFields();  // 表单重置
                  }
                }.bind(this)
              )
          });
        } else {
          return false;
        }
      });
    },
  }
};
</script>

<style scoped>
.service-container{
  width: 100%;
  padding: 30px;
  height: 100%;
  overflow-y: scroll;
}
.service-container h2{
  width: 100%;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #E0E0E0;
}
.service-body{
  width: 100%;
}
/deep/ .el-form-item{
  display: inline-block;
}
/deep/ .ivu-modal-body{
  text-align: center;

}
/deep/ .ivu-modal-body img{
display: inline !important;
}
</style>

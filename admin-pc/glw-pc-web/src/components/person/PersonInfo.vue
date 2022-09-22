<template>
    <div class="person-container">
      <h2>{{$t("personalCenter.personalInformation")}}</h2>
      <div class="person-body">
        <div class="person-tabs">
          <div :class="{ tabActive : i === isActive }" class="tab" v-for="(v, i) in tabList" :key="i" @click="tabClick(i)">{{v.label}}</div>
        </div>
        <div class="person-tabBody">
          <div class="botInfo" v-show="isActive === 0">
            <div class="bot">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item :label="$t('personalCenter.nickname')" prop="name">
                  <Input v-model="formValidate.name" :placeholder="$t('personalCenter.Pleasenickname')"></Input>
                </Form-item>
                <Form-item :label="$t('personalCenter.username')"prop="user">
                  <Input v-model="formValidate.user" :placeholder="$t('personalCenter.enterusername')"></Input>
                </Form-item>
                <Form-item :label="$t('personalCenter.Gender')" prop="gender">
                  <Radio-group v-model="formValidate.gender">
                    <Radio :label="1">{{$t("personalCenter.male")}}</Radio>
                    <Radio :label="0">{{$t("personalCenter.female")}}</Radio>
                  </Radio-group>
                </Form-item>
                <Form-item>
                  <Button type="ghost" @click="handleSubmit('formValidate')">{{$t("personalCenter.Submit")}}</Button>
                  <Button type="text" @click="handleReset('formValidate')" style="margin-left: 8px">{{$t("personalCenter.Reset")}}</Button>
                </Form-item>
              </Form>
            </div>
            <div class="head">
              <div class="head-down">
                <div>
                  <img alt="" :src="userInfo.headImg">
                </div>
                <div>
                  <p>{{$t("personalCenter.username")}}:{{formValidate.user}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="headInfo" v-show="isActive === 1">
            <Upload
              ref="upload"
              :show-upload-list="false"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccess"
              :on-error="handleError"
              :format="['jpg','jpeg','png']"
              :max-size="4048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button type="ghost" class="uploadBtn">选择您要上传的头像</Button>
              <p>仅支持JPG、PNG、JPEG格式，文件小于4M</p>
            </Upload>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PersonInfo',
  props: {
    userInfo: Object,
    required: true
  },
  data () {
    return {
      isActive: 0,
      tabList: [
        {
          label:this.$t("personalCenter.Essentialinformation"),
          value: 1
        },
        // {
        //   label: '头像照片',
        //   value: 2
        // }
      ],
      formValidate: {
        name: this.userInfo.nickName,
        user: this.userInfo.userName,
        gender: this.userInfo.sex,
      },
      ruleValidate: {
        name: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
        user: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }]
      }
    };
  },
  methods: {
    tabClick (i) {
      this.isActive = i;
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    handleSuccess (res, file) {

    },
    handleBeforeUpload () {

    },
    handleError (event, file) {
      this.$Notice.error({
        title: '文件上传失败',
        desc: '文件 ' + file.name + ' 上传失败。'
      });
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件大小限制',
        desc: '文件大小不超过4MB.'
      });
    }
  }
};
</script>

<style scoped>
  .person-container {
    width: 100%;
    padding: 30px;
    height: 100%;
    overflow-y: scroll;
  }
  .person-container h2{
    width: 100%;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #E0E0E0;
  }
  .person-body{
    width: 100%;
  }
  .person-tabs{
    width: 40%;
    display: flex;
    justify-content: space-around;
    padding: 30px 20px;
  }
  .tab{
    color: #999999;
    font-size: 14px;
  }
  .tab:hover{
    color: #FC405E;
    cursor: pointer;
  }
  .tabActive{
    color: #FC405E;
    border-bottom: 2px solid #FC405E;
  }
  .person-tabBody{
    width: 100%;
  }
  .person-tabBody>.botInfo{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .botInfo>.bot{
    width: 45%;
  }
  .botInfo>.head{
    width: 50%;
  }
  .head-down{
    width: 90%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 14px 35px 20px rgba(93, 93, 93, 0.08);
    border-radius: 12px;
  }
  .head-down>div:nth-of-type(1){
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .head-down>div:nth-of-type(2){
    width: 55%;
    display: flex;
    align-items: center;
  }
  .head-down>div:nth-of-type(1)>img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .head-down>div:nth-of-type(2)>p{
    color: #666666;
    font-size: 14px;
    font-weight: 600;
  }
  .headInfo{
    width: 100%;
    padding-left: 40px;
  }
  .uploadBtn{
    width: 244px !important;
    color: #FC405E;
    border: 1px solid #FC405E;
  }
  .uploadBtn:hover{
    color: #ffffff;
    background: #FC405E;
  }
  .uploadBtn + p{
    color: #999999;
    font-size: 14px;
    margin-top: 5px;
  }
</style>

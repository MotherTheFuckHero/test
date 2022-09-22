<template>
    <div class="general-container">
      <div class="general-tabs">
        <div :class="{ tabActive : i === isActive }" class="tab" v-for="(v, i) in tabList" :key="i" @click="tabClick(i)">{{v.label}}</div>
      </div>
      <div class="general-tabBody">
<!--        收货地址-->
        <div class="addressInfo" v-show="isActive === 0">
          <Button class="add-address" @click="addressAddModel = true">{{$t("personalCenter.Addshippingaddress")}}</Button>
          <div class="not-address-img" v-if="addressModelList.length === 0">
            <img alt="" src="../../images/dizhi_quesheng_bg.png">
          </div>
          <div v-else class="address-model" v-for="(v, i) in filteraddressModelList" :key="i">
            <Icon class="address-model-close" type="close-round" @click="addressDel(v)"></Icon>
            <p>
              {{v.receiverName}}
              <span v-if="v.isDefault === 1">{{$t("personalCenter.Defaultaddress")}}</span>
            </p>
            <div class="address-info">
              <div>
                <p>{{$t("personalCenter.consignee")}}：</p>
                <p>{{$t("personalCenter.Location")}}：</p>
                <p>{{$t("personalCenter.address")}}：</p>
                <p>{{$t("personalCenter.phone")}}：</p>
                <p>{{$t("personalCenter.fixedtelephone")}}：</p>
                <p>{{$t("personalCenter.E-mail")}}：</p>
              </div>
              <div>
                <p>{{v.receiverName}}</p>
                <p>{{v.receiverStateName}}/{{v.receiverCityName}}/{{v.receiverDistrictName}}</p>
                <p>{{v.receiverAddress}}</p>
                <p>{{v.receiverMobile}}</p>
                <p>{{v.receiverPhone}}</p>
                <p>{{v.receiverZip}}</p>
              </div>
            </div>
            <p class="address-model-update">
              <span class="address-model-update-default" v-if="v.isDefault === 0" @click="setAddressDefault(v)">{{$t("personalCenter.Setasdefault")}}</span>
            </p>
          </div>
          <Page :total="addressListCurrent"  @on-change="getNewAddressList" class="attractionsDetail-content-pageList"/>
        </div>
<!--        游客信息-->
        <div class="addressInfo" v-if="isActive === 1">
          <Button class="add-address" @click="contactsAddModel = true">{{$t("personalCenter.addTouristinformation")}}</Button>
          <div class="not-address-img" v-if="contactsModelList.length === 0">
            <img alt="" src="../../images/dizhi_quesheng_bg.png">
          </div>
          <div v-else class="address-model" v-for="(v, i) in filtercontactsModelList" :key="i">
            <Icon class="address-model-close" type="close-round" @click="contactsDel(v)"></Icon>
            <p>
              {{v.receiverName}}
              <span v-if="v.isDefault === 1">{{$t("personalCenter.Setasdefault")}}</span>
            </p>
            <div class="address-info">
              <div>
                <p>{{$t("personalCenter.name")}}：</p>
                <p>{{$t("personalCenter.Addshippingaddress")}}{{$t("personalCenter.phone")}}：</p>
                <p>{{$t("personalCenter.IDnumber")}}：</p>
              </div>
              <div>
                <p>{{v.name}}</p>
                <p>{{v.phone}}</p>
                <p>{{v.idCardNo}}</p>
              </div>
            </div>
            <p class="address-model-update">
              <span class="address-model-update-default" v-if="v.isDefault === 0" @click="setcontactsDefault(v)">{{$t("personalCenter.Setasdefault")}}</span>
            </p>
          </div>
          <Page :total="contactsListCurrent" v-if="contactsModelList.length !== 0" @on-change="getNewcontactsList" class="attractionsDetail-content-pageList"/>
        </div>
      </div>
      <Modal
        v-model="addressAddModel"
        :title="$t('personalCenter.Addshippingaddress')"
        :loading="loading"
        :mask-closable="false"
        :closable="false"
        @on-ok="asyncAddressAddOK"
        @on-cancel="asyncAddressAddCancel"
        class="add-address-model"
      >
        <Form ref="formValidate" :model="addressForm" :rules="ruleValidate" :label-width="110">
          <Form-item v-if="!isen" :label="$t('personalCenter.Receivingregion')" prop="city" :rules="[{ required: true, message: '请选择收件地区', trigger: 'change' }]" class="divwrap" >
            <Distpicker  :province="addressForm.province" :city="addressForm.city" :area="addressForm.area" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
          </Form-item>
          <Form-item v-else :label="$t('personalCenter.Receivingregion')"  class="divwrap" >
            <el-select style="display: inline-block;width: 170px" v-model="addressForm.cityId" filterable  @change="citychange">
              <el-option
                v-for="item in encityList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select style="display: inline-block;width: 170px"  v-model="addressForm.areaId" filterable >
              <el-option
                v-for="item in enareaList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </Form-item>
          <Form-item :label="$t('personalCenter.address')"  prop="speech">
            <Input v-model="addressForm.speech" ></Input>
          </Form-item>
          <Form-item :label="$t('personalCenter.name')" prop="name">
            <Input v-model="addressForm.name" ></Input>
          </Form-item>
          <Form-item :label="$t('personalCenter.phone')"  prop="phone">
            <Input v-model="addressForm.phone" ></Input>
          </Form-item>
          <Form-item :label="$t('personalCenter.fixedtelephone')" prop="fixedPhone">
            <Input v-model="addressForm.fixedPhone" ></Input>
          </Form-item>
          <Form-item :label="$t('personalCenter.E-mail')" prop="emailCon">
            <Input v-model="addressForm.emailCon" ></Input>
          </Form-item>
        </Form>
      </Modal>

      <Modal
        v-model="contactsAddModel"
        title="添加游客信息"
        :loading="loading"
        :mask-closable="false"
        :closable="false"
        @on-ok="asyncContactsAddOK"
        @on-cancel="asyncAddressAddCancel"
        class="add-address-model"
      >
        <Form ref="formcontacts" :model="contactsForm" :rules="formcontacts" :label-width="80">
          <Form-item label="姓名" prop="name">
            <Input v-model="contactsForm.name" placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item label="手机号" prop="phone">
            <Input v-model="contactsForm.phone" placeholder="请输入手机号"></Input>
          </Form-item>
          <Form-item label="身份证号" prop="idCardNo">
            <Input v-model="contactsForm.idCardNo" placeholder="请输入身份证号"></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
</template>

<script>
import Distpicker from 'v-distpicker';
import { getAddressList, addAddress, putAddress, delAddress,getcontactsList,addcontacts,putcontacts,delcontacts } from '../../api/order'
import { getcityList } from '../../api/header'
export default {
  name: 'GeneralInfo',
  data () {
    return {
      isActive: 0,
      encityList:[],//英文城市列表
      enareaList:[],//英文城市列表
      isen:false,
      tabList: [
        {
          label: this.$t("personalCenter.Receivingaddress"),
          value: 0
        },
        {
          label: this.$t("personalCenter.Touristinformation"),
          value: 1
        },
      ],
      //游客信息
      contactsAddModel: false,
      contactsModelList: [],
      contactsListCurrent: null,
      contactsForm: {
        idCardNo: '',
        name: '',
        phone: '',
      },


      pageNo: 1,
      addressAddModel: false,
      loading: false,
      addressListCurrent: null,
      addressModelList: [],
      addressForm: {
        speech: '',
        name: '',
        phone: '',
        fixedPhone: '',
        emailCon: '',
        province: '',
        provinceId: '',
        city: '',
        cityId: '',
        area: '',
        areaId: '',
      },
      ruleValidate: {
        speech: [{ required: true, message: '请填写详细地址', trigger: 'blur' }],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        fixedPhone: [{ required: true, message: '固定电话不能为空', trigger: 'blur' }],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'number',
            message: '请填写正确的手机号',
            trigger: 'blur',
            transform (value) {
              var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
              if (!myreg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            }
          }
        ]
      },
      formcontacts:{
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        idCardNo: [{ required: true, message: '身份证号不能为空', trigger: 'blur' }],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'number',
            message: '请填写正确的手机号',
            trigger: 'blur',
            transform (value) {
              var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
              if (!myreg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            }
          }
        ]
      }
    };
  },
  components: {
    Distpicker
  },
  computed: {

    filteraddressModelList () {
      // 取出相关数据
      const { addressModelList } = this;
      // 最终需要显示的数组
      let faddressModelList = addressModelList;
      faddressModelList.sort(function (p1, p2) { // 返回负数p1在前
        // 1升序，2降序
        return p2.isDefault - p1.isDefault;
      });
      return faddressModelList;
    },

    //游客信息
    filtercontactsModelList () {
      // 取出相关数据
      const { contactsModelList } = this;
      // 最终需要显示的数组
      let fcontactsModelList = contactsModelList;
      fcontactsModelList.sort(function (p1, p2) { // 返回负数p1在前
        // 1升序，2降序
        return p2.isDefault - p1.isDefault;
      });
      return fcontactsModelList;
    }
  },
  created() {
    this.getAddressAllList(1);
    this.getNewcontactsList(1);
    if (localStorage.getItem('lang') != 'zh'){
      let data={
        levelType:1,
      }
      getcityList(data).then(res => {
        this.encityList=res.data
        this.isen=true
      })
    }else{
      this.isen=false
    }
  },
  methods: {
    citychange(e){
      this.addressForm.areaId=''
      this.addressForm.city = e;
      let data={
        levelType:2,
        parentId: e
      }
      getcityList(data).then(res => {
        this.enareaList=res.data
      })
    },
    getNewAddressList(val) {
      this.pageNo = val;
      this.getAddressAllList(val);
    },
    getAddressAllList(pageNo) {
      getAddressList(pageNo, 5, {}).then(res => {
        if (res.code === '0'){
          let newList = res.data.resultList;
          for (let i in newList) {
            if (newList[i].isDefault === true) {
              newList[i].isDefault = 1;
            }else{
              newList[i].isDefault = 0;
            }
          }
          this.addressModelList = newList;
          this.addressListCurrent = res.data.totalCount;
        }else{
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      })
    },

    //游客信息分页
    getNewcontactsList(val) {
      this.pageNo = val;
      this.getcontactsAllList(val);
    },
    getcontactsAllList(pageNo) {
      getcontactsList(pageNo, 3, {}).then(res => {
        if (res.code === '0'){
          let newList = res.data.resultList;
          for (let i in newList) {
            if (newList[i].isDefault === true) {
              newList[i].isDefault = 1;
            }else{
              newList[i].isDefault = 0;
            }
          }
          this.contactsModelList = newList;
          this.contactsListCurrent = res.data.totalCount;
        }else{
          this.$Notice.warning({title: '警告', desc: res.msg});
        }
      })
    },
    contactsDel (v) {
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除游客信息吗？',
        onOk: () => {
          delcontacts(v.id).then(res => {
            if (res.code === '0'){
              this.getcontactsAllList(1);
              this.$Notice.success({title: '成功', desc: '删除成功'});
            }else{
              this.$Notice.warning({title: '警告', desc: res.msg});
            }
          })
        },
        onCancel: () => {
          this.$Message.info('取消删除');
        }
      });
    },
    tabClick (i) {
      this.isActive = i;
    },
    addressDel (v) {
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除地址吗？',
        onOk: () => {
            delAddress(v.id).then(res => {
                if (res.code === '0'){
                    this.getAddressAllList(1);
                    this.$Notice.success({title: '成功', desc: '删除成功'});
                }else{
                    this.$Notice.warning({title: '警告', desc: res.msg});
                }
            })
        },
        onCancel: () => {
          this.$Message.info('取消删除');
        }
      });
    },
    asyncAddressAddOK () {
        this.$refs['formValidate'].validate((valid) => {
            if (valid) {
                let data = {
                  addressType: 1,
                  receiverName: this.addressForm.name,
                  receiverPhone: this.addressForm.fixedPhone,
                  receiverMobile: this.addressForm.phone,
                  receiverState: this.isen?this.addressForm.cityId:this.addressForm.provinceId,
                  receiverCity: this.addressForm.cityId,
                  receiverDistrict: this.addressForm.areaId,
                  receiverAddress: this.addressForm.speech,
                  isDefault: false
                };
                addAddress(data).then(res => {
                    if (res.code === '0'){
                        this.$Message.success('添加成功!');
                        this.$refs['formValidate'].resetFields();
                        this.addressAddModel = false;
                        this.getAddressAllList(1);
                    }else{
                        this.$Notice.warning({title: '警告', desc: res.msg});
                    }
                });
            } else {
                this.$Message.error('表单验证失败!');
            }
        })
    },
   //游客信息添加
    asyncContactsAddOK () {
        this.$refs['formcontacts'].validate((valid) => {
            if (valid) {
                let data = {
                  identityType: 1,
                  name: this.contactsForm.name,
                  phone: this.contactsForm.phone,
                  idCardNo: this.contactsForm.idCardNo,
                  isDefault: false
                };
              addcontacts(data).then(res => {
                    if (res.code === '0'){
                        this.$Message.success('添加成功!');
                        this.$refs['formcontacts'].resetFields();
                        this.contactsAddModel = false;
                        this.getNewcontactsList(1);
                    }else{
                        this.$Notice.warning({title: '警告', desc: res.msg});
                    }
                });
            } else {
                this.$Message.error('表单验证失败!');
            }
        })
    },
    //游客信息
    setcontactsDefault (item) {
      this.$Modal.confirm({
        content: '确认设为默认使用吗？',
        onOk: () => {
          let data = {
            identityType: 1,
            name: item.name,
            phone:item.phone,
            idCardNo: item.idCardNo,
            isDefault: true
          };
          putcontacts(item.id, data).then(res => {
            if (res.code === '0') {
              this.$Message.success('设置默认使用成功!');
              this.getNewcontactsList(1);
            }else{
              this.$Notice.warning({title: '警告', desc: res.msg});
            }
          });
        },
        onCancel: () => {
          this.$Message.info('取消设置');
        }
      });
    },

    asyncAddressAddCancel() {
        this.$Message.info('取消添加');
        this.$refs['formValidate'].resetFields();
        this.addressAddModel = false;
        this.$refs['formcontacts'].resetFields();
        this.contactsAddModel = false;
    },
    setAddressDefault (item) {
      this.$Modal.confirm({
        content: '确认设为默认地址吗？',
        onOk: () => {
          let data = {
              addressType: 1,
              receiverName: item.receiverName,
              receiverPhone: item.receiverPhone,
              receiverMobile: item.receiverMobile,
              receiverState: item.receiverState,
              receiverCity: item.receiverCity,
              receiverDistrict: item.receiverDistrict,
              receiverAddress: item.receiverAddress,
              isDefault: true
          };
          putAddress(item.id, data).then(res => {
            if (res.code === '0') {
              this.$Message.success('设置默认地址成功!');
              this.getAddressAllList(1);
            }else{
              this.$Notice.warning({title: '警告', desc: res.msg});
            }
          });
        },
        onCancel: () => {
          this.$Message.info('取消设置');
        }
      });
    },

    getProvince (data) {
      this.addressForm.province = data.value;
      this.addressForm.provinceId = data.code;
    },
    getCity (data) {
      this.addressForm.city = data.value;
      this.addressForm.cityId = data.code;
    },
    getArea (data) {
      this.addressForm.area = data.value;
      this.addressForm.areaId = data.code;
    }
  }
};
</script>

<style scoped>
.general-container{
  width: 100%;
  padding: 30px;
  height: 100%;
  overflow-y: scroll;
}
.general-tabs{
  width: 100%;
  display: flex;
  border-bottom: 1px solid #E0E0E0;
}
.tab{
  color: #666666;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 12px;
}
.tab:nth-of-type(2){
  margin-left: 90px;
}
.tab:hover{
  color: #FC405E;
  cursor: pointer;
}
.tabActive{
  color: #FC405E;
  border-bottom: 2px solid #FC405E;
}
.general-tabBody{
  width: 100%;
}
.addressInfo{
  width: 100%;
  padding: 20px 0;
}
.add-address{
  padding: 5px 10px;
  color: #FC405E;
  border: 1px solid #FC405E;
  background: #ffffff;
}
.add-address:hover{
  color: #ffffff;
  background: #FC405E;
}
.not-address-img{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.not-address-img>img{
  width: 50%;
}
.address-model{
  width: 100%;
  border: 2px solid #CCCCCC;
  border-radius: 12px;
  margin-top: 30px;
  padding: 20px;
  position: relative;
}
.address-model>p:nth-of-type(1){
  color: #666666;
  font-size: 16px;
  font-weight: 600;
}
.address-model>p:nth-of-type(1)>span{
  display: inline-block;
  /*width: 76px;*/
  height: 20px;
  background: #FFC845;
  color: #ffffff;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  margin-left: 80px;
}
.address-info{
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.address-info>div:nth-of-type(1){
  width: 35%;
}
.address-info>div:nth-of-type(1)>p{
  text-align: right;
  color: #999999;
  font-size: 14px;
}
.address-info>div:nth-of-type(2){
  width: 78%;
}
.address-info>div:nth-of-type(2)>p{
  text-align: left;
  color: #666666;
  font-size: 14px;
}
.address-model-close{
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.address-model-update{
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.address-model-update>span{
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}
.address-model-update-default{
  color: #FC4462;
  /*margin-right: 30px;*/
}
.address-model-update>span:nth-of-type(2){
  color: #666666;
}
/*省市区三级联动*/
.divwrap {
  height: 50%;
  width: 100%;
  z-index: 99;
}

/*外部*/
.divwrap > .distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
}

/*头部*/
.divwrap >>> .address-header {
  background: #000;
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 50%;
  height: 0.5rem;
  font-size: 0.2rem;
}

/*头部内容*/
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}

/*选择过省市区的头部*/
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: 0.05rem solid #666;
}

/*内容部分*/
.divwrap >>> .address-container {
  overflow: scroll;
  height: 100%;
}

/*点过的地区内容*/
.divwrap >>> .address-container .active {
  color: red;
}
.attractionsDetail-content-pageList{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}
</style>

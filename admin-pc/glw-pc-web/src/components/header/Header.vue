<template>
  <div class="box">
    <div class="nav">
      <ul class="location">
        <li>
          {{$t("nav.hello")}}
          <Dropdown  placement="bottom-start">
            <a href="javascript:void(0)">
              <Icon type="ios-location" class="icon"></Icon> {{city}}
            </a>
            <DropdownMenu slot="list" v-if="!isthsc">
              <div class="city">
                <p v-for="(items, index) in companyList" :key="index" style="color:#000000">
                  <span class="city-item"  @click="changeCity(items)">{{items.nickName}}</span>
                </p>
              </div>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li>
          <el-select style="width:110px;" v-model="value" @change="selectLanguage"   placeholder="请选择" size="mini">
            <el-option
            v-for="item in options"
            :key="item.code"
            :label="item.name"
            :value="item.code">
            </el-option>
          </el-select>
        </li>
      </ul>
      <div class="nav-div">
        <ul class="detail">
          <li class="first" v-if="!userInfo.userName">
            <a @click="tologo">{{$t("nav.login")}} <Icon type="person"></Icon></a>    &#12288; <span class="text-color-red"><a @click="toregister" style="color: #FF0101">{{$t("nav.register")}} <Icon type="person-add"></Icon></a></span>
          </li>
          <li v-if="userInfo.userName">
            <Dropdown>
              <p class="username-p">
                <img alt="" v-if="userInfo.headImg" :src="userInfo.headImg" class="user-avatar">
                <Avatar v-else class="person-icon" icon="person" size="small" />
                <span class="username">{{userInfo.nickName}}</span>
                <Icon class="username" type="ios-arrow-down" />
              </p>
              <DropdownMenu slot="list">
                <div class="my-page">
                  <div class="my-info" @click="myInfo">
                    <Icon type="home"></Icon>
                    <p>{{$t("nav.personalCenter")}}</p>
                  </div>
                  <div class="sign-out" @click="signOutFun">
                    <Icon type="log-out"></Icon>
                    <p>{{$t("nav.logOut")}}</p>
                  </div>
                </div>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
        <span>{{$t("nav.conNumber")}}：0315-6681288——{{$t("nav.boss")}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { redirectToSsoPage,registerSsoPage } from '@/utils/sso'
import { getcompany, getCompanyPanel, getLanguageList } from '../../api/header'
import { mapState, mapActions } from 'vuex';
export default {
  name: 'M-Header',
  inject:['reload'],
  created () {
    this.isLogin();
    getLanguageList({}).then(res => {
        this.options = res.data
        if(this.$isthsc){
          this.value = 'en'
          this.isthsc = true
        }else {
          this.value = 'zh'
          this.isthsc = false
        }
      this.selectLanguages()
      this.getcompanyList();
    })
  },
  data () {
    return {
      city: '',
      companyList:[],
      companyId:'',
      isthsc:false,
      options:[
          // {
          //     id: 1,
          //     name: '中文'
          // },
          // {
          //     id: 2,
          //     name: 'English'
          // },
          // {
          //     id: 3,
          //     name: 'Русский'
          // }
      ],
      value: 'zh',
      // langCn: 'zh-CN',
      // langEn: 'en-US',
      // langRU: 'ru-RU',
      langNewPanelList: []
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  // updated(){
  //   if(JSON.parse(localStorage.getItem("city"))){
  //     this.city=JSON.parse(localStorage.getItem("city"))
  //     this.companyId=JSON.parse(localStorage.getItem("companyId"))
  //   }
  // },
  methods: {
    ...mapActions(['signOut', 'isLogin']),
    selectLanguage(){
        if (this.value == 'zh'){
            this.$i18n.locale = this.value;
            localStorage.setItem('lang', this.value);
            this.langNewPanelList.forEach(item => {
                if (item.id == 998){
                    item.name = '首页'
                }else if (item.id == 997){
                    item.name = '新闻资讯'
                }else if (item.id == 999){
                    item.name = '关于我们'
                }
            })
          this.getcompanyList();
          localStorage.setItem('newPanelList', JSON.stringify(this.langNewPanelList));
            this.reload();
        }else if (this.value == 'en'){
            this.$i18n.locale = this.value;
            localStorage.setItem('lang', this.value);
            this.langNewPanelList.forEach(item => {
                if (item.id == 998){
                    item.name = 'front page'
                }else if (item.id == 997){
                    item.name = 'news'
                }else if (item.id == 999){
                    item.name = 'about us'
                }
            })
          this.getcompanyList()
          localStorage.setItem('newPanelList', JSON.stringify(this.langNewPanelList));
            this.reload();
        }else if (this.value == 'ru'){
            this.$i18n.locale = this.value;
            localStorage.setItem('lang', this.value);
            this.langNewPanelList.forEach(item => {
                if (item.id == 998){
                    item.name = 'титульная страница'
                }else if (item.id == 997){
                    item.name = 'Новости'
                }else if (item.id == 999){
                    item.name = 'о нас'
                }
            })
          this.getcompanyList()
          localStorage.setItem('newPanelList', JSON.stringify(this.langNewPanelList));
            this.reload();
        }
    },
    selectLanguages(){
      if (this.value == 'zh'){
        this.$i18n.locale = this.value;
        localStorage.setItem('lang', this.value);
        this.langNewPanelList.forEach(item => {
          if (item.id == 998){
            item.name = '首页'
          }else if (item.id == 997){
            item.name = '新闻资讯'
          }else if (item.id == 999){
            item.name = '关于我们'
          }
        })
        localStorage.setItem('newPanelList', JSON.stringify(this.langNewPanelList));
        this.reload();
      }else if (this.value == 'en'){
        this.$i18n.locale = this.value;
        localStorage.setItem('lang', this.value);
        this.langNewPanelList.forEach(item => {
          if (item.id == 998){
            item.name = 'front page'
          }else if (item.id == 997){
            item.name = 'news'
          }else if (item.id == 999){
            item.name = 'about us'
          }
        })
        localStorage.setItem('newPanelList', JSON.stringify(this.langNewPanelList));
        this.reload();
      }else if (this.value == 'ru'){
        this.$i18n.locale = this.value;
        localStorage.setItem('lang', this.value);
        this.langNewPanelList.forEach(item => {
          if (item.id == 998){
            item.name = 'титульная страница'
          }else if (item.id == 997){
            item.name = 'Новости'
          }else if (item.id == 999){
            item.name = 'о нас'
          }
        })
        localStorage.setItem('newPanelList', JSON.stringify(this.langNewPanelList));
        this.reload();
      }
    },
    changeCity (city) {
      this.city = city.nickName;
      this.companyId = city.id;
      localStorage.setItem("city", JSON.stringify(city.nickName));
      this.$addStorageEvent(1,'companyId',JSON.stringify(city.id));
      localStorage.removeItem("panelsList", JSON.stringify(this.panelsList));
      getCompanyPanel(this.companyId).then(res => {
          localStorage.removeItem("newPanelList");
          let newPanelList = [];
          if(res.code === '0'){
              res.data.forEach(item => {
                  let newPanelObj = {
                      id: item.id,
                      name: item.name
                  }
                  newPanelList.push(newPanelObj)
              })
              if (localStorage.getItem('lang') == 'en'){
                  newPanelList.unshift({id:998,name:'front page'})
                  newPanelList.push({id:997,name:'news'})
                  newPanelList.push({id:999,name:'about us'})
              }else if (localStorage.getItem('lang') == 'zh'){
                  newPanelList.unshift({id:998,name:'首页'})
                  newPanelList.push({id:997,name:'新闻资讯'})
                  newPanelList.push({id:999,name:'关于我们'})
              }else if (localStorage.getItem('lang') == 'ru'){
                  newPanelList.unshift({id:998,name:'титульная страница'})
                  newPanelList.push({id:997,name:'Новости'})
                  newPanelList.push({id:999,name:'о нас'})
              }
              this.langNewPanelList = newPanelList
              this.$addStorageEvent(1,'newPanelList',JSON.stringify(newPanelList));
              this.$Spin.show();
              setTimeout(() => {
                this.$Spin.hide();
              },800);
              this.reload();
              this.$router.replace('/')
              sessionStorage.setItem("head_nav", 0);
          }
      })

    },
    myInfo () {
      this.$router.push({
        path: '/personalCenter',
        query: {user: this.userInfo}
      });
    },
    signOutFun () {
      this.signOut();
    },
    tologo(){
      redirectToSsoPage()
    },
    toregister(){
      registerSsoPage()
    },
    getcompanyList() {
      getcompany().then(res=>{
        if (res.code === '0'){
          this.companyList = res.data
          if(this.companyList.length>0){
        for(var i=0;i<res.data.length;i++){
            if(this.isthsc==false){
                  if(res.data[i].id==1){
                  this.city = res.data[i].nickName;
                  this.companyId = res.data[i].id;
                }else {
                  this.city = res.data[0].nickName;
                  this.companyId = res.data[0].id;
                }
              }else {
                 if(res.data[i].id==8){
                   this.city = res.data[i].nickName;
                   this.companyId = res.data[i].id;
                 }
              }
            }


            localStorage.setItem("city", JSON.stringify(this.city));
            this.$addStorageEvent(1,'companyId',JSON.stringify(this.companyId));
          }else {
            this.city = '';
            this.companyId = '';
          }
          getCompanyPanel(this.companyId).then(res => {
              localStorage.removeItem("newPanelList");
              let newPanelList = [];
              if(res.code === '0'){
                  res.data.forEach(item => {
                      let newPanelObj = {
                          id: item.id,
                          name: item.name
                      }
                      newPanelList.push(newPanelObj)
                  })
                  if (localStorage.getItem('lang') == 'en'){
                      newPanelList.unshift({id:998,name:'front page'})
                      newPanelList.push({id:997,name:'news'})
                      newPanelList.push({id:999,name:'about us'})
                  }else if (localStorage.getItem('lang') == 'zh'){
                      newPanelList.unshift({id:998,name:'首页'})
                      newPanelList.push({id:997,name:'新闻资讯'})
                      newPanelList.push({id:999,name:'关于我们'})
                  }else if (localStorage.getItem('lang') == 'ru'){
                      newPanelList.unshift({id:998,name:'титульная страница'})
                      newPanelList.push({id:997,name:'Новости'})
                      newPanelList.push({id:999,name:'о нас'})
                  }
                  this.langNewPanelList = newPanelList
                  this.$addStorageEvent(1,'newPanelList',JSON.stringify(newPanelList));
                  this.$Spin.show();
                  setTimeout(() => {
                      this.$Spin.hide();
                  },800);
                  this.reload();
              }
          })
        }
      })
    }
  },
  store
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 35px;
  background-color: #4A4A4A;
  color: #FFFFFF;
}
.nav {
  margin: 0% auto;
  width: 65%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 35px;
  overflow: hidden;
}
.nav ul {
  list-style: none;
  color: #FFFFFF;
}
.nav li {
  float: left;
  font-size: 12px;
  line-height: 35px;
  margin-right: 15px;
  /*font-weight: bold;*/
}
.nav a {
  text-decoration: none;
  color: #FFFFFF;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  cursor: pointer;
}
.location a {
  border-left: none;
}
.nav a:hover {
  color: #d9534f;
}
.location {
  color: #999999;
}
.icon {
  color: #ffffff;
}
.first {
  color: #999999;
}
.first a:first-child {
  padding-left: 3px;
  border-left: none;
}
.city {
  padding: 10px 15px;
}
.city-item {
  font-weight: bold;
  cursor: pointer;
  padding: 5px;
}
.city-item:hover {
  color: #d9534f;
}
.person-icon {
  color: #d9534f;
  background-color:  #f0cdb2;
}
.username {
  color: #999999;
  margin-bottom: 10px;
}
.shopping-cart-list {
  padding: 3px 15px;
}
.shopping-cart-box {
  margin: 8px 0px;
  margin-top: 15px;
  padding-bottom: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px #ccc dotted;
}
.shopping-cart-box:first-child {
  margin-top: 8px;
}
.shopping-cart-img {
  margin-right: 15px;
  width: 40px;
  height: 40px;
}
.shopping-cart-img img {
  width: 100%;
}
.shopping-cart-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  width: 200px;
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
}
.shopping-cart-detail {
  color: #999999;
}
.shopping-cart-text {
  color: #ccc;
}
.go-to-buy {
  display: flex;
  justify-content: flex-end;
}
.shopping-cart-null {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cart-null-icon {
  font-size: 38px;
  margin-bottom: 15px;
}
.shopping-cart-null span {
  color: #999999;
  font-size: 12px;
  line-height: 16px;
}
.username-p {
  cursor: pointer;
  height: 35px;
  line-height: 35px;
}
.my-page {
  padding: 3px 5px;
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1111;
  color: #4A4A4A;
}
.my-page a {
  margin: 0px;
  padding: 0px;
  border: none;
}
.my-info {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.my-info:hover {
  box-shadow: 0px 0px 5px #ccc;
}
.my-info i {
  font-size: 28px;
}
.my-info p {
  font-size: 12px;
}
.sign-out {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
.sign-out:hover {
  box-shadow: 0px 0px 5px #ccc;
}
.sign-out i {
  font-size: 28px;
}
.sign-out p {
  font-size: 12px;
}
.user-avatar {
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  display: inline;
  margin-top:5px ;
}
.nav-div{
  display: flex;
  align-items: center;
}
/deep/ .el-input>input{
  background: #4A4A4A !important;
  color: #ffffff;
}
/deep/ .el-select .el-input__inner:focus{
  border-color: #4A4A4A !important;
}
/deep/ .el-select .el-input.is-focus .el-input__inner{
  border-color: #4A4A4A !important;
}
/deep/ .el-input__inner{
  border-color: #4A4A4A !important;
}
</style>

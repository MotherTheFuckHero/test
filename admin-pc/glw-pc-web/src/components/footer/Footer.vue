<template>
  <div>
    <footer class="footer">
      <div class="clearfix"></div>
      <div class="icon-row">
        <div class="footer-icon">
          <h5 v-if="lang == 'en'" class="footer-icon-child" :style="{ 'background': `url(${san})`, 'backgroundSize': '100% 100%'}"></h5>
          <h5 v-else class="footer-icon-child" :style="{ 'background': `url(${chyi})`, 'backgroundSize': '100% 100%'}"></h5>
          <span class="footer-icon-text">{{$t("footer.one")}}</span>
        </div>
        <div class="footer-icon">
          <h5 v-if="lang == 'en'" class="footer-icon-child footer-icon-child-2" :style="{ 'background': `url(${si})`, 'backgroundSize': '100% 100%'}"></h5>
          <h5 v-else class="footer-icon-child" :style="{ 'background': `url(${cher})`, 'backgroundSize': '100% 100%'}"></h5>
          <span class="footer-icon-text">{{$t("footer.two")}}</span>
        </div>
        <div class="footer-icon">
          <h5 v-if="lang == 'en'" class="footer-icon-child footer-icon-child-3" :style="{ 'background': `url(${yi})`, 'backgroundSize': '100% 100%'}"></h5>
          <h5 v-else class="footer-icon-child" :style="{ 'background': `url(${chsan})`, 'backgroundSize': '100% 100%'}"></h5>
          <span class="footer-icon-text">{{$t("footer.three")}}</span>
        </div>
        <div class="footer-icon">
          <h5 v-if="lang == 'en'" class="footer-icon-child footer-icon-child-4" :style="{ 'background': `url(${er})`, 'backgroundSize': '100% 100%'}"></h5>
          <h5 v-else class="footer-icon-child" :style="{ 'background': `url(${chsi})`, 'backgroundSize': '100% 100%'}"></h5>
          <span class="footer-icon-text">{{$t("footer.four")}}</span>
        </div>
      </div>
      <div class="service-intro">
        <div class="servece-type">
          <div class="servece-type-info">
            <ul>
              <li>{{$t("footer.five")}}</li>
              <li>{{$t("footer.six")}}</li>
              <li>{{$t("footer.seven")}}</li>
              <li>{{$t("footer.eight")}}</li>
              <li>{{$t("footer.nine")}}</li>
            </ul>
          </div>
          <div class="servece-type-info">
            <ul>
              <li>{{$t("footer.ten")}}</li>
              <li>{{$t("footer.eleven")}}</li>
              <li>{{$t("footer.twelve")}}</li>
              <li>{{$t("footer.Thirteen")}}</li>
              <li>{{$t("footer.fourteen")}}</li>
            </ul>
          </div>
          <img alt="" :src="logo" style="height: 124px"/>
          <div style="text-align: center">
            <a  href="https://zzlz.gsxt.gov.cn/businessCheck/verifKey.do?showType=p&serial=91130281072058797D-SAIC_SHOW_10000091130281072058797D1636616441508&signData=MEUCIFJV7HRv7DOUTtBpmolKrCHScjE9ulb5L3UpxVA5X4D4AiEA7FhF3zJ973PZmnPKjIUTCY20xIZ0q6X+MkX8/YNDrLs=">
              <img v-if="lang == 'en'" alt="" :src="enDianzi" style="height: 124px;display: flex"/>
              <img v-else alt="" :src="dianzi" style="height: 124px;display: flex"/>
              {{$t("footer.twenty")}}
            </a>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="friend-link">
          <div class="friend-link-item">
            <ul>
              <li>{{$t("footer.fifteen")}}</li>
              <li>{{$t("footer.sixteen")}}</li>
              <li>{{$t("footer.seventeen")}}</li>
              <li>{{$t("footer.eighteen")}}</li>
              <li>{{$t("footer.nineteen")}}</li>
            </ul>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </footer>
    <Back-top></Back-top>
  </div>
</template>

<script>
import logos from '../../images/apps.png';
import dianzi from '../../images/dianzi.png';
import englishDianzi from '../../images/englishDianzi.png';
export default {
  name: 'Footer',
  data () {
    return {
      san: require('../../images/san.png'),
      si: require('../../images/si.png'),
      yi: require('../../images/yi.png'),
      er: require('../../images/er.png'),
      chyi: require('../../images/chyi.png'),
      cher: require('../../images/cher.png'),
      chsan: require('../../images/chsan.png'),
      chsi: require('../../images/chsi.png'),
      linkItemClass: 'link-item',
      lang: 'en',
      logo:logos,
      dianzi:dianzi,
      enDianzi: englishDianzi,
      guideArr: [
        [],
        []
      ],
      moreLink: []
    };
  },
  created() {
      let lang = localStorage.getItem('lang')
      this.lang = lang
  }
};
</script>

<style scoped>
/*****************************底 部 开 始*****************************/
.footer {
  width: 100%;
  background-color: #ffffff;
}
.icon-row {
  margin: 15px auto;
  padding-top: 8px;
  width: 1000px;
  height: 64px;
}
.footer-icon {
  width: 200px;
  margin-left: 17px;
  margin-right: 17px;
  float: left;
}
.footer-icon-child {
  margin-top: 10px;
  overflow: hidden;
  position: absolute;
  width: 36px;
  height: 42px;
  background-size: auto;
  /*background-image: url("../../../static/img/footer/ico_service.png");*/
  text-indent: -999px;
}
.footer-icon-child-2 {
  background-position: 0 -43px;
}
.footer-icon-child-3 {
  background-position: 0 -86px;
}
.footer-icon-child-4 {
  background-position: 0 -129px;
}
.footer-icon-text {
  display: inline-block;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 45px;
  color: #444444;
  font-size: 18px;
  font-weight: bold;
  line-height: 64px;
}
.service-intro {
  width: 100%;
  border-top: 1px solid #b2dfdb;
}
.servece-type {
  margin: 15px auto;
  width: 800px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.servece-type-info {
  color: #666666;
}
.servece-type-info ul {
  width: 200px;
  list-style: none;
}
.servece-type-info li {
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  cursor: pointer;
  line-height: 26px;
}
.servece-type-info li:first-child {
  font-size: 16px;
  line-height: 28px;
  font-weight: bold;
}
.friend-link {
  display: flex;
  align-items: center;
  width: 1100px;
  height: 30px;
  margin: 10px auto;
  color: #666;
  border-top: 1px solid #b2dfdb;
}
.friend-link-item {
  margin: 0px auto;
}
.friend-link-item ul {
  list-style: none;
}
.friend-link-item li {
  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px 0px;
  float: left;
}
.link-item {
  padding: 0px 8px;
  cursor: pointer;
  border-right: 1px solid #ccc;
}
.link-last-item {
  border: none;
}

/*****************************底 部 结 束*****************************/
</style>

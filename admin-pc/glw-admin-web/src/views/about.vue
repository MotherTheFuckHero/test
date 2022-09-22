<template>
  <div class="UserMybox" >
    <div>
      <p class="UserMyheader">关于过来玩</p>
    </div>
    <img src="../assets/images/gongsi.jpg" alt width="100%" />
    <div class="UserMytext1">
      遵化市博客旅游集散中心“过来玩”网站成立于2012年6月，注册资金1000万元。2015年5月，适应京津冀旅游协同发展和开发全域智慧旅游的形势需求。“过来玩”网站致力于智慧化景区、社区以及智慧化城市规划设计，旅游产品策划研发，旅游大数据，旅游活动组织和会展服务，是覆盖全国、具有浓郁地方特色，pc端、手机APP、微官网、小程序四网合一，集“吃、住、行、游、购、娱”为一体的智慧旅游网站。
    </div>
    <div class="UserMytext1">
      业务主要涵盖景区门票、智慧导览、分销、智慧住宿、智慧餐厅、地方特产、智慧停车、多机位直播、生活服务、大数据平台、自由行个性定制、进出口跨境网上商城交易的线上线下交易平台。
    </div>

    <div>
      <p class="UserMyheader">我们的荣誉</p>
    </div>
    <ul class="UserHonorLi">
      <li>
        <img src="../assets/images/rong1.jpg" alt />
      </li>
      <li>
        <img src="../assets/images/rong2.jpg" alt />
      </li>
      <li>
        <img src="../assets/images/rong3.jpg" alt />
      </li>
      <li>
        <img src="../assets/images/rong5.jpg" alt />
      </li>
      <li>
        <img src="../assets/images/rong6.jpg" alt />
      </li>
      <li>
        <img src="../assets/images/rong1.jpg" alt />
      </li>
    </ul>
    <div>
      <p class="UserMyheader">合作单位</p>
    </div>
    <ul class="partnerUl">
      <li>
        <img src="../assets/images/he11.jpg" alt />
        <p class="partnerP1">“过来玩”多机位直播</p>
        <p class="partnerP2">
          在线多机位直播，可录制直播，直播回放，直播视频下载
        </p>
      </li>
      <li>
        <img src="../assets/images/he2.jpg" alt />
        <p class="partnerP1">北京平谷区智慧旅游</p>
        <p class="partnerP2">全域休闲，畅游平谷。</p>
      </li>
      <li>
        <img src="../assets/images/he3.jpg" alt />
        <p class="partnerP1">国际饭店</p>
        <p class="partnerP2">
          遵化国际饭店隶属遵化市政府，是集餐饮、住宿、购物、娱乐为一体的三星级旅游涉外饭店。
        </p>
      </li>
      <li>
        <img src="../assets/images/he4.jpg" alt />
        <p class="partnerP1">花乡果巷景区</p>
        <p class="partnerP2">花乡果巷，花海趣圈。</p>
      </li>
      <li>
        <img src="../assets/images/he5.jpg" alt />
        <p class="partnerP1">金融街•汤泉宫温泉旅游度假村</p>
        <p class="partnerP2">
          以皇家温泉养生文化为核心，深入挖掘皇家温泉养生之道，注重汤泉温泉生态构建，弘扬健康温泉养生理念，精心打造中国皇家温泉养生文化旅游高端品牌
        </p>
      </li>
      <li>
        <img src="../assets/images/he6.jpg" alt />
        <p class="partnerP1">任记农产品•非物质文化遗产</p>
        <p class="partnerP2">非物质文化遗产。</p>
      </li>
      <li>
        <img src="../assets/images/he7.png" alt />
        <p class="partnerP1">万佛园4A级景区智慧导览</p>
        <p class="partnerP2">
          展示手绘地图，集语音、服务、景点介绍、线路一体的智慧化导游功能。
        </p>
      </li>
      <li>
        <img src="../assets/images/he8.jpg" alt />
        <p class="partnerP1">兴隆山景区</p>
        <p class="partnerP2">
          完整的自然生态系统、良好的自然生态气候，兴隆山是观光旅游，休闲旅游，生态旅游的极佳场所。
        </p>
      </li>
    </ul>
    <div>
      <p class="UserMyheader">加入我们</p>
    </div>
    <div style="text-align: center">招聘信息</div>
    <div class="goHome">
      <p>找工作来这里</p>
      <p>过来玩团队等待您的加入</p>
      <div @click="goZP">
        <img src="../assets/images/zhi1.png" alt />
        <p style="color:red">查看详情</p>
        <img src="../assets/images/zhi2.png" alt />
      </div>
    </div>
    <div style="text-align: center">联系信息</div>
    <div class="goHome" style="font-size:14px">
      <p>联系电话：0315-6686299 / 0315-6681288</p>
      <p>邮箱：guolaiwan99@163.com</p>
      <p>地址：中国·遵化万乘晟象大厦12层</p>
      <p>想了解更多关于我们的信息</p>
      <p>
        可以扫描下方二维码哟
        <span color="red">⬇⬇⬇</span>
      </p>
      <img src="../assets/images/logo.png" alt />
    </div>
  </div>
</template>

<script>
//
export default {
  methods: {
    goZP() {
      window.location.href =
        "https://mp.weixin.qq.com/s/fQfDxZILdrZACvmTRXawmA";
    }
  }
};
</script>

<style  scoped>
.UserMybox{width: 100%;height: 100%;}
.UserMyheader {
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
}
.UserMytext1 {
  line-height: 30px;
  text-indent: 2em;
}
.UserHonorLi {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;

}
.UserHonorLi  li {
  width: 45%;
  margin: 2.5%;
}
.UserHonorLi  li img {
  width: 100%;
  border-radius: 12px;
}
.partnerUl {
  width: 100%;
}
.partnerUl li{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  border-bottom: 1px solid gray;
}
.partnerUl li img{
  width: 80%;
  border-radius: 12px;
}
.partnerP1 {
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0;
}
.partnerP2 {
  width: 80%;
  font-size: 14px;
  color: gray;
  margin-bottom: 5px;
}
.goHome {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.goHome p {
  margin: 15px 0;
}
.goHome div{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goHome div img {
  height: 20px;
  margin: 0 10px;
}
</style>

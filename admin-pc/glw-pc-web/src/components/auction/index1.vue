<template>
   <div class="auction-big-div">

     <div class="auction-div">
       <div class="go-what">
         <ul>
           <li v-for="(v, i) in treeData" @click="goItem(i)">{{v.id + '号古树'}}</li>
         </ul>
       </div>
       <div class="auction-first">
         <div class="auction-child-one">
           <p class="tipsDetailWrap">
             <span class="tipsTriangle">请务必查看标的详细信息！</span>
             <span class="tipsBtn">查看</span>
           </p>
           <div class="auction-main">
             <h1>{{nowTreeData.treeName}}</h1>
             <div class="auction-main-left">
               <div class="auction-main-left-big">
                 <img style="height: 100%;" :src="shopDetailImgList[imgIndex].imageUrl" alt="">
                 <pic-zoom  style="height: 100%;" :url="shopDetailImgList[imgIndex].imageUrl" :scale="3"></pic-zoom>
               </div>
               <div class="auction-main-left-list">
                 <div class="auction-main-left-list-img" :class="{ shopDetailActive : imgIndex === index }" v-for="(item, index) in shopDetailImgList" :key="index" @mouseover="showBigImg(index)">
                   <img alt="" :src="item.imageUrl">
                 </div>
               </div>
             </div>
             <div class="auction-main-right">
               <div class="auction-main-right-title">
                 <p style="margin-left: 8px;line-height: 50px;">
                   起拍价
                   <span style="font-size: 28px;margin: 2px 3px 0 3px;color: #d6363b;">{{nowTreeData.startPrice}}</span>
                   <span style="color: #d6363b;font-size: 14px;margin-left: 6px;">元</span>
                 </p>
                 <div style="width: 100%;text-align: center;margin-top: 25px;">
                   <P @click="btn" style="width:50%;margin-left:25%;font-size: 22px;padding:10px 10px;border: 1px solid #FFFFFF;background: #C13939;border-radius: 30px;color: #FFFFFF;">
                     {{msg}}
                   </P>
                 </div>
               </div>
               <P style=" margin-top:20px;font-size: 14px;color:#C21F3A;background: rgb(255, 244, 244);width: 100%;line-height: 35px;text-align: center">成交后，需向拍卖企业另付拍卖佣金，具体规则请联系拍卖企业</P>
               <div style="margin-top:20px;line-height: 35px;font-size: 18px;color:#666;text-align: center;">
                 <P>
                   <span  style="margin-right: 20px;">起拍价：{{nowTreeData.startPrice}}元</span>
                   <span style="margin-right: 20px;">加价幅度：{{nowTreeData.markupPrice}}元</span>
                 </P>
                 <P>
                   <span style="margin-right: 20px;">评估价： {{nowTreeData.evaluatePrice}}</span>
                   <span style="margin-right: 20px;">保留价： {{nowTreeData.reservePrice}}</span>
                 </P>
                 <P>
                   <span style="margin-right: 20px;">编号:{{nowTreeData.treeId}}</span>
                   <span style="margin-right: 20px;">归属人:{{nowTreeData.belonger}}</span>
                 </P>
                 <P>
                   <span  style="margin-right: 20px;">经度:{{nowTreeData.lon}}</span>
                   <span style="margin-right: 20px;">纬度:{{nowTreeData.lat}}</span>
                 </P>
                 <P>
                   <span style="margin-right: 20px;">归属村:{{nowTreeData.belongVillage}}</span>
                   <span  style="margin-right: 20px;">品质:{{nowTreeData.quality}}</span>
                 </P>

               </div>
             </div>
             <div class="clearFloat"></div>
           </div>
         </div>
         <div class="auction-child-two">
           <p style="font-size: 24px;font-weight: bold;text-align: center">竞拍人信息</p>
           <ul>
             <li>
               <p style="color: #C13939">
                 <span>1.</span>
                 <span>竞拍人:刘xx</span>
                 <span>138****6550</span>
               </p>
             </li>
             <li>
               <p>
                 <span>2.</span>
                 <span>竞拍人:李xx</span>
                 <span>138****6550</span>
               </p>
             </li>
             <li>
               <p >
                 <span>3.</span>
                 <span>竞拍人:王xx</span>
                 <span>138****6550</span>
               </p>
             </li>
             <li>
               <p>
                 <span>4.</span>
                 <span>竞拍人:宋xx</span>
                 <span>138****6550</span>
               </p>
             </li>
             <li>
               <p>
                 <span>5.</span>
                 <span>竞拍人:黄xx</span>
                 <span>138****6550</span>
               </p>
             </li>
           </ul>
         </div>
       </div>
       <div class="auction-second">
         <Tabs value="name4" :animated="false">
           <TabPane label="介绍" name="name4">
             <h1>
               拍卖人、委托人不承担瑕疵担保责任，图片、清单等仅供参考，以实际看货为准。
             </h1>
             <div style="margin-top: 20px;font-size: 18px;">
               <p style="text-indent:2em;line-height: 40px">{{nowTreeData.introduce}}</p>
               <img v-for="(v, i) in shopDetailImgList" :key="i" style="width: 100%;margin: 10px 0" :src="v.imageUrl" />
             </div>
           </TabPane>
           <TabPane label="竞价记录" name="name5">
             <el-table :data="tableData" style="width: 100%;font-size: 18px;" :cell-style="styleBack">
               <el-table-column align="center" prop="status" label="状态"></el-table-column>
               <el-table-column align="center" prop="name" label="竞买号"></el-table-column>
               <el-table-column align="center" prop="price" label="价格">
                 <template slot-scope="scope">
                   {{'￥' + scope.row.price}}
                 </template>
               </el-table-column>
               <el-table-column align="center" prop="time" label="时间"></el-table-column>
             </el-table>
             <div style="display: flex;justify-content: center;margin-top: 50px">
               <el-input size="mini" placeholder="请输入竞买号" v-model="bidNumber" style="width: 200px"/>
               <el-input size="mini" placeholder="请输入价格" v-model="bidNumberPrice" style="width: 200px" @change="updateTab"/>
             </div>
           </TabPane>
         </Tabs>
       </div>
     </div>

   </div>
</template>

<script>
    import PicZoom from "vue-piczoom";
    export default {
        name: "",
        components: {
            PicZoom,
        },
        data(){
            return{
                bidNumber: '',
                bidNumberPrice: '',
                imgIndex: 0,
                msg:'竞拍开始',
                shopDetailImgList: [],
                tableData: [{
                    status: '领先',
                    name: 'W8472',
                    price: '341000',
                    time: '2022年08月30日  15:14:50'
                }, {
                    status: '出局',
                    name: 'W8475',
                    price: '348000',
                    time: '2022年08月30日  14:40:50'
                }, {
                    status: '出局',
                    name: 'W8471',
                    price: '322000',
                    time: '2022年08月30日  13:31:26'
                }, {
                    status: '出局',
                    name: 'W8470',
                    price: '345000',
                    time: '2022年08月30日  12:14:11'
                }],
                treeData:[
                    {
                        id: 1,
                        treeName: '石桥头村1号树',
                        treeId: 13028100643, //古树编号
                        belonger: '王建生', //归属人
                        lon: '118.101881', //经度
                        lat: '40.13677', //纬度
                        belongVillage: '石桥头村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/1(1).jpg")},{id:2, imageUrl: require("../../images/1(2).jpg")},{id:3, imageUrl: require("../../images/1(3).jpg")}],
                        introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径80厘米，估测树龄220年。实生核桃品种，占地面积200平米，树势健壮，树姿开张丰产性好，抗病虫，耐瘠薄。单株干果产量100公斤。'
                    },
                    {
                        id: 2,
                        treeName: '石桥头村2号树',
                        treeId: 13028100644, //古树编号
                        belonger: '王建生', //归属人
                        lon: '118.101569', //经度
                        lat: '40.136515', //纬度
                        belongVillage: '石桥头村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/2(1).jpg")},{id:2, imageUrl: require("../../images/2(2).jpg")},{id:3, imageUrl: require("../../images/2(3).jpg")}],
                        introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径60厘米，估测树龄120年。实生核桃品种，占地面积230平米，树势健壮、树姿极开张，丰产性好。核桃果实圆形，个大，壳薄，种仁饱满，易取整仁，仁浅黄色，出仁率高，风味香甜不涩。单株干果产量80公斤。'
                    },
                    {
                        id: 3,
                        treeName: '石桥头村3号树',
                        treeId: 13028100712, //古树编号
                        belonger: '王国全', //归属人
                        lon: '118.11300', //经度
                        lat: '40.13400', //纬度
                        belongVillage: '石桥头村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/3(1).jpg")},{id:2, imageUrl: require("../../images/3(2).jpg")},{id:3, imageUrl: require("../../images/3(3).jpg")},{id:4, imageUrl: require("../../images/3(4).jpg")}],
                        introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径72厘米，估测树龄160年。实生核桃品种，占地面积120平米，树势旺盛，树姿半开张；单株干果产量30公斤，果壳稍厚，可出整仁，仁饱满，口感香甜不涩，营养丰富，出油率高。含有蛋白质、脂肪、胡萝卜素、维生素等多种物质。'
                    },
                    {
                        id: 4,
                        treeName: '金牛寺村4号树',
                        treeId: 13028100619, //古树编号
                        belonger: '温保国', //归属人
                        lon: '118.15914', //经度
                        lat: '40.116122', //纬度
                        belongVillage: '金牛寺村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/4(1).jpg")},{id:2, imageUrl: require("../../images/4(2).jpg")},{id:3, imageUrl: require("../../images/4(3).jpg")}],
                        introduce: '金牛寺村位于遵化南部山区，清朝初期始建，因村内古寺金牛寺而得村名。金牛寺始建于汉代，风水绝佳，U型山势，东山为靠，寺庙建在正东突出的牛鼻子山上，南北两侧山上各有九个山头，号称十八罗汉。清雍正二年重修，香客云集，远近闻名。村庄依山势地形而建，苍松翠柏，山水灵秀，空气清新。核桃为该村支柱产业之一，面积300余亩。该树胸径68厘米，估测树龄150年。实生核桃品种，占地面积100平米，树势健壮，树姿半开张，管理粗放，单株干果产量35公斤。结果少，核仁饱满，微涩，含油率较高；壳稍厚，不易取整仁。'
                    },
                    {
                        id: 5,
                        treeName: '金牛寺村5号树',
                        treeId: 13028100620, //古树编号
                        belonger: '温保民', //归属人
                        lon: '118.158928', //经度
                        lat: '40.116474', //纬度
                        belongVillage: '金牛寺村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/5(1).jpg")},{id:2, imageUrl: require("../../images/5(2).jpg")},{id:3, imageUrl: require("../../images/5(3).jpg")}],
                        introduce: '金牛寺村位于遵化南部山区，清朝初期始建，因村内古寺金牛寺而得村名。金牛寺始建于汉代，风水绝佳，U型山势，东山为靠，寺庙建在正东突出的牛鼻子山上，南北两侧山上各有九个山头，号称十八罗汉。清雍正二年重修，香客云集，远近闻名。村庄依山势地形而建，苍松翠柏，山水灵秀，空气清新。核桃为该村支柱产业之一，面积300余亩。该树胸径51厘米，估测树龄150年。实生核桃品种，占地面积90平米，树势中庸，树姿半开张，管理粗放，单株干果产量25公斤。结果少，壳较厚，不易取整仁。'
                    },
                    // {
                    //     id: 6,
                    //     treeName: '金牛寺村6号树',
                    //     treeId: 13028100618, //古树编号
                    //     belonger: '张继东', //归属人
                    //     lon: '118.15914', //经度
                    //     lat: '40.116122', //纬度
                    //     belongVillage: '金牛寺村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/6(1).jpg")},{id:2, imageUrl: require("../../images/6(2).jpg")},{id:3, imageUrl: require("../../images/6(3).jpg")},{id:4, imageUrl: require("../../images/6(4).jpg")}],
                    //     introduce: '金牛寺村位于遵化南部山区，清朝初期始建，因村内古寺金牛寺而得村名。金牛寺始建于汉代，风水绝佳，U型山势，东山为靠，寺庙建在正东突出的牛鼻子山上，南北两侧山上各有九个山头，号称十八罗汉。清雍正二年重修，香客云集，远近闻名。村庄依山势地形而建，苍松翠柏，山水灵秀，空气清新。核桃为该村支柱产业之一，面积300余亩。该树胸径51厘米，估测树龄150年。实生核桃品种，占地面积90平米，树势中庸，树姿半开张，管理粗放，单株干果产量25公斤。结果少，壳较厚，不易取整仁。'
                    // },
                    {
                        id: 7,
                        treeName: '金牛寺村7号树',
                        treeId: 13028100612, //古树编号
                        belonger: '张海珠', //归属人
                        lon: '118.1643', //经度
                        lat: '40.117029', //纬度
                        belongVillage: '金牛寺村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/7(1).jpg")},{id:2, imageUrl: require("../../images/7(2).jpg")},{id:3, imageUrl: require("../../images/7(3).jpg")},{id:4, imageUrl: require("../../images/7(4).jpg")}],
                        introduce: '金牛寺村位于遵化南部山区，清朝初期始建，因村内古寺金牛寺而得村名。金牛寺始建于汉代，风水绝佳，U型山势，东山为靠，寺庙建在正东突出的牛鼻子山上，南北两侧山上各有九个山头，号称十八罗汉。清雍正二年重修，香客云集，远近闻名。村庄依山势地形而建，苍松翠柏，山水灵秀，空气清新。核桃为该村支柱产业之一，面积300余亩。该树胸径73厘米，估测树龄170年。实生核桃品种，占地面积100平米，树形较好，树势旺盛，树姿开张，管理水平一般，单株干果产量30公斤。果个较大，壳薄，取仁容易，可取整仁。'
                    },
                    // {
                    //     id: 8,
                    //     treeName: '杨庄村8号树',
                    //     treeId: 13028101554, //古树编号
                    //     belonger: '杨锦龙', //归属人
                    //     lon: '118.102935', //经度
                    //     lat: '40.114677', //纬度
                    //     belongVillage: '杨庄村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/8(1).jpg")},{id:2, imageUrl: require("../../images/8(2).jpg")},{id:3, imageUrl: require("../../images/8(3).jpg")},{id:4, imageUrl: require("../../images/8(4).jpg")}],
                    //     introduce: '杨庄村始建于唐朝，杨、温、赵三个姓氏村民迁居此地，因三个姓氏中，杨氏人口居多，故取村名“大杨家庄村”，以后简称杨庄村。据统计，遵化市共有11个杨庄村，都是历史悠久，杨氏建庄，2个是清代建庄，8个是明代建庄，1个是唐代所建，东旧寨镇杨庄村是建庄最早的村。该村盛产核桃，种植面积达800余亩。据该村老林业技术员杨广新（现年80岁）介绍，70年代，杨庄因为核桃管理技术先进全国闻名，当时正是遵化王国藩时代，村第二代林业队长、村支委陈满礼、副队长杨春发等人，研究探索出了当时较为先进的核桃生产及管理经验，杨庄的核桃在全国始终保持稳产、高产。72年左右，全国28省的林业技术人员到杨庄村参观学习。73年，西安电影制片厂专门来杨庄村拍摄《核桃》，陈满礼等人进行核桃管理技术创新，以一株村西北山上主枝全部枯死、失去结果能力、只有数丛娃枝的280年核桃古树为原型，采取加强地下管理、修剪多余娃枝、培养较大的娃枝作为大、中、小结果枝组的方法。结果该树得到迅速复壮，此树不仅没有死，而且产量竟然高达207市斤（干果产量），来访者无不称赞。当时杨庄村核桃平均单产55市斤，总产160万公斤。《核桃》这部胶片电影1974年完成，并在全国巡回播映。由于拍摄时间较早，网上很难找到电子版本的影片。经过不断网络搜索，终于“山人闲斋的书摊”发现这部胶片有卖，价格360元，网址是https://book.kongfz.com/185327/621258628/。实生核桃品种，占地面积230平米，树势健壮，树姿半开张，丰产性强，管理水平较高，单株干果产量50公斤。壳薄，不露仁，易取整仁，种仁饱满，香甜不涩，该树连续结果能力强，抗病、抗虫。含蛋白质、脂肪、碳水化合物、膳食纤维、胡萝卜素、维生素E、以及钾、锰 、钙、磷、铁、硒、锌等多种元素。'
                    // },
                    // {
                    //     id: 9,
                    //     treeName: '杨庄村9号树',
                    //     treeId: 13028101407, //古树编号
                    //     belonger: '杨锦山', //归属人
                    //     lon: '118.103206', //经度
                    //     lat: '40.115312', //纬度
                    //     belongVillage: '杨庄村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/9(1).jpg")},{id:2, imageUrl: require("../../images/9(2).jpg")},{id:3, imageUrl: require("../../images/9(3).jpg")},{id:4, imageUrl: require("../../images/9(4).jpg")}],
                    //     introduce: '杨庄村始建于唐朝，杨、温、赵三个姓氏村民迁居此地，因三个姓氏中，杨氏人口居多，故取村名“大杨家庄村”，以后简称杨庄村。据统计，遵化市共有11个杨庄村，都是历史悠久，杨氏建庄，2个是清代建庄，8个是明代建庄，1个是唐代所建，东旧寨镇杨庄村是建庄最早的村。该村盛产核桃，种植面积达800余亩。据该村老林业技术员杨广新（现年80岁）介绍，70年代，杨庄因为核桃管理技术先进全国闻名，当时正是遵化王国藩时代，村第二代林业队长、村支委陈满礼、副队长杨春发等人，研究探索出了当时较为先进的核桃生产及管理经验，杨庄的核桃在全国始终保持稳产、高产。72年左右，全国28省的林业技术人员到杨庄村参观学习。73年，西安电影制片厂专门来杨庄村拍摄《核桃》，陈满礼等人进行核桃管理技术创新，以一株村西北山上主枝全部枯死、失去结果能力、只有数丛娃枝的280年核桃古树为原型，采取加强地下管理、修剪多余娃枝、培养较大的娃枝作为大、中、小结果枝组的方法。结果该树得到迅速复壮，此树不仅没有死，而且产量竟然高达207市斤（干果产量），来访者无不称赞。当时杨庄村核桃平均单产55市斤，总产160万公斤。《核桃》这部胶片电影1974年完成，并在全国巡回播映。由于拍摄时间较早，网上很难找到电子版本的影片。经过不断网络搜索，终于“山人闲斋的书摊”发现这部胶片有卖，价格360元，网址是https://book.kongfz.com/185327/621258628/。实生核桃品种，占地面积160平米，树势中庸，管理粗放，结果少，单株干果产量30公斤。'
                    // },
                    // {
                    //     id: 10,
                    //     treeName: '杨庄村10号树',
                    //     treeId: 13028101377, //古树编号
                    //     belonger: '杨晓丽', //归属人
                    //     lon: '118.102179', //经度
                    //     lat: '40.106652', //纬度
                    //     belongVillage: '杨庄村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/10(1).jpg")},{id:2, imageUrl: require("../../images/10(2).jpg")},{id:3, imageUrl: require("../../images/10(3).jpg")},{id:4, imageUrl: require("../../images/10(4).jpg")}],
                    //     introduce: '杨庄村始建于唐朝，杨、温、赵三个姓氏村民迁居此地，因三个姓氏中，杨氏人口居多，故取村名“大杨家庄村”，以后简称杨庄村。据统计，遵化市共有11个杨庄村，都是历史悠久，杨氏建庄，2个是清代建庄，8个是明代建庄，1个是唐代所建，东旧寨镇杨庄村是建庄最早的村。该村盛产核桃，种植面积达800余亩。据该村老林业技术员杨广新（现年80岁）介绍，70年代，杨庄因为核桃管理技术先进全国闻名，当时正是遵化王国藩时代，村第二代林业队长、村支委陈满礼、副队长杨春发等人，研究探索出了当时较为先进的核桃生产及管理经验，杨庄的核桃在全国始终保持稳产、高产。72年左右，全国28省的林业技术人员到杨庄村参观学习。73年，西安电影制片厂专门来杨庄村拍摄《核桃》，陈满礼等人进行核桃管理技术创新，以一株村西北山上主枝全部枯死、失去结果能力、只有数丛娃枝的280年核桃古树为原型，采取加强地下管理、修剪多余娃枝、培养较大的娃枝作为大、中、小结果枝组的方法。结果该树得到迅速复壮，此树不仅没有死，而且产量竟然高达207市斤（干果产量），来访者无不称赞。当时杨庄村核桃平均单产55市斤，总产160万公斤。《核桃》这部胶片电影1974年完成，并在全国巡回播映。由于拍摄时间较早，网上很难找到电子版本的影片。经过不断网络搜索，终于“山人闲斋的书摊”发现这部胶片有卖，价格360元，网址是https://book.kongfz.com/185327/621258628/。实生核桃品种，占地面积200平米，树势健壮，树姿开张，管理水平较高，单株干果产量40公斤。壳稍厚，仁微涩，丰产、稳产、抗病、抗虫。果实富含蛋白质、脂肪、碳水化合物、膳食纤维、胡萝卜素、维生素E、以及钾、锰 、钙、磷、铁、硒、锌等多种元素。'
                    // },
                    // {
                    //     id: 11,
                    //     treeName: '杨庄村11号树',
                    //     treeId: 13028101396, //古树编号
                    //     belonger: '李保安', //归属人
                    //     lon: '118.099115', //经度
                    //     lat: '40.113735', //纬度
                    //     belongVillage: '杨庄村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/11(1).jpg")},{id:2, imageUrl: require("../../images/11(2).jpg")},{id:3, imageUrl: require("../../images/11(3).jpg")}],
                    //     introduce: '杨庄村始建于唐朝，杨、温、赵三个姓氏村民迁居此地，因三个姓氏中，杨氏人口居多，故取村名“大杨家庄村”，以后简称杨庄村。据统计，遵化市共有11个杨庄村，都是历史悠久，杨氏建庄，2个是清代建庄，8个是明代建庄，1个是唐代所建，东旧寨镇杨庄村是建庄最早的村。该村盛产核桃，种植面积达800余亩。据该村老林业技术员杨广新（现年80岁）介绍，70年代，杨庄因为核桃管理技术先进全国闻名，当时正是遵化王国藩时代，村第二代林业队长、村支委陈满礼、副队长杨春发等人，研究探索出了当时较为先进的核桃生产及管理经验，杨庄的核桃在全国始终保持稳产、高产。72年左右，全国28省的林业技术人员到杨庄村参观学习。73年，西安电影制片厂专门来杨庄村拍摄《核桃》，陈满礼等人进行核桃管理技术创新，以一株村西北山上主枝全部枯死、失去结果能力、只有数丛娃枝的280年核桃古树为原型，采取加强地下管理、修剪多余娃枝、培养较大的娃枝作为大、中、小结果枝组的方法。结果该树得到迅速复壮，此树不仅没有死，而且产量竟然高达207市斤（干果产量），来访者无不称赞。当时杨庄村核桃平均单产55市斤，总产160万公斤。《核桃》这部胶片电影1974年完成，并在全国巡回播映。由于拍摄时间较早，网上很难找到电子版本的影片。经过不断网络搜索，终于“山人闲斋的书摊”发现这部胶片有卖，价格360元，网址是https://book.kongfz.com/185327/621258628/。该树胸径60厘米，估测树龄120年。实生核桃品种，占地面积170平米，树势健壮，树姿开张，抗逆性强，管理水平较好，丰产，单株干果产量95公斤。壳薄，易取整仁，种仁饱满，香甜不涩，品质优。果实富含蛋白质、脂肪、碳水化合物、膳食纤维、胡萝卜素、维生素E、以及钾、锰 、钙、磷、铁、硒、锌等多种元素'
                    // },
                    // {
                    //     id: 12,
                    //     treeName: '杨庄村12号树',
                    //     treeId: 13028101555, //古树编号
                    //     belonger: '杨福合', //归属人
                    //     lon: '118.101463', //经度
                    //     lat: '40.114639', //纬度
                    //     belongVillage: '杨庄村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/12(1).jpg")},{id:2, imageUrl: require("../../images/12(2).jpg")},{id:3, imageUrl: require("../../images/12(3).jpg")}],
                    //     introduce: '杨庄村始建于唐朝，杨、温、赵三个姓氏村民迁居此地，因三个姓氏中，杨氏人口居多，故取村名“大杨家庄村”，以后简称杨庄村。据统计，遵化市共有11个杨庄村，都是历史悠久，杨氏建庄，2个是清代建庄，8个是明代建庄，1个是唐代所建，东旧寨镇杨庄村是建庄最早的村。该村盛产核桃，种植面积达800余亩。据该村老林业技术员杨广新（现年80岁）介绍，70年代，杨庄因为核桃管理技术先进全国闻名，当时正是遵化王国藩时代，村第二代林业队长、村支委陈满礼、副队长杨春发等人，研究探索出了当时较为先进的核桃生产及管理经验，杨庄的核桃在全国始终保持稳产、高产。72年左右，全国28省的林业技术人员到杨庄村参观学习。73年，西安电影制片厂专门来杨庄村拍摄《核桃》，陈满礼等人进行核桃管理技术创新，以一株村西北山上主枝全部枯死、失去结果能力、只有数丛娃枝的280年核桃古树为原型，采取加强地下管理、修剪多余娃枝、培养较大的娃枝作为大、中、小结果枝组的方法。结果该树得到迅速复壮，此树不仅没有死，而且产量竟然高达207市斤（干果产量），来访者无不称赞。当时杨庄村核桃平均单产55市斤，总产160万公斤。《核桃》这部胶片电影1974年完成，并在全国巡回播映。由于拍摄时间较早，网上很难找到电子版本的影片。经过不断网络搜索，终于“山人闲斋的书摊”发现这部胶片有卖，价格360元，网址是https://book.kongfz.com/185327/621258628/。该树胸径65厘米，估测树龄140年。实生核桃品种，占地面积120平米，树势较弱，树姿直立，由于四周杨树遮挡，着光少，树冠小，结果少；管理水平一般，单株干果产量20公斤。'
                    // },
                    // {
                    //     id: 13,
                    //     treeName: '杨庄村13号树',
                    //     treeId: 13028101379, //古树编号
                    //     belonger: '温久贵', //归属人
                    //     lon: '118.101369', //经度
                    //     lat: '40.114365', //纬度
                    //     belongVillage: '杨庄村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/13(1).jpg")},{id:2, imageUrl: require("../../images/13(2).jpg")},{id:3, imageUrl: require("../../images/13(3).jpg")},{id:4, imageUrl: require("../../images/13(4).jpg")},{id:5, imageUrl: require("../../images/13(5).jpg")}],
                    //     introduce: '杨庄村始建于唐朝，杨、温、赵三个姓氏村民迁居此地，因三个姓氏中，杨氏人口居多，故取村名“大杨家庄村”，以后简称杨庄村。据统计，遵化市共有11个杨庄村，都是历史悠久，杨氏建庄，2个是清代建庄，8个是明代建庄，1个是唐代所建，东旧寨镇杨庄村是建庄最早的村。该村盛产核桃，种植面积达800余亩。据该村老林业技术员杨广新（现年80岁）介绍，70年代，杨庄因为核桃管理技术先进全国闻名，当时正是遵化王国藩时代，村第二代林业队长、村支委陈满礼、副队长杨春发等人，研究探索出了当时较为先进的核桃生产及管理经验，杨庄的核桃在全国始终保持稳产、高产。72年左右，全国28省的林业技术人员到杨庄村参观学习。73年，西安电影制片厂专门来杨庄村拍摄《核桃》，陈满礼等人进行核桃管理技术创新，以一株村西北山上主枝全部枯死、失去结果能力、只有数丛娃枝的280年核桃古树为原型，采取加强地下管理、修剪多余娃枝、培养较大的娃枝作为大、中、小结果枝组的方法。结果该树得到迅速复壮，此树不仅没有死，而且产量竟然高达207市斤（干果产量），来访者无不称赞。当时杨庄村核桃平均单产55市斤，总产160万公斤。《核桃》这部胶片电影1974年完成，并在全国巡回播映。由于拍摄时间较早，网上很难找到电子版本的影片。经过不断网络搜索，终于“山人闲斋的书摊”发现这部胶片有卖，价格360元，网址是https://book.kongfz.com/185327/621258628/。该树胸径67厘米，估测树龄140年。实生核桃品种，占地面积140平米，树势中庸，结果较少，缺少管理经营，单株干果产量20公斤左右。地理位置较好，若精细管理可以提高产量和品质'
                    // },
                    // {
                    //     id: 14,
                    //     treeName: '杨庄村14号树',
                    //     treeId: 13028101556, //古树编号
                    //     belonger: '张卫全', //归属人
                    //     lon: '118.10015', //经度
                    //     lat: '40.114405', //纬度
                    //     belongVillage: '杨庄村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/14(1).jpg")},{id:2, imageUrl: require("../../images/14(2).jpg")},{id:3, imageUrl: require("../../images/14(3).jpg")}],
                    //     introduce: '杨庄村始建于唐朝，杨、温、赵三个姓氏村民迁居此地，因三个姓氏中，杨氏人口居多，故取村名“大杨家庄村”，以后简称杨庄村。据统计，遵化市共有11个杨庄村，都是历史悠久，杨氏建庄，2个是清代建庄，8个是明代建庄，1个是唐代所建，东旧寨镇杨庄村是建庄最早的村。该村盛产核桃，种植面积达800余亩。据该村老林业技术员杨广新（现年80岁）介绍，70年代，杨庄因为核桃管理技术先进全国闻名，当时正是遵化王国藩时代，村第二代林业队长、村支委陈满礼、副队长杨春发等人，研究探索出了当时较为先进的核桃生产及管理经验，杨庄的核桃在全国始终保持稳产、高产。72年左右，全国28省的林业技术人员到杨庄村参观学习。73年，西安电影制片厂专门来杨庄村拍摄《核桃》，陈满礼等人进行核桃管理技术创新，以一株村西北山上主枝全部枯死、失去结果能力、只有数丛娃枝的280年核桃古树为原型，采取加强地下管理、修剪多余娃枝、培养较大的娃枝作为大、中、小结果枝组的方法。结果该树得到迅速复壮，此树不仅没有死，而且产量竟然高达207市斤（干果产量），来访者无不称赞。当时杨庄村核桃平均单产55市斤，总产160万公斤。《核桃》这部胶片电影1974年完成，并在全国巡回播映。由于拍摄时间较早，网上很难找到电子版本的影片。经过不断网络搜索，终于“山人闲斋的书摊”发现这部胶片有卖，价格360元，网址是https://book.kongfz.com/185327/621258628/。该树胸径85厘米，估测树龄240年。实生核桃品种，占地面积200平米，树势旺盛，树姿开张，分枝多，两杈，栽培管理水平高,丰产性好，单株干果产量60公斤。果实品质好，壳稍厚，可取整仁，种仁饱满。果实富含蛋白质、脂肪、碳水化合物、膳食纤维、胡萝卜素、维生素E、以及钾、锰 、钙、磷、铁、硒、锌等多种元素'
                    // },
                    {
                        id: 15,
                        treeName: '河东村15号树',
                        treeId: 13028100570, //古树编号
                        belonger: '李新', //归属人
                        lon: '118.147014', //经度
                        lat: '40.152219', //纬度
                        belongVillage: '河东村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/15(1).jpg")},{id:2, imageUrl: require("../../images/15(2).jpg")},{id:3, imageUrl: require("../../images/15(3).jpg")},{id:4, imageUrl: require("../../images/15(4).jpg")}],
                        introduce: '河东村原数祝店子村，位于南黎河北源支流河祝店子村的东岸，1961年建村，故取名河东村。村核桃面积100亩。实生核桃品种，占地面积200平米，树势健壮、丰产、抗病、抗虫。果实富含蛋白质、脂肪、碳水化合物、膳食纤维、胡萝卜素、维生素E、以及钾、锰 、钙、磷、铁、硒、锌等多种元素，皮薄、整仁、味香，单株干果产量45公斤。'
                    },
                    // {
                    //     id: 16,
                    //     treeName: '杨庄村16号树',
                    //     treeId: 13028101388, //古树编号
                    //     belonger: '杨春新', //归属人
                    //     lon: '118.100468', //经度
                    //     lat: '40.114201', //纬度
                    //     belongVillage: '杨庄村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/16(1).jpg")},{id:2, imageUrl: require("../../images/16(2).jpg")},{id:3, imageUrl: require("../../images/16(3).jpg")},{id:4, imageUrl: require("../../images/16(4).jpg")},{id:5, imageUrl: require("../../images/16(5).jpg")}],
                    //     introduce: '杨庄村始建于唐朝，杨、温、赵三个姓氏村民迁居此地，因三个姓氏中，杨氏人口居多，故取村名“大杨家庄村”，以后简称杨庄村。据统计，遵化市共有11个杨庄村，都是历史悠久，杨氏建庄，2个是清代建庄，8个是明代建庄，1个是唐代所建，东旧寨镇杨庄村是建庄最早的村。该村盛产核桃，种植面积达800余亩。据该村老林业技术员杨广新（现年80岁）介绍，70年代，杨庄因为核桃管理技术先进全国闻名，当时正是遵化王国藩时代，村第二代林业队长、村支委陈满礼、副队长杨春发等人，研究探索出了当时较为先进的核桃生产及管理经验，杨庄的核桃在全国始终保持稳产、高产。72年左右，全国28省的林业技术人员到杨庄村参观学习。73年，西安电影制片厂专门来杨庄村拍摄《核桃》，陈满礼等人进行核桃管理技术创新，以一株村西北山上主枝全部枯死、失去结果能力、只有数丛娃枝的280年核桃古树为原型，采取加强地下管理、修剪多余娃枝、培养较大的娃枝作为大、中、小结果枝组的方法。结果该树得到迅速复壮，此树不仅没有死，而且产量竟然高达207市斤（干果产量），来访者无不称赞。当时杨庄村核桃平均单产55市斤，总产160万公斤。《核桃》这部胶片电影1974年完成，并在全国巡回播映。由于拍摄时间较早，网上很难找到电子版本的影片。经过不断网络搜索，终于“山人闲斋的书摊”发现这部胶片有卖，价格360元，网址是https://book.kongfz.com/185327/621258628/。该树胸径66厘米，估测树龄140年。实生核桃品种，占地面积180平米，树势健壮，树姿较直立，丰产性好、管理水平高、果实品质好。果实富含蛋白质、脂肪、碳水化合物、膳食纤维、胡萝卜素、维生素E、以及钾、锰 、钙、磷、铁、硒、锌等多种元素，果香无整仁，单株干果产量80公斤。'
                    // },
                    {
                        id: 17,
                        treeName: '石桥头村17号树',
                        treeId: 13028100645, //古树编号
                        belonger: null, //归属人
                        lon: '118.102694', //经度
                        lat: '40.137925', //纬度
                        belongVillage: '石桥头村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                        introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径58厘米，估测树龄120年。实生核桃品种，占地面积200平米，树势健壮，树姿开张丰产性好，抗病虫，耐瘠薄。单株干果产量30公斤。'
                    },
                    // {
                    //     id: 18,
                    //     treeName: '石桥头村18号树',
                    //     treeId: 13028100646, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.102466', //经度
                    //     lat: '40.131079', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径46厘米，估测树龄100年。实生核桃品种，占地面积250平米，树势健壮、树姿极开张，采光好，精细管理可以提高果实产量和品质。核桃果实圆形，个小，壳较厚，不易取整仁。单株干果产量30公斤。'
                    // },
                    // {
                    //     id: 19,
                    //     treeName: '石桥头村19号树',
                    //     treeId: 13028100647, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.102137', //经度
                    //     lat: '40.136954', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径52厘米，估测树龄110年。实生核桃品种，占地面积80平米，无中心干，树势健壮、树姿极开张，晚熟、丰产性好。核桃果实圆形，个小，壳较厚，味香，易取整仁。单株干果产量40公斤。'
                    // },
                    // {
                    //     id: 20,
                    //     treeName: '石桥头村20号树',
                    //     treeId: 13028100648, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.102301', //经度
                    //     lat: '40.136722', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径43厘米，估测树龄100年。实生核桃品种，占地面积100平米，偏冠，树势健壮、树姿开张，采光中等。核桃果实圆形，饱满，个中等，味香。单株干果产量10公斤。'
                    // },
                    // {
                    //     id: 21,
                    //     treeName: '石桥头村21号树',
                    //     treeId: 13028100649, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.102126', //经度
                    //     lat: '40.136722', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径62厘米，估测树龄120年。实生核桃品种，占地面积360平米，树势健壮、树姿开张，采光中等。管理粗放，结果少，壳后不易取整仁，精细管理后可增加产量和品质。单株干果产量30公斤。'
                    // },
                    {
                        id: 22,
                        treeName: '石桥头村22号树',
                        treeId: 13028100650, //古树编号
                        belonger: null, //归属人
                        lon: '118.101965', //经度
                        lat: '40.136653', //纬度
                        belongVillage: '石桥头村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                        introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径59厘米，估测树龄120年。实生核桃品种，占地面积380平米，树势健壮、树姿开张。管理粗放，结果少，果个大，饱满，可取整仁，品质优。精细管理后可增加产量和品质。单株干果产量60公斤。'
                    },
                    {
                        id: 23,
                        treeName: '石桥头村23号树',
                        treeId: 13028100651, //古树编号
                        belonger: null, //归属人
                        lon: '118.101606', //经度
                        lat: '40.136493', //纬度
                        belongVillage: '石桥头村', //归属村
                        quality: '优', //品质
                        startPrice: 13500, //起拍价
                        markupPrice: 2000, //加价幅度
                        evaluatePrice: '无', //评估价
                        reservePrice: '无', //保留价
                        leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                        introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径57厘米，估测树龄120年。实生核桃品种，占地面积230平米，树势健壮、树姿开张。管理粗放，结果少，果个大，饱满，可取整仁，品质优。精细管理后可增加产量和品质。单株干果产量50公斤。'
                    },
                    // {
                    //     id: 24,
                    //     treeName: '石桥头村24号树',
                    //     treeId: 13028100652, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.101402', //经度
                    //     lat: '40.136443', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径50厘米，估测树龄110年。实生核桃品种，占地面积220平米，树势健壮、树姿开张。管理粗放，结果少。精细管理后可增加产量和品质。单株干果产量30公斤。'
                    // },
                    // {
                    //     id: 25,
                    //     treeName: '石桥头村25号树',
                    //     treeId: 13028100653, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.101322', //经度
                    //     lat: '40.136282', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径55厘米，估测树龄110年。实生核桃品种，占地面积200平米，树势健壮、树姿开张。管理粗放，全部核桃黑。精细管理后可增加产量和品质。单株干果产量30公斤。'
                    // },
                    // {
                    //     id: 26,
                    //     treeName: '石桥头村26号树',
                    //     treeId: 13028100654, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.101322', //经度
                    //     lat: '40.136282', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径48厘米，估测树龄100年。实生核桃品种，占地面积100平米，树势健壮、树姿开张。管理粗放，果个中等，果仁饱满香甜，可取整仁。精细管理后可增加产量和品质。单株干果产量20公斤。'
                    // },
                    // {
                    //     id: 27,
                    //     treeName: '石桥头村27号树',
                    //     treeId: 13028100655, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.102393', //经度
                    //     lat: '40.136697', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径45厘米，估测树龄100年。实生核桃品种，占地面积100平米，树势健壮、树姿半开张、抗病虫害强。晚熟、果个中等，挂果量大，极丰产，双果多。单株干果产量20公斤。可以作为实生选种育种备选'
                    // },
                    // {
                    //     id: 28,
                    //     treeName: '石桥头村28号树',
                    //     treeId: 13028100656, //古树编号
                    //     belonger: null, //归属人
                    //     lon: '118.102464', //经度
                    //     lat: '40.136822', //纬度
                    //     belongVillage: '石桥头村', //归属村
                    //     quality: '优', //品质
                    //     startPrice: 13500, //起拍价
                    //     markupPrice: 2000, //加价幅度
                    //     evaluatePrice: '无', //评估价
                    //     reservePrice: '无', //保留价
                    //     leftImg: [{id:1, imageUrl: require("../../images/shu1.jpg")},{id:1, imageUrl: require("../../images/shu2.png")}],
                    //     introduce: '石桥头村始建于唐朝，村南原有一架石桥，村庄坐落在石桥的北端，故取村名“石桥头村”。该村东部是徐家套的城子山，海拔270米，山高陡峭不便攀爬；村南可进出东旧寨、铁厂；村北可接建明；村西近邻大寨。抗战时期，这里是咽喉之地，日伪军曾在该村设立据点并在此驻守。该村生态环境优良，依山傍水，山林密布，盛产核桃、板栗，核桃种植面积达1200亩。该树胸径50厘米，估测树龄110年。实生核桃品种，占地面积120平米，树势健壮、树姿半开张、叶片浓绿，抗病性强。挂果量少。单株干果产量15公斤。'
                    // }
                ],
                nowTreeData: null
            }
        },
        created(){
            this.nowTreeData = this.treeData[0]
            this.shopDetailImgList = this.treeData[0].leftImg
            this.tableData.sort(function (a, b) {
              return b.price - a.price;
            })
        },
        methods: {
            btn(){
                 if(this.msg=='竞拍开始'){
                   this.msg='竞拍中'
                 }else if(this.msg=='竞拍中') {
                   this.msg='竞拍结束'
                 }

            },
            showBigImg (index) {
                this.imgIndex = index;
            },
            styleBack({ row, column, rowIndex, columnIndex }){
                if (rowIndex == 0){
                    return{
                        color: '#d91615',
                        fontWeight: 'bold'
                    }
                }
            },
            updateTab(val){
                this.tableData.forEach(item => {
                    if (this.bidNumber == item.name){
                        item.price = val
                        item.time = this.getNowTime()
                    }
                })
                this.tableData.sort(function (a, b) {
                    return b.price - a.price;
                })
            },
            getNowTime() {
                const yy = new Date().getFullYear()
                const MM = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
                const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
                const HH = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
                const mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
                const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
                return yy + '年' + MM + '月' + dd + '日' + ' ' + HH + ':' + mm + ':' + ss
            },
            goItem(i){
                this.nowTreeData = this.treeData[i]
                this.shopDetailImgList = this.treeData[i].leftImg
            },
        }
    }
</script>

<style scoped>
  /deep/.magnifier-box img{
    height: 100% !important;
  }
  ul,li{
    list-style: none;
  }
  .auction-big-div{
    background: #f3f5f7;
    padding-top: 20px;
    position: relative;
  }
  .auction-div{
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }
  .auction-first{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .auction-child-one{
    width: 74%;
    background: #FFFFFF;
  }
  .auction-child-two{
    width: 24%;
    background: #FFFFFF;
    padding: 20px;
  }
  .auction-child-two>ul{
    margin-top: 20px;
  }
  .auction-child-two>ul>li{
    margin-top: 25px;
    line-height: 35px;
    padding: 10px 0;
  background:rgba(255, 0, 0, 0.05)
  }
  .auction-child-two>ul>li>p{
    display: flex;
    justify-content: space-around;
    font-size: 18px;
  }
  .auction-child-two>ul>li>p>span{
    display: inline-block;
  }
  .tipsDetailWrap{
    width: 100%;
    background: #C13939;
    text-align: center;
  }
  .tipsTriangle{
    font-size: 12px;
    font-weight: 500;
    color: #FFF;
    line-height: 36px;
    display: inline-block;
    margin-right: 6px;
  }
  .tipsBtn{
    font-size: 12px;
    color: #C13939;
    background: #fff;
    border-radius: 4px;
    padding: 5px 20px;
    cursor: pointer;
  }
  .auction-main{
    width: 100%;
    padding: 20px;
  }
  .auction-main>h1{
    font-size: 18px;
    line-height: 24px;
    color: #333;
    margin: 0 0 10px;
  }
  .auction-main-left{
    width: 48%;
    position: relative;
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .auction-main-left-big{
    width: 400px;
    height: 350px;
    position: relative;
  }
  .auction-main-left-big img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .auction-main-left-list{
    width: 100%;
    margin-top: 15px;
    display: flex;
  }
  .auction-main-left-list-img{
    width: 68px;
    height: 68px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 15px;
  }
  .auction-main-left-list-img img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .shopDetailActive{
    border: 1px solid #FC405E;
    border-radius: 5px;
  }
  .auction-main-right{
    width: 48%;
    margin-left: 20px;
    float: left;
  }
  .auction-main-right-title{
    width: 100%;
    height: 160px;
    padding: 10px 20px;
    background: rgba(255, 0, 0, 0.05);
  }
  .clearFloat {
    width: 100%;
    height: 0;
    clear: both;
  }
  .auction-second{
    margin: 20px 0;
    width: 100%;
    height: auto;
    padding-bottom: 100px;
    background: #FFFFFF;
  }
  .go-what{
    width: 100%;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 15%;*/
    text-align: center;
    margin: 10px 0 30px;
  }
  .go-what>ul{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .go-what>ul>li{
    width: 60px;
    height: 25px;
    margin:2px  8.5px;
    border: 1px solid #333333;
    display: flex;
    float: left;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    border-radius: 3px;
    cursor: pointer;
  }
  .go-what>ul>li:hover{
    background: rgba(0, 0, 255, 0.1);
  }
  /deep/ .ivu-tabs-ink-bar{
    background-color: #d6363b !important;
  }
  /deep/ .ivu-tabs-tab-active{
    color: #d6363b;
  }
  /deep/ .ivu-tabs-tab:hover{
    color: #d6363b;
  }
  /deep/ .ivu-tabs-tab{
    font-size: 18px !important;
    padding: 15px 30px !important;
  }
  /deep/ .ivu-tabs-tabpane{
    padding: 20px 50px;
  }
</style>

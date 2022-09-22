<template>
    <div class="shopQA">
      <div class="shopQA-head">
        <p style="margin-right: 10px;font-size: 14px;">心中疑惑就问问买过此商品的同学吧~</p>
        <Button type="ghost" shape="circle" @click="shopQAmodal = true">我要提问</Button>
      </div>
      <div class="shopQA-content">
        <div v-for="(item, index) in shopQAList" :key="index" class="shopQA-content-model">
          <div class="shopQA-content-model-ask">
            <span>问</span>
            <div>
              <p>{{item.content}}</p>
              <span>{{item.userName}} {{item.createdTime}}</span>
            </div>
          </div>
          <div v-if="item.productAnswer" class="shopQA-content-model-answer">
            <span>答</span>
            <div>
              <ul v-if="!item.productQuestionList">
                <li>
                  <p>{{item.productAnswer.content}}</p>
                  <span>{{item.productAnswer.userName?item.productAnswer.userId:item.productAnswer.userName}} {{item.productAnswer.createdTime}}</span>
                </li>
              </ul>
              <ul v-else>
                <Spin v-if="isShowSpin">加载中...</Spin>
                <li v-for="(v, i) in item.productQuestionList" :key="i">
                  <p>{{v.content}}</p>
                  <span>{{v.userName}} {{v.createdTime}}</span>
                </li>
                <Page v-show="index === isShow" simple class="attractionsDetail-content-pageList" :total="answerCurrent" @on-change="(val) => getNewAnswerList(val, item, index)"/>
              </ul>
              <div @click="showMore(index, item)">
                <span class="oder-show-content">{{isShow === index ? "点击收起" : "点击显示更多"}}</span>
                <Icon :type="isShow === index? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>
              </div>
            </div>
          </div>
          <p class="shop-answer-model" @click="addAnswer(index)">我要回复</p>
        </div>
        <Page v-if="shopQAList.length !== 0" class="attractionsDetail-content-pageList" :total="shopQACurrent" @on-change="getNewShopQAList"/>
      </div>
<!--      提问-->
      <Modal
        v-model="shopQAmodal"
        title="提问"
        :closable="false"
        :mask-closable="false">
        <p style="color: #999999;font-size: 12px;margin-bottom: 10px;">您的问题将推送给已购用户，TA们会帮您解答</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="comment-form-content">
          <Form-item prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入255字以下的评论"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="shopQAok('formValidate')">发布</Button>
          <Button type="ghost" @click="shopQAcancel('formValidate')">取消</Button>
        </div>
      </Modal>
<!--      回答-->
      <Modal
        v-model="answerModal"
        title="回答问题"
        :closable="false"
        :mask-closable="false">
        <Form ref="formAnswer" :model="formValidate" :rules="ruleValidate" class="comment-form-content">
          <Form-item prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入255字以下的回复"></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="shopQAok('formAnswer')">发布</Button>
          <Button type="ghost" @click="shopQAcancel('formAnswer')">取消</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
    import { addShopQA, getShopQAList, getShopAnswerList } from '../../api/order'
    export default {
        name: "shopQA",
        props: ['shopInfo', 'specList', 'checkSpec'],

        data() {
            return {
                shopQAmodal: false,
                answerModal: false,
                clickAnswerModal:null,
                isShow: null,
                answerCurrent: 1,
                shopQACurrent: 1,
                pageNo: 1,
                pageNoAnswer: 1,
                shopQAList: [],
                isShowSpin: false,
                formValidate: {
                    desc:''
                },
                ruleValidate: {
                    desc: [
                        { required: true, message: '最少输入4个字哦~', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            this.getSpecShopQAList(1, 10)
        },
        methods: {
            getNewShopQAList(val) {
                this.pageNo = val;
                this.getSpecShopQAList(val, 10)
            },
            getSpecShopQAList(pageNo, pageSize) {
                if (this.specList.length === 0) {
                    let data = {
                        productId: this.shopInfo.id,
                        specId: this.shopInfo.specId,
                        status: 1,
                        type: 1
                    }
                    getShopQAList(pageNo, pageSize, data).then(res => {
                        if (res.code === '0') {
                            this.shopQAList = res.data.resultList;
                            this.shopQACurrent = res.data.totalCount;
                        }else{
                            this.$Notice.warning({title: '警告', desc: res.msg});
                        }
                    })
                }else{
                    let data = {
                        productId: this.specList[this.checkSpec].productId,
                        specId: this.specList[this.checkSpec].id,
                        status: 1,
                        type: 1
                    }
                    getShopQAList(pageNo, pageSize, data).then(res => {
                        if (res.code === '0') {
                            this.shopQAList = res.data.resultList;
                            this.shopQACurrent = res.data.totalCount;
                        }else{
                            this.$Notice.warning({title: '警告', desc: res.msg});
                        }
                    })
                }
            },
            shopQAok(name) {
                if (this.specList.length === 0 ) {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            let data = {
                                languageId: 1,
                                productId: this.shopInfo.id,
                                specId: this.shopInfo.specId,
                                type: this.shopQAmodal === true ? 1 : this.answerModal === true ? 2 : null,
                                content: this.formValidate.desc,
                                status: 1,
                                questionId: this.answerModal === true ? this.shopQAList[this.clickAnswerModal].questionId : null
                            };
                            this.addShopComponentFun(data, name)
                        } else {
                            this.$Message.error('表单验证失败!');
                        }
                    })
                }else{
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            let data = {
                                languageId: 1,
                                productId: this.specList[this.checkSpec].productId,
                                specId: this.specList[this.checkSpec].id,
                                type: this.shopQAmodal === true ? 1 : this.answerModal === true ? 2 : null,
                                content: this.formValidate.desc,
                                status: 1,
                                questionId: this.answerModal === true ? this.shopQAList[this.clickAnswerModal].questionId : null
                            };
                            this.addShopComponentFun(data, name)
                        } else {
                            this.$Message.error('表单验证失败!');
                        }
                    })
                }
            },
            addShopComponentFun(data, name) {
                addShopQA(data).then(res => {
                    if (res.code === '0') {
                        this.shopQAmodal = false;
                        this.answerModal = false;
                        this.getSpecShopQAList(1, 10);
                        this.$refs[name].resetFields();
                        this.$Message.success('发布成功');
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            },
            shopQAcancel(name) {
                this.$refs[name].resetFields();
                this.shopQAmodal = false;
                this.answerModal = false;
            },
            getNewAnswerList(val, item, index) {
                this.pageNoAnswer = val;
                this.isShowSpin = true;
                this.shopQAList[index].productQuestionList = [];
                this.getAnswerList(val, 10, item, index)
            },
            getAnswerList(pageNo, pageSize, item, index) {
                getShopAnswerList(pageNo, pageSize, {questionId: item.questionId, type:2, status:1}).then(res => {
                    if (res.code === '0') {
                        this.shopQAList[index].productQuestionList = res.data.resultList;
                        console.log(this.shopQAList[index].productQuestionList)
                        this.answerCurrent = res.data.totalCount;
                        this.isShowSpin = false;
                    }else{
                        this.$Notice.warning({title: '警告', desc: res.msg});
                        this.isShowSpin = false;
                    }
                })
            },
            showMore(index, item) {
                if (this.isShow === index){
                    this.isShow = null;
                    let newAnswer = this.shopQAList[index].productQuestionList.shift();
                    this.shopQAList[index].productQuestionList = [];
                    this.shopQAList[index].productQuestionList = [newAnswer];
                }else{
                    this.isShowSpin = true;
                    this.shopQAList[index].productQuestionList = [];
                    this.isShow = index;
                    this.getAnswerList(1, 10, item, index)
                }
            },
            addAnswer(index){
                this.answerModal = true;
                this.clickAnswerModal = index;
            }
        }
    }
</script>

<style scoped>
ul li {
  list-style: none;
}
.shopQA{
  width: 100%;
}
.shopQA-head{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shopQA-content{
  width: 100%;
  margin-top: 20px;
}
.shopQA-content-model{
  width: 100%;
  margin-top: 20px;
}
.shopQA-content-model-ask{
  width: 100%;
}
.shopQA-content-model-ask>span{
  width: 18px;
  height: 18px;
  display: inline-block;
  border-radius: 9px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  float: left;
  background: #f91;
}
.shopQA-content-model-ask>div{
  margin-left: 25px;
  overflow: hidden;
}
.shopQA-content-model-ask>div>p{
  float: left;
  color: #333;
  font-weight: 700;
}
.shopQA-content-model-ask>div>span{
  float: right;
  color: #999;
}
.shopQA-content-model-answer{
  width: 100%;
}
.shopQA-content-model-answer>span{
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  float: left;
  background: #9b1;
  margin-top: 15px;
}
.shopQA-content-model-answer>div{
  margin-left: 25px;
}
.shopQA-content-model-answer>div>ul{
  padding-top: 5px;
}
.shopQA-content-model-answer>div>ul>li{
  overflow: hidden;
  padding: 10px 0;
  border-bottom: 1px solid #E0E0E0;
}
.shopQA-content-model-answer>div>ul>li>p{
  float: left;
  color: #333;
  font-weight: 700;
}
.shopQA-content-model-answer>div>ul>li>span{
  float: right;
  color: #999;
}
.shopQA-content-model-answer>div>div{
  margin-top:10px;
  color:#005ea7;
  cursor:pointer
}
.shopQA-content-model-answer>div>div:hover{
  color: #e4393c !important;
}
/*.shopQA-content-model-answer>div>p:last-of-type{*/
/*  margin-top: 5px;*/
/*  cursor: pointer;*/
/*  color:#005ea7;*/
/*}*/
/*.shopQA-content-model-answer>div>p:last-of-type:hover{*/
/*  color: #e4393c !important;*/
/*  text-decoration: underline;*/
/*}*/
.attractionsDetail-content-pageList{
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.shop-answer-model{
  margin-top: 5px;
  margin-left: 25px;
  cursor: pointer;
  color:#005ea7;
}
.shop-answer-model:hover{
  color: #e4393c !important;
  text-decoration: underline;
}
.ivu-spin-main{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

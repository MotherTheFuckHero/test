<template>
  <div class="container">
    <Search></Search>
    <HomeNav :parentPanelList="panelList"></HomeNav>
    <div class="all-news">
      <div class="company-news" v-if="companyNews.length !== 0">
        <h1>公司新闻</h1>
        <div class="company-news-list">
          <div class="company-news-model" v-for="(v, i) in companyNews" :key="i" @click="goDetail(v.id)">
            <img style="margin-bottom: 10px;width: 100%;height: 150px;object-fit: cover;flex: 1" :src="v.topImageUrl" alt="">
            <h2 style="text-align: center">{{v.title}}</h2>
            <div v-html="v.content" style="line-height: 28px;color: #000000;font-size: 12px"></div>
          </div>
        </div>
      </div>
      <div class="industry-news" v-if="industryNews.length !== 0">
        <h1>行业新闻</h1>
        <div class="industry-news-list">
          <div class="industry-news-model" v-for="(v, i) in industryNews" :key="i" @click="goDetail(v.id)">
            <img style="margin-bottom: 10px;width: 100%;height: 150px;object-fit: cover;flex: 1" :src="v.topImageUrl" alt="">
            <h2 style="text-align: center">{{v.title}}</h2>
            <div v-html="v.content" style="line-height: 28px;color: #000000;font-size: 12px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { newsList } from '../api/news';
    import Search from '@/components/Search';
    import HomeNav from '@/components/nav/HomeNav';

    export default {
        name: "news",
        components: {
            Search,
            HomeNav,
        },
        data(){
            return {
                panelList: JSON.parse(localStorage.getItem("newPanelList")),
                companyNews: [],
                industryNews: []
            }
        },
        created() {
            newsList({}).then(res => {
                if (res.code === '0'){
                    this.companyNews = [];
                    this.industryNews = [];
                    res.data.resultList.forEach(item => {
                        if (item.type === 1){
                            item.content = item.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '');
                            this.companyNews.push(item)
                        }else {
                            item.content = item.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '');
                            this.industryNews.push(item)
                        }
                    })
                }
            })
        },
        methods: {
            goDetail(id){
                this.$router.push({
                    path: '/newsDetail',
                    query: {
                        id: id
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .container {
    background-color: #F5F5F5;
  }
  .all-news{
    width: 1008px;
    height: auto;
    margin: 0 auto;
  }
  .company-news{
    width: 100%;
    margin: 15px auto;
    padding: 10px;
  }
  .company-news-list{
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .company-news-model{
    width: calc((100% - 30px)/3);
    margin-right: 10px;
    margin-bottom: 12px;
    background: #ffffff;
    border: 1px solid rgba(43,173,0,0.3);
    padding: 10px 10px 0 10px;
    cursor: pointer;
  }
  .company-news-model:nth-of-type(4n+0){
    margin-right: 0;
  }
  .industry-news{
    width: 100%;
    margin: 15px auto;
    padding: 10px;
  }
  .industry-news-list{
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .industry-news-model{
    width: calc((100% - 24px)/3);
    margin-right: 12px;
    margin-bottom: 12px;
    background: #ffffff;
    border: 1px solid rgba(43,173,0,0.3);
    padding: 10px 10px 0 10px;
    cursor: pointer;
  }
  .industry-news-model:nth-of-type(4n+0){
    margin-right: 0;
  }
</style>

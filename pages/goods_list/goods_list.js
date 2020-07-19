// pages/goods_list/goods_list.js
import { request } from '../../request/index.js'
Page({

    /**
   * 页面的初始数据
   */
  data: {
    tabs:[
        {
            id:0,
            value:"综合",
            isActive:true
        },
        {
            id:1,
            value:"销量",
            isActive:false
        },
        {
            id:2,
            value:"价格",
            isActive:false
        },
    ],
    goods_list:[]
},
//接口需要的参数
QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
},
totalPages:1,
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  this.QueryParams.cid=options.cid;
  this.getGoodsList();
},

//获取商品列表的数据

async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams})
    console.log(res);
    const {total}=res;
    //计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
        //拼接原数组
        goods_list:[...this.data.goods_list,...res.goods]
    })
    //计算总页数
    // const {total}=total;
    // this.tatolPages
},

tabsItemChange(e){
    console.log(e);

    
    //被点击的index
    const {index}=e.detail;
    let {tabs}=this.data
  tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive=false);
    this.setData({
        tabs
    })
    
},
//监听页面事件
onReachBottom(){
// console.log("页面触底");
if(this.QueryParams.pagenum>=this.totalPages){
    // console.log("没有下一页数据");
    wx.showToast({
      title: '没有下一页数据',
    })
}else{
    // console.log("还有下一页数据");
    this.QueryParams.pagenum++;
    this.getGoodsList();
}
}
})
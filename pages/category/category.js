// pages/category/category.js
import { request } from '../../request/index.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {

        // 左侧的菜单数据
        leftMenuList: [],
        //右侧的商品数据
        rightContent: [],
        //被点中的索引
        currentIndex: 0,
        //右侧置顶
        srcollTop: 0

    },
    //接受返回值数组
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 判断本地存储有没有旧数据
        //没有旧数据直接发送请求
        //有旧数据判断是否过期，没有就使用本地数据即可
        const Cates = wx.getStorageSync('cates')
        if (!Cates) {
            //不存在本地数据
            this.getCates();
        } else {
            //判断是否过期
            if (Date.now() - Cates.time > 1000 * 60 * 5) {
                this.getCates();
            } else {
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                // console.log(rightContent)
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },

    // 获取分类数据
    async getCates() {
        // request({
        //     url: "/categories"
        // }).then(res => {
        //     // console.log(res);
        //     this.Cates = res;
        //     //将数据存入缓存中
        //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
        //         //构造左侧的大菜单数据
        //     let leftMenuList = this.Cates.map(v => v.cat_name);
        //     let rightContent = this.Cates[0].children;
        //     // console.log(rightContent)
        //     this.setData({
        //         leftMenuList,
        //         rightContent
        //     })
        // })

        const res = await request({ url: "/categories" });
        this.Cates = res;
        //将数据存入缓存中
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
        //构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        // console.log(rightContent)
        this.setData({
            leftMenuList,
            rightContent
        })
    },

    //左侧菜单点击效果
    handleLeftMenuTap(e) {
        console.log(e);
        //获取点击事件的indecurrx值
        const { index } = e.currentTarget.dataset
        //赋值给currentIndex
        let rightContent = this.Cates[index].children;
        // 根据不同的索引渲染商品内容
        this.setData({
            currentIndex: index,
            rightContent,
            srcollTop: 0
        })
    }

})
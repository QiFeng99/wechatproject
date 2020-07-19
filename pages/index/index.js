//Page Object

import {request} from '../../request/index.js'
Page({
    data: {
        //获取轮播图数据
        swiperList:[],
        //导航数组
        catesList:[],
        //楼层数据
        floorList:[]
    },
    //options(Object)
    onLoad: function(options) {
        // var reqTask = wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     method: 'GET',
        //     success: (result) => {
        //         console.log(result);
        //         this.setData({
        //             swiperList:result.data.message
        //         })
        //     }
        // });
        //获取轮播图数据
     this.getSwiperList();
     //获取导航栏数据   
     this.getCatesList();
     //获取楼层数据
     this.getFloorList();
     
    },
    //获取轮播图数据
    getSwiperList(){
        request({
            url: "/home/swiperdata"
        }).then(
            result=>{
                this.setData({
                    swiperList:result
                })
            }
        ).then(err=>{
            console.log(err)
        })
    },

    getCatesList(){
        request({
            url: "/home/catitems"
        }).then(
            result=>{
                this.setData({
                    catesList:result
                })
            }
        ).then(err=>{
            console.log(err)
        })
    },

    getFloorList(){
        request({
            url: "/home/floordata"
        }).then(
            result=>{
                this.setData({
                    floorList:result
                })
            }
        ).then(err=>{
            console.log(err)
        })
    },
});
  
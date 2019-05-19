
Page({
  data:{
    year: 0,
    month: 0,
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    imgLIst: [
      {
        url:'/images/biaoqing_3.png',
        hoverUrl:'/images/biaoqing_1.png'
      },
      {
        url: '/images/biaoqing-dai.png',
        hoverUrl: '/images/biaoqingyidaosanke.png'
      },
      {
        url: '/images/biaoqing-nanguo.png',
        hoverUrl: '/images/biaoqing.png'
      }
    ],
    imgHoverIndex: 0
  },

  chooseThis(e) {
    this.setData({
      imgHoverIndex: e.currentTarget.dataset.index
    })
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    var developer={
      index:index
    }
    wx.setStorageSync('developer', developer);
  },

  onLoad:function(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let isToday = now.getDate()
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday:isToday
    })
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                        //需要遍历的日历数组数据
    let arrLen = 0;                            //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                    //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                            //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();                //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();

    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5

        }

      } else {
        obj = {};

      }
      dateArr[i] = obj;

    }
    this.setData({
      dateArr: dateArr

    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek

      })

    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: - 1
      })
    }
  }
})
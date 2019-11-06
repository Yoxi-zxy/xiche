<template>
  <div class="chrray-main">
    <div class="guide-head-img"></div>
    <div class="guide-body-box">
      <div class="guide-nav">
        <p
          v-for="item in navList"
          :key="item.id"
          class="title"
          :class="curList.id === item.id ? 'active' : ''"
          @click="Tab(item)">
          {{ item.number }}{{ item.title }}？
        </p>
      </div>
      <div class="guide-con">
        <div class="title-box">
          <span class="adorn"></span>
          <p class="title">{{ curList.title }}</p>
          <span class="adorn left"></span>
        </div>
        <div class="body-con">
          <img :src="item" alt="" v-for="(item, index) in curList.imgUrl" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          id: 0,
          number: '一、',
          title: '如何在公众平台学习就业政策',
          imgUrl: [
            require('../../assets/img/1-1.jpg'),
            require('../../assets/img/1-2.jpg')
          ]
        },
        {
          id: 1,
          number: '二、',
          title: '个人、企业办事流程',
          imgUrl: [
            require('../../assets/img/2-1.jpg'),
            require('../../assets/img/2-2.jpg'),
            require('../../assets/img/2-3.jpg'),
            require('../../assets/img/2-4.jpg')
          ]
        },
        {
          id: 2,
          number: '三、',
          title: '如何在公众平台招聘',
          imgUrl: [
            require('../../assets/img/3-1.png'),
            require('../../assets/img/3-2.png'),
            require('../../assets/img/3-3.png'),
            require('../../assets/img/3-4.png')
          ]
        },
        {
          id: 3,
          number: '四、',
          title: '如何在公众平台找工作',
          imgUrl: [
            require('../../assets/img/4-1.png'),
            require('../../assets/img/4-2.png'),
            require('../../assets/img/4-3.png'),
            require('../../assets/img/4-4.jpg')
          ]
        }
      ],
      curList: {}
    }
  },
  mounted () {
    this.curList = {
      id: 0,
      number: '一、',
      title: '如何在公众平台学习就业政策',
      imgUrl: [
        require('../../assets/img/1-1.jpg'),
        require('../../assets/img/1-2.jpg')
      ]
    }
  },
  methods: {
    Tab (val) {
      this.title = val.title
      this.curList = val
    }
  }
}
</script>

<style scoped lang="less">
.chrray-main {
  background: linear-gradient(#6416cf, #2a6ef8);
  .guide-head-img {
    height: 185px;
    background-image: url("../../assets/img/guide.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .guide-body-box {
    padding: 0 15px;
    .guide-nav {
      padding: 10px 25px;
      background-color: #fff;
      border-radius: 5px;
      position: relative;
      top: -35px;
      &:after {
        content: "";
        position: absolute;
        width: 90%;
        height: 10px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background-color: rgba(255, 255, 255, .2);
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
      }
      .title {
        color: #333;
        font-size: 15px;
        line-height: 3;
        &.active {
          color: #006CD1;
        }
      }
    }
    .guide-con {
      border-radius: 5px;
      background-color: #fff;
      position: relative;
      top: -20px;
      .title-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
        background-color: #e9f0fe;
        border-radius: 5px;
        .adorn {
          width: 11PX;
          height: 11PX;
          border-radius: 50%;
          line-height: 1;
          margin-right: 10px;
          position: relative;
          background-color: rgba(42, 109, 248, .8);
          &.left {
            margin-right: 0;
            margin-left: 10px;
            &:after {
              left: 7PX;
            }
          }
          &:after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 5PX;
            left: -4PX;
            width: 8PX;
            height: 8PX;
            border-radius: 50%;
            background-color: rgba(42, 109, 248, .5);
          }
        }
        .title {
          font-size: 16px;
          color: #2b6df8;
          line-height: 1;
        }
      }
      .body-con {
        padding: 15px 15px 15px 0;
        img {
          width: 100%;
          display: block;
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>

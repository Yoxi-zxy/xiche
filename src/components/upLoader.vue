<template>
  <!-- 底部需要一个动态渲染的模板.可以添加不同的样式 -->
  <!-- uploader是一个可以动态修改的图片上传数量的 -->
  <div class="chrray-uploader_wrapper">
    <div class="chrray-uploader_preview" v-for="(item, index) in imgList" :key="index">
      <div class="chrray-uploader_preview-border">
        <img :src="item.url" class="chrray-img uploader-img" @click="previewImg(index)">
        <van-icon name="delete" class="chrray-uploader_preview-delete" @click="removeImg(item.id)"></van-icon>
      </div>
    </div>
    <van-uploader
      v-if="imgList.length < maxCount"
      class="chrray-uploader"
      :after-read="upFront"
      accept="image/*">
      <div class="cy-upload-text">
        <slot name="default">
          <van-icon class-prefix="chrray-icon" name="tubiaosvg-14" class="icon"></van-icon>
          <span class="text">身份证正面</span>
        </slot>
      </div>
    </van-uploader>
  </div>
</template>

<script>
import api from '@/api/data'
import { Icon, Uploader, ImagePreview, Toast } from 'vant'
export default {
  props: {
    imgList: {
      type: Array
    },
    maxCount: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      //
    }
  },
  components: {
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
    [ImagePreview.name]: ImagePreview,
    [Toast.name]: Toast
  },
  methods: {
    //  上传
    upFront (file) {
      let that = this
      const isJPG = file.file.type === 'image/jpeg'
      const isPNG = file.file.type === 'image/png'
      const isBMP = file.file.type === 'image/bmp'
      const isWEBP = file.file.type === 'image/webp'
      const isPic = isJPG || isPNG || isBMP || isWEBP;
      if (!isPic) {
        Toast(`请上传jpg或bmp格式的图片`)
        return false
      } else {
        let data = new FormData()
        let id = file.file.lastModified;
        data.append('file', file.file)
        api.upFile(data).then(res => {
          let params = {
            url: res.data,
            id
          }
          that.imgList.push(params)
        })
      }
    },
    //  删除
    removeImg (id) {
      let data = this.imgList
      for (let i in data) {
        if (data[i].id === id) {
          data.splice(i, 1)
        }
      }
    },
    //  预览
    previewImg (index) {
      let data = this.imgList
      let images = []
      for (let i in data) {
        images.push(data[i].url)
      }
      ImagePreview({
        images,
        startPosition: index
      });
    }
  }
}
</script>

<style lang="less">
.chrray-uploader_wrapper {
  margin: 0 -5px;
  overflow: hidden;
}
.chrray-uploader_preview,
.chrray-uploader {
  width: 50%;
  height: 135px;
  padding: 5px;
  float: left;
  box-sizing: border-box;
}
.chrray-uploader_preview-border {
  height: 100%;
  border: 1PX solid #f2f2f2;
  position: relative;
}
.uploader-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.chrray-uploader_preview-delete {
  position: absolute;
  font-size: 24px;
  bottom: 0;
  right: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.45);
}
.chrray-uploader {
  .van-uploader__wrapper {
    height: 100%;
    border: 1PX solid #f2f2f2;
    position: relative;
    .van-uploader__input-wrapper {
      width: 100%;
      .cy-upload-text {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .icon {
          font-size: 36px;
          color: #ccc;
        }
        .text {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>

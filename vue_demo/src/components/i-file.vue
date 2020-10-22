<template>
  <div class="container" v-loading="loading">
    <div class="file-box">
      <el-button class="add-btn" @click="addImg" type="primary" icon="el-icon-plus"></el-button>
      <span v-show="path">
        <img :src="path" alt="">
      </span>
      <el-button v-show="path" @click="deleteImg" class="delete-btn" type="danger" icon="el-icon-delete"></el-button>
    </div>
    <input style="display:none" id="image" ref="image" type="file" name="image" accept="image/jpeg,image/jpg,image/png" @change="fileChange($event)"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'i-file',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      path: '',
      loading: false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.path = value

        if (!value) {
          document.getElementById('image').value = ''
        }
      },
      deep: true
    }
  },
  methods: {
    openImg () {
      window.open(this.path)
    },
    addImg () {
      this.$refs.image.click()
    },
    deleteImg () {
      this.path = ''
      this.$emit('input', this.path)
    },
    fileChange (event) {
      // console.log(event.target.files)
      if (event.target.files.length) {
        this.loading = true
        let form = new FormData()
        let imgFile = document.getElementById('image').files[0]
        console.log('imgFile', imgFile)
        form.append('image', imgFile, imgFile.name) // 通过append向form对象添加数据
        // form.append('access_token', JSON.parse(sessionStorage.getItem('userInfo')).access_token) // 通过append向form对象添加数据
        axios({
          method: 'post',
          // url: 'http://localhost/xiehoushufang_hh/public/index.php/Upload2/upload',
          url: 'https://www.lingk.club/xiehoushufang_hh/public/index.php/Upload2/upload',
          // url: 'http://106.53.245.88/ziyuan/public/index.php/Upload/uploadImage',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(data => {
          // console.log(imgFile, form)
          // console.log(data)
          if (data.code !== 0) {
            this.$message({
              type: 'success',
              message: '上传成功'
            })
          }
          // console.log(data.data)
          this.loading = false
          this.path = data.data
          this.$emit('input', this.path)
        }).catch((res) => {
          console.log(res)
          this.loading = false
        })
      } else {
        this.path = ''
        this.$emit('input', this.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .el-button {
    background-color: #33CABB;
    border-color: #33CABB;
  }
    span {
      text-align: center;
      width: 150px;
      img {
        height: 30px;
        width: 30px;
      }
    }
  .file-box {
    display: flex;
    justify-content: space-between;

    .add-btn {
      padding: 10px 10px;
    }

    span:nth-child(2) {
      flex: 1;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      padding: 0 5px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        color: #409EFF;
      }
    }

    .delete-btn {
      padding: 0 10px;
    }
  }
}
</style>

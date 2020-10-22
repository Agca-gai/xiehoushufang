<template>
  <div class="i-search">
    <el-form ref="form" :inline="true" :model="model">
      <slot></slot>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'i-search',
  props: {
    // model接受一个对象
    model: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    search () {
      // formData: {}
      this.$emit('search')
    },
    reset () {
      this.$emit('reset')
      this.$refs.form.resetFields() // 一定要在input那里添加prop才可以重置还有上面的ref
    }
  }
}
</script>
<style lang="scss" scoped>
.i-search{
  padding: "10px";
}
.el-form {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  /deep/ .el-form-item {
          margin-bottom: 0;
            .input-grounp {
              display: flex;
              align-items: center;
              .el-input-group__prepend {
                .el-select {
                  .el-input {
                    width: 100px;
                    .el-input__inner {
                    width: 100px;
                    padding: 0 10px;
                    background-color: #fff;
                    border-top: 1px solid #dfe1e8;
                    border-bottom: 1px solid #dfe1e8;
                    }
                  }
                }
              }
          .el-input {
            width: 200px;
            .el-input__inner {
              width: 200px;
              border-radius: 0px;
            }
          }
        }
      .el-form-item__label {
        width: 80px;
      // .el-form-item__content {
      // }
    }
  }
}
</style>

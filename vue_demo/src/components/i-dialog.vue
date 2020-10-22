<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" :before-close="dialogBeforeClose" @close="dialogClose" width="50%">
        <!-- visible代表可见的,当vue中dialogVisible变量的值为true时,el-dialog修饰的内容(会话窗口或者文本信息)就会在页面中展示出来,反之就会隐藏不显示 -->
        <!-- sync语法糖会扩展为
        <el-dialog :visible="visible" @update:visible="val => visible = val"></el-dialog> -->
        <!-- 解释： https://www.cnblogs.com/weiziyu/p/12012498.html -->

        <!-- 从父组件插进来中间的表单 -->
        <slot></slot>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'i-dialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    dialogClose () {
      this.visible = false // 传出去的时候最好将visible变成false
      this.$emit('input', this.visible) // 最好传的不是死参，上面的data的visible
    },
    dialogConfirm () {
      this.$emit('dialog-confirm') // 点击确定按钮
    },
    dialogCancel () {
      this.$emit('dialog-cancel') // 点击取消按钮
    },
    dialogBeforeClose () {
      this.$emit('dialog-before-close') // 点击close清空表单
      this.visible = false // 传出去的时候最好将visible变成false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.visible = value
      },
      deep: true // 为了解决嵌套层级过深，watch监听不到的情况
    }
  }
}
</script>

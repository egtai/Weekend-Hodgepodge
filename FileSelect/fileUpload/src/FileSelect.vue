<template>
  <label class="file-select">
    <div class="select-button">
      <!-- 如果选择文件则，显示文件名 -->
      <span v-if="value"> 选中文件：{{value.name}}</span>
      <span v-else>选择文件</span>
      <input type="file" @change="handleFileChange"/>
    </div>
  </label>
</template>

<script>
export default {
  props:{
    value:File
  },
  methods:{
    handleFileChange(e){
      this.$emit("input",e.target.files[0])
    }
  }
}
</script>
  
<style scoped>
   .select-button{
    padding:1rem;
    color:#fff;
    border-radius: .3rem;
    background-color: #2EA169;
    text-align: center;
    font-weight: bold;
  }
  /* 隐藏原始上传文件按钮 */
  input{
    display:none
  }
</style>

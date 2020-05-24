<template>
  <div class="hello">
    <canvas ref="canvas"></canvas>

    <input ref="input" type="file" @change="fileChange">
<!-- 
    <Upload
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload> -->
  </div>
    
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  },
  methods: {
    handleSuccess() {

    },
    fileChange() {
      const file = this.$refs.input.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        const image = new Image()
        image.onload = () => {
          // 对 image 进行的操作
          this.drawToCanvas(image);
        }
        image.src = fileReader.result
      }



    },
    drawToCanvas(img){
      const canvas = this.$refs.canvas;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img,0,0,300,400);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="ps-container">
    <div class="tools">
      <input class="input" ref="input" type="file" @change="fileChange" style="width: 150px">
      <Button class="tool" type="primary" @click="crop">裁剪</Button>
      <Button class="tool" type="primary" @click="insertText">插入文字</Button>
      <Button class="tool" type="primary" @click="insertImage">插入图片</Button>
      <Button class="tool" type="primary" @click="insertImage">智能抠图</Button>
      <Button class="tool" type="primary" @click="insertImage">导出</Button>
    </div>

    <main class="main" ref="main">
      <canvas class="canvas" ref="canvas" :width="canvas.width" :height="canvas.height"></canvas>
      <div class="previewBox"></div>
      <div class="previewBoxRound"></div>
    </main>


    <div class="extra" style="width: 100px"></div>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import MCanvas from './MCanvas';

export default {
  name: 'HelloWorld',
  props: {
  },
  data() {
    return {
      mCanvas: {},
      canvas: {
        width: 1000,
        height: 1000,
      },
      imgUrl: ''
    }
  },
  mounted() {
    this.canvas.width = this.$refs.main.clientWidth * 2;
    this.canvas.height = this.$refs.main.clientHeight * 2;

    this.mCanvas = new MCanvas({ canvas: this.$refs.canvas});
  },
  methods: {
    handleSuccess() {

    },
    crop() {
      new Cropper(this.$refs.canvas, {
        // aspectRatio: 16 / 16, 
        dragMode:'move',
        minContainerWidth:100,   //容器最小的宽度
        minContainerHeight:500,  //容器最小的高度
        preview:[ //设置我们需要添加实时预览的地方
          document.querySelector('.previewBox'),
          document.querySelector('.previewBoxRound')
        ]
        
      })
    },

    insertText() {
      this.mCanvas.add({
        type: 'text',
        text: '啦啦啦',
        x: 0,
        y: 0
      })
    },
    insertImage() {

    },


    fileChange() {
      const file = this.$refs.input.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        const image = new Image()
        image.onload = () => {
          // 对 image 进行的操作
          this.mCanvas.add({
            type: 'img',
            image,
            x: 0,
            y: 0,
            w: image.width,
            h: image.height
          });


        }
        image.src = fileReader.result
        // this.imgUrl = fileReader.result;
      }



    },
    drawToCanvas(img){
      let { width, height }  = img;
      const canvas = this.$refs.canvas;
      var ctx = canvas.getContext('2d');
      const l = (this.canvas.width - width) / 2;
      const t = (this.canvas.height - height) / 2;
      ctx.drawImage(img, l, t, width / 2, height / 2);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ps-container {
  display: flex;
  .tools {
    min-width: 100px;
    max-width: 250px;
    background: #fefefe;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    .tool {
      margin-top: 20px;
    }
  }
  .main {
    flex: 1;
    // background-color:rgb(37, 37, 37);
    height: 50vh;
    position: relative;
    border: 1px solid #dcdee2;
    border-color: #e8eaec;
    box-sizing: border-box;
    .input {
      position: absolute;
    }
    .canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .extra {
    min-width: 100px;
    max-width: 200px;
    background: #fefefe;
  }

  .previewBox,.previewBoxRound{
    box-shadow: 0 0 5px #adadad;
    width: 100px;
    height: 100px;
    margin-top: 30px;
    overflow: hidden;       /*这个超出设置为隐藏很重要，否则就会整个显示出来了*/
}
.previewBoxRound{
    border-radius: 50%;     /*设置为圆形*/     
}
}
</style>

<template>
  <v-app>
    <NavBar class="nav-bar" />
    <div class="main-area d-flex justify-space-between">
      <ToolBox class="tool-box scroll-sect" />
      <Canvas class="canvas-area scroll-sect" />
      <OptionBox class="option-box scroll-sect" />
    </div>
    <Footer class="footer" />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import Canvas from "./components/Canvas";
import ToolBox from "./components/ToolBox";
import OptionBox from "./components/OptionBox";
import Footer from "./components/Footer";

export default {
  name: 'App',

  components: {
    NavBar,
    Canvas,
    ToolBox,
    OptionBox,
    Footer
  }
};
</script>

<style scoped>
  .nav-bar, .footer{
    width: 100%;
    height: 7vh;
    background-color: #325D9E;
  }

  .main-area {
    width: 100%;
    height: 86vh;
  }

  .tool-box {
    width: 80px;
    height: 100%;
    background-color: #1C2F50;
    overflow: auto;
  }

  .canvas-area {
    width: 100%;
    height: 100%;
    background-color: rgb(228, 228, 228);
    overflow: auto;
  }

  .option-box {
    width: 240px;
    height: 100%;
    background-color: #1C2F50;
    overflow: auto;
  }

  .scroll-sect::-webkit-scrollbar {
    width: 10px; 
    height: 10px;
  }

  .scroll-sect::-webkit-scrollbar-track {
    background: #37474F;
  }

  .scroll-sect::-webkit-scrollbar-corner {
    background: #37474F; 
  }

  .scroll-sect::-webkit-scrollbar-thumb {
    background: #5d7dac;
  }

  .scroll-sect::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
</style>
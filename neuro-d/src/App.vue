<template>
  <v-app>
    <NavBar class="nav-bar" />
    <div class="main-area d-flex">
      <ToolBox class="tool-box" />
      <Canvas class="canvas" />
      <OptionBox class="option-box" />
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
  },

  data: () => ({
  }),
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
  }

  .canvas {
    width: 100%;
    height: 100%;
    background-color: rgb(228, 228, 228);
  }

  .option-box {
    width: 240px;
    height: 100%;
    background-color: #1C2F50;
  }
</style>
<template>
  <v-app>
    <NavBar class="nav-bar" />
    <div class="main-area">
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
    display: flex;
  }

  .tool-box {
    width: 6vw;
    height: 100%;
    background-color: #1C2F50;
  }

  .canvas {
    width: 84vw;
    height: 100%;
  }

  .option-box {
    width: 10vw;
    height: 100%;
    background-color: #1C2F50;
  }
</style>
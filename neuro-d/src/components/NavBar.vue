<template>
  <div class="nav-content">
    <img class="logo" src="../assets/logo.png" />
    <div>
      <v-btn @click="clickImportSVG">IMPORT</v-btn>
      <input v-show="false" ref="inputUpload" type="file" accept=".svg" @change="importSVG">
      <v-btn class="ml-2" elevation="2">
        EXPORT
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "NavBar",
  data() {
    return {
      svgText: null
    }
  },
  computed: {
    ...mapState(["svgObjs"])
  },
  methods: {
    ...mapActions(["importSVG"]),
    clickImportSVG() {
      if (this.svgObjs.length) {
        if (!confirm("Do you want to clear the Drawings?")) {
          return;
        }
      }
      this.$refs.inputUpload.click();
    },
    importSVG(event) {
      const newFile = event.target.files[0];
      const reader = new FileReader()
      let result
      reader.onload = function() {
        result = reader.result;
      }
      reader.readAsText(newFile);
      setTimeout(() => {
        let canvas = document.querySelector(".inner-canvas");
        canvas.innerHTML = result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(result, "image/svg+xml");
        canvas.style.width = doc.children[0].width.animVal.value;
        canvas.style.height = doc.children[0].height.animVal.value;
      }, 500);
    }
  }
}
</script>

<style scoped>
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0.5vw;
  }

  .logo {
    height: 70%;
  }

</style>
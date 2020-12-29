<template>
  <div class="d-flex justify-space-between align-center px-2">
    <a class="d-flex align-center" href="/">
      <img class="logo" src="../assets/logo.png" />
    </a>
    <div>
      <v-btn @click="clickImportSVG">
        IMPORT
        <input
          v-show="false"
          ref="inputUpload"
          type="file"
          accept=".svg"
          @change="importSVG"
        >
      </v-btn>
      <v-btn
        class="ml-2"
        elevation="2"
        @click="exportSVG"
      >
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
    ...mapActions(["importSVG", "changeCanvasColor"]),
    clickImportSVG() {
      if (this.svgObjs.length) {
        if (!confirm("Do you want to clear the Drawings?")) {
          return;
        }
      }
      this.$refs.inputUpload.click();
    },
    componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },
    rgbToHex(r, g, b) {
      return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
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
        const parser = new DOMParser();
        const doc = parser.parseFromString(result, "image/svg+xml");
        const svgElement = doc.children[0];
        while (svgElement.childElementCount) {
          canvas.appendChild(svgElement.children[0]);
        }
        if (svgElement.style.width) {
          canvas.style.width = svgElement.style.width;
          canvas.style.height = svgElement.style.height;
        } else {
          canvas.style.width = svgElement.width.animVal.value;
          canvas.style.height = svgElement.height.animVal.value;
        }
        if (svgElement.style.backgroundColor) {
          const color = svgElement.style.backgroundColor.replace('(', '').replace(')','').split(',');
          console.log(color)
          let rgba = {
            g: Number(color[1]),
            b: Number(color[2])
          }
          if (color.length > 3) {
            rgba.r = Number(color[0].slice(4, ));
            rgba.a = Number(color[3]);
          } else {
            rgba.r = Number(color[0].slice(3, ));
          }
          let hexa = '#';
          hexa += this.rgbToHex(rgba.r, rgba.g, rgba.b);
          if (rgba.a) {
            hexa += this.componentToHex(Math.round(rgba.a * 255));
          }
          console.log(hexa);
          this.changeCanvasColor(hexa);
        }
      }, 500);
    },
    exportSVG() {
      let canvas = document.querySelector(".inner-canvas");
      let dl = document.createElement("a");
      let serialSvg = (new XMLSerializer).serializeToString(canvas);
      let drawing = "data:image/svg+xml," + encodeURIComponent(serialSvg);
      document.body.appendChild(dl);
      dl.setAttribute("href", drawing)
      dl.setAttribute("download", "freehand-svg-drawing.svg");
      dl.click();   
    }
  }
}
</script>

<style scoped>
  .logo {
    height: 40px;
  }
</style>
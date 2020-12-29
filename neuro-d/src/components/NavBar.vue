<template>
  <div class="d-flex justify-space-between align-center px-2">
    <a class="d-flex align-center" href="/">
      <img class="logo" src="../assets/logo.png" alt="NEURO-D logo"/>
    </a>
    <div>
      <v-btn class="button" @click="clickImportSVG">
        IMPORT
      </v-btn>
      <input
        v-show="false"
        ref="inputUpload"
        type="file"
        accept=".svg"
        @change="importSVG"
      >
      <v-btn
        class="button ml-2"
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
    ...mapActions([
      "selectTool",
      "changeCanvasColor",
      "changeCanvasWidth",
      "changeCanvasHeight",
      "clearSvgObjs"
    ]),
    clickImportSVG() {
      const canvas = document.querySelector(".inner-canvas");
      if (canvas.children.length) {
        if (!confirm("Do you want to clear the Drawings?")) {
          return;
        }
      }
      this.$refs.inputUpload.click();
    },
    componentToHex(c) {
      let hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },
    rgbToHex(r, g, b) {
      return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },
    importSVG(event) {
      return new Promise((resolve) => {
        // read SVG file
        const newFile = event.target.files[0];
        const reader = new FileReader()
        reader.onload = function() {
          resolve(reader.result);
        }
        reader.readAsText(newFile);
      })
        .then(res => {
          // Clear previous canvas
          let canvas = document.querySelector(".inner-canvas");
          while (canvas.firstChild) {
            canvas.removeChild(canvas.lastChild);
          }
          this.clearSvgObjs();

          // Add new SVG file elements into canvas
          const parser = new DOMParser();
          const doc = parser.parseFromString(res, "image/svg+xml");
          const svgElement = doc.children[0];
          while (svgElement.childElementCount) {
            canvas.appendChild(svgElement.children[0]);
          }

          // Update canvasStyle settings
          if (svgElement.style.width) {
            this.changeCanvasWidth(Number(svgElement.style.width.slice(0, -2)));
            this.changeCanvasHeight(Number(svgElement.style.height.slice(0, -2)));
          } else if (svgElement.width) {
            this.changeCanvasWidth(svgElement.width.animVal.value);
            this.changeCanvasHeight(svgElement.height.animVal.value);
          }
          if (svgElement.style.backgroundColor) {
            const color = svgElement.style.backgroundColor.replace('(', '').replace(')','').split(',');
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
            this.changeCanvasColor(hexa);
          }
        })
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
  .logo, .button {
    height: 5vh;
  }
</style>
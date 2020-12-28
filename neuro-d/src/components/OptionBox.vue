<template>
  <div class="option-content">
    <div class="canvas-color mb-5">
      <h3>Canvas Color</h3>
      <div>
        <v-menu 
          offset-y 
          :close-on-content-click="false"
        >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            :color="canvasColor.hexa"
          >
          </v-btn>
          <span class="ml-2">{{ canvasColor.hexa }}</span>
        </template>
        <v-color-picker
          class="mx-auto"
          show-swatches
          :value="canvasColor"
          @update:color="changeCanvasColor"
        />
        </v-menu>
      </div>
    </div>

    <div class="canvas-zoom mb-5">
      <h3>Canvas Zoom</h3>
      <div>
        <v-slider
          :value="canvasZoom"
          :min="1"
          :max="500"
          class="align-center"
          dark
          @input="changeCanvasZoom"
        >
          <template v-slot:append>
            <v-text-field
              :value="canvasZoom"
              :min="1"
              :max="500"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
              @input="changeCanvasZoom"
            ></v-text-field>
          </template>
        </v-slider>
      </div>
    </div>

    <div class="fill-color mb-5">
      <h3>Fill Color</h3>
      <div>
        <v-menu 
          offset-y 
          :close-on-content-click="false"
        >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            :color="fillColor.hexa"
          >
          </v-btn>
          <span class="ml-2">{{ fillColor.hexa }}</span>
        </template>
        <v-color-picker
          class="mx-auto"
          show-swatches
          :value="fillColor"
          @update:color="changeFillColor"
        />
        </v-menu>
      </div>
    </div>

    <div class="stroke-color mb-5">
      <h3>Stroke Color</h3>
      <div>
        <v-menu 
          offset-y 
          :close-on-content-click="false"
        >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            :color="strokeColor.hexa"
          >
          </v-btn>
          <span class="ml-2">{{ strokeColor.hexa }}</span>
        </template>
        <v-color-picker
          class="mx-auto"
          show-swatches
          :value="strokeColor"
          @update:color="changeStrokeColor"
        />
        </v-menu>
      </div>
    </div>

    <div class="stroke-width">
      <h3>Stroke Width</h3>
      <div>
        <v-slider
          :value="strokeWidth"
          :max="50"
          class="align-center"
          dark
          @input="changeStrokeWidth"
        >
          <template v-slot:append>
            <v-text-field
              :value="strokeWidth"
              :max="50"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
              @input="changeStrokeWidth"
            ></v-text-field>
          </template>
        </v-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "OptionBox",
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      "selectedTool",
      "canvasColor",
      "canvasZoom",
      "fillColor",
      "strokeColor",
      "strokeWidth"
    ])
  },
  methods: {
    ...mapActions([
      "changeCanvasColor",
      "changeCanvasZoom",
      "changeFillColor",
      "changeStrokeColor",
      "changeStrokeWidth"
      ])
  }
}
</script>

<style scoped>
  .option-content {
    padding: 10px;
    color: #FFFFFF;
  }
</style>
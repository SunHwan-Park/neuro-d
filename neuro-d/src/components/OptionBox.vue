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

    <div class="canvas-size">
      <h3>Canvas Size</h3>
      <v-text-field
        :value="canvasWidth"
        :min="1"
        :max="1920"
        dark
        prefix="W"
        suffix="px"
        class="mt-0 pt-0"
        type="number"
        style="width: 90%"
        @input="changeCanvasWidth"
      ></v-text-field>
      <v-text-field
        :value="canvasHeight"
        :min="1"
        :max="1080"
        dark
        prefix="H"
        suffix="px"
        class="mt-0 pt-0"
        type="number"
        style="width: 90%"
        @input="changeCanvasHeight"
      ></v-text-field>
    </div>

    <div class="canvas-zoom">
      <h3>Canvas Zoom</h3>
      <div>
        <v-slider
          :value="canvasZoom"
          :min="1"
          :max="500"
          dark
          class="align-center"
          @input="changeCanvasZoom"
        >
          <template v-slot:append>
            <v-text-field
              :value="canvasZoom"
              :min="1"
              :max="500"
              suffix="%"
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
          dark
          class="align-center"
          @input="changeStrokeWidth"
        >
          <template v-slot:append>
            <v-text-field
              :value="strokeWidth"
              :max="50"
              suffix="px"
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

  computed: {
    ...mapState([
      "selectedTool",
      "canvasColor",
      "canvasWidth",
      "canvasHeight",
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
      "changeCanvasWidth",
      "changeCanvasHeight",
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
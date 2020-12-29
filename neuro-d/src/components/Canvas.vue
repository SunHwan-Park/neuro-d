<template>
  <div class="outer-canvas text-center">
    <svg
      class="inner-canvas"
      :style="{ 
        'background-color': canvasColor.hexa ? canvasColor.hexa : canvasColor,
        'width': canvasWidth,
        'height': canvasHeight,
        'cursor': 'pointer'
      }"
      @mousedown="startDraw"
      @mousemove="moveDraw"
      @mouseup="stopDraw"
      @mouseleave="leaveCanvas"
    >
      <template v-if="tempLine">
        <line
          :x1="tempLine.x1"
          :y1="tempLine.y1"
          :x2="tempLine.x2"
          :y2="tempLine.y2"
          :style="{
            'stroke': tempLine.strokeColor,
            'stroke-width': tempLine.strokeWidth,
            'stroke-dasharray': tempLine.strokeDashArray
          }"
        />
      </template>

      <template v-for="line in polygonLines">
        <line
          v-if="line.tool === 'polygonLine'"
          :key="line.id"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :style="{
            'stroke': line.strokeColor,
            'stroke-width': line.strokeWidth,
          }"
        />
      </template>

      <template v-for="svgObj in svgObjs">
        <polyline
          v-if="svgObj.tool === 'pencil'"
          :key="svgObj.id"
          :points="svgObj.points"
          :style="{
            'fill': 'none',
            'stroke': svgObj.strokeColor,
            'stroke-width': svgObj.strokeWidth
          }"
        />

        <line
          v-if="svgObj.tool === 'line'"
          :key="svgObj.id"
          :x1="svgObj.x1"
          :y1="svgObj.y1"
          :x2="svgObj.x2"
          :y2="svgObj.y2"
          :style="{
            'stroke': svgObj.strokeColor,
            'stroke-width': svgObj.strokeWidth,
            'transform': `rotate(${svgObj.rotate}deg)`
          }"
        />

        <path
          v-if="svgObj.tool === 'curved_line'"
          :key="svgObj.id"
          :d="svgObj.d"
          :style="{
            'fill': 'none',
            'stroke': svgObj.strokeColor,
            'stroke-width': svgObj.strokeWidth,
            'transform': `rotate(${svgObj.rotate}deg)`
          }"
        />

        <circle
          v-if="svgObj.tool === 'circle'"
          :key="svgObj.id"
          :cx="svgObj.x"
          :cy="svgObj.y"
          :r="svgObj.radius"
          :style="{
            'fill': svgObj.fillColor,
            'stroke': svgObj.strokeColor,
            'stroke-width': svgObj.strokeWidth
          }"
        />

        <rect 
          v-if="svgObj.tool === 'rectangle'"
          :key="svgObj.id"
          :x="svgObj.x"
          :y="svgObj.y"
          :width="svgObj.width"
          :height="svgObj.height"
          :rx="svgObj.radius"
          :ry="svgObj.radius"
          :style="{
            'fill': svgObj.fillColor,
            'stroke': svgObj.strokeColor,
            'stroke-width': svgObj.strokeWidth,
            'transform': `rotate(${svgObj.rotate}deg)`
          }"
        />

        <polygon
          v-if="svgObj.tool === 'polygon'"
          :key="svgObj.id"
          :points="svgObj.points"
          :style="{
            'fill': svgObj.fillColor,
            'stroke': svgObj.strokeColor,
            'stroke-width': svgObj.strokeWidth
          }"
        />

        <polyline
          v-if="svgObj.tool === 'eraser'"
          :key="svgObj.id"
          :points="svgObj.points"
          :style="{
            'fill': 'none',
            'stroke': svgObj.strokeColor,
            'stroke-width': svgObj.strokeWidth
          }"
        />

      </template>
    </svg>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "Canvas",
  computed: {
    ...mapState([
      "canvasColor",
      "canvasWidth",
      "canvasHeight",
      "selectedTool",
      "svgObjs",
      "tempLine",
      "polygonLines"
    ])
  },
  methods: {
    ...mapActions([
      "startDraw",
      "moveDraw",
      "stopDraw",
      "leaveCanvas"
    ])
  },
  mounted() {
    window.addEventListener('beforeunload', (event) => {
      const canvas = document.querySelector(".inner-canvas");
      if (canvas.children.length) {
        event.preventDefault();
        event.returnValue = '';
      }
    });
  }
}
</script>

<style scoped>
  .inner-canvas {
    transform-origin: top left;
  }
  svg *{
      transform-box: fill-box;
      transform-origin: center;
  }
  svg text{
    user-select: none;
  }
</style>
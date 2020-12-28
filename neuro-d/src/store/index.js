import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedTool: "hand",
    canvasColor: {
      "alpha": 1,
      "hex": "#FFFFFF",
      "hexa": "#FFFFFFFF",
      "hsla": { "h": 0, "s": 0, "l": 1, "a": 1 },
      "hsva": { "h": 0, "s": 0, "v": 1, "a": 1 },
      "hue": 0,
      "rgba": { "r": 255, "g": 255, "b": 255, "a": 1 }
    },
    canvasZoom: 100,
    fillColor: {
      "alpha": 1,
      "hex": "#000000",
      "hexa": "#000000FF",
      "hsla": { "h": 0, "s": 0, "l": 0, "a": 1 },
      "hsva": { "h": 0, "s": 0, "v": 0, "a": 1 },
      "hue": 0,
      "rgba": { "r": 0, "g": 0, "b": 0, "a": 1 }
    },
    strokeColor: {
      "alpha": 1,
      "hex": "#000000",
      "hexa": "#000000FF",
      "hsla": { "h": 0, "s": 0, "l": 0, "a": 1 },
      "hsva": { "h": 0, "s": 0, "v": 0, "a": 1 },
      "hue": 0,
      "rgba": { "r": 0, "g": 0, "b": 0, "a": 1 }
    },
    strokeWidth: 100
  },
  mutations: {
    SET_SELECTED_TOOL(state, tool) {
      state.selectedTool = tool;
    },
    SET_CANVAS_COLOR(state, color) {
      state.canvasColor = color;
    },
    SET_CANVAS_ZOOM(state, zoom) {
      state.canvasZoom = zoom;
    },
    SET_FILL_COLOR(state, color) {
      state.fillColor = color;
    },
    SET_STROKE_COLOR(state, color) {
      state.strokeColor = color;
    },
    SET_STROKE_WIDTH(state, width) {
      state.strokeWidth = width;
    }
  },
  actions: {
    selectTool({ commit }, tool) {
      commit("SET_SELECTED_TOOL", tool);
    },
    changeCanvasColor({ commit }, color) {
      commit("SET_CANVAS_COLOR", color);
    },
    changeCanvasZoom({ commit }, zoom) {
      commit("SET_CANVAS_ZOOM", zoom);
    },
    changeFillColor({ commit }, color) {
      commit("SET_FILL_COLOR", color);
    },
    changeStrokeColor({ commit }, color) {
      commit("SET_STROKE_COLOR", color);
    },
    changeStrokeWidth({ commit }, width) {
      commit("SET_STROKE_WIDTH", width);
    }
  },
  modules: {
  }
})

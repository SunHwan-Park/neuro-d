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
    strokeWidth: 5,

    svgObjs: [],
    polygonLines: [],
    tempLine: null,
    onCurvedLine: false,
    onPolygon: false,
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
    },
    ADD_SVGOBJS(state, svgObj) {
      state.svgObjs.push(svgObj);
    },
    SET_TEMP_LINE(state, line) {
      state.tempLine = line;
    },
    SET_ON_CURVED_LINE(state, value) {
      state.onCurvedLine = value;
    },
    ADD_POLYGON_LINES(state, line) {
      state.polygonLines.push(line);
    },
    SET_ON_POLYGON(state, value) {
      state.onPolygon = value;
    },
    CLEAR_POLYGON_LINES(state) {
      state.polygonLines = [];
    }
  },
  actions: {
    selectTool({ commit }, tool) {
      commit("SET_SELECTED_TOOL", tool);
    },
    changeCanvasColor({ state, commit }, color) {
      commit("SET_CANVAS_COLOR", color);
      state.svgObjs.forEach(svgObj => {
        if (svgObj.tool === 'eraser') {
          svgObj.strokeColor = color.hexa;
        }
      });
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
    },

    startDraw({ state, dispatch }, event) {
      const tool = state.selectedTool;
      if (tool === "pencil") {
        dispatch("startPencil", event);
      } else if (tool === "line") {
        dispatch("startLine", event);
      } else if (tool === "curved_line" && !state.onCurvedLine) {
        dispatch("startCurvedLine", event);
      } else if (tool === "circle") {
        dispatch("startCircle", event);
      } else if (tool === "rectangle") {
        dispatch("startRectangle", event);
      } else if (tool === "polygon") {
        if (!state.onPolygon) {
          dispatch("startPolygon", event);
        }
      }else if (tool === "eraser") {
        dispatch("startEraser", event);
      }
    },
    moveDraw({ state, dispatch }, event) {
      const tool = state.selectedTool;
      if (tool === "pencil") {
        dispatch("drawPencil", event);
      } else if (tool === "line") {
        dispatch("drawLine", event);
      } else if (tool === "curved_line") {
        if (state.onCurvedLine) {
          dispatch("drawCurvedLine", event);
        } else {
          dispatch("drawTempLine", event);
        }
      } else if (tool === "circle") {
        dispatch("drawCircle", event);
      } else if (tool === "rectangle") {
        dispatch("drawRectangle", event);
      } else if (tool === "polygon") {
        if (!state.onPolygon) {
          dispatch("drawPolygonLine", event);
        }
      } else if (tool === "eraser") {
        dispatch("drawEraser", event);
      }
    },
    stopDraw({ state, commit, dispatch }, event) {
      const tool = state.selectedTool;
      if (tool === "curved_line") {
        if (state.onCurvedLine) {
          commit("SET_TEMP_LINE", null);
        }
        commit("SET_ON_CURVED_LINE", !state.onCurvedLine);
      } else if (tool === "polygon") {
        if (!state.onPolygon) {
          commit("SET_ON_POLYGON", true);
        } else {
          dispatch("drawPolygonLine", event);
        }
      }
    },
    startPencil({ state, commit }, event) {
      const svgObj = {
        id: state.svgObjs.length + 1,
        tool: "pencil",
        points: `${event.layerX},${event.layerY} `,
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth != 0 ? state.strokeWidth : 1
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawPencil({ state }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        lastObj.points += `${event.layerX},${event.layerY} `;
      }
    },
    startLine({ state, commit }, event) {
      const svgObj = {
        id: state.svgObjs.length + 1,
        tool: "line",
        x1: event.layerX,
        y1: event.layerY,
        x2: event.layerX,
        y2: event.layerY,
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth != 0 ? state.strokeWidth : 1,
        rotate: 0
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawLine({ state }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        lastObj.x2 = event.layerX;
        lastObj.y2 = event.layerY;
      }
    },
    startCurvedLine({ state, commit }, event) {
      const svgObj = {
        id: state.svgObjs.length + 1,
        tool: "curved_line",
        d: '',
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth != 0 ? state.strokeWidth : 1,
        rotate: 0
      }
      commit("ADD_SVGOBJS", svgObj);
      const tempLine = {
        tool: "line",
        x1: event.layerX,
        y1: event.layerY,
        x2: event.layerX,
        y2: event.layerY,
        strokeColor: '#325D9E',
        strokeWidth: 5,
        strokeDashArray: 5
      }
      commit("SET_TEMP_LINE", tempLine);
    },
    drawTempLine({ state }, event) {
      if (event.buttons == 1) {
        let tempLine = state.tempLine;
        tempLine.x2 = event.layerX;
        tempLine.y2 = event.layerY;
      }
    },
    drawCurvedLine({ state }, event) {
      if (event.buttons == 0) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1]; 
        lastObj.d = `M ${state.tempLine.x1} ${state.tempLine.y1} Q ${event.layerX} ${event.layerY} ${state.tempLine.x2} ${state.tempLine.y2}`
      }
    },
    startCircle({ state, commit }, event) {
      const svgObj = {
        id: state.svgObjs.length + 1,
        tool: "circle",
        x: event.layerX,
        y: event.layerY,
        radius: 0,
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth,
        fillColor: state.fillColor.hexa
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawCircle({ state }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        let w = Math.abs(lastObj.x - event.layerX);
        let h = Math.abs(lastObj.y - event.layerY);
        lastObj.radius = Math.sqrt((w**2) + (h**2));
      }
    },
    startRectangle({ state, commit }, event) {
      const svgObj = {
        id: state.svgObjs.length + 1,
        tool: 'rectangle',
        x: event.layerX,
        y: event.layerY,
        width: 0,
        height: 0,
        radius: 0,
        rotate: 0,
        fillColor: state.fillColor.hexa,
        strokeWidth: state.strokeWidth,
        strokeColor: state.strokeColor.hexa
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawRectangle({ state }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        if (event.layerX - lastObj.x > 0 && event.layerY - lastObj.y > 0) {
          lastObj.width = event.layerX - lastObj.x;
          lastObj.height = event.layerY - lastObj.y;
        }
      }
    },
    startPolygon({ state, commit }, event) {
      const svgObj = {
        id: state.svgObjs.length + 1,
        tool: "polygon",
        points: "",
        fillColor: state.fillColor.hexa,
        strokeWidth: state.strokeWidth,
        strokeColor: state.strokeColor.hexa
      }
      commit("ADD_SVGOBJS", svgObj);
      const polygonLine = {
        tool: 'polygonLine',
        x1: event.layerX,
        y1: event.layerY,
        x2: event.layerX,
        y2: event.layerY,
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth
      }
      commit("ADD_POLYGON_LINES", polygonLine);
    },
    drawPolygonLine({ state, commit }, event) {
      let firstLine = state.polygonLines[0];
      let lastLine = state.polygonLines[state.polygonLines.length - 1];
      if (state.onPolygon) {
        if (Math.abs(firstLine.x1 - event.layerX) < 5 && Math.abs(firstLine.y1 - event.layerY) < 5 ) {
          let points = `${firstLine.x1},${firstLine.y1} `;
          state.polygonLines.forEach(line => {
            points += `${line.x2},${line.y2} `;
          });
          let lastObj = state.svgObjs[state.svgObjs.length - 1];
          lastObj.points = points;
          commit("SET_ON_POLYGON", false);
          commit("CLEAR_POLYGON_LINES");
          return;
        }
        const polygonLine = {
          id: state.polygonLines.length + 1,
          tool: "polygonLine",
          x1: lastLine.x2,
          y1: lastLine.y2,
          x2: event.layerX,
          y2: event.layerY,
          strokeColor: state.strokeColor.hexa,
          strokeWidth: state.strokeWidth
        }
        commit("ADD_POLYGON_LINES", polygonLine);
      } else {
        if (event.buttons === 1) {
          lastLine.x2 = event.layerX;
          lastLine.y2 = event.layerY;
        }
      }   
    },
    startEraser({ state, commit }, event) {
      const svgObj = {
        id: state.svgObjs.length + 1,
        tool: "eraser",
        points: `${event.layerX},${event.layerY} `,
        strokeColor: state.canvasColor.hexa,
        strokeWidth: state.strokeWidth != 0 ? state.strokeWidth : 1
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawEraser({ state }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        lastObj.points += `${event.layerX},${event.layerY} `;
      }
    },
  },
  modules: {
  }
})
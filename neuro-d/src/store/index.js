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
    canvasWidth: 800,
    canvasHeight: 600,
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
    undoObjs: [],
    polygonLines: [],
    tempLine: null,
    onCurvedLine: false,
    onPolygon: false,
    onHand: false
  },
  getters: {
    zoomRatio(state) {
      return 100/state.canvasZoom;
    }
  },
  mutations: {
    SET_SELECTED_TOOL(state, tool) {
      state.selectedTool = tool;
    },
    SET_CANVAS_COLOR(state, color) {
      state.canvasColor = color;
    },
    SET_CANVAS_WIDTH(state, width) {
      state.canvasWidth = width;
    },
    SET_CANVAS_HEIGHT(state, height) {
      state.canvasHeight = height;
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
      state.undoObjs = [];
    },
    CLEAR_SVGOBJS(state) {
      state.svgObjs = [];
      state.undoObjs = [];
    },
    UNDO_SVGOBJS(state) {
      state.undoObjs.push(state.svgObjs.pop());
    },
    REDO_SVGOBJS(state) {
      state.svgObjs.push(state.undoObjs.pop());
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
    },
    SET_ON_HAND(state, value) {
      state.onHand = value;
    }
  },
  actions: {
    selectTool({ state, commit }, tool) {
      if (tool === "undo") {
        if (state.svgObjs.length) {
          commit("UNDO_SVGOBJS");
        } else {
          alert("Can't Undo");
        }
      } else if (tool === "redo") {
        if (state.undoObjs.length) {
          commit("REDO_SVGOBJS");
        } else {
          alert("Can't Redo");
        }
      } else {
        commit("SET_SELECTED_TOOL", tool);
      }
    },
    changeCanvasColor({ state, commit }, color) {
      commit("SET_CANVAS_COLOR", color);
      state.svgObjs.forEach(svgObj => {
        if (svgObj.tool === 'eraser') {
          svgObj.strokeColor = color.hexa;
        }
      });
    },
    changeCanvasWidth({ commit }, width) {
      commit("SET_CANVAS_WIDTH", width);
    },
    changeCanvasHeight({ commit }, height) {
      commit("SET_CANVAS_HEIGHT", height);
    },
    changeCanvasZoom({ commit }, zoom) {
      const canvas = document.querySelector('.inner-canvas');
      canvas.setAttribute("transform", `scale(${zoom/100})`);
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
      if (tool === "hand") {
        dispatch("startHand", event);
      } else if (tool === "pencil") {
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
      if (tool === "hand") {
        dispatch("drawHand", event);
      } else if (tool === "pencil") {
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
      if (tool === "hand") {
        commit("SET_ON_HAND", false);
      } else if (tool === "curved_line") {
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
    leaveCanvas({ state, commit }) {
      const tool = state.selectedTool;
      if (tool === "hand" && state.onHand) {
        commit("SET_ON_HAND", false);
      } else if (tool === "polygon" && state.onPolygon) {
        commit("SET_ON_POLYGON", false);
        commit("CLEAR_POLYGON_LINES");
      } else if (tool === "curved_line" && state.onCurvedLine) {
        commit("SET_TEMP_LINE", null);
        commit("SET_ON_CURVED_LINE", false);
      }
    },
    startHand({ commit }) {
      commit("SET_ON_HAND", true);
    },
    drawHand({ state }, event) {
      if (state.onHand) {
        const outerCanvas = document.querySelector(".outer-canvas");
        let x = outerCanvas.scrollLeft - event.movementX;
        let y = outerCanvas.scrollTop - event.movementY;
        outerCanvas.scrollTo(x, y);
      }
    },
    startPencil({ state, getters, commit }, event) {
      const svgObj = {
        id: `pencil_${state.svgObjs.length + 1}`,
        tool: "pencil",
        points: `${event.layerX * getters.zoomRatio},${event.layerY * getters.zoomRatio} `,
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth != 0 ? state.strokeWidth : 1
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawPencil({ state, getters }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        lastObj.points += `${event.layerX * getters.zoomRatio},${event.layerY * getters.zoomRatio} `;
      }
    },
    startLine({ state, getters, commit }, event) {
      const svgObj = {
        id: `line_${state.svgObjs.length + 1}`,
        tool: "line",
        x1: event.layerX * getters.zoomRatio,
        y1: event.layerY * getters.zoomRatio,
        x2: event.layerX * getters.zoomRatio,
        y2: event.layerY * getters.zoomRatio,
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth != 0 ? state.strokeWidth : 1,
        rotate: 0
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawLine({ state, getters }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        lastObj.x2 = event.layerX * getters.zoomRatio;
        lastObj.y2 = event.layerY * getters.zoomRatio;
      }
    },
    startCurvedLine({ state, getters, commit }, event) {
      const svgObj = {
        id: `cline_${state.svgObjs.length + 1}`,
        tool: "curved_line",
        d: '',
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth != 0 ? state.strokeWidth : 1,
        rotate: 0
      }
      commit("ADD_SVGOBJS", svgObj);
      const tempLine = {
        tool: "line",
        x1: event.layerX * getters.zoomRatio,
        y1: event.layerY * getters.zoomRatio,
        x2: event.layerX * getters.zoomRatio,
        y2: event.layerY * getters.zoomRatio,
        strokeColor: '#325D9E',
        strokeWidth: 5,
        strokeDashArray: 5
      }
      commit("SET_TEMP_LINE", tempLine);
    },
    drawTempLine({ state, getters }, event) {
      if (event.buttons == 1) {
        let tempLine = state.tempLine;
        tempLine.x2 = event.layerX * getters.zoomRatio;
        tempLine.y2 = event.layerY * getters.zoomRatio;
      }
    },
    drawCurvedLine({ state, getters }, event) {
      if (event.buttons == 0) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1]; 
        lastObj.d = `M ${state.tempLine.x1} ${state.tempLine.y1} Q ${event.layerX * getters.zoomRatio} ${event.layerY * getters.zoomRatio} ${state.tempLine.x2} ${state.tempLine.y2}`
      }
    },
    startCircle({ state, getters, commit }, event) {
      const svgObj = {
        id: `circle_${state.svgObjs.length + 1}`,
        tool: "circle",
        x: event.layerX * getters.zoomRatio,
        y: event.layerY * getters.zoomRatio,
        radius: 0,
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth,
        fillColor: state.fillColor.hexa
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawCircle({ state, getters }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        let w = Math.abs(lastObj.x - event.layerX * getters.zoomRatio);
        let h = Math.abs(lastObj.y - event.layerY * getters.zoomRatio);
        lastObj.radius = Math.sqrt((w**2) + (h**2));
      }
    },
    startRectangle({ state, getters, commit }, event) {
      const svgObj = {
        id: `rect_${state.svgObjs.length + 1}`,
        tool: 'rectangle',
        x: event.layerX * getters.zoomRatio,
        y: event.layerY * getters.zoomRatio,
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
    drawRectangle({ state, getters }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        if (event.layerX * getters.zoomRatio - lastObj.x > 0 && event.layerY * getters.zoomRatio - lastObj.y > 0) {
          lastObj.width = event.layerX * getters.zoomRatio - lastObj.x;
          lastObj.height = event.layerY * getters.zoomRatio - lastObj.y;
        }
      }
    },
    startPolygon({ state, getters, commit }, event) {
      const polygonLine = {
        tool: 'polygonLine',
        x1: event.layerX * getters.zoomRatio,
        y1: event.layerY * getters.zoomRatio,
        x2: event.layerX * getters.zoomRatio,
        y2: event.layerY * getters.zoomRatio,
        strokeColor: state.strokeColor.hexa,
        strokeWidth: state.strokeWidth
      }
      commit("ADD_POLYGON_LINES", polygonLine);
    },
    drawPolygonLine({ state, getters, commit }, event) {
      let firstLine = state.polygonLines[0];
      let lastLine = state.polygonLines[state.polygonLines.length - 1];
      if (state.onPolygon) {
        if (Math.abs(firstLine.x1 - event.layerX * getters.zoomRatio) < 10 && Math.abs(firstLine.y1 - event.layerY * getters.zoomRatio) < 10 ) {
          let points = '';
          state.polygonLines.forEach(line => {
            points += `${line.x1},${line.y1} `;
          });
          points += `${lastLine.x2},${lastLine.y2}`;
          const svgObj = {
            id: `polygon_${state.svgObjs.length + 1}`,
            tool: "polygon",
            points: points,
            fillColor: state.fillColor.hexa,
            strokeWidth: state.strokeWidth,
            strokeColor: state.strokeColor.hexa
          }
          commit("ADD_SVGOBJS", svgObj);
          commit("SET_ON_POLYGON", false);
          commit("CLEAR_POLYGON_LINES");
          return;
        }
        const polygonLine = {
          id: `pline_${state.polygonLines.length + 1}`,
          tool: "polygonLine",
          x1: lastLine.x2,
          y1: lastLine.y2,
          x2: event.layerX * getters.zoomRatio,
          y2: event.layerY * getters.zoomRatio,
          strokeColor: state.strokeColor.hexa,
          strokeWidth: state.strokeWidth
        }
        commit("ADD_POLYGON_LINES", polygonLine);
      } else {
        if (event.buttons === 1) {
          lastLine.x2 = event.layerX * getters.zoomRatio;
          lastLine.y2 = event.layerY * getters.zoomRatio;
        }
      }   
    },
    startEraser({ state, getters, commit }, event) {
      const svgObj = {
        id: `eraser_${state.svgObjs.length + 1}`,
        tool: "eraser",
        points: `${event.layerX * getters.zoomRatio},${event.layerY * getters.zoomRatio} `,
        strokeColor: state.canvasColor.hexa ? state.canvasColor.hexa : state.canvasColor,
        strokeWidth: state.strokeWidth != 0 ? state.strokeWidth : 1
      }
      commit("ADD_SVGOBJS", svgObj);
    },
    drawEraser({ state, getters }, event) {
      if (event.buttons == 1) {
        let lastObj = state.svgObjs[state.svgObjs.length - 1];
        lastObj.points += `${event.layerX * getters.zoomRatio},${event.layerY * getters.zoomRatio} `;
      }
    },

    clearSvgObjs({ commit }) {
      commit("CLEAR_SVGOBJS");
    }
  },
  modules: {
  }
})
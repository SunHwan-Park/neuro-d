import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedTool: "hand"
  },
  mutations: {
    SET_SELECTED_TOOL(state, tool) {
      state.selectedTool = tool;
    }
  },
  actions: {
    selectTool({ commit }, tool) {
      commit("SET_SELECTED_TOOL", tool);
    }
  },
  modules: {
  }
})

<template>
  <div class="d-flex flex-column align-center py-2">
    <img
      class="tool"
      :class="{'selected-tool': tool === selectedTool}"
      v-for="tool in tools"
      :key="tool"
      :src="require(`../assets/tools/${tool}.png`)"
      :title="tool"
      :alt="tool"
      @click="selectTool(tool)"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ToolBox",
  data() {
    return {
      tools: [
        "hand",
        "cursor",
        "pencil",
        "line",
        "curved_line",
        "circle",
        "rectangle",
        "polygon",
        "eraser",
        "undo",
        "redo"
      ]
    }
  },
  computed: {
    ...mapState(["selectedTool"])
  },
  methods: {
    ...mapActions(["selectTool"])
  }
}
</script>

<style scoped>
  .tool {
    width: 35px;
    margin: 5px 0px;
    cursor: pointer;
  }

  .selected-tool {
    background-color: #325D9E;
    border-radius: 3px;
  }
</style>
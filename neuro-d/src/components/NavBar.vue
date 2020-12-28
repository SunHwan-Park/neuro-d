<template>
  <div class="nav-content">
    <img class="logo" src="../assets/logo.png" />
    <div>
      <v-btn elevation="2">
        IMPORT
      </v-btn>
      <v-btn class="ml-2" elevation="2">
        EXPORT
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0.5vw;
  }

  .logo {
    height: 70%;
  }

</style>
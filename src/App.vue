<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// базовые стили, которые применяются глобально
html {
  height: 100%;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  height: 100%;
}

#app {
  margin: 0;
  display: flex;
  height: inherit;
  width: inherit;
}
</style>

<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    // базовые стили, которые применяются глобально
    body {
        margin: 0;
    }

    #app {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

</style>

<template>
  <div id="bottom-section">
    <slot></slot>
  </div>
</template>

<script>
//Обертка для нижней части слоя активных элементов, вмещает в себя кнопки, находящиеся снизу
export default {
  name: 'bottom-section',
}
</script>

<style scoped lang='scss'>
#bottom-section {
    height: 8.5%;
    background: rgba(84, 93, 112, 0.4);
    color: white;
    padding: 2%;
    display: flex;
    .info-place {
        width: 10%;
        padding: 1%;
        border-right: double 1px #757575;
    }
    .rate-button {
        padding: 1%;
        display: flex;
        width: 10%;
        margin-left: 10%;
        margin-right: 11%;
        span {
            font-size: 1.5em;
            margin-left: 20%;
        }
      }
      .dislike-button {
          padding: 1%;
          display: flex;
          width: 10%;
          margin-left: 20%;
          margin-right: 11%;
          span {
              font-size: 1.5em;
              margin-left: 20%;
          }
        }

    .auth-button {
        cursor: pointer;
        display: flex;
        width: 9%;
        margin-left: 10%;
        margin-right: 4%;
        background-color: white;
        opacity: 0.7;
        border-radius: 20%;
        .icon {
            color: white;
            height: 100%;
        }
    }
    .tickets-button {
        cursor: pointer;
        padding: 1%;
        display: flex;
        width: 6.5%;
        background-color: white;
        opacity: 0.7;
        border-radius: 20%;
        margin-left: 3%;
        margin-right: 11%;
        .icon {
            height: 95%;
        }
        .icon:hover {
            height: 105%;
        }
    }
    .settings-button {
      cursor: pointer;
      display: block;
      background-color: black;
      opacity: 0.7;
      border-radius: 20%;
      height: 28px;
      width: 28 px;
      margin-left: 0%;
      img {
        width: 27px;
        height: 24px;
      }
    }
    #dislike {
        img {
            transform: rotate(0.5turn); // Делаем палец вниз за счет поворота;
        }
    }
    #age-restriction {
        margin-left: 10%;
        text-align: center;
        font-size: 1em;
        background-color: rgba(6, 8, 20, 0.8);
        border-radius: 20%;
    }
}
</style>

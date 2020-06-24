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
    background: rgba(12, 10, 26, 0.7);
    color: white;
    padding: 2%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .info-place {
        width: 11%;
        cursor: pointer;
        opacity: 0.7;
        height: auto;
        padding-right: 2%;
        border-right: double 1px #757575;
    }
      .like-button {
        position: absolute;
        width: 8%;
        right: 65%;
      }
      .dislike-button {
          width: 8%;
          position: absolute;
          right: 32%;
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
            .tickets-button {
              width: 10% !important;
              height: 79% !important;
              cursor: pointer;
              ::v-deep .little-round-button-icon {
                height: 35px;
                position: absolute;
                width: auto;
                bottom: 1%;
              }
              }
            }


        .auth-button {
          width: 10% !important;
          height: 100% !important;
          cursor: pointer;
          ::v-deep .little-round-button-icon {
            height: 34.5px;
            position: absolute;
            width: auto;
            bottom: 1.1%;
          }
        }
        .settings-little-button {
          cursor: pointer;
          width: 11.1%;
          height: 102%;
          margin-left: 2%;
          ::v-deep img {
            width: 99%;
          }
        }
    }
    #dislike {
        img {
            transform: rotate(0.5turn); // Делаем палец вниз за счет поворота;
        }
    }
    #age-restriction {
        margin-left: 10%;
        height: 80%;
        right: 2%;
        margin-bottom: 1%;
        text-align: center;
        padding-top: 2%;
        width: 12%;
        font-size: 1em;
        background-color: rgba(15, 20, 50, 1);
        border-radius: 20%;
    }


</style>

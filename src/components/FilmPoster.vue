
<template>
  <div class = 'postercontainer'>
    <div v-if = 'this.kid' class="poster">
        <img :src="posterImgUrl" class="poster-image" alt="Постер фильма" />
        <div id="action-elements-layer">
           <div class="rate rate-5">5</div>
           <div id="bottom-section">
               <div class="rate-button" id="like">
                   <img src="@/assets/like.png" alt="like" />
                   <span>3</span>
               </div>
               <div class="rate-button" id="dislike">
                   <img src="@/assets/like.png" alt="dislike" />

                   <span>4</span>
               </div>
               <div id="age-restriction">14+</div>
           </div>
       </div>
   </div>
   <div v-else>
     <h1>This film doesn't have a poster yet!</h1>
   </div>
 </div>
</template>

<script>

  export default {
    props: ['kid',],
    computed : {
        posterImgUrl() {
          if (this.kid) {
             let kid = this.kid
             let thousand = Math.trunc(Number(kid) / 1000) + 1 // какая тысяча. используется в URL.
             console.log("http://posters.kinoafisha.ru/" + thousand + "/" + kid + "-001.jpg")
             return (
                 "http://posters.kinoafisha.ru/" + thousand + "/" + kid + "-001.jpg"
             );
          } else {
            return null
          }
       },
    }
  }

</script>

<style lang='scss'>
// usually for mobile
@media (orientation: portrait) {
    .poster {
        width: inherit;
    }
    .poster-image {
        width: inherit;
    }
}
// desktop is always landscape
@media (orientation: landscape) {
    .poster {
        height: inherit;
    }
    .poster-image {
        height: inherit;
    }
}

.postercontainer {
  width: 20%;
  height: 40%;
  position: relative;
}

.poster {
    position: relative;

    .poster-image {
        z-index: 1;
    }

    #action-elements-layer {
        position: absolute;
        z-index: 2;
        top: 0;
        width: 183%;
        height: 103%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        $rate-opacity: 0.85;
        .rate-5 {
            background: rgba(forestgreen, $rate-opacity);
        }
        .rate-4 {
            background: rgba(blue, $rate-opacity);
        }
        .rate-3 {
            background: rgba(yellow, $rate-opacity);
        }
        .rate-2 {
            background: rgba(red, $rate-opacity);
        }

        .rate {
            border-top-right-radius: 35%;
            border-bottom-right-radius: 35%;
            padding-left: 7%;
            padding-right: 7%;
            color: black;
            align-self: flex-start;
            margin-top: 10%;
            font-size: 4em;
        }

        #bottom-section {
            padding: 2%;
            margin-bottom: 5%;
            background: rgba(white, 0.5);
            display: flex;
            align-items: center;
            justify-content: space-between;

            .rate-button {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                font-size: 25pt;

                img {
                    width: 45%;
                    height: 45%;
                }

                img:active {
                    width: 50%;
                    height: 50%;
                }
            }

            #dislike {
                img {
                    transform: rotate(
                        0.5turn
                    ); // Делаем палец вниз за счет поворота.
                }
            }

            #age-restriction {
                margin-left: 20%;
                font-size: 44pt;
            }
        }
    }
}
</style>

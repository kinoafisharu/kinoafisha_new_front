<template>
  <transition name="modal">
    <div class="modal-mask" 
      :style="{ width: width + 'px', height: height + 'px', 'margin-left' :  margin_left +'px'}"  >
      <div class="modal-wrapper">
        <div class="modal-container dark">
          <div class="modal-header">
            <slot name="header">
            </slot>
            <img  v-if="show_close_btn" src="../assets/cross.png" class="btn_close" @click="$emit('close')"/>
          </div>
          <div class="modal-body">
            <slot name="body">
              
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible : Boolean,  
    show_close_btn : Boolean,  
    width : Number,
    height : Number,
    margin_left : Number
  },
  data: function(){
    return {
      showModal: false
    }
  },
}
</script>


<style scoped>
@media (max-height: 250px) {
    .modal-mask{
        font-size: 0.6em !important;
    }
}

.dark{
  background-color: #414141 !important;
  color: white;
}

.btn_close{
  opacity: 0.7;
  position: absolute;
  right: 12px;
  top: 14px;
  cursor: pointer;
  width: 8%;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  overflow-y: auto;
  height: 100%;
  margin: 0px auto;
  padding: 2px 3px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
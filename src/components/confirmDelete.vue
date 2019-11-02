<template>
  <div class="overlay">
    <div class="contentForm">
    <div class="confirmText">{{confirmDeleteText}}</div>
    <button @click="confirmTaskFunction()" class="btn yes">{{yesText}}</button>
    <button @click="cancelTaskFunction()" class="btn no">{{noText}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taskComponent',
  props: {
    data: Object,
    confirmTaskFunction: Function,
    cancelTaskFunction: Function
  },
  data: function () {
    return {
      confirmDeleteText: "Are you sure you want to delete the task?",
      yesText: "Yes",
      noText: "No",
    }
  }
}
</script>

<style scoped lang="scss">

.overlay{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0,0,0,0.5); 
  display: flex;
  justify-content: center;
  align-items: center;

}

.contentForm{
  width:350px;
  height:180px;
  border-radius:5px;
  box-shadow: 0px 0px 6px rgba(0,0,0,0.4);
  background-color:rgba(250,255,255);

    .titleForm{
      float:left;
      width:100%;
      margin-top:20px;
      text-align:center;
      color:grey;
      font-size:20px;
      font-family: 'Josefin Sans', sans-serif;
    }

   .btn{
    width:200px;
    border-radius:3px;
    padding:7px 7px;
    margin-top:20px;
    font-size:14px;
    font-family: 'Josefin Sans', sans-serif;
    border-style:none;
    cursor:pointer;
    box-shadow:0px 0px 3px rgba(0,0,0,0.2);

    &:focus{
      outline-width:0;
    }

    &:hover{
      box-shadow:0px 0px 3px rgba(0,0,0,0.5);
    }

    &:active {
      box-shadow:0px 3px 7px rgba(0,0,0,0.4);
      transform: translateY(1px);
    }

    &.yes {
      background-color:orange;
    }

    &.no {
      background-color:grey;
    }

    .disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

   }

   .confirmText{
    font-size:16px;
    margin-top:20px;
   }
}



</style>

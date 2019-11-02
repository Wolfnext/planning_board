<template>
  <div class="overlay">
    <i class="fa fa-trash-o" aria-hidden="true"></i>
    <draggable class="placeForDeleteItem" group="tasks" v-model="removeArray">
  </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'deleteItem',
  components:{draggable},
  props: {
    data: Object,
    openConfirmDialog: Function
  },
  watch:{
    removeArray(addedItem){
      this.openConfirmDialog(addedItem);
    }
  },
  data: function () {
    return {
      addTaskText: "Add task",
      newTask: null,
      removeArray:[],
    }
  },
}
</script>


<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');

.overlay{
  position: absolute;
  left: 0;
  bottom:25px;
  width: 100%;
  height: 20%;
  z-index: 10;
  background-color: rgba(0,0,0,0.0); 
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

   .btnAdd{
    width:200px;
    border-radius:3px;
    padding:7px 7px;
    margin-top:20px;
    font-size:14px;
    font-family: 'Josefin Sans', sans-serif;
    background-color:orange;
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

    .disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

   }

   input[type="text"]{
      font: 15px/24px 'Muli', sans-serif;
      color: #333;
      box-sizing: border-box;
      letter-spacing: 1px;
      margin-top:30px;
      width:300px;
      position:relative;
      height:30px;
      border: 0;
      padding: 7px 0;
      border-bottom: 1px solid #ccc;

        &:focus{
          outline-width:0;
        }
        &:hover{
          box-shadow:0px 5px 10px rgba(0,0,0,0.1);
        }
    }

}

.fa-trash-o{
  font-size:30px;
  margin-top:23px;
  position:absolute;
}

.placeForDeleteItem{
  height:40px;
  width:150px;
}



</style>

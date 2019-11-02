<template>
  <div class="overlay">
    <div class="form">
      <div class="titleForm">{{addTaskText}}</div>
      <input @keyup.enter="confirmFunction(data,newTask)"  placeholder="Text" v-model="newTask.name" type="text" >
      <div v-if="errorMessageInput" class="error-messages">{{errorMessageInput}}</div>
      <select @keyup.enter="confirmFunction(data,newTask)"  v-model="newTask.type">
         <option disabled selected>Select type</option>
        <option v-for="(name,id) in typeArray" :key="id" :value="name" >{{name}}</option>
      </select>
      <div v-if="errorMessageSelect" class="error-messages">{{errorMessageSelect}}</div>
      <button  @click="confirmFunction(data,newTask)" class="btn yes">{{confirmText}}</button>
      <button @click="cancelTaskFunction()" class="btn no">{{cancelText}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taskComponent',
  props: {
    data: Object,
    addTaskFunction: Function,
    editTaskFunction: Function,
    cancelTaskFunction:Function
  },
  data: function () {
    return {
      addTaskText: "Add / Edit task", 
      confirmText: "Ok",
      cancelText: "Cancel",
      newTask: {},
      typeArray: ["feature","bugfix","default"], // type for select
      errorMessageInput:'', // error message to input validate
      errorMessageSelect:'', // error message to select validate
    }
  },
  watch:{
      // check validate input and select
      newTask: {
      handler: function (val) {
      if(val.name != null)this.errorMessageInput = ''
      if(val.type != null)this.errorMessageSelect = ''
      },deep:true
  }
},
  mounted(){
    //copy data to newTask
    this.newTask = {...this.data}
  },
  methods:{
    // check  edit or new, validate and call function 
    confirmFunction(item,newItem){
    if(this.data.name && this.data.type){
      this.editTaskFunction(item,newItem)
      } else {
        if(newItem.name !=null && newItem.type != null){
       this.addTaskFunction(newItem)
      } else{
        if(newItem.name == null || newItem.name == "") this.errorMessageInput = "Please enter the text."
        if(newItem.type == null || newItem.name == "") this.errorMessageSelect = "Please select the type."
      }
      }
  },
}
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');

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

.form{
  width:350px;
  height:320px;
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

    .disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    &.yes {
      background-color:orange;
    }

    &.no {
      background-color:grey;
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
    .error-messages{
      font-size:10px;
      font-family:Tahoma;
      margin-top:4px;
      text-align:left;
      margin-left:25px;
      color:red;
        }

    select {
      font: 15px/24px 'Muli', sans-serif;
      color: #333;
      box-sizing: border-box;
      letter-spacing: 1px;
      margin-top:30px;
      width:300px;
      position:relative;
      height:36px;
      border: 0;
      padding: 7px 0;
      border-bottom: 1px solid #ccc;
      background-color:white;

      &:focus{
          outline-width:0;
          background-color:white;
        }
    }
}



</style>

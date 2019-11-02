<template>
<content>
  <header class="toolbar" ><div class="text">{{toolbarText}}</div></header>
  <content>
    <div class="content">
      <!-- left column - waiting -->
    <div class="leftSide">
      <header>Waiting</header>
      <draggable @start="deleteItemVisible = true;" v-on:touchstart.native="startTouch" v-on:touchend.native="endTouch"  :move="endTouch" element="div" v-model='tasks.waiting' @end="handleDrop" :group="{ name:'tasks', pull: cloneIfItemMovedForDeletion}">
       <div v-for="element in tasks.waiting" :key="element.id" class="item">
        <taskComponent :editTask="dialogAddEditVisible" :data="element" />
    </div>
    </draggable></div>
    <!-- center column - inProgress -->
    <div class="center">
       <header>In progress</header>
        <draggable @start="()=>{deleteItemVisible = true;}"  v-on:touchstart.native="startTouch" v-on:touchend.native="endTouch"  :move="endTouch"  element="div" v-model='tasks.inProgress' @end="handleDrop" :group="{ name:'tasks', pull: cloneIfItemMovedForDeletion}">
       <div v-for="element in tasks.inProgress" :key="element.id" class="item">
        <taskComponent  :editTask="dialogAddEditVisible" :data="element" />
    </div>
  </draggable>
    </div>
     <!-- right column - complete -->
    <div class="rightSide">
        <header>Complete</header>
        <draggable @start="()=>{deleteItemVisible = true;}"  v-on:touchstart.native="startTouch" v-on:touchend.native=endTouch  :move="endTouch" element="div"  v-model='tasks.complete' @end="handleDrop" :group="{ name:'tasks', pull: cloneIfItemMovedForDeletion}">
      <div v-for="element in tasks.complete" :key="element.id" class="item">
        <taskComponent  :editTask="dialogAddEditVisible" :data="element" />
    </div>
  </draggable>
    </div>
 <!-- icon add Task -->
<a @click="addEditTaskVisible = true" class="floatingButton">
<i class="fa fa-plus marginTop"></i>
</a>

<transition name="fade">
   <!-- component Add / Edit Task -->
<addTask :data="editedTask" :addTaskFunction="addTask" :editTaskFunction="editTask" :cancelTaskFunction="()=>{addEditTaskVisible = false;this.editedTask = {};}" v-if="addEditTaskVisible" />
  </transition>
    <!-- component delete Task -->
<deleteItem :openConfirmDialog="(removeItem)=>{this.removeItem = removeItem;dialogConfirmDeleteVisible = true}" v-if="deleteItemVisible" />
<transition name="fade">
    <!-- component confirm delete Task -->
<dialogConfirmDelete v-if="dialogConfirmDeleteVisible" :confirmTaskFunction="()=>{removeTask(removeItem[0]);dialogConfirmDeleteVisible = false}" :cancelTaskFunction="()=>{dialogConfirmDeleteVisible = false}" />
</transition>
</div>
</content>
</content>
</template>

<script>
import draggable from 'vuedraggable'
import taskComponent from '../components/taskComponent.vue'
import addTask from '../components/addTask.vue'
import deleteItem from '../components/deleteItem.vue'
import dialogConfirmDelete from '../components/confirmDelete.vue'
export default {
  name: 'mainLayout',
   components: {
    draggable,taskComponent,addTask,deleteItem,dialogConfirmDelete
  },
  data: function () {
    return {
      toolbarText: "Planning Board",
      removeItem: {},
      editedTask: {},
      touchObject: {},
      addEditTaskVisible: false,
      deleteItemVisible: false,
      dialogConfirmDeleteVisible: false,
      timerLongtouch:null 
    }
  },
  computed: {
    tasks: {
        get() {
            return this.$store.state.tasks
        },
        set(value) {
            this.$store.commit('updateTasks', value)
        }
    }
  },
  beforeCreate() {
    // load store from localStorage
    this.$store.commit('initialiseStore');
  },
  created() {
    // save to localStorage when store changed lenght
    this.$store.subscribe((mutation, state) => {
      localStorage.setItem('store', JSON.stringify(state));
    });
  },
  methods:{
  // start touch task component
  startTouch(e){
       let timeLongClick = 1500;
       this.touchObject = e.target.__vue__.$props.data // get data from touchObject
       this.timerLongtouch = setTimeout(this.touchLong, timeLongClick);
  },
  // long touch function
  touchLong(){
  this.dialogAddEditVisible(this.touchObject);
    },
  // end touch function, clear Timeout - timer
  endTouch(){
       if (this.timerLongtouch)
        clearTimeout(this.timerLongtouch);
    },
  // update tasks when item drag and drop
  handleDrop(){
    this.deleteItemVisible = false;
    this.$store.commit('updateTasks', this.tasks)
  },
  // Add task
  addTask(newTask){
   newTask.id = Math.random().toString(36).substr(2, 9) // generate unique ID
   this.$store.commit('addTask',newTask)
   this.addEditTaskVisible = false
  },
  //Remove task
  removeTask(item){
   this.$store.commit('removeTask', item)
  },
  //Edit Task
  editTask(item,newItem){
  this.$store.commit('editTask',{item:item,newItem:newItem})
  this.addEditTaskVisible = false
  this.editedTask = {};
  },
  // visible add/edit dialog
  dialogAddEditVisible(selectedItem){
    this.editedTask = selectedItem;
    this.addEditTaskVisible = true;
  },
  //checks if the item is moved for deletion
  cloneIfItemMovedForDeletion(firstelement,k,l,objectWithTarget){
     return objectWithTarget.target.parentNode.className === "overlay" ? "clone" : true;
  }
}
 
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Staatliches&display=swap');
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

$toolbar__color:rgba(255,255,255,.1); 


@mixin header__style {
      padding:10px;
      border-bottom: 1px solid grey;
    }

 .content{
    margin-top:50px;   
  }

.toolbar {
  width : 100vw;
  background-color: $toolbar__color;
  height: 50px;
  box-shadow:0px 0px 5px rgba(0,0,0,.1);
  position:fixed;
      .text {
        padding-top: 10px;
        font-size: 30px;
        font-family: 'Staatliches', cursive;
      }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}



@media only screen and (max-width: 760px),
(max-device-width: 768px) {
 
 #app{
  overflow-x:scroll;
}
::-webkit-scrollbar {
    -webkit-appearance: none;
}
::-webkit-scrollbar:vertical {
    width: 12px;
}
::-webkit-scrollbar:horizontal {
    height: 12px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .2);
    border-radius: 8px;
    border: 2px solid #ffffff;
}
::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffff;
}
 
.content{
  min-height: calc(100vh - 65px);
  min-width: 750px;
  }


 .leftSide {
    width: 250px;
    float:left;
    text-align:center;
    background-color: rgba(200,200,255,0.1);
    min-height: calc(100vh - 65px);

      header{
        @include header__style;
      }
}
   .center {
   width: 250px;
    float:left;
    background-color: rgba(200,200,255,0.1);
    min-height: calc(100vh - 65px);

       header {
        @include header__style;
      }
  }
   .rightSide {
   width: 250px;
    float:left;
    background-color: rgba(200,200,255,0.1);
    min-height: calc(100vh - 65px);
     header{
        @include header__style;
      }
  }
}

@media only screen and 
(min-device-width: 768px) {

  .leftSide {
    width: 33.33%;
    float:left;
    text-align:center;
    background-color: rgba(200,200,255,0.1);
    min-height: calc(100vh - 50px);

      header{
        @include header__style;
      }
}
   .center {
    width: 33.33%;
    float:left;
    background-color: rgba(200,200,255,0.1);
    min-height: calc(100vh - 50px);

       header {
        @include header__style;
      }
  }
   .rightSide {
    width: 33.33%;
    float:left;
    background-color: rgba(200,200,255,0.1);
    min-height: calc(100vh - 50px);
     header{
        @include header__style;
      }
  }
}

.floatingButton {
  position:fixed;
  width:60px;
  height:60px;
  bottom:40px;
  right:30px;
  background-color:#0C9;
  color:#FFF;
  border-radius:50px;
  text-align:center;
  box-shadow: 2px 2px 3px #999;
  cursor:pointer;

    i {
      margin-top:22px;
    }

    &:hover {
      box-shadow: 2px 2px 10px #999;
    }
}


</style>

<template>
<div @click="editIconVisible = true" @touchstart="editIconVisible = true" :class="['component', data.type]">
  <div class="smallTypeText">{{data.type}}</div>
<div class="nameText">{{data.name}}</div>
<i v-if="editIconVisible" @click="editTask(data)" class="iconEdit fa fa-pencil-square-o" aria-hidden="true"></i>
</div>
</template>

<script>
export default {
  name: 'taskComponent',
  props: {
    data: Object,
    editTask: Function
  },
  data: function () {
    return {
      editIconVisible:true,
    }
  }
  
}
</script>


<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');

.component{
  width: 100&;
  height: 100%;
  margin:10px;
  padding:10px;
  padding-top:10px;
  padding-bottom:30px;
  box-shadow: 0px 0px  6px rgba(0,0,0,0.2);
  border-radius: 3px;
  cursor:pointer;
  font-size:15px;

    &:hover {
        box-shadow: 0px 0px  10px rgba(0,0,0,0.7);
    }
    &.feature{
      background-color: #ace1af;
  }
    &.bugfix{
      background-color: #dc143c;
  }
    &.default{
      background-color: #fffff2;
  }
  .smallTypeText{
    font-size:10px;
    float:center;
    text-align:left;
    width:100%;
    height:5px;
    margin-bottom:5px;
    font-family:tahoma;
  }

  .nameText{
    padding-top:10px;
    width:100%;
    font-family:Arial;
    text-align: center;
    
  }
  .iconEdit{
    float:right;
  }
}


</style>

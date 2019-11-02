<template>
<div @click="editIconVisible = true" @touchstart="editIconVisible = true" :class="['component', data.type]">
{{data.name}}
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
  padding-top:20px;
  padding-bottom:20px;
  box-shadow: 0px 0px  10px rgba(0,0,0,0.2);
  border-radius: 3px;
  cursor:pointer;
  font-size:15px;
  font-family: 'Josefin Sans', sans-serif;

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

  .iconEdit{
    float:right;
  }
}


</style>

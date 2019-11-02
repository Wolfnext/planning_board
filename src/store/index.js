import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  tasks : {waiting:[{id:0,name:"Wykonać planning board",type:"feature"},{id:1,name:"Przerwa na kawę",type:"default"},{id:2,name:"Popraw błędy",type:"bugfix"}],inProgress:[{id:3, name:"Wykonać planning boarder",type:"feature"}],complete:[{id:4, name:"Wykonać planning boarder",type:"feature"}]},
  },
  mutations: {
  // update tasks when changed
  updateTasks: (state, items) => {
  state.tasks = {...items};
        },
  // add Task by  new item
  addTask: (state, item) => {
  state.tasks.waiting.push(item)
        },
  // edit Task
  editTask : (state,objectChange) => {
  let {newItem} = objectChange
  let {item} = objectChange
  Object.keys(state.tasks).forEach((id)=> {
  let index = state.tasks[id].findIndex(x =>  x.name === item.name  && x.type === item.type && x.id === item.id)
  if(index > -1){state.tasks[id][index].name = newItem.name;state.tasks[id][index].type = newItem.type;}
  });
  },
  // remove task
  removeTask: (state, item) => {
  Object.keys(state.tasks).forEach((id)=> {
  let index = state.tasks[id].findIndex(x =>  x.name === item.name  && x.type === item.type && x.id === item.id)
  if(index > -1)state.tasks[id].splice(index,1)
  });
  },
  // load store from localStorage
  initialiseStore(state) {
  if(localStorage.getItem('store')) {
  Object.assign(state, JSON.parse(localStorage.getItem('store')))
			}
		}
  },
})

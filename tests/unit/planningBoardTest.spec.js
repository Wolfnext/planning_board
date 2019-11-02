import { shallowMount } from '@vue/test-utils'
import addTask from '@/components/addTask.vue'
import taskComponent from '@/components/taskComponent.vue'
import state from '@/store/index.js'

describe('addTask', () => {
  it('render message error when data is null object', () => {
const wrapper =  shallowMount(addTask, {
      propsData: {
      	data:{},
        addTaskFunction: Function,
   		editTaskFunction: Function,
    	cancelTaskFunction:Function
      }
    })

wrapper.find('.btn').trigger('click')

 let errorMessageInput = wrapper.vm.errorMessageInput;
 let errorMessageSelect = wrapper.vm.errorMessageSelect;
expect(errorMessageInput).toBe("Please enter the text.")
expect(errorMessageSelect).toBe("Please select the type.")

})

    it('passing object data to object newTask', () => {
const wrapper =  shallowMount(addTask, {
      propsData: {
      	data:{name:"test",type:"default"},
        addTaskFunction: Function,
   		editTaskFunction: Function,
    	cancelTaskFunction:Function
      }
    })

let newTask = wrapper.vm.newTask;
expect(newTask.name).toBe("test")
expect(newTask.type).toBe("default")
})
  })


// task component test
describe('taskComponent', () => {
  it('check render Tasks component', () => {
const wrapper =  shallowMount(taskComponent, {
      propsData: {
      	data:{name:"test",type:"default"},
        editTask: Function
      }
    })
// should be default
expect(wrapper.classes()[1]).toBe("default")
expect(wrapper.find('.smallTypeText').text()).toEqual("default")
expect(wrapper.find('.nameText').text()).toEqual("test")

})
})




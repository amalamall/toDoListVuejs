// add-todo
Vue.component("add-todo", {
  template: ` <form class="flex justify-center" @submit.prevent="onSubmit"> 
  <input type="text" name="name" v-model="name" placeholder="write here your task" class="peer text-black block mr-2 border-2 text-xl p-3 rounded-l-full outline-blue">
  <button type="submit"     class="inline-block rounded bg-[#54b4d3] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]">
    Add Task
  </button>

    </form>`,
  data() {
    return {
      name: null,
      completed: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.name) {
        let newTask = {
          name: this.name,
          completed: this.completed,
        };
        this.$emit("add-task", newTask);
        this.name = null;
        this.completed = false;
      } else {
        if (!this.name) this.errors.push("Name Required.");
      }
    },
  },
});

// task component
Vue.component("tasks", {
  props: {},
  template: `
  <div>
  <div>
    <add-todo @add-task="addTask"></add-todo>

  </div>
  <div v-if="tasks.length > 0" class="bg-gray-100 mt-5 p-5 rounded-xl shadow-lg text-gray-700">
  

  <div class="flex flex-col justify-center overflow-y-auto h-max-[40vmin]">
  <ul v-for="(task,key) in tasks" :key="key" class="">
    <li
      class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
      <div class="flex justify-between">
      <div  class="">

      {{task.name}}
      </div>
      <div>
      <button  v-if="!task.completed" @click.prevent="setTaskComplete(key)" class="">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
  </button>
  <button @click.prevent="setTaskIncomplete(key)" v-if="task.completed" class="">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
  </button>
  <button v-if="task.completed" @click.prevent="removeTask(key)"  class="">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
  </button> 
  </div>    
   </div>
    </li>
  </ul>

</div>  
</div>


</div>
`,
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
      this.$emit("add-completed-task", this.tasks);
    },
    setTaskComplete(key) {
      this.tasks[key].completed = true;
      this.$emit("add-completed-task", this.tasks);
    },
    setTaskIncomplete(key) {
      this.tasks[key].completed = false;
      this.$emit("add-pending-task", this.tasks);
    },
    removeTask(key) {
      this.tasks.splice(key, 1);
    },
  },
  computed: {
  },
});

// the vue instance
let vm = new Vue({
  el: "#root",
  data: {
    pendingCount: 0,
    completedCount: 0,
  },
  methods: {
    completed(tasks) {
      this.completedCount = tasks.filter((task) => task.completed).length;
      this.pendingCount = tasks.filter((task) => !task.completed).length;

    },
    pending(tasks) {
      this.pendingCount = tasks.filter((task) => !task.completed).length;
      this.completedCount = tasks.filter((task) => task.completed).length;
    },
  },
  computed: {},
});

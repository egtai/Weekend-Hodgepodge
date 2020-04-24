
//1.初始化待办清单列表
var state = {                                       //state对象，用于存储列表的状态数据
    todos: [                                        //待办事项的数组 
        {
            id: 0,                                 //用于key
            task: "练习了CSS的弹性布局flex垂直居中",         //任务名
            completed: false                      //任务执行状态
        },
        {
            id: 1,
            task: "学习lvuex状态管理和数据共享",
            completed: true
        },
        {
            id: 2,
            task: "阅读FrontFoucs及RSS订阅消息",
            completed: false
        }
    ]
};

//2.vuex的getter函数，返回状态中包含的数据函数
var getters = {                           //可以理解相当于vue中的计算属性，有时候需从对store中的state派生出来一些状态                         
    getTodos: state => state.todos       //获取状态数据
};


//3.vuex 中的mutations(突变)对象，直接改变状态的功能，内部保存的为改变状态的函数-->突变函数
  /*
   1.mutaions对象中的属性和值（箭头函数），可以理解为一个字符串的事件类型和一个回调函数（handler），就是我们进行状态更改的地方，并且接受state作为第一个参数
   2.你不能直接去mutations.ADD_TODO(),这更像是事件注册 ，注册了"ADD_TODO"," TOGGLE_TODO","DELETE_TODO"三个事件,
     既然注册了事件，就需要被触发才能执行，即actions对象中的 context.commit("ADD_TODO", payload)就是触发函数
   3.context.commmit()还能传入额外的参数，即mutation的载荷（payload）,payload为对象最好，这样能包含多个字段并且记录mutation会更易读
   4.mutations中的函数是同步的
  */    
var mutations = {                  
    ADD_TODO: (state, payload) => {          

        var newTask = {
            id: payload.newId,
            task: payload.task,
            completed: false
        }

        state.todos.unshift(newTask);   //添加输入框的任务到state.todos数组的头部
    },
    TOGGLE_TODO: (state, payload) => {
        var item = state.todos.find(todo => todo.id === payload);
        item.completed = !item.completed;
    },
    DELETE_TODO: (state, payload) => {
        var index = state.todos.findIndex(todo => todo.id === payload);
        state.todos.splice(index, 1);
    }
};

//3.vuex中调用上面状态突变（mutations）的函数，可以调用多个突变函数
    /*
      1.action提交的mutations,而不是直接变更状态
      2.action可以包含任意的异步操作
      3.action函数接受一个与store实例具有相同方法和属性的context对像，因此你可以调用context.commit()
      4.action通过storestore.dispatch('action', payload)方法去分发触发，不直接分发mutaions,这样action内部就能进行异步操作了
    */
var actions = {
    addTodo: (context, payload) => {          //context为上下文 ，
        context.commit("ADD_TODO", payload)   //可以理解为commmit 一个"ADD_TODO"事件
    },
    // toggleTodo: (context, payload) => {
    //     context.commit("TOGGLE_TODO", payload)
    // },
     //简化代码{commit:context.commit} 参数解构, commit=context.commit

      /*
        function a({commit}){
            console.log(commit)
        }
        a({commit:context.commit})  //context.commit
      
      */
      toggleTodo: ({commit}, payload) => {    
         commit("TOGGLE_TODO", payload)
     },
    deleteTodo: (context, payload) => {
        context.commit("DELETE_TODO", payload)
    }
}

//vuex插件的实例化，引入vuex进行状态管理 ，store就是一个"容器"包含了应用中的大部分状态
var store = new Vuex.Store({
    state: state,           //vuex状态存储是响应式的,vue组件从store.state中读取状态（数据），若其发生变化则，相应的组件就会得到高效的更新
    getters: getters,       //getters暴露为store对象的属性值，store.getter属性方式执行这个函数
    mutations: mutations,  //
    actions: actions      //改变状态的第一步途径就是显示的提交（commit）mutaions
});




//待办事项列表组件
Vue.component("todo-list", {
    computed: {
        todos() {
            return this.$store.getters.getTodos;    //#66：获取state中的数据 todo[]
        }
    },
    methods: {
        toggleTodo: function (id) {
            this.$store.dispatch("toggleTodo", id);
        },
        deleteTodo: function (id) {
            this.$store.dispatch("deleteTodo", id);
        }
    },
    template: "#todo-list"
});

//待办事项父容器组件(根组件)
var app = new Vue({
    data: () => ({
        task: "",
        newId: 3
    }),
    methods: {
        addTodo: function () {
            this.$store.dispatch("addTodo", this);
            this.newId++;
            this.task = "";
        }
    },
    store: store,  //vuex通过store选项，提供了一种机制将状态“注入”到每一个组件中（需要调用Vue.use(vuex)）,子组件能通过this.$store访问到store如#66
    el: "#app",
    template: "#app-template"
});










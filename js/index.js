const defaultState = (localStorage.getItem('list') != null) ? JSON.parse(localStorage.getItem('list')) : {};
// actionCreator
const addList = (name) => ({ type: "ADD_LIST", name});
const addTodoInList = (item, key) => ({type: "ADD_TODO", key, item});

//reducer
const reducer = (state = defaultState, action) => {
    const st = Object.assign({}, state);

    switch(action.type){
        case "ADD_LIST":
            st[action.name] = [];
            return st;
        case "ADD_TODO":
            st[action.key].push(action.item);
            return st;
        default:
            return st;
    }   
    // return {'groceries': ["onion", "tomatoes", "vegi"], "snacks":["biscuits", "banana", "milk"]};
}


const store = Redux.createStore(reducer);

const app = new Vue({
    el: "#app",
    data: {
                lists: store.getState(),
                show: "groceries",
                createItem: false,
        },
    methods: {
      send(event){
        console.log(addList(event.target.listName.value))
        store.dispatch(addList(event.target.listName.value));
      },
      changeShow(key){
        this.show = key;
      },
      create(){
        this.createItem = true;
      },
      addTodo(todo, key){
        store.dispatch(addTodoInList(todo, key));
        
      }
    },
    computed: {
       
    }
})

store.subscribe(() => {
    app.lists = store.getState()
    localStorage.setItem("list", JSON.stringify(store.getState()))
})


// document.getElementById("app").addEventListener('unload', save());

// function save(){
//     alert(store.getState().groceries[0])
//     localStorage.setItem("list", JSON.stringify(store.getState()))
// }




/*
Vue.component("list", {
    template: `
        <div class="list">
            <ul>
                <li v-for="list, key in lists" :key="key">
                    <p>{{list}}</p>
                    <ol>
                        <li v-for="item, index in list" :key="index">{{item}}</li>
                    </ol>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
                lists: {'groceries': ["onion", "tomatoes", "vegi"]}
        }
    },
    methods: {

    },
    computed: {
        getList(index){
            return this.lists.index;
        }
    }
})

*/
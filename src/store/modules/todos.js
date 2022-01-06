import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("deleteTodo", id);
  },
  async filterTodos({ commit }, e) {
    const limit = parseInt(e.target.value);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updTodo) {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`);
    commit("updateTodo", updTodo.id);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  deleteTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: function (state, id) {
    const todo = state.todos.find((todo) => todo.id == id);
    todo.completed = !todo.completed;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import { TodoStatus } from "src/model/todoStatus";
export default class TodoService {
    constructor() {
        this.todos = [];
    }
    getAllTodos() {
        const todos = this.todos.filter(todo => todo.status !== TodoStatus.Deleted);
        return Promise.resolve(todos);
    }
    getTodoById(id) {
        const todo = this.todos.find(todo => todo.id === id);
        return Promise.resolve(todo);
    }
    createTodo(todo) {
        this.todos.push(todo);
        return Promise.resolve(todo);
    }
    updateTodo(id, todo) {
        const index = this.todos.findIndex(t => t.id === id);
        this.todos[index] = todo;
        return Promise.resolve(todo);
    }
    deleteTodo(id) {
        this.todos.find(todo => todo.id === id).status = TodoStatus.Deleted;
        return Promise.resolve();
    }
}
//# sourceMappingURL=Service.js.map
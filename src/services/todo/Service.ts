import { Todo } from "src/model/todo";
import { TodoStatus } from "src/model/todoStatus";
import { ITodoService } from "./IService";
export default class TodoService implements ITodoService {
    constructor() { }
    todos: Todo[] = [];
    getAllTodos(): Promise<Todo[]> {
        const todos = this.todos.filter(todo => todo.status !== TodoStatus.Deleted);
        return Promise.resolve(todos);
    }
    getTodoById(id: string): Promise<Todo> {
        const todo = this.todos.find(todo => todo.id === id);
        return Promise.resolve(todo);
    }
    createTodo(todo: Todo): Promise<Todo> {
        this.todos.push(todo);
        return Promise.resolve(todo);
    }
    updateTodo(id: string, todo: Todo): Promise<Todo> {
        const index = this.todos.findIndex(t => t.id === id);
        this.todos[index] = todo;
        return Promise.resolve(todo);
    }
    deleteTodo(id: string): Promise<void> {
        this.todos.find(todo => todo.id === id).status = TodoStatus.Deleted;
        return Promise.resolve();
    }
}
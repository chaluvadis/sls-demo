import { Todo } from "src/model/todo";
export interface ITodoService {
    getAllTodos(): Promise<Todo[]>;
    getTodoById(id: string): Promise<Todo>;
    createTodo(todo: Todo): Promise<Todo>;
    updateTodo(id: string, todo: Todo): Promise<Todo>;
    deleteTodo(id: string): Promise<void>;
}
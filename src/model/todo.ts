import { TodoStatus } from "./todoStatus";
export interface Todo {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
    createdAt: Date;
}
import { Todo } from "src/model/todo";
import { ITodoService } from "./IService";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
export default class TodoService implements ITodoService {
    constructor(private dbClient: DocumentClient) { }
    todos: Todo[] = [];
    TableName: string = "Todos";
    async getAllTodos(): Promise<Todo[]> {
        const todos = await this.dbClient.scan({ TableName: this.TableName }).promise();
        return todos.Items as Todo[];
    }
    async getTodoById(id: string): Promise<Todo> {
        const todo = await this.dbClient.get({
            TableName: this.TableName,
            Key: { id: id }
        }).promise();
        if (!todo.Item) {
            throw new Error("Id doesn't exist");
        }
        return todo.Item as Todo;
    }
    async createTodo(todo: Todo): Promise<Todo> {
        const newTodo = await this.dbClient.put({
            TableName: this.TableName,
            Item: todo
        }).promise();
        return newTodo.$response.data as Todo;
    }
    async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
        const updated = await this.dbClient
            .update({
                TableName: this.TableName,
                Key: { id: id },
                UpdateExpression:
                    "set #status = :status",
                ExpressionAttributeNames: {
                    "#status": "status",
                },
                ExpressionAttributeValues: {
                    ":status": todo.status,
                },
                ReturnValues: "ALL_NEW",
            })
            .promise();

        return updated.Attributes as Todo;
    }
    async deleteTodo(id: string): Promise<any> {
        return await this.dbClient.delete({
            TableName: this.TableName,
            Key: {
                id: id
            }
        }).promise();
    }
}
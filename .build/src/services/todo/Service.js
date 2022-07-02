export default class TodoService {
    constructor(dbClient) {
        this.dbClient = dbClient;
        this.todos = [];
        this.TableName = "Todos";
    }
    async getAllTodos() {
        const todos = await this.dbClient.scan({ TableName: this.TableName }).promise();
        return todos.Items;
    }
    async getTodoById(id) {
        const todo = await this.dbClient.get({
            TableName: this.TableName,
            Key: { id: id }
        }).promise();
        if (!todo.Item) {
            throw new Error("Id doesn't exist");
        }
        return todo.Item;
    }
    async createTodo(todo) {
        const newTodo = await this.dbClient.put({
            TableName: this.TableName,
            Item: todo
        }).promise();
        return newTodo.$response.data;
    }
    async updateTodo(id, todo) {
        const updated = await this.dbClient
            .update({
            TableName: this.TableName,
            Key: { id: id },
            UpdateExpression: "set #status = :status",
            ExpressionAttributeNames: {
                "#status": "status",
            },
            ExpressionAttributeValues: {
                ":status": todo.status,
            },
            ReturnValues: "ALL_NEW",
        })
            .promise();
        return updated.Attributes;
    }
    async deleteTodo(id) {
        return await this.dbClient.delete({
            TableName: this.TableName,
            Key: {
                id: id
            }
        }).promise();
    }
}
//# sourceMappingURL=Service.js.map
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import todoService from '../../services';

import { v4 } from "uuid";
import { TodoStatus } from "src/model/todoStatus";
import { Todo } from "src/model/todo";

export const getAllTodos = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todos = await todoService.getAllTodos();
    return formatJSONResponse({ todos });
});

export const createTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const todo = await todoService.createTodo({
            id,
            title: event.body['title'],
            description: event.body['description'],
            status: TodoStatus.New,
            createdAt: new Date()
        });
        return formatJSONResponse({ todo });
    } catch (e) {
        return formatJSONResponse({ status: 500, error: e.message });
    }
});

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const todo = await todoService.getTodoById(id);
        return formatJSONResponse({
            todo, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});

export const updateTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const body = JSON.parse(event.body) as Todo;
        const todo = await todoService.updateTodo(id, body);
        return formatJSONResponse({
            id, todo
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});

export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const todo = await todoService.deleteTodo(id);
        return formatJSONResponse({
            todo, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
});
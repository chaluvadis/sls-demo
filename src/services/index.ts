import TodoServerice from "./todo/Service";
import dynamoDbClient from "../database";
const todoService = new TodoServerice(dynamoDbClient());
export default todoService;
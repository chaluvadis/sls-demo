import { DocumentClient } from "aws-sdk/clients/dynamodb";
const dynamoDbClient = (): DocumentClient => {
    if (process.env.IS_OFFLINE) {
        return new DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:5000",
        });
    }
    return new DocumentClient();
};
export default dynamoDbClient;
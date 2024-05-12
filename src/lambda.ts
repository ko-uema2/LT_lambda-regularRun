import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Context, ScheduledEvent } from "aws-lambda";

const dynamoDBDocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: "ap-northeast-1" })
);

export const handler = async (event: ScheduledEvent, context: Context) => {
  // output the event object to CloudWatch Logs
  console.trace(event);

  // get the event run time
  const now = new Date(event.time);
  // fortmat the date
  const formattedDate = now.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  console.error(`${formattedDate}: hello, world!`);
  console.info(`${formattedDate}: hello, world!`);
  console.warn(`${formattedDate}: hello, world!`);
  console.debug(`${formattedDate}: hello, world!`);

  try {
    // put an item to the DynamoDB table
    await dynamoDBDocumentClient.send(
      new PutCommand({
        TableName: "LambdaRegularRunTable",
        Item: {
          id: now.getTime().toString(),
          message: "hello, world!",
        },
      })
    );
  } catch (error: unknown) {
    // output the error object to CloudWatch Logs
    if (error instanceof Error) {
      console.error(`${formattedDate}: ${error}`);
    } else {
      console.error(`${formattedDate}: unknown error`);
    }
  }
};

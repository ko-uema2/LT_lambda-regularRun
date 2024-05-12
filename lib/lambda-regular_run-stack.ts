import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaRegularRunStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // lambda実行用のIAMロール
    const executionLambdaRole = new cdk.aws_iam.Role(
      this,
      "executionLambdaRole",
      {
        roleName: "LambdaRegularRun-executionRole",
        assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
        managedPolicies: [
          cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
            "CloudWatchLogsFullAccess"
          ),
        ],
      }
    );

    // 実行するlambda関数の定義
    const lambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "main-handler",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
        entry: "src/lambda.ts",
        role: executionLambdaRole,
        architecture: cdk.aws_lambda.Architecture.ARM_64,
        loggingFormat: cdk.aws_lambda.LoggingFormat.JSON,
        systemLogLevel: cdk.aws_lambda.SystemLogLevel.INFO,
        applicationLogLevel: cdk.aws_lambda.ApplicationLogLevel.INFO,
        timeout: cdk.Duration.seconds(30),
      }
    );

    lambda.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ["dynamodb:PutItem"],
        resources: [
          cdk.Fn.sub(
            "arn:aws:dynamodb:${AWS::Region}:${AWS::AccountId}:table/LambdaRegularRunTable"
          ),
        ],
      })
    );

    // EventBridgeでlambdaを定期実行
    new cdk.aws_events.Rule(this, "Schedule", {
      // schedule: cdk.aws_events.Schedule.expression("cron(0 23 ? * SUN *)"), // every monday 8:00 AM JST
      schedule: cdk.aws_events.Schedule.rate(cdk.Duration.seconds(60)),
      targets: [new cdk.aws_events_targets.LambdaFunction(lambda)],
    });

    // DynamoDBテーブルの作成
    new cdk.aws_dynamodb.TableV2(this, "LambdaRegularRunTable", {
      partitionKey: { name: "id", type: cdk.aws_dynamodb.AttributeType.STRING },
      tableName: "LambdaRegularRunTable",
      billing: cdk.aws_dynamodb.Billing.onDemand(),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}

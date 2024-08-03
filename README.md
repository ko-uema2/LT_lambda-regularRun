# 全体像

# 前提条件

- 使用言語： JavaScript (コンソール)・TypeScript (CDK)
- 実行環境： Node.js 20.x
- AWS アカウント： 作成済み
- 操作はすべて AWS コンソール上で行う

# やることサマリ (day 1)

1. `AWS Lambda` リソースを作成する
2. 作成したリソースを使って、コンソールログを出力するコードを実装する
3. 実装したコードをテスト実行する
4. 出力されたコンソールログを `Amazon CloudWatch Logs` で確認する
5. 1 分に 1 回 lambda 関数をトリガーする `Amazon EventBridge` ルールを作成する

# やることサマリ (day 2)

1. コンソール画面で `Lambda` 関数を作成する
2. コンソールログが `CloudWatch Logs` に出力されることを確認する
3. `DynamoDB` へアイテムを追加するコードを実装する
4. テスト実行
5. `AccessDeniedException` が発生することを確認する
6. `Lambda` に `DynamoDB` のアクセス権限を付与する
7. 再度テスト実行
8. `DynamoDB` にアイテムが追加されたことを確認する
9. `EventBridge` で `Lambda` をトリガーするルールを作成する
10. 今回新規作成した `IAM` ロールを確認する
11. 1 分に 1 回 `Lambda` が実行され、`DynamoDB` にアイテムが追加されることを確認する

# 手順詳細

本項目では、上記のサマリに沿って、各手順に関連する公式ドキュメントへのリンクを記載します。

_公式ドキュメントを読めばまあ大体のことが解決するんですが、ピンポイントに欲しい箇所を探し出すのが難しく感じます。。  
そのため、一度参照したドキュメントは記録しておくのが個人的にオススメです！_

## 1. `AWS Lambda` リソースを作成する

[Node.js の初期化](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-nodejs.html#nodejs-initialization)

[Node.js による Lambda 関数の構築](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-nodejs.html)

[Lambda 命令セットアーキテクチャ (ARM/x86)](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/foundation-arch.html)

[Lambda ランタイム](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-runtimes.html)

## 2. 作成したリソースを使って、コンソールログを出力するコードを実装する

[Node.js の AWS Lambda 関数ログ作成](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/nodejs-logging.html)

## 3. 実装したコードをテスト実行する

[コンソールでの Lambda 関数のテスト](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/testing-functions.html)

[Using AWS Lambda with Amazon EventBridge (CloudWatch Events)](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents.html)

[Interface ScheduledEvent\<TDetail\>](https://typestrong.org/typedoc-auto-docs/_types_aws-lambda/interfaces/ScheduledEvent.html)

## 4. 出力されたコンソールログを `Amazon CloudWatch Logs` で確認する

[AWS Lambda での Amazon CloudWatch ログの使用](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/monitoring-cloudwatchlogs.html#monitoring-cloudwatchlogs-advanced)

## 5. 1 分に 1 回 lambda 関数をトリガーする `Amazon EventBridge` ルールを作成する

[スケジュールに従って実行する Amazon EventBridge ルールの作成](https://docs.aws.amazon.com/ja_jp/eventbridge/latest/userguide/eb-create-rule-schedule.html)

[cron 式のリファレンス](https://docs.aws.amazon.com/ja_jp/eventbridge/latest/userguide/eb-cron-expressions.html)

[rate 式のリファレンス](https://docs.aws.amazon.com/ja_jp/eventbridge/latest/userguide/eb-rate-expressions.html)

## 6. (時間があれば) lambda 関数から `Amazon DynamoDB` にデータを保存する

[チュートリアル: Lambda と DynamoDB を使用した CRUD API の構築](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/http-api-dynamo-db.html)

[ランタイムに含まれる SDK バージョン](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-nodejs.html#nodejs-sdk-included)

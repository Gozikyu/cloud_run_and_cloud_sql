GCP サービスの理解の勉強用

Cloud SQL(MySQL)に登録されたデータを Cloud Run 上の backend(Express) が取得し、Cloud Run 上の frontend(React) に渡す

※frontend から新たなデータ追加もやりたいが現状取得のみ

## 事前準備

- GCP プロジェクトを作成しておく

- Cloud SQL で MySQL の DB を作成する

- DB にデータを追加する

`今回はentriesというテーブルに entryID, guestName, content というカラムを持つレコードを追加`

- Cloud Run（Express）のデプロイ

`backendディレクトリに移動して glcloud run deploy`

- GCP Console 上で Cloud Run（Express）の`Cloud SQL 接続` で接続先の DB を指定する

- Cloud Run（React）のデプロイ

`frontendディレクトリに移動して glcloud run deploy`

## 動作確認

- Cloud Run（React）のデプロイ先 URL で DB に登録したデータが表示されていることを確認

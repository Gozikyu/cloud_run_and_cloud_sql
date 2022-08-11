# cloud_tasks_and_cloud_run

Cloud Tasks に入れたジョブが Cloud Run で処理されることを確認するミニマム構成

## 事前準備

- GCP プロジェクトを作成しておく

- cloud task キューを作成する

`gcloud tasks queues create ${キューの名前}`

- キューが作成されたか確認

`gcloud tasks queues describe ${キューの名前}`

- Cloud Run のデプロイ

`gcloud run deploy`

## 動作確認

- Cloud Tasks にジョブを追加

`gcloud tasks create-http-task --queue=${キューの名前} --url=${Cloud Runのurl}/tasks --header=content-type:application/json --body-content='${リクエストボディのJSON}}'`

- Cloud Tasks のログを確認

- Cloud Run のログを確認

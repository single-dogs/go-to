# goto server

## 构建

```shell
cd ${workspace}/server; npm run build
```

做了什么？

将 `src` 下的 `*.ts` 编译到 `dist` 下，见 `./tsconfig.json`。

## 配置

server 启动时会读 `${workspace}/src/config.ts` 文件，来确定端口号、MongoDB url string 等内容。

该配置文件会从环境变量中读取对应值，环境变量列表见下节，它们都会在 `${workspace}/docker-compose.yaml` 中被手动指定。

## 运行

使用 `docker-compose` 或 `docker compose`。

```shell
docker-compose -f ${workspace}/server/docker-compose.yaml
```

## server environment

| name           | default                      | description        |
| -------------- | ---------------------------- | ------------------ |
| GOTO\_PORT     | 8080                         | 服务器端口              |
| GOTO\_MONGOURL | mongodb://MongoDB:27017/goto | MongoDB url string |



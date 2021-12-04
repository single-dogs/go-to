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

## server environment

| name                      | default                                                      | description                |
| ------------------------- | ------------------------------------------------------------ | -------------------------- |
| GOTO\_PORT                | 8080                                                         | 服务器端口                 |
| GOTO\_MONGOURL            | mongodb://MongoDB:27017/goto                                 | MongoDB url string         |
| GOTO\_GOTO_JWT_SECRET     | $2a$10$276IoZRSc9mue9037dn4JOMLBY1aGPnfP.fGaREwD14q3VcUwSCk6 | Json Web Token private key |
| GOTO\_GOTO_JWT_EXPIRATION | 1h                                                           | Json Web Token Expiration  |

## 运行

使用 `docker-compose` 或 `docker compose`。

```shell
docker-compose -f ${workspace}/server/docker-compose.yaml up
```

或：

```shell
${workspace}/server/cli/run.sh
```

## debug

请使用 `${workspace}/server/cli`  目录下的脚本，见 `${workspace}/server/cli/README.md`。

## attach debugger server

使用 `${workspace}/.vscode/launch.json` 中的 debug 配置进行调试即可，它可以作为客户端通过 Websocket 连接到 9229 端口下开放的 debugger server 服务。

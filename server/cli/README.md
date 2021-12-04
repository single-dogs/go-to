# CLI

## debug

使用 `debug-host.sh` 或 `debug-docker.sh`，

- 前者在 docker 中启动 MongoDB，服务端将运行在本地环境
- 后者全部跑在 docker 中

然后使用 `${workspace}/.vscode/launch.json` 的 debug 配置进行 debug 即可。

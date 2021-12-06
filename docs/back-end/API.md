# API docs

```ts
interface Response {
  code: 0 | 1;
  message: string;
  data: Data | null;
}
```

## User

### 注册

| POST /user |         |        |
| ---------- | ------- | ------ |
| username   | !string | 用户名 |
| password   | !string | 密码   |

响应

```ts
interface Data {
  _id: string;
  username: string;
}
```

### 更新

> 需要在请求头携带 token
>
> Authorization: Bearer {token}

| PUT /user   |         |          |
| ----------- | ------- | -------- |
| oldPassword | !string | 旧密码   |
| newUsername | string  | 新用户名 |
| newPassword | string  | 新密码   |

响应

```ts
interface Data {
  _id: string;
  username: string;
}
```

### 查询

| GET /user |        |          |
| --------- | ------ | -------- |
| _id       | string | 用户 _id |
| username  | string | 用户名   |

响应

```ts
interface Data {
  _id: string;
  username: string;
}
```

### 查询多个

| GET /users |          |          |
| ---------- | -------- | -------- |
| _ids       | string[] | 用户 _id |
| Usernames  | string[] | 用户名   |

响应

```ts
interface Data {
    _idMap: {
        [_id: string]: {
            _id: string, username: string
        } | null
    } | null,
    usernameMap: {
        [username: string]: {
            _id: string, username: string
        } | null
    } | null
}
```



### 登录

| POST /login |         |        |
| ----------- | ------- | ------ |
| username    | !string | 用户名 |
| password    | !string | 密码   |

响应

```ts
interface Data {
  userinfo: {
    _id: string;
    username: string;
  };
  token: string;
}
```


---
title: goto v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

# goto

> v1.0.0

# 用户

## POST 查询多个用户

POST /queryUsers

提供哪个参数，返回对应的 map，记录不存在的项存在且为 null，细节看用例。

> Body 请求参数

```json
{
  "type": "object",
  "properties": {
    "usernames": {
      "type": "array",
      "items": {
        "type": [
          "string",
          "null"
        ]
      },
      "nullable": true
    },
    "_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "nullable": true
    }
  },
  "required": [
    "usernames",
    "_ids"
  ]
}
```

### 请求参数

| 名称        | 位置 | 类型               | 必选  | 说明 |
| ----------- | ---- | ------------------ | ----- | ---- |
| body        | body | object             | false | none |
| » usernames | body | [string,null]¦null | true  | none |
| » _ids      | body | [string]¦null      | true  | none |

> 返回示例

> 成功

```json
{
  "code": 0,
  "message": "查询成功",
  "data": {
    "_idMap": {
      "61cc76c8976eb4f808deb175": {
        "_id": "61cc76c8976eb4f808deb175",
        "username": "gaolihai"
      }
    },
    "usernameMap": {
      "queuecat": {
        "_id": "61cc760c976eb4f808deb174",
        "username": "queuecat"
      }
    }
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 注册用户

POST /register

username 3 - 30 字符
password 8 - 30 字符

> Body 请求参数

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "title": "用户名",
      "description": "长度 3 - 30"
    },
    "password": {
      "type": "string",
      "title": "密码",
      "description": "长度 8 - 30"
    }
  },
  "required": [
    "username",
    "password"
  ]
}
```

### 请求参数

| 名称       | 位置 | 类型   | 必选  | 说明        |
| ---------- | ---- | ------ | ----- | ----------- |
| body       | body | object | false | none        |
| » username | body | string | true  | 长度 3 - 30 |
| » password | body | string | true  | 长度 8 - 30 |

> 返回示例

> 成功

```json
{
  "code": 0,
  "message": "注册成功",
  "data": {
    "_id": "61cc7da54c35a1af28d7b872",
    "username": "gaolihai"
  }
}
```

```json
{
  "code": 1,
  "message": "用户名已存在",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 登录用户

POST /login

> Body 请求参数

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string"
    },
    "password": {
      "type": "string"
    }
  },
  "required": [
    "username",
    "password"
  ]
}
```

### 请求参数

| 名称       | 位置 | 类型   | 必选  | 说明 |
| ---------- | ---- | ------ | ----- | ---- |
| body       | body | object | false | none |
| » username | body | string | true  | none |
| » password | body | string | true  | none |

> 返回示例

> 成功

```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "userinfo": {
      "username": "gaolihai",
      "_id": "61cc76c8976eb4f808deb175"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaW5mbyI6eyJfaWQiOiI2MWNjNzZjODk3NmViNGY4MDhkZWIxNzUiLCJ1c2VybmFtZSI6Imdhb2xpaGFpIiwicGFzc3dvcmQiOiJnYW9saWhhaSJ9LCJpYXQiOjE2NDA3OTEzOTEsImV4cCI6MTY0MzM4MzM5MX0.x9ulqSkMneasq1L02e99cVyddX0vR01QgcHLkzFOKyk"
  }
}
```

```json
{
  "code": 1,
  "message": "密码错误",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 查询用户

POST /queryUser

两参数二选一，都提供时优先使用 username 查询

> Body 请求参数

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "title": "用户名",
      "nullable": true
    },
    "_id": {
      "type": "string",
      "title": "用户唯一键",
      "nullable": true
    }
  },
  "required": [
    "username",
    "_id"
  ]
}
```

### 请求参数

| 名称       | 位置 | 类型        | 必选  | 说明 |
| ---------- | ---- | ----------- | ----- | ---- |
| body       | body | object      | false | none |
| » username | body | string¦null | true  | none |
| » _id      | body | string¦null | true  | none |

> 返回示例

> 成功

```json
{
  "code": 1,
  "message": "用户不存在",
  "data": null
}
```

```json
{
  "code": 0,
  "message": "查询成功",
  "data": {
    "_id": "61cc76c8976eb4f808deb175",
    "username": "gaolihai"
  }
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 更新用户

POST /updateUser

需要在请求头携带 POST /login 签发的 token，验证用户的 oldPassword，然后更新 username 和 password，newUsername 和 newPassword 可一并给出。

> Body 请求参数

```json
{
  "type": "object",
  "properties": {
    "oldPassword": {
      "type": "string"
    },
    "newUsername": {
      "type": "string",
      "nullable": true
    },
    "newPassword": {
      "type": "string",
      "nullable": true
    }
  },
  "required": [
    "oldPassword",
    "newPassword",
    "newUsername"
  ]
}
```

### 请求参数

| 名称          | 位置   | 类型        | 必选  | 说明            |
| ------------- | ------ | ----------- | ----- | --------------- |
| Authorization | header | string      | false | login jwt token |
| body          | body   | object      | false | none            |
| » oldPassword | body   | string      | true  | none            |
| » newUsername | body   | string¦null | true  | none            |
| » newPassword | body   | string¦null | true  | none            |

> 返回示例

> 成功

```json
{
  "code": 0,
  "message": "更新成功",
  "data": {
    "_id": "61cc76c8976eb4f808deb175",
    "username": "gaolihai"
  }
}
```

```json
{
  "code": 1,
  "message": "Token 无效"
}
```

```json
{
  "code": 1,
  "message": "登录信息失效",
  "data": null
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

# 数据模型

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "description": "BSON"
    },
    "username": {
      "type": "string"
    },
    "hashedPassword": {
      "type": "string"
    }
  },
  "required": [
    "_id",
    "username",
    "hashedPassword"
  ],
  "x-apifox-folder": ""
}

```

### 属性

| 名称           | 类型   | 必选 | 约束 | 说明 |
| -------------- | ------ | ---- | ---- | ---- |
| _id            | string | true | none | BSON |
| username       | string | true | none | none |
| hashedPassword | string | true | none | none |


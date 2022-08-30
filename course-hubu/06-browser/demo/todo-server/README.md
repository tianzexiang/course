# Todo Server 说明

该服务仅用作于作业对接，不可用于实际生产开发。

## 运行

```bash
node server.js
```

> 该服务监听 3280 端口

## API

### `/api/create` 创建 Todo

method: `POST`

参数说明

| 名称    | 类型   | 是否必填 | 说明      |
| ------- | ------ | -------- | --------- |
| content | string | 必填     | Todo 内容 |

返回值说明

| 名称 | 类型   | 说明           |
| ---- | ------ | -------------- |
| stat | string | 返回 ok 为正常 |
| msg  | string | 信息说明       |

### `/api/list` 获取所有 todo

method: `POST`

参数说明

`无`

返回值说明

| 名称 | 类型   | 说明           |
| ---- | ------ | -------------- |
| stat | string | 返回 ok 为正常 |
| data | todo[] | todo 的数组    |

### `/api/done` 完成一个 todo

method: `POST`

参数说明

| 名称 | 类型   | 是否必填 | 说明       |
| ---- | ------ | -------- | ---------- |
| id   | string | 必填     | todo 的 id |

返回值说明

| 名称 | 类型   | 说明           |
| ---- | ------ | -------------- |
| stat | string | 返回 ok 为正常 |
| msg  | string | 信息说明       |

### `/api/cancel` 取消完成

method: `POST`

参数说明

| 名称 | 类型   | 是否必填 | 说明       |
| ---- | ------ | -------- | ---------- |
| id   | string | 必填     | todo 的 id |

返回值说明

| 名称 | 类型   | 说明           |
| ---- | ------ | -------------- |
| stat | string | 返回 ok 为正常 |
| msg  | string | 信息说明       |

### `/api/delete` 删除一个 todo

method: `POST`

参数说明

| 名称 | 类型   | 是否必填 | 说明       |
| ---- | ------ | -------- | ---------- |
| id   | string | 必填     | todo 的 id |

返回值说明

| 名称 | 类型   | 说明           |
| ---- | ------ | -------------- |
| stat | string | 返回 ok 为正常 |
| msg  | string | 信息说明       |

# AUTH
**Prefix：**

`'/api/auth'`

### 微信授权

**简介：**

获取微信授权地址

**接口地址：**

`/wx_auth`

**请求方法：**

`GET`

**请求参数：**

空

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| url   | string     |微信授权地址|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "url": "https://..."
    }
}
```

### 注册

**简介：**

通过openid和微信获取的微信昵称与头像注册

**接口地址：**

`/register`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| userId   | 是     |用户唯一id|
| avatar   | 是     |头像url|
| nickname   | 是     |昵称|
| openId   | 是     |用户微信openid|

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| id   | string     |数据库ObjectId|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "id": "..."
    }
}
```

### 微信登录

**简介：**

通过微信第三方登录

**接口地址：**

`/wx_login`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| openId   | 否     |用户微信openid|
| code   | 否     |微信临时授权code，只可使用一次|

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| isRegistered   | boolean     |是否注册|
| openId?   | string     |用户微信openid|
| nickname?   | string     |昵称url|
| avatar?   | string     |头像url|

**返回示例：**

```json
// 未注册
{
    "status": 200,
    "code": 0,
    "data": {
        "isRegistered": false,
        "nickname": "",
        "avatar": "",
        "openId": ""
    }
}

// 已注册
{
    "status": 200,
    "code": 0,
    "data": {
        "isRegistered": true
    }
}
```



# USER
**Prefix：**

`'/api/user'`

### 获取用户信息

**简介：**

获取登录用户或他人用户信息

**接口地址：**

`/get_info/:id`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id   | 否     |他人userId|

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| _id   | string     |ObjectId|
| openId   | string     |微信openid|
| userId   | string     |用户唯一id|
| avatar   | string     |头像url|
| nickname   | string     |昵称|
| banner   | string     |个人首页背景图|
| bio   | string     |个人简介|
| createdAt   | number     |创建时间|
| status   | number     |状态|
| hasFollowed   | number     |登录用户是否关注该用户，如果是自己则默认false|
| followCounts   | number     |我的关注人数|
| subscribeCounts   | number     |关注我的人数|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "_id": "62fbaeafc88a1faf19e1c068",
        "openId": "ogeuN54_V7b53239svqAYRgE4Yvo",
        "userId": "@gogogo",
        "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660804323709.png",
        "nickname": "test",
        "banner": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660794457635.png",
        "bio": "testhhh",
        "createdAt": 1660661423792,
        "status": 1,
        "hasFollowed": false,
        "followCounts": 3,
        "subscribeCounts": 3
    }
}
```

### 设置用户信息

**简介：**

设置登录用户信息

**接口地址：**

`/set_info`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| avatar   | 否     |头像url|
| nickname   | 否     |昵称|
| banner   | 否     |个人首页背景图|
| bio   | 否     |个人简介|


**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| _id   | string     |ObjectId|
| openId   | string     |微信openid|
| userId   | string     |用户唯一id|
| avatar   | string     |头像url|
| nickname   | string     |昵称|
| banner   | string     |个人首页背景图|
| bio   | string     |个人简介|
| createdAt   | number     |创建时间|
| status   | number     |状态|
| hasFollowed   | number     |登录用户是否关注该用户，如果是自己则默认false|
| followCounts   | number     |我的关注人数|
| subscribeCounts   | number     |关注我的人数|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "_id": "62fbaeafc88a1faf19e1c068",
        "openId": "ogeuN54_V7b53239svqAYRgE4Yvo",
        "userId": "@gogogo",
        "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660804323709.png",
        "nickname": "test",
        "banner": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660794457635.png",
        "bio": "testhhh",
        "createdAt": 1660661423792,
        "status": 1,
        "hasFollowed": false,
        "followCounts": 3,
        "subscribeCounts": 3
    }
}
```

### 关注

**简介：**

关注用户

**接口地址：**

`/follow`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| userId   | 是     |用户唯一id|


**返回结果：**

无

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
}
```

### 取消关注

**简介：**

取关用户

**接口地址：**

`/unfollow`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| userId   | 是     |用户唯一id|


**返回结果：**

无

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
}
```

### 获取所有我的关注的用户信息

**简介：**

获取登录用户或他人我的关注用户信息

**接口地址：**

`/get_follows/:id&limit=&next=`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id   | 否     |用户唯一id|
| limit   | 否     |每次拉取条数|
| next   | 否     |每次拉取的最后一条数据的ObjectId|


**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| items   | IUserFollowItemResp[]     |用户信息数组|
| hasNext   | boolean     |是否还有|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62ff3fb3617c70ecd884f96f",
                "userId": "@记录的秃头线",
                "followId": "@St2eam",
                "createdAt": 1660895155854,
                "hasFollowed": true,
                "user": {
                    "_id": "62f1b2c15eb7092532437691",
                    "openId": "ogeuN53XRtj7HYwt34Hyjj0ElhVA",
                    "userId": "@St2eam",
                    "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660894629713.png",
                    "nickname": "stream",
                    "banner": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660794473792.png",
                    "bio": "",
                    "createdAt": "1660007105354",
                    "status": 1
                }
            }
        ],
        "hasNext": true
    }
}
```

### 获取所有关注者（关注我的）的用户信息

**简介：**

获取登录用户或他人关注者的用户信息

**接口地址：**

`/get_subscribes/:id&limit=&next=`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id   | 否     |用户唯一id|
| limit   | 否     |每次拉取条数|
| next   | 否     |每次拉取的最后一条数据的ObjectId|


**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| items   | IUserFollowItemResp[]     |用户信息数组|
| hasNext   | boolean     |是否还有|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62ff36443abaae2d87fa3e53",
                "userId": "@hyh",
                "followId": "@记录的秃头线",
                "createdAt": 1660892740286,
                "hasFollowed": true,
                "user": {
                    "_id": "62fda72ad15ce9ae9a05489c",
                    "openId": "ogeuN54TSKveIXoFsFTGLuL0ylz0",
                    "userId": "@hyh",
                    "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/rW1NR5UF6KVibEMGaxqpGaySNDP9EArCEkcDpQibNkucJCmapEv7Kianf8xccvlN0KQ0IlUUiba4pqbd7F9LREXP4Q/132",
                    "nickname": "贺山",
                    "banner": "",
                    "bio": "",
                    "createdAt": 1660790570263,
                    "status": 1
                }
            }
        ],
        "hasNext": true
    }
}
```

### 获取个人首页帖子列表

**简介：**

获取登录用户或他人个人首页自己的帖子

**接口地址：**

`/get_post/:id&limit=&next=`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id   | 否     |用户唯一id|
| limit   | 否     |每次拉取条数|
| next   | 否     |每次拉取的最后一条数据的ObjectId|


**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| items   | IPostItem[]     |用户信息数组|
| hasNext   | boolean     |是否还有|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62ff37dc3abaae2d87fa3e68",
                "userId": "@记录的秃头线",
                "relationId": "62ff37cf3abaae2d87fa3e67",
                "type": 2,
                "imgs": [],
                "content": "啊这",
                "likes": 0,
                "comments": 0,
                "forwards": 0,
                "createdAt": 1660893148032,
                "user": {
                    "userId": "@记录的秃头线",
                    "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660804323709.png",
                    "nickname": "test"
                },
                "relate": {
                    "post": [
                        {
                            "_id": "62ff37cf3abaae2d87fa3e67",
                            "userId": "@St2eam",
                            "relationId": null,
                            "type": 1,
                            "imgs": [
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660893135053.jpeg"
                            ],
                            "content": "哈哈",
                            "likes": 0,
                            "comments": 5,
                            "forwards": 0,
                            "createdAt": 1660893135105
                        }
                    ],
                    "user": [
                        {
                            "userId": "@St2eam",
                            "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660894629713.png",
                            "nickname": "stream"
                        }
                    ]
                },
                "isLike": false
            }
        ],
        "hasNext": true
    }
}
```

### 获取个人首页带照片帖子列表

**简介：**

获取登录用户或他人个人首页自己的带照片帖子

**接口地址：**

`/get_img_post/:id&limit=&next=`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id   | 否     |用户唯一id|
| limit   | 否     |每次拉取条数|
| next   | 否     |每次拉取的最后一条数据的ObjectId|


**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| items   | IPostItem[]     |用户信息数组|
| hasNext   | boolean     |是否还有|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62ff37dc3abaae2d87fa3e68",
                "userId": "@记录的秃头线",
                "relationId": "62ff37cf3abaae2d87fa3e67",
                "type": 2,
                "imgs": ["https://..."],
                "content": "啊这",
                "likes": 0,
                "comments": 0,
                "forwards": 0,
                "createdAt": 1660893148032,
                "user": {
                    "userId": "@记录的秃头线",
                    "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660804323709.png",
                    "nickname": "test"
                },
                "relate": {
                    "post": [
                        {
                            "_id": "62ff37cf3abaae2d87fa3e67",
                            "userId": "@St2eam",
                            "relationId": null,
                            "type": 1,
                            "imgs": [
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660893135053.jpeg"
                            ],
                            "content": "哈哈",
                            "likes": 0,
                            "comments": 5,
                            "forwards": 0,
                            "createdAt": 1660893135105
                        }
                    ],
                    "user": [
                        {
                            "userId": "@St2eam",
                            "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660894629713.png",
                            "nickname": "stream"
                        }
                    ]
                },
                "isLike": false
            }
        ],
        "hasNext": true
    }
}
```

### 获取个人首页喜欢列表

**简介：**

获取登录用户或他人个人首页自己喜欢的帖子或评论

**接口地址：**

`/get_post_like/:id&limit=&next=`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id   | 否     |用户唯一id|
| limit   | 否     |每次拉取条数|
| next   | 否     |每次拉取的最后一条数据的ObjectId|


**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| items   | IPostItem[]     |用户信息数组|
| hasNext   | boolean     |是否还有|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62ff35953abaae2d87fa3e27",
                "userId": "@记录的秃头线",
                "relationId": "62fddd5727f39a0c794643d2",
                "type": 2,
                "imgs": [],
                "content": "好图，多来点",
                "likes": 2,
                "comments": 0,
                "forwards": 0,
                "createdAt": 1660892565915,
                "relate": {
                    "post": [
                        {
                            "_id": "62fddd5727f39a0c794643d2",
                            "userId": "@St2eam",
                            "relationId": null,
                            "type": 1,
                            "imgs": [
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660804439035.jpg"
                            ],
                            "content": "3m",
                            "likes": 1,
                            "comments": 1,
                            "forwards": 0,
                            "createdAt": 1660804439093
                        }
                    ],
                    "user": [
                        {
                            "userId": "@St2eam",
                            "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660894629713.png",
                            "nickname": "stream"
                        }
                    ]
                },
                "user": {
                    "userId": "@记录的秃头线",
                    "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660804323709.png",
                    "nickname": "test"
                },
                "likePosts": {
                    "_id": "62ff36eb3abaae2d87fa3e64",
                    "postId": "62ff35953abaae2d87fa3e27",
                    "userId": "@记录的秃头线",
                    "createdAt": 1660892907438
                },
                "isLike": true
            }
        ],
        "hasNext": true
    }
}
```

# POST
**Prefix：**

`'/api/post'`

### 获取首页文章列表

**简介：**

获取首页文章列表，包括用户关注以及自己发的帖子

**接口地址：**

`'/get_follow_post'`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| next?     | 否     | 从`id`为`next`的帖子开始获取数据     |
| limit?     | 否    | 获取`limit`长度的数据  |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data     | IPostItemResp:{items,hasNext} ||
| items     | IPostItem[] |数据数组|
| hasNext     | boolean |是否还有下一条数据|
| \_id     |  string |帖子的\_id|
| userId     |  string |发帖者id|
| relationId     |  string |关联贴\_id|
| type     |  EPostType |帖子类型：帖子、评论、转发以及删除|
| imgs     |  string[] |帖子图片内容|
| content     |  string |帖子正文内容|
| likes     |  number |点赞数|
| comments     |  number |评论数|
| forwards     |  number |转发数|
| isLike     |  boolean |是否点赞该帖|
| createdAt     |  number |创建时间Date.now()|
| user.userId     |  number |该贴的发帖者的userId|
| user.avatar     |  number |该贴的发帖者的头像|
| user.nickname     |  number |该贴的发帖者的昵称|
| relate.post[0]     |  IPostItem |关联的帖子的信息|
| relate.user[0]     |  {userId,avatar,nickname} |关联的帖子的发帖者信息|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62fe605b5ad67f8d7c499193",
                "userId": "@gogogo",
                "relationId": null,
                "type": 1,
                "imgs": [],
                "content": "62ed3f0266c51c877665aa8f",
                "likes": 0,
                "comments": 0,
                "forwards": 0,
                "createdAt": 1660837979261,
                "user": {
                    "userId": "@gogogo",
                    "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660538049735.png",
                    "nickname": "gogogo"
                },
                "relate": {
                    "post": [],
                    "user": []
                },
                "isLike": false
            }...
        ],
        "hasNext": true
    }
}
```


### 获取文章详情

**简介：**

获取文章详情

如果帖子类型为Post则返回帖子原本的信息以及评论的信息。

如果帖子类型为Comment则返回帖子原本的信息和它评论的那一条帖子的信息以及它自身的评论的信息。

如果帖子类型为Forward则返回帖子原本的信息和它转发的那一条帖子的信息以及它自身的评论的信息。

**接口地址：**

`'/get_post_detail'`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| \_id     | 是     | 帖子的\_id     |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data     | IPostDetailResp:{post,comments} ||
| post     | IPostItem |帖子详情|
| comments     | IPostItem[] |评论详情|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "post": {
            "_id": "62fdf2a2ff1ed851f96958bb",
            "userId": "@gogogo",
            "relationId": "62fdf2a1ff1ed851f96958b9",
            "type": 3,
            "imgs": [],
            "content": "测试转发",
            "likes": 0,
            "comments": 0,
            "forwards": 0,
            "createdAt": 1660809890006,
            "relate": {
                "post": [
                    {
                        "_id": "62fdf2a1ff1ed851f96958b9",
                        "userId": "@gogogo",
                        "relationId": null,
                        "type": 4,
                        "imgs": [],
                        "content": "测试帖子",
                        "likes": 0,
                        "comments": 1,
                        "forwards": 1,
                        "createdAt": 1660809889974
                    }
                ],
                "user": [
                    {
                        "userId": "@gogogo",
                        "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660538049735.png",
                        "nickname": "gogogo"
                    }
                ]
            },
            "user": {
                "userId": "@gogogo",
                "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660538049735.png",
                "nickname": "gogogo"
            },
            "isLike": false
        },
        "comments": []
    }
}
```

### 创建帖子

**简介：**

用户创建新帖

**接口地址：**

`'/create_post'`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| content     | 是     | 文章正文内容     |
| imgs     | 是     | 文章图片内容，可以为空数组，但必须要有     |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data     | string     |新建的帖子的\_id |

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": "62fe605b5ad67f8d7c499193"
}
```

### 创建评论

**简介：**

用户创建评论，需要多传入一个relationId

**接口地址：**

`'/create_comment'`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| content     | 是     | 文章正文内容     |
| imgs     | 是     | 文章图片内容，可以为空数组，但必须要有     |
| relationId     | 是     | 评论所属原帖的\_id|

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data     | string     |新建的评论的\_id |

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": "62fe605b5ad67f8d7c499193"
}
```

### 创建转发

**简介：**

用户创建转发，需要多传入一个relationId

**接口地址：**

`'/create_forward'`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| content     | 是     | 文章正文内容     |
| imgs     | 是     | 文章图片内容，可以为空数组，但必须要有     |
| relationId     | 是     | 转发所属原帖的\_id|

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data     | string     |新建的转发的\_id |

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": "62fe605b5ad67f8d7c499193"
}
```

### 点赞

**简介：**

用户给文章点赞

**接口地址：**

`'/thumbs_up'`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| \_id     | 是     | 点赞帖子的\_id     |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|

**返回示例：**

```json
{
    "status": 200,
    "code": 0
}
```

### 取消点赞

**简介：**

用户给文章取消点赞

**接口地址：**

`'/cancel_thumbs_up'`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| \_id     | 是     | 取消点赞帖子的\_id     |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|

**返回示例：**

```json
{
    "status": 200,
    "code": 0
}
```

### 删除帖子

**简介：**

用户删除文章（软删除），同时删除底下的评论（硬删除）

**接口地址：**

`'/delete'`

**请求方法：**

`POST`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| \_id     | 是     | 删除帖子的\_id     |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|

**返回示例：**

```json
{
    "status": 200,
    "code": 0
}
```
# SEARCH
**Prefix：**

`'/api/search'`

### 搜索帖子

**简介：**

搜索帖子，获取列表

**接口地址：**

`'/post'`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| keyword     | 是     | 搜索关键字     |
| next     | 否     | 从`id`为`next`的帖子开始获取数据     |
| limit     | 否    | 获取`limit`长度的数据  |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data     | IPostItemResp:{items,hasNext} ||
| items     | IPostItem[] |数据数组|
| hasNext     | boolean |是否还有下一条数据|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62fe0330f3d3534ed33b4801",
                "userId": "@St2eam",
                "relationId": "62fe02def3d3534ed33b4800",
                "type": 3,
                "imgs": [
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814127362.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814127617.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814127680.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814127947.jpg"
                ],
                "content": "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                "likes": 0,
                "comments": 2,
                "forwards": 0,
                "createdAt": 1660814128003,
                "relate": {
                    "post": [
                        {
                            "_id": "62fe02def3d3534ed33b4800",
                            "userId": "@St2eam",
                            "relationId": "62fe00aff3d3534ed33b47ff",
                            "type": 3,
                            "imgs": [
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814046063.jpg",
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814046332.jpg",
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814046396.jpg"
                            ],
                            "content": "1231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232",
                            "likes": 0,
                            "comments": 0,
                            "forwards": 1,
                            "createdAt": 1660814046666
                        }
                    ],
                    "user": [
                        {
                            "userId": "@St2eam",
                            "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/lVBDQ6L9KymU7gQcbt1zbzxJRHN3MIu6ErROwTQaz45mT5wcDya2lkCtFkQtbw71jlkgd3BbWiav1bRETEJC6tA/132",
                            "nickname": "St2eam"
                        }
                    ]
                },
                "user": {
                    "userId": "@St2eam",
                    "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/lVBDQ6L9KymU7gQcbt1zbzxJRHN3MIu6ErROwTQaz45mT5wcDya2lkCtFkQtbw71jlkgd3BbWiav1bRETEJC6tA/132",
                    "nickname": "St2eam"
                }
            }...
        ],
        "hasNext": true
    }
}
```

### 搜索用户

**简介：**

搜索用户，获取列表

**接口地址：**

`'/user'`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| keyword     | 是     | 搜索关键字     |
| next     | 否     | 从`id`为`next`的帖子开始获取数据     |
| limit     | 否    | 获取`limit`长度的数据  |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data     | ISearchUserResp:{items,hasNext} ||
| items     | IUserInfoResp[] |数据数组|
| hasNext     | boolean |是否还有下一条数据|
| \_id     | string |用户的\_id|
| openId     | string |微信的openId|
| userId     | string |用户的userId，@xxx |
| avatar     | string |头像url|
| banner     | string |背景图url|
| bio     | string |个人简介|
| createdAt     | string |何时注册|
| status     | EUserStatus |用户状态：是否注销|
| hasFollowed     | boolean |是否已经关注|
| followCounts     | number |该用户关注的用户数|
| subscribeCounts     | number |该用户的订阅者数|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62fdf8c59842559b90436f49",
                "openId": "ogeuN54_V7bceshisvqAYRgE4Yvo",
                "userId": "@专业测试员",
                "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660642266225.png",
                "nickname": "专业测试员",
                "banner": "",
                "bio": "",
                "createdAt": 1659674899999,
                "status": 1,
                "hasFollowed": false,
                "followCounts": 0,
                "subscribeCounts": 0
            }
        ],
        "hasNext": false
    }
}
```

### 搜索带图片的帖子

**简介：**

搜索带图片的帖子，获取列表

**接口地址：**

`'/img'`

**请求方法：**

`GET`

**请求参数：**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| keyword     | 是     | 搜索关键字     |
| next     | 否     | 从`id`为`next`的帖子开始获取数据     |
| limit     | 否    | 获取`limit`长度的数据  |

**返回结果：**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data     | IPostItemResp:{items,hasNext} ||
| items     | IPostItem[] |数据数组|
| hasNext     | boolean |是否还有下一条数据|

**返回示例：**

```json
{
    "status": 200,
    "code": 0,
    "data": {
        "items": [
            {
                "_id": "62fe0330f3d3534ed33b4801",
                "userId": "@St2eam",
                "relationId": "62fe02def3d3534ed33b4800",
                "type": 3,
                "imgs": [
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814127362.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814127617.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814127680.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814127947.jpg"
                ],
                "content": "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                "likes": 0,
                "comments": 2,
                "forwards": 0,
                "createdAt": 1660814128003,
                "relate": {
                    "post": [
                        {
                            "_id": "62fe02def3d3534ed33b4800",
                            "userId": "@St2eam",
                            "relationId": "62fe00aff3d3534ed33b47ff",
                            "type": 3,
                            "imgs": [
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814046063.jpg",
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814046332.jpg",
                                "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660814046396.jpg"
                            ],
                            "content": "1231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232131311231231232",
                            "likes": 0,
                            "comments": 0,
                            "forwards": 1,
                            "createdAt": 1660814046666
                        }
                    ],
                    "user": [
                        {
                            "userId": "@St2eam",
                            "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/lVBDQ6L9KymU7gQcbt1zbzxJRHN3MIu6ErROwTQaz45mT5wcDya2lkCtFkQtbw71jlkgd3BbWiav1bRETEJC6tA/132",
                            "nickname": "St2eam"
                        }
                    ]
                },
                "user": {
                    "userId": "@St2eam",
                    "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/lVBDQ6L9KymU7gQcbt1zbzxJRHN3MIu6ErROwTQaz45mT5wcDya2lkCtFkQtbw71jlkgd3BbWiav1bRETEJC6tA/132",
                    "nickname": "St2eam"
                }
            },
            {
                "_id": "62fa17ef0a101558c645c33f",
                "userId": "@St2eam",
                "relationId": null,
                "type": 1,
                "imgs": [
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660557294636.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660557294892.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660557294960.jpg",
                    "http://feed13.oss-cn-hangzhou.aliyuncs.com/FeedApp1660557295209.jpg"
                ],
                "content": "12312345678901231234567890123123456789012312345678901231234567890123123456789012312345678901231234567890123123456789012312345678901231234567890123123456789012312345678901231234567890123123456789012312345678901231234567890123123456789012312345678901231234567890\n测试测试测试测试",
                "likes": 0,
                "comments": 1,
                "forwards": 0,
                "createdAt": 1660557295290,
                "relate": {
                    "post": [],
                    "user": []
                },
                "user": {
                    "userId": "@St2eam",
                    "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/lVBDQ6L9KymU7gQcbt1zbzxJRHN3MIu6ErROwTQaz45mT5wcDya2lkCtFkQtbw71jlkgd3BbWiav1bRETEJC6tA/132",
                    "nickname": "St2eam"
                }
            }
        ],
        "hasNext": false
    }
}
```

# DirectMsg
**Prefix：**

`'/api/direct_msg'`

###  获取私信页面与其它用户的会话列表

**简介**
返回指定数量的会话列表，每个列表包含了对方的昵称、头像、最近一条私信的类型、内容、发送时间，未读消息数量等内容

**接口地址**
`'/get_chat_item'`

**请求方法**
`GET`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| next     | 否     | 从`id`为`next`的会话列表后一条开始获取数据     |
| prev      | 否   | 获取`id`小于`prev`的前几条会话列表  |
| limit     | 否    | 获取`limit`长度的数据  |


**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
|data | IResChatItem:{chatItem,hasNext,hasPrev}||
| chatItem| IChatItem[] | 数据数组 |
|userId| string | 私信好友的唯一id |
|avatar | string | 私信好友的头像地址 |
|nickname | string | 私信好友的昵称 |
|status | EMsgStatus | 私信的状态:已读、未读、已删除 |
| lastMsg| string | 最近一条私信的内容 |
| lastSendTime | number  | 最近一条私信的发送时间 |
| lastMsgType |  EMsgType | 最近一条私信的类型：图片、文字 |
| lastMsgId |  string | 最近一条私信的id |
| unReadCount | number  | 和该私信好友的未读消息数量 |
| hasNext |  boolean | 是否还有更近的会话列表 |
| hasPrev |  boolean | 是否还有更久远的私信列表 |

**返回示例**
```json
{
    "status":200,
    "code":0,
    "data":{
        "chatItem":[
            {
                "userId":"@贺山",
                "avatar":"https://thirdwx.qlogo.cn/mmopen/vi_32/rW1NR5UF6KVibEMGaxqpGaySNDP9EArCEkcDpQibNkucJCmapEv7Kianf8xccvlN0KQ0IlUUiba4pqbd7F9LREXP4Q/132",
                "nickname":"贺山",
                "status":1,
                "lastMsg":"2222",
                "lastSendTime":1660900587118,
                "lastMsgType":1,
                "lastMsgId":"62ff54eb301596b978cf97f0",
                "unReadCount":0
            }
        ],
        "hasNext":false,
        "hasPrev":false}}

```

###  删除一个会话列表

**简介**
删除与一名用户的私信会话列表，并将和该用户的所有私信记录逻辑删除。

**接口地址**
`'/delete_chat_item'`

**请求方法**
`POST`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id     | 是     | 一名用户的id     |


**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|


###  获取和某个用户的私信记录

**简介**
获取和某个用户的私信记录，包括每条私信的类型、内容、发送时间、是谁发送的等信息

**接口地址**
`'/get_direct_msg'`

**请求方法**
`GET`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id     | 是     | 用户的id     |
| next     | 否     | 从`id`为`next`的私信后一条开始获取数据     |
| prev      | 否   | 获取`id`小于`prev`的前几条私信  |
| limit     | 否    | 获取`limit`长度的数据  |

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
|data |IResDirectMsg |  |
| msgList  | IDirectMsgItem[]  |   |
|  \_id | string  | 私信的唯一id  |
|  msgType | EMsgType  | 私信的类型：图片、文字  |
|  content | string  | 文字内容或者图片地址  |
| sendTime  | number  |  发送时间 |
| status |  EMsgStatus |  私信状态:已读、未读、已删除 |
| whoSendMsg | EWhoSendMsg  |  用来判断自己发送还是对方发送 |
| hasNext | boolean  |  是否还有更久远的私信 |
|  hasPrev | boolean   |  是否还有更近的私信  |
|  unReadCount | number   |  和该用户的未读消息数量  |



**返回示例**
```json
{
    "status":200,
    "code":0,
    "data":{
        "msgList":[
                    {
                        "_id":"6300522df2cf3cd10166dec5",
                        "msgType":1,
                        "content":"啊啊啊啊",
                        "sendTime":1660965421181,
                        "status":1,
                        "whoSendMsg":0
                    }
                ],
        "hasNext":false,
        "hasPrev":false,
        "unReadCount":0}}
```
###  获取和其它用户的所有未读私信条数

**简介**
轮询获取和所有用户的未读消息条数用于在TabBar提醒，可以传入一个用户的id，表示正在与一个用户进行私信从而不计算和该用户的未读消息数量

**接口地址**
`'/get_unread_count'`

**请求方法**
`GET`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id     | 否     | 正在私信的用户的id     |

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
|data | {unReadCount}||
|unReadCount|number|未读消息数量|


**返回示例**
```json
{
    "status":200,
    "code":0,
    "data":{
        "unReadCount":3
            }
}
```


###  创建一条私信

**简介**
当用户发送私信时会调用此接口，在数据库创建两条记录该私信信息的数据，创建两条是为单向删除服务，会返回属于自己的私信id，如果类型是图片，将会用本地图片地址渲染一次，防止图片还未上传服务器成功，提高用户体验。

**接口地址**
`'/create_direct_msg'`

**请求方法**
`POST`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| friendId    | 是     | 私信用户的id     |
| msgType| 是| 消息的类型|
| content| 是| 消息的内容 |

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
|data |string | 返回属于自己的新建的私信id |


**返回示例**
```json
{
    "status":200,
    "code":0,
    "data":"6300572ef2cf3cd10166dece"
}
```
###  单向删除一条私信

**简介**
删除一条私信，删除后该私信对自己不可见。

**接口地址**
`'/delete_direct_msg'`

**请求方法**
`POST`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id     | 是     | 私信的id     |

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|


###  将和某个用户的私信全部设为已读

**简介**
将和某个用户的未读私信状态全部置为已读

**接口地址**
`'/set_msg_read'`

**请求方法**
`POST`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id     | 是     | 用户的id     |

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|


###  将所有私信设为已读

**简介**
将和其它用户的所有未读状态私信设为已读

**接口地址**
`'/set_all_msg_read'`

**请求方法**
`POST`

**请求参数**
`无`

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|

###  获取和当前用户的未读消息

**简介**
进入和一名用户的私信时开启轮询，获取该用户新发的消息，用于渲染到页面

**接口地址**
`'/get_unread_msg_with_friend'`

**请求方法**
`POST`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id     | 是     | 当前正在私信用户的id     |

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
|data |{unReadMsg} ||
|  \_id | string  | 私信的唯一id  |
|  msgType | EMsgType  | 私信的类型：图片、文字  |
|  content | string  | 文字内容或者图片地址  |
| sendTime  | number  |  发送时间 |
| status |  EMsgStatus |  私信状态:已读、未读、已删除 |
| whoSendMsg | EWhoSendMsg  |  用来判断自己发送还是对方发送 |


**返回示例**
```json
{
    "status":200,
    "code":0,
    "data":{
        "unReadMsg":[
            {
                "_id":"63005f26f2cf3cd10166df07",
                "msgType":1,
                "content":"官方的",
                "sendTime":1660968742263,
                "status":2,
                "whoSendMsg":0
            }
        ]
        }
}
```

# NOTIFY
**Prefix：**

`'/api/notify'`

### 获取通知列表

**简介：**

获取跟自己有关的通知，包括别人关注了自己，转发、评论了自己的贴子

**接口地址**
`'/get'`

**请求方法**
`GET` 

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| next     | 否     | 从`id`为`next`的帖子开始获取数据     |
| prev      | 否   | 获取`id`小于`prev`的贴子  |
| limit     | 否    | 获取`limit`长度的数据  |

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
| data|IResINotifyItem:{ NotifyList,hasNext, hasPrev} |
| \_id  |string   | 每条通知的\_id   |
|avatar | string  | 造成通知的用户的头像 |
| nickname | string  |  造成通知的用户昵称  |
| status | EMsgStatus |   通知的状态：已读、未读、已删除 | 
| type | ENotifyType |  通知的类型：评论、转发、关注  |
| senderId | string |  造成通知的用户id  |
| relationId | string  | 关联贴子的id   |
| content   | string |   可以是别人转发或者回复的贴子的id |
|  sendTime | number | 通知发送时间   |
|  hasNext  | boolean | 是否还有下一条数据   |
|   hasPrev | boolean | 是否还有上一条数据   |


**返回示例**
```json
{
    "status": 200,
    "code": 0,
    "data": {
        "NotifyList": [
            {
                "_id": "62ff0b390803a22025887bc3",
                "avatar": "http://feed13.oss-cn-hangzhou.aliyuncs.com/1660185997241.jfif",
                "nickname": "557",
                "status": 2,
                "type": 2,
                "senderId": "@QWQ",
                "relationId": "62fdac4e962194b45e5e13cd",
                "content": "",
                "sendTime": 1660881721380
            }
        ],
        "hasNext": false,
        "hasPrev": false
    }
}
```
###  切换通知已读/未读状态

**简介**
切换通知已读/未读的状态，考虑到可能有些通知比较重要，使得用户可以在已读状态将通知切换为未读。

**接口地址**
`'/update_status'`

**请求方法**
`POST`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id     | 是     | 通知的id     |

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|

###  逻辑删除一条通知

**简介**
将一条通知的状态设为已删除

**接口地址**
`/delete`

**请求方法**
`POST`

**请求参数**

| 名称 | 必须 | 描述 |
| -------- | -------- | -------- |
| id     | 是     | 通知的id     |


**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|

###  获取未读通知条数

**简介**
获取未读通知条数，以提醒用户有新的通知

**接口地址**
`'/get_has_unread'`

**请求方法**
`POST`

**请求参数**

`无`

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|
|data | {unReadCount}||
|unReadCount|number|未读通知条数|

**返回示例**
```json
{
    "status":200,
    "code":0,
    "data":{
        "unReadCount":2
        }
    }
```
###  将该用户的所有通知全部置为已读

**简介**
考虑到某些用户收到的通知会比较多，所以提供一键已读操作

**接口地址**
`'/set_all_notify_read'`

**请求方法**
`POST`

**请求参数**
`无`

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|

###  删除该用户所有通知

**简介**
考虑到某些用户收到的通知会比较多，所以提供一键删除操作

**接口地址**
`'/set_all_notify_delete'`

**请求方法**
`POST`

**请求参数**
`无`

**返回结果**

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| status   | number     |成功时返回200|
| code     | number     |成功时返回0|


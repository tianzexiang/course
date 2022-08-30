## 任务说明以及问题详解

### 数据库表结构设计

```ts
// user model
export interface IUser {
  account: string
  nickname: string
  // hmac pwd
  password: string
  salt: string
  status: EUserStat
  // when user created
  createdAt: number
}

// session model
export interface ISession {
  // session id
  sid: string
  // user id
  userId: ObjectId
  // login ip
  ip: string
  // session create time
  createdAt: Date
}

// folder or file model
export interface IFolderFile {
  // folder or file title
  title: string
  // folder belongs to who
  userId: ObjectId
  // parent folder id , if null then is in root folder
  pid: ObjectId
  // is folder 
  folder: boolean
  // content string
  content: string
  // is file shared
  isShared: boolean
  // folder create time
  createdAt: number
  // folder update time
  updatedAt: number
  // is delete 
  delete: EDeleteStat
}

// share model
export interface IShare {
  // share id
  shareId: string
  // share belongs to who
  userId: ObjectId
  // file id
  fileId: ObjectId
  // the counts of how many times the file has been viewed
  views: number
  // folder create time
  createdAt: Date
}
```

### api设计

```ts
// auth
export enum EAuthApi {
  Prefix = '/api/auth',
  Register = '/register',
  Login = '/login',
  Logout = '/logout',
}

// user
export enum EUserApi {
  Prefix = '/api/user',
  ChangePwd = '/change_pwd',
  SetInfo = '/set_info',
  GetInfo = '/get_info',
}

// folder and file
export enum EFolderFileApi {
  Prefix = '/api/folder-file',
  // get root file and folder
  GetRoot = '/get',
  Get = '/get/:folderId',
  // get recent file
  GetRecent = '/get_recent',
  // get file content
  GetContent = '/get_content/:fileId',
  // get file or folder info
  GetInfo = '/get_info/:id',
  // create folder or file
  Create = '/create', 
  // save content
  Save = '/save',
  // delete folder or file
  Delete = '/delete',
}

// share
export enum EShareApi {
  Prefix = '/api/share',
  // get shared file
  Get = '/get',
  // get share id
  GetShareId = '/get_share_id',
  // create a share file
  Create = '/create',
  // delete share
  Delete = '/delete',
  // get shared file content
  GetContent = '/get_content/:shareId'
}

```

✅ 遇到nextjs动态路由不刷新数据的问题，具体问题以及解决方法可查看nextjs关于路由篇章`Resetting state after navigation`
When navigating to the same page in Next.js, the page's state will not be reset by default as react does not unmount unless the parent component has changed.
1. Manually ensure each state is updated using useEffect. 
2. Use a React key to tell React to remount the component. 

✅ 数据库share和file关联性极强，mongodb用的不是很熟练，没找到关于级联操作的说明，所以好多逻辑都是自己去重新写了一下，感觉如果不用级联操作，某些更新和删除确实会有些绕，之后有时间可以继续学习一下这方面的东西。

✅ 简单用正则做了一下html的过滤，然后发现好像quill都已经把一些工作给做好了，比如`<`这种符号全部转换成了`&lt`字符这样，可能还有在标签里面插入url链接请求的，这种暂时没时间研究了，等之后好好看一下，这样直接写入html确实十分危险

✅ 在删除folder时会需要查找所有后代节点并一并删除的需求，因为本次数据结构比较特殊，是树形结构的数据，故一般建表会采用三种方式。
1. 邻接表：即是目前我使用的表结构，每个表记录一个parent_id用来连接各部分
2. 路径数组：即是记录所有祖先路径，类似a/b/c这样
3. 闭包表：即是将关系单独抽成一张表，记录祖先、后代、以及两者的距离，类似于图
总的来说最常用的还是一，查找后代虽然需要递归，但总体扩展灵活性都很好，2、3也可以用，但增改操作会比较麻烦

✅ 记录share浏览次数，不应该访问一次接口就立马增加一次，这里面有频率的问题，所以我的想法是记录一个访问过后的cookie设置一小时到期，每次增加前判断是否有cookie即可。
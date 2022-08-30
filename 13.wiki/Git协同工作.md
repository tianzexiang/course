## 如何利用git进行协作开发

我们先在本地建立 a 分支，在项目文件夹下执行：

```shell
cd/13
git checkout -b a //分支名称a只是举个例子，取自己的名字全拼
```

编写完以后，我们要提交代码到远程的a分支，我们按顺序执行以下代码

```shell
// 将项目的代码变化提交到缓存区（包括修改、添加和删除）
git add -A

// 将缓存区的所有内容提交到当前本地分支，并附上提交说明：'xxx'
git commit -m 'xxx'

// 将代码提交到远程a分支
git push origin a
```

如果a模块已经编写完毕，而且经过测试无bug，那么，我们可以把远程 a 分支合并到远程的 master 分支。

不过，在合并之前，我们需要确认当前的 a 分支是从最新的 master 分支牵出来的。

1. 如果从你克隆项目到本地到你准备合并 a 分支的这个过程中都没有人提交过代码到 master 分支，那么你可以在 Git 上发起 “和并请求” 请求将 a 分支的代码合并到 master 分支。

2. 如果从你克隆项目到本地到你准备合并 a 分支的这个过程中有人提交过代码到 master 分支。那么，我们需要先将本地项目切回 master 分支：

```shell
git checkout master
```

将最新的远程 master 分支代码拉到本地的 master 分支：

```shell
git pull origin master
```

切换到本地 a 分支：

```shell
git checkout a
```

将本地 master 分支合并到当前分支：

```shell
git merge master
```

如果合并的过程中有冲突，那么我们可以借助 vscode 去查看冲突的代码并选择我们需要保留的代码。

合并好了以后，我们需要将本地的 a 分支代码更新到远程 a 分支：

```shell
git add -A

git commit -m "xxx"

git push origin a
```

这样远程的 a 分支代码就不会比远程的 master 代码落后了，这样我们就可以提合并请求了。

**后面就是同意你的合并请求就行了**

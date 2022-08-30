## 一些常见的错误

### 使用nginx时，修改配置重新加载无效

可能是由于启动多个nginx进程，并且导致任务管理器无法清除nginx进程

### 解决方法
```
taskkill /im nginx.exe /f
```
该命令也可以杀掉其他的进程


### 使用powershell运行命令时报错
```
xxx : 无法加载文件 xxxx，因为在此系统上禁止运t.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ xxxx
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityExcept
    + FullyQualifiedErrorId : UnauthorizedAccess
```

由于windows的powershell有新的安全机制，需要手动授权

### 解决方案
```
1.以管理员身份打开Windows PowerShell
2.输入命令 set-ExecutionPolicy Remotesigned

执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): 

3.回复y
4.输入命令 set-ExecutionPolicy -Scope currentUser

位于命令管道位置 1 的 cmdlet Set-ExecutionPolicy
请为以下参数提供值:
ExecutionPolicy: Remotesigned
执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): 
5.回复A
```

### 文件命名不规范

下面是一个常见的前端工程的文件结构，主页面命名为 `index.html`，不要使用不标准的命名方式，如 `week-03.html`、`music.html`

```plain
imgs/
  - logo.png
  - favicon.ico
scripts/
  - main.js
  - util.js
styles/
  - style.css

index.html
```

### 代码提交不完整

有同学作业实际完成的不错，但是代码提交的时候不完整，漏掉了一些关键资源或者路径引用出错，没有去检查，导致在批改作业的时候无法正常渲染页面。所以在push代码之后，一定要去Web端检查一下，最好另外找个目录 `clone` 一下作业仓库，看一下拉下来的代码是否可以正常工作。

## **Git push之后通过Web端查看提示500错误**

### 出现原因

出现该问题的同学基本上都是由于在子目录重复执行 `git init` 所致，复现步骤如下，假定 `README.md` 都已创建好，在子目录 `week-01` 下重复执行了初始化

```powershell
cd task
git init
git add README.md
git commit -m "init"
git remote add origin https://git.kscampus.io:10443/jiangshishun/test.git
git push -u origin master

mkdir week-01
cd week-01
git init
git add README.md
git commit -m "week-01"
cd ../
git add week-01
git commit -m "add week-01"
git push
```

执行完上诉步骤之后，Web端会出现500错误

### 解决方案

先在仓库根目录执行如下命令

```powershell
git rm --cached week-01
git commit -m "rm week-01"
git push
```

此时在Web端查看应该就已经恢复正常了，手动删除子仓库 `week-01` 下的 `.git`隐藏目录，然后在根目录继续执行

```powershell
git add week-01
git commit -m "add week-01"
git push
```

此时Web端应该显示正常，并且 `week-01` 目录也正确提交了

**需要注意，git仓库无需重复 `init` 或者 `remote add origin`，`init` 之后整个目录就是一个git仓库了，不要嵌套。**

### 在git没有运行完成的时候强制关闭，下次提交的时候产生错误

```bash
fatal: Unable to create '/xxx/xx/.git/index.lock': File exists.
```
在你进行某些比较费时的git操作时自动生成，操作结束后自动删除，相当于一个锁定文件，目的在于防止对一个目录同时进行多个操作。有时强制关闭进行中的git操作，这个文件没有被自动删除，之后你就无法进行其他操作，必须手动删除

### 解决方案

直接删除`.git`文件中的`index.lock`


## 图片路径引用

在图片使用中，引入的图片需要使用相对路径。不要使用绝对路径！！！

## Git仓库上传

每个仓库都有对应的*.gitignoe*文件。

不要把npm包以及编译好的代码上传至仓库！！！
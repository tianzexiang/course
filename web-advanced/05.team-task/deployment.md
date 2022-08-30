# 项目部署

一个项目经过开发和测试之后，下一步就是将它部署到生产环境了，在实际的开发流程中这一步通常都比较复杂，涉及到持续集成、持续部署、运维开发等等，包括现在主流的容器化交付等等，需要依赖很多的基础设施，今天主要来看一下如何基于Linux服务器来将我们的前后端工程部署、运行起来，这是一种比较常规的方式，上手比较容易，所用的内容包括

- Ubuntu Server 20.04
- MongoDB 6.x
- Node.js 16.x
- Nginx 1.23.1
- pm2，Node.js的进程管理工具

## 环境搭建

环境的搭建主要在Linux系统下面进行，对于Linux的操作需要有一定的了解，并且会用 `ssh`、`sftp` 等管理服务器

### 安装Ubuntu Server

该教程必须基于 `Ubuntu Server 20.04` 版本，其他大版本参数会有不同可能会安装失败，阿里云的镜像下载地址 [https://mirrors.aliyun.com/ubuntu-releases/focal/ubuntu-20.04.4-live-server-amd64.iso](https://mirrors.aliyun.com/ubuntu-releases/focal/ubuntu-20.04.4-live-server-amd64.iso)

这一步可以借助于 `vmware`、`hyper-v` 等虚拟化技术来安装一个虚拟机，也可以购买云厂商的云主机，具体安装步骤可以参考网络上的教程

### 安装MongoDB

参考 [https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition)

1. 导入MongoDB公钥，执行如下命令

```shell
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```

2. 添加MongoDB的安装源，执行如下命令

```shell
echo "deb [ arch=amd64,arm64 ] https://mirrors.aliyun.com/mongodb/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

这里我们将地址换成了阿里云的镜像源，安装速度比较快

3. 更新包管理数据库，执行命令

```shell
sudo apt-get update
```

4. 安装MongoDB所需的包

```shell
sudo apt-get install -y mongodb-org
```

5. 配置文件

安装完成之后 `MongoDB` 的配置文件位于 `/etc/mongod.conf`，有兴趣的可以研究一下

6. 管理命令

启动 `MongoDB` 服务

```shell
sudo systemctl start mongod
```

查看 `Nginx` 服务状态

```shell
sudo systemctl status nginx
```

停止 `MongoDB` 服务

```shell
sudo systemctl stop mongod
```

将 `mongod` 服务添加到开机自启

```shell
sudo systemctl enable mongod
```

### 安装Node.js

因为 `ubuntu` 官方源的版本比较低，所以这里我们通过 `nodesource` 服务来安装最新版本的 `Node.js`

1. 获取安装脚本

```shell
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```

2. 安装Node.js

```shell
sudo apt install nodejs
```

### 安装Nginx

`Nginx` 需要作为我们整个服务的网关

1. 添加Nginx安装源

```shell
sudo vi /etc/apt/sources.list.d/nginx.list
```

输入以下内容并保存

```plain
deb [arch=amd64] http://nginx.org/packages/mainline/ubuntu/ focal nginx
deb-src http://nginx.org/packages/mainline/ubuntu/ focal nginx
```

2. 导入Nginx公钥

```shell
wget http://nginx.org/keys/nginx_signing.key
sudo apt-key add nginx_signing.key
```

3. 更新包管理数据库，执行命令

```shell
sudo apt-get update
```

4. 安装Nginx

```shell
sudo apt install nginx
```

5. 配置文件

安装完成之后Nginx的配置文件目录位于 `/etc/nginx`

6. 管理命令，这里和MongoDB的管理方式类似

启动 `Nginx` 服务

```shell
sudo systemctl start nginx
```

查看 `Nginx` 服务状态

```shell
sudo systemctl status nginx
```

停止 `Nginx` 服务

```shell
sudo systemctl stop nginx
```

将 `nginx` 服务添加到开机自启

```shell
sudo systemctl enable nginx
```

### 安装pm2

线上运行的程序最重要的就是稳定性，Node.js服务在遇到一些异常情况是有可能进程挂掉的，所以就需要进程管理工具来守护我们的服务进程，一旦挂掉可以自动重启，`pm2` 就可以来实现这个功能，当然它的作用远不止于此，还有很多高级的特性

首先切换一下npm的源

```shell
npm config set registry https://registry.npmmirror.com
```

将 `pm2` 安装为一个全局命令

```shell
sudo npm i pm2 -g
```

至此我们所需要的环境就搭建完成了

## 代码构建

现在来看一下怎么构建生产环境所需要的代码

### 服务端

服务端我们以第三周的 `koa-demo` 为例，首先在 `package.json` 的scripts中添加一条指令

```plain
"build": "tsc"
```

修改 `main`

```plain
"main": "dist/index.js"
```

然后执行

```shell
npm run build
```

这样构建之后的代码就输出到 `dist` 目录了，部署到服务器上所需要的文件只有运行时依赖的代码，源代码 `src` 之类的不需要，包括

```plain
dist/
scripts/
.env
package.json
package-lock.json
```

如果自己的项目中还有其他服务依赖的文件，自行判断，这个实例中因为用到了 `scripts` 中的初始化脚本，所以需要包含进去

> 这个环节在实际的开发中通常都会由脚本来自动完成，包括从git仓库拉取代码、构建打包等等

### 前端

前端打包就比较简单了，`cra` 脚手架都帮我们配好了一切，以第三周的 `music-front` 为例，只需要执行命令

```shell
npm run build
```

构建好的代码就位于 `build` 目录了，到时候把它上传到服务器即可，`cra` 默认build会输出 `sourcemap`，这个可能会导致一些代码细节被暴露，可以在根目录的 `.env` 文件中添加如下配置来关闭

```plain
GENERATE_SOURCEMAP=false
```

## 部署发布

1. 在个人 `home` 下面创建代码目录，如

```shell
cd ~
mkdir www
mkdir www/music-server
mkdir www/music-front
```

2. 上传代码

上传代码可以使用 `FileZilla` 这个开源工具，将上面列举的服务端所需要的文件上传到 `www/music-server`，将前端 `build` 目录下的文件上传到 `www/music-front`

3. 启动服务端

启动之前需要确保几件事

- MongoDB服务是否启动
- 服务端的配置文件是否修改正确
- 如果有初始化任务比如数据导入是否执行完成

确认无误之后，使用 `pm2` 启动服务

```
cd www/music-server
pm2 start . -name music-server
```

可以通过 `pm2 status` 查看进程状态，`pm2 logs` 查看日志输出

还有一件非常重要的事就是保存 `pm2` 的进程列表，并且让它开机自启，这样如果服务器因为意外重启可以让我们的服务自动启动恢复

```shell
pm2 save
pm2 startup
```

这时会看到pm2提示你如果实现非 `root` 用户的开机自启，按照提示执行

```shell
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u myname --hp /home/myname
```

4. 配置前端Nginx

前端因为是纯静态的，需要使用Nginx来托管，同时代理前端的接口请求到刚才部署的服务端，首先为我们的服务创建一个配置文件

```shell
sudo vi /etc/nginx/conf.d/music.conf
```

输入以下内容并保存

```plain
server {
  listen 8000;

  gzip on;
  gzip_comp_level 5;
  gzip_types text/plain application/javascript text/css;

  location /api/ {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://localhost:4014;
  }

  location / {
    root /home/myname/www/music-front;
    try_files $uri $uri/ /index.html;
  }
}
```

- 这个server会监听 `8000` 端口
- 开启了gzip压缩，可以加快静态资源文件的传输
- 以 `/api/` 开头的请求会被代理到 `http://localhost:4014`，也就是真实的服务端地址，并且会将真实的用户ip传递过去
- 剩下的请求都会被定位到 `/home/myname/www/music-front`，注意这里的 `myname` 需要替换成自己的系统用户名
- `try_files` 会将 `404` 的请求都定向到 `index.html` 帮我们实现 `history` 模式的路由

因为 `nginx` 的配置文件 `/etc/nginx/nginx.conf` 中包含了这么一条规则

```plain
include /etc/nginx/conf.d/*.conf;
```

所以我们添加的 `music.conf` 会自动包含进来，添加完配置之后记得检查一下

```shell
nginx -t
```

如果没有问题重启Nginx服务

```shell
sudo nginx -s reload
```

现在打开浏览器访问 http://ip:8000/ 应该就可以看到页面了

## 防火墙配置

防火墙的配置至关重要，在前面的例子中我们启动了3个服务，分别是

- mongodb，27017端口
- music-server，4014端口
- nginx，80/8000端口，其中80端口是nginx的默认server，也可以关掉

上面我们只需要对外暴露 `8000` 端口即可，其余两个只是作为内部服务存在，Ubuntu中配置防火墙端口规则非常简单，通过 `ufw` 命令即可

```
ufw allow 22
ufw allow 8000
```

`22` 是ssh服务的端口，在启动防火墙之前一定要加到白名单中，否则启动之后ssh可能就连不上服务器了，然后

重新加载ufw

```shell
sudo ufw reload
```

启动ufw

```shell
sudo ufw enable
```

查看ufw状态

```shell
sudo ufw status
```

还可以借助于 `netstat` 这个工具来查看系统所有监听的端口，Ubuntu可以通过下面的命令来安装

```shell
sudo apt-get install net-tools
```

安装完之后通过命令

```shell
netstat -ntlp
```

就可以看到监听的端口列表了

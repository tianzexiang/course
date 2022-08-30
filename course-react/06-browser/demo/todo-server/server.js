// Todo 简单服务端
const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");

const dir = path.join(__dirname, "data");
if (fs.existsSync(dir) === false) fs.mkdirSync(dir);
const db = path.join(__dirname, "./data/data.json");
if (fs.existsSync(db) === false) dump([]);

async function getData() {
  const data = fs.readFileSync(db);
  return data ? JSON.parse(data).filter((todo) => todo.status === 0) : [];
}

async function createTodo(body) {
  let data = {
    stat: "ok",
    msg: "ok",
  };
  if (typeof body.content === "string") {
    const id = crypto.randomUUID();
    const todo = {
      content: body.content,
      finished: false,
      id: id,
      status: 0,
    };
    const list = await getData();
    list.push(todo);
    dump(list);
    data.id = id;
  } else {
    data.stat = "err";
    data.msg = "content未传输正确";
  }
  return data;
}

async function listTodos() {
  const data = await getData()
  return {
    stat: 'ok',
    data: data
  }
}

async function switchTodo(body) {
  let data = {
    stat: "ok",
    msg: "ok",
  };
  if (typeof body.id === "string") {
    const list = await getData();
    const index = list.findIndex((todo) => todo.id === body.id);
    if (index >= 0) {
      list.map((todo) => {
        if (todo.id === body.id) {
          todo.finished = !todo.finished;
        }
      });
      dump(list);
    } else {
      data.stat = "err";
      data.msg = "id未找到";
    }
  } else {
    data.stat = "err";
    data.msg = "id未传输正确";
  }
  return data;
}

async function deleteTodo(body) {
  let data = {
    stat: "ok",
    msg: "ok",
  };
  if (typeof body.id === "string") {
    const list = await getData();
    let index = list.findIndex((todo) => todo.id === body.id);
    if (index >= 0) {
      // list.splice(index, 1);
      list.map((todo) => {
        if (todo.id === body.id) {
          todo.status = 1;
        }
      });
      dump(list);
    } else {
      data.stat = "err";
      data.msg = "id未找到";
    }
  } else {
    data.stat = "err";
    data.msg = "id未传输正确";
  }
  return data;
}

function dump(data) {
  fs.writeFileSync(db, JSON.stringify(data));
}

const apiMap = new Map([
  ["/api/create", createTodo],
  ["/api/list", listTodos],
  ["/api/done", switchTodo],
  ["/api/cancel", switchTodo],
  ["/api/delete", deleteTodo],
]);

const server = http.createServer(async (req, res) => {
  try {
    // 解析路由
    let [reqPath, query] = req.url.split("?");
    console.log(reqPath);
    // GET请求需要解析search
    // let params = query ? new URLSearchParams(query) : {}
    // 解析cookie
    // 解析body
    let chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", async () => {
      // 拼接Buffer，生成body
      try {
        let data = Buffer.concat(chunks).toString("utf-8");
        req.body = JSON.parse(data);
      } catch (error) {
        req.body = {};
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      // 映射路由函数
      try {
        if (apiMap.has(reqPath)) {
          const data = await apiMap.get(reqPath)(req.body);
          res.end(JSON.stringify(data));
        } else {
          res.statusCode = 404;
        }
      } catch (err) {
        console.trace(err);
        res.statusCode = 500;
      } finally {
        res.end();
      }
    });
  } catch (error) {
    console.trace(error);
    res.statusCode = 500;
    res.end();
  }
});

server.listen(3280, () => console.log(3280));

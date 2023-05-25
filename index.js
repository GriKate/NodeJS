import http from "http";
import { Server } from 'socket.io';
import fs from "fs";
import path from "path";
import { serialize, parse } from "cookie";

const host = "localhost";
const port = 3000;


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), "./index.html");
    const rs = fs.createReadStream(filePath);

    rs.pipe(res);
  }
});

const setId = () => {
    const id = Math.floor(Math.random()*100);
    return id;
}

const createName = () => {
  const alph = 'abcdefghijklmnopqrstuvwzyz';
  let name = '';
  for(let i = 0; i<4; i++) {
    const randInd = Math.floor(Math.random() * alph.length);
    name += alph[randInd];
  }
  console.log(name)
  return name;
}

const io = new Server(server);

// поставит куку с id при каждой перезагрузке стр
// мне нужно 1 раз поставить и читать
// io.engine.on("initial_headers", (headers, request) => {
//     headers["set-cookie"] = serialize("id", setId(), { sameSite: "strict" });
// });

io.engine.on("headers", (headers, request) => {
    if (!request.headers.cookie) return;
    const cookies = parse(request.headers.cookie);
    if (!cookies.id) {
      headers["set-cookie"] = [
        serialize("id", setId(), { maxAge: 86400 }), 
        serialize("username", createName(), { maxAge: 86400 })
      ];
    }
});

io.on('connection', (client) => {
  // при загрузке стр автоматич подключаемся к вебсокету
  console.log(`Websocket connetcted ${client.id}`);

  // client.conn - ссылка на socket
  const cookies = parse(client.conn.request.headers.cookie || ""); 
  const username = cookies.username;
  client.broadcast.emit('server-msg', { name: username, msg: 'connected' })

  // 'client-msg' приходит с фронта, там эмитится значение инпута
  client.on('client-msg', (data) => {
    client.broadcast.emit('server-msg', { name: username, msg: data.msg })
    client.emit('server-msg', { name: username, msg: data.msg })
  })
})

// получаю куки клиента для отправки статуса юзера
io.on("connection", (socket) => {
  const cookies = parse(socket.request.headers.cookie || ""); 
  const username = cookies.username;

  socket.on("disconnect", (reason) => {
  // client.conn.on("disconnect", (reason) => {
    socket.broadcast.emit('server-msg', { name: username, msg: 'disconnected' })
  });
});

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
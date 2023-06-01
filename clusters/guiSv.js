//socket io server
//allow cors *

const feeds = {};

process.on("message", (msg) => {
  const RPL = msg.RPL;
  if (msg.CMD === "init") {
    process.send({ RPL });
  } else if (msg.CMD === "createFeed") {
    feeds[msg.feedName] = {
      name: msg.feedName,
      data: [],
    };
  } else if (msg.CMD === "addData") {
    feeds[msg.feedName].data.push(msg.data);
    io.emit("addData", msg);
  } else if (msg.CMD === "updateData") {
    feeds[msg.feedName].data[msg.feedName[data].length - 1] = msg.data;
    io.emit("updateData", msg);
  }
});

const io = require("socket.io")(3001, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("new user");
  socket.on("getFeeds", (req, res) => {
    res(Object.keys(feeds));
  });
  socket.on("getFeed", (req, res) => {
    res(feeds[req]);
  });
});

const cluser = require("cluster");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const send = (worker, data) => {
  return new Promise((resolve, reject) => {
    const RPL = uuid();
    const tout = setTimeout(() => {
      reject("timeout");
    }, 1000);
    const listerner = (msg) => {
      if (msg.RPL === RPL) {
        resolve(msg);
        clearTimeout(tout);
        worker.removeListener("message", listerner);
      }
    };
    worker.on("message", listerner);
    worker.send({ ...data, RPL });
  });
};
const fork = (conf) => {
  return new Promise(async (resolve, reject) => {
    const worker = cluser.fork(conf);
    worker.once("online", () => {
      send(worker, { CMD: "init" })
        .then((msg) => {
          resolve(worker);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
if (cluser.isMaster) {
  const master = async () => {
    console.clear();
    const file = path.resolve(
      __dirname,
      `./downloads/ETHUSDT-1m-2020-01/ETHUSDT-1m.csv`
    );
    let guiSv = null;
    try {
      guiSv = await fork({ cluster: "guiSv" });
      console.log("GUI SV LOaDED");
    } catch (err) {
      console.log(err);
    }
    const config = JSON.parse(
      fs.readFileSync(path.join(__dirname, "config.json"))
    );
    //create workers
    const workers = {};
    for (let pipe of config.pipeLines) {
      try {
        workers[pipe.name] = await fork({
          cluster: pipe.name,
          config: JSON.stringify(pipe.config),
        });
        console.log("worker loaded", pipe.name);
      } catch (err) {
        console.log(err);
        process.exit();
      }
    }
    //create readStream
    const readStream = fs.createReadStream(file);
    const rl = require("readline").createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      //data pipeline
      let data = line;
      for (let pipe of config.pipeLines) {
        data = (
          await send(workers[pipe.name], {
            CMD: "candleData",
            data,
          })
        ).data;
      }
    }
    rl.on("close", () => {
      console.log("done");
    });
    rl.on("error", (err) => {
      console.log(err);
    });
  };

  master();
} else {
  if (process.env.cluster === "guiSv") {
    require("./clusters/guiSv");
  } else if (process.env.cluster.endsWith(".js")) {
    require(`./clusters/${process.env.cluster}`);
  }
}

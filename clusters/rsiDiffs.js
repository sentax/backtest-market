const config = JSON.parse(process.env.config);
let diffs = { upper: 0, lower: 0 };
let _status = {};
const k = config.key;
const statusExport = (value) => {
  if (value <= config.lower) {
    return "LOWER";
  } else if (value >= config.upper) {
    return "UPPER";
  }
};
process.on("message", (msg) => {
  const RPL = msg.RPL;
  if (msg.CMD === "init") {
    process.send({ RPL });
  } else if (msg.CMD === "candleData") {
    for (let interval of msg.data) {
      if (interval.type === "new" && interval.data[k]) {
        if (!_status[interval.name]) {
          _status[interval.name] = statusExport(interval.data[k]);
          continue;
        }
      }
    }
    process.send({ RPL, data: msg.data });
  }
});

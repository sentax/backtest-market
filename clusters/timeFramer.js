const config = JSON.parse(process.env.config);
let intervals = [];
for (let interval of config.intervals) {
  intervals.push(interval);
}
process.on("message", (msg) => {
  const RPL = msg.RPL;
  if (msg.CMD === "init") {
    process.send({ RPL });
  } else if (msg.CMD === "candleData") {
    for (let interval of intervals) {
      const data = msg.data.split(",");
      if (!interval.data) {
        interval.type = "new";
        interval.data = {
          time: Number(data[0]),
          open: Number(data[1]),
          high: Number(data[2]),
          low: Number(data[3]),
          close: Number(data[4]),
          volume: Number(data[5]),
        };
      } else {
        const time = Number(data[0]);
        const diff = time - interval.data.time;
        if (diff >= interval.interval) {
          interval.type = "new";
          interval.data = {
            time,
            open: Number(data[1]),
            high: Number(data[2]),
            low: Number(data[3]),
            close: Number(data[4]),
            volume: Number(data[5]),
          };
        } else {
          interval.type = "update";
          interval.data = {
            time: interval.data.time,
            open: Number(data[1]),
            high: Math.max(interval.data.high, Number(data[2])),
            low: Math.min(interval.data.low, Number(data[3])),
            close: Number(data[4]),
            volume: interval.data.volume + Number(data[5]),
          };
        }
      }
    }

    process.send({ RPL, data: intervals });
  }
});

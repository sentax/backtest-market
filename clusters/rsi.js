const config = JSON.parse(process.env.config);
const TA = require("technicalindicators");
let candles = {};
process.on("message", (msg) => {
  const RPL = msg.RPL;
  if (msg.CMD === "init") {
    process.send({ RPL });
  } else if (msg.CMD === "candleData") {
    for (let interval of msg.data) {
      if (!candles[interval.name]) {
        candles[interval.name] = [interval.data];
      } else {
        if (interval.type === "new") {
          candles[interval.name].push(interval.data);
          if (candles[interval.name].length > config.period * 3)
            candles[interval.name].shift();
        } else {
          candles[interval.name][candles[interval.name].length - 1] =
            interval.data;
        }
      }
      if (candles[interval.name].length >= config.period * 3) {
        //calculate RSI
        const inputRSI = {
          values: candles[interval.name].map((candle) => candle.close),
          period: config.period,
        };
        const rsi = TA.RSI.calculate(inputRSI);
        interval.data["rsi" + config.period] = rsi[rsi.length - 1];
      }
    }

    process.send({ RPL, data: msg.data });
  }
});

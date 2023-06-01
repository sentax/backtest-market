//download zip files
const fs = require("fs");
const path = require("path");

let files =
  '["https://data.binance.vision/","https://github.com/binance/binance-public-data/","https://data.binance.vision/?prefix=","https://data.binance.vision/?prefix=data/","https://data.binance.vision/?prefix=data/futures/","https://data.binance.vision/?prefix=data/futures/um/","https://data.binance.vision/?prefix=data/futures/um/monthly/","https://data.binance.vision/?prefix=data/futures/um/monthly/klines/","https://data.binance.vision/?prefix=data/futures/um/monthly/klines/BTCUSDT/","https://data.binance.vision/?prefix=data/futures/um/monthly/klines/BTCUSDT/1m/","https://data.binance.vision/?prefix=data/futures/um/monthly/klines/BTCUSDT/1m//","https://data.binance.vision/?prefix=data/futures/um/monthly/klines/BTCUSDT/","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2023-04.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2023-04.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2023-03.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2023-03.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2023-02.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2023-02.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2023-01.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2023-01.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-12.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-12.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-11.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-11.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-10.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-10.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-09.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-09.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-08.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-08.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-07.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-07.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-06.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-06.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-05.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-05.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-04.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-04.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-03.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-03.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-02.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-02.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-01.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2022-01.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-12.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-12.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-11.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-11.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-10.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-10.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-09.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-09.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-08.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-08.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-07.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-07.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-06.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-06.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-05.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-05.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-04.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-04.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-03.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-03.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-02.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-02.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-01.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2021-01.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-12.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-12.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-11.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-11.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-10.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-10.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-09.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-09.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-08.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-08.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-07.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-07.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-06.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-06.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-05.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-05.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-04.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-04.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-03.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-03.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-02.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-02.zip","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-01.zip.CHECKSUM","https://data.binance.vision/data/futures/um/monthly/klines/BTCUSDT/1m/BTCUSDT-1m-2020-01.zip"]';
files = JSON.parse(files);
files = files.filter((f) => f.endsWith(".zip"));
files = files.filter((f) => !f.includes("CHECHSUM"));

console.log(files.length);

const downloadFile = async (file) => {
  const url = file;
  const path = require("path");
  const fs = require("fs");
  const axios = require("axios");
  const dir = path.resolve(__dirname, "downloads");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  //check if file exists
  if (
    fs.existsSync(path.resolve(__dirname, "downloads", file.split("/").pop()))
  ) {
    console.log("File exists, skipping");
    return;
  }

  const writer = fs.createWriteStream(
    path.resolve(__dirname, "downloads", file.split("/").pop())
  );

  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (e) {
    console.log("Error downloading file, skipping");
    //delete file
    fs.unlinkSync(path.resolve(__dirname, "downloads", file.split("/").pop()));
    return;
  }
};

const main = async () => {
  for (let file of files) {
    console.log(`Downloading ${file}...`);
    try {
      await downloadFile(file);
    } catch (e) {
      console.log("Error downloading file, skipping");
    }
  }
  await main();
};

main().catch(console.error);

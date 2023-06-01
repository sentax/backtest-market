const fs = require("fs");
const path = require("path");

const dirName = "./downloads/ETHUSDT-1m-2020-01";

//get all files in dir
let files = fs.readdirSync(dirName);
files = files.filter((file) => path.extname(file) === ".csv");

const main = async () => {
  for (let file of files) {
    const readStream = fs.createReadStream(path.join(dirName, file));
    //read line by line
    const rl = require("readline").createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      //append to file
      fs.appendFileSync(path.join(dirName, "ETHUSDT-1m.csv"), line + "\n");
    }
    console.log("next line");
  }
};

main();

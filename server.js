const express = require("express");
const serverConfig = require("./configs/index");
const db = require("./db/index");
const consts = require("./consts/index");
const router = require("./routers/index");

const app = express();
serverConfig.serverConfig.initialServerConfig();
app.use(express.json());
const PORT = 3000 || process.env.PORT;

app.use(`${process.env.APP_PREFIX}${consts.ROUTER_PREFIX.USER}`, router.user);

db.mongooseConnection
  .mongooseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

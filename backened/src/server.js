const app = require("./index.js");

const connect = require("./configs/db")




app.listen(2233, async (req, res) => {
    await connect();
    console.log("Listening on port 2233")
})
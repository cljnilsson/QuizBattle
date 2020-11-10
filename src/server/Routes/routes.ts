import app from "../server.js";
import DB from "../db/core";

import Quiz from "../db/models/quiz";

app.get("/", (req, res) => {
    res.sendfile("./dist/public/index.html");
})

app.get("/allquiz", async (req, res) => {
    res.json(await DB.get(Quiz));
})
import DB from "../db/core";
import "../db/generate";

import app 			from "../server";

app.get("/", (req, res) => {
	res.sendfile("./dist/public/index.html");
});

app.get("/*", (req, res) => {
	res.redirect("/");
});
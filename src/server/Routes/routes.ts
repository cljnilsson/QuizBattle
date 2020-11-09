import app from "../server.js";

app.get("/", (req, res) => {
    res.sendfile("./dist/public/index.html");
})

app.get("/test", (req, res) => {
	console.log("happens")
	console.log("BABB!!!!!!!!!!")
    res.json({message: "Hello, client!!!!!!!!"});
})
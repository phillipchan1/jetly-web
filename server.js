const express = require("express");
const app = express();

app.use(express.static(__dirname + "/dist"));

app.all("/*", function(req, res) {
	res
		.status(200)
		.set({ "content-type": "text/html; charset=utf-8" })
		.sendFile(process.cwd() + "/dist/index.html");
});

app.listen(process.env.PORT || 8080);

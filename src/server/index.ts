import DB from "./db/core";

// Ugly solution because of a circular-ish dependency between express, typeorm and adminbro
(async () => {
	await DB.init();
	import("./server.js");
	import("./Routes/routes");
})();
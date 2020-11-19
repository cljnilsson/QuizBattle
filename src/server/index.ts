import DB from "./db/core";

// Ugly solution because of a circular-ish dependency between express, typeorm and adminbro
(async () => {
	let db = await DB.init();
	import("./server.js");
	import("./Routes/routes");
})();
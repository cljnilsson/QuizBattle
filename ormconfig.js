module.exports =  {
	"type": "mysql",
	"host": "localhost",
	"port": 3306,
	"username": "root",
	"password": "",
	"synchronize": true,
	"logging": false,
	"entities": [
	   "src/server/db/models/*.ts"
	],
	"migrations": [
	   "src/server/db/migrations/**/*.ts"
	]
 }
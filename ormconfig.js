module.exports =  {
	"type": "mysql",
	"host": process.env.HOST,
	"port": process.env.PORT,
	"username": "root",
	"database": "QuizBattle",
	"password": process.env.PASSWORD,
	"synchronize": true,
	"cache": true,
	"logging": false,
	"entities": [
		__dirname + "/dist/db/models/*.js"
	],
	"migrations": [
	   "src/server/db/migrations/*.ts"
	],
	"cli": {
        "migrationsDir": "src/server/db/migrations/"
    }
 }
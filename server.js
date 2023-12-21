const app = require ("./app")
const http = require("http")

var httpServer = http.createServer(app)

const server = httpServer.listen(process.env.PORT, () => {
    console.log("server is up and running on : ", process.env.PORT)
})
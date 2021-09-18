import "module-alias/register";
import * as express from 'express';
import * as mongoose from "mongoose";
const app = express();
import * as httpPkg from "http";
import * as socketio from "socket.io";
let server = new httpPkg.Server(app);

const port = 3000;

interface TestDoc extends mongoose.Document {
    test: string;
    // id: string;
    // updatedAt?: Date;
    // createdAt?: Date;
}

const TestSchema = new mongoose.Schema<TestDoc>({
    test: String,
}, { collection: "Test", timestamps: { createdAt: "createdAt" } });
const TestModel = mongoose.model<TestDoc>("Test", TestSchema);
let io = new socketio.Server(server);
// const TestModel = mongoose.model('test', yourSchema);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

// app.get('/', async (req, res) => {
//     let query = await TestModel.find();
//     let response = `<h1>Hello World!</h1> ${query}`;
//     res.send(response);
//     // res.send("<h1>Hello World! (Test)</h1>");
// });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });
const dbURL = "ec2-34-220-160-64.us-west-2.compute.amazonaws.com";
const dbUser = "admin";
const dbPassword = "5gc6w987"
const dbName = "test"
const dbPort = 27017;
const mongoPath = `mongodb://${dbUser}:${dbPassword}@${dbURL}:${dbPort}/${dbName}`;

const bootServer = async () => {
    await mongoose.connect(mongoPath, {
        authSource: "admin",
        readPreference: "primary",
    });
    server.listen(port);
    console.info("Connected to mongodb");
    console.info(`Server active on port ${port}`);
}
bootServer();
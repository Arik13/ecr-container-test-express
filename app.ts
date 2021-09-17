import "module-alias/register";
import * as express from 'express';
import * as mongoose from "mongoose";

const app = express();
const port = 3000;

interface TestDoc extends mongoose.Document {
    test: string;
    // id: string;
    // updatedAt?: Date;
    // createdAt?: Date;
}

const TestSchema = new mongoose.Schema<TestDoc>({
    test: String,
}, { collection: "Test", timestamps: {createdAt: "createdAt"}});
const TestModel = mongoose.model<TestDoc>("Test", TestSchema);

// const TestModel = mongoose.model('test', yourSchema);

app.get('/', async (req, res) => {
    let query = await TestModel.find();
    let response = `<h1>Hello World!</h1> ${query}`;
    // res.send(response);
    res.send("<h1>Hello World! (Test)</h1>");
});

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });
const mongoPath = "mongodb://admin:5gc6w987@ec2-34-214-191-240.us-west-2.compute.amazonaws.com:27017/test";

const bootServer = async () => {
    await mongoose.connect(mongoPath);
    app.listen(port);
    console.info("Connected to mongodb");
    console.info(`Server active on port ${port}`);
}
bootServer();

mongoose.Schema
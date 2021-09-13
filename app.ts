import "module-alias/register";
import * as express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
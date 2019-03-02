import env from './app/config/env';
import express from 'express';
import routes from './app/routes';
import CORS from './app/middlewares/CORS';
import ExpressPlugins from './app/middlewares/ExpressPlugins';
import bodyParser from 'body-parser';
import path from 'path';
import DATABASE from './app/config/db';
//disabling console.log in production build
if (process.env.projectMode === 'Production')
    console.log = function () { }

const app = express();

// Middlewares
app.use(bodyParser.json())
app.use(CORS);
app.use(ExpressPlugins);


// Routes
routes.post('/', (req, res) => res.json({
    message: ""
}));
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    if (!err) return res.validSend(201, {});
    if (!err.status) err.status = 500;
    return res.status(err.status).json({ error: err.message })
});

let port = process.env.PORT || process.env.API_PORT;
app.listen(port, (err) => {
    if (err) {
        console.error(err)
    }
    console.log(`listening on port`, Number(port))
})
require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
// const path = require('path');
const config = require('config');
const mongoose = require('mongoose');
const initDataBase = require('./startUp/initDataBase');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

// if (process.env.NODE_ENV === 'production') {
//     app.use('/', express.static(path.join(__dirname, 'client')));
//     const indexPath = path.join(__dirname, 'client', 'index.html');
//     app.get('*', (req, res) => {
//         res.sendFile(indexPath);
//     });
// }

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDataBase();
        });
        await mongoose.connect(config.get('mongoUri'));
        console.log(chalk.greenBright(`MongoDB successfully connected.`));
        app.listen(PORT, () =>
            console.log(
                chalk.green(`Server has been started on port ${PORT}...`)
            )
        );
    } catch (e) {
        console.log(chalk.red(e.message));
        process.exit(1);
    }
}

start();

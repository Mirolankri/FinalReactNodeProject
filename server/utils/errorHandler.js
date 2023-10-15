const chalk = require('chalk');

const handleError = (res, status, message) => {
    console.log(chalk.blue(message));
    return res.status(status).send(message);
};

module.exports = { handleError }
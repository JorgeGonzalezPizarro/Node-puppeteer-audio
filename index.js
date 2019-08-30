const {container} = require('./src/services');
const app = container.resolve('app');
app.start().catch((err) => {
    app.logger.error(err.stack);
    process.exit();
});
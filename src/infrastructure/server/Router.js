const { Router } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const provider = require('./util')

class ApiRouter {
    constructor({ config, containerMiddleware }) {
        this.config = config;
        this.containerMiddleware = containerMiddleware;
        this.router = Router()
        this.apiRouter = Router();
        this.start()

    }

    start() {
        const {containerMiddleware, apiRouter, router} = this;
        apiRouter
            .use(methodOverride('X-HTTP-Method-Override'))
            .use(cors())
            .use(bodyParser.json())
            .use(compression())
            .use(containerMiddleware);

        apiRouter.use('/', require(provider.resolve(provider.GET_AUDIO_CONTROLLER)).router());

        router.use('/api', apiRouter);



    }

}
module.exports = ApiRouter
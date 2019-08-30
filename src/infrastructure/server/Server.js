const express = require('express');

class Server {
    constructor({ config, router, logger }) {
        logger.info(router)
        this.config = config;
        this.express = express();
        this.express.disable('x-powered-by');
        this.express.use(router.router);
        this.logger = logger;
    }

    start() {
        return new Promise((resolve) => {
            const http = this.express
                .listen(this.config.port, () => {
                    const { port } = http.address();
                    this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
                    resolve();
                });
        });
    }
}

module.exports = Server;

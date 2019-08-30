const {createContainer, asClass, asFunction, asValue} = require('awilix');
const {scopePerRequest} = require('awilix-express');
const config = require('../config');



//INFRA
const {server,router} = require('./infrastructure/server');
const app = require('./App');
const loggerMiddleware = require('./infrastructure/server/logger/loggerMiddleware');
const logger = require('./infrastructure/logger/loggerLog4js');
const AudioRepository = require('./infrastructure/repository/Audio/AudioRepository');



//USE CASES
const {
    GetAudioUseCase,
} = require('./application');



const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        server: asClass(server).singleton()
    });
container.register({
    router: asClass(router).singleton(),
});
container.register({
    router: asClass(router).singleton(),
});
container.register({
    logger: asFunction(logger).singleton()
});
container.register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
});
container.register({
    config: asValue(config)
});


container.register({
    GetAudioUseCase :  asClass(GetAudioUseCase)

})
container.register({
    AudioRepository :  asClass(AudioRepository)

})

container.register({
    containerMiddleware: asValue(scopePerRequest(container))
});







module.exports = {
     container
}

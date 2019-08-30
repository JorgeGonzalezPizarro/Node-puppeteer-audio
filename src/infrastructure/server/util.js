const path = require('path');

const resolv = (pathToResolve) => {
    return path.resolve('src/infrastructure/server/Api',pathToResolve)

}

module.exports = {
    GET_AUDIO_CONTROLLER : 'GetAudioController',
    resolve : resolv
}


const {Router} = require('express');
const {inject} = require('awilix-express');
const Status = require('http-status');

const GetAudioController = {

    router() {
        const router = Router();

        router.get('/', inject('GetAudioUseCase'), this.listUsers());
        return router;
    },



    listUsers: () => async (req, res, next) => {
        const {GetAudioUseCase } = req;
        const {events} = GetAudioUseCase;
        GetAudioUseCase.on(events.SUCCESS, (users) => {
            res.status(Status.OK).json(users);
        })
            .on(events.ERROR, next);

        await req.GetAudioUseCase.execute();
    }
};


module.exports = GetAudioController;
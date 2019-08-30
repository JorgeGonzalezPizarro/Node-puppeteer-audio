
const UseCase = require("../../base/app/UseCase");
const EVENTS = {
    SUCCESS : "SUCCESS",
    ERROR : "ERROR"
}

class GetAudio extends UseCase{
    constructor({AudioRepository: audioRepository}) {
        super();
        this.audioRepository = audioRepository
        this.getAudioEvents = EVENTS
    }

     async execute()  {
        const {SUCCESS,ERROR} = this.getAudioEvents;
        try {
            this.emit(SUCCESS , this.audioRepository.getAudio())
        }catch (e) {
            this.emit(ERROR)

        }

    }



}
GetAudio.events(Array.from(Object.keys(EVENTS)));

module.exports = GetAudio
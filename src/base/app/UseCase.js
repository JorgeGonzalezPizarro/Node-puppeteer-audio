const Emitter = require('events');
const defineProperties = Object.defineProperty;


class UseCase extends Emitter {

    static events (eventsArray) {
        defineProperties(this.prototype, 'events', {
            value: createEvents(eventsArray)
        });
    }

    on(event, handler)
    {
        if(this.events[event])
        {
            return this.addListener(event, handler);
        }
        else{
            this.events[event] = event;

        }

    }

}

const createEvents = (eventsArray) =>  {
    return eventsArray.reduce((object, event) => {
        object[event] = event;
        return object;
    }, Object.create(null));
};


module.exports = UseCase;


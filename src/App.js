 class App {

    constructor({server,logger}){
        this.server = server;
        this.logger = logger;
    }



     async  start () {await this.server.start()}
    
}
 module.exports = App;

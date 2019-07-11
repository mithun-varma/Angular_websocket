/* 
 * Lack#gn:gamename,tn:tablename@gn:gamename,tn:tablename,tid:tourneyid#
 * 
 * Lack#tid:JB0033412,tbid:J00334121,server:Tourney,
 *      $gid:11188448,gdid:12,server:RealPool,tbid:P182$
 *  
 *  gid:18061935,gdid:79,server:PlayPool,tbid:R74
 * 
 * Games would be separated by '$'
 */

LackHandler = function () {

};

function execute(lackMessage) {
    console.log("Hello World fro mLack")
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    if (lackMessage === "") {
        lobbyService.processLackData();
        return;
    }

    var lackDetails = lackMessage.split("$");
    var lackArray = new Array();
    for (var index = 0; index < lackDetails.length; index++) {
//        console.log("data from server : " + lackDetails[index]);
        if (lackDetails[index] !== "") {
            console.log("data from server : " + lackDetails[index]);
            var data = lackDetails[index].split(",");
            var lackGameDetails = new LackDetailsVO();
            for (var i = 0; i < data.length; i++) {
                var msg = data[i].split(":");
                if (msg[0] === "tid") {
                    lackGameDetails.setTourneyId(msg[1]);
                } else if (msg[0] === "tbid") {
                    lackGameDetails.setTableId(msg[1]);
                } else if (msg[0] === "gid") {
                    lackGameDetails.setGameId(msg[1]);
                } else if (msg[0] === "gdid") {
                    lackGameDetails.setGameDefintionId(msg[1]);
                } else if (msg[0] === "server") {
                    lackGameDetails.setServerName(msg[1]);
                }
            }
            lackArray.push(lackGameDetails);
        }

    }
    lobbyService.processLackData(lackArray);
}

LackHandler.prototype = Object.create(Handler.prototype);
LackHandler.prototype.constructor = LackHandler;
LackHandler.prototype.execute = execute;

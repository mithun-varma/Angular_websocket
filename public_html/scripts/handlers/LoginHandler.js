/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
LoginHandler = function () {

};


function execute(data) {
    /**
     * Login#0
     * 
     * Response codes description: 
     * a. '0' -- Successful Login;
     * b. '1' or '2' -- Invalid Userid or Password;
     * c. '3' -- Failed while updating database;
     * d. '10' -- Already Logged in;
     * e. '20' -- Account activation pending;
     * f. '100' -- OK (need to confirm with server for description);
     * g. '702' -- Under Age
     * h. '700' -- Invalid IP;
     * 
     * If all the above fails, we receive 'Invalid Userid or Password' (like code 1 or 2);
     * 
     * */
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.processLogin(data);
}

LoginHandler.prototype = Object.create(Handler.prototype);
LoginHandler.prototype.constructor = LoginHandler;
LoginHandler.prototype.execute = execute;


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['scripts/jquery'], function() {
    var showName = function (n) {
        var temp = "Hello "+n;
        $("body").html(temp);
    };
    return {
        showName: showName
    };
});

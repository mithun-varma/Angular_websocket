/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(function(){
    var items = [];
    function add(item){
       items.push(item) 
    }
    function getItems(){
        return items;
    }
    return {
        'add':add(),
        'items':getItems()
    }
});

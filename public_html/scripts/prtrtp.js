/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    function Plant(type){
       this.country = "Mexico";
       this.isOrganic = true;      
       this.getit = function(){
           return type;
       }
       
    }
    Plant.prototype.showNameAndColor = function () {
        console.log("I am a " + this.name + " and my color is " + this.color);
    };
    // Add the amIOrganic method to the Plant prototype property​
    Plant.prototype.amIOrganic = function () {
        if(this.isOrganic)
        console.log("I am organic, Baby!");
    };
    function Fruit(fruitName,fruitColor){
        this.name = fruitName;
        this.color = fruitColor;
    }
    var house = {
        name : 'vit'
    };
    
    var lt = new Plant('palm');
    console.log(Plant.prototype === Object.prototype);
    
    var tent = new Object();
    tent.name = "sfsf";
    tent.prototype = Object.prototype;
    var plt = Object.create(Plant);
    console.log(Plant.prototype);
    console.log(Object.prototype)
//player1 object

var player1 = {
    name: "LexLuger",
    health: 128,
    atkStrength: 15,
    attackFctr: 13,
    somefunc: function() {
    }

}
//player2 object

var player2 = {
    name: "Tatanka",
    health: 140,
    atkStrength: 13,
    attackFctr: 19

}

//player3 object
var player3 = {
    name: "Yokozuna",
    health: 200,
    atkStrength: 9,
    attackFctr: 5

}

//player4 object

var player4 = {
    name: "Undertaker",
    health: 190,
    atkStrength: 18,
    attackFctr: 9

}
//player4 object

// just incase player 5
var player5 = {
    name: "British Bulldog",
    health: 100,
    atkStrength: 10,
    attackFctr: 10
}



//global variables---------------------------------------------------------------------------------------------------------------------------
var playerSelected = false; //checks if a contendar has been selected
var defender ="";//defender of title
var contender = "";//contender for title
var machinePlyrs= ["player1", "player2", "player3", "player4"];
var machinePObjs= [player1, player2, player3, player4];
var alreadySelected=[];
var defcons =0;
var changePlyr =false;
//-------------------------------------------------------------------------------------------------------------------------------------------


//testing
defender = player4;
contender = player2;  
console.log(defender);
console.log(machinePlyrs);
console.log(defender.health);
var atkNum =1;

//useful functions++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function attack() {
    //check if health is below 0?
    contender.health = contender.health-(defender.atkStrength +defender.attackFctr*defcons);
    defender.health = defender.health- contender.atkStrength;
    defcons = defcons+1;
    console.log("just attacked");
}

function reset(){
    playerSelected = false; //checks if a contendar has been selected
    defender ="";//defender of title
    contender = "";//contender for title
    machinePlyrs= ["player1", "player2", "player3", "player4"];
    defcons =0;
    changePlyr =false;

    console.log ("Playerselection flag is "+ playerSelected+ ", defender is " + defender+ ", player array length is " + machinePlyrs.length + ", defcons= "+ defcons);

    //add the button resets here as well 
}

// console.log("array is !!!!!!!!!!!!!!!!!!!"+ machinePlyrs[0].name );//this does not workkkkkkkkkkkk

function foo(){
    $('.tester2').html();
    for (var i = 0; i<machinePlyrs.length; i++){
        var crystal = $("<btn>");
        crystal.addClass("myClass");
        crystal.attr("some-value", machinePlyrs[i]);
        $('.tester2').append(crystal);
    }
}

foo();

function buttonGen(y) {
        
    var temp = machinePObjs[y].name;
    return '<button type="button" class="player'+ y +'">'+ temp +'</button>';
} //this seems to work

//this decides the logic if button should go into one div or another, along with passing appropriate html code
//accepts a number that is index of playerX in two array for either using object variables or simply object name string
//returns jquery for correct button code in correct conditions, for correct location  
function select1(x) {
    // console.log (" this long this works to "+x);
    //if button is not already selected (regardless of position in dom), and the defender has not been assigned
    //assigns defender, places in inRing area, flags index as selected, empties playerBtn div, so that a for loop can populate again with the rest of the unselected buttons
    if (alreadySelected.includes(x)===false && defender!=""){
        defender = machinePObjs[x];
        alreadySelected.push(x);
        console.log("defender is " + defender.name);
        $('.playerBTn').html();
        for (var i = 0; i<machinePlyrs.length; i++){
            if(alreadySelected.includes(i)){
                $('.inRing').html(buttongen(i));
            }
            else {
                $('.playerBTn').append(buttonGen(i));
            }
        }
    }           
    //BUT if button is not already selected, defender has been  and contender has not been..
    else if(defender!="" && contender===""&&alreadySelected.includes(x)===false){
        contender = machinePObjs[x];
        console.log("contender is "+ contender.name);
        $('.inRing').html('<button type="button" class="player2">Tatanka</button>');
    }
}


// testing
console.log("defender is "+defender.name+"and health is now"+ defender.health);
console.log("contender is "+contender.name+"and health is now"+ contender.health); 
attack();
console.log("defender is "+defender.name+"and health is now"+ defender.health);
console.log("contender is "+contender.name+"and health is now"+ contender.health); 
// attack();
reset();
// defender = player4;
// contender = player2;  
// console.log("defender is "+defender.name+"and health is now"+ defender.health);
// console.log("contender is "+contender.name+"and health is now"+ contender.health); 
// // attack();



//enclose the instructions in a $(document).ready(function()------------------------------------------------------------------------------------
$(document).ready(function() {
    // console.log("document ready");
    $(".inring2").text("testing inring2");//testing
    $(".inRing").text("testing inRing");//testing
    $(".ChooseP").text("testing ChooseP");//testing
    
    //onclick event 
    $(".myAtkBtn").on("click",function(){
        
        
        // console.log("my attack button works");
        if (defender !="" && contender !="" && changePlyr === false){
            if((defender.health<1 || contender.health<1) && machinePlyrs.length>0) {
                changePlyr= true;//this should also be outside?
                alert("Nope, Choose another wrestler");
                this.disabled =true;
            }
            else if(defender.health<1 || contender.health<1){
                alert("You won, choose new Defender..");
                this.disabled =true;
            }
            else{
                console.log(" attack button pressed");
                attack();
                console.log("defender is "+defender.name+"and health is now"+ defender.health);
                console.log("contender is "+contender.name+"and health is now"+ contender.health); 
                $(".status").text(" attacked x" + atkNum+ " times!!!");//testing
                atkNum+=1;
            }
        }

    });

    // $(".playerBTn").on("click",function(){
    //     console.log("Choosing works for all buttons!")
    //     // $(".playerBtn").disabled = true;//this does not work!!!
    //     console.log(this.name);
    //tried to put all 4 buttons under same rule of first choice
    // });
   
     //test code to pass a class name to the function - works
    //  $(".tester").on("click",function(){
    //     var boo = $(".tester")[0].className;
    //     console.log(boo);
    // });

    //This generates the code for any button in any location
    


    $(".player1").on("click", function(){
        var num = machinePlyrs.indexOf($(".player1")[0].className);
        select1(num);
        
    });

    $(".player2").on("click",function(){
        //this works but check if reset 
        var num = machinePlyrs.indexOf($(".player2")[0].className);
        select1(num); 

    });

    // $(".player1").on("click",function(){
    //     //this works but check if reset
    //     if (defender ===""){
    //         defender = player1;

    //         console.log("defender is " + defender.name);
    //         $('.playerBTn').html
    //         (
    //         '<button type="button" class="player2">Tatanka</button>'+ ' '+
    //         '<button type="button" class="player3">Yokozuna</button>'+ ' '+
    //         '<button type="button" class="player4">Undertaker</button>' 
    //         );
    //         $('.inRing').html('<button type="button" class="player1">Lex Luger</button>');
    //     }
    //     else {
    //         console.log("defender is already " + defender.name);
    //     }
    // });


    // $(".player2").on("click",function(){
    //     //this works but check if reset
    //     if (defender ===""){
    //         defender = player2;

    //      console.log("defender is " + defender.name);
    //      console.log("defender is " + defender.name);
    //         $('.playerBTn').html
    //         (
    //         '<button type="button" class="player1">Lex Luger</button>'+ ' '+
    //         '<button type="button" class="player3">Yokozuna</button>'+ ' '+
    //         '<button type="button" class="player4">Undertaker</button>' 
    //         );
    //         $('.inRing').html('<button type="button" class="player2">Tatanka</button>');
    //     }
    //     else {
    //         console.log('defender is already ' + defender.name);
    //     }   

    // });

    $(".player3").on("click",function(){
        //this works but check if reset
        if (defender ===""){
            defender = player3;

         console.log("defender is " + defender.name);
         console.log("defender is " + defender.name);
            $(".playerBTn").html
            (
            '<button type="button" class="player1">Lex Luger</button>'+ ' '+
            '<button type="button" class="player2">Tatanka</button>'+ ' '+
            '<button type="button" class="player4">Undertaker</button>' 
            );
            $('.inRing').html('<button type="button" class="player3">Yokozuna</button>');
        }   

    });

    $(".player4").on("click",function(){
        //this works but check if reset
        if (defender ===""){
            defender = player4;

         console.log("defender is " + defender.name);
         console.log("defender is " + defender.name);
            $(".playerBTn").html
            (
            '<button type="button" class="player1">Lex Luger</button>'+ ' '+
            '<button type="button" class="player2">Tatanka</button>'+ ' '+
            '<button type="button" class="player3">Yokozuna</button>' 
            );
            $('.inRing').html('<button type="button" class="player4">Undertaker</button>' );
        }   

    });
   

    

});



// you click on a card it checks correct set & assigns to defender deck and position
// sets contender if defender is not empty and if correct set is selected
// function for moving card into position a for loop
// attack function
    // this increments D's attack 
    // reduce healths and check if 0 or less
//logic for hiding / removing defeated defenders


//function for resetting setup


//1.create card with name picture and bottom name
//2 Change location of card with all values being relative...bootstrap? css with positioning
    //drag and drop elements
    //curved edges






// Help
// Go through the crystal example(12)
// captain planet for moving stuff

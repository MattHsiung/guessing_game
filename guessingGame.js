/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess = 0
var winningNumber = generateWinningNumber()
var guessArray =[]

$( document ).ready(function(){
	$("#star").hide()
	$("#hint").css("visibility", "hidden")
	
});

/* **** Guessing Game Functions **** */

//animations
function bounce(x){
	$(x).animate({top: "-=20"}, 70).animate({top: "+=20"}, 70)
}

function starMove(){
	var num1 = Math.floor(Math.random()*100)
	var num2 = winningNumber+num1

	$("#star").text(num2+"-"+num1)


	$("#star").animate({
			top: "+=20",
			right: "-=80"},300)

	for(var i = 0; i<9;i++){

		$("#star").animate({
			top: "-=80",
			right: "-=80"},150).animate({
			top: "+=80",
			right: "-=80"		
			},300)		
	}

	$("#star").animate({
			top: "-=20",
			right: "+=1520"},1,	function(){$("#star").hide()})	
}


// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random()*100)
}

// Fetch the Players Guess
function fetch(){
	if($("#input").val()===""){
		bounce("#message");
	}else{
		bounce("#guess");
		playersGuessSubmission();
		checkGuess(); 
	}
}


function playersGuessSubmission(){
	// add code here
	//take value of input and assign to playersGuess
	playersGuess = parseInt($("#input").val());	
	$("#input").val("")
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	if (winningNumber > playersGuess){
		return "Your guess is lower and "
	} else {
		return "Your guess is higher and "
	}

}

function guessMessage(){
	var diff = Math.abs(winningNumber - playersGuess)
	var str =""
	if (diff >= 50){str ="not even close! >_<"
	}else if(diff >= 25 && diff < 50){str ="within 50 digits of the winning number!"
	}else if(diff >= 10 && diff < 25){str ="within 25 digits of the winning number!"
	}else if(diff > 5 && diff < 10){str ="within 10 digits of the winning number!"
	}else {str ="within 5 digits of the winning number! OMG!"}

	return lowerOrHigher() + str

}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	$("g").text("")

	var alreadyGuessed = false
	// add code here
	if (playersGuess === winningNumber){
		//'you win' message
		$("#message").text("You Win!")
		//end game
			//hide guess button
		$("#guess").hide()
		$("#input").css("visibility", "hidden")
		$("#guessMessage").css("visibility", "hidden")
		$('<div id="lose"></div>').insertBefore('#btn')
		$('<img id="win" src="img/win.png" />').prependTo("#lose")
		$("#win").css("position", "relative").css("padding-top", "348px")
		$("#win").animate({top: "-=348"},600)

		
	}else{
		//if guess exists (in array)
		for(var i = 0; i < guessArray.length; i++){
			if (playersGuess === guessArray[i]){
				alreadyGuessed = true
			}
		}

			//"you already guessed that silly"
			
		if (alreadyGuessed){
			$("#message").text("You already guessed that silly!")
			bounce("#message");
		} else {
			//'try again' message
			$("#message").text("Try again!")
			
			//add guess to array of guesses
			guessArray.push(playersGuess);
			
			//check hot or cold?
			$("#guessMessage").text(guessMessage())
	
		}
//*******LOSE*******
		//if guess array is 5 
			//hide button

		if(guessArray.length >= 5){
			$("#guess").hide()
			$("#message").text("Nice try! Reset to play again!")
			$("#input").css("visibility", "hidden")
			$("#guessMessage").css("visibility", "hidden")
			$('<div id="lose"></div>').insertBefore('#btn')
			$('<img id="bowser" src="img/bowser.png"/>').prependTo("#lose")
			$("#bowser").css("position", "relative").css("padding-top", "348px")
			$("#bowser").animate({top: "-=348"},600)


		}

//****TURNS*****
		$("#lives").text(" x" + (5 - guessArray.length))
		
//****Shows hint on last life****
		if(guessArray.length >3){
			$("#hint").css("visibility", "")
		}

	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	$("#star").show()
	bounce("#hint");
	starMove();	

}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	guessArray = []
	playersGuess = 0
	winningNumber = generateWinningNumber()
	$("#lives").text(" x5")
	$("#message").text("Guess a number between 1 and 100!")
	$("#guessMessage").text("Good luck!")
	$("#guess").show()
	$("#input").css("visibility", "")
	$("#guessMessage").css("visibility", "")
	$("#hint").css("visibility", "hidden")
	$("#lose").remove()

}


/* **** Event Listeners/Handlers ****  */

$("#reset").click(function(){
	bounce("#reset");
	playAgain();
})


$("#hint").click(function(){
	provideHint()	
})

$("#input").keydown(function(e){
	if(e.which==13){	
		fetch()
		return false
	}
})

$("#guess").click(function(){		
		fetch()

})



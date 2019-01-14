
var questions = [];

var timerLimit = 10;
var timerStatus = timerLimit;

var timerInterval;

var answers = {}; // keys like 0, 1, 2, 3


function resetTimer() {
	timerStatus = timerLimit;	// resetting the timer to the default limit
	$("#timer").text(timerStatus);	// tell the html page to display timerStatus
}

function stopGame() {
	clearInterval(timerInterval);
	var correct = 0;
	var incorrect = 0;
	for (var q=0;q<myQuestions.length;q++) {
		if (answers[q]==undefined) {
			incorrect++;
		} else {
			if (answers[q] == myQuestions[q].correctAnswer) {				
				correct++;
			} else {
				incorrect++;
			}
		}
	}
	$("#board").html("");
	$("#board").append("<p>Number Correct: " + correct + "</p>");
	$("#board").append("<p>Number Incorrect: " + incorrect + "</p>");
	$("#board").append("<p>Game Over!</p>");
	
	
}

function pickAnswer(q, a) {
	answers[q] = a;
	console.log(q, a);
	console.log(answers);
}

function reduceTimer() {
	timerStatus--;
	$("#timer").text(timerStatus);	// tell the html page to display timerStatus
	if (timerStatus < 1) {
		stopGame();
	}
}

function drawQuestion(q, question) {
	
	console.log(question);
	var questionDiv = document.createElement("div");
	questionDiv.className = "question";	
	questionDiv.id = "question_"+q;
	
	var p = document.createElement("p");
	p.innerHTML = question.text;
	questionDiv.appendChild(p);
	
	var choicesDiv = document.createElement("div");
	choicesDiv.className = "choices";
	questionDiv.appendChild(choicesDiv);

	
//	for (var c=0;c<question.choices.length;c++) {	// This would work for an array
	for (var c in question.choices) {	// this works for an object with keys
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.value = c;
		radio.name = "answer_" + q;
		radio.addEventListener("click", function() {
			pickAnswer(q, this.value);
		});
		var span = document.createElement("span");
		span.innerHTML = question.choices[c];
		var div = document.createElement("div");
		div.appendChild(radio);
		div.appendChild(span);
		choicesDiv.appendChild(div);
	}
	
	document.getElementById("board").appendChild(questionDiv);
}

function drawQuestions() {
	for (var q=0;q<myQuestions.length;q++) {
		drawQuestion(q, myQuestions[q]);
	}
}

function startGame() {
	resetTimer();
	answers = {};
	$("#board").html("");	// clear out the innerhtml of our game board
	drawQuestions();
	timerInterval = setInterval(reduceTimer, 1000);
}











$(window).on("load", function() {

	$("#btnStart").on("click", startGame);

});




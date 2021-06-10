function populate(){
	if(quiz.isEnded()){
		showScores();
	}
	else{
		var element=document.getElementById("question");
		element.innerHTML=quiz.getQuestionIndex().text;

		var choices=quiz.getQuestionIndex().choices;
		for(var i=0;i<choices.length;i++)
		{
			var element = document.getElementById("choice"+i);
			element.innerHTML=choices[i];
			guess("btn"+i,choices[i]);
		}
		showProgress();
	}
};

function guess(id,guess){
	var button = document.getElementById(id);
	button.onclick=function(){
		quiz.guess(guess);
		populate();
	}
};

function showProgress(){
	var currentQuestionNumber=quiz.questionIndex+1;
	var element = document.getElementById("progress");
	element.innerHTML="Question "+currentQuestionNumber +" of "+quiz.questions.length;

};

function showScores()
{
	var gameOverHtml="<h1> Result of the quiz..</h1>"
	gameOverHtml+="<h2 id='score'>Your Score is :  "+quiz.score+"</h2>";
	var element=document.getElementById("quiz");
	element.innerHTML=gameOverHtml;
  score() ;
  updateScore();

};


var questions=[
	new Question("What's Paridhi all-time favorite desert ?",["choclate","icecream","both a and b ","sweets "],"both a and b "),
	new Question("which is Paridhi's favourite band ?",["BTS","blackpink","one direction ","both a and b "],"both a and b "),
	new Question("who is paridhi's fav indian singer ?",["neha kakar ","tony kakar ","arjit singh","atif aslam"],"arjit singh"),
	new Question("what is pridhi's mom name ",["pinky","sushma","ankita "],"pinky"),
	new Question("how many sibling does paridhi have ",["1","2","3","4"],"2"),
	new Question("do paridhi love dogs",["no","yes",],"yes"),
	new Question("Which is paridhi fav color?",["red","purple","blue","all of them "],"all of them "),
	new Question("which is paridhi fav icecream flavoure",["choclate ","vanila ","strawberry ","all of them"],"choclate "),
	new Question("what type of hair dose paridhi like ?",["short","long","average","all"],"all"),
	new Question("What type of food does paridhi prefer",["spicy food","mild food","sweet food","sour food"],"spicy food")
];
var quiz=new Quiz(questions);
populate();

function score(){
	var marks=database.ref('score')
	marks.on("value",(data)=>{
		score=data.val();

	})
}

function updateScore(){
database.ref('/').update({
	score:quiz.score
})


}
//SET UP THE TIMER FOR THE QUIZ 
var timerEl = document.querySelector("#timer");
var mainEl = document.querySelector("#main"); //CONNECTING THE HTML MAIN TO JS
var questionEl = document.querySelector("#quiz-heading"); //DIPLAY THE QUESTION TO THE HTML MAIN = H1
var messageEl = document.querySelector("quiz-body"); //DISPLAY THE MESSAGE/BUTTO FROM THE HTML DIV THAT IS WITHIN THE MAIN ELEMENT 
var startBtn = document.querySelector("#start-quiz"); //SET THE START BUTTON FOR A CLICK EVENT
var resultEl =document.querySelector("#result"); //CAPTURE THE RESULTS FROM THE QUIZ

//VARIABLES 
var testQuestions = [
    {
        question: "What is the Question?",
        options:["a" , "b" , "c" , "d"],
        answer: "4"
    },
    {
        question: "What is the Question?",
        options:["a" , "b" , "c" , "d"],
        answer: "4"
    },
    {
        question: "What is the Question?",
        options:["a" , "b" , "c" , "d"],
        answer: "4"
    },
    {
        question: "What is the Question?",
        options:["a" , "b" , "c" , "d"],
        answer: "4"
    }
];

var indexNum = 0;
var timer = 59;
var correct = 0;
var wrong = 0;
var play = true;
var highScore = [];

//SHUFFLE THE QUESTIONS FOR THE QUIZ 
var shuffle = function(array) {
    var ctr = array.length, temp, index;
    while (ctr > 0) { //WHILE THERE ARE ELEMENTS IN THE ARRAY
        index = Math.floor(Math.random() * ctr); //PICKING A RANDOM INDEX 
        ctr--; //DECREASE CTR BY 1 
        temp = array[ctr]; //SWAPPING THE ELEMENTS WITH IT 
        array[ctr] = array[index]; //SWAPPING THE ELEMENTS WITH IT 
        array[index]= temp; //SWAPPING THE ELEMENTS WITH IT 
    } 
    return array;
};

//CREATE THE FUNCTION FOR TIMER 
var countdown = function() {
    var timeInterval = setInterval(function() {
        if(timer > 0 && play === true) {
            timerEl.innerText = timer;
            timer--;
        } else {
            timerEl.innerText = timer;
            timerEl.setAttribute("style", "color: red;");
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
};


//CREATE THE START TIMER AND START QUIZ 
var startQuiz =function() {
    shuffle(testQuestions); //START BY SHUFFLING THE QUESTIONS
    countdown(); //ALLOWING THE TIMER TO START 
    questionEl.setAttribute("style", "text-align: center;"); // STYLING THE ELEMENTS 
    messageEl.setAttribute("style", "margin-left: 25px; width: fit-content;"); //STYLING THE ELEMENTS 
    startBtn.remove(); //REMOVE THE START BUTTON 
    runQuiz();
};

//FUNTION THAT WILL START TIMER AND BEGIN QUIZ 
var runQuiz = function() {
    if (indexNum === testQuestions.length) { //THIS IS SAYING THAT IF THE INDEXNULL IS GREATER THAN THE LENGTH OF THE QUESTIONS- END THE QUIZ 
        play = false;
    } else {
        var question = testQuestions[indexNum].question; //VARIABLES ARE CREATED TO FROM OBJECT IN QUESTIONS INDEX
        var options= testQuestions[indexNum].options; // SAME AS PREVIOUS MESSAGE 
        answer = testQuestions[indexNum].answer;
        questionEl.textContent = question; //THIS IS LINKING THE H1 TO THE QUESTION
        messageEl.textContent = ""; //CLEARING THE DIV CONTENT 
        for (var i = 0; i < options.length; i++) { //THE FOR LOOP IS APPENDING THE BUTTON TO THE DIV 
            var btnEl = document.createElement("button");
            btnEl.className = "btn guess-list";
            btnEl.setAttribute("btn-id", [i+1]);
            btnEl.textContent = `${[i+1]}, ${options[i]}`;
            messageEl.appendChild(btnEl);
        }
        indexNum++; //THIS WILL ALLOW TO USE IT THROUGHOUT THE QUIZ
    }
};

//FUNTION IS FOR WHEN THE USER CLICKS ON THE BUTTON "EVENTLISTENER" CLICK 
var guessHandler = function(event) {
    var targetEl = event.target; //WHEN USER CLICKS - BUTTON ACTION WILL ACTIVATE
    if (targetEl.matches(".guess-list")) { 
        var guessID = targetEl.getAttribute("btn-id"); //HTML BTN LINKED WITH GUESS - PASS THE USERS' GUESS TO COMPARE FUNTION
        guessCompare(guessID);
    }
};

//NEED A FUNTION TO COMPARE THE USERS' GUESS TO THE ANSWER 
var guessCompare = function(guessId) {
    if (guessId === answer) { //WHEN THE USER GUESSED A CORRECT ANSWER 
        timer += 3;  //WHEN USER ANSWER'S CORRECT ANSWER 3 SEC IS ADDED 
        correct++;
        resultEl.innerText = "CORRECT!";
        runQuiz();
    } else {
        timer -= 10; // WHEN USER IS WRONG THEY WILL GET 10 SEC IS MINUS 
        wrong++;
        resultEl.innerText = "!WRONG!";
        runQuiz(); // NEEDS TO RERUN THE FUNTION AGAIN 
    }
};

//WE NEED A FUNTION TO STOP THE QUIZ WHEN IT IS DONE OR WHNE THE TIMER RUNS OUT OF TIME 
var endQuiz = function() {
    if (timer < 0) {
        timer= 0;
        timerEl.innerText = timer;
    }
    questionEl.removeAttribute("style");
    questionEl.textContent = "Let's see how you did!";
    messageEl.innerHTML = `<div>You got ${correct} questions correct and ${wrong} questions wrong.</div><div>Your time score is: ${timer}.</div>`;
    
    var formEl = document.createAttribute("form");
    formEl.setAttribute("id", "initials-form")
    
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "user-initials");
    inputEl.className = "user-initials";
    inputEl.setAttribute("placeholder", "Enter your initials");
    formEl.appendChild(inputEl);

    var submitEl = document.createElement("button");
    submitEl.className = "btn";
    submitEl.setAttribute("id", "save-initials");
    submitEl.setAttribute("type", "submit");
    submitEl.textContent = "Submit";
    formEl.appendChild(submitEl);
    messageEl.appendChild(formEl);
};

var saveHighScore = function(event) {
    event.preventDefault();

    var targetEl = event.target;
    if (targetEl.matches("#save-initials")) {
        var formEl = document.querySelector(".user-initials");
        var userInitials = formEl.nodeValue

        if (!userInitials) {
            alert ("Please enter your initails to submit your score!");
            return false;
        } else {
            var highScoreObj = {
                initails: userInitials,
                score: timer
            };
            highScore.push(highScoreObj);
            localStorage.setItem("scores", JSON.stringify(highScore));
            location.replace("Users/Jesus/Desktop/projects/pop-quiz/highscore.html");
        }
    }
};

var loadScores = function() {
    highScores = localStorage.getItem("scores");
    if(!highScores) {
        highScores = [];
        return false;
    }
    highScore = JSON.parse(highScores)
};

startBtn.addEventListener("click", startQuiz); //ADDED AN EVENT LISTENER FOR CLICK FOR START BUTTON 
messageEl.addEventListener("click", guessHandler); //ADDED AN EVENT LISTENER FOR A CLICK OF A GUESS BUTTON DURING QUIZ 
mainEl.addEventListener("click", saveHighScore); //ADDED AN EVENT LISTENER FOR SUBMIT BUTTON

loadScores(); //HAVING THE LOCALSTORAGE STORE ANY HIGH SCORES 

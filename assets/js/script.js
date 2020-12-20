//NEED TO CREATE ELEMENTS FOR THE DOM MANIPULATION 
var timerEl = document.querySelector("#timer");//SET UP THE TIMER FOR THE QUIZ 
var mainEl = document.querySelector("#main"); //CONNECTING THE HTML MAIN TO JS
var questionEl = document.querySelector("#quiz-heading"); //DIPLAY THE QUESTION TO THE HTML MAIN = H1
var messageEl = document.querySelector("#quiz-body"); //DISPLAY THE MESSAGE/BUTTO FROM THE HTML DIV THAT IS WITHIN THE MAIN ELEMENT 
var startBtn = document.querySelector("#start-quiz"); //SET THE START BUTTON FOR A CLICK EVENT
var resultEl = document.querySelector("#result"); //CAPTURE THE RESULTS FROM THE QUIZ

//NEED TO CREATE A VARIABLE FOR POP QUIZ QUESTIONS 
var testQuestions = [
    {
        question: "DOM stans for what?",
        options: ["Document Override Method", "Document Object Model", "Decrement Object Material", "Do Observe More"],
        answer: "2"
    },
    {
        question: "What is used after a function name?",
        options: ["Semi Colon ;", "Square Brackets [ ]", "Parentheses ( )", "Curly Brackets { }"],
        answer: "3"
    },
    {
        question: "An array can contain:",
        options: ["Objects", "Strings", "Numbers", "All of the Above"],
        answer: "4" 
    },
    {
        question: "What is used to contain the OPERATION of a function?",
        options: ["Square Brackets [ ]", "Curly Brackets { }", "Parentheses ( )", 'Quotation Marks " "'],
        answer: "2"
    },
    {
        question: "A function will run automatically unless set as a variable.",
        options: ["True", "False"],
        answer: "2"
    },
    {
        question: "This will require the user to select 'OK' or 'Cancel'.",
        options: ["Confirm", "Alert", "Prompt", "Inform"],
        answer: "1"
    },
    {
        question: "This will require the user to input an answer:",
        options: ["Prompt", "Alert", "Confirm", "Window"],
        answer: "1"
    },
    {
        question: "Does a function must be called in order to run?",
        options: ["True", "False"],
        answer: "1"
    },
    {
        question: "A PROMPT from the user always returns as a:",
        options: ["Boolean", "Number", "String", "Variable"],
        answer: "3"
    },
    {
        question: "What is the index number of 'this' in this array: ['what', 'index', 'is, 'this']",
        options: ["This", "3", "i", "4"],
        answer: "2"
    },
    {
        question: "An object is contained in:",
        options: ["Parentheses ( )", "Colons : :", "Square Brackets [ ]", "Curly Brackets { }"],
        answer: "4"
    },
    {
        question: "API stands for:",
        options: ["Automatic Place Integer", "Application Pyramid Itemizer", "Automated Programmer Interface", "Application Programming Interface"],
        answer: "4"
    }
];
var timer = 59;
var indexNum = 0;
var correct = 0;
var wrong = 0;
var play = true;
var highScores = [];

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

//CREATE THE START TIMER AND START QUIZ 
var startQuiz =function() {
    shuffle(testQuestions); //START BY SHUFFLING THE QUESTIONS
    countdown(); //ALLOWING THE TIMER TO START 
    questionEl.setAttribute("style", "text-align: left;"); // STYLING THE ELEMENTS 
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

// WE NEED A FUNCTION TO STOP THE QUIZ WHEN IT IS DONE OR WHEN THE TIMER RUNS OUT 
var endQuiz = function() {
    if(timer < 0) { //WHEN USER HITS ZERO THE QUIZ WILL STOP! (MAKE SURE THAT IT WILL NOT GO NEGATIVE)
        timer = 0;
        timerEl.innerText = timer;
    }
    questionEl.removeAttribute("style"); //UPDATING THE DOM WHEN THE QUIZ HAS ENDED: REMOVES THE ATTRIBUTE WITHIN FROM AN ELEMENT
    questionEl.textContent = "Let's see how you did!";
    messageEl.innerHTML = //CREATING A DIV WITHIN JS THAT IS SENDING IT TO HTML TO CREATE 
                        `<div>
                        You got ${correct} questions correct and ${wrong} questions wrong.
                        </div>
                        <div>
                        Your time score is: ${timer}.
                        </div>`;

    var formEl = document.createElement("form"); //NEED TO CREATE A FORM WHEN GAME IS OVER FOR USER TO INPUT THEIR INITIALS
    formEl.setAttribute("id", "initials-form")

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "user-initials");
    inputEl.className = "user-initials";
    inputEl.setAttribute("placeholder", "Enter Your Initials");
    formEl.appendChild(inputEl);

    var submitEl = document.createElement("button");
    submitEl.className = "btn";
    submitEl.setAttribute("id", "save-initials");
    submitEl.setAttribute("type", "submit");
    submitEl.textContent = "Submit";
    formEl.appendChild(submitEl);
    messageEl.appendChild(formEl); //AFTER THE USER HAS ENTERED THE FIELDS IT NEEDS IT NEEDS TO APPEND IT TO THE MESSAGE
};

//NEED TO CREATE A FUNCTION WHERE THE USER IS ABLE TO SUBMIT THE SCORE WHEN CLICKED
var saveHighScore = function(event) {
    event.preventDefault(); //INVALID TEXT INPUT CAN BE STOPPED FROM REACHING THE INPUT FIELD 

    var targetEl = event.target; //THIS IS ACTIVATE ONLY IF THE SUBMIT BUTOON HAS BEEN CLICKED 
    if (targetEl.matches("#save-initials")) { 

        var formEl = document.querySelector(".user-initials"); //THIS IS GET THE "USER'S INITIALS" FORM ELEMENT 
        var userInitials = formEl.value

        if (!userInitials) {  //THE IF IS USED TO MAKE SURE THE USER HAS INPUTTED THE RIGHT INFORMATION BEFORE MOVING ON 
            alert("Please enter your initials before moving on!");
            return false;
        } else {
            var highScoreObj = {
                initials: userInitials,
                score: timer
            };
            highScores.push(highScoreObj); //THIS WILL PUSH THE OBJECT TO THE HIGHSCORES ARRAY
            localStorage.setItem("scores", JSON.stringify(highScores)); //THIS IS THE HIGHSCORES THAT IS STORED IN THE LOCAL STORAGE (CONVERSION TO STRING WITH THIS ELEMENT)
            location.replace("/Users/Jesus/Desktop/projects/pop-quiz/highscore.html"); //THIS IS THE SECOND HTML FILE TO SAVE THE HIGH SCORES ON 
        }
    }
};

//NEED A FUNCTION TO DATA STORE THE HIGH SCORE 
var loadScores = function() {
    highScores = localStorage.getItem("scores");
    
    if (!highScores) {
        highScores = [];
        return false;
    }
    highScores = JSON.parse(highScores); //The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
};

startBtn.addEventListener("click", startQuiz); //ADDED AN EVENT LISTENER FOR CLICK FOR START BUTTON 
messageEl.addEventListener("click", guessHandler); //ADDED AN EVENT LISTENER FOR A CLICK OF A GUESS BUTTON DURING QUIZ 
mainEl.addEventListener("click", saveHighScore); //ADDED AN EVENT LISTENER FOR SUBMIT BUTTON

loadScores(); //HAVING THE LOCALSTORAGE STORE ANY HIGH SCORE
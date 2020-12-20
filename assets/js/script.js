//SET UP THE TIMER FOR THE QUIZ 
var timerEl = document.querySelector("#timer");

//VARIABLES 
var questions = [
    {
        question: "What is the Question?",
        options:["a" , "b" , "c" , "d"],
        answer: "4"
    },
];

var timer = 59


//CREATE THE FUNCTION FOR TIMER 
var countdown =function(){
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
var shuffle = function(){
    var ctr = array.length, temp, index;
    while (ctr > 0) { //WHILE THERE ARE ELEMENTS IN THE ARRAY
        index = Math.floor(Math.random() * ctr); //PICKING A RANDOM INDEX 
        ctr--; //DECREASE CTR BY 1 
        temp = array[ctr]; //SWAPPING THE ELEMENTS WITH IT 
        array[ctr] = array[index]; //SWAPPING THE ELEMENTS WITH IT 
        array[index]= temp; //SWAPPING THE ELEMENTS WITH IT 
    } return array;
};

//CREATE THE START TIMER AND START QUIZ 
var startQuiz =function() {

};
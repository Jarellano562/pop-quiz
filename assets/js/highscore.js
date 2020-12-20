var ulEl = document.querySelector("#scores");
var returnEl = document.querySelector("#return-button") //RETURN BUTTON
var clearEl = document.querySelector("#clear-button"); //CLEAR THE SCORES WITH A CLICK

var highScores = []; 

var loadScores = function() {  //CREATE A FUNTION TO GET AND SCORES TO THE LOCALSTORAGE
    highScores = localStorage.getItem("scores");
    if(!highScores) { //CHECKING IF SCORES ARE NULL
        highScores = []; 
        return false;
    }

    highScores = JSON.parse(highScores); //CONVERSION FROM S STRINGFIELD FORMAT TO AN ARRAY OF OBJECTS 
    for(var i = 0; i < highScores.length; i++) { //ADDING A LIST FOR ALL THE INPUTTED HIGH SCORES 
        
        var listItemEl = document.createElement("li");
        listItemEl.className = "listed-score";
        
        var nameEl = document.createElement("div");
        nameEl.className = "score-info";
        nameEl.textContent = `Initials: ${highScores[i].initials} Score: ${highScores[i].score}`;
        listItemEl.appendChild(nameEl);
        ulEl.appendChild(listItemEl);
    }
};

var goToIndex = function() { //CREATING A FUNCTION THAT WILL TAKE THE USER BACK TO THE POP QUIZ 
    location.replace("/Users/Jesus/Desktop/projects/pop-quiz/index.html");
};


var clearScores = function() { //CREATING A FUNCTION THAT WILL CLEAR THE HIGH SCORES STORED IN LOCALSTORAGE
    highScores = [];
    localStorage.setItem("scores", highScores);
    location.reload();
};

returnEl.addEventListener("click", goToIndex); //EVENT LISTENER FOR THE CLICK TO RETURN 
clearEl.addEventListener("click", clearScores); // EVENT LISTENER FOR THE CLICK TO CLEAR 

loadScores();
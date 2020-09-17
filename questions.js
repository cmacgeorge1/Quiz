// Array for questions 
var myQuestions = [
    {
        title: "JavaScript was invented by:",
        answers: ["Brendan Eich", "Donald Trump", "Al Gore", "Mel Gibson"],
        correctAnswer: "Brendan Eich",
    },
    {
        title: "Which symbol is used for comments in Javascript?",
        answers: ["//", "?", "<>", "$"],
        correctAnswer: "//",
    },
    {
        title: "Which is not a loop structure in JavaScript?",
        answers: ["for", "wild", "while", "do-while"],
        correctAnswer: "wild",
    },
    {
        title: "Which are the types of pop up boxes available in JavaScript?",
        answers: ["alert", "confirm and", "prompt", "all of the above"],
        correctAnswer: "all of the above",
    },
    // {
    //     title:
    //     answers:
    //     correctAnswer:
    // },
]

// Variables
var score = 0;
var questionsIndex = 0;

// variables in working code
var realTime = document.querySelector("#realTime");
var timer = document.querySelector("#startQuiz");
var questions = document.querySelector("#questions");
var container = document.querySelector("#container");

// Time variables
var remainingTime = 75;
var penaltyTime = 10;
var timeInterval = 0;
var createUl = document.createElement("ul");


// Start timer and quiz events, timer shows on screen
timer.addEventListener("click", function() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            remainingTime--;
            realTime.textContent = "Time: " + remainingTime;

            if (remainingTime <= 0) {
                clearInterval(timeInterval);
                allDone();
                realTime.textContent = "Time is up!!!";
            }
        }, 1000);
    } 
    render(questionsIndex);
});

// Put questions and choices on the page
function render(questionsIndex) {
    // Clear existing data
    questions.innerHTML = "";
    createUl.innerHTML = "";
    // Loop through all in array
    for (var i = 0; i < myQuestions.length; i++) {
        var userQuestion = myQuestions[questionsIndex].title;
        var userChoices = myQuestions[questionsIndex].answers;
        questions.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questions.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Compare users choice to correctAnswer
function compare (event) {
    var element = event.target;

    if (element.matches("li")) {
        
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        //User answewrs CORRECT
        if (element.textContent == myQuestions[questionsIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct. The answer is: " + myQuestions[questionsIndex].correctAnswer;
        } else {
            remainingTime = remainingTime - penaltyTime;
            createDiv.textContent = "Incorrect. Correct answer is: " + myQuestions[questionsIndex].correctAnswer;
        }
    }

    questionsIndex++;

    if (questionsIndex >= myQuestions.length) {
        allDone();
        createDiv.textContent = "End of Quiz" + " " + "You got " + score + "/" + myQuestions.length + "Correct!";
    } else {
        render(questionsIndex);
    }
    questions.appendChild(createDiv);
}

function allDone() {
    questions.innerHTML = "";
    remainingTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!!!";

    questions.appendChild(createH1);

    var createPara = document.createElement("p");
    createPara.setAttribute("id", "createPara");

    questions.appendChild(createPara);

    if (remainingTime >= 0) {
        var realTime = remainingTime;
        var createPara2 = document.createElement("p");
        clearInterval(timeInterval);
        createPara.textContent = "Your final score is: " + timeRemaining;

        questions.appendChild(createPara2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials here: ";

    questions.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text")
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questions.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    questions.appendChild(createSubmit);

    //eventlistener to store initials and local storage
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No Value")
        } else {
            var finalScore = {
                initials: initials,
                score: remainingTime
            }
            console.log(finalScore)
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores)
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            // window.location.replace
        }
    });
}



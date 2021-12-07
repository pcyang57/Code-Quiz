var startButton = document.getElementById('start-btn')
var questionContainerEl = document.getElementById('questionContainer')
var answerContainerEl = document.getElementById('answer-container')
var questionEl = document.getElementById('question')
var timerEl = document.getElementById('timerContainer')
var answerBtnEl = document.getElementsByClassName("answer-btn")
var endGameContainerEl = document.getElementById('endGame')
var quizContainerEl = document.getElementById("quiz")

var highScore = [];

startButton.addEventListener('click', function () {
    startGame();
    countdown();
})

//timer will count down when the game starts 
var secondsLeft = 45;

function countdown() {
    timerEl.classList.remove("hide")
    var timer = setInterval(function () {
        secondsLeft--;
        document.getElementById("timer").textContent = secondsLeft;

        if (question.length == currentQuestionIndex + 1) {
            clearInterval(timer);
            highScore.push(secondsLeft);
            // console.log(secondsLeft);
            localStorage.setItem("highScore", JSON.stringify(highScore))

        } else if (secondsLeft <= 0) {
            clearInterval(timer);
            highScore.push(secondsLeft);
            localStorage.setItem("highScore", JSON.stringify(highScore))
        }

    }, 1000);
}

function startGame() {
    startButton.classList.add("hide");
    shuffledQuestion = question.sort(() => Math.random() - .5); //shuffle my question
    currentQuestionIndex = 0; // sets the first question
    questionContainerEl.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetAnswer()
    showQuestion(shuffledQuestion[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answer.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        button.addEventListener("click", function () {
            if (answer.correct === false) {
                // console.log(secondsLeft)
                secondsLeft = secondsLeft - 20;                
            }
            selectAnswer()
        });
        answerContainerEl.appendChild(button);
    })
}


function selectAnswer() {
    if (question.length <= currentQuestionIndex + 1) {
        // console.log("end game")
        endGame()

    } else {
        currentQuestionIndex++
        setNextQuestion()
    }
}

//fixes bug where old answer button stayed on screen
function resetAnswer() {
    while (answerContainerEl.firstChild) {
        answerContainerEl.removeChild(answerContainerEl.firstChild)
    }
}

//game Ender supposed to save time > then unhide End game card
function endGame() {
    // questionContainerEl.classList.add("hide");
    quizContainerEl.classList.add("hide");
    endGameContainerEl.classList.remove('hide');

}

document.getElementById('initialForm').addEventListener("submit", function (event) {
    event.preventDefault();
    saveScore();
    renderScore();
    document.getElementById('initialForm').classList.add('hide')
})

function saveScore() {
    var score = {
        time: highScore,
        name: document.getElementById('initialText').value,
    }
    localStorage.setItem("score", JSON.stringify(score));
}

function renderScore() {

    var ScoreRender = JSON.parse(localStorage.getItem("score"));
    if (ScoreRender !== null) {
        document.getElementById("initial").innerHTML = ScoreRender.name;
        document.getElementById("score").innerHTML = ScoreRender.time;

    } else {
        return;
    }
}

var question = [
    {
        question: "What color is pikachu?",
        answer: [
            { text: "Yellow", correct: true },
            { text: "Pink", correct: false },
            { text: "Green", correct: false },
            { text: "Purple", correct: false }
        ]
    },
    {
        question: "What is a starter that is red from the Kanto region?",
        answer: [
            { text: "Magmar", correct: false },
            { text: "Charmander", correct: true },
            { text: "Magikarp", correct: false },
            { text: "Ash", correct: false }
        ]
    },
    {
        question: "Who here is a water type?",
        answer: [
            { text: "pikachu", correct: false },
            { text: "onix", correct: false },
            { text: "blastoise", correct: true },
            { text: "brock", correct: false }
        ]
    },
    {
        question: "who here is not a starter pokemon?",
        answer: [
            { text: "squirtle", correct: false },
            { text: "bulbasuar ", correct: false },
            { text: "charmander", correct: false },
            { text: "mew", correct: true }
        ]
    },
    {
        question: "what element is mew?",
        answer: [
            {text:"psychic", correct: true},
            {text:"fire", correct: false },
            {text:"dragon", correct: false },
            {text:"electric", correct: false }
        ]
    },
    {
        question: "what region is ash from?",
        answer: [
            {text:"England", correct: false},
            {text:"kanto", correct: true },
            {text:"galar", correct: false },
            {text:"johto", correct: false }
        ]
    },
    {
        question: "how many regions are there?",
        answer: [
            {text:"4", correct: false},
            {text:"23", correct: false },
            {text:"9", correct: true },
            {text:"12", correct: false }
        ]
    },
    {
        question: "who does magikarp turn into?",
        answer: [
            {text:"machamp", correct: false},
            {text:"raichu", correct: false },
            {text:"ash", correct: false },
            {text:"gyarados", correct: true }
        ]
    },
    {
        question: "what color is shiny gyarados?",
        answer: [
            {text:"red", correct: true},
            {text:"blue", correct: false },
            {text:"pink", correct: false },
            {text:"rainbow", correct: false }
        ]
    },
    {
        question: "how many forms are for pikachu?",
        answer: [
            {text:"5", correct: false},
            {text:"6", correct: false },
            {text:"3", correct: true },
            {text:"2", correct: false }
        ]
    },
]
// Question bank - Add more questions as needed
const questionBank = [
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var x = 5;", "variable x = 5;", "v x = 5;", "declare x = 5;"],
        correct: 0
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correct: 1
    },
    {
        question: "What does '===' operator do in JavaScript?",
        options: ["Assigns a value", "Compares values only", "Compares values and types", "Creates a new variable"],
        correct: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function = myFunction() {}", "function myFunction() {}", "create myFunction() {}", "def myFunction() {}"],
        correct: 1
    },
    {
        question: "What is the result of 'typeof null' in JavaScript?",
        options: ["null", "undefined", "object", "boolean"],
        correct: 2
    },
    {
        question: "Which method is used to remove the last element from an array?",
        options: ["pop()", "remove()", "delete()", "splice()"],
        correct: 0
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: ["# This is a comment", "<!-- This is a comment -->", "// This is a comment", "/* This is a comment"],
        correct: 2
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
        correct: 2
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
        correct: 1
    },
    {
        question: "How do you round the number 7.25 to the nearest integer?",
        options: ["round(7.25)", "Math.round(7.25)", "Math.rnd(7.25)", "rnd(7.25)"],
        correct: 1
    },
    {
        question: "What is the correct JavaScript syntax to change the content of an HTML element?",
        options: ["document.getElement('p').innerHTML = 'Hello World!'", "document.getElementByName('p').innerHTML = 'Hello World!'", "document.getElementById('demo').innerHTML = 'Hello World!'", "#demo.innerHTML = 'Hello World!'"],
        correct: 2
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["*", "=", "x", "-"],
        correct: 1
    },
    {
        question: "What will the following code return: Boolean(10 > 9)?",
        options: ["true", "false", "NaN", "undefined"],
        correct: 0
    },
    {
        question: "How can you detect the client's browser name?",
        options: ["navigator.appName", "browser.name", "client.navName", "window.browser"],
        correct: 0
    },
    {
        question: "Which method can be used to find the length of a string?",
        options: ["length()", "size()", "len()", "length"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let selectedQuestions = [];
let userAnswers = [];
let score = 0;
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;
const totalQuestions = 10;

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Start exam
function startExam() {
    // Randomly select questions without repetition
    selectedQuestions = shuffleArray(questionBank).slice(0, totalQuestions);
    userAnswers = new Array(totalQuestions).fill(null);
    
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('examScreen').classList.remove('hidden');
    
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 600;
    
    startTimer();
    displayQuestion();
    updateProgress();
    updateScore();
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 60) {
            document.getElementById('timerContainer').classList.add('time-warning');
        }
        
        if (timeLeft <= 0) {
            endExam();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Display current question
function displayQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        
        if (userAnswers[currentQuestionIndex] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').textContent = 
        currentQuestionIndex === totalQuestions - 1 ? 'Finish Exam' : 'Next Question';
}

// Select option
function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update visual selection
    document.querySelectorAll('.option').forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
    });
    
    updateScore();
}

// Next question
function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateProgress();
    } else {
        endExam();
    }
}

// Previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateProgress();
    }
}

// Update progress
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQ').textContent = totalQuestions;
}

// Update score
function updateScore() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && selectedQuestions[index] && answer === selectedQuestions[index].correct) {
            score++;
        }
    });
    document.getElementById('currentScore').textContent = score;
}

// End exam
function endExam() {
    clearInterval(timerInterval);
    
    document.getElementById('examScreen').classList.add('hidden');
    document.getElementById('resultsScreen').classList.remove('hidden');
    
    const percentage = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('finalScore').textContent = `${score}/${totalQuestions}`;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    
    let message;
    if (percentage >= 90) {
        message = "Excellent! Outstanding JavaScript knowledge!";
        document.getElementById('finalScore').style.color = '#28a745';
    } else if (percentage >= 70) {
        message = "Good job! You have a solid understanding of JavaScript.";
        document.getElementById('finalScore').style.color = '#ffc107';
    } else {
        message = "Keep practicing! Review JavaScript fundamentals and try again.";
        document.getElementById('finalScore').style.color = '#dc3545';
    }
    
    document.getElementById('resultMessage').textContent = message;
}

// Restart exam
function restartExam() {
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    document.getElementById('timerContainer').classList.remove('time-warning');
}

// Initialize
document.getElementById('totalQuestions').textContent = totalQuestions;
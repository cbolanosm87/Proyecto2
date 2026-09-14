// =====================================
// QUESTIONS
// =====================================

let questions = [
  {
    question: "What does ATC stand for?",
    options: [
      "Air Traffic Control",
      "Air Transport Center",
      "Aircraft Technical Control",
      "Airport Traffic Command"
    ],
    correctAnswer: 0
  },

  {
    question: "What does ICAO stand for?",
    options: [
      "INTERNATIONAL CIVIL AUTHORITIES ORGANISM",
      "INTERDEPENDENT CIVIL AVIATION ORGANIZATION",
      "INTERNATIONAL CIVIL AVIATION ORGANIZATION",
      "INTERNATIONAL CIVIL AERONAUTICAL ORGANIZATION"
    ],
    correctAnswer: 2
  },

  {
    question: "What does GANP stand for?",
    options: [
      "GLOBAL AERONAUTICAL NATIONAL PLAN",
      "GLOBAL AIR NAVIGATION PLAN",
      "GRANDIOSE AIR NAVIGATION PLAN",
      "GLOBAL AERONAUTICAL NAVIGATION PLAN"
    ],
    correctAnswer: 1
  },

  {
    question: "What does ASBU stand for?",
    options: [
      "AERONAUTICAL SERVICES UPDATE BLOCK",
      "AVIATION SYSTEM UPDATE BALANCE",
      "AERONAUTICAL SERVICES UPGRADE BLOCK",
      "AVIATION SYSTEM BLOCK UPGRADES"
    ],
    correctAnswer: 3
  },

  {
    question: "What is an ASBU Element?",
    options: [
      "A specific change or improvement within an ASBU module that can be implemented to enhance aviation system performance.",
      "A mandatory ICAO regulation that defines the minimum infrastructure required at every international airport.",
      "A performance indicator used exclusively to measure air traffic controller workload and sector capacity.",
      "A regional implementation plan that establishes common air navigation procedures for all States within an ICAO region."
    ],
    correctAnswer: 0
  }
];


// =====================================
// HTML ELEMENTS
// =====================================

const startScreen = document.querySelector("#start-screen");
const triviaScreen = document.querySelector("#trivia-screen");
const resultsScreen = document.querySelector("#results-screen");
const editScreen = document.querySelector("#edit-screen");

const startBtn = document.querySelector("#start-btn");
const editBtn = document.querySelector("#edit-btn");

const progress = document.querySelector("#progress");
const questionText = document.querySelector("#question-text");
const optionsContainer = document.querySelector("#options-container");
const feedback = document.querySelector("#feedback");
const scoreText = document.querySelector("#score");
const nextBtn = document.querySelector("#next-btn");

const finalScore = document.querySelector("#final-score");
const restartBtn = document.querySelector("#restart-btn");

const triviaHomeBtn = document.querySelector("#trivia-home-btn");
const resultsHomeBtn = document.querySelector("#results-home-btn");
const editHomeBtn = document.querySelector("#edit-home-btn");

const editorContainer = document.querySelector("#editor-container");
const addQuestionBtn = document.querySelector("#add-question-btn");
const saveBtn = document.querySelector("#save-btn");
const saveMessage = document.querySelector("#save-message");


// =====================================
// QUIZ VARIABLES
// =====================================

let currentQuestion = 0;
let score = 0;
let answered = false;


// =====================================
// SCREEN MANAGEMENT
// =====================================

function showScreen(screen) {
  startScreen.hidden = true;
  triviaScreen.hidden = true;
  resultsScreen.hidden = true;
  editScreen.hidden = true;

  screen.hidden = false;
}


// =====================================
// START QUIZ
// =====================================

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  scoreText.textContent = "Score: 0";

  showScreen(triviaScreen);
  showQuestion();
}


// =====================================
// SHOW QUESTION
// =====================================

function showQuestion() {
  answered = false;

  feedback.textContent = "";
  nextBtn.hidden = true;
  optionsContainer.innerHTML = "";

  const current = questions[currentQuestion];

  progress.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = current.question;

  current.options.forEach(function (option, index) {

    const button = document.createElement("button");

    button.textContent = option;
    button.classList.add("option-btn");

    button.addEventListener("click", function () {
      checkAnswer(index, button);
    });

    optionsContainer.appendChild(button);
  });
}


// =====================================
// CHECK ANSWER
// =====================================

function checkAnswer(selectedIndex, selectedButton) {

  if (answered) {
    return;
  }

  answered = true;

  const current = questions[currentQuestion];

  const optionButtons =
    document.querySelectorAll(".option-btn");

  optionButtons.forEach(function (button) {
    button.disabled = true;
  });


  if (selectedIndex === current.correctAnswer) {

    score++;

    selectedButton.classList.add("correct");

    feedback.textContent = "Correct!";

  } else {

    selectedButton.classList.add("wrong");

    optionButtons[current.correctAnswer]
      .classList.add("correct");

    feedback.textContent =
      "Wrong! Correct answer: " +
      current.options[current.correctAnswer];
  }


  scoreText.textContent = `Score: ${score}`;

  nextBtn.hidden = false;


  if (currentQuestion === questions.length - 1) {

    nextBtn.textContent = "See Results";

  } else {

    nextBtn.textContent = "Next Question";
  }
}


// =====================================
// NEXT QUESTION
// =====================================

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion < questions.length) {

    showQuestion();

  } else {

    showResults();
  }
}


// =====================================
// RESULTS
// =====================================

function showResults() {

  showScreen(resultsScreen);

  finalScore.textContent =
    `Your final score is ${score} out of ${questions.length}.`;
}


// =====================================
// QUESTION EDITOR
// =====================================

function showEditor() {

  showScreen(editScreen);

  saveMessage.textContent = "";

  renderEditor();
}


// =====================================
// RENDER QUESTION EDITOR
// =====================================

function renderEditor() {

  editorContainer.innerHTML = "";

  questions.forEach(function (question, questionIndex) {

    const questionBox = document.createElement("div");

    questionBox.classList.add("question-editor");


    // QUESTION NUMBER

    const title = document.createElement("h3");

    title.textContent =
      `Question ${questionIndex + 1}`;

    questionBox.appendChild(title);


    // QUESTION

    const questionLabel = document.createElement("label");

    questionLabel.textContent = "Question";

    questionBox.appendChild(questionLabel);


    const questionInput = document.createElement("input");

    questionInput.type = "text";
    questionInput.value = question.question;
    questionInput.classList.add("question-input");

    questionBox.appendChild(questionInput);


    // OPTIONS

    question.options.forEach(function (option, optionIndex) {

      const optionLabel = document.createElement("label");

      optionLabel.textContent =
        `Option ${optionIndex + 1}`;

      questionBox.appendChild(optionLabel);


      const optionInput = document.createElement("input");

      optionInput.type = "text";
      optionInput.value = option;
      optionInput.classList.add("option-input");

      questionBox.appendChild(optionInput);
    });


    // CORRECT ANSWER

    const correctLabel = document.createElement("label");

    correctLabel.textContent = "Correct answer";

    questionBox.appendChild(correctLabel);


    const correctSelect = document.createElement("select");

    correctSelect.classList.add("correct-select");


    question.options.forEach(function (option, optionIndex) {

      const selectOption = document.createElement("option");

      selectOption.value = optionIndex;

      selectOption.textContent =
        `Option ${optionIndex + 1}`;

      if (optionIndex === question.correctAnswer) {
        selectOption.selected = true;
      }

      correctSelect.appendChild(selectOption);
    });


    questionBox.appendChild(correctSelect);

    editorContainer.appendChild(questionBox);
  });
}


// =====================================
// SAVE QUESTIONS
// =====================================

function saveQuestions() {

  const questionBoxes =
    document.querySelectorAll(".question-editor");

  let updatedQuestions = [];


  questionBoxes.forEach(function (questionBox) {

    const questionInput =
      questionBox.querySelector(".question-input");

    const optionInputs =
      questionBox.querySelectorAll(".option-input");

    const correctSelect =
      questionBox.querySelector(".correct-select");


    let options = [];


    optionInputs.forEach(function (input) {
      options.push(input.value);
    });


    const updatedQuestion = {
      question: questionInput.value,
      options: options,
      correctAnswer: Number(correctSelect.value)
    };


    updatedQuestions.push(updatedQuestion);
  });


  questions = updatedQuestions;

  saveMessage.textContent = "Questions saved!";
}


// =====================================
// ADD QUESTION
// =====================================

function addQuestion() {

  // First save any changes already made
  saveQuestions();


  const newQuestion = {
    question: "New question",

    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],

    correctAnswer: 0
  };


  questions.push(newQuestion);

  renderEditor();

  saveMessage.textContent = "New question added!";
}


// =====================================
// EVENT LISTENERS
// =====================================

startBtn.addEventListener("click", startQuiz);

editBtn.addEventListener("click", showEditor);

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", startQuiz);

saveBtn.addEventListener("click", saveQuestions);

addQuestionBtn.addEventListener("click", addQuestion);


// =====================================
// HOME BUTTONS
// =====================================

triviaHomeBtn.addEventListener("click", function () {
  showScreen(startScreen);
});


resultsHomeBtn.addEventListener("click", function () {
  showScreen(startScreen);
});


editHomeBtn.addEventListener("click", function () {
  showScreen(startScreen);
});
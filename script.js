const starting = document.querySelector(".starting");
const start_btn = document.querySelector(".start");
const question = document.querySelector(".question");
const result_panel = document.querySelector(".result-panel");
const show_result = document.querySelector(".show-result");
const replay = document.querySelector(".replay");
const Qtext = document.querySelector(".text");
const options = document.querySelector(".options");
const correct = document.querySelector("#correct");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const timer = document.querySelector(".timer");
let wrongQuestions = document.querySelector("#wrong");
let number_of_question = document.querySelector("#number-of-question");
let percentage = document.querySelector("#percentage");
let scoreEl = document.querySelector(".score");
let sorryElement = document.querySelector(".sorry");
let try_again = document.querySelector(".try_again");
let gradeEl = document.querySelector(".grade");

let cQuestionIndex = 0;
let score = 0;
let grade = 0;
scoreEl.innerHTML = '0%';
gradeEl.innerHTML = '0%';
correct.innerHTML = '0';
let numWrong = 0;
let numCorrect = 0;
let percentComplete = 0;
let click = 0;


let timerInterval; 

start_btn.addEventListener("click", () => {
  question.style.display = 'block';
  starting.style.display = 'none';

  clearInterval(timerInterval);

  function updateTimer() {
    let secondsRemaining = 3 * 60;
    timerInterval = setInterval(() => {
      let minutes = Math.floor(secondsRemaining / 60);
      let seconds = secondsRemaining % 60;

      timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      if (secondsRemaining <= 0) {
        clearInterval(timerInterval);
        question.style.display = "none";
        result_panel.style.display = 'none';
        sorryElement.style.display = "block"; 
        restartGame();
      } else {
        secondsRemaining--;
      }
    }, 1000);
  }
  updateTimer();
});





show_result.addEventListener("click", ()=>{
  question.style.display= 'none';
  result_panel.style.display= 'block';
})


replay.addEventListener("click", ()=>{
  starting.style.display= 'block';
  result_panel.style.display= 'none';
  restartGame();
  updateTimer();
})

try_again.addEventListener("click", ()=>{
  starting.style.display= 'block';
  sorryElement.style.display = 'none';
  restartGame();
  updateTimer();
})

const questions = [
    {
      question: 'Which of the following is a synonym for "exquisite"?',
      options: ["Beautiful", "Ordinary", "Ugly", "Plain"],
      answer: 0,
    },
    {
      question: "Identify the sentence with correct subject-verb agreement:",
      options: [
        "The dog barks loudly in the morning.",
        "The dog bark loudly in the morning.",
        "The dogs barks loudly in the morning.",
        "The dogs bark loudly in the morning.",
      ],
      answer: 0,
    },
    {
      question:
        'Select the correct form of the pronoun to complete the sentence: "_______ went to the store to buy groceries."',
      options: ["His", "Him", "He", "They"],
      answer: 2,
    }
    ,
    {
      question: "Identify the sentence with correct capitalization:",
      options: [
        "she enjoys playing tennis.",
        "She enjoys playing tennis.",
        "She enjoys playing Tennis.",
        "She enjoys playing TENNIS.",
      ],
      answer: 1,
    },
    {
      question:
        'Choose the correct form of the adjective to complete the sentence: "It was a _______ day at the beach.',
      options: ["Sunny", "Sunnier", "Sunniest", "Sunnily"],
      answer: 0,
    },
    {
      question: "Which of the following is an example of a compound sentence?",
      options: [
        "The cat sleeps on the couch.",
        "I like ice cream and cake.",
        "It was raining heavily outside.",
        "She danced gracefully.",
      ],
      answer: 1,
    },
    {
      question: "Identify the correct spelling:",
      options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
      answer: 2,
    },
    {
      question:
        'Choose the correct form of the verb to complete the sentence: "They _______ to the concert last night."',
      options: ["Go", "Goes", "Gone", "Went"],
      answer: 3,
    },
    {
      question: 'What is the comparative form of the adverb "quickly"?',
      options: ["Quicklier", "Quickliest", "More quickly", "Quick"],
      answer: 2,
    },
    {
      question: 'Identify the correct plural form of "mouse":',
      options: ["Mouses", "Mouse", "Mice", "Mices"],
      answer: 2,
    },
    {
      question:
        'Choose the correct form of the pronoun to complete the sentence: "_______ is my favorite color."',
      options: ["They", "Them", "Their", "It"],
      answer: 3,
    },
    {
      question: "Which of the following is a conjunction?",
      options: ["Quickly", "And", "Happy", "Jumped"],
      answer: 1,
    },
    {
      question: "Identify the sentence with correct verb tense:",
      options: [
        "She will eat lunch tomorrow.",
        "She ate lunch tomorrow.",
        "She eats lunch tomorrow.",
        "She eating lunch tomorrow.",
      ],
      answer: 0,
    },
    {
      question: "Choose the correct spelling:",
      options: ["Recieve", "Reiceve", "Receive", "Receve"],
      answer: 2,
    },
    {
      question: 'What is the superlative form of the adjective "good"?',
      options: ["Best", "Gooder", "Better", "Goodest"],
      answer: 0,
    },
    {
      question: "Select the correct sentence that uses the subjunctive mood:",
      options: [
        "If I were rich, I would travel the world.",
        "If I was rich, I would travel the world.",
        "If I am rich, I will travel the world.",
        "If I be rich, I would travel the world.",
      ],
      answer: 0,
    },
    {
      question: 'Identify the correct homophone for the word "their":',
      options: ["There", "They're", "Thier", "Thare"],
      answer: 0,
    },
    {
      question: "Which of the following sentences is written in passive voice?",
      options: [
        "She ate the cake.",
        "The cake was eaten by her.",
        "They will make dinner.",
        "The flowers are blooming.",
      ],
      answer: 1,
    },
    {
      question: 'Choose the correct comparative form of the adjective "tall":',
      options: ["Taller", "Talliest", "Tallerer", "Tallest"],
      answer: 0,
    },
    {
      question: 'Which word is the antonym of "generous"?',
      options: ["Kind", "Greedy", "Friendly", "Helpful"],
      answer: 0,
    }
]


function displayQuestion() {
  const question_data = questions[cQuestionIndex];
  Qtext.innerHTML = question_data.question;

  const hasAnswered = typeof questions[cQuestionIndex].userAnswer !== 'undefined';

  let opt = "";

  for (let i = 0; i < question_data.options.length; i++) {
    const isDisabled = hasAnswered ? 'disabled' : '';
    opt += `<li onclick="checkAnswer(event)" class="${hasAnswered ? '' : 'selectable'}">${question_data.options[i]}</li>`;
  }

  options.innerHTML = opt;

  if (hasAnswered) {
    const correctAnswerIndex = question_data.answer;
    const selectedOptionIndex = question_data.options.indexOf(question_data.userAnswer);

    const optionsList = options.querySelectorAll('li');
    optionsList[correctAnswerIndex].classList.add('selected-green');
    if (selectedOptionIndex !== correctAnswerIndex) {
      optionsList[selectedOptionIndex].classList.add('selected-red');
    }
  }

  updatePercentComplete();
  updateTotalQuestions();
}
displayQuestion();

function checkAnswer(e) {
  if (typeof questions[cQuestionIndex].userAnswer === 'undefined') {
    let user_answer = e.target.innerHTML;
    let correctAnswer = questions[cQuestionIndex].options[questions[cQuestionIndex].answer];

    if (user_answer == correctAnswer) {
      correct.style.color = "green";
      score += 5;
      grade += 5;
      numCorrect++;
      correct.innerHTML = numCorrect;
      scoreEl.innerHTML = `${score}%`;
      gradeEl.innerHTML = `${grade}%`;
      e.target.classList.add('selected-green');
    } else {
      wrongQuestions.style.color = "red";
      numWrong++;
      wrongQuestions.innerHTML = numWrong;
      e.target.classList.add('selected-red');
    }

    questions[cQuestionIndex].userAnswer = user_answer;

    const optionsList = options.querySelectorAll('li');
    optionsList.forEach(option => {
      option.classList.remove('selectable');
    });
  }
}

localStorage.setItem("scoreEl", scoreEl);
localStorage.getItem("scoreEl");

localStorage.setItem("gradeEl", gradeEl);
localStorage.getItem("gradeEl");


next.addEventListener("click", () => {
  if (cQuestionIndex <= questions.length - 1) {
    cQuestionIndex++;
    displayQuestion();
  } else {
    cQuestionIndex = 0;
    displayQuestion();
  }
});

previous.addEventListener("click", () => {
  if (cQuestionIndex > 0) {
    cQuestionIndex--;
    displayQuestion();
  } else {
    cQuestionIndex = questions.length - 1;
    displayQuestion();
  }
});

function updatePercentComplete() {
  percentComplete = Math.floor((cQuestionIndex / questions.length) * 100);
  percentage.innerHTML = `${percentComplete}%`;
}

function updateTotalQuestions() {
  number_of_question.innerHTML = questions.length - cQuestionIndex - 1;
}

function restartGame() {
  cQuestionIndex = 0;
  score = 0;
  grade = 0;
  numCorrect = 0;
  numWrong = 0;
  percentComplete = 0;

  scoreEl.innerHTML = '0%';
  gradeEl.innerHTML = '0%';
  correct.innerHTML = '0';
  wrongQuestions.innerHTML = '0';
  timer.innerHTML = '03:00';
  Qtext.innerHTML = '';
  options.innerHTML = '';
  result_panel.style.display = 'none';
  sorryElement.style.display = 'none';
  starting.style.display = 'block';

  questions.forEach(question => {
    question.userAnswer = undefined;
  });

  displayQuestion();
}
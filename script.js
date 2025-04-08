// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "What is the largest state in the U.S.?",
      answers: [
        { text: "California", correct: false },
        { text: "New York", correct: false },
        { text: "Texas", correct: true },
        { text: "Florida", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // We know by examining the div id fields in index.html
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // Creating elements dynamically in the js file allows for the program to respond to user-input on the fly. For example, here
      // the application is a quiz, so it makes sense to program dynamically so it can be scaled to any number of questions (meanwhile
      // if you did not create the button dynamically like this, you would have to hardcode everything manually in the html file)
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // Adding the dynamically created button to a container with all the existing answer button elements. 
      answerButtonsElement.appendChild(button);
    });

    hintButton.style.display = "block";
    hintButton.disabled = false;

  }
  
  function resetState() {
    nextButton.style.display = "none";
    hintButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // The next button was hidden until this line. This functionality makes users select an option before the next button is visible for them to click
    nextButton.style.display = "block";
    hintButton.style.display = "none";
    } else {
    selectedBtn.classList.add("wrong");
    selectedBtn.disabled = true;
    }
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // This block of code is enacted when the next button is clicked. It checks if there is another question to ask, if there is, the  handleNextButton()
  // is called. If there is not, it restarts the quiz. 
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });

  hintButton.addEventListener("click", () => {
    const buttons = Array.from(answerButtonsElement.children);
    const wrongButtons = buttons.filter(button => button.dataset.correct !== "true" && !button.disabled && !button.classList.contains("wrong"));
  
    if (wrongButtons.length > 0) {
      const randomWrong = wrongButtons[Math.floor(Math.random() * wrongButtons.length)];
      randomWrong.classList.add("wrong");
      randomWrong.disabled = true; 
    }
  
    hintButton.disabled = true; 
  });
  
  startQuiz();
  
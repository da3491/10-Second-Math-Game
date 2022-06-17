// 1. An input for the user to type the answer.
// 2. An element displaying the current math equation question.
// 3. Equations uses "+" operator only.
// 4. A count down for the time left.
// 5. The game starts when the user clicks a button or starts typing in the input.
// 6. The game ends when the user runs out of time.
// 7. When the user makes a correct guess, add 1 second to the available time left.
// 8. The current score is shown.
// 9. A way to restart the game if time runs out.

// **Extra Features**
// 1. Multiple question types (+, -, *, /).
//  a. Make sure (-) questions always have positive whole number answers.
//  b. Make sure (/) questions always have positive whole number answers.
// 2. Number limit for the user to set.
// 3. High score indicator for the high score in the current session.

$(document).ready(function () {
  var playerScore = 0;
  var seconds = 30;
  var timer = null;
  var highScore = 0;
  var operand = "+";

  var updateDom = function () {
    $("#score").text(playerScore);
    $("#timer").text(seconds);
    $("#high-score").text(highScore);
    $(".slider-value").text($(".slider").val());
  };
  updateDom();

  // Creates an equation and arranges it for positive value results
  var createEquation = function (opInput) {
    console.log(opInput);
    if (opInput == "random") {
      var operand = ["+", "-", "*", "/"];
      opInput = operand[Math.floor(Math.random() * 3)];
    }
    var a = Math.floor(Math.random() * $("input.slider").val() + 1);
    var b = Math.floor(Math.random() * $("input.slider").val() + 1);
    if (opInput == "-" || opInput == "/") {
      if (b > a) {
        $("#question").text(b + " " + opInput + " " + a);
        return eval(b + opInput + a);
      }
    } else {
      $("#question").text(a + " " + opInput + " " + b);
      return eval(a + opInput + b);
    }
  };

  var endGame = function () {
    // updateHighScore
    if (playerScore > highScore) {
      highScore = playerScore;
      playerScore = 0;
    }
    // disable input
    $(".guess").prop("disabled", true);
    // show play again button
    $("#play-again").removeClass("visually-hidden");
  };

  // Starts a timer and handles state when over
  var startTimer = function () {
    if (!timer) {
      timer = setInterval(function () {
        seconds--;
        console.log(seconds);
        updateDom();
        if (seconds == 0) {
          stopTimer();
          endGame();
        }
      }, 1000);
    }
  };

  var stopTimer = function () {
    clearInterval(timer);
    timer = null;
  };

  // Handles the users input
  var processAnswer = function (answer) {
    if (timer) {
      if (answer == solution) {
        playerScore++;
        seconds++;
        $("input.guess").val("");
        solution = createEquation(operand);
        updateDom();
        return true;
      } else {
        return false;
      }
    }
  };

  // Timer starts when input changes or button is clicked
  $("#user-input").on("click change", ".guess", function () {
    if (!timer) {
      console.log(operand);
      startTimer();
      solution = createEquation(operand);
    }
  });

  // Processes players guess on click
  $("button.guess").on("click submit", function (e) {
    e.preventDefault();
    processAnswer($("input.guess").val());
  });

  // Dynamically displaying slider
  $(".slider").on("input", function () {
    updateDom();
  });

  // Selecting operand for equation
  $("#operand-choice").on("click", "span.operand", function () {
    $("span.operand").not(this).removeClass("text-primary");
    $(this).addClass("text-primary");
    operand = $(this).text();
  });
});

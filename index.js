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
  var seconds = 10;
  var timer = null;
  var highScore = 0;

  var updateDom = function () {
    $("#score").text(playerScore);
    $("#timer").text(seconds);
    $("#high-score").text(highScore);
    $(".slider-value").text($(".slider").val());
  };
  updateDom();

  var createEquation = function () {
    var operand = ["+", "-", "*", "/"];
    randomOp = operand[Math.floor(Math.random() * 3)];
    var a = Math.floor(Math.random() * $("input.slider").val() + 1);
    var b = Math.floor(Math.random() * $("input.slider").val() + 1);
    if (randomOp == "-" || randomOp == "/") {
      if (b > a) {
        $("#question").text(b + " " + randomOp + " " + a);
        return eval(b + randomOp + a);
      }
    } else {
      $("#question").text(a + " " + randomOp + " " + b);
      return eval(a + randomOp + b);
    }
  };

  var startTimer = function () {
    if (!timer) {
      timer = setInterval(function () {
        seconds--;
        updateDom();
        if (seconds <= 0) {
          clearInterval(timer);
          timer = null;
          highscore =
            playerScore > highScore ? (highScore = playerScore) : playerScore;
          $(".guess").prop("disabled", true);
          $("#play-btn").removeClass("hidden");
        }
      }, 1000);
    }
  };

  var processAnswer = function (answer) {
    if (answer == solution) {
      playerScore++;
      seconds++;
      solution = createEquation();
      updateDom();
      return true;
    } else {
      return false;
    }
  };

  // Timer starts when input changes or button is clicked
  $("#user-input").on("click change", ".guess", function () {
    if (seconds > 0) {
      startTimer();
      solution = createEquation();
    }
  });
  // Processes players guess on click
  $("button.guess").on("click submit", function (e) {
    e.preventDefault();
    processAnswer($("input.guess").val());
  });

  $(".slider").on("input", function () {
    updateDom();
  });
});

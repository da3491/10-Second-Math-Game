// 1. An input for the user to type the answer.
// 2. An element displaying the current math equation question.
// 3. Equations uses "+" operator only.
// 4. A count down for the time left.
// 5. The game starts when the user clicks a button or starts typing in the input.
// 6. The game ends when the user runs out of time.
// 7. When the user makes a correct guess, add 1 second to the available time left.
// 8. The current score is shown.
// 9. A way to restart the game if time runs out.

$(document).ready(function () {
  var playerScore = 0;
  var seconds = 10;
  var timer = null;

  var updateDom = function () {
    $("#score").text(playerScore);
    $("#timer").text(seconds);
  };
  updateDom();

  var createEquation = function () {
    var a = Math.floor(Math.random() * 10 + 1);
    var b = Math.floor(Math.random() * 10 + 1);
    $("#question").text(a + " " + " + " + " " + b);
    return a + b;
  };
  var solution = createEquation();

  var startTimer = function () {
    if (!timer) {
      timer = setInterval(function () {
        seconds--;
        updateDom();
        if (seconds == 0) {
          clearInterval(timer);
          timer = null;
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
    startTimer();
  });
  // Processes players guess on click
  $("button.guess").on("click", function () {
    processAnswer($("input.guess").val());
  });
});

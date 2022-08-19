$(document).ready(function () {
  var playerScore = 0;
  var seconds = 10;
  var timer = null;
  var highScore = 0;
  var operand = "+";
  var canPlay = true;

  var updateDom = function () {
    $("#score").text(playerScore);
    $("#timer").text(seconds);
    $("#high-score").text(highScore);
    $(".slider-value").text($(".slider").val());
  };
  updateDom();

  // Creates an equation and arranges it for positive value results
  var createEquation = function (opInput) {
    // when ? is chosen
    if (opInput == "?") {
      var opArray = ["+", "-", "*", "/"];
      opInput = opArray[Math.floor(Math.random() * 3)];
    }
    var a = Math.floor(Math.random() * $("input.slider").val() + 1);
    var b = Math.floor(Math.random() * $("input.slider").val() + 1);
    if (opInput == "-" || opInput == "/") {
      if (opInput == "-") {
        if (a == b) {
          a++;
        }
      }
      if (opInput == "/") {
        b = Math.floor(Math.random() * $("input.slider").val() + 1) * a;
      }
      if (b > a) {
        $("#question").text(b + " " + opInput + " " + a);
        return eval(b + opInput + a);
      }
    }
    $("#question").text(a + " " + opInput + " " + b);
    return eval(a + opInput + b);
  };

  var endGame = function () {
    // disable input
    $(".guess").prop("disabled", true);
    // show play again button
    $("#play-again").removeClass("visually-hidden");
    // reset display
    $("#question").text("Good game!");
  };

  // Starts a timer and handles state when over
  var startTimer = function () {
    if (!timer) {
      timer = setInterval(function () {
        seconds--;
        updateDom();
        if (seconds == 0) {
          canPlay = false;
          stopTimer();
          return endGame();
        }
      }, 1000);
    }
  };

  var stopTimer = function () {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
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
    if (!timer && canPlay) {
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

  // Selecting a single operand for equation
  $("#operand-choice").on("click", "span.operand", function () {
    $("span.operand").not(this).removeClass("text-primary");
    $(this).addClass("text-primary");
    operand = $(this).text();
  });

  // Prevents from losing focus when choosing operand, faster gameplay :D
  $("#operand-choice").on("mousedown", function () {
    return false;
  });

  // Play again button
  $("#play-again").on("click", "button", function () {
    seconds = 10;
    canPlay = true;
    // updateHighScore
    if (playerScore > highScore) {
      highScore = playerScore;
      playerScore = 0;
    }
    $("#question").text("Get Ready!");
    $(".guess").prop("disabled", false);
    $("#play-again").addClass("visually-hidden");
    updateDom();
  });
});

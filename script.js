let fromStorage = JSON.parse(localStorage.getItem("boxes"));
let current_turn = document.getElementById("turn");
let reset_btn = document.getElementById("button-play-again");
let box = document.getElementsByClassName("game-square");

window.addEventListener("load", () => {
  if (fromStorage && fromStorage.length !== 0) {
    ticks = fromStorage;
    for (let i = 0; i < fromStorage.boxes.length; i++) {
      box[i].innerText = fromStorage.boxes[i];
    }
  }

  current_turn.innerText = ticks.turn;

  for (let i = 0; i < box.length; i++) {
    box[i].dataset.id = i;
    box[i].addEventListener("click", play);
  }
  reset_btn.addEventListener("click", reset);
});

function ChangePlayer() {
  ticks.turn = ticks.turn === "X" ? "O" : "X";
  current_turn.innerText = ticks.turn;
}

function play(event) {
  let move = event.target.dataset.id;
  let win = null;

  ticks.boxes[move] = ticks.turn;
  event.target.innerText = ticks.turn;
  event.target.removeEventListener("click", play);

  // Change Player
  ChangePlayer();

  // If there is no winner
  if (ticks.boxes.indexOf(null) == 1) {
    alert("no winner");
    reset();
  }

  // Check whether we have a winner or not
  for (let i = 0; i < 9; i += 3) {
    if (
      ticks.boxes[i] != null &&
      ticks.boxes[i + 1] != null &&
      ticks.boxes[i + 2] != null
    ) {
      if (
        ticks.boxes[i] == ticks.boxes[i + 1] &&
        ticks.boxes[i + 1] == ticks.boxes[i + 2]
      ) {
        win = ticks.boxes[i];
      }
    }
    if (win !== null) {
      break;
    }
  }

  if (win === null) {
    for (let i = 0; i < 3; i++) {
      if (
        ticks.boxes[i] != null &&
        ticks.boxes[i + 3] != null &&
        ticks.boxes[i + 6] != null
      ) {
        if (
          ticks.boxes[i] == ticks.boxes[i + 3] &&
          ticks.boxes[i + 3] == ticks.boxes[i + 6]
        ) {
          win = ticks.boxes[i];
        }
        if (win !== null) {
          break;
        }
      }
    }
  }

  if (win === null) {
    if (
      ticks.boxes[0] != null &&
      ticks.boxes[4] != null &&
      ticks.boxes[8] != null
    ) {
      if (
        ticks.boxes[0] == ticks.boxes[4] &&
        ticks.boxes[4] == ticks.boxes[8]
      ) {
        win = ticks.boxes[4];
      }
    }

    if (
      ticks.boxes[2] != null &&
      ticks.boxes[4] != null &&
      ticks.boxes[6] != null
    ) {
      if (
        ticks.boxes[2] == ticks.boxes[4] &&
        ticks.boxes[4] == ticks.boxes[6]
      ) {
        win = ticks.boxes[4];
      }
    }
  }

  // We have a winner
  if (win !== null) {
    alert("WINNER is " + win);
    if (win == "X") {
      ticks.score_board.x++;
    } else if (win == "O") {
      ticks.score_board.o++;
    }
    reset();
  }
}

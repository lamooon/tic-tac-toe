let gameBoard = new Array(9);
let player1 = createPlayer('Player 1', 'X');
let player2 = createPlayer('Player 2','O');
let buttonsPressed = 0;
const restartBtn = document.querySelector('.restart');

function createBoard() {
    const board = document.querySelector('.board');
    for (let i = 0; i < 9; i++) {
        const btn = document.createElement('button');
        btn.classList.add('field');
        btn.id = (String) (i + 1);
        board.appendChild(btn);
    }
}

function play() {

    playGame(player1);
}
function playGame(activePlayer) {


    const coord = document.querySelectorAll('.field');
    coord.forEach((c) => {
        c.addEventListener('click', () => {

            let id = c.id;

            if (c.innerHTML === '') {
                c.innerHTML = activePlayer.marker;
                gameBoard[id] = activePlayer.marker;

                if (determineWin(activePlayer)) {
                    {
                        const winner = document.querySelector('.winner');
                        winner.textContent = `${activePlayer.name} is the winner!`;

                        const buttons = document.querySelectorAll("button");
                        for (const button of buttons) {
                            button.disabled = true;
                        }
                        return;
                    }
                }


                buttonsPressed++;
                // if all buttons are pressed and the winner was not decided, it's a draw.
                if (buttonsPressed === 9) {
                    const winner = document.querySelector('.winner');
                    winner.textContent = "It's a draw!";

                    const buttons = document.querySelectorAll('.field');
                    for (const button of buttons) {
                        button.disabled = true;
                    }
                    return;
                }

                if (activePlayer === player1) activePlayer = player2;
                else activePlayer = player1;

                playGame(activePlayer);
            }


        });


    });

    function determineWin(activePlayer) {

        const combination = [[1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7]];

        let flag = false;

        for (let i = 0; i < combination.length; i++) {

            let c1 = combination[i][0].toString();
            let c2 = combination[i][1].toString();
            let c3 = combination[i][2].toString();

            let id1 = document.getElementById(c1);
            let id2 = document.getElementById(c2);
            let id3 = document.getElementById(c3);

            if (id1.textContent === id2.textContent && id2.textContent === id3.textContent && id1.textContent === activePlayer.marker) {
                flag = true;
            }

        }

        return flag;
    }
}

restartBtn.addEventListener('click', () => {
    gameBoard = new Array(9);
    buttonsPressed = 0;
    const fields = document.querySelectorAll('.field');
    fields.forEach((field) => {
        field.textContent = '';
    });

    play();

})

function createPlayer(name, marker) {

    this.name = name;
    this.marker = marker;

    return { name, marker };
}

createBoard();
play();




let gameBoard = new Array(9);
let buttonsPressed = 0;
const restartBtn = document.querySelector('.restart');
const startBtn = document.querySelector('.start');

function createBoard() {
    const board = document.querySelector('.board');
    for (let i = 0; i < 9; i++) {
        const btn = document.createElement('button');
        btn.classList.add('field');
        btn.id = (String) (i + 1);
        board.appendChild(btn);
    }
}

function play(player1, player2) {
    startBtn.disabled = true;
    playGame(player1, player1, player2);
}
function playGame(activePlayer, player1, player2) {


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
                        winner.innerHTML = `${activePlayer.name} is the winner!`;

                        const buttons = document.querySelectorAll('.field');
                        for (const button of buttons) {
                            button.disabled = true;
                        }

                        startBtn.disabled = false;
                        return;
                    }
                }


                buttonsPressed++;
                // if all buttons are pressed and the winner was not decided, it's a draw.
                if (buttonsPressed === 9) {
                    const winner = document.querySelector('.winner');
                    winner.innerHTML = "It's a draw!";

                    const buttons = document.querySelectorAll('.field');
                    for (const button of buttons) {
                        button.disabled = true;
                    }

                    startBtn.disabled = false;
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



function createPlayer(name, marker) {

    this.name = name;
    this.marker = marker;

    return { name, marker };
}


function start() {

    let player1;
    let player2;

    startBtn.addEventListener('click', () => {

        const board = document.querySelector('.board');
        gameBoard = new Array(9);
        buttonsPressed = 0;
        board.replaceChildren();

        const p1 = document.getElementById('p1');
        const p2 = document.getElementById('p2');
        player1 = createPlayer(p1.value, 'X');
        player2 = createPlayer(p2.value, 'O');


        createBoard();
        play(player1, player2);
    });


    restartBtn.addEventListener('click', () => {
        gameBoard = new Array(9);
        buttonsPressed = 0;
        const fields = document.querySelectorAll('.field');
        fields.forEach((field) => {
            field.textContent = '';
        });
        const winner = document.querySelector('.winner');
        winner.textContent = '';

        const buttons = document.querySelectorAll('.field');
        for (const button of buttons) {
            button.disabled = false;
        }

        play(player1, player2);

    });
}

start();
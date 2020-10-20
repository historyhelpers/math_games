// QuerySelect all the elements by ID: problem, form, score text, win progress, lose progress
const problemElement = document.querySelector("#problem_element")
const gameOneForm = document.querySelector("#game_1_form")
const game1AnswerData = document.querySelector("#game_1_answer")
const rightAnswerScore = document.querySelector("#right_answer_score")
const wrongAnswerScore = document.querySelector("#wrong_answer_score")
const endMessage = document.querySelector("#end_message")
const resetGameBtn = document.querySelector("#reset-btn")
overlay = document.querySelector('#overlay')

// define game score
let game_state = {
    right_answer: 0,
    wrong_answer: 0,
}

let number1, number2, operator

// updatenumber function
function updateProblem() {
    problemGenerator()
    return problemElement.textContent = `${number1}${operator}${number2}`
}

// generate number
function numberGenerator(max) {
    return Math.floor(Math.random() * (max + 1))
}

function problemGenerator() {
    number1 = numberGenerator(10)
    operator = ['+', '-', 'x'][numberGenerator(2)]
    number2 = numberGenerator(10)

    return number1, number2, operator
}

updateProblem()

gameOneForm.addEventListener("submit", submitAction)


// submitAction function
function submitAction(d) {
    d.preventDefault()
    userAnswer = game1AnswerData.value
    gameLogic(userAnswer)
}

// win_lose logic
function gameLogic(answer) {
    let currectAnswer
    if (operator == '+') currectAnswer = number1 + number2
    if (operator == '-') currectAnswer = number1 - number2
    if (operator == 'x') currectAnswer = number1 * number2

    if (userAnswer == currectAnswer) {
        // if win
        game_state.right_answer++
        // win progress bar
        updateProblem()
    } else {
        // if lose
        game_state.wrong_answer++
        // lose progress bar
    }
    // get the reset function on input-field and get rid of the suggesions.

    // check if game is over
    gameOver()
    rightAnswerScore.textContent = `${10 - game_state.right_answer}`
    wrongAnswerScore.textContent = `${3 - game_state.wrong_answer}`
}

// gameOver function
function gameOver() {
    // if player wins
    if (game_state.right_answer == 10) {
        endMessage.textContent = `You Won!`
        // add overlay css
        overlay.classList.remove("overlay_off")
        overlay.classList.add("overlay_on")
    }
    // if player loses
    if (game_state.wrong_answer == 3) {
        endMessage.textContent = `You Lost!`
        // add overlay css
        overlay.classList.remove("overlay_off")
        overlay.classList.add("overlay_on")
    }
}

resetGameBtn.addEventListener('click', resetGame)

// resetGame function
function resetGame() {
    game_state.right_answer = 0
    game_state.wrong_answer = 0
    rightAnswerScore.textContent = `${10 - game_state.right_answer}`
    wrongAnswerScore.textContent = `${3 - game_state.wrong_answer}`

    overlay.classList.remove("overlay_on")
    overlay.classList.add("overlay_off")
}


// progress bar win and lose

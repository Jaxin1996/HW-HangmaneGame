
var letter = require("./letter.js");
var game = require("./game.js");
var word = require("./word.js")
var inquirer = require("inquirer");

function userGuess() {
    console.log(newWord.print());
    inquirer.prompt([{
        name: 'letter',
        type: 'text',
        message: 'Pick 1 letter any letter:',
        validate: function(string) {
            var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
            if (regEx.test(string)) {
                return true;
            } else {
                return false;
                console.log("I told you to please enter ONLY 1 letter at a time");

            }
        }
    }]).then(function(user) {
        console.log("================================================================");
        var letter = user.letter;
        newWord.checkLetter(letter);
        if (newWord.isLetterValid) {
            console.log("Sorry but you have already guessed that letter, please try a different one!");
            userGuess();
        } else {
            if (newWord.isComplete()) {
                console.log("CORRECT! YOU WIN!!!!!!!!!! " + newWord.chosenWord + " was the hidden word!");
                playAgain();
            } else if (newWord.trysLeft === 0) {
                console.log("Sorry but you are all out of trys! The answer was " + " ' " + newWord.chosenWord + " ' ");
                playAgain();
            } else {
                console.log("You have " + newWord.trysLeft + " remaining trys left!");
                console.log(".................................................................");
                userGuess();
            }
        }
    });
}
function playAgain() {
    inquirer.prompt([{
        type: 'input',
        message: 'Would you like to play again? Please type "y" for Yes and "n" for No',
        name: 'playAgain'
    }]).then(function(user) {
        var answer = user.playAgain;
        if (answer == 'y') {
            game.userPrompt(function() {
                newWord = new word.Word(game.chosenWord);
                userGuess();
            });
        } else if (answer === 'n') {
            console.log("Thank you for playing! I knew you would not last let alone guess a single word!");
            return;
        }
    })
}
game.userPrompt(function() {
    newWord = new word.Word(game.chosenWord);
    userGuess();
});
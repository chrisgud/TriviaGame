window.onload = () => {
    $('#start').on('click', trivia.start)

}

var intervalId;

//trivia object to track time
var trivia = {
    time: 30,

    //starts timer, displays questions, hides button, shows timer
    start: function () {
        intervalId = setInterval(trivia.count, 1000);
        displayQuestions();
        $('#buttons').css('display', 'none');
        $('#timeDiv').css('display', 'block');
    },

    count: function () {
        trivia.time--;
        if (trivia.time === 0) {
            trivia.completed()
        } else {
            var converted = trivia.timeConverter(trivia.time);
            $("#timeSpan").text(converted);
        }
    },
    //useful display function from stopwatch
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

    completed: function () {

        //Calculate Scores
        var correct = 0, unanswered = 0, incorrect = 0;
        clearInterval(intervalId);
        for (i = 0; i < questionList.length; i++) {
            var answerId = parseInt($(`input[name=${i}]:checked`).val());
            if (isNaN(answerId)) {
                unanswered++;
            } else if (questionList[i].correctAnswer === answerId) {
                correct++;
            } else {
                incorrect++;
            }
        }

        //Display Results
        $('#timeDiv').html('<h3>All Done!</h3>');
        $('#questionDiv').html(`
        <h3>Correct Answers: ${correct}</h3>
        <h3>Incorrect Answers: ${incorrect}</h3>
        <h3>Unanswered Questions: ${unanswered}</h3>
        `);
    }
}

//Declare trivia questions as an object
var questionList = [
    {
        question: 'What was the first full length CGI movie?',
        answer: ['A Bug\'s Life', 'Monsters Inc.', 'Toy Story', 'The Lion King'],
        correctAnswer: 2
    },
    {
        question: 'Which of these is NOT a name of one of the Spice Girls?',
        answer: ['Sporty Spice', 'Fred Spice', 'Scary Spice', 'Posh Spice'],
        correctAnswer: 1
    },
    {
        question: 'Which NBA team won the most titles in the 90s?',
        answer: ['New York Knicks', 'Portland Trailblazers', 'Los Angeles Lakers', 'Chicago Bulls'],
        correctAnswer: 3
    },
    {
        question: 'Which group released the hit song, "Smells Like Teen Spirit"?',
        answer: ['Nirvana', 'Backstreet Boys', 'The Offspring', 'No Doubt'],
        correctAnswer: 0
    },
    {
        question: 'Which popular Disney movie featured the song, "Circle of Life"?',
        answer: ['Aladdin', 'Hercules', 'Mulan', 'The Lion King'],
        correctAnswer: 3
    },
    {
        question: 'Finish this line from the Fresh Prince of Bel-Air theme song: "I whistled for a cab and when it came near, the license plate said..."',
        answer: ['Dice', 'Mirror', 'Fresh', 'Cab'],
        correctAnswer: 2
    },
    {
        question: 'What was Doug\'s best friend\'s name?',
        answer: ['Skeeter', 'Mark', 'Zach', 'Cody'],
        correctAnswer: 0
    },
    {
        question: 'What was the name of hte principal at Bayside High in Saved By The Bell?',
        answer: ['Mr. Zhou', 'Mr. Driggers', 'Mr. Belding', 'Mr. Page'],
        correctAnswer: 2
    },

];

//Builds form with question headers and radio buttons named by QuestionList index
// then appends assembled form to the question div.
function displayQuestions() {

    var questionForm = $('<form>');
    for (i = 0; i < questionList.length; i++) {
        var questionDiv = $('<div>');
        questionDiv.append(`<h3 class='p-3'>${questionList[i].question}</h3>`);
        for (j = 0; j < questionList[i].answer.length; j++) {

            var radioDiv = $('<span class="p-3">');
            radioDiv.html(`<input type="radio" id=${questionList[i].answer[j].toLowerCase().replace(/[^A-Z0-9]+/ig, '')} name=${i} value=${j} />
    <label for=${questionList[i].answer[j].toLowerCase().replace(/[^A-Z0-9]+/ig, '')}>${questionList[i].answer[j]}</label>`)
            questionDiv.append(radioDiv);
        }
        questionDiv.append('<hr>');
        questionForm.append(questionDiv);
    }
    questionForm.append(`<input type="submit" value="Done" id="questionSubmit">`);
    $('#questionDiv').append(questionForm);
    $('#questionSubmit').on('click', (event) => {
        event.preventDefault();
        trivia.completed();
    });
};
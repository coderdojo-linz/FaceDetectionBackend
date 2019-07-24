var dateStart = new Date();
var timeStart = dateStart.getTime();
var timer = dateStart.getTime() - 3000;
var counter = 0;

//list of the best players, first variable: name, secound variable: secounds
var highscores = [
    ["temp", 0.0],
    ["temp", 0.0],
    ["temp", 0.0],
    ["temp", 0.0],
    ["temp", 0.0]
];

window.onload = () => {
    socket.on('detection', function (msg) {
        msg = JSON.parse(msg);

        if (document.getElementById('highscoreList')) {
            showHighscores();
        }

        if (document.getElementById('lachometer')) {
            //show Lachometer
            const lachometer = document.getElementById('lachometer');
            //* 1.333 because you lose at 75%
            let happyValue = msg.expressions.happy * 100 * 1.333;
            lachometer.innerText = `${Math.round(happyValue)} %`;

            var perCent = document.getElementById('percent');
            //checks that width cannot be over 100%
            perCent.style.width = happyValue > 100 ? 100 + '%' : happyValue + '%';

            //check if 3 secounds are over
            var date2 = new Date();
            if (date2.getTime() > timer + 3000) {
                timer = date2.getTime();
                console.log(counter);
                const baseUrl = 'https://cddataexchange.blob.core.windows.net/data-exchange';
                
            }

            //check how happy you are
            if (happyValue < 25) {
                lachometer.style.color = 'lightgreen';
                perCent.style.backgroundColor = 'lightgreen';
            } else if (happyValue < 50) {
                lachometer.style.color = 'darkgreen';
                perCent.style.backgroundColor = 'darkgreen';
            } else if (happyValue < 75) {
                lachometer.style.color = 'yellow';
                perCent.style.backgroundColor = 'yellow';
            } else if (happyValue < 100) {
                lachometer.style.color = 'red';
                perCent.style.backgroundColor = 'red';
            } else {
                //change the design
                const x = document.getElementById('x');
                x.innerText = 'Verloren';
                x.style.color = 'red';
                perCent.style.backgroundColor = 'red';
                perCent.style.color = 'white';

                //calculating the time to laugh
                var secounds = (Math.floor((new Date().getTime() - timeStart) / 10)) / 100;
                var minutes = 0;
                if (secounds > 60) {
                    minutes = Math.floor(secounds / 60);
                    secounds = Math.round(secounds - (minutes * 60));
                    if (minutes > 1) {
                        perCent.innerText = minutes + " Minuten und " + secounds + " Sekunden";
                    } else {
                        perCent.innerText = minutes + " Minute und " + secounds + " Sekunden";
                    }
                } else {
                    perCent.innerText = secounds + " Sekunden";
                }
                addScore((secounds + (minutes * 60)));
                showHighscores();
            }
        }
    });
}

function showHighscores() {
    //delete last highscores
    var element = document.getElementById('highscoreList');
    element.innerHTML = '';

    //show new highscores
    for (let i = 0; i < highscores.length; i++) {
        //create Elements
        var list = document.getElementById('highscoreList');
        var memberOfList = document.createElement('div');
        var text = document.createTextNode(highscores[i][0] + ': ' + highscores[i][1] + ' sec.')

        //insert elements in html
        memberOfList.appendChild(text);
        list.appendChild(memberOfList);
    }
}

function addScore(score) {
    //check if score is a highscore
    if (score > highscores[4][1]) {
        //add name and score to array if name is not null or empty string
        var name = prompt('Please enter your name');
        if (name !== '' && name !== null) highscores.push([name, score]);

        //sort array by score
        highscores.sort((a, b) => (a[1] < b[1]) ? 1 : -1);

        //deletes last element
        highscores.splice(5);
    }
}
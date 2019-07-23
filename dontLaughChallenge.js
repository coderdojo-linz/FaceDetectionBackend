const socket = io();


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
            let happyValue = msg.expressions.happy * 100;
            lachometer.innerText = `${Math.round(happyValue)} %`;

            var perCent = document.getElementById('percent');
            perCent.style.width = happyValue + "%";

            //check if 3 secounds are over
            var date2 = new Date();
            if (date2.getTime() > timer + 3000) {
                timer = date2.getTime();
                console.log(counter);
                const baseUrl = 'https://cddataexchange.blob.core.windows.net/data-exchange';
                switch (counter) {
                    case 0:
                        var giphys = document.getElementById("gif");
                        giphys.src = baseUrl + "/Giphys/glory.gif";
                        document.body.appendChild(giphys);

                        counter++;
                        break;

                    case 1:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/car-strache.png";

                        counter++;
                        break;

                    case 2:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/fair-use-meme.jpg";

                        counter++;
                        break;

                    case 3:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/laser-cat.gif";

                        counter++;
                        break;

                    case 4:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/not-amused-cat.gif";

                        counter++;
                        break;

                    case 5:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/p1.png";

                        counter++;
                        break;

                    case 6:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/alf.gif";

                        counter++;
                        break;

                    case 7:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/black-hole.jpg";

                        counter++;
                        break;

                    case 8:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/cat1.png";

                        counter++;
                        break;

                    case 9:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/catfish.gif";

                        counter++;
                        break;

                    case 10:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/trump.png";

                        counter++;
                        break;

                    case 11:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/p2.png";

                        counter++;
                        break;

                    case 12:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/run-cat-run.gif";

                        counter++;
                        break;

                    case 13:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/scarder-cat.gif";

                        counter++;
                        break;

                    case 14:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/strache-arbeitslos.jpg";

                        counter++;
                        break;

                    case 15:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/stracheGTA.jpg";

                        counter++;
                        break;

                    case 16:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/crash-cat.gif";

                        counter++;
                        break;
                    case 17:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/anoying-cat.jpg";

                        counter++;
                        break;
                    case 18:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/cat.jpg";

                        counter++;
                        break;
                    case 19:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/stealing-cat.gif";

                        counter++;
                        break;
                    case 20:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/wiggly-cat.gif";

                        counter++;
                        break;

                    case 21:
                        var giphys = document.getElementById('gif');
                        giphys.src = baseUrl + "/Giphys/neverending.gif";

                        counter = 0;
                        break;
                }
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
            } else if (happyValue < 98) {
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

        memberOfList.appendChild(text);
        list.appendChild(memberOfList);
    }
}

function addScore(score) {
    //check if score is a highscore
    if (score > highscores[4][1]) {
        //add name and score to array
        var name = prompt('Please enter your name');
        highscores.push([name, score]);

        //sort array by score
        highscores.sort((a, b) => (a[1] < b[1]) ? 1 : -1);

        //deletes last element
        highscores.splice(5);
    }

}
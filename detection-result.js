const socket = io('http://localhost:3000/');

var timer = 50;
var counter = 0;

window.onload = () => {
    socket.on('detection', function (msg) {
        msg = JSON.parse(msg);

        if (document.getElementById('position')) {
            const position = document.getElementById('position');
            position.innerText = `${Math.round(msg.detection._box._x)}/${Math.round(msg.detection._box._y)}`;
        }

        if (document.getElementById('player-id')) {
            const pid = document.getElementById('player-id');
            pid.innerText = msg.player;
        }

        if (document.getElementById('lachometer')) {
            //show Lachometer
            const lachometer = document.getElementById('lachometer');
            let happyValue = msg.expressions.happy * 100;
            lachometer.innerText = `${Math.round(happyValue)} %`

            //encrease timer
            timer++;

            if (timer > 13) {
                timer = 0;
                console.log(counter);
                switch (counter) {
                    case 0:
                        var giphys = document.getElementById("gif");
                        giphys.src = "/Giphys/glory.gif";
                        document.body.appendChild(giphys);

                        counter++;
                        break;

                    case 1:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/car-strache.png";

                        counter++;
                        break;

                    case 2:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/fair-use-meme.jpg";

                        counter++;
                        break;

                    case 3:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/laser-cat.gif";

                        counter++;
                        break;

                    case 4:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/not-amused-cat.gif";

                        counter++;
                        break;

                    case 5:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/p1.png";

                        counter++;
                        break;

                    case 6:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/alf.gif";

                        counter++;
                        break;

                    case 7:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/black-hole.jpg";

                        counter++;
                        break;

                    case 8:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/cat1.png";

                        counter++;
                        break;

                    case 9:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/catfish.gif";

                        counter++;
                        break;

                    case 10:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/trump.png";

                        counter++;
                        break;

                    case 11:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/p2.png";

                        counter++;
                        break;

                    case 12:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/run-cat-run.gif";

                        counter++;
                        break;

                    case 13:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/scarder-cat.gif";

                        counter++;
                        break;

                    case 14:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/strache-arbeitslos.jpg";

                        counter++;
                        break;

                    case 15:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/stracheGTA.jpg";

                        counter++;
                        break;

                    case 16:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/crash-cat.gif";

                        counter++;
                        break;
                    case 17:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/anoying-cat.jpg";
    
                        counter++;
                        break;
                    case 18:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/cat.jpg";

                        counter++;
                        break;
                    case 19:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/stealing-cat.gif";

                        counter++;
                        break;
                    case 20:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/wiggly-cat.gif";

                        counter++;
                        break;

                    case 21:
                        var giphys = document.getElementById('gif');
                        giphys.src = "/Giphys/neverending.gif";

                        counter = 0;
                        break;
                }
            }

            //check how happy you are
            if (happyValue < 25) {
                lachometer.style.color = 'lightgreen';
            } else if (happyValue < 50) {
                lachometer.style.color = 'darkgreen';
            } else if (happyValue < 75) {
                lachometer.style.color = 'yellow';
            } else if (happyValue < 98) {
                lachometer.style.color = 'red';
            } else {
                const x = document.getElementById('x');
                x.innerText = 'Verloren';
                x.style.color = 'red';
            }
        }
    });
}
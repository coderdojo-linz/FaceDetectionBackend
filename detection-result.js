const socket = io();

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

        if (document.getElementById('highscoreList')) {
            showHighscores();
        }
    });
}
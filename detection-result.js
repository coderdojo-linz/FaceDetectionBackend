const socket = io('http://192.168.42.124:3000/');//expression

window.onload = () => {
    socket.on('detection', function (msg) {
        msg = JSON.parse(msg);

        const position = document.getElementById('position');
        position.innerText = `${Math.round(msg.detection._box._x)}/${Math.round(msg.detection._box._y)}`;

        const pid = document.getElementById('player-id');
        pid.innerText = msg.player;
    });
}

let videoEl;
let canvasEl;
let lachometerEl;

// Define detection options
const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 });

// Get socket.io object. Learn more at https://socket.io
//const socket = io();


window.onload = () => {
    // Get references to HTML elements
    videoEl = document.getElementById('inputVideo');
    canvasEl = document.getElementById('overlay');
    lachometerEl = document.getElementById('lachometer');

    run();
};

async function run() {
    // Load face detection model
    if (!faceapi.nets.tinyFaceDetector.params) {
        await faceapi.nets.tinyFaceDetector.load('/weights/');
    }
    await faceapi.loadFaceExpressionModel('/weights/');

    // Try to access users webcam and stream the images to the video element
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    videoEl.srcObject = stream;
}

async function onPlay() {
    // Check if model has already been loaded. If not, wait a little bit and try again
    if (videoEl.paused || videoEl.ended || !faceapi.nets.tinyFaceDetector.params) {
        return setTimeout(() => onPlay(), 250);
    }

    const result = await faceapi.detectSingleFace(videoEl, options).withFaceExpressions();

    if (result) {
        dims = faceapi.matchDimensions(canvasEl, videoEl, true);

        //Draw result
        const resizedResult = faceapi.resizeResults(result, dims);
        faceapi.draw.drawDetections(canvasEl, resizedResult);

        const minConfidence = 0.05;
        faceapi.draw.drawFaceExpressions(canvasEl, resizedResult, minConfidence);
    }

    // Schedule next detection
    setTimeout(() => onPlay());
}
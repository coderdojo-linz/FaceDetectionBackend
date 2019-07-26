(function () {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    var streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton1 = null;
    var output = null;
    var output1 = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        output = document.getElementById('output');
        output1 = document.getElementById('output1');
        startbutton1 = document.getElementById('startbutton1');
        startbutton2 = document.getElementById('startbutton2');

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton1.addEventListener('click', function (ev) {
            takepicture(1);
            ev.preventDefault();
        }, false);

        startbutton2.addEventListener('click', function (ev) {
            takepicture(2);
            ev.preventDefault();
        }, false);
    }

    // Fill the photo with an indication that none has been
    // captured.

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('/images/image/image.png');
        photo.setAttribute('src', data);
    }

    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

    function takepicture(numberOfPicture) {
        var newPhoto = document.createElement('img');
        if (numberOfPicture === 1) {
            if (document.getElementById('photo') !== null) {
                var element = document.getElementById('photo');
                output.replaceChild(newPhoto, element);
            }
            newPhoto.setAttribute('id', 'photo');
            output.appendChild(newPhoto);
        } else {
            if (document.getElementById('photo1') !== null) {
                var element = document.getElementById('photo1');
                output1.replaceChild(newPhoto, element);
            }
            newPhoto.setAttribute('id', 'photo1');
            output1.appendChild(newPhoto);
        }








/*
        var photo = document.createElement('img');
        if (changePhoto) {
            if (document.getElementById('photo') !== null) {
                var element = document.getElementById('photo');
                output.replaceChild(photo, element);
            }


            photo.setAttribute('id', 'photo');
            output.appendChild(photo);
        } else {
            if (document.getElementById('photo1') !== null) {
                var element = document.getElementById('photo1');
                output.replaceChild(photo, element);


            }

            photo.setAttribute('id', 'photo1');
            output.appendChild(photo);
        } */

        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            if (numberOfPicture === 1) {
                var data = canvas.toDataURL('/images/Webcam Image/Webcam Image1.png');
            } else {
                var data = canvas.toDataURL('/images/Webcam Image/Webcam Image1.png');
            }
            newPhoto.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }

    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
})();
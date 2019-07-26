var dateStart = new Date();
var timeStart = dateStart.getTime();
var timer = dateStart.getTime() - 3000;
var counter = 0;


window.onload = () => {
    socket.on('detection', function (msg) {
        msg = JSON.parse(msg);
        
        if (document.getElementById('lachometer')) {
            //show Lachometer
            const lachometer = document.getElementById('lachometer');
            //* 1.333 because you lose at 75%
            let happyValue = msg.expressions.happy * 100 * 1.333;
            lachometer.innerText = `${Math.round(happyValue)} %`;

            var perCent = document.getElementById('percent');
            //checks that width cannot be over 100%
            perCent.style.width = happyValue > 100 ? 100 + '%' : happyValue + '%';

            //set date
            var date2 = new Date();
            timer = date2.getTime();
            const baseUrl = 'https://cddataexchange.blob.core.windows.net/data-exchange';    
            
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
                x.innerText = 'Lost';
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
                        perCent.innerText = minutes + " minutes and " + secounds + " seconds";
                    } else {
                        perCent.innerText = minutes + " minutes and " + secounds + " seconds";
                    }
                } else {
                    perCent.innerText = secounds + " seconds";
                }
            }
        }
    });
}

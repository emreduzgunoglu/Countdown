let secondText = document.getElementById("second");
let minuteText = document.getElementById("minute");
let hourText = document.getElementById("hour");
let dayText = document.getElementById("day");
let monthText = document.getElementById("month");
let headerText = document.getElementById("header");

let year;
let month;
let day;
let hour;
let minute;
let second;

setTimeout(() => {
    getDateFromUser();
},3500);

function setInnerHTML() {
    secondText.innerHTML = second;
    minuteText.innerHTML = minute;
    hourText.innerHTML = hour;
    dayText.innerHTML = day;
    monthText.innerHTML = month;
}

function setInnerHTMLZero() {
    secondText.innerHTML = "XX";
    minuteText.innerHTML = "XX";
    hourText.innerHTML = "XX";
    dayText.innerHTML = "XX";
    monthText.innerHTML = "XX";
}

function getDateFromUser() {
    let prompDate = prompt('                                    Enter Date: YYYY-MM-DD');
    let parts = prompDate.split('-');

    // Check For Correct Date
    if (parts[0] > 2024 || parts[1] > 13 || parts[2] > 30 || parts[0] < 2023) {
        headerText.innerHTML = "Please Enter a Valid Date";
        setTimeout(() => {
            getDateFromUser();
        },500);
    }
    else {
        let organizedDate = new Date(parts[0], parts[1] - 1, parts[2]);
        headerText.innerHTML = "Remaining Time";
        startCount(organizedDate);
    }
}

function startCount(organizedDate) {

    // Initialize Date
    let givenDate = organizedDate;
    let currentDate = new Date();

    // Initialize Time Differences
    year = Math.floor((givenDate - currentDate) / (1000 * 60 * 60 * 24 * 30 * 12));                                         // YIL
    month = Math.floor(((givenDate - currentDate) / (1000 * 60 * 60 * 24 * 30)) - (year * 12));                             // AY
    day = Math.floor(((givenDate - currentDate) / (1000 * 60 * 60 * 24)) - (year * 12 + month) * 30);                       // GÜN
    hour = Math.floor(((givenDate - currentDate) / (1000 * 60 * 60)) - ((year * 12 + month) * 30 + day) * 24);              // SAAT
    minute = Math.floor(((givenDate - currentDate) / (1000 * 60)) - (((year * 12 + month) * 30 + day) * 24 + hour) * 60);   // DAKİKA
    second = 60 - currentDate.getSeconds();                                                                                 // SANİYE

    // Display Remaining Time
    setInnerHTML();
    clock();
    function clock() {
        setTimeout(() => {
            currentDate = new Date();
            second = 60 - currentDate.getSeconds();

            if (second == 60) {
                if (minute != 0) {
                    minute = minute - 1;
                }
                else if (minute == 0) {
                    if (hour != 24) {
                        hour = hour - 1;
                        minute = 59;
                    }
                    else if (hour == 24) {
                        if (day != 30) {
                            day = day - 1;
                            hour = 23;
                        }
                        else if (day == 30) {
                            if (month != 12) {
                                month = month - 1;
                                day = 29;
                            }
                            else if (month == 12) {
                                setInnerHTMLZero();
                            }
                        }
                    }
                }
            }
            setInnerHTML();
            clock();
        }, 1000);
    }
}

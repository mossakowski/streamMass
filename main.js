var tab_mass_weekday_saturday = ['07:00', '08:00', '18:00'];
var tab_mass_friday = ['07:00', '08:00', '16:30', '18:00'];
var tab_mass_sunday = ['07:00', '08:30', '10:00', '11:30', '16:30', '19:30'];

const screen = document.getElementById('screen');

const formatTime = "HH:mm";
const formatDay = 'd';

function app() {
    class momentDateTime {
        
        currentTime() {
            return moment(moment().format(formatTime),formatTime);
        }
        
        currentDay() { 
        return parseInt(moment().format('d')); // moment().format('d'); put integer example: 3;
        }
    }

    var objDateTime = new momentDateTime();

    var currentDay = objDateTime.currentDay();
    var currentTime = objDateTime.currentTime();

    function selectTab(currentDay) {
        if(currentDay >= 1 && currentDay <=4 || currentDay == 6) {
            return tab = tab_mass_weekday_saturday;
        }

        if(currentDay === 5) {
            return tab = tab_mass_friday;
        }

        if(currentDay === 0) {
            return tab = tab_mass_sunday;
        }
    }

    function checkIsMassNow() {
        var i = 0;    
        selectTab(currentDay).forEach(function(items) {
            var items = moment(items, formatTime);
            var startStream = moment(items, formatTime)
                    .subtract(10, 'm');
            var endStream = moment(items, formatTime)
                    .add(70, 'm');
                    
            if(currentTime.isBetween(startStream,endStream)) {
                i++;
            }
        });

        if(i>0) {
            showStream();
        } else {
            checkWhenNextMass(selectTab(currentDay));
        }
    }

    function checkWhenNextMass(tab) {
        var tab_next_mass = [];
        var i = 0;
        tab.forEach(function(items) {
            if(currentTime.isBefore(moment(items,formatTime))) {
                tab_next_mass[i] = items;
                i++;
            }
        });

        if(i === 0) {
        let nextDay = moment(currentDay, formatDay).add(1,'d').format(formatDay);
        nextDay = parseInt(nextDay);
            console.log("Zapraszamy na jutrzejszą msze o: " + selectTab(nextDay)[0]);
            hideStream();
        } else {
        console.log("Następna msza odbędzie się o: " + tab_next_mass[0]);
        hideStream();
        }    
    }

    function showStream() {
        screen.style.display = "block";
        console.log('jest ekran');    
    }

    function hideStream() {
        screen.style.display = "none";
        console.log('nie ma transmisji!');
    }

        checkIsMassNow();

}

app();
setInterval(function() {
    app();
}, 60 * 1000);




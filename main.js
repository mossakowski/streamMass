var tab_mass_weekday_saturday = ['07:00', '08:00', '18:00'];
var tab_mass_friday = ['07:00', '08:00', '16:30', '18:00'];
var tab_mass_sunday = ['07:00', '08:30', '10:00', '11:30', '16:30', '19:30'];

const formatTime = "HH:mm";
const formatDay = 'd';

var currentTime = moment('04:00',formatTime);
var currentDay = 4; // moment().format('d');

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
        displayStream();
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
        
    } else {
      console.log("Następna msza odbędzie się o: " + tab_next_mass[0]);
    }    
}

function displayStream() {
    console.log('Tu będzie iframe, jest transmisja!');
}


checkIsMassNow();


var tab_id = ['tab_mass_weekday_saturday', 'tab_mass_friday', 'tab_mass_sunday'];

var tab_mass_weekday_saturday = ['07:00', '08:00', '18:00'];
var tab_mass_friday = ['07:00', '08:00', '16:30', '18:00'];
var tab_mass_sunday = ['07:00', '08:30', '10:00', '11:30', '16:30', '19:30'];

const formatTime = "HH:mm";
const formatDay = 'd';

var currentTime = moment('08:00',formatTime);
var currentDay = 0;

function selectTab() {
     // moment().format('d'); jakbyś wprowadził skrypt w życie :)
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



//spawdź czy jest aktualnie transmisja
function checkIsMassNow() {
    var i = 0;    
    selectTab();
    tab.forEach(function(items) {
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
        checkWhenNextMass(tab);
    }
}

//Sprawdź kiedy jest następna msza
function checkWhenNextMass(tab) {
   //1.Dodaj do obecnego dnia plus jeden a następnie sprawdź, pierwszy element tablicy i zwróć
    // var currentTime = moment('13:21',formatTime);
    // var currentDay = 0 // moment().format('d'); jakbyś wprowadził skrypt w życie :)
    var tab_next_mass = [];
    var i = 0;
    tab.forEach(function(items) {
        if(currentTime.isBefore(moment(items,formatTime))) {
            tab_next_mass[i] = items;
            i++;
        }
    });

    if(i === 0) {
      var nextDay = moment('0', formatDay).add(1,'d').format(formatDay);
      nextDay = parseInt(nextDay);
        console.log("Zapraszamy na jutrzejszą msze o: " + selectTab(nextDay)[0]);
        
    } else {
      console.log("Następna msza odbędzie się o: " + tab_next_mass[0]);
    }    
}

console.log('test fetch');


function displayStream() {
    console.log('Tu będzie iframe, jest transmisja!');
}


checkIsMassNow();


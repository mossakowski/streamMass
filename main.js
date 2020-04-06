var tab_mass_schedule = {
    tab_mass_weekday_saturday : ['07:00', '08:00', '18:00'],
    tab_mass_friday : ['07:00', '08:00', '16:30', '18:00'],
    tab_mass_sunday : ['07:00', '08:30', '10:00', '11:30', '16:30', '19:30']
}

const screen = document.getElementById('screen');

const format_time = "HH:mm";
const format_day = 'd';

function app() {
    
    class momentDateTime {
        
        currentTime() {
            return moment(moment().format(format_time),format_time);
        }
        
        currentDay() { 
        return parseInt(moment().format('d')); // moment().format('d'); put integer example: 3;
        }
    }

    var obj_date_time = new momentDateTime();

    var current_day = obj_date_time.currentDay();
    var current_time = obj_date_time.currentTime();

    function selectTab(current_day) {
        if(current_day >= 1 && current_day <=4 || current_day == 6) {
            return tab = tab_mass_schedule['tab_mass_weekday_saturday'];
        }

        if(current_day === 5) {
            return tab = tab_mass_schedule['tab_mass_friday'];
        }

        if(current_day === 0) {
            return tab = tab_mass_schedule['tab_mass_sunday'];
        }
    }

    function checkIsMassNow() {
        var i = 0;    
        selectTab(current_day).forEach(function(items) {
            var items = moment(items, format_time);
            var start_stream = moment(items, format_time)
                    .subtract(10, 'm');
            var end_stream = moment(items, format_time)
                    .add(70, 'm');
                    
            if(current_time.isBetween(start_stream,end_stream)) {
                i++;
            }
        });

        if(i>0) {
            showStream();
        } else {
            checkWhenNextMass(selectTab(current_day));
        }
    }

    function checkWhenNextMass(tab) {
        var tab_next_mass = [];
        var i = 0;
        tab.forEach(function(items) {
            if(current_time.isBefore(moment(items,format_time))) {
                tab_next_mass[i] = items;
                i++;
            }
        });

        if(i === 0) {
        let next_day = moment(current_day, format_day).add(1,'d').format(format_day);
        next_day = parseInt(next_day);
            console.log("Zapraszamy na jutrzejszą msze o: " + selectTab(next_day)[0]);
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

(function() {
    var mass_schedule_container = document.querySelector('.mass_schedule');
    var mass_schedule_children = mass_schedule_container.querySelectorAll('[data-mass]');

    for(let i=0;i<mass_schedule_children.length;i++) {
        let tab = 'tab_mass_' + mass_schedule_children[i].getAttribute('data-mass');
        let text = tab_mass_schedule[tab].join(' ');
        mass_schedule_children[i].innerHTML = text;
    }
})();

setInterval(function() {
    app();
}, 60 * 1000);




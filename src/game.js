Game = {
    // This defines our grid's size and the size of each of its tiles
    map_grid: {
        width: 16,
        height: 7,
        tile: {
            width: 64,
            height: 64
        }
    },

    PASSENGER_COUNT: 50,

    // The total width of the game screen. Since our grid takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    // The total height of the game screen. Since our grid takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },

   start_timer: function() {
        /* This function takes care of moving the train through stations */
        var timer = Crafty.e('timer');
		var interval = 18000;
		var next_event = 'announcement';

        timer.delay(function() {
        
			if(next_event == 'announcement') {
				var pa_timer = Crafty.e('timer');
				pa_timer.delay(function() {
					Crafty.audio.play('blimblom');
					document.getElementById('dialog').innerHTML = "<p><strong>The next stop: " + Train.route[Train.route.indexOf(Game.current_station) + 1] + "</strong></p>";
				}, interval * 0.25, 0);
				next_event = 'station';
			}

			else {
				// If the next station will be the final station, end the game
				if(Train.route.indexOf(Game.current_station) > 1) {
				  Crafty.scene('Victory');
				  return;
				}

				else {
				  Game.current_station = Train.route[Train.route.indexOf(Game.current_station) + 1 ];
				  Crafty.scene('StationChange');
				  next_event = 'announcement';
				} 
			}
      }, interval, 5);
    },

    // Initialize and start our game
    start: function() {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(255,255,255)');

        Crafty.interactable = Crafty.bind('Interactable', Bindings.interaction);
        Crafty.transitionable = Crafty.bind('Transitionable', Bindings.transition);

        // Simply start the "Loading" scene to get things going
        Crafty.scene('Loading');
    },

    
 


    calculate_interaction_coordinate: function(x, y, direction) {

        if (direction === 'up') return {
            x: x,
            y: y - 1,
            x2: x,
            y2: y - 2
        };
        else if (direction === 'left') return {
            x: x - 1,
            y: y,
            x2: x - 2,
            y2: y
        };
        else if (direction === 'right') return {
            x: x + 1,
            y: y,
            x2: x + 2,
            y2: y
        };
        else if (direction === 'down') return {
            x: x,
            y: y + 1,
            x2: x,
            y2: y + 2
        };

    },

    add_points: function(n) {
        this.points += n;
        document.getElementById('points').innerHTML = this.points;
    },

    LEFT_X: 1,
    RIGHT_X: 14,
    points: 0,
    last_scene: 'Start',
    current_car: 'engine',
    direction_from: undefined,
    interaction_mode: false,
    current_station: 'Turku',
	  bg_audio_playing: false

}

$text_css = {
    'font-size': '200%',
    'font-family': 'Arial',
    'font-color': 'black',
    'text-align': 'center'
}

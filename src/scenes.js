// Game scene
// -------------
// Runs the core gameplay loop
//
Crafty.scene('engine', function() {
    console.log('creating engine-scene');

    // Clear points and show starting dialog
    document.getElementById('points').innerHTML = Game.points;
    this.dialog = Crafty.e('Dialog');
    if (Game.last_scene === 'Start') {
        Game.start_timer();
        document.getElementById('dialog').innerHTML = '<p><b> Welcome to Trainman: </b><br /> ' + this.dialog.dialog.tutorial + '</p>';
    }

    fill_car(Train.templates[Game.current_car]);
    insert_passengers(Game.current_station);

    // Player character, placed at 5, 1 on our grid
    if (Game.last_scene === 'Start') {
        this.player = Crafty.e('PlayerCharacter').at(11, 1);
        Game.last_scene = Game.current_car;
    } else {
        this.player = Crafty.e('PlayerCharacter').at(Game.LEFT_X, 3);
    }

    // -------------------- START THE GAME -------------------/
    // Play onboard audio in the background, loop forever
	if (!Game.bg_audio_playing) {
    	Crafty.audio.play('background', -1, 0.7);
    	Crafty.audio.play('music', -1, 0.4);
		Game.bg_audio_playing = true;
	}

}, function() {
    this.unbind('Interactable', this.interactable);
    this.unbind('Transitionable', this.transitionable);
});


// Station change scene
Crafty.scene('StationChange', function() {

    Crafty.e('2D, DOM, Image').css('background', '#000').image('assets/station_screen.png');
    document.getElementById('minimap').innerHTML = '<img src="assets/kartta_' + Game.current_station.toLowerCase() + '.png" />';
    document.getElementById('dialog').innerHTML = "<p><strong>The train stops at " + Game.current_station + "</strong></p>";

    setTimeout(function() {

        Crafty.scene(Game.current_car);

    }, 8000);


});

// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
    console.log('entering victory-scene');

    document.getElementById('dialog').innerHTML = "<p><strong> We arrive at Helsinki, the final destination. <br /> Your final score was " + Game.points + " points.</strong></p>";

    var how_many_checked = 0;
    for(var index in Train.passenger_in_cars) {
        var car = Train.passenger_in_cars[index];
        how_many_checked += _.filter(car, function(passenger) { return passenger.checked; }).length;
    };


    var victory = 'Train has reached the final station<br />There were ' + Game.PASSENGER_COUNT + ' passengers and you checked ' + how_many_checked + ' passengers. <br /> Your total points are ' + Game.points + '<br /> Well done!<br /> Press F5 to replay.';
    var failure = 'Train has reached the final station<br />There were ' + Game.PASSENGER_COUNT + ' passengers and you checked ' + how_many_checked + ' passengers. <br /> Your total points are ' + Game.points + '<br /> Unfortunately, it was not good enough and you are fired.<br /> Press F5 to replay.';

    var scoreLimit = 15;

    // Display some text in celebration of the victory
    if(Game.points >= scoreLimit) {
        Crafty.e('2D, DOM, Text').text(victory).attr({
            x: 0,
            y: Game.height() / 2 - 24,
            w: Game.width()
        }).css($text_css);

        // Give'em a round of applause!
        Crafty.audio.play('applause');
    } 
    // Display some text to mock the player for her failure
    else {
        Crafty.e('2D, DOM, Text').text(failure).attr({
            x: 0,
            y: Game.height() / 2 - 24,
            w: Game.width()
        }).css($text_css);
    }
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function() {
    console.log('entering loading-scene');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Image').css('background', '#000').image('assets/title_screen.png');


    // Load our sprite map image
    Crafty.load(['assets/passengers.png', 'assets/spritet.png', 'assets/level_old.png', 'assets/board_room_applause.mp3', 'assets/board_room_applause.ogg', 'assets/onboard_background2.mp3', 'assets/onboard_background2.ogg', 'assets/wtf.mp3', 'assets/wtf.ogg', 'assets/door_closes.mp3', 'assets/door_closes.ogg', 'assets/music.mp3', 'assets/music.ogg', 'assets/blimblom.mp3', 'blimblom.ogg'], function() {
        // Once the images are loaded...
        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        //  to remind us that they simply cause the entity
        //  to be drawn with a certain sprite
/*
        Default facing downwards
         */
        Crafty.sprite(54, 70, 'assets/bartender.png', {
            spr_bartender: [0, 0]
        });

        Crafty.sprite(54, 70, 'assets/konna.png', {
            spr_trainplayer: [1, 0]
        });

        Crafty.sprite(54, 70, 'assets/passengers.png', {
            spr_woman1_right: [0, 2],
            spr_woman1_left: [1, 2],
            spr_woman2_right: [0, 0],
            spr_woman2_left: [1, 0],
            spr_teen_right: [2, 2],
            spr_teen_left: [3, 2],
            spr_teenboy_right: [2, 1],
            spr_teenboy_left: [3, 1],
            spr_kid1_right: [4, 0],
            spr_kid1_left: [4, 1],
            spr_kid2_right: [2, 0],
            spr_kid2_left: [3, 0],
            spr_man_right: [0, 1],
            spr_man_left: [1, 1],
            spr_senior_right: [4, 2],
            spr_senior_left: [0, 3]

        });

        Crafty.sprite(64, 'assets/spritet.png', {
            spr_chair: [0, 0],
            spr_board: [1, 0],
            spr_floor_dark: [3, 0],
            spr_floor_light: [4, 0],
            spr_wall_grate: [1, 1],
            spr_bar_counter: [2, 0],
            spr_wall_noborders: [2, 1],
            spr_wall_leftborder: [2, 2],
            spr_wall_rightborder: [0, 2],
            spr_wall_bothborders: [6, 1],
            spr_wall_jallu: [5, 1],
            spr_wall_martini: [3, 2],
            spr_wall_boozes: [3, 1],
            spr_wall_window: [4, 1],
            spr_wall_vr: [1, 2],
            spr_wall_middle_left: [6, 2],
            spr_wall_middle_right: [5, 2],
            spr_wall_middle_both: [4, 2],
            spr_passenger_chair_right: [6, 0],
            spr_passenger_chair_left: [0, 1],
            spr_passenger_table: [5, 0]
        });

        // Define our sounds for later use
        Crafty.audio.add({
            applause: ['assets/board_room_applause.mp3', 'assets/board_room_applause.ogg'],
            background: ['assets/onboard_background2.mp3', 'assets/onboard_background2.ogg'],
            wtf: ['assets/wtf.mp3', 'assets/wtf.ogg'],
            door: ['assets/door_closes.mp3', 'assets/door_closes.ogg'],
            music: ['assets/music.mp3', 'assets/music.ogg'],
			blimblom: ['assets/blimblom.mp3', 'assets/blimblom.ogg']
        });

        // Now that our sprites are ready to draw, start the game after showing
        // title screen for a while
        Train.create_templates();
        Train.set_passengers(Game.PASSENGER_COUNT);

        setTimeout(function() {
            Crafty.scene('engine');
        }, 2000);
    });
});

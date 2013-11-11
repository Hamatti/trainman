// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene( 'Game', function () {

    // Clear points and show starting dialog
    document.getElementById('points').innerHTML = "0";
    this.dialog = Crafty.e('Dialog');
    document.getElementById('dialog').innerHTML = '<p><b> Controls: </b><br /> ' + this.dialog.dialog.tutorial + '</p>';


    // ---------------- CREATE SCENE --------------------- //
    // A 2D array to keep track of all occupied tiles
    this.occupied = new Array( Game.map_grid.width );
    for ( var i = 0; i < Game.map_grid.width; i++ ) {
        this.occupied[i] = new Array( Game.map_grid.height );
        for ( var y = 0; y < Game.map_grid.height; y++ ) {
            this.occupied[i][y] = false;
        }
    }

    // A 2D array to keep track of all passeneger positions
    this.passengers = new Array(Game.map_grid.width);
    for ( var i = 0; i < Game.map_grid.width; i++ ) {
        this.passengers[i] = new Array( Game.map_grid.height );
        for ( var y = 0; y < Game.map_grid.height; y++ ) {
            this.passengers[i][y] = "none";
        }
    }


    // A 2D array to keep track of all transition areas
    this.transitions = new Array(Game.map_grid.width);
    for ( var i = 0; i < Game.map_grid.width; i++ ) {
        this.transitions[i] = new Array( Game.map_grid.height );
        for ( var y = 0; y < Game.map_grid.height; y++ ) {
            this.transitions[i][y] = false;
        }
    }

    var template = get_car('engine');
    fill_car(template);

/*    // Insert car elements
    for ( var x = 0; x < Game.map_grid.width; x++ ) {
        for ( var y = 0; y < Game.map_grid.height; y++ ) {
            Crafty.e( 'Floor_light' ).at(x,y);
            var at_edge = x == 0 || x == Game.map_grid.width - 1 ||  y == 0;
            var tile;
            if ( at_edge ) {
                if (y == 0) {
					if (x == 0 || x == Game.map_grid.width - 1) {tile = 'Wall_vr';}
					else if (x < 5) {tile = 'Wall_boozes';}
					else if (x == 7 || x == 9 || x == 10 || x == 12) {tile = 'Wall_window';}
					else {tile = 'Wall_borderless';}
				}
				else if (x == 0 || x == Game.map_grid.width - 1) {
					if (y == 3 || y == 4) {
                        tile = 'Wall_grate';
                        this.transitions[x][y] = true;
                    }
					else {tile = 'Wall_borderless';}
				}
			}
			else {
				if (y == 1 || y == 2) {
					if (y == 2 && x < 5) {tile = 'Bar_counter';}
					else if (x == 7 || x == 9 || x == 10 || x == 12) {tile = 'Bar_chair';}
					else if (x == 8 || x == 11) {tile = 'Bar_table';}
					else {continue;}
				}
				else if (y == 3 || y == 4) {tile = 'Floor_dark';}
				else {
					if (x == 2 || x == 5 || x == 8 || x == 11) {tile = 'Bar_table';}
					else {tile = 'Bar_chair';}
				}
			}
            Crafty.e( tile ).at( x, y );
            */
            //---- MANUALLY INSERTED PASSENGERS ----//
                Crafty.e( 'Woman1_right' ).at(1,5);
                this.passengers[1][5] = "unchecked";
                Crafty.e( 'Teen_right' ).at(7,2);
                this.passengers[7][2] = "unchecked";
                Crafty.e( 'Child2_left' ).at(6,5);
                this.passengers[6][5] = "unchecked";



    // Player character, placed at 5, 1 on our grid
    this.player = Crafty.e( 'PlayerCharacter' ).at( 5, 1 );
    this.occupied[this.player.at().x][this.player.at().y] = true;

    // -------------------- START THE GAME -------------------/
    // Play onboard audio in the background, loop forever
    Crafty.audio.play( 'background', -1 );

    this.interactable = this.bind('Interactable', function(data) {
        if (this.passengers[data.x+1][data.y] === "unchecked" || this.passengers[data.x][data.y+1] === "unchecked" || this.passengers[data.x-1][data.y] === "unchecked" || this.passengers[data.x][data.y-1] === "unchecked") {

            this.passengers[data.x+1][data.y] = "checked";
            this.passengers[data.x-1][data.y] = "checked";
            this.passengers[data.x][data.y+1] = "checked";
            this.passengers[data.x][data.y-1] = "checked";

            interact(data.player);
        }
        else if(this.passengers[data.x+1][data.y] === "checked" || this.passengers[data.x][data.y+1] === "checked" || this.passengers[data.x-1][data.y] === "checked" || this.passengers[data.x][data.y-1] === "checked") {
            document.getElementById('dialog').innerHTML = '<p> HEY! I already showed my ticket, get lost </p>';
        }
        setTimeout(function() {
            if(document.getElementById('points').innerHTML == parseInt(3)) Crafty.scene('Victory');
        }, 3000);

    });

    this.transitionable = this.bind('Transitionable', function(data) {
        if (this.transitions[data.x][data.y] === true) {
            Crafty.scene('Transitiondemo');
        }
    });

}, function() {
    this.unbind('Interactable', this.interactable);
    this.unbind('Transitionable', this.transitionable);
});


// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene( 'Victory', function () {

    // Display some text in celebration of the victory
    Crafty.e( '2D, DOM, Text' )
        .text( 'All passengers checked<br /> This alpha version only contains one car. Press F5 to replay.' )
        .attr( { x: 0, y: Game.height() / 2 - 24, w: Game.width() } )
        .css( $text_css );

    // Give'em a round of applause!
    Crafty.audio.play( 'applause' );

    // After a short delay, watch for the player to press a key, then restart
    // the game when a key is pressed
    var delay = true;
    setTimeout( function () {
        delay = false;
    }, 5000 );
    this.restart_game = function () {
        document.getElementById('points').innerHTML = 0;
        Crafty.scene( 'Game' );
    };
//    this.bind( 'KeyDown', this.restart_game );
}
/*function () {
    // Remove our event binding from above so that we don't
    //  end up having multiple redundant event watchers after
    //  multiple restarts of the game
    this.unbind( 'KeyDown', this.restart_game );
}*/
);

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene( 'Loading', function () {
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e( '2D, DOM, Image' ).css('background', '#000').image('assets/title_screen.png');

    // Load our sprite map image
    Crafty.load( [
        'assets/16x16_forest_2.gif',
        'assets/passengers.png',
        'assets/spritet.png',
		'assets/level_old.png',
        'assets/hunter.png',
        'assets/board_room_applause.mp3',
        'assets/board_room_applause.ogg',
        'assets/board_room_applause.aac',
		'assets/onboard_background2.mp3',
		'assets/onboard_background2.ogg',
		'assets/onboard_background2.aac'
   ], function () {
        // Once the images are loaded...

        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        //  to remind us that they simply cause the entity
        //  to be drawn with a certain sprite

        /*
        Default facing downwards
         */
		Crafty.sprite(54, 70, 'assets/konna.png', {
			spr_trainplayer: [1, 0]
		});

        Crafty.sprite(54, 70, 'assets/passengers.png', {
            spr_woman1_right: [0, 0],
            spr_woman1_left: [1, 0],
            spr_woman2_right: [0, 1],
            spr_woman2_left: [1, 1],
            spr_teen_right: [2, 1],
            spr_teen_left: [3, 1],
            spr_kid1_right: [2, 0],
            spr_kid1_left: [3, 0],
            spr_kid2_right: [0, 2],
            spr_kid2_left: [1, 2]
        });

        Crafty.sprite( 64, 'assets/spritet.png', {
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
        Crafty.audio.add( {
			applause: ['assets/board_room_applause.mp3',
                'assets/board_room_applause.ogg',
                'assets/board_room_applause.aac'],
			background: ['assets/onboard_background2.mp3',
				'assets/onboard_background2.ogg',
				'assets/onboard_background2.aac']
       } );

        // Now that our sprites are ready to draw, start the game after showing
        // title screen for a while
        setTimeout(function() { Crafty.scene( 'Game' ); }, 2000);
    } );
} );

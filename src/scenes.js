// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene( 'Game', function () {

    // Clear points and show starting dialog
    document.getElementById('points').innerHTML = 0;
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

    // Place a tree at every edge square on our grid of 16x16 tiles
    for ( var x = 0; x < Game.map_grid.width; x++ ) {
        for ( var y = 0; y < Game.map_grid.height; y++ ) {
            Crafty.e( 'Floor_light' ).at(x,y);
            var at_edge = x == 0 || x == Game.map_grid.width - 1 ||  y == 0;
            var tile;
            if ( at_edge ) {
                // Place a tree entity at the current tile
				// Crafty.e( 'Tree' ).at( x, y );
				if (y == 0) {
					if (x == 0 || x == Game.map_grid.width - 1) {tile = 'Wall_vr';} 
					else if (x < 5) {tile = 'Wall_boozes';}
					else if (x == 7 || x == 9 || x == 10 || x == 12) {tile = 'Wall_window';}
					else {tile = 'Wall_borderless';}
				}
				else if (x == 0 || x == Game.map_grid.width - 1) {
					if (y == 3 || y == 4) {tile = 'Floor_dark';}
					else {tile = 'Wall_borderless';}
				}
			}
			else {
				if (y == 1 || y == 2) {
					if (y == 2 && x < 5) {tile = 'Wall_wooden';}
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
            //---- MANUALLY INSERTED PASSENGERS ----//
            if(x==1 && y==5) {
                Crafty.e( 'Woman1_right' ).at(x,y);
            }
            if(x==7 && y==2) {
                Crafty.e( 'Teen_right' ).at(x,y);
            }
            if(x==6 && y==5) {
                Crafty.e( 'Child2_left' ).at(x,y);
            }
            this.occupied[x][y] = true;
            
//			 else if ( Math.random() < 0.06 && !this.occupied[x][y] ) {
//                // Place a bush entity at the current tile
//                var bush_or_rock = (Math.random() > 0.3) ? 'Bush' : 'Rock';
//                Crafty.e( bush_or_rock ).at( x, y );
//                this.occupied[x][y] = true;
//            }
        }
    }
    // Player character, placed at 5, 5 on our grid
    this.player = Crafty.e( 'PlayerCharacter' ).at( 5, 1 );
    this.occupied[this.player.at().x][this.player.at().y] = true;

//    // Generate five villages on the map in random locations
//    var max_villages = 10;
//    for ( var x = 0; x < Game.map_grid.width; x++ ) {
//        for ( var y = 0; y < Game.map_grid.height; y++ ) {
//            if ( Math.random() < 0.03 ) {
//                if ( Crafty( 'Village' ).length < max_villages && !this.occupied[x][y] ) {
//                    Crafty.e( 'Village' ).at( x, y );
//                }
//            }
//        }
//    }

    // -------------------- START THE GAME -------------------/
    // Play a ringing sound to indicate the start of the journey
    Crafty.audio.play( 'ring' );

    // Show the victory screen once all villages are visisted
    this.show_victory = this.bind( 'VillageVisited', function () {
        if ( !Crafty( 'Village' ).length ) {
            Crafty.scene( 'Victory' );
        }
    } );

    this.interactable = this.bind('Interactable', function(data) {
        if (this.occupied[data.x+1][data.y] || this.occupied[data.x][data.y+1] || this.occupied[data.x-1][data.y] || this.occupied[data.x][data.y-1]) {
            interact(data.player);
        }
    });

}, function () {
    // Remove our event binding from above so that we don't
    //  end up having multiple redundant event watchers after
    //  multiple restarts of the game
    this.unbind( 'VillageVisited', this.show_victory );
} );


// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene( 'Victory', function () {
    // Display some text in celebration of the victory
    Crafty.e( '2D, DOM, Text' )
        .text( 'All villages visited!' )
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
    this.bind( 'KeyDown', this.restart_game );
}, function () {
    // Remove our event binding from above so that we don't
    //  end up having multiple redundant event watchers after
    //  multiple restarts of the game
    this.unbind( 'KeyDown', this.restart_game );
} );

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
        'assets/door_knock_3x.mp3',
        'assets/door_knock_3x.ogg',
        'assets/door_knock_3x.aac',
        'assets/board_room_applause.mp3',
        'assets/board_room_applause.ogg',
        'assets/board_room_applause.aac',
        'assets/candy_dish_lid.mp3',
        'assets/candy_dish_lid.ogg',
        'assets/candy_dish_lid.aac'
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
            spr_woman1_left: [3, 0],
            spr_woman2_right: [1, 0],
            spr_woman2_left: [3, 0],
            spr_teen_right: [0, 1],
            spr_teen_left: [1, 1],
            spr_kid1_right: [2, 1],
            spr_kid1_left: [1, 2],
            spr_kid2_right: [3, 1],
            spr_kid2_left: [0, 2]
        });

        Crafty.sprite( 64, 'assets/spritet.png', {
            spr_chair: [0, 0],
            spr_board: [1, 0],
            spr_floor_dark: [3, 0],
            spr_floor_light: [4, 0],
            spr_wall_ritila: [1, 1],
            spr_wall_wooden: [2, 0],
            spr_wall_noborders: [2, 1],
            spr_wall_leftborder: [2, 2],
            spr_wall_rightborder: [0, 2],
            spr_wall_bothborders: [6, 1],
            spr_wall_jallu: [5, 1],
            spr_wall_martini: [3, 2],
            spr_wall_boozes: [3, 1],
            spr_wall_window: [4, 1],
            spr_wall_vr: [1, 2]
        });

        // Define our sounds for later use
        Crafty.audio.add( {
            knock: ['assets/door_knock_3x.mp3',
                'assets/door_knock_3x.ogg',
                'assets/door_knock_3x.aac'],
            applause: ['assets/board_room_applause.mp3',
                'assets/board_room_applause.ogg',
                'assets/board_room_applause.aac'],
            ring: ['assets/candy_dish_lid.mp3',
                'assets/candy_dish_lid.ogg',
                'assets/candy_dish_lid.aac']
        } );

        // Now that our sprites are ready to draw, start the game after showing
        // title screen for a while
        setTimeout(function() { Crafty.scene( 'Game' ); }, 2000);
    } )
} );

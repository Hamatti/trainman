Crafty.scene('bar', function() {



  fill_car(Train.templates[Game.current_car]);

  insert_passengers();
   //---- ULTIMATE BARTENDER ----//
   Crafty.e( 'bartender' ).at(3,1);

    // Player character, placed at 5, 1 on our grid
    if(Game.direction_from === 'right') {
        this.player = Crafty.e( 'PlayerCharacter' ).at(Game.RIGHT_X, 3);
    }
    else {
        this.player = Crafty.e( 'PlayerCharacter' ).at(Game.LEFT_X, 3);
    }

 // -------------------- START THE GAME -------------------/
    // Play onboard audio in the background, loop forever
    Crafty.audio.play( 'background', -1 );

    this.interactable = this.bind('Interactable', Bindings.interaction);

}, function() {
    this.unbind('Interactable', this.interactable);
    this.unbind('Transitionable', this.transitionable);
});



Crafty.scene('bar', function() {

    // A 2D array to keep track of all passeneger positions
    this.passengers = new Array(Game.map_grid.width);
    for ( var i = 0; i < Game.map_grid.width; i++ ) {
        this.passengers[i] = new Array( Game.map_grid.height );
        for ( var y = 0; y < Game.map_grid.height; y++ ) {
            this.passengers[i][y] = "none";
        }
    }

   this.template = get_car('bar');
   fill_car(this.template);

   //---- MANUALLY INSERTED PASSENGERS ----//
   Crafty.e( 'Woman1_right' ).at(1,5);
   this.passengers[1][5] = "unchecked";
   Crafty.e( 'Teen_right' ).at(7,2);
   this.passengers[7][2] = "unchecked";
   Crafty.e( 'Child2_left' ).at(6,5);
   this.passengers[6][5] = "unchecked";

    // Player character, placed at 5, 1 on our grid
    this.player = Crafty.e( 'PlayerCharacter' ).at(Game.RIGHT_X, 3);

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

    this.transitionable = this.bind('Transitionable', Bindings.transition);

}, function() {
    this.unbind('Interactable', this.interactable);
    this.unbind('Transitionable', this.transitionable);
});



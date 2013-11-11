Crafty.scene( 'Transitiondemo', function () {

    // Display some text in celebration of the victory
    Crafty.e( '2D, DOM, Text' )
        .text( 'Transition succesful<br /> This alpha version only contains one car. Press F5 to replay.' )
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
});
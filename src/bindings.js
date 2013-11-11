var Bindings = {

    transition: function(data) {
        if (this.template[data.x][data.y] === "Wall_grate") {
            if(data.x == Game.LEFT_X) {
              Game.last_scene = 'Game';
              Crafty.scene('Scene2');
            }
            else if(data.x == Game.RIGHT_X) {
              Game.last_scene = 'Scene2';
              Crafty.scene('Game');
            }
        }
    }
}

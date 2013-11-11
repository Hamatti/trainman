var Bindings = {

    transition: function(data) {
        if (this.template[data.x][data.y] === "Wall_grate") {
            if(data.x == Game.LEFT_X) {
              Game.last_scene = Game.current_scene;
              var next_scene = Train.which_car("left");
              if(next_scene !== undefined) {
                  Game.current_car = next_scene;
                  Game.direction_from = 'right';
                  Crafty.scene(next_scene);
              }
            }
            else if(data.x == Game.RIGHT_X) {
                Game.last_scene = Game.current_scene;
                var next_scene = Train.which_car("right");
                if(next_scene !== undefined) {
                    Game.current_car = next_scene;
                    Game.direction_from = 'left';
                    Crafty.scene(next_scene);
                }
            }
        }
    }
}

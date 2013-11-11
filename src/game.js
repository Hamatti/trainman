Game = {
  // This defines our grid's size and the size of each of its tiles
  map_grid: {
    width:  14,
    height: 7,
    tile: {
      width:  64,
      height: 64
    }
  },

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

  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(255,255,255)');

    // Simply start the "Loading" scene to get things going
    Crafty.scene('Loading');
  },

  LEFT_X: 0,
  RIGHT_X: 13,
  points: 0,
  last_scene: 'Start',
  current_car: 'engine',
  direction_from: undefined

}

$text_css = {
  'font-size': '200%',
  'font-family': 'Arial',
  'font-color': 'black',
  'text-align': 'center'
}

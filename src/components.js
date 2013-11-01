// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  }
});

// A solid wall
Crafty.c('Bar_chair', {
    init: function() {
        this.requires('Actor, Solid, spr_chair');
    }
});

// A solid wall
Crafty.c('Bar_table', {
    init: function() {
        this.requires('Actor, Solid, spr_board');
    }
});

// A solid wall
Crafty.c('Wall_borderless', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_noborders');
    }
});

// A solid wall
Crafty.c('Wall_window', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_window');
    }
});

// A solid wall
Crafty.c('Wall_ritila', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_ritila');
    }
});

// A solid wall
Crafty.c('Wall_wooden', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_wooden');
    }
});

// A solid wall
Crafty.c('Wall_leftborders', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_leftborders');
    }
});

// A solid wall
Crafty.c('Wall_rightborders', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_rightborders');
    }
});

// A solid wall
Crafty.c('Wall_bothborders', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_bothborders');
    }
});

// A solid wall
Crafty.c('Floor_dark', {
    init: function() {
        this.requires('Actor, spr_floor_dark');
    }
});

// A solid wall
Crafty.c('Floor_light', {
    init: function() {
        this.requires('Actor, spr_floor_light');
    }
});

// A solid wall
Crafty.c('Wall_vr', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_vr');
    }
});

// A solid wall
Crafty.c('Wall_jallu', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_jallu');
    }
});

// A solid wall
Crafty.c('Wall_boozes', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_boozes');
    }
});

// A solid wall
Crafty.c('Wall_martini', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_martini');
    }
});

// A Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Solid, spr_tree');
  }
});

// A Bush is just an Actor with a certain sprite
Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Solid, spr_bush');
  }
});

// A Rock is just an Actor with a certain sprite
Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Solid, spr_rock');
  }
});

Crafty.c('Dialog', {
  init: function() {
  },

  dialog: {
      "intro": "Welcome to TRAINMAN",
      "check_prompt": "Tickets, please",
      "check_success": "Your ticket is valid, have a nice trip!",
      "check_failure": "WHAT?! You don't have a ticket? That's fine for you!",
      "tutorial": "You can move the Hero with arrows or WASD. <br />Interact with E"
  }

});


// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, spr_trainplayer, SpriteAnimation, Keyboard')
      .fourway(2)
      .stopOnSolids()
      .onHit('Village', this.visitVillage)
      .bind('KeyDown', function() {
          if(this.isDown('E')) _interact(this);
          if(this.isDown('R')) clearDialog();
          if(this.isDown('O')) restartGame();
      });
      // These next lines define our four animations
      //  each call to .animate specifies:
      //  - the name of the animation
      //  - the x and y coordinates within the sprite
      //     map at which the animation set begins
      //  - the number of animation frames *in addition to* the first one
//      .animate('PlayerMovingUp',    1, 1, 0)
//      .animate('PlayerMovingRight', 1, 1, 0)
//      .animate('PlayerMovingDown',  1, 1, 0)
//      .animate('PlayerMovingLeft',  1, 1, 0);

    // Watch for a change of direction and switch animations accordingly
//    var animation_speed = 4;
//    this.bind('NewDirection', function(data) {
//      if (data.x > 0) {
//        this.animate('PlayerMovingRight', animation_speed, -1);
//      } else if (data.x < 0) {
//        this.animate('PlayerMovingLeft', animation_speed, -1);
//      } else if (data.y > 0) {
//        this.animate('PlayerMovingDown', animation_speed, -1);
//      } else if (data.y < 0) {
//        this.animate('PlayerMovingUp', animation_speed, -1);
//      } else {
//        this.stop();
//      }
//    });
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);

    return this;
  },

  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  // Respond to this player visiting a village
  visitVillage: function(data) {
    village = data[0].obj;
    village.visit();
  },


});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
  init: function() {
    this.requires('Actor, spr_village');
  },

  // Process a visitation with this village
  visit: function() {
    calculatePoints();
    this.destroy();
    Crafty.audio.play('knock');
    Crafty.trigger('VillageVisited', this);
  }
});


function calculatePoints() {
    var points_div = document.getElementById('points');
    points = parseInt(points_div.innerHTML) + 1;
    points_div.innerHTML = points;
}

function _interact(player) {
    console.log(player.at().y);
    Crafty.trigger('Interactable',{ x: Math.floor(player.at().x), y: Math.floor(player.at().y), player: player });
    Crafty.trigger('Interactable',{ x: Math.ceil(player.at().x), y: Math.ceil(player.at().y), player: player});
}

function interact(player) {
    var dialog = Crafty.e('Dialog').dialog;
    document.getElementById('dialog').innerHTML = '<p>Tickets, please!</p>';
    setTimeout(function() { document.getElementById('dialog').innerHTML = '<p>' + ((Math.random() < 0.5) ? dialog.check_success : dialog.check_failure) + '</p>'; }, 1000);
}

function clearDialog() {
    document.getElementById('dialog').innerHTML = '';
}

function restartGame() {
    Crafty.scene('Game');
}

function printDialog(data) {
    console.log(data);
}

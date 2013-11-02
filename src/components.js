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

// Abstract passenger
Crafty.c('Passenger', {
  init: function() {
    this.requires('Actor, Solid');
  }
});

// A solid bar chair
Crafty.c('Bar_chair', {
    init: function() {
        this.requires('Actor, Solid, spr_chair');
    }
});

// A solid bar table
Crafty.c('Bar_table', {
    init: function() {
        this.requires('Actor, Solid, spr_board');
    }
});

// A solid passenger table
Crafty.c('Passenger_table', {
    init: function() {
        this.requires('Actor, Solid, spr_passenger_table');
    }
});

// A solid passenger chair facing right
Crafty.c('Passenger_chair_right', {
    init: function() {
        this.requires('Actor, Solid, spr_passenger_chair_right');
    }
});

// A solid passenger chair facing left
Crafty.c('Passenger_chair_left', {
    init: function() {
        this.requires('Actor, Solid, spr_passenger_chair_left');
    }
});

// A solid middlewall with right border
Crafty.c('Wall_middle_right', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_middle_right');
    }
});

// A solid middlewall with left border
Crafty.c('Wall_middle_left', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_middle_left');
    }
});

// A solid middlewall with both borders
Crafty.c('Wall_middle_both', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_middle_both');
    }
});

// A solid wall (without borders)
Crafty.c('Wall_borderless', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_noborders');
    }
});

// A solid wall with a window
Crafty.c('Wall_window', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_window');
    }
});

// A solid wall with a ritila
Crafty.c('Wall_ritila', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_ritila');
    }
});

// A solid bar counter
Crafty.c('Wall_wooden', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_wooden');
    }
});

// A solid wall (with borders in the left side)
Crafty.c('Wall_leftborders', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_leftborders');
    }
});

// A solid wall (with borders in the right side)
Crafty.c('Wall_rightborders', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_rightborders');
    }
});

// A solid wall (with borders on both sides)
Crafty.c('Wall_bothborders', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_bothborders');
    }
});

// A dark floor
Crafty.c('Floor_dark', {
    init: function() {
        this.requires('Actor, spr_floor_dark');
    }
});

// A happy floor
Crafty.c('Floor_light', {
    init: function() {
        this.requires('Actor, spr_floor_light');
    }
});

// A propaganda-wall
Crafty.c('Wall_vr', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_vr');
    }
});

// A sheriff-wall
Crafty.c('Wall_jallu', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_jallu');
    }
});

// A solid wall of expensive booze
Crafty.c('Wall_boozes', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_boozes');
    }
});

// A solid wall with martini (shaken, not stirred)
Crafty.c('Wall_martini', {
    init: function() {
        this.requires('Actor, Solid, spr_wall_martini');
    }
});

// -----------------PASSENGERS--------------------//
//Adult woman in red coat, facing right
Crafty.c('Woman1_right', {
    init: function() {
        this.requires('Passenger, spr_woman1_right');
    }
});

//Adult woman in red coat, facing left
Crafty.c('Woman1_left', {
    init: function() {
        this.requires('Passenger, spr_woman1_left');
    }
});

//Adult woman in green coat, facing right
Crafty.c('Woman2_right', {
    init: function() {
        this.requires('Passenger, spr_woman2_right');
    }
});

//Adult woman in green coat, facing left
Crafty.c('Woman2_left', {
    init: function() {
        this.requires('Passenger, spr_woman2_left');
    }
});

//Teen in green coat facing right
Crafty.c('Teen_right', {
    init: function() {
        this.requires('Passenger, spr_teen_right');
    }
});

//Teen in green coat, facing left
Crafty.c('Teen_left', {
    init: function() {
        this.requires('Passenger, spr_teen_left');
    }
});

//Child in red coat, facing right
Crafty.c('Child1_right', {
    init: function() {
        this.requires('Passenger, spr_kid1_right');
    }
});

//Child in red coat, facing left
Crafty.c('Child1_left', {
    init: function() {
        this.requires('Passenger, spr_kid1_left');
    }
});

//Child in blue coat, facing right
Crafty.c('Child2_right', {
    init: function() {
        this.requires('Passenger, spr_kid2_right');
    }
});

//Child in blue coat, facing left
Crafty.c('Child2_left', {
    init: function() {
        this.requires('Passenger, spr_kid2_left');
    }
});
//--------------END OF PASSENGERS----------------//


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
      "check_failure": "WHAT?! You don't have a ticket? That's a fine for you!",
      "tutorial": "You can move the Hero with arrows or WASD. <br />Interact with E"
  }

});


// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, spr_trainplayer, SpriteAnimation, Keyboard')
      .fourway(3)
      .stopOnSolids()
      .bind('KeyDown', function() {
          if(this.isDown('E')) _interact(this);
          if(this.isDown('R')) clearDialog();
          if(this.isDown('O')) restartGame();
      })
      // These next lines define our four animations
      //  each call to .animate specifies:
      //  - the name of the animation
      //  - the x and y coordinates within the sprite
      //     map at which the animation set begins
      //  - the number of animation frames *in addition to* the first one
      .animate('PlayerMovingUp',    0, 3, 2)
      .animate('PlayerMovingRight', 0, 1, 2)
      .animate('PlayerMovingDown',  0, 0, 2)
      .animate('PlayerMovingLeft',  0, 2, 2);

    // Watch for a change of direction and switch animations accordingly
    var animation_speed = 3;
    this.bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('PlayerMovingRight', animation_speed, -1);
      } else if (data.x < 0) {
        this.animate('PlayerMovingLeft', animation_speed, -1);
      } else if (data.y > 0) {
        this.animate('PlayerMovingDown', animation_speed, -1);
      } else if (data.y < 0) {
        this.animate('PlayerMovingUp', animation_speed, -1);
      } else {
        this.stop();
      }
    });
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

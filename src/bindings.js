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
    },

    interaction: function(data) {

        if (this.passengers[data.x+1][data.y] === "unchecked" || this.passengers[data.x][data.y+1] === "unchecked" || this.passengers[data.x-1][data.y] === "unchecked" || this.passengers[data.x][data.y-1] === "unchecked") {

              Game.interaction_mode = true;
              console.log("Game mode when interaction starts: " + Game.interaction_mode);
              
              var interactions = '<p> <strong>[1]</strong> Check ticket <br /> <strong>[2]</strong> Ticket okay <br /> <strong>[3]</strong> Ticket not okay <br /><br /> <strong>[4]</strong> Quit interaction';
              var passenger_info = '<p> <strong> Name: </strong> Pertti Menttinen <br /> <strong> Hometown: </strong> Turku<br /> <strong> Occupation </strong> Autonkorjaaja';
              var genHTML = '<div id="wrapper" class="clear"> <div id="leftbar"><h3 class="lightbox">Passenger info</h3>' + passenger_info + '</div><div id="rightbar"><h3 class="lightbox"> Interact </h3>' + interactions + '</div></div>';

              $('body').bind('keypress', function(e) {
                
                if(Game.interaction_mode && e.which !== 101) {
                  var code = e.keyCode || e.which;
                  
                  console.log("Code is " + code);
                  if(code === 49) {
                    // Show ticket to user
                    alert('Pressed 1');
                  }  
                  else if(code === 50) {
                    // Mark that ticket is okay and count points accordingly
                    alert('Pressed 2');
                  }
                  else if(code === 51) {
                    // Ticket not valid, count points and mark that customer has been sold one
                    alert('Pressed 3');
                  }
                  else if(code === 52) {
                    // Closes the interaction
                    $('body').unbind('keypress');
                    $.colorbox.close();
                  }

                }
      });

              $.colorbox({html:genHTML});
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
            if(Game.points == parseInt(3)) Crafty.scene('Victory');
        }, 3000);

       // $('body').unbind('keypress');

    }
}

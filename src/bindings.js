var Bindings = {

    transition: function(data) {
        if (Train.templates[Game.current_car][data.x][data.y] === "Wall_grate") {
          this.unbind('Interactable', this.interactable);
          this.unbind('Transitionable', this.transitionable);
            if(data.x == Game.LEFT_X) {
              Game.last_scene = Game.current_car;
              var next_scene = Train.which_car("left");
              if(next_scene !== undefined) {
                  Game.current_car = next_scene;
                  Game.direction_from = 'right';
                  
                  Crafty.scene(next_scene);
                  
              }
            }
            else if(data.x == Game.RIGHT_X) {
                Game.last_scene = Game.current_car;
                var next_scene = Train.which_car("right");
                if(next_scene !== undefined) {
                    Game.current_car = next_scene;
                    Game.direction_from = 'left';
                    Crafty.scene(next_scene);
                }
            }
			Crafty.audio.play('door');
        }
    },

    interaction: function(data) {

      if(data.x == 3 && data.y == 3 && Game.current_car == 'bar' && Crafty.player.direction == 'up') { 
        document.getElementById('dialog').innerHTML = '<p><strong>Bartender: </strong> Hello sir, how are you? <br /> <strong>You: </strong>Very well sir, how\'s the business? <br /> <strong>Bartender: </strong> As usual, as usual </p>';
      }

        var interaction_coord = Game.calculate_interaction_coordinate(data.x, data.y, Crafty.player.direction);
        var passenger1 = Train.get_passenger(interaction_coord.x, interaction_coord.y);
        var passenger2 = Train.get_passenger(interaction_coord.x2, interaction_coord.y2);
      
        var passenger = null;

        if(passenger1 && passenger2) {
          /* TODO: Implement selection mode here */
          passenger = passenger1;          

        }
        
        if (passenger || (passenger1 !== null && passenger2 === null || passenger1 === null && passenger2 !== null)) {

          var passenger = passenger || (passenger1 || passenger2);

          Game.interaction_mode = true;
          
          
          var interactions = '<p> <strong>[1]</strong> Check ticket <br /> <strong>[2]</strong> Ticket okay <br /> <strong>[3]</strong> Ticket not okay <br /><br /> <strong>[4]</strong> Quit interaction';
          var passenger_info = '<p> <strong> Name: </strong>' + passenger.name + '<br /> <strong> Hometown: </strong> '+ passenger.home +'<br /> <strong> Occupation </strong> '+ passenger.occupation + '<br /><strong>Age: </strong>' + passenger.age + '<p id="ticketinfo"></p>';
          var genHTML = '<div id="wrapper" class="clear"> <div id="leftbar"><h3 class="lightbox">Passenger info</h3>' + passenger_info + '</div><div id="rightbar"><h3 class="lightbox"> Interact </h3>' + interactions + '</div></div>';
          $.colorbox({html:genHTML});

          $('body').bind('keypress', function(e) {
            
            if(Game.interaction_mode && e.which !== 101) {
              var code = e.keyCode || e.which;
              
              
              if(code === 49) {
                // Show ticket to user
                document.getElementById('ticketinfo').innerHTML = '<strong>Ticket group:</strong> ' + passenger.ticket.group + '<br /> <strong>Has ticket?</strong> ' + passenger.ticket.has;
              }  
              else if(code === 50) {
                // Mark that ticket is okay and count points accordingly
                
                document.getElementById('dialog').innerHTML = "<p><strong>You:</strong> Your ticket seems valid. Have a nice trip<br /> <strong>" + passenger.name +": </strong>Thanks! </p>";
                Game.add_points(1);
                if(!passenger.ticket.valid) {
                  Game.add_points(-2);
                  setTimeout(function() {
                    document.getElementById('dialog').innerHTML = "<p><strong>GAME: </strong> You lose points for your mistake.</p>";    
                  }, 1000);
                }    
                  
                
                passenger.checked = true;
              }
              else if(code === 51) {
                // Ticket not valid, count points and mark that customer has been sold one
                
                if(passenger.ticket.valid === false) {
                  document.getElementById('dialog').innerHTML = "<p><strong>You:</strong> You need to have a ticket to travel.<br /> I will have to fine you for this. <br /><strong>" + passenger.name +": </strong>Oh shit </p>";  
                  Game.add_points(1);
                }
                else {
                 document.getElementById('dialog').innerHTML = "<p><strong>You:</strong> You need to have a ticket to travel.<br /> I will have to fine you for this. <br /><strong>" + passenger.name +": </strong>What are you doing? I have a completely valid ticket. </p>";
                 console.log("Ticket was valid");
                 setTimeout(function() { 
                  document.getElementById('dialog').innerHTML = "<p><strong>" + passenger.name + ": </strong> I will report this to your supervisor. <br /> <strong>GAME: </strong> You lose points for your mistake.</p>";    
                 }, 2000);
                }                
                
                passenger.checked = true;
              }
              else if(code === 52) {
                // Closes the interaction
                $('body').unbind('keypress');
                $.colorbox.close();
              }

            }
          });

              
          passenger.checked = true;
          


          //interact(data.player);
        }

       

    }


}



/* Data structure for passenger */

function Passenger(name, home, occupation, in_train) {
    this.x = null;
    this.y = null;
    this.does_have_ticket = function() { return (Math.random() < 0.95) ? true : false;};
    this.board = function(x, y) {
        this.is_in_train = true;
        this.x = x;
        this.y = y;
    }
    this.name = name;
    this.home = home;
    this.occupation = occupation;
    this.hasTicket = this.does_have_ticket();
    this.is_in_train = in_train;
}




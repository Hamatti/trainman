/* Data structure for passenger */

function Passenger(name, home, occupation, age, sex) {

    /* Store information of passengers position */
    this.car;
    this.x;
    this.y;
    
    
    this.does_have_ticket = function() { return (Math.random() < 0.85) ? true : false;};

    /* Add passenger to a position and set visible on train */
    this.board = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.set_position = function(x,y,car) {
        this.x = x;
        this.y = y;
        this.car = car;

    }

    /* Basic properties */
    this.age = age;
    this.name = name;
    this.home = home;
    this.sex = sex;
    this.occupation = occupation;

    /* Route info */
    this.from;
    this.to;

    /* Ticket info */
    this.checked = false;
    
    this._group = (this.age <= 15) ? ((Math.random() < 0.95) ? 'children' : 'adult') : ((Math.random() < 0.95) ? 'adult' : 'children');
    this._hasticket = this.does_have_ticket()
    this._valid = (this._group == 'children' && age <= 15 && this._hasticket) || (this._hasticket);
    this.ticket = {
        group: this._group,
        has: this._hasticket,
        valid: this._valid
    }

    this.direction;

    /* Define age group based on age. This is used for right sprite */
    this.age_group;

    if(this.age >= 10 && this.age <= 15) this.age_group = "child";
    else if(this.age >15 && this.age <= 25) this.age_group = "teenager";
    else if (this.age > 25 && this.age <= 50) this.age_group = "adult";
    else this.age_group = "senior";
    this.sprite = function() { return this.age_group + "_" + this.sex.toLowerCase() + "_" + this.direction; };

}


function create_passenger(sex) {
    passenger_info = $.parseJSON(passenger_creator.new_passenger(sex));
    var passenger = new Passenger(passenger_info.name, passenger_info.home, passenger_info.occupation, passenger_info.age, sex, true);
    return passenger;
}

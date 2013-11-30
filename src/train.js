var Train = {

	chairs: {'bar': [], 'engine': [], 'passenger': []},
	passenger_in_cars: {'bar': [], 'engine': [], 'passenger': []},
	order_of_cars: {'engine': { "left": "passenger", "right": undefined }, "passenger": { "left": "bar", "right": "engine" }, "bar": { "left": undefined, "right": "passenger" }},
	which_car: function(dir) {
		return this.order_of_cars[Game.current_car][dir];
	},

	set_passengers: function(n) {
		var passenger_d, sex, cars, random_car_index, random_car;
		/* Create n passengers and randomly put them on chairs in the train */
		for (var i = 0; i < n; i++) {
			/* 50% change for male or female */
			sex = (Math.random() < 0.5 ? 'M' : 'F');
			passenger = create_passenger(sex);

			/* Car names */
			cars = Object.keys(this.chairs);
			while(true) {
				/* Get random car */
				random_car_index = cars[Math.floor(Math.random() * cars.length)];
				random_car = this.chairs[random_car_index];
				
				/* If there are empty chairs, pick up a chair */
				if(this.passenger_in_cars[random_car_index].length < random_car.length) {
					
					var index = Math.floor(Math.random() * random_car.length);
					var chair = random_car[index];
					/* If the chair is free, put passenger into that chair */
					if(!chair.occupied) {
						chair.occupied = true;
						this.passenger_in_cars[random_car_index].push(passenger);
						passenger.set_position(chair.coordX, chair.coordY, random_car_index);
						break;	
					}
					
				}
			}
			
		};
	}

}



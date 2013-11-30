var Train = {

	chairs: {
		'bar': [],
		'engine': [],
		'passenger': []
	},
	passenger_in_cars: {
		'bar': [],
		'engine': [],
		'passenger': []
	},
	templates: {},
	order_of_cars: {
		'engine': {
			"left": "passenger",
			"right": undefined
		},
		"passenger": {
			"left": "bar",
			"right": "engine"
		},
		"bar": {
			"left": undefined,
			"right": "passenger"
		}
	},

	route: ['Turku', 'Salo', 'Espoo', 'Helsinki'],

	which_car: function(dir) {
		return this.order_of_cars[Game.current_car][dir];
	},

	set_passengers: function(n) {
		var passenger_d, sex, cars, random_car_index, random_car; /* Create n passengers and randomly put them on chairs in the train */
		for (var i = 0; i < n; i++) { /* 50% change for male or female */
			sex = (Math.random() < 0.5 ? 'M' : 'F');
			passenger = create_passenger(sex);

			/* Car names */
			cars = Object.keys(this.chairs);
			while (true) { /* Get random car */
				random_car_index = cars[Math.floor(Math.random() * cars.length)];
				random_car = this.chairs[random_car_index];

				var from, to;
				from_index = Math.floor(Math.random() * (this.route.length - 1));
				to_index = -1;
				while (to_index <= from_index) {
					to_index = Math.floor(Math.random() * this.route.length);
				}

				passenger.from = this.route[from_index];
				passenger.to = this.route[to_index];


				/* If there are empty chairs, pick up a chair */
				if (this.passenger_in_cars[random_car_index].length < random_car.length) {

					var index = Math.floor(Math.random() * random_car.length);
					var chair = random_car[index];
					var sprite_name = chair.sprite;
					if (sprite_name.contains('Bar')) passenger.direction = (Math.random() < 0.5) ? 'left' : 'right';
					else passenger.direction = sprite_name.split('_')[2] /* If the chair is free, put passenger into that chair */
					if (!chair.occupied) {

						chair.occupied = true;
						this.passenger_in_cars[random_car_index].push(passenger);
						passenger.set_position(chair.coordX, chair.coordY, random_car_index);
						break;
					}
				}
			}
		}
	},

	get_passenger: function(x, y) {
		for (var i = 0; i < this.passenger_in_cars[Game.current_car].length; i++) {
			var possible = this.passenger_in_cars[Game.current_car][i];
			if (possible.x == x && possible.y == y) return possible;
		}
		return null;
	},

	create_templates: function() {
		this.templates['bar'] = get_car('bar');
		this.templates['engine'] = get_car('engine');
		this.templates['passenger'] = get_car('passenger');
	}
}
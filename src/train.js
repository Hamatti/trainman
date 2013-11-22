var Train = {

	chairs: {'bar': [], 'engine': [], 'passenger': []},
	passenger_in_cars: [],
	order_of_cars: {'engine': { "left": "passenger", "right": undefined }, "passenger": { "left": "bar", "right": "engine" }, "bar": { "left": undefined, "right": "passenger" }},
	which_car: function(dir) {
		return this.order_of_cars[Game.current_car][dir];
	}

}



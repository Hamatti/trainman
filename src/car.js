//----------Car creation----------//
function get_car(car_type) {
	var wall_left = ['Wall_middle_right',
						'Wall_middle_right',
						'Wall_rightborders',
						'Wall_grate',
						'Wall_grate',
						'Wall_middle_right',
						'Wall_middle_right'];
	var wall_right = ['Wall_middle_left',
						'Wall_middle_left',
						'Wall_leftborders',
						'Wall_grate',
						'Wall_grate',
						'Wall_middle_left',
						'Wall_middle_left'];
	if (car_type=="bar") {
		var car_part1 = ['Wall_boozes',
						'',
						'Bar_counter',
						'','',
						'Bar_chair',
						'Bar_chair'];
		var car_part2 = ['Wall_boozes',
						'',
						'Bar_counter',
						'','',
						'Bar_table',
						'Bar_table'];
		var car_part3 = ['Wall_jallu',
						'','','','',
						'Bar_table',
						'Bar_table'];
		var car_part4 = ['Wall_martini',
						'','','','',
						'Bar_chair',
						'Bar_chair'];
		var car_part5 = ['Wall_window',
						'Bar_chair',
						'Bar_chair',
						'','',
						'Bar_chair',
						'Bar_chair'];
		var car_part6 = ['Wall_borderless',
						'Bar_table',
						'Bar_table',
						'','',
						'Bar_table',
						'Bar_table'];

		var car = [wall_left, car_part1, car_part2,
				car_part1, car_part1, car_part3,
				car_part4, car_part5, car_part6,
				car_part5, car_part5, car_part6,
				car_part5, wall_right];
		return car;
	}
	if (car_type=='passenger') {
		var p_part1 = ['Wall_window',
						'Passenger_chair_right',
						'Passenger_chair_right',
						'','',
						'Passenger_chair_right',
						'Passenger_chair_right'];
		var p_part2 = p_part1.slice(0);
		p_part2[0] = 'Wall_borderless';
		var p_part3 = p_part1.slice(0);
		p_part3[0]  = 'Wall_vr';
		var p_part3 = ['Wall_vr',
						'Passenger_chair_right',
						'Passenger_chair_right',
						'','',
						'Passenger_chair_right',
						'Passenger_chair_right'];
		var p_part4 = ['Wall_window',
						'Passenger_table',
						'Passenger_table',
						'','',
						'Passenger_table',
						'Passenger_table'];
		var p_part5 = ['Wall_vr',
						'Passenger_chair_left',
						'Passenger_chair_left',
						'','',
						'Passenger_chair_left',
						'Passenger_chair_left'];
		var p_part6 = p_part5.slice(0);
		p_part6[0] = 'Wall_borderless';
		var p_part7 = p_part5.slice(0);
		p_part7[0] = 'Wall_window';

		var passenger_car = [wall_left, p_part1, p_part2,
						p_part3, p_part3, p_part4,
						p_part5, p_part3, p_part4,
						p_part5, p_part5, p_part6,
						p_part7, wall_right];
		return passenger_car;
	}
	if (car_type == 'engine') {
		var wall_middle = ['Wall_middle_both',
							'Wall_middle_both',
							'Wall_bothborders',
							'','',
							'Wall_middle_both',
							'Wall_middle_both'];
		var e_wall_right = ['Wall_middle_left',
							'Wall_middle_left',
							'Wall_middle_left',
							'Wall_middle_left',
							'Wall_middle_left',
							'Wall_middle_left',
							'Wall_middle_left'];
		var e_part1 = ['Wall_window',
						'Passenger_chair_right',
						'Passenger_chair_right',
						'','',
						'Passenger_chair_right',
						'Passenger_chair_right'];
		var e_part2 = e_part1.slice(0);
		e_part2[0] = 'Wall_borderless';
		var e_empty1 = ['Wall_window','','','','','',''];
		var e_empty2 = ['Wall_borderless','','','','','',''];

		var engine = [wall_left, e_part1, e_part2, e_part1,
					e_part2, e_part1, e_part2, e_part1,
					wall_middle, e_empty1, e_empty2,
					e_empty1, e_empty2, e_wall_right];
		return engine;
	}
}


function fill_car(template) {
	for ( var x = 0; x < template.length; x++) {
		for (var y = 0; y < template[x].length; y++) {
			if (y == 3 || y == 4) {
				Crafty.e('Floor_dark').at(x,y);
                if(template[x][y] !== '')
    				Crafty.e(template[x][y]).at(x,y);
			}
			else {
				Crafty.e('Floor_light').at(x,y);
                if(template[x][y] !== '')
    				Crafty.e(template[x][y]).at(x,y);
			}
		}
	}
}

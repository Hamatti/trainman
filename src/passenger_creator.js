var passenger_creator = {
    new_passenger: function(sex) {
        var passenger;
        $.ajax({
            type: 'POST',
            url: 'src/php-backend/new_passenger.php',
            data: {
                sex: sex
            },
            async: false,
            success: function(data) {
                passenger = data;
            }
        });
        return passenger;
    }
}
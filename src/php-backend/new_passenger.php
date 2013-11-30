<?php

    // All data for passenger generation is in this folder
    $DATADIR = '../../assets/passengerdata/';

    // Sex from POST request: if no valid, use male
    $wanted_sex = ($_POST['sex'] == 'M' || $_POST['sex'] == 'F') ? $_POST['sex'] : 'M';

    // Read data in to arrays
    $male_names = file($DATADIR . 'miesten_etunimet.txt');
    $female_names = file($DATADIR . 'naisten_etunimet.txt');
    $surnames = file($DATADIR . 'sukunimet.txt');
    $hometowns = file($DATADIR . 'towns.txt');
    $occupations = file($DATADIR . 'ammatit.txt');

    // Define which first name list to use
    $first_names;
    if($wanted_sex == 'M') $first_names = $male_names;
    else $first_names = $female_names;


    // Randomly select data attributs
    $first_name = trim($first_names[array_rand($first_names)]);
    $surname = trim($surnames[array_rand($surnames)]);
    $name = $first_name . ' ' . $surname;
    $occupation = trim($occupations[array_rand($occupations)]);
    $hometown = trim($hometowns[array_rand($hometowns)]);
    $age = rand(10,70);

    // Return as JSON string
    echo json_encode(array("name"=> $name,"home"=> $hometown, "occupation"=>$occupation, "age"=>$age));
?>

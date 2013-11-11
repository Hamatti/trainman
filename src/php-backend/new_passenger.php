<?
    $DATADIR = '../../assets/passengerdata/';
    $wanted_sex = ($_POST['sex'] == 'M' || $_POST['sex'] == 'F') ? $_POST['sex'] : 'M';
    $male_names = file($DATADIR . 'miesten_etunimet.txt');
    $female_names = file($DATADIR . 'naisten_etunimet.txt');
    $surnames = file($DATADIR . 'sukunimet.txt');
    $hometowns = file($DATADIR . 'towns.txt');
    $occupations = file($DATADIR . 'ammatit.txt');

    $first_names;
    if($wanted_sex == 'M') $first_names = $male_names;
    else $first_names = $female_names;

    $first_name =$first_names[array_rand($first_names)];
    $first_name = trim($first_name);
    $surname = $surnames[array_rand($surnames)];
    $surname = trim($surname);
    $name = $first_name . ' ' . $surname;
    $occupation = $occupations[array_rand($occupations)];
    $occupation = trim($occupation);
    $hometown = trim($hometowns[array_rand($hometowns)]);
    echo json_encode(array("name"=> $name,"home"=> $hometown, "occupation"=>$occupation));
?>

<?php global $QS;

try {
    $QS = new PDO('mysql:host=localhost;dbname=mrbs', 'root', 'root');
    $QS->query('SET NAMES "utf8"');
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();
}
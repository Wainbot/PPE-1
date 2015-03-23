<?php

// REQUIRES
require 'vendor/autoload.php';
require 'db-connect.php';
require('vendor/fpdf.php');

// INCLUDES
include_once('Modeles/UsersModele.php');
include_once('Modeles/MaterialsModele.php');
include_once('Modeles/RoomsModele.php');
include_once('Modeles/LocationsModele.php');

// DIVERS
session_start();
$app = new \Slim\Slim();
$app->response()->header('Content-Type', 'application/json');

// ROUTES UTILISATEURS
$app->get('/users', function() use ($app) {
    echo json_encode(UsersModele::getAllUsers());
});
$app->get('/users/:id', function($id) use ($app) {
    echo json_encode(UsersModele::getUserById($id));
});
$app->get('/users/modify/:id/:infos', function($id, $infos) use ($app) {
    if (!empty($id) && !empty($infos)) {
        UsersModele::setUser($id, json_decode($infos));
    }
});
$app->get('/users/delete/:id', function($id) use ($app) {
    if (!empty($id)) {
        UsersModele::deleteUser($id);
    }
});
$app->get('/users/new/:user', function($user) use ($app) {
    if (!empty($user)) {
        $user             = json_decode($user);
        $user->password   = sha1($user->password);
        UsersModele::insertUser($user);
    }
});
$app->get('/users/:email/:password', function($email, $password) use ($app) {
    foreach (UsersModele::getAllUsers() as $user) {
        if ($email == $user['email'] && sha1($password) === $user['password']) {
            $_SESSION['user'] = UsersModele::getUserById($user['id']);
            echo json_encode($_SESSION['user']);
        }
    }
});
$app->get('/currentUser/', function() use ($app) {
    if (isset($_SESSION['user'])) {
        echo json_encode($_SESSION['user']);
    }
});
$app->get('/decoUser/', function() use ($app) {
    session_destroy();
});

// ROUTES LEVELS
$app->get('/level/:id', function($id) use ($app) {
    echo json_encode(UsersModele::getLevelById($id));
});
$app->get('/levels', function() use ($app) {
    echo json_encode(UsersModele::getLevels());
});

// ROUTES MENUS
$app->get('/menus/:level', function($level) use ($app) {
    echo json_encode(UsersModele::getMenusByLevel($level));
});

// ROUTES PANIER
$app->get('/panier/:panier', function($panier) use ($app) {
    $_SESSION['panier'][] = json_decode($panier);
});
$app->get('/panier', function() use ($app) {
    if (isset($_SESSION['panier'])) {
        echo json_encode($_SESSION['panier']);
    }
});
$app->get('/panier/delete/:id', function($id) use ($app) {
    foreach ($_SESSION['panier'] as $key => $value) {
        if ($value->id == $id) {
            array_splice($_SESSION['panier'], $key, 1);
        }
    }
});
$app->get('/commande/clear', function() use ($app) {
    unset($_SESSION['panier']);
});
$app->get('/commande/validate', function() use ($app) {
    $hauteur = 7;
    $width   = 40;
    $i       = 1;

    $app->response()->header('Content-Type', 'application/pdf');
    $pdf = new FPDF();
    $pdf->AddPage();

    // HEADER
    $pdf->SetFont('Arial', 'B', 18);
    $pdf->SetTextColor(44, 62, 80);
    $pdf->Text(75, 10, 'BON DE RESERVATION');
    $pdf->Image('vendor/img/m2l.png', 15, 20, 70, 35);
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->SetXY(110, 22);
    $pdf->Cell(90, 30, '', 1);
    $pdf->SetXY(115, 25);
    $pdf->Cell(15, 10, 'Nom :', 0, 0, 'R');
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(65, 10, $_SESSION['user'][0]['name'], 0, 0, 'L');
    $pdf->SetXY(115, 32);
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->Cell(15, 10, 'Email :', 0, 0, 'R');
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(65, 10, $_SESSION['user'][0]['email'], 0, 0, 'L');
    $pdf->SetXY(115, 42);
    $pdf->Cell(80, 10, 'Le ' . date('j/m/Y'), 0, 0, 'R');

    // TABLEAU
    $pdf->SetXY(5, 80);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFillColor(44, 62, 80);
    $pdf->Cell($width, $hauteur + 5, 'Nom', 1, 0, 'C', true);
    $pdf->Cell($width + ($width / 2), $hauteur + 5, 'Description', 1, 0, 'C', true);
    $pdf->Cell($width / 2, $hauteur + 5, "Quantite", 1, 0, 'C', true);
    $pdf->Cell($width, $hauteur + 5, "Etat", 1, 0, 'C', true);
    $pdf->Cell($width, $hauteur + 5, "Periode de pret", 1, 1, 'C', true);
    $pdf->SetTextColor(44, 62, 80);

    foreach($_SESSION['panier'] as $item) {
        $i++;
        $pdf->SetFont('Arial', '', 10);
        $pdf->SetX(5);
        $pdf->Cell($width, $hauteur, str_replace(array('à', 'â'), 'a', str_replace(array('é', 'è', 'ê'), 'e', $item->name)), 1, 0, 'C');
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell($width + ($width / 2), $hauteur, (!empty($item->description)) ? $item->description : '-', 1, 0, 'C');
        $pdf->SetFont('Arial', '', 10);
        $pdf->Cell($width / 2, $hauteur, $item->quantity, 1, 0, 'C');
        $pdf->Cell($width, $hauteur, (!empty($item->state)) ? $item->state : '-', 1, 0, 'C');
        $pdf->SetFont('Arial', '', 8);
        $pdf->Cell($width, $hauteur, 'Du ' . $item->date_begin . ' au ' . $item->date_back, 1, 1, 'C');
    }

    $pdf->SetXY(140, 95 + ($i * $hauteur));
    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(55, 5, 'Signature : ', 0, 0, 'L');
    $pdf->Image('vendor/img/signature.png', 140, 100 + ($i * $hauteur), 50, 20);
    $pdf->Output('bon-de-reservation-'. date('Y-m-j') .'.pdf', 'D');
//    $pdf->Output();
});

// ROUTES SALLES
$app->get('/rooms', function() use ($app) {
    echo json_encode(RoomsModele::getAllRooms());
});
$app->get('/location/rooms', function() use ($app) {
    echo json_encode(RoomsModele::getRoomsLocation());
});
$app->get('/notlocation/rooms', function() use ($app) {
    echo json_encode(RoomsModele::getRoomsNotLocation());
});
$app->get('/rooms/:id', function($id) use ($app) {
    echo json_encode(RoomsModele::getRoomById($id));
});
$app->get('/rooms/:userId', function($userId) use ($app) {
    echo json_encode(RoomsModele::getRoomsLocationByUser($userId));
});

// ROUTES MATERIELS
$app->get('/materials', function() use ($app) {
    echo json_encode(MaterialsModele::getAllMaterials());
});
$app->get('/location/materials', function() use ($app) {
    echo json_encode(MaterialsModele::getMaterialsLocation());
});
$app->get('/notlocation/materials', function() use ($app) {
    echo json_encode(MaterialsModele::getMaterialsNotLocation());
});
$app->get('/materials/:id', function($id) use ($app) {
    echo json_encode(MaterialsModele::getMaterialById($id));
});
$app->get('/materials/:userId', function($userId) use ($app) {
    echo json_encode(RoomsModele::getRoomsLocationByUser($userId));
});

// ROUTES LOCATIONS
$app->get('/locations', function() use ($app) {
    echo json_encode(LocationsModele::getAllLocations());
});
$app->get('/locations/:id', function($id) use ($app) {
    echo json_encode(LocationsModele::getLocationsByUser($id));
});
$app->get('/locations/add/:item', function($item) use ($app) {
    if (!empty($item)) {
        LocationsModele::insertLocation(json_decode($item));
    }
});

// ON LANCE L'APPLICATION
$app->run();
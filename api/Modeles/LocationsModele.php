<?php

/**
 * Class LocationsModele
 */
class LocationsModele
{
    /**
     * Table visée
     *
     * @var string
     */
    private static $table = 'mrbs_location';

    /**
     * Retourne toutes les locations
     *
     * @return array
     */
    public static function getAllLocations()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM mrbs_materials as M LEFT JOIN " . self::$table . " as L ON (M.id = L.ref_id AND L.type_loc = 'MA') WHERE L.ref_id IS NOT NULL") as $row) {
            $result[] = $row;
        }

        foreach($QS->query("SELECT * FROM mrbs_room as R LEFT JOIN " . self::$table . " as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE L.ref_id IS NOT NULL") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Retourne les locations par utilisateur
     *
     * @param $id
     * @return array
     */
    public static function getLocationsByUser($id)
    {
        global $QS;

        foreach($QS->query("SELECT * FROM mrbs_materials as M LEFT JOIN " . self::$table . " as L ON (M.id = L.ref_id AND L.type_loc = 'MA') WHERE L.ref_id IS NOT NULL AND user_id = $id") as $row) {
            $result[] = $row;
        }

        foreach($QS->query("SELECT * FROM mrbs_room as R LEFT JOIN " . self::$table . " as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE L.ref_id IS NOT NULL AND user_id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Ajoute la location passée en paramètre dans la base de données
     *
     * @param $item
     */
    public static function insertLocation($item)
    {
        global $QS;

        $QS->query("INSERT INTO " . self::$table . " (ref_id, user_id, state, date_begin, date_back, type_loc, quantity) VALUES ($item->ref_id, $item->user_id, '$item->state', '$item->date_begin', '$item->date_back', '$item->type_loc', $item->quantity)");

        if ($item->type_loc == 'MA') {
            $QS->query("UPDATE mrbs_materials SET quantity_restante = " . ($item->quantity_restante - $item->quantity . " WHERE id = $item->id"));
        }

    }
}


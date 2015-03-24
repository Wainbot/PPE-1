<?php

/**
 * Class RoomsModele
 */
class RoomsModele
{
    /**
     * Table visée
     *
     * @var string
     */
    private static $table = 'mrbs_room';

    /**
     * Retourne toutes les salles
     *
     * @return array
     */
    public static function getAllRooms()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO')") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Retourne toutes les salles louées
     *
     * @return array
     */
    public static function getRoomsLocation()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE L.ref_id IS NOT NULL") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Retourne toutes les salles non louées
     *
     * @return array
     */
    public static function getRoomsNotLocation()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE L.ref_id IS NULL") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Retourne la salle correspondant à l'id passé en paramètre
     *
     * @param $id
     * @return array
     */
    public static function getRoomById($id)
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE R.id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Retourne toutes les salles louées par l'id de l'utilisateur passé en paramètre
     *
     * @param $id
     * @return array
     */
    public static function getRoomsLocationByUser($id)
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE user_id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }
}


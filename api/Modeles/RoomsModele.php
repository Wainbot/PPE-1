<?php

class RoomsModele
{
    private static $table = 'mrbs_room';

    public static function getAllRooms()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO')") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getRoomsLocation()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE L.ref_id IS NOT NULL") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getRoomsNotLocation()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE L.ref_id IS NULL") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getRoomById($id)
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE R.id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getRoomsLocationByUser($id)
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as R LEFT JOIN mrbs_location as L ON (R.id = L.ref_id AND L.type_loc = 'RO') WHERE user_id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }
}


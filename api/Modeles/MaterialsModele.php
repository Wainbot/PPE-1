<?php

class MaterialsModele
{
    private static $table = 'mrbs_materials';

    public static function getAllMaterials()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as M LEFT JOIN mrbs_location as L ON (M.id = L.ref_id AND L.type_loc = 'MA')") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getMaterialsLocation()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as M LEFT JOIN mrbs_location as L ON (M.id = L.ref_id AND L.type_loc = 'MA') WHERE quantity_restante = 0") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getMaterialsNotLocation()
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as M LEFT JOIN mrbs_location as L ON (M.id = L.ref_id AND L.type_loc = 'MA') WHERE quantity_restante > 0 GROUP BY M.id") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getMaterialById($id)
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as M LEFT JOIN mrbs_location as L ON (M.id = L.ref_id AND L.type_loc = 'MA') WHERE M.id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getMaterialsLocationByUser($id)
    {
        global $QS;

        foreach($QS->query("SELECT * FROM " . self::$table . " as M LEFT JOIN mrbs_location as L ON (M.id = L.ref_id AND L.type_loc = 'MA') WHERE user_id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }
}


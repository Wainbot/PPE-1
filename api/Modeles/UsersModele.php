<?php

class UsersModele
{
    private static $table = 'mrbs_users';

    public static function getAllUsers()
    {
        global $QS;

        foreach ($QS->query("SELECT * FROM " . self::$table) as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getUserById($id)
    {
        global $QS;

        foreach ($QS->query("SELECT * FROM " . self::$table . " WHERE id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function getMenusByLevel($id)
    {
        global $QS;

        $result = array();
        foreach ($QS->query("SELECT menus FROM mrbs_levels WHERE id = $id") as $row) {
            foreach (explode(',', $row['menus']) as $menu) {
                foreach ($QS->query("SELECT * FROM mrbs_menus WHERE id = $menu") as $res) {
                    $result[] = array(
                        'label' => $res['label'],
                        'icone' => $res['icone'],
                        'href'  => $res['href'],
                        'color' => $res['color']
                    );
                }
            }
        }

        return $result;
    }

    public static function getLevelById($id)
    {
        global $QS;

        foreach ($QS->query("SELECT * FROM mrbs_levels WHERE id = $id") as $row) {
            $result = $row;
        }

        return $result;
    }

    public static function getLevels()
    {
        global $QS;

        foreach ($QS->query("SELECT * FROM mrbs_levels") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    public static function setUser($id, $infos)
    {
        global $QS;

        $QS->query("UPDATE mrbs_users SET name = '$infos->name', email = '$infos->email', level = $infos->level WHERE id = $id");
    }

    public static function deleteUser($id)
    {
        global $QS;

        $QS->query("DELETE FROM mrbs_users WHERE id = $id");
    }

    public static function insertUser($user)
    {
        global $QS;

        $QS->query("INSERT INTO mrbs_users (level, name, password, email) VALUES ('$user->level', '$user->name', '$user->password', '$user->email')");
    }
}


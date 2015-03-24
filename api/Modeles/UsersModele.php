<?php

/**
 * Class UsersModele
 */
class UsersModele
{
    /**
     * Table visée
     *
     * @var string
     */
    private static $table = 'mrbs_users';

    /**
     * Retourne tous les utilisateurs
     *
     * @return array
     */
    public static function getAllUsers()
    {
        global $QS;

        foreach ($QS->query("SELECT * FROM " . self::$table) as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Retourne l'utilisateur correspondant à l'id passé en paramètre
     *
     * @param $id
     * @return array
     */
    public static function getUserById($id)
    {
        global $QS;

        foreach ($QS->query("SELECT * FROM " . self::$table . " WHERE id = $id") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Retourne tous les menus correspondants au niveau de droit passé en paramètre
     *
     * @param $id
     * @return array
     */
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

    /**
     * Retourne le niveau de droit correspondant à l'id passé en paramètre
     *
     * @param $id
     * @return mixed
     */
    public static function getLevelById($id)
    {
        global $QS;

        foreach ($QS->query("SELECT * FROM mrbs_levels WHERE id = $id") as $row) {
            $result = $row;
        }

        return $result;
    }

    /**
     * Retourne tous les niveaux de droit
     *
     * @return array
     */
    public static function getLevels()
    {
        global $QS;

        foreach ($QS->query("SELECT * FROM mrbs_levels") as $row) {
            $result[] = $row;
        }

        return $result;
    }

    /**
     * Modifie les informations d'un utilisateur par son id et par les infos le correspondant passés en paramètre
     *
     * @param $id
     * @param $infos
     */
    public static function setUser($id, $infos)
    {
        global $QS;

        $QS->query("UPDATE mrbs_users SET name = '$infos->name', email = '$infos->email', level = $infos->level WHERE id = $id");
    }

    /**
     * Supprime l'utilisateur correspondant à l'id passé en paramètre
     *
     * @param $id
     */
    public static function deleteUser($id)
    {
        global $QS;

        $QS->query("DELETE FROM mrbs_users WHERE id = $id");
    }

    /**
     * Ajoute l'utilisateur passé en paramètre dans la base de données
     *
     * @param $user
     */
    public static function insertUser($user)
    {
        global $QS;

        $QS->query("INSERT INTO mrbs_users (level, name, password, email) VALUES ('$user->level', '$user->name', '$user->password', '$user->email')");
    }
}


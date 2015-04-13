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
     * Ajoute l'utilisateur passé en paramètre dans la base de données et envoi la confirmation d'inscription
     *
     * @param $user
     */
    public static function insertUser($user)
    {
        global $QS;

        $QS->query("INSERT INTO mrbs_users (level, name, password, email) VALUES ('$user->level', '$user->name', 'sha1($user->password)', '$user->email')");

        $passage_ligne  = "\n";
        $mail           = $user->email;
        $message_html   = "Bienvenue chez la M2L !<br /><br />";
        $message_html  .= "Votre nom : <b>$user->name</b><br />";
        $message_html  .= "Votre adresse email : <b>$user->email</b><br />";
        $message_html  .= "Votre mot de passe : <b>$user->password</b><br />";
        $message_html  .= "<br /><br />Pour plus de renseignements, rendez vous sur la page <a href='http://ppe.jeremyfroment.fr/#/contact'>contact</a> de notre site.";
        $boundary       = "-----=" . md5(rand());
        $sujet          = "Réinitialisation de mot de passe";
        $header         = "From: \"M2L\"<M2L>" . $passage_ligne;
        $header        .= "MIME-Version: 1.0" . $passage_ligne;
        $header        .= "Content-Type: multipart/alternative;" . $passage_ligne . " boundary=\"$boundary\"" . $passage_ligne;
        $message        = $passage_ligne . "--" . $boundary . $passage_ligne;
        $message       .= "Content-Type: text/html; charset=\"UTF-8\"" . $passage_ligne;
        $message       .= "Content-Transfer-Encoding: 8bit" . $passage_ligne;
        $message       .= $passage_ligne . $message_html . $passage_ligne;
        $message       .= $passage_ligne . "--" . $boundary . "--" . $passage_ligne;
        $message       .= $passage_ligne . "--" . $boundary . "--" . $passage_ligne;

        mail($mail, $sujet, $message, $header);
    }
}


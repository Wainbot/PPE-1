-- phpMyAdmin SQL Dump
-- version 4.1.9
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Jeu 26 Mars 2015 à 14:23
-- Version du serveur :  5.5.34
-- Version de PHP :  5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `mrbs`
--

-- --------------------------------------------------------

--
-- Structure de la table `mrbs_levels`
--

CREATE TABLE `mrbs_levels` (
  `id` int(11) NOT NULL,
  `label` varchar(30) NOT NULL,
  `menus` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `mrbs_levels`
--

INSERT INTO `mrbs_levels` (`id`, `label`, `menus`) VALUES
(0, 'Administrateur', '1,2,3,4,5'),
(1, 'Employé', '1,2,3,4,5'),
(2, 'Client', '1,2,4,5');

-- --------------------------------------------------------

--
-- Structure de la table `mrbs_location`
--

CREATE TABLE `mrbs_location` (
  `id_loc` int(10) NOT NULL AUTO_INCREMENT,
  `ref_id` int(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` varchar(20) NOT NULL,
  `date_begin` date NOT NULL,
  `date_back` date NOT NULL,
  `type_loc` varchar(20) NOT NULL,
  `quantity` int(10) NOT NULL,
  PRIMARY KEY (`id_loc`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Contenu de la table `mrbs_location`
--

INSERT INTO `mrbs_location` (`id_loc`, `ref_id`, `user_id`, `state`, `date_begin`, `date_back`, `type_loc`, `quantity`) VALUES
(7, 1, 113, 'BON', '2015-03-18', '2015-03-31', 'MA', 12),
(8, 2, 113, 'BON', '2015-03-25', '2015-03-31', 'RO', 1),
(9, 1, 113, 'BON', '2015-03-19', '2015-03-31', 'MA', 7),
(10, 11, 113, 'BON', '2015-03-30', '2015-03-31', 'RO', 1),
(11, 1, 118, 'BON', '2015-03-19', '2015-03-29', 'MA', 8),
(12, 1, 118, 'BON', '2015-03-19', '2015-03-30', 'RO', 1),
(13, 4, 113, 'BON', '2015-03-25', '2015-03-30', 'RO', 1),
(14, 1, 113, 'BON', '2015-03-20', '2015-03-31', 'MA', 10),
(15, 3, 113, 'BON', '2015-03-20', '2015-03-30', 'RO', 1);

-- --------------------------------------------------------

--
-- Structure de la table `mrbs_materials`
--

CREATE TABLE `mrbs_materials` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(40) NOT NULL,
  `quantity_restante` int(10) NOT NULL,
  `quantity_max` int(10) NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'MA',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `mrbs_materials`
--

INSERT INTO `mrbs_materials` (`id`, `name`, `description`, `quantity_restante`, `quantity_max`, `type`) VALUES
(1, 'Ballon de football', 'ballon de la ligue des champions', 43, 80, 'MA'),
(2, 'Ballon de basket', '', 50, 50, 'MA'),
(3, 'Raquette de tennis', '', 50, 50, 'MA'),
(4, 'Balle de tennis', '', 300, 300, 'MA');

-- --------------------------------------------------------

--
-- Structure de la table `mrbs_menus`
--

CREATE TABLE `mrbs_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(30) NOT NULL,
  `icone` varchar(30) NOT NULL,
  `href` varchar(30) NOT NULL,
  `color` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `mrbs_menus`
--

INSERT INTO `mrbs_menus` (`id`, `label`, `icone`, `href`, `color`) VALUES
(1, 'Tableau de bord', 'dashboard', 'app.dashboard', 'white'),
(2, 'Agenda', 'calendar', 'app.calendar', 'primary'),
(3, 'Utilisateurs', 'users', 'app.table.users', 'success'),
(4, 'Matériels', 'cubes', 'app.materiels', 'info'),
(5, 'Salles', 'building', 'app.salles', 'warning');

-- --------------------------------------------------------

--
-- Structure de la table `mrbs_room`
--

CREATE TABLE `mrbs_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL DEFAULT '',
  `description` varchar(60) DEFAULT NULL,
  `capacity` int(11) NOT NULL DEFAULT '0',
  `type` varchar(20) NOT NULL DEFAULT 'RO',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Contenu de la table `mrbs_room`
--

INSERT INTO `mrbs_room` (`id`, `name`, `description`, `capacity`, `type`) VALUES
(1, 'Daum', '', 15, 'RO'),
(2, 'Corbin', '', 15, 'RO'),
(3, 'Baccarat', '', 20, 'RO'),
(4, 'Longwy', '', 12, 'RO'),
(5, 'Multimédia', '', 25, 'RO'),
(6, 'Amphithéâtre', '', 200, 'RO'),
(7, 'Lamour', '', 30, 'RO'),
(8, 'Grüber', '', 15, 'RO'),
(9, 'Majorelle', '', 40, 'RO'),
(10, 'Salle de restauration', 'Salle de restauration', 50, 'RO'),
(11, 'Galerie', '', 80, 'RO'),
(12, 'Salle informatique', '', 15, 'RO'),
(13, 'Hall d''accueil', '', 100, 'RO'),
(14, 'Gallé', '', 15, 'RO');

-- --------------------------------------------------------

--
-- Structure de la table `mrbs_users`
--

CREATE TABLE `mrbs_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` smallint(6) NOT NULL DEFAULT '0',
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=119 ;

--
-- Contenu de la table `mrbs_users`
--

INSERT INTO `mrbs_users` (`id`, `level`, `name`, `password`, `email`) VALUES
(1, 2, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin.mrbs@lorraine-sport.net'),
(6, 2, 'aubinv', '21232f297a57a5a743894a0e4a801fc3', 'aubin.veronique@lorraine-sport.net'),
(7, 2, 'ackermanns', '21232f297a57a5a743894a0e4a801fc3', 'ackermann.solange@lorraine-sport.net'),
(8, 1, 'guesdonm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'guesdon.martin@lorraine-sport.net'),
(9, 1, 'grenierf', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'grenier.francoise@lorraine-sport.net'),
(10, 1, 'giboired', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'giboire.david@lorraine-sport.net'),
(11, 1, 'guillemetm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'guillemet.martin@lorraine-sport.net'),
(12, 1, 'guilletm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'guillet.maud@lorraine-sport.net'),
(13, 1, 'gilbertj', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'gilbert.jordan@lorraine-sport.net'),
(14, 1, 'grelichef', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'greliche.franck@lorraine-sport.net'),
(15, 1, 'garniert', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'garnier.theo@lorraine-sport.net'),
(16, 1, 'gaigar', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'gaiga.renan@lorraine-sport.net'),
(17, 1, 'glavork', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'glavor.kevin@lorraine-sport.net'),
(18, 0, 'lunavote', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'lunavot.eric@lorraine-sport.net'),
(19, 0, 'borsellinoj', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'borsellino.jean-marc@lorraine-sport.net'),
(20, 0, 'daumyn', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'daumy.nicolas@lorraine-sport.net'),
(21, 0, 'chambonp', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'chambon.patrick@lorraine-sport.net'),
(22, 0, 'lecadetc', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'lecadet.cecile@lorraine-sport.net'),
(23, 0, 'vannierl', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'vannier.louis@lorraine-sport.net'),
(24, 0, 'minets', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'minet.sabrina@lorraine-sport.net'),
(25, 0, 'bourgeoiss', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'bourgeois.simon@lorraine-sport.net'),
(26, 0, 'charleta', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'charlet.aurelie@lorraine-sport.net'),
(27, 0, 'pirotl', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'pirot.lea@lorraine-sport.net'),
(28, 0, 'michauxa', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'michaux.alexandre@lorraine-sport.net'),
(29, 0, 'cullerierj', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'cullerier.jerome@lorraine-sport.net'),
(30, 0, 'monnetm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'monnet.michel@lorraine-sport.net'),
(31, 0, 'bergerv', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'berger.vanessa@lorraine-sport.net'),
(32, 0, 'duquennel', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'duquenne.luc@lorraine-sport.net'),
(33, 0, 'vassalm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'vassal.marc@lorraine-sport.net'),
(34, 0, 'samsonm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'samson.maryline@lorraine-sport.net'),
(35, 0, 'vassale', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'vassal.elizabeth@lorraine-sport.net'),
(36, 0, 'dubuism', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'dubuis.marie@lorraine-sport.net'),
(37, 0, 'briseuxs', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'briseux.serge@lorraine-sport.net'),
(38, 0, 'zambonie', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'zamboni.estelle@lorraine-sport.net'),
(39, 0, 'vernonc', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'vernon.christian@lorraine-sport.net'),
(40, 0, 'micherouxe', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'micheroux.emmanuel@lorraine-sport.net'),
(41, 0, 'philippej', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'philippe.jocelyne@lorraine-sport.net'),
(42, 0, 'brisseaup', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'brisseau.pierre-jean@lorraine-sport.net'),
(43, 0, 'meneure', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'meneur.emmanuel@lorraine-sport.net'),
(44, 0, 'martelh', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'martel.herve@lorraine-sport.net'),
(45, 0, 'fernandesf', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'fernandes.fabrice@lorraine-sport.net'),
(46, 0, 'loubata', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'loubat.agnes@lorraine-sport.net'),
(47, 0, 'mogest', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'moges.thierry@lorraine-sport.net'),
(48, 0, 'bulicm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'bulic.marc@lorraine-sport.net'),
(49, 0, 'coulombelt', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'coulombel.thomas@lorraine-sport.net'),
(50, 0, 'noirotm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'noirot.maxime@lorraine-sport.net'),
(51, 0, 'martinageo', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'martinage.ophelie@lorraine-sport.net'),
(52, 0, 'corvaisierk', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'corvaisier.kevin@lorraine-sport.net'),
(53, 0, 'danetc', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'danet.christophe@lorraine-sport.net'),
(54, 0, 'antoineq', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'antoine.quentin@lorraine-sport.net'),
(55, 0, 'ouing', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'ouin.georges@lorraine-sport.net'),
(56, 0, 'mabilaisl', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'mabilais.liliane@lorraine-sport.net'),
(57, 0, 'charbonnelt', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'charbonnel.tanguy@lorraine-sport.net'),
(58, 0, 'droaly', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'droal.yves@lorraine-sport.net'),
(59, 0, 'rocherf', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'rocher.fabienne@lorraine-sport.net'),
(60, 0, 'triballata', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'triballat.amelie@lorraine-sport.net'),
(61, 0, 'martih', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'marti.herve@lorraine-sport.net'),
(62, 0, 'vollej', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'volle.jocelyn@lorraine-sport.net'),
(63, 0, 'hubertx', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'hubert.xavier@lorraine-sport.net'),
(64, 0, 'lieutierv', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'lieutier.vianney@lorraine-sport.net'),
(65, 0, 'cabalf', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'cabal.frederick@lorraine-sport.net'),
(66, 0, 'kriegerc', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'krieger.christian@lorraine-sport.net'),
(67, 0, 'fischerh', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'fischer.helene@lorraine-sport.net'),
(68, 0, 'descatb', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'descat.bastien@lorraine-sport.net'),
(69, 0, 'humbertf', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'humbert.felix@lorraine-sport.net'),
(70, 0, 'landrieux', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'landrieu.xavier@lorraine-sport.net'),
(71, 0, 'delpeyroua', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'delpeyrou.andre@lorraine-sport.net'),
(72, 0, 'rodierd', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'rodier.denis@lorraine-sport.net'),
(73, 0, 'boyers', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'boyer.suzanne@lorraine-sport.net'),
(74, 0, 'chassonn', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'chasson.nicole@lorraine-sport.net'),
(75, 0, 'cuenotb', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'cuenot.bruno@lorraine-sport.net'),
(76, 0, 'pitonu', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'piton.ursule@lorraine-sport.net'),
(77, 0, 'gariny', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'garin.yvette@lorraine-sport.net'),
(78, 0, 'salioum', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'saliou.marcel@lorraine-sport.net'),
(79, 0, 'rigalg', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'rigal.guenole@lorraine-sport.net'),
(80, 0, 'pelhatel', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'pelhate.loic@lorraine-sport.net'),
(81, 0, 'skweresp', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'skweres.paul@lorraine-sport.net'),
(82, 0, 'haviso', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'havis.odette@lorraine-sport.net'),
(83, 0, 'rigalj', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'rigal.jonathan@lorraine-sport.net'),
(84, 0, 'cochetr', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'cochet.remi@lorraine-sport.net'),
(85, 0, 'blinm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'blin.morgane@lorraine-sport.net'),
(86, 0, 'mazurierv', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'mazurier.vincent@lorraine-sport.net'),
(87, 0, 'robichets', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'robichet.sylvain@lorraine-sport.net'),
(88, 0, 'brouillatf', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'brouillat.francois@lorraine-sport.net'),
(89, 0, 'legerg', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'leger.geraldine@lorraine-sport.net'),
(90, 0, 'despresv', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'despres.viviane@lorraine-sport.net'),
(91, 0, 'bretonj', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'breton.jean@lorraine-sport.net'),
(92, 0, 'duboisl', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'dubois.laurence@lorraine-sport.net'),
(93, 0, 'mousquetj', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'mousquet.jean@lorraine-sport.net'),
(94, 0, 'robuttep', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'robutte.philippe@lorraine-sport.net'),
(95, 0, 'lecailleo', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'lecaille.oriane@lorraine-sport.net'),
(96, 0, 'veriteb', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'verite.brendan@lorraine-sport.net'),
(97, 0, 'dauthieub', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'dauthieu.bryan@lorraine-sport.net'),
(98, 0, 'blancj', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'blanc.jean-marc@lorraine-sport.net'),
(99, 0, 'dongelingeri', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'dongelinger.irene@lorraine-sport.net'),
(100, 0, 'hochetg', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'hochet.guy@lorraine-sport.net'),
(101, 0, 'lecorree', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'lecorre.emile@lorraine-sport.net'),
(102, 0, 'sacheta', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'sachet.armelle@lorraine-sport.net'),
(103, 0, 'bavelardp', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'bavelard.paul@lorraine-sport.net'),
(104, 0, 'panagetr', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'panaget.remi@lorraine-sport.net'),
(105, 0, 'aubinv', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'aubin.veronique@lorraine-sport.net'),
(106, 0, 'ackermanns', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'ackermann.solange@lorraine-sport.net'),
(107, 0, 'hainryd', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'hainry.david@lorraine-sport.net'),
(108, 0, 'trouchetc', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'trouchet.carinne@lorraine-sport.net'),
(109, 0, 'bertelles', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'bertelle.sophie@lorraine-sport.net'),
(110, 0, 'pannetierc', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'pannetier.celine@lorraine-sport.net'),
(111, 0, 'poulainm', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'poulain.marie-ange@lorraine-sport.net'),
(112, 0, 'stervinour', 'b89f7a5ff3e3a225d572dac38b2a67f7', 'stervinou.romain@lorraine-sport.net'),
(113, 0, 'Jeremy', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'jeremyfroment@yahoo.fr'),
(114, 2, 'supertoto', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'supertoto@supertoto.fr'),
(115, 2, 'megatoto', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'megatoto@megatoto.fr'),
(118, 2, 'toto', '0b9c2625dc21ef05f6ad4ddf47c5f203837aa32c', 'toto@toto.fr');

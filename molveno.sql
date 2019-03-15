-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 15, 2019 at 07:45 AM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 7.0.28-1+ubuntu14.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `molveno`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessories`
--

CREATE TABLE `accessories` (
  `id` int(11) NOT NULL,
  `accessoryName` varchar(60) NOT NULL,
  `accessoryAvailability` int(11) NOT NULL,
  `accessoryPrice` float UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accessories`
--

INSERT INTO `accessories` (`id`, `accessoryName`, `accessoryAvailability`, `accessoryPrice`) VALUES
(1, 'Baby Bed', 20, 9.5),
(2, 'Big Screen TV', 10, 15),
(3, 'Espresso Machine', 15, 3.95);

-- --------------------------------------------------------

--
-- Table structure for table `blocked_rooms`
--

CREATE TABLE `blocked_rooms` (
  `room_id` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blocked_rooms`
--

INSERT INTO `blocked_rooms` (`room_id`, `startDate`, `endDate`) VALUES
(9, '2018-12-20', '2018-12-30'),
(9, '2019-02-04', '2019-02-05');

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `firstName` varchar(60) NOT NULL,
  `lastName` varchar(60) NOT NULL,
  `address` varchar(60) NOT NULL,
  `homeTown` varchar(60) NOT NULL,
  `postalCode` varchar(60) NOT NULL,
  `country` varchar(60) NOT NULL,
  `telephoneNumber` varchar(60) DEFAULT NULL,
  `emailAddress` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`id`, `firstName`, `lastName`, `address`, `homeTown`, `postalCode`, `country`, `telephoneNumber`, `emailAddress`) VALUES
(1, 'Sjaak', 'Trekhaak', 'Autoweg 123', 'Bussum', '8282 VR', 'Netherlands', '0145-342421', 'sjaakdesloper@deautosloperij.nl'),
(2, 'Fleur', 'Agema', 'Kanaal van Steenenhoek Noordzijde 28', 'Gorinchem', '4923 NR', 'Netherlands', '06-51035221', 'a.heinrich@gmail.com'),
(3, 'Klaas', 'Karz', 'Brandtweg 10', 'Aken', '85321 IT', 'Germany', '03232-24243', 'klaaskarz@gmail.com'),
(4, 'de Rooie', 'uit Gestel', 'Hoofdweg 54', 'Gestel', '2231 FD', 'Netherlands', '065-2324212', 'derooieuitgestel@gmail.com'),
(5, 'Piet', 'Piraat', 'Piraatweg 40', 'Het Schip', '8880 YA', 'Netherlands', NULL, 'devocmentaliteit@studio100.nl'),
(6, 'Madelijn', 'Wanrooij', 'Dauwnetel 150', 'Haaksbergen', '7483 AH', 'Netherlands', '06-24542844', 'madelijn@iffymedia.com'),
(7, 'Ivon', 'de Klos', 'Emmaweg 2', 'Renesse', '4325 AJ', 'Netherlands', '0111-232120', 'i.de.klos@zeelandnet.nl'),
(8, 'Maick', 'Waijers', 'Molenweg 2', 'Zutphen', '6521 IM', 'Netherlands', '0133-212133', 'fancymike@gmail.com'),
(9, 'Mathieu', 'Wiegmans', 'Assendorperstraat 99', 'Zwolle', '8012 CB', 'Netherlands', '038-1526482', 'm.wiegmans@kpn.nl'),
(16, 'Peter R', 'de Vries', 'Bovendonksestraatweg 527', 'Tytsjerksteradiel', '9061 KR', 'Netherlands', '0511459512', 'peter_devries@tele2.nl'),
(18, 'Teun', 'Tuinbroek', 'Motorweg 20', 'Vlissingen', '3450 AD', 'Netherlands', NULL, 'teuntje@gmail.com'),
(22, 'Kaitlin', 'Hemmink', 'Tulpenlaan 128', 'Geleen', '6163 EJ', 'Netherlands', '0462615488', 'k.hemmink@tele2.nl'),
(23, 'Frans', 'de Lange', 'Molvenostraat 333', 'Amsterdam', '1141 ZC', 'Netherlands', '010-2524232', 'f.delange@molveno.it'),
(25, 'Ronald', 'Mc Donald', 'Mc drive laan 1', 'Hamburg', '0433BM', 'United States', '0909324234', 'cheesburger@McDonalds.com');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `guest_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `arrivalDate` date NOT NULL,
  `departureDate` date NOT NULL,
  `numberOfGuests` int(11) NOT NULL,
  `guestHasCheckedIn` tinyint(1) NOT NULL,
  `guestHasPaid` tinyint(1) NOT NULL,
  `guestHasCheckedOut` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `guest_id`, `room_id`, `arrivalDate`, `departureDate`, `numberOfGuests`, `guestHasCheckedIn`, `guestHasPaid`, `guestHasCheckedOut`) VALUES
(1, 2, 6, '2019-01-17', '2019-01-22', 2, 1, 1, 1),
(4, 3, 4, '2019-02-09', '2019-02-27', 1, 1, 0, 0),
(8, 2, 2, '2019-01-31', '2019-02-09', 4, 1, 1, 0),
(9, 6, 6, '2019-02-08', '2019-02-15', 2, 1, 1, 1),
(10, 5, 9, '2019-02-28', '2019-03-09', 4, 1, 0, 0),
(11, 22, 2, '2019-02-28', '2019-03-28', 2, 1, 0, 0),
(12, 23, 22, '2019-03-02', '2019-03-09', 2, 1, 1, 1),
(13, 16, 26, '2019-03-29', '2019-04-26', 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `res_acc`
--

CREATE TABLE `res_acc` (
  `reservation_id` int(11) NOT NULL,
  `accessory_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `roomNumber` varchar(30) NOT NULL,
  `roomType` varchar(30) NOT NULL,
  `numberOfBeds` int(11) NOT NULL,
  `roomPrice` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `roomNumber`, `roomType`, `numberOfBeds`, `roomPrice`) VALUES
(1, '1', 'Budget', 3, 70),
(2, '2', 'Standard', 4, 100),
(3, '3', 'Luxurious', 4, 150),
(4, '4', 'Standard', 3, 100),
(5, '5A', 'Standard', 2, 100),
(6, '5B', 'Standard', 2, 100),
(7, '6', 'Luxurious', 1, 125),
(8, '7', 'Budget', 2, 75),
(9, '8', 'Budget', 4, 80),
(10, '9', 'Standard', 1, 150),
(11, '10', 'Standard', 4, 100),
(12, '11', 'Luxurious', 1, 125),
(18, '12', 'Standard', 4, 250),
(19, '13', 'Luxurious', 2, 100),
(20, '14', 'Budget', 4, 52),
(22, '15', 'Luxurious', 4, 140),
(26, '16', 'Standard', 1, 75),
(28, '17', 'Standard', 2, 55),
(29, '18A', 'Budget', 2, 50),
(34, '18B', 'Luxurious', 4, 65);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accessories`
--
ALTER TABLE `accessories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blocked_rooms`
--
ALTER TABLE `blocked_rooms`
  ADD KEY `fk_blocked_rooms_info` (`room_id`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_guest_info` (`guest_id`),
  ADD KEY `fk_room_info` (`room_id`);

--
-- Indexes for table `res_acc`
--
ALTER TABLE `res_acc`
  ADD KEY `fk_reservation_link_to_reservation_accessory_table` (`reservation_id`),
  ADD KEY `fk_accessory_link_to_reservation_accessory_table` (`accessory_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accessories`
--
ALTER TABLE `accessories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blocked_rooms`
--
ALTER TABLE `blocked_rooms`
  ADD CONSTRAINT `fk_blocked_rooms_info` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `fk_guest_info` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_room_info` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `res_acc`
--
ALTER TABLE `res_acc`
  ADD CONSTRAINT `fk_accessory_link_to_reservation_accessory_table` FOREIGN KEY (`accessory_id`) REFERENCES `accessories` (`id`),
  ADD CONSTRAINT `fk_reservation_link_to_reservation_accessory_table` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

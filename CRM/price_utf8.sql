-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 28, 2024 at 05:24 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `price_utf8`
--

CREATE TABLE `price_utf8` (
  `product_type` varchar(6) DEFAULT NULL,
  `product_name` varchar(11) DEFAULT NULL,
  `product_specification` varchar(20) DEFAULT NULL,
  `price_perm2` int(2) DEFAULT NULL,
  `extra_supply` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `price_utf8`
--

INSERT INTO `price_utf8` (`product_type`, `product_name`, `product_specification`, `price_perm2`, `extra_supply`) VALUES
('HIFLEX', 'Bạt 3.2dzem', 'Chừa biên', 50, 25),
('HIFLEX', 'Bạt 3.2dzem', 'Đóng Khoen', 55, 25),
('HIFLEX', 'Bạt 3.2dzem', 'Dán nối,Chừa biên', 60, 25),
('HIFLEX', 'Bạt 3.2dzem', 'Dán nối , đóng khoen', 65, 25),
('HIFLEX', 'Bạt 3.6dzem', 'Chừa biên', 55, 30),
('HIFLEX', 'Bạt 3.6dzem', 'Đóng Khoen', 60, 30),
('HIFLEX', 'Bạt 3.6dzem', 'Dán nối,Chừa biên', 65, 30),
('HIFLEX', 'Bạt 3.6dzem', 'Dán nối , đóng khoen', 70, 30),
('HIFLEX', 'Bạt 3.8dzem', 'Chừa biên', 65, 35),
('HIFLEX', 'Bạt 3.8dzem', 'Đóng Khoen', 70, 35),
('HIFLEX', 'Bạt 3.8dzem', 'Dán nối,Chừa biên', 75, 35),
('HIFLEX', 'Bạt 3.8dzem', 'Dán nối , đóng khoen', 80, 35);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

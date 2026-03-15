-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 15, 2026 at 03:28 AM
-- Server version: 5.7.44-48
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trustitt_projects`
--

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `stored_by` bigint(20) UNSIGNED NOT NULL,
  `advance_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spent_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `asa` enum('settle','expense') COLLATE utf8mb4_unicode_ci DEFAULT 'expense',
  `file_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `user_id`, `stored_by`, `advance_id`, `amount`, `description`, `spent_at`, `asa`, `file_path`, `created_at`, `updated_at`) VALUES
(1, 69, 69, 5, 800.00, 'نولون السيارة', '2026-01-29 18:48:01', 'expense', 'expenses/nuhj82Uw50MKblCQoOQjYVCZMPkAjC1Bs2YVlCyV.jpg', '2026-01-29 18:48:01', '2026-01-29 18:48:01'),
(2, 69, 69, 3, 23850.00, 'سيراميك', '2026-01-29 20:13:11', 'expense', 'expenses/m2kWkqmFOOlEUtYuz8AmupYpmKliqKAp0ejSmJx6.jpg', '2026-01-29 20:13:11', '2026-01-29 20:13:11'),
(3, 69, 69, 6, 74250.00, 'Hdf', '2026-01-31 20:57:08', 'expense', 'expenses/XikiXO52aQz12wmkllalAZ5hxi3PTMO0md7wnRzn.jpg', '2026-01-31 20:57:08', '2026-01-31 20:57:08'),
(4, 69, 69, 6, 9000.00, 'Hdf', '2026-01-31 20:58:41', 'expense', 'expenses/eZoAkqMgO4Fn2wBhPg9BQ3Ds7LbABnJMLhXpNnDH.jpg', '2026-01-31 20:58:41', '2026-01-31 20:58:41'),
(5, 69, 69, 3, 5000.00, 'كشافات اليوس', '2026-02-03 02:13:45', 'expense', 'expenses/ESIbHSzvge9TJ9lFIGuO8XNzfWCFvbs54QDsuzqE.jpg', '2026-02-03 02:13:45', '2026-02-03 02:13:45'),
(6, 69, 69, 3, 11600.00, 'مواد بناء', '2026-02-03 02:15:05', 'expense', 'expenses/ozMMKI5xFDrgsx7PFopHExdBeJ1NhxOsikkIM1QA.jpg', '2026-02-03 02:15:05', '2026-02-03 02:15:05'),
(93, 69, 69, 115, 22863.00, 'Hdf', '2026-02-10 18:57:03', 'expense', 'expenses/w2UUZHgX2ZFEQzN5E2CwEdqjPKJswkBVFdAynEMM.jpg', '2026-02-10 18:57:03', '2026-02-10 18:57:03'),
(94, 69, 69, 115, 21595.00, 'خامات دهانات', '2026-02-10 21:40:37', 'expense', 'expenses/D5WpcraDWUMh9jBLrbX40QcZ2m2WPKhLi75Vzfrf.jpg', '2026-02-10 21:40:37', '2026-02-10 21:40:37'),
(97, 68, 20, 122, 400.00, 'بنزين', '2026-02-12 17:15:14', 'expense', 'expenses/j0Eh5Vn0KH1f5R9U4oDvoxzzPV3fWR0eBoy63Hae.jpg', '2026-02-12 17:15:14', '2026-02-12 17:15:14'),
(98, 68, 20, 123, 104.00, 'كروت شحن', '2026-02-12 17:19:49', 'expense', 'expenses/PJ6R4xp0YkSodOjdCtAO88e1dAigAwAeynrLsNlf.jpg', '2026-02-12 17:19:49', '2026-02-12 17:19:49'),
(99, 41, 20, 124, 121.00, 'بوفيه', '2026-02-12 17:23:16', 'expense', 'expenses/JfKHwG9wkY9Y78RPT1AodddY2y3aS9bLmnNHzDrY.jpg', '2026-02-12 17:23:16', '2026-02-12 17:23:16'),
(100, 68, 20, 125, 110.00, 'كارتات', '2026-02-12 17:26:26', 'expense', 'expenses/qEs7Gp4QDjTSHYYfu03a1ewRS5vRrHPRCXDJWUq2.jpg', '2026-02-12 17:26:26', '2026-02-12 17:26:26'),
(101, 41, 20, 127, 124.00, 'بوفيه', '2026-02-12 17:30:43', 'expense', 'expenses/JxkbmFzcrVAyXuRbJ0zBxokBEf1AHiV6oNLtOeNk.jpg', '2026-02-12 17:30:43', '2026-02-12 17:30:43'),
(102, 68, 20, 128, 1240.00, 'مصروفات سيارة - بنزين - كارتة', '2026-02-12 17:35:45', 'expense', 'expenses/clvFNhBWb4QfeWDtuxsrpPpL1z68aXkwTyjJ46XB.jpg', '2026-02-12 17:35:45', '2026-02-12 17:35:45'),
(103, 41, 20, 129, 1050.00, 'شراء هارد', '2026-02-12 17:39:31', 'expense', 'expenses/gQTJCTIsRsGoIQzw4E68YzxRT7zoSgaScFIKwyJD.jpg', '2026-02-12 17:39:31', '2026-02-12 17:39:31'),
(104, 68, 20, 130, 420.00, 'بنزين - كارتة', '2026-02-12 17:42:04', 'expense', 'expenses/eFiEgYT2P7HXJXUrZj4giNqgigLXCYuDSgPaidnW.jpg', '2026-02-12 17:42:04', '2026-02-12 17:42:04'),
(105, 41, 20, 131, 320.00, 'بوفيه', '2026-02-12 17:44:10', 'expense', 'expenses/OfULnYV79eMwvd8GOb8Bmet1CQYLYeofN5EEfh4n.jpg', '2026-02-12 17:44:10', '2026-02-12 17:44:10'),
(106, 41, 20, 132, 433.00, 'تجديد فاتورة نت', '2026-02-12 17:46:53', 'expense', 'expenses/b8Nutu3mRuwrBT7TQcwc6vEwInOUClAS6GOfTbnE.jpg', '2026-02-12 17:46:53', '2026-02-12 17:46:53'),
(107, 68, 20, 133, 100.00, 'كارتات', '2026-02-12 17:48:58', 'expense', 'expenses/gmK5Xz6EshIEI9HyGjAAOSZYftiPtIyFvaYVxxVW.jpg', '2026-02-12 17:48:58', '2026-02-12 17:48:58'),
(108, 41, 20, 134, 101.00, 'بوفيه', '2026-02-12 17:50:59', 'expense', 'expenses/oZjOOthRPnTOxiI7ndKS8QBcvaX7WwKZkfCqUI4V.jpg', '2026-02-12 17:50:59', '2026-02-12 17:50:59'),
(109, 68, 20, 135, 330.00, 'بنزين - كارتة', '2026-02-12 17:53:48', 'expense', 'expenses/IZQf8iSt1QdDlPsgEz4c1oKLP36wMeMe883YDuyv.jpg', '2026-02-12 17:53:48', '2026-02-12 17:53:48'),
(110, 41, 20, 136, 90.00, 'بوفيه', '2026-02-12 17:55:29', 'expense', 'expenses/bfuNC3L3asygdAKyONQHAE4Z43ITeCzezPLiJ4Da.jpg', '2026-02-12 17:55:29', '2026-02-12 17:55:29'),
(111, 68, 20, 137, 1210.00, 'بنزين', '2026-02-12 17:57:25', 'expense', 'expenses/FiMP1D2u8NKGvyiH8jNM5VZZbu5Q7A55ZkuSeRxp.jpg', '2026-02-12 17:57:25', '2026-02-12 17:57:25'),
(112, 41, 20, 138, 247.00, 'مشتريات', '2026-02-12 18:00:13', 'expense', 'expenses/JMHCwWPDvZNyicS7EV6Mit0s3P1OwenIiVsj7yFU.jpg', '2026-02-12 18:00:13', '2026-02-12 18:00:13'),
(113, 41, 20, 139, 95.00, 'شحن كارت كهرباء', '2026-02-12 18:02:18', 'expense', 'expenses/q7J8jtudsFMtRZ7875kxBMrKfFco7xEmfdiMn4oL.jpg', '2026-02-12 18:02:18', '2026-02-12 18:02:18'),
(114, 42, 20, 140, 1000.00, 'انتقالات مدينة نصر', '2026-02-12 18:06:53', 'expense', 'expenses/U4VDF44jLUU1r48jAdDAFslacOmqwohmTunLPrh9.jpg', '2026-02-12 18:06:53', '2026-02-12 18:06:53'),
(115, 2, 20, 141, 332.00, 'انتقالات', '2026-02-12 18:08:30', 'expense', 'expenses/wHeO3XRfyeEcj3JADmryDYEHFqzTKoAMLPL8RPbR.jpg', '2026-02-12 18:08:30', '2026-02-12 18:08:30'),
(117, 66, 20, 143, 440.00, 'شراء كراسة مناقصة - انتقالات', '2026-02-12 18:24:46', 'expense', 'expenses/E93pU2Gwrwpmf51tuNaD0cIv8O1sT03mr4yOPuyS.jpg', '2026-02-12 18:24:46', '2026-02-12 18:24:46'),
(118, 68, 20, 144, 400.00, 'بنزين', '2026-02-12 18:26:43', 'expense', 'expenses/ldncXgtxPT4hJIyHEmuvpsfyUSwLNbc8NeTzgO6c.jpg', '2026-02-12 18:26:43', '2026-02-12 18:26:43'),
(119, 68, 20, 145, 420.00, 'بنزين - كارتة', '2026-02-12 18:32:42', 'expense', 'expenses/RURITNeHMmZEuG3CwXVZ9E6Y5YnR8PREgePpQdzp.jpg', '2026-02-12 18:32:42', '2026-02-12 18:32:42'),
(120, 65, 20, 146, 50.00, 'انتقالات', '2026-02-12 18:34:24', 'expense', 'expenses/amyo0MM8vimDjQTIvXsBf5EOCD6LsYPYW3BTvqWo.jpg', '2026-02-12 18:34:24', '2026-02-12 18:34:24'),
(121, 61, 20, 147, 25.00, 'انتقالات مدرسة الزهراء', '2026-02-12 18:36:14', 'expense', 'expenses/G937V2k7nrxtmYLpvdpckEi4hunuLqVIzYpYXBqI.jpg', '2026-02-12 18:36:14', '2026-02-12 18:36:14'),
(122, 68, 20, 148, 700.00, 'بنزين - كارتة', '2026-02-12 18:39:44', 'expense', 'expenses/mxB8iHIhSMiqGThxGWCeGSkyiPglSftT110yUq0U.jpg', '2026-02-12 18:39:44', '2026-02-12 18:39:44'),
(123, 2, 20, 149, 546.00, 'انتقالات', '2026-02-12 18:42:54', 'expense', 'expenses/HPhMs4MN3q2WLtyNy0mlJhzVT9GDsg3LLirbOqin.jpg', '2026-02-12 18:42:54', '2026-02-12 18:42:54'),
(124, 2, 20, 150, 500.00, 'انتقالات', '2026-02-12 18:44:47', 'expense', 'expenses/s6MQCHCFhPdZyrUH9AtxD6toJHJBbqr6NsiAzf4C.jpg', '2026-02-12 18:44:47', '2026-02-12 18:44:47'),
(126, 17, 20, 152, 600.00, 'انتقالات الي الشركة المصرية للمطارات ذهاب وعودة', '2026-02-12 18:51:00', 'expense', 'expenses/YsBsuUu2itVVW4fnllK1nHCcCHBY6oei3ugtzmbs.jpg', '2026-02-12 18:51:00', '2026-02-12 18:51:00'),
(127, 68, 20, 153, 400.00, 'بنزين', '2026-02-12 18:52:32', 'expense', 'expenses/vdOotYaZ5H7N7kDOS5lP7QByx6OVKpPsWFdaZNMZ.jpg', '2026-02-12 18:52:32', '2026-02-12 18:52:32'),
(128, 2, 20, 154, 885.00, 'انتقالات الي المطار ذهاب وعودة', '2026-02-12 18:54:29', 'expense', 'expenses/ITgOOOWNuPq8ftpSl7CTAcWiYnPXJzqRIYr3T8dM.jpg', '2026-02-12 18:54:29', '2026-02-12 18:54:29'),
(130, 41, 20, 156, 160.00, 'بوفيه', '2026-02-12 18:59:12', 'expense', 'expenses/a4fLl3IKHGO8d4aylhtTdZPfz8ZI5yFYpltsTRix.jpg', '2026-02-12 18:59:12', '2026-02-12 18:59:12'),
(131, 19, 20, 157, 915.00, 'انتقالات', '2026-02-12 19:02:14', 'expense', 'expenses/DMOU6SFawfLXH9fKKDWlvEu5SksG4zLkbZainQXH.jpg', '2026-02-12 19:02:14', '2026-02-12 19:02:14'),
(132, 19, 20, 158, 200.00, 'انتقالات نيو جيزة', '2026-02-12 19:04:17', 'expense', 'expenses/vDa3yPjPEXFIMMNSEDQeeyOl2TBjzo7KEo0uPmKW.jpg', '2026-02-12 19:04:17', '2026-02-12 19:04:17'),
(133, 66, 20, 159, 100.00, 'انتقالات الي دار العالمية', '2026-02-12 19:05:27', 'expense', 'expenses/p7uPkdl2eiaLJIzqQFaHInTEpWnOiOhVPShuczY1.jpg', '2026-02-12 19:05:27', '2026-02-12 19:05:27'),
(134, 2, 20, 160, 300.00, 'انتقالات الي المطار ذهاب وعودة', '2026-02-12 19:07:09', 'expense', 'expenses/V3QClDlol7QyZcgpBCUSGrkoD7g6d80fAH0k4l4j.jpg', '2026-02-12 19:07:09', '2026-02-12 19:07:09'),
(135, 2, 20, 161, 780.00, 'انتقالات', '2026-02-12 19:13:15', 'expense', 'expenses/0pOgeIRcwlwVpLH5K0fbMujFzXWhLMKofYA2v7in.jpg', '2026-02-12 19:13:15', '2026-02-12 19:13:15'),
(136, 2, 20, 162, 455.00, 'انتقالات', '2026-02-12 19:14:43', 'expense', 'expenses/ihdLzNbDkhxcK2kXyhgZQqUd0QFcU33c1jFasG0k.jpg', '2026-02-12 19:14:43', '2026-02-12 19:14:43'),
(137, 2, 20, 163, 330.00, 'انتقالات الي المطار ذهاب وعودة', '2026-02-12 19:16:17', 'expense', 'expenses/i6GwgmyOLYXZmHiqfgkH1wZOQfv3JVmS1tIxiedD.jpg', '2026-02-12 19:16:17', '2026-02-12 19:16:17'),
(138, 68, 20, 164, 970.00, 'بنزين - زيت سيارة - كارتات', '2026-02-12 19:22:15', 'expense', 'expenses/Z7zDiVvO0D5m5hUosEeY8Xer0n4et7EWBD7zstmm.jpg', '2026-02-12 19:22:15', '2026-02-12 19:22:15'),
(139, 2, 20, 165, 120.00, 'انتقالات', '2026-02-12 19:27:20', 'expense', 'expenses/7k4HmyeDyhfJ869L5Q9TwXa6tXVJhMJ8ZSRArN3L.jpg', '2026-02-12 19:27:20', '2026-02-12 19:27:20'),
(140, 19, 20, 166, 550.00, 'انتقالات', '2026-02-12 19:28:42', 'expense', 'expenses/Ozb9PEDSk4WpkOZa0dyy1YjGEF5uzZ1irQcZHbf3.jpg', '2026-02-12 19:28:42', '2026-02-12 19:28:42'),
(141, 2, 20, 167, 90.00, 'انتقالات', '2026-02-12 19:29:49', 'expense', 'expenses/C3uJP59d7Z7WiQEiQIvfZvxAngGGl0SPzNOgYJY1.jpg', '2026-02-12 19:29:49', '2026-02-12 19:29:49'),
(142, 68, 20, 168, 400.00, 'بنزين', '2026-02-12 19:31:17', 'expense', 'expenses/a6tFI2wbRGXbneaZMtGv0UgqGv1pHE43JdKUcGUB.jpg', '2026-02-12 19:31:17', '2026-02-12 19:31:17'),
(143, 68, 20, 169, 1760.00, 'زيت سيارة - بنزين - كارتات', '2026-02-12 19:34:08', 'expense', 'expenses/ZIyRempet2XO1paW4icGBnf5FCZOc19CrZtdBekD.jpg', '2026-02-12 19:34:08', '2026-02-12 19:34:08'),
(144, 2, 20, 170, 400.00, 'انتقالات', '2026-02-12 19:36:21', 'expense', 'expenses/v2RCD6i6wE6VNq1a0IdGIKvaBgdEQ8MBoLh4MojX.jpg', '2026-02-12 19:36:21', '2026-02-12 19:36:21'),
(145, 2, 20, 171, 274.00, 'انتقالات', '2026-02-12 19:37:40', 'expense', 'expenses/ceZXaFkpNuusdqCpjZwwJSHYqWMLaclGNvgoOpa7.jpg', '2026-02-12 19:37:40', '2026-02-12 19:37:40'),
(146, 41, 20, 172, 195.00, 'شحن كارت كهرباء', '2026-02-12 19:41:19', 'expense', 'expenses/9BRFtnthoHyaRT8jjDRrkzdLdgbNkICrF6pqVRmY.jpg', '2026-02-12 19:41:19', '2026-02-12 19:41:19'),
(147, 68, 20, 173, 400.00, 'بنزين', '2026-02-12 19:42:48', 'expense', 'expenses/eknuyyWQqMz1PURAIl5qjXkzYbf8dt2LMTtwMJLA.jpg', '2026-02-12 19:42:48', '2026-02-12 19:42:48'),
(148, 69, 69, 121, 16890.00, 'نقل عماله', '2026-02-13 05:26:30', 'expense', 'expenses/MTQCQH1OZMJDV38CGUZ6TVVp3WkY2tf9VoAojlfX.jpg', '2026-02-13 05:26:30', '2026-02-13 05:26:30'),
(149, 69, 69, 121, 7000.00, 'رش دوكو فرن الدور الثالث', '2026-02-13 05:27:36', 'expense', 'expenses/uI7ZoMOSha85m9nYwzYpXr7mVOe33lFimXCtBsHb.jpg', '2026-02-13 05:27:36', '2026-02-13 05:27:36'),
(150, 69, 69, 121, 3500.00, 'كهرباء ثاث كيرف', '2026-02-13 05:28:24', 'expense', 'expenses/xzBlrjBstag5izdUuaiAMf0FKCHCtuBbEMEDJxTr.jpg', '2026-02-13 05:28:24', '2026-02-13 05:28:24'),
(151, 69, 69, 121, 52000.00, 'مصنعيات نقاشة ١٥ يوم', '2026-02-13 05:29:36', 'expense', 'expenses/QpdkWcqMMyymN54vc241zElv6DHKiU9HlHJSJYQj.jpg', '2026-02-13 05:29:36', '2026-02-13 05:29:36'),
(152, 69, 69, 121, 1350.00, 'خامات دهانات', '2026-02-13 05:39:25', 'expense', 'expenses/nhOcmzOP7g8AiGNgNuhBkVe7KQwUspiqZ7bY7kVs.jpg', '2026-02-13 05:39:25', '2026-02-13 05:39:25'),
(153, 61, 20, 174, 400.00, 'انتقالات', '2026-02-15 16:38:35', 'expense', 'expenses/FpUeN4e4s0Fnm2FHtU1pDC8AYbi9ob1UxeHBwtQE.jpg', '2026-02-15 16:38:35', '2026-02-15 16:38:35'),
(154, 61, 20, 177, 314.00, 'انتقالات', '2026-02-15 16:39:39', 'expense', 'expenses/rvMi5qNydNYpDJswOPjR5bDpVJdgptGi9OCMWOc9.jpg', '2026-02-15 16:39:39', '2026-02-15 16:39:39'),
(155, 69, 69, 5, 1300.00, 'دوكو', '2026-02-15 19:34:51', 'expense', 'expenses/bEUvkXU2AvR6pRUHIY8wUOyRpvWSXDBmlyzvU6xC.jpg', '2026-02-15 19:34:51', '2026-02-15 19:34:51'),
(156, 66, 20, 179, 85.00, 'انتقالات - تسريات', '2026-02-15 22:37:19', 'expense', 'expenses/JOb0PXxLwtkvKiWXozTymMMC0XSnTDvHIbHXzmFA.jpg', '2026-02-15 22:37:19', '2026-02-15 22:37:19'),
(157, 69, 69, 115, 4000.00, 'تجليد', '2026-02-15 23:18:02', 'expense', 'expenses/vZERX454SyPys8tblGFGgXFVJxmeVmhnwbl41JIC.jpg', '2026-02-15 23:18:02', '2026-02-15 23:18:02'),
(158, 69, 69, 5, 3650.00, 'ربع عمود', '2026-02-15 23:18:45', 'expense', 'expenses/pGIfVsH8uXtAhim8YyJfSg2TEEuB8PzmR9Y5ZEkT.jpg', '2026-02-15 23:18:45', '2026-02-15 23:18:45'),
(159, 69, 69, 5, 1300.00, 'خام دوكو', '2026-02-15 23:19:29', 'expense', 'expenses/udGt5DyrM7s3FzMWHydvxeddbjKvbGjMpbI9KMOD.jpg', '2026-02-15 23:19:29', '2026-02-15 23:19:29'),
(160, 2, 20, 176, 100.00, 'انتقالات', '2026-02-16 17:44:24', 'expense', 'expenses/SoVTJI1jkjYXLPgNwCMvLFfd26lsRNNUs14pf6Vs.jpg', '2026-02-16 17:44:24', '2026-02-16 17:44:24'),
(168, 37, 20, 182, 160.00, 'اوبر - انتقالات', '2026-02-16 19:31:59', 'expense', 'expenses/9z5Xkuq4EgCfkQ1iaGCoeu2qIsGBxkfHEKBgnPQP.jpg', '2026-02-16 19:31:59', '2026-02-16 19:31:59'),
(169, 66, 20, 184, 50.00, 'انتقالات الي كورتك', '2026-02-16 22:24:25', 'expense', 'expenses/iTlx2AfXK5bnTG6ausbU6Bdqz0xDQ4vkqa2bRVrl.jpg', '2026-02-16 22:24:25', '2026-02-16 22:24:25'),
(170, 69, 69, 5, 1596.00, 'دهانات', '2026-02-17 20:29:49', 'expense', 'expenses/P7gPpf0z3nkZklqiQny45nFG4n9hKhUlhKzq4vVb.jpg', '2026-02-17 20:29:49', '2026-02-17 20:29:49'),
(171, 69, 69, 5, 1115.00, 'دهانات', '2026-02-17 20:30:41', 'expense', 'expenses/ABEfNZxJoTPoBWJj3sjXjWrj6eTVke8XdsjEsKQU.jpg', '2026-02-17 20:30:41', '2026-02-17 20:30:41'),
(172, 66, 20, 187, 80.00, 'انتقالات', '2026-02-17 23:09:26', 'expense', 'expenses/rNKWnC5efJlsF4WCdBKFg4EHvFycCg5E4p5ycMgd.jpg', '2026-02-17 23:09:26', '2026-02-17 23:09:26'),
(174, 2, 20, 180, 100.00, 'انتقالات', '2026-02-18 17:03:19', 'expense', 'expenses/wMTtITLdoHCi7jLh6fTCCaOjqaQXHluhJKGRUB51.jpg', '2026-02-18 17:03:19', '2026-02-18 17:03:19'),
(175, 39, 20, 191, 810.00, 'بنزين - كارتة', '2026-02-18 17:25:55', 'expense', 'expenses/c3sQOKgOOaskrazCj4pkiACBKPX1vj8jQksHhwBC.jpg', '2026-02-18 17:25:55', '2026-02-18 17:25:55'),
(176, 63, 20, 192, 22.00, 'انتقالات مدرسة الزهراء', '2026-02-18 19:10:42', 'expense', 'expenses/NkPJI0i1v4RP77k60pS5oJi3KTbTrAmhYpJzM8xX.jpg', '2026-02-18 19:10:42', '2026-02-18 19:10:42'),
(177, 69, 69, 5, 1890.00, 'دهانات', '2026-02-18 23:13:32', 'expense', 'expenses/DJDBbzOlxxQGwsWZv7R0slwyWxKtiUbSRphBJ26Z.jpg', '2026-02-18 23:13:32', '2026-02-18 23:13:32'),
(178, 69, 69, 115, 2860.00, 'دهانات', '2026-02-18 23:14:18', 'expense', 'expenses/ozQm06iFC0EIrwB1laY4EpPQWpSxulzAcWITGJ7z.jpg', '2026-02-18 23:14:18', '2026-02-18 23:14:18'),
(179, 69, 69, 5, 2950.00, 'خامات رش ابواب', '2026-02-18 23:15:09', 'expense', 'expenses/gM1Uil78OqSTwtGAHthhI9mLlOIWvGjvaboSwjvN.jpg', '2026-02-18 23:15:09', '2026-02-18 23:15:09'),
(180, 69, 69, 5, 270.00, 'سنفرة', '2026-02-18 23:15:58', 'expense', 'expenses/uF3elxhUfI8WSFlPmBCR5blfArXnARclwRr2WPsR.jpg', '2026-02-18 23:15:58', '2026-02-18 23:15:58'),
(181, 69, 69, 5, 630.00, 'جالون بوية', '2026-02-18 23:17:51', 'expense', 'expenses/NXX4bqcN5U8sDvVcYRwKEqXKZ7Sw8QYM5mVwfbsq.jpg', '2026-02-18 23:17:51', '2026-02-18 23:17:51'),
(182, 69, 69, 115, 10000.00, 'Hdf', '2026-02-18 23:18:45', 'expense', 'expenses/XgSGD3nG8mBO1hSJRCa4rvMsczTEK2C6WemQQdYI.jpg', '2026-02-18 23:18:45', '2026-02-18 23:18:45'),
(183, 69, 69, 115, 7400.00, 'مصنعيات', '2026-02-18 23:34:00', 'expense', 'expenses/Je4psnaV0XNeMuyJfmx08fL4rloaWQeVZuz8nVQf.jpg', '2026-02-18 23:34:00', '2026-02-18 23:34:00'),
(195, 17, 20, 196, 15.00, 'انتقالات الي البنك', '2026-02-23 16:20:40', 'expense', 'expenses/UoKyZoHc9DVKcFsMttcnTUEIrlzYBoiddQs3Ixz7.jpg', '2026-02-23 16:20:40', '2026-02-23 16:20:40'),
(196, 41, 20, 197, 25.00, 'انتقالات الي البنك', '2026-02-23 16:22:02', 'expense', 'expenses/wMCYTuUoSTEcmJpOAyWVPqvE9NpzNplQT2AlUMqQ.jpg', '2026-02-23 16:22:02', '2026-02-23 16:22:02'),
(197, 51, 20, 212, 5000.00, 'ذهاب للعريش - أكل على يومين - مواصلات', '2026-02-23 18:58:02', 'expense', 'expenses/F0fWtqSK4jAJJIFHGlGleLvrzieGCg9yMfx3pvp0.jpg', '2026-02-23 18:58:02', '2026-02-23 18:58:02'),
(198, 51, 20, 213, 2000.00, 'أكل - انتقالات', '2026-02-23 18:58:24', 'expense', 'expenses/yI6RV9M6Hzs7WyGpRU0dMFV4Lcus5BTaIjINkfx5.jpg', '2026-02-23 18:58:24', '2026-02-23 18:58:24'),
(199, 51, 20, 210, 200.00, 'بنزين', '2026-02-23 18:58:48', 'expense', 'expenses/7eYKXCJlWNL9Z3v2DwDfsvmvaN4obMdoH7tdtLhz.jpg', '2026-02-23 18:58:48', '2026-02-23 18:58:48'),
(200, 51, 20, 201, 100.00, 'بنزين', '2026-02-23 19:03:48', 'expense', 'expenses/Fr7lr1bo1H2pPsyIGroIz9MSf0oqZ5DfBfkKgf8n.jpg', '2026-02-23 19:03:48', '2026-02-23 19:03:48'),
(201, 51, 20, 215, 200.00, 'بنزين للمصنع الوطني', '2026-02-23 19:04:17', 'expense', 'expenses/G7nJz5gCNFDWF7e4C29ZVKxzi3eJoMz3ZewX1iTj.jpg', '2026-02-23 19:04:17', '2026-02-23 19:04:17'),
(202, 51, 20, 211, 900.00, 'بنزين - انتقالات مدرسة الزهراء', '2026-02-23 19:08:21', 'expense', 'expenses/fBUeHZGjRUt42KtdsC6tKxAETjgpDvt5EMEHNDVB.jpg', '2026-02-23 19:08:21', '2026-02-23 19:08:21'),
(203, 51, 20, 214, 100.00, 'بنزين', '2026-02-23 19:08:44', 'expense', 'expenses/31AH62dGHlSF9xQQeaw8xP8RTN5sNyjXx5dLlYWc.jpg', '2026-02-23 19:08:44', '2026-02-23 19:08:44'),
(204, 66, 20, 219, 100.00, 'انتقالات', '2026-02-25 17:33:43', 'expense', 'expenses/sXj8k6CXNuZBwXmmh8w6AMHRy3TnH4rtvdCKVCkX.jpg', '2026-02-25 17:33:43', '2026-02-25 17:33:43'),
(205, 2, 20, 195, 200.00, 'انتقالات', '2026-02-26 16:58:02', 'expense', 'expenses/q6kNb14hG9JiYGx2BMOa9Dqvmc4TdUGxPqzB72yo.jpg', '2026-02-26 16:58:02', '2026-02-26 16:58:02'),
(206, 68, 20, 220, 400.00, 'بنزين', '2026-02-26 17:18:36', 'expense', 'expenses/04xiM0mwfSEEBo5AjPRxVIORgMFVBWOuDoNBsXud.jpg', '2026-02-26 17:18:36', '2026-02-26 17:18:36'),
(209, 68, 20, 224, 600.00, 'بنزين', '2026-03-01 16:28:57', 'expense', 'expenses/K10qoZ3F6GrM7okTSwn164YEQFJro79d1aCwsewV.jpg', '2026-03-01 16:28:57', '2026-03-01 16:28:57'),
(210, 19, 20, 223, 200.00, 'انتقالات', '2026-03-01 17:09:02', 'expense', 'expenses/kicDci9uyaZBvg4JQwg312jiL8MJbLrozczjoVYG.jpg', '2026-03-01 17:09:02', '2026-03-01 17:09:02'),
(211, 41, 20, 228, 80.00, 'أدوات نظافة', '2026-03-01 17:47:05', 'expense', 'expenses/3A5f0JtHx6qyyz9OeqyUtzU1gJ0GN10rXM8ZQuv9.jpg', '2026-03-01 17:47:05', '2026-03-01 17:47:05'),
(212, 51, 20, 230, 700.00, 'بنزين للسادات', '2026-03-01 20:56:48', 'expense', 'expenses/vPJgQ7q8rnGZHm3d8SA3flVKeFhRYndH0MYIgG4I.jpg', '2026-03-01 20:56:48', '2026-03-01 20:56:48'),
(213, 68, 20, 226, 700.00, 'بنزين - كارتة', '2026-03-02 16:24:17', 'expense', 'expenses/Cc4jU45jG6xhsnrDtDh0RSeO6yWH2FG80IMBajwz.jpg', '2026-03-02 16:24:17', '2026-03-02 16:24:17'),
(214, 66, 20, 229, 100.00, 'انتقالات', '2026-03-02 16:29:17', 'expense', 'expenses/UG9wNlcv7d3LPtydz468t3NkPo1SB8Mm2WF2umTw.jpg', '2026-03-02 16:29:17', '2026-03-02 16:29:17'),
(215, 2, 20, 232, 188.00, 'انتقالات', '2026-03-02 18:13:21', 'expense', 'expenses/xvJRUMTF3XbQ1zMQ0SiplZdV9HLjD0T6l53gTRWE.jpg', '2026-03-02 18:13:21', '2026-03-02 18:13:21'),
(216, 66, 20, 233, 100.00, 'انتقالات', '2026-03-03 16:06:42', 'expense', 'expenses/i1SPYmjjMFIU3VdtAMM4d93z2EXtEYmi7AtxRPlX.jpg', '2026-03-03 16:06:42', '2026-03-03 16:06:42'),
(217, 68, 20, 237, 200.00, 'بنزين', '2026-03-03 17:22:05', 'expense', 'expenses/2Usl7CB1bawwuapYIb8s3ds35FwA4SW8eG2mUYyx.jpg', '2026-03-03 17:22:05', '2026-03-03 17:22:05'),
(218, 68, 20, 240, 200.00, 'بنزين', '2026-03-04 17:04:57', 'expense', 'expenses/GikAfXMnbu0IjIWgnFiGbfBDtsjVsHDKIWgtHQcl.jpg', '2026-03-04 17:04:57', '2026-03-04 17:04:57'),
(219, 63, 20, 242, 61.00, 'انتقالات مصلحة الضرائب فرع الهرم', '2026-03-04 19:53:25', 'expense', 'expenses/7EmEvxghfXATSFhf16C6KHnb3euwlxolspHwBuBO.jpg', '2026-03-04 19:53:25', '2026-03-04 19:53:25'),
(220, 41, 20, 243, 770.00, 'شراء ورق A4 - انتقالات', '2026-03-04 20:18:02', 'expense', 'expenses/2hiSbwDl8b2O3nIZANFUlzT9jnm1Zpvr3k9fVOhQ.jpg', '2026-03-04 20:18:02', '2026-03-04 20:18:02'),
(221, 42, 20, 244, 1670.00, 'شراء داكتات - انتقالات', '2026-03-04 20:22:14', 'expense', 'expenses/Klob9nkf3u3dlvWRjF10gOGZSBfId45fPfyp4boB.jpg', '2026-03-04 20:22:14', '2026-03-04 20:22:14'),
(222, 51, 20, 239, 400.00, 'بنزين', '2026-03-05 19:59:44', 'expense', 'expenses/vcKR7tOdcG6ghoGkBEmtntPUs1YiT9r4fewvC5EO.jpg', '2026-03-05 19:59:44', '2026-03-05 19:59:44'),
(223, 51, 20, 241, 300.00, 'بنزين', '2026-03-05 20:02:20', 'expense', 'expenses/7ZPR5PX7M8pq7SkdnklVH0d2Xn9HF8XNDDRU23Nn.jpg', '2026-03-05 20:02:20', '2026-03-05 20:02:20'),
(224, 39, 20, 247, 550.00, 'بنزين - كارتة', '2026-03-05 20:29:54', 'expense', 'expenses/h38J57WqODoNdy67qlll2nKW7YVJNbb5jMOFUg1v.jpg', '2026-03-05 20:29:54', '2026-03-05 20:29:54'),
(225, 17, 20, 246, 600.00, 'انتقالات الي المطار', '2026-03-08 16:08:03', 'expense', 'expenses/n6meQZGYwzDOWzwmz46TpJJpy4sDje94lCtzfWK5.jpg', '2026-03-08 16:08:03', '2026-03-08 16:08:03'),
(228, 63, 20, 254, 15.00, 'انتقالات بنك اسكندرية', '2026-03-08 19:25:14', 'expense', 'expenses/YgWPkzOfraY7qAOSP3eC5N5VFqeujHpSC5Q3FIrV.jpg', '2026-03-08 19:25:14', '2026-03-08 19:25:14'),
(229, 66, 20, 253, 50.00, 'انتقالات', '2026-03-08 19:46:35', 'expense', 'expenses/ye1fZdDYMc6zL7uNKJ9xRjtyiGRCJNGjBbWSp84k.jpg', '2026-03-08 19:46:35', '2026-03-08 19:46:35'),
(230, 39, 20, 255, 690.00, 'بنزين', '2026-03-08 19:59:49', 'expense', 'expenses/ZMAdBjQFbwe2tZMn1WUc1WJ2D2JxU9AzN7QYsH9A.jpg', '2026-03-08 19:59:49', '2026-03-08 19:59:49'),
(231, 41, 20, 258, 25.00, 'انتقالات بنك ADIB', '2026-03-09 15:06:52', 'expense', 'expenses/Qz0it5PLohuR1EGzZnevsQczUZgqoFSpFP9A15IB.jpg', '2026-03-09 15:06:52', '2026-03-09 15:06:52'),
(232, 68, 20, 238, 100.00, 'كارتة - أوبر موتوسيكل', '2026-03-09 15:56:27', 'expense', 'expenses/42JJ1HYvSs8xVJhRCwYKMq7sCS3w7yjuMRVH3Ndc.jpg', '2026-03-09 15:56:27', '2026-03-09 15:56:27'),
(233, 17, 20, 260, 226.00, 'اوير الي غبور', '2026-03-09 16:30:14', 'expense', 'expenses/rvE4AxpAgXY0VstH6VMKF7OTqskBEoEWCrwpBhlJ.jpg', '2026-03-09 16:30:14', '2026-03-09 16:30:14'),
(235, 66, 20, 263, 110.00, 'انتقالات للزمالك ( أوبر موتوسيكل)', '2026-03-10 15:32:22', 'expense', 'expenses/rxCq55vrDFUrDD42TTM8dJlQPXVGZmy6jUNuWlp6.jpg', '2026-03-10 15:32:22', '2026-03-10 15:32:22'),
(236, 19, 20, 264, 135.00, 'انتقالات مدرسة السلام', '2026-03-10 15:39:52', 'expense', 'expenses/OTUW4EHHMhHUYhqCNN3HTiKIuwfsAarPOPQWsNLG.jpg', '2026-03-10 15:39:52', '2026-03-10 15:39:52'),
(237, 68, 20, 259, 400.00, 'بنزين', '2026-03-10 15:44:00', 'expense', 'expenses/AlA07m4SV8417LEX7OxBqkbCcmFKI9KkFx5ZvfCe.jpg', '2026-03-10 15:44:00', '2026-03-10 15:44:00'),
(238, 63, 20, 266, 32.00, 'انتقالات مدرسة الزهراء - بنك اسكندرية', '2026-03-10 18:27:11', 'expense', 'expenses/rG1yYLD6qALMLtqGyJ4ImD161Pv41bnzAW2ML8ps.jpg', '2026-03-10 18:27:11', '2026-03-10 18:27:11'),
(239, 19, 20, 267, 180.00, 'أوبر موتوسيكل الي سعد الدين للغازات', '2026-03-10 19:49:08', 'expense', 'expenses/BoVxiQoh8v8HHqZeMtyDBFFtFfVrW5ZcMz2fGLA5.jpg', '2026-03-10 19:49:08', '2026-03-10 19:49:08'),
(240, 19, 20, 271, 150.00, 'اوبر', '2026-03-11 18:06:24', 'expense', 'expenses/wxUZc9izv1ddy1mSAHJWDqBkJjgeVehncPWMv7WC.jpg', '2026-03-11 18:06:24', '2026-03-11 18:06:24'),
(241, 41, 20, 273, 365.00, 'أدوات نظافة', '2026-03-11 19:48:20', 'expense', 'expenses/mGnhEQfe3XFBjTwd1bPuvIQvu8eIP1LxD72HrxPq.jpg', '2026-03-11 19:48:20', '2026-03-11 19:48:20'),
(242, 63, 20, 274, 250.00, 'انتقالات اية وشروق الي كورتك', '2026-03-11 20:03:09', 'expense', 'expenses/1Oq2M4v5wMsti6f0xaWOYVPGE2oCR1rPYnsfnzQb.jpg', '2026-03-11 20:03:09', '2026-03-11 20:03:09'),
(243, 68, 20, 265, 500.00, 'بنزين', '2026-03-12 15:43:43', 'expense', 'expenses/m2gPiX3R4GE0ZskGX49HUiusfLO6xKzJblT3Hy6E.jpg', '2026-03-12 15:43:43', '2026-03-12 15:43:43'),
(244, 66, 20, 277, 90.00, 'انتقالات الي وركس', '2026-03-12 15:45:21', 'expense', 'expenses/XJNBvbS8LKgt5vuCDFRjpslEuq5YB8I0VyWpkDm6.jpg', '2026-03-12 15:45:21', '2026-03-12 15:45:21'),
(245, 63, 20, 280, 25.00, 'انتقالات بنك اسكندرية', '2026-03-12 20:32:21', 'expense', 'expenses/sp1gVQSj1R79clYJgDpHlFK7lLiLw8WTEBaxt9PN.jpg', '2026-03-12 20:32:21', '2026-03-12 20:32:21'),
(246, 2, 20, 281, 913.00, 'انتقالات للمطار ذهاب وعودة ( يومين ) - انتقالات جامعه اسلسكا ذهاب وعودة - كارتة', '2026-03-14 17:26:05', 'expense', 'expenses/9r35TGksJoL57rMH8LwDrEXeyxlnropZux0YpZ1l.jpg', '2026-03-14 17:26:05', '2026-03-14 17:26:05'),
(247, 41, 20, 282, 50.00, 'مشتريات', '2026-03-14 20:17:35', 'expense', 'expenses/eNMLqmvwso5dwPXC7qpSunrE1Ei0qH9gZGCQXVRc.jpg', '2026-03-14 20:17:35', '2026-03-14 20:17:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_advance_id_foreign` (`advance_id`),
  ADD KEY `expenses_storedby_id_foreign` (`user_id`),
  ADD KEY `expenses_stored_by_foreign` (`stored_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_advance_id_foreign` FOREIGN KEY (`advance_id`) REFERENCES `advances` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `expenses_stored_by_foreign` FOREIGN KEY (`stored_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `expenses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

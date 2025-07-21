-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 16, 2025 at 12:08 PM
-- Server version: 5.7.23-23
-- PHP Version: 8.1.32

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
-- Table structure for table `advances`
--

CREATE TABLE `advances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('accepted','declined','pending') COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `given_at` timestamp NULL DEFAULT NULL,
  `given_by` bigint(20) UNSIGNED DEFAULT NULL,
  `method` enum('cash','insta','bank','wallet') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED DEFAULT NULL,
  `visit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `check_in_time` timestamp NULL DEFAULT NULL,
  `check_out_time` timestamp NULL DEFAULT NULL,
  `in_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `out_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_late` tinyint(1) NOT NULL DEFAULT '0',
  `type` enum('project','visit','internal','external') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'project',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `user_id`, `project_id`, `visit_id`, `check_in_time`, `check_out_time`, `in_location`, `out_location`, `customer`, `is_late`, `type`, `created_at`, `updated_at`) VALUES
(35, 1, NULL, 28, '2025-07-03 00:02:33', '2025-07-03 02:07:54', 'غير محدد', '30.0931189,31.3284174', NULL, 1, 'visit', '2025-07-03 00:02:33', '2025-07-03 02:07:54'),
(36, 2, 30, NULL, '2025-07-03 00:03:29', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 00:03:29', '2025-07-03 00:03:29'),
(37, 25, 35, NULL, '2025-07-03 00:04:26', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 00:04:26', '2025-07-03 00:04:26'),
(38, 24, NULL, NULL, '2025-07-03 01:15:23', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-03 01:15:23', '2025-07-03 01:15:23'),
(39, 20, NULL, NULL, '2025-07-03 01:15:48', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-03 01:15:48', '2025-07-03 01:15:48'),
(40, 19, NULL, NULL, '2025-07-03 01:16:12', NULL, 'غير محدد', NULL, 'امبريال تركيب كاميرات', 1, 'external', '2025-07-03 01:16:12', '2025-07-03 01:16:12'),
(41, 21, NULL, NULL, '2025-07-03 01:16:24', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-03 01:16:24', '2025-07-03 01:16:24'),
(63, 7, NULL, NULL, '2025-07-03 15:21:51', NULL, '29.9878539,31.1417592', NULL, NULL, 1, 'internal', '2025-07-03 15:21:51', '2025-07-03 15:21:51'),
(68, 3, 36, NULL, '2025-07-03 15:53:40', NULL, '27.2995749,33.7324456', NULL, NULL, 1, 'project', '2025-07-03 15:53:40', '2025-07-03 15:53:40'),
(70, 6, 36, NULL, '2025-07-03 15:57:21', NULL, '27.2995772,33.7324513', NULL, NULL, 1, 'project', '2025-07-03 15:57:21', '2025-07-03 15:57:21'),
(71, 2, NULL, NULL, '2025-07-03 15:57:41', NULL, '29.9878583,31.1417519', NULL, NULL, 1, 'internal', '2025-07-03 15:57:41', '2025-07-03 15:57:41'),
(72, 19, NULL, NULL, '2025-07-03 16:07:51', NULL, '29.9878501,31.141753', NULL, NULL, 1, 'internal', '2025-07-03 16:07:51', '2025-07-03 16:07:51'),
(73, 6, 36, NULL, '2025-07-02 02:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:14:22', '2025-07-03 20:14:22'),
(74, 3, 36, NULL, '2025-07-02 02:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:15:03', '2025-07-03 20:15:03'),
(75, 2, 35, NULL, '2025-07-02 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:18:16', '2025-07-03 20:18:16'),
(76, 19, 35, NULL, '2025-07-02 03:30:00', NULL, 'غير محدد', NULL, 'امبريال', 1, 'external', '2025-07-03 20:19:10', '2025-07-03 20:19:10'),
(77, 16, 35, NULL, '2025-07-02 03:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:19:31', '2025-07-03 20:19:31'),
(78, 17, 35, NULL, '2025-07-02 03:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:19:46', '2025-07-03 20:19:46'),
(79, 18, 35, NULL, '2025-07-02 03:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:19:57', '2025-07-03 20:19:57'),
(80, 18, NULL, NULL, '2025-07-02 03:00:00', NULL, 'غير محدد', NULL, 'المطار', 1, 'external', '2025-07-03 20:22:40', '2025-07-03 20:22:40'),
(81, 25, 35, NULL, '2025-07-02 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:23:31', '2025-07-03 20:23:31'),
(82, 16, 35, NULL, '2025-07-03 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:24:09', '2025-07-03 20:24:09'),
(83, 6, 36, NULL, '2025-07-03 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:24:46', '2025-07-03 20:24:46'),
(84, 3, 36, NULL, '2025-07-03 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-03 20:25:30', '2025-07-03 20:25:30'),
(89, 17, NULL, NULL, '2025-07-03 20:12:00', NULL, 'غير محدد', NULL, 'بنك ناصر فرع الطور', 1, 'external', '2025-07-03 23:12:56', '2025-07-03 23:12:56'),
(90, 18, NULL, NULL, '2025-07-03 20:12:00', NULL, 'غير محدد', NULL, 'بنك ناصر فرع الطور', 1, 'external', '2025-07-03 23:13:38', '2025-07-03 23:13:38'),
(91, 6, NULL, NULL, '2025-07-05 14:16:33', NULL, '29.9875811,31.1417845', NULL, NULL, 0, 'internal', '2025-07-05 14:16:33', '2025-07-05 14:16:33'),
(92, 2, NULL, NULL, '2025-07-05 14:51:53', NULL, '29.9870423,31.1419024', NULL, NULL, 0, 'internal', '2025-07-05 14:51:53', '2025-07-05 14:51:53'),
(93, 20, NULL, NULL, '2025-07-05 20:47:07', NULL, '29.9878599,31.1417504', NULL, NULL, 1, 'internal', '2025-07-05 20:47:07', '2025-07-05 20:47:07'),
(94, 17, NULL, NULL, '2025-07-05 03:00:00', NULL, 'غير محدد', NULL, 'بنك ناصر فرع اللطور', 1, 'external', '2025-07-05 21:00:54', '2025-07-05 21:00:54'),
(95, 17, NULL, NULL, '2025-07-06 03:00:00', NULL, 'غير محدد', NULL, 'بنك ناصر فرع اللطور', 1, 'external', '2025-07-05 21:01:08', '2025-07-05 21:01:08'),
(96, 18, NULL, NULL, '2025-07-06 03:00:00', NULL, 'غير محدد', NULL, 'بنك ناصر فرع اللطور', 1, 'external', '2025-07-05 21:01:24', '2025-07-05 21:01:24'),
(97, 18, NULL, NULL, '2025-07-05 03:00:00', NULL, 'غير محدد', NULL, 'بنك ناصر فرع اللطور', 1, 'external', '2025-07-05 21:01:32', '2025-07-05 21:01:32'),
(98, 1, NULL, NULL, '2025-07-05 21:04:38', NULL, '29.9817151,31.1373763', NULL, NULL, 1, 'internal', '2025-07-05 21:04:38', '2025-07-05 21:04:38'),
(99, 39, NULL, NULL, '2025-07-06 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:07:21', '2025-07-05 21:07:21'),
(100, 39, NULL, NULL, '2025-07-04 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:07:30', '2025-07-05 21:07:30'),
(101, 39, NULL, NULL, '2025-07-03 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:07:35', '2025-07-05 21:07:35'),
(102, 39, NULL, NULL, '2025-07-02 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:07:40', '2025-07-05 21:07:40'),
(103, 39, NULL, NULL, '2025-06-02 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:07:53', '2025-07-05 21:07:53'),
(104, 39, NULL, NULL, '2025-06-03 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:08:00', '2025-07-05 21:08:00'),
(105, 39, NULL, NULL, '2025-06-04 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:08:07', '2025-07-05 21:08:07'),
(106, 39, NULL, NULL, '2025-06-05 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:08:13', '2025-07-05 21:08:13'),
(107, 39, NULL, NULL, '2025-06-06 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 21:08:18', '2025-07-05 21:08:18'),
(108, 25, 35, NULL, '2025-07-06 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-05 21:10:31', '2025-07-05 21:10:31'),
(109, 19, 35, NULL, '2025-07-06 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-05 21:10:48', '2025-07-05 21:10:48'),
(110, 6, 35, NULL, '2025-07-06 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-05 21:10:57', '2025-07-05 21:10:57'),
(111, 2, 37, NULL, '2025-07-06 03:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-05 21:11:35', '2025-07-05 21:11:35'),
(112, 25, 35, NULL, '2025-07-03 15:18:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-05 21:18:50', '2025-07-05 21:18:50'),
(113, 37, NULL, NULL, '2025-07-01 23:34:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:34:51', '2025-07-05 23:34:51'),
(114, 37, NULL, NULL, '2025-07-02 15:17:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:35:15', '2025-07-05 23:35:15'),
(115, 37, NULL, NULL, '2025-07-03 15:05:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:35:33', '2025-07-05 23:35:33'),
(116, 40, NULL, NULL, '2025-07-01 16:20:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:36:56', '2025-07-05 23:36:56'),
(117, 40, NULL, NULL, '2025-07-02 16:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:37:08', '2025-07-05 23:37:08'),
(118, 40, NULL, NULL, '2025-07-03 16:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:37:24', '2025-07-05 23:37:24'),
(119, 22, NULL, NULL, '2025-07-02 04:38:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:38:58', '2025-07-05 23:38:58'),
(120, 22, NULL, NULL, '2025-07-03 05:38:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:40:00', '2025-07-05 23:40:00'),
(121, 22, NULL, NULL, '2025-07-04 05:38:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:40:10', '2025-07-05 23:40:10'),
(122, 22, NULL, NULL, '2025-07-06 05:38:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-05 23:40:20', '2025-07-05 23:40:20'),
(123, 2, NULL, NULL, '2025-07-06 14:03:49', NULL, '29.987757,31.1417007', NULL, NULL, 0, 'internal', '2025-07-06 14:03:49', '2025-07-06 14:03:49'),
(124, 2, NULL, NULL, '2025-07-07 14:35:29', NULL, '29.9872032,31.1426264', NULL, NULL, 0, 'internal', '2025-07-07 14:35:29', '2025-07-07 14:35:29'),
(125, 6, NULL, NULL, '2025-07-06 15:12:00', NULL, 'غير محدد', NULL, 'السادات العبور', 1, 'external', '2025-07-08 01:13:12', '2025-07-08 01:13:12'),
(126, 16, NULL, NULL, '2025-07-06 15:12:00', NULL, 'غير محدد', NULL, 'السادات العبور', 1, 'external', '2025-07-08 01:14:02', '2025-07-08 01:14:02'),
(127, 25, NULL, NULL, '2025-07-06 15:12:00', NULL, 'غير محدد', NULL, 'السادات العبور', 1, 'external', '2025-07-08 01:14:14', '2025-07-08 01:14:14'),
(128, 17, NULL, NULL, '2025-07-06 15:12:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-08 01:16:06', '2025-07-08 01:16:06'),
(129, 17, NULL, NULL, '2025-07-07 15:12:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-08 01:16:14', '2025-07-08 01:16:14'),
(130, 18, NULL, NULL, '2025-07-07 15:12:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-08 01:16:25', '2025-07-08 01:16:25'),
(131, 18, NULL, NULL, '2025-07-06 15:12:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-08 01:16:34', '2025-07-08 01:16:34'),
(132, 38, NULL, NULL, '2025-07-06 15:12:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-08 01:17:21', '2025-07-08 01:17:21'),
(133, 38, NULL, NULL, '2025-07-07 15:12:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-08 01:17:56', '2025-07-08 01:17:56'),
(134, 25, 35, NULL, '2025-07-07 16:01:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-08 01:18:54', '2025-07-08 01:18:54'),
(135, 6, 35, NULL, '2025-07-07 16:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-08 01:20:43', '2025-07-08 01:20:43'),
(136, 19, NULL, NULL, '2025-07-06 15:23:00', NULL, 'غير محدد', NULL, 'امبريال', 1, 'external', '2025-07-08 01:23:21', '2025-07-08 01:23:21'),
(137, 18, 37, NULL, '2025-07-02 15:25:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-08 01:25:31', '2025-07-08 01:25:31'),
(138, 2, NULL, NULL, '2025-07-08 15:25:40', NULL, '29.9867807,31.1418677', NULL, 'تكنو صينت', 1, 'external', '2025-07-08 15:25:40', '2025-07-08 15:25:40'),
(139, 6, NULL, NULL, '2025-07-08 15:30:00', NULL, 'غير محدد', NULL, 'اسيوط', 1, 'external', '2025-07-09 00:58:28', '2025-07-09 00:58:28'),
(140, 19, NULL, NULL, '2025-07-08 15:30:00', NULL, 'غير محدد', NULL, 'امبريال', 1, 'external', '2025-07-09 01:02:33', '2025-07-09 01:02:33'),
(141, 17, NULL, NULL, '2025-07-08 15:30:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-09 01:03:16', '2025-07-09 01:03:16'),
(142, 18, NULL, NULL, '2025-07-08 15:30:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-09 01:03:27', '2025-07-09 01:03:27'),
(143, 16, 35, NULL, '2025-07-08 03:17:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-09 01:36:20', '2025-07-09 01:36:20'),
(144, 39, NULL, NULL, '2025-07-08 08:16:00', NULL, 'غير محدد', NULL, NULL, 0, 'internal', '2025-07-09 08:16:38', '2025-07-09 08:16:38'),
(145, 2, NULL, NULL, '2025-07-09 14:55:18', NULL, '29.9893055,31.1370634', NULL, NULL, 0, 'internal', '2025-07-09 14:55:18', '2025-07-09 14:55:18'),
(146, 1, NULL, 33, '2025-07-09 18:54:34', '2025-07-09 20:21:33', '29.951122,31.0905579', '29.9510932,31.0905223', NULL, 1, 'visit', '2025-07-09 18:54:34', '2025-07-09 20:21:33'),
(147, 2, NULL, NULL, '2025-07-10 15:33:44', NULL, '30.1105149,31.3972606', NULL, 'مطار القاهره الدولي', 1, 'external', '2025-07-10 15:33:44', '2025-07-10 15:33:44'),
(148, 6, NULL, NULL, '2025-07-12 14:10:39', NULL, '29.9876501,31.1415041', NULL, NULL, 0, 'internal', '2025-07-12 14:10:39', '2025-07-12 14:10:39'),
(149, 2, NULL, NULL, '2025-07-12 14:19:14', NULL, '29.9871033,31.1424401', NULL, NULL, 0, 'internal', '2025-07-12 14:19:14', '2025-07-12 14:19:14'),
(150, 17, NULL, 34, '2025-07-12 16:23:49', NULL, '29.9878592,31.1417679', NULL, NULL, 1, 'visit', '2025-07-12 16:23:49', '2025-07-12 16:23:49'),
(151, 6, NULL, NULL, '2025-07-13 14:08:04', NULL, '29.9874797,31.1418787', NULL, NULL, 0, 'internal', '2025-07-13 14:08:04', '2025-07-13 14:08:04'),
(152, 2, NULL, NULL, '2025-07-13 14:28:09', NULL, '29.98696,31.1417278', NULL, NULL, 0, 'internal', '2025-07-13 14:28:09', '2025-07-13 14:28:09'),
(153, 2, 30, NULL, '2025-07-13 15:29:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 19:19:05', '2025-07-13 19:19:05'),
(154, 19, 30, NULL, '2025-07-13 15:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 20:03:41', '2025-07-13 20:03:41'),
(155, 25, 30, NULL, '2025-07-13 15:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 20:04:07', '2025-07-13 20:04:07'),
(156, 6, 41, NULL, '2025-07-13 17:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 20:04:56', '2025-07-13 20:04:56'),
(157, 6, 29, NULL, '2025-07-09 15:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 22:53:36', '2025-07-13 22:53:36'),
(158, 6, 35, NULL, '2025-07-12 14:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 22:59:17', '2025-07-13 22:59:17'),
(160, 2, 35, NULL, '2025-07-12 14:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 23:01:02', '2025-07-13 23:01:02'),
(161, 19, 35, NULL, '2025-07-12 14:30:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 23:01:20', '2025-07-13 23:01:20'),
(162, 17, 35, NULL, '2025-07-12 15:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 23:01:56', '2025-07-13 23:01:56'),
(163, 25, 35, NULL, '2025-07-12 15:08:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 23:02:43', '2025-07-13 23:02:43'),
(164, 25, 35, NULL, '2025-07-10 15:08:00', NULL, 'غير محدد', NULL, 'السادات', 1, 'external', '2025-07-13 23:11:01', '2025-07-13 23:11:01'),
(165, 25, 35, NULL, '2025-07-09 15:12:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 23:12:42', '2025-07-13 23:12:42'),
(166, 19, 35, NULL, '2025-07-09 15:16:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-13 23:16:36', '2025-07-13 23:16:36'),
(167, 19, 35, NULL, '2025-07-10 15:16:00', NULL, 'غير محدد', NULL, 'السادات', 1, 'external', '2025-07-13 23:17:10', '2025-07-13 23:17:10'),
(168, 17, NULL, NULL, '2025-07-09 15:01:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-13 23:27:20', '2025-07-13 23:27:20'),
(169, 17, NULL, NULL, '2025-07-10 15:01:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-13 23:27:37', '2025-07-13 23:27:37'),
(170, 18, NULL, NULL, '2025-07-09 15:29:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-13 23:29:43', '2025-07-13 23:29:43'),
(171, 18, NULL, NULL, '2025-07-10 15:29:00', NULL, 'غير محدد', NULL, 'الطور', 1, 'external', '2025-07-13 23:29:56', '2025-07-13 23:29:56'),
(172, 1, NULL, 35, '2025-07-14 20:17:31', '2025-07-14 20:28:37', '30.013373,31.3159675', '30.0133841,31.3159528', NULL, 1, 'visit', '2025-07-14 20:17:31', '2025-07-14 20:28:37'),
(173, 2, 30, NULL, '2025-07-14 15:00:00', '2025-07-14 23:29:00', 'غير محدد', 'غير محدد', NULL, 1, 'project', '2025-07-14 20:45:16', '2025-07-15 18:23:38'),
(174, 25, 30, NULL, '2025-07-14 15:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-14 20:45:33', '2025-07-14 20:45:33'),
(175, 17, 30, NULL, '2025-07-14 15:00:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-14 20:45:52', '2025-07-14 20:45:52'),
(177, 6, 41, NULL, '2025-07-15 16:45:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-15 17:08:01', '2025-07-15 17:08:01'),
(178, 25, 41, NULL, '2025-07-15 16:45:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-15 17:08:07', '2025-07-15 17:08:07'),
(179, 17, 41, NULL, '2025-07-15 16:45:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-15 17:08:11', '2025-07-15 17:08:11'),
(180, 19, 41, NULL, '2025-07-15 16:45:00', NULL, 'غير محدد', NULL, NULL, 1, 'project', '2025-07-15 17:08:18', '2025-07-15 17:08:18'),
(181, 6, 41, NULL, '2025-07-16 14:16:18', NULL, '29.987457,31.1418832', NULL, NULL, 0, 'project', '2025-07-16 14:16:18', '2025-07-16 14:16:18'),
(182, 2, NULL, NULL, '2025-07-16 14:38:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-16 17:06:02', '2025-07-16 17:06:02'),
(183, 2, 30, NULL, '2025-07-16 17:56:34', NULL, '30.0492915,31.048739', NULL, NULL, 1, 'project', '2025-07-16 17:56:34', '2025-07-16 17:56:34'),
(184, 19, NULL, NULL, '2025-07-16 14:20:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-16 19:27:59', '2025-07-16 19:27:59'),
(185, 25, NULL, NULL, '2025-07-16 14:35:00', NULL, 'غير محدد', NULL, NULL, 1, 'internal', '2025-07-16 19:28:18', '2025-07-16 19:28:18');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_admin@admin.com|196.218.49.74', 'i:1;', 1746358692),
('laravel_cache_admin@admin.com|196.218.49.74:timer', 'i:1746358692;', 1746358692),
('laravel_cache_proj@trustits.net|196.218.49.74', 'i:1;', 1748167076),
('laravel_cache_proj@trustits.net|196.218.49.74:timer', 'i:1748167076;', 1748167076),
('laravel_cache_project.mgr@trustits.net|156.193.215.70', 'i:1;', 1748347513),
('laravel_cache_project.mgr@trustits.net|156.193.215.70:timer', 'i:1748347513;', 1748347513),
('trustits_work_cache_admin@trustits.net|156.208.215.251', 'i:1;', 1750192352),
('trustits_work_cache_admin@trustits.net|156.208.215.251:timer', 'i:1750192352;', 1750192352),
('trustits_work_cache_ahmed.saied@trustits.net|102.59.190.194', 'i:1;', 1751409003),
('trustits_work_cache_ahmed.saied@trustits.net|102.59.190.194:timer', 'i:1751409003;', 1751409003),
('trustits_work_cache_m.adel@trustirs.net|102.63.155.48', 'i:2;', 1751524170),
('trustits_work_cache_m.adel@trustirs.net|102.63.155.48:timer', 'i:1751524170;', 1751524170),
('trustits_work_cache_madel@trustits.net|102.63.155.48', 'i:1;', 1751444520),
('trustits_work_cache_madel@trustits.net|102.63.155.48:timer', 'i:1751444520;', 1751444520),
('trustits_work_cache_mahmoudsalem475@gmail.com|105.201.117.45', 'i:2;', 1752517725),
('trustits_work_cache_mahmoudsalem475@gmail.com|105.201.117.45:timer', 'i:1752517725;', 1752517725),
('trustits_work_cache_mahmoudsalem475@gmail.com|156.185.217.59', 'i:1;', 1752558774),
('trustits_work_cache_mahmoudsalem475@gmail.com|156.185.217.59:timer', 'i:1752558774;', 1752558774),
('trustits_work_cache_moatafa@trustits.net|196.136.174.93', 'i:2;', 1752504937),
('trustits_work_cache_moatafa@trustits.net|196.136.174.93:timer', 'i:1752504937;', 1752504937),
('trustits_work_cache_moatafa@trustits.net|197.45.87.48', 'i:1;', 1751433363),
('trustits_work_cache_moatafa@trustits.net|197.45.87.48:timer', 'i:1751433363;', 1751433363),
('trustits_work_cache_msalah@trustits.net|156.206.110.39', 'i:2;', 1750444919),
('trustits_work_cache_msalah@trustits.net|156.206.110.39:timer', 'i:1750444919;', 1750444919),
('trustits_work_cache_proj.mgr@trustits.net|156.193.255.83', 'i:3;', 1752311702),
('trustits_work_cache_proj.mgr@trustits.net|156.193.255.83:timer', 'i:1752311702;', 1752311702),
('trustits_work_cache_radwa@trustits.net|156.193.170.254', 'i:1;', 1750676273),
('trustits_work_cache_radwa@trustits.net|156.193.170.254:timer', 'i:1750676273;', 1750676273),
('trustits_work_cache_salem@trustits.net|105.201.117.45', 'i:3;', 1752517750),
('trustits_work_cache_salem@trustits.net|105.201.117.45:timer', 'i:1752517750;', 1752517750),
('trustits_work_cache_salem@trustits.net|156.185.217.59', 'i:1;', 1752558743),
('trustits_work_cache_salem@trustits.net|156.185.217.59:timer', 'i:1752558743;', 1752558743),
('trustits_work_cache_salem@trustits.net|156.193.255.83', 'i:1;', 1752645343),
('trustits_work_cache_salem@trustits.net|156.193.255.83:timer', 'i:1752645343;', 1752645343),
('trustits_work_cache_sif@trustits.net|102.59.221.212', 'i:4;', 1752431384),
('trustits_work_cache_sif@trustits.net|102.59.221.212:timer', 'i:1752431384;', 1752431384),
('trustits_work_cache_sif@trustits.net|102.61.127.243', 'i:5;', 1752526183),
('trustits_work_cache_sif@trustits.net|102.61.127.243:timer', 'i:1752526183;', 1752526183),
('trustits_work_cache_silver@trustits.net|156.193.170.254', 'i:1;', 1750676107),
('trustits_work_cache_silver@trustits.net|156.193.170.254:timer', 'i:1750676107;', 1750676107),
('trustits_work_cache_waleed@trustits.net|156.193.255.83', 'i:1;', 1752304387),
('trustits_work_cache_waleed@trustits.net|156.193.255.83:timer', 'i:1752304387;', 1752304387);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transport_fees` decimal(8,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `info` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `address`, `transport_fees`, `description`, `info`, `created_at`, `updated_at`) VALUES
(1, 'داسكو - المقر الرئيسي', 'hr@dasco-eg.com', 'المقطم شارع 9', 100.00, NULL, '..', '2025-05-07 08:17:51', '2025-05-25 07:57:06'),
(2, 'المصنع الوطنى', 'info@npf.com', 'اكتوبر المنطقه الصناعية', 200.00, NULL, NULL, '2025-05-07 09:06:46', '2025-05-07 09:07:27'),
(3, 'فاند فايزر', NULL, 'الشيخ زايد اكتوبر', 50.00, NULL, NULL, '2025-05-07 09:07:56', '2025-05-07 09:08:17'),
(4, 'Jk', 'Jk@jk.com', 'البوابه الرابعه حدائق الاهرام', 50.00, NULL, NULL, '2025-06-23 18:12:58', '2025-06-23 18:12:58'),
(5, 'تكنو ساينت', 'Info@techno.com', 'قطر الندى', 35.00, NULL, NULL, '2025-07-02 18:34:23', '2025-07-02 18:34:23'),
(6, 'سفارة إندونيسيا', 'admin@trustits.net', 'جاردن سيتي', 70.00, NULL, NULL, '2025-07-16 18:04:42', '2025-07-16 18:04:42');

-- --------------------------------------------------------

--
-- Table structure for table `deductions`
--

CREATE TABLE `deductions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `deducted_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `deductions`
--

INSERT INTO `deductions` (`id`, `user_id`, `type`, `amount`, `note`, `deducted_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'تامينات', 1000.00, NULL, '2025-05-06', '2025-05-06 12:01:57', '2025-05-06 12:01:57'),
(2, 2, 'ضرايب', 600.00, NULL, '2025-05-06', '2025-05-06 13:21:50', '2025-05-06 13:21:50'),
(3, 1, 'تأمينات', 256.00, 'مؤقت', '2025-07-02', '2025-07-03 00:28:20', '2025-07-03 00:28:20'),
(4, 3, 'تأمينات', 256.00, 'مؤقت', '2025-07-02', '2025-07-03 00:29:57', '2025-07-03 00:29:57');

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

-- --------------------------------------------------------

--
-- Table structure for table `extractions`
--

CREATE TABLE `extractions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('partial','final') COLLATE utf8mb4_unicode_ci NOT NULL,
  `supply` tinyint(1) NOT NULL DEFAULT '0',
  `partial_number` int(11) DEFAULT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_code` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `deductions_json` json DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `net_total` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `extractions`
--

INSERT INTO `extractions` (`id`, `project_id`, `type`, `supply`, `partial_number`, `customer_name`, `project_code`, `date`, `deductions_json`, `notes`, `net_total`, `created_at`, `updated_at`) VALUES
(26, 34, 'partial', 0, 1, '-', '1234', '2025-06-25', '{\"vat\": \"5\", \"taxes\": \"5\", \"other_tax\": \"0\", \"profit_tax\": \"1\", \"advance_payment\": \"0\", \"social_insurance\": \"3.6\", \"initial_insurance\": \"5\", \"previous_payments\": 0, \"progress_percentage\": \"80\"}', NULL, 102577.55, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(30, 41, 'partial', 1, 1, 'Ghabour', 'GB.P/SAF CCTV/Sadat/001049/2025', '2025-07-13', '{\"vat\": \"0\", \"taxes\": \"0\", \"other_tax\": \"0\", \"profit_tax\": \"0\", \"advance_payment\": \"0\", \"social_insurance\": \"0\", \"initial_insurance\": \"0\", \"previous_payments\": 0, \"progress_percentage\": \"100\"}', NULL, 723757.72, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(31, 29, 'partial', 1, 1, 'غبور اسيوط', 'GB.P/CCTV/Asuit/001030/2025', '2025-05-20', '{\"vat\": \"0\", \"taxes\": \"0\", \"other_tax\": \"0\", \"profit_tax\": \"0\", \"advance_payment\": \"0\", \"social_insurance\": \"0\", \"initial_insurance\": \"0\", \"previous_payments\": 0, \"progress_percentage\": \"50\"}', NULL, 949996.38, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(32, 29, 'partial', 0, 2, 'غبور اسيوط', 'GB.P/CCTV/Asuit/001030/2025', '2025-05-24', '{\"vat\": \"5\", \"taxes\": \"5\", \"other_tax\": \"0\", \"profit_tax\": \"1\", \"advance_payment\": \"0\", \"social_insurance\": \"3.6\", \"initial_insurance\": \"10\", \"previous_payments\": \"949996.38\", \"progress_percentage\": \"90\"}', NULL, 511152.35, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(34, 41, 'partial', 0, 2, 'Ghabour', 'GB.P/SAF CCTV/Sadat/001049/2025', '2025-07-17', '{\"vat\": \"5\", \"taxes\": \"5\", \"other_tax\": \"0\", \"profit_tax\": \"1\", \"advance_payment\": \"0\", \"social_insurance\": \"3.6\", \"initial_insurance\": \"10\", \"previous_payments\": \"723757.72\", \"progress_percentage\": \"70\"}', NULL, 711762.16, '2025-07-17 01:38:37', '2025-07-17 01:38:37');

-- --------------------------------------------------------

--
-- Table structure for table `extraction_items`
--

CREATE TABLE `extraction_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `extraction_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `previous_done` int(11) NOT NULL,
  `current_done` int(11) NOT NULL,
  `total_done` int(11) NOT NULL,
  `unit_price` decimal(15,2) NOT NULL,
  `progress_percentage` int(11) NOT NULL,
  `total` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `extraction_items`
--

INSERT INTO `extraction_items` (`id`, `extraction_id`, `title`, `unit`, `quantity`, `previous_done`, `current_done`, `total_done`, `unit_price`, `progress_percentage`, `total`, `created_at`, `updated_at`) VALUES
(6, 26, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks', 'number', 47.00, 0, 47, 47, 2340.20, 80, 87991.52, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(7, 26, 'R310786', 'number', 47.00, 0, 47, 47, 676.05, 80, 25419.48, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(8, 26, 'R302373', 'number', 47.00, 0, 47, 47, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(9, 26, 'R875979', 'number', 47.00, 0, 47, 47, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(10, 26, 'R302310', 'number', 47.00, 0, 47, 47, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(11, 26, 'R138872', 'number', 1.00, 0, 1, 1, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(12, 26, 'Supply & Install 19\" 1 U Patch Panel UTP CAT-6 24 port', 'number', 3.00, 0, 3, 3, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(13, 26, 'R35057', 'number', 5.00, 0, 5, 5, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(14, 26, 'Supply & Install Trays 10*5 with cover including all fixing and installation,  accessori', 'meter', 100.00, 0, 100, 100, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(15, 26, 'Supply & Install steel mast for camera 50*200 mm', 'number', 3.00, 0, 3, 3, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(16, 26, 'Supply & Install steel mast for camera 100*400 mm', 'number', 2.00, 0, 2, 2, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(17, 26, 'Supply & Install thermal Flexible', 'meter', 150.00, 0, 150, 150, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(18, 26, 'Supply & Install UPVC Pipes 3\'\'', 'meter', 15.00, 0, 15, 15, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(19, 26, 'Supply & Instal hnspection man hole 60cm x 60cm x 60cm with cover steel', 'number', 2.00, 0, 2, 2, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(20, 26, 'Supply & Install UPS 3K ( minimum 15 minuts output)', 'number', 1.00, 0, 1, 1, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(21, 26, 'Supply & Install power outlet with cables 3*4 mm to supply the main rack', 'ls', 1.00, 0, 1, 1, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(22, 26, 'Civil Work', 'ls', 15.00, 0, 15, 15, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(23, 26, 'Testing & commissioning', 'ls', 1.00, 0, 1, 1, 0.00, 80, 0.00, '2025-06-26 01:13:31', '2025-06-26 01:13:31'),
(40, 30, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', 'number', 70.00, 0, 70, 70, 1650.81, 48, 55467.22, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(41, 30, 'Connection module cat .6, 1xRJ45/u, 10x', 'number', 70.00, 0, 70, 70, 229.28, 48, 7703.81, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(42, 30, 'Supply & Install Patch Cord CAT. 6 ,U/UTP , gray, RJ45/s-RJ45/s,3 m.', 'number', 70.00, 0, 70, 70, 1742.52, 48, 58548.67, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(43, 30, 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m.', 'number', 70.00, 0, 70, 70, 1375.67, 48, 46222.51, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(44, 30, 'Supply & Install 19\" 12 u IP 55 outdoor rack 600x600 mm with PDU source power fully loaded', 'number', 1.00, 0, 1, 1, 55026.94, 48, 26412.93, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(45, 30, 'supply & install Fiber Cable Single Mode central loose tube cable outdoor- use, CSTA - steel tape armour, HDPE sheath - black , 01x24-fibers G652.D', 'meter', 650.00, 0, 650, 650, 247.62, 48, 77257.44, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(46, 30, 'Supply & Install Patch cord fiber LC-Duplex PC-LC Duplex PC ,blue/blue,G.652.d,c/2,F8 2.0x4.1 mm , 3 m', 'number', 22.00, 0, 22, 22, 1283.96, 48, 13558.62, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(47, 30, 'Supply & Install 19\" 1 U Patch Panel 24 P UTP CAT-6', 'number', 8.00, 0, 8, 8, 6878.37, 48, 26412.94, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(48, 30, 'Supply & Install Patch Panel fiber 12 port loaded', 'number', 9.00, 0, 2, 2, 13756.74, 48, 13206.47, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(49, 30, 'supply & install Cat6,U/ UTP,4P,450 MHZ,LSZH,grey,Eca 500 m', 'number', 9.00, 0, 7, 7, 21093.66, 48, 70874.70, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(50, 30, 'Supply & Install thermal Flexible', 'meter', 150.00, 0, 150, 150, 119.22, 48, 8583.84, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(51, 30, 'Supply & Install EMT Pipes 2\'\'', 'meter', 120.00, 0, 100, 100, 1375.67, 48, 66032.16, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(52, 30, 'Supply & Install cable Trays 10*5 with cover.', 'meter', 200.00, 0, 200, 200, 724.52, 48, 69553.92, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(53, 30, 'Supply & Install cover for Trays 10*5 .', 'meter', 240.00, 0, 240, 240, 366.85, 48, 42261.12, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(54, 30, 'Dismantling and reinstalling data racks on fences', 'number', 7.00, 0, 1, 1, 1650.81, 48, 792.39, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(55, 30, 'Supply & Install power outlet with cables 3*6m for feeding outdoor rackes', 'number', 8.00, 0, 8, 8, 36684.63, 48, 140868.98, '2025-07-17 00:04:04', '2025-07-17 00:04:04'),
(56, 31, 'R&M Fiber optic cable armored multimode 50/125 8cor', 'meter', 350.00, 0, 350, 350, 209.72, 50, 36701.00, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(57, 31, 'R&M Fiber optic sc connector simplex  multi', 'number', 20.00, 0, 20, 20, 151.00, 50, 1510.00, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(58, 31, 'R&M Fiber optic patch panel 12 port  loaded with 4sc coupler Duplex 50/125', 'number', 5.00, 0, 5, 5, 5872.00, 50, 14680.00, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(59, 31, 'R&M Fiber optic patch cord sc/lc Duplex multimode50/125 3m', 'number', 10.00, 0, 10, 10, 754.98, 50, 3774.90, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(60, 31, 'Supplying & install Galvanized pipes 1 inches overall box accessories', 'meter', 1500.00, 0, 1500, 1500, 293.60, 50, 220200.00, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(61, 31, 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', 'number', 6.00, 0, 6, 6, 3774.92, 50, 11324.76, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(62, 31, 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables.ر', 'meter', 75.00, 0, 75, 75, 629.15, 50, 23593.13, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(63, 31, 'R&M Supplying & install Single faceplate', 'number', 76.00, 0, 76, 76, 1090.53, 50, 41440.14, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(64, 31, 'R&M Supplying & install Cat6 UTP Patch Panel 24 Port', 'number', 5.00, 0, 5, 5, 3858.80, 50, 9647.00, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(65, 31, 'R&M Supplying , install & test Cat 6 4 pair UTP ( Box = 500M )', 'number', 15.00, 0, 15, 15, 43621.27, 50, 327159.52, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(66, 31, 'R&M Supplying & install UTP 1 MTcat6 patch cord RJ 45', 'number', 76.00, 0, 76, 76, 377.49, 50, 14344.62, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(67, 31, 'R&M Supplying & install UTP 3 MT cat6 patch cord RJ 45', 'number', 76.00, 0, 76, 76, 545.27, 50, 20720.26, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(68, 31, 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', 'number', 11.00, 0, 11, 11, 5452.66, 50, 29989.63, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(69, 31, 'Supplying & install Galvanized pole 4 inches x 3m with all accessories to be installed on the fence or street', 'number', 2.00, 0, 2, 2, 7549.84, 50, 7549.84, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(70, 31, 'Supplying & install Plastic ducts different sizes', 'meter', 400.00, 0, 400, 400, 234.88, 50, 46976.00, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(71, 31, 'supplying install thermal flexible', 'meter', 350.00, 0, 350, 350, 151.00, 50, 26425.00, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(72, 31, 'R&M Supplying & install Data rack 19\" 9u 600*560  include the Power distribution panel 6 way & fan unit', 'number', 3.00, 0, 3, 3, 10905.32, 50, 16357.98, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(73, 31, 'R&M Supplying & install Data rack 19\" 27u 800*1000 include the Power distribution panel 6 way & fan unit', 'number', 2.00, 0, 2, 2, 29360.47, 50, 29360.47, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(74, 31, 'Rack mounted UPS 1KVA 15 min', 'number', 4.00, 0, 4, 4, 20174.84, 50, 40349.68, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(75, 31, 'Rack mounted UPS 3KVA 15 min', 'number', 1.00, 0, 1, 1, 50751.67, 50, 25375.83, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(76, 31, 'Supplying & install Power out let for  data out', 'number', 4.00, 0, 4, 4, 1258.31, 50, 2516.62, '2025-07-17 01:13:16', '2025-07-17 01:13:16'),
(77, 32, 'R&M Fiber optic cable armored multimode 50/125 8cor', 'meter', 350.00, 0, 350, 350, 209.72, 90, 66061.80, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(78, 32, 'R&M Fiber optic sc connector simplex  multi', 'number', 20.00, 0, 20, 20, 151.00, 90, 2718.00, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(79, 32, 'R&M Fiber optic patch panel 12 port  loaded with 4sc coupler Duplex 50/125', 'number', 5.00, 0, 5, 5, 5872.00, 90, 26424.00, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(80, 32, 'R&M Fiber optic patch cord sc/lc Duplex multimode50/125 3m', 'number', 10.00, 0, 10, 10, 754.98, 90, 6794.82, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(81, 32, 'Supplying & install Galvanized pipes 1 inches overall box accessories', 'meter', 1500.00, 0, 1500, 1500, 293.60, 90, 396360.00, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(82, 32, 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', 'number', 6.00, 0, 6, 6, 3774.92, 90, 20384.57, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(83, 32, 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables.ر', 'meter', 75.00, 0, 75, 75, 629.15, 90, 42467.63, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(84, 32, 'R&M Supplying & install Single faceplate', 'number', 76.00, 0, 76, 76, 1090.53, 90, 74592.25, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(85, 32, 'R&M Supplying & install Cat6 UTP Patch Panel 24 Port', 'number', 5.00, 0, 5, 5, 3858.80, 90, 17364.60, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(86, 32, 'R&M Supplying , install & test Cat 6 4 pair UTP ( Box = 500M )', 'number', 15.00, 0, 15, 15, 43621.27, 90, 588887.15, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(87, 32, 'R&M Supplying & install UTP 1 MTcat6 patch cord RJ 45', 'number', 76.00, 0, 76, 76, 377.49, 90, 25820.32, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(88, 32, 'R&M Supplying & install UTP 3 MT cat6 patch cord RJ 45', 'number', 76.00, 0, 76, 76, 545.27, 90, 37296.47, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(89, 32, 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', 'number', 11.00, 0, 11, 11, 5452.66, 90, 53981.33, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(90, 32, 'Supplying & install Galvanized pole 4 inches x 3m with all accessories to be installed on the fence or street', 'number', 2.00, 0, 2, 2, 7549.84, 90, 13589.71, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(91, 32, 'Supplying & install Plastic ducts different sizes', 'meter', 400.00, 0, 400, 400, 234.88, 90, 84556.80, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(92, 32, 'supplying install thermal flexible', 'meter', 350.00, 0, 350, 350, 151.00, 90, 47565.00, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(93, 32, 'R&M Supplying & install Data rack 19\" 9u 600*560  include the Power distribution panel 6 way & fan unit', 'number', 3.00, 0, 3, 3, 10905.32, 90, 29444.36, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(94, 32, 'R&M Supplying & install Data rack 19\" 27u 800*1000 include the Power distribution panel 6 way & fan unit', 'number', 2.00, 0, 2, 2, 29360.47, 90, 52848.85, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(95, 32, 'Rack mounted UPS 1KVA 15 min', 'number', 4.00, 0, 4, 4, 20174.84, 90, 72629.42, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(96, 32, 'Rack mounted UPS 3KVA 15 min', 'number', 1.00, 0, 1, 1, 50751.67, 90, 45676.50, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(97, 32, 'Supplying & install Power out let for  data out', 'number', 4.00, 0, 4, 4, 1258.31, 90, 4529.92, '2025-07-17 01:20:16', '2025-07-17 01:20:16'),
(121, 34, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', 'number', 70.00, 0, 70, 70, 1650.81, 70, 80889.69, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(122, 34, 'Connection module cat .6, 1xRJ45/u, 10x', 'number', 70.00, 0, 70, 70, 229.28, 70, 11234.72, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(123, 34, 'Supply & Install Patch Cord CAT. 6 ,U/UTP , gray, RJ45/s-RJ45/s,3 m.', 'number', 70.00, 0, 70, 70, 1742.52, 70, 85383.48, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(124, 34, 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m.', 'number', 70.00, 0, 70, 70, 1375.67, 70, 67407.83, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(125, 34, 'Supply & Install 19\" 12 u IP 55 outdoor rack 600x600 mm with PDU source power fully loaded', 'number', 1.00, 0, 1, 1, 55026.94, 70, 38518.86, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(126, 34, 'supply & install Fiber Cable Single Mode central loose tube cable outdoor- use, CSTA - steel tape armour, HDPE sheath - black , 01x24-fibers G652.D', 'meter', 650.00, 0, 650, 650, 247.62, 70, 112667.10, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(127, 34, 'Supply & Install Patch cord fiber LC-Duplex PC-LC Duplex PC ,blue/blue,G.652.d,c/2,F8 2.0x4.1 mm , 3 m', 'number', 22.00, 0, 22, 22, 1283.96, 70, 19772.98, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(128, 34, 'Supply & Install 19\" 1 U Patch Panel 24 P UTP CAT-6', 'number', 8.00, 0, 8, 8, 6878.37, 70, 38518.87, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(129, 34, 'Supply & Install Patch Panel fiber 12 port loaded', 'number', 9.00, 0, 9, 9, 13756.74, 70, 86667.46, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(130, 34, 'supply & install Cat6,U/ UTP,4P,450 MHZ,LSZH,grey,Eca 500 m', 'number', 9.00, 0, 9, 9, 21093.66, 70, 132890.06, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(131, 34, 'Supply & Install thermal Flexible', 'meter', 150.00, 0, 150, 150, 119.22, 70, 12518.10, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(132, 34, 'Supply & Install EMT Pipes 2\'\'', 'meter', 120.00, 0, 120, 120, 1375.67, 70, 115556.28, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(133, 34, 'Supply & Install cable Trays 10*5 with cover.', 'meter', 200.00, 0, 200, 200, 724.52, 70, 101432.80, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(134, 34, 'Supply & Install cover for Trays 10*5 .', 'meter', 240.00, 0, 240, 240, 366.85, 70, 61630.80, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(135, 34, 'Dismantling and reinstalling data racks on fences', 'number', 7.00, 0, 7, 7, 1650.81, 70, 8088.97, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(136, 34, 'Disassemble, straighten and reinstall 10cm cable tray on fences', 'ls', 1.00, 0, 1, 1, 14673.85, 70, 10271.70, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(137, 34, 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', 'number', 70.00, 0, 70, 70, 3209.90, 70, 157285.10, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(138, 34, 'Supplying & install Galvanized pole 3 inches x 4m with all accessories to be installed on the fence', 'number', 1.00, 0, 1, 1, 6420.90, 70, 4494.63, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(139, 34, 'Supply & Install steel ring bracket support 4 camera', 'number', 3.00, 0, 3, 3, 917.20, 70, 1926.12, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(140, 34, 'Supply & Install power outlet with cables 3*3m for feeding outdoor PTZ cam', 'number', 3.00, 0, 3, 3, 27513.47, 70, 57778.29, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(141, 34, 'Supply & Install power outlet with cables 3*6m for feeding outdoor rackes', 'number', 8.00, 0, 8, 8, 36684.63, 70, 205433.93, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(142, 34, 'Civil Work', 'meter', 60.00, 0, 60, 60, 4585.58, 70, 192594.36, '2025-07-17 01:38:37', '2025-07-17 01:38:37'),
(143, 34, 'Testing & commissioning', 'ls', 1.00, 0, 1, 1, 110053.90, 70, 77037.73, '2025-07-17 01:38:37', '2025-07-17 01:38:37');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('open','resolved') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci,
  `loan_date` date NOT NULL,
  `status` enum('unpaid','partial','paid') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unpaid',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `admin_status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `employee_id`, `amount`, `reason`, `loan_date`, `status`, `notes`, `admin_status`, `created_at`, `updated_at`) VALUES
(1, 2, 1250.00, 'asd', '2025-06-11', 'unpaid', NULL, 'pending', '2025-06-11 14:34:54', '2025-06-11 14:34:54'),
(2, 2, 500.00, 'asd', '2025-06-11', 'unpaid', NULL, 'pending', '2025-06-11 14:37:41', '2025-06-11 14:37:41'),
(3, 2, 1000.00, 'سيبسيب', '2025-06-11', 'unpaid', NULL, 'pending', '2025-06-11 14:39:44', '2025-06-11 14:39:44');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_04_06_111409_create_projects_table', 1),
(5, '2025_04_06_111420_create_tasks_table', 1),
(6, '2025_04_06_111430_create_attendances_table', 1),
(7, '2025_04_06_111439_create_salaries_table', 1),
(8, '2025_04_06_151648_create_task_user_table', 2),
(9, '2025_04_09_143205_create_issues_table', 3),
(10, '2025_05_05_133215_create_advances_table', 4),
(11, '2025_05_05_133235_create_expenses_table', 4),
(12, '2025_05_06_143043_create_deductions_table', 5),
(13, '2025_05_07_104351_create_customers_table', 6),
(14, '2025_05_07_140412_create_tools_table', 7),
(15, '2025_05_07_140447_create_tool_assignments_table', 7),
(16, '2025_05_07_140531_create_tool_deductions_table', 7),
(17, '2025_05_13_134008_create_visits_table', 8),
(18, '2025_05_18_105654_create_rewards_table', 9),
(19, '2025_05_21_193320_create_task_progress_table', 10),
(20, '2025_06_11_154148_create_loans_table', 11),
(21, '2025_06_16_101723_extractions', 12),
(22, '2025_06_16_101735_invoices', 12);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('ahmed.saied@trustits.net', '$2y$12$7/.78eztb8WW6zyop/GsPuQum6YlYItWbB1e3KXrqN0S2K.abYw56', '2025-07-02 07:29:22'),
('salem@trustits.net', '$2y$12$mEMcSlDvTrskSUEb25Odg.QGpqMnXL3XQvv0oDpTzT5UP6y/V3wDq', '2025-07-15 14:50:04');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_code` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_name` varchar(190) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_code`, `customer_name`, `name`, `description`, `start_date`, `end_date`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(29, 'GB.P/CCTV/Asuit/001030/2025', 'غبور اسيوط', 'GB.P/CCTV/Asuit', 'Assuit PC&CV', '2025-06-23', '2025-06-23', 7, '2025-06-23 22:52:55', '2025-07-17 00:25:20', NULL),
(30, 'GB.P/ VOLVO_ C.V work shop-CCTV/ITAMCO2_A.R/001040/2025', 'غبور مصر', 'ITAMCO 2 CV Work shop', 'شبكة كاميرات-أعمال التأسيس - أعمال السحب - توريد وتركيب راكات-كل مستلزمات الشركة', '2025-06-23', '2025-06-23', 8, '2025-06-23 23:08:32', '2025-07-13 20:31:35', NULL),
(31, 'GB.P/El-Dahar S.R CCTV/_Hurgada/0010043/2025', 'غبور', 'GB.P/El-Dahar', 'EL-DAHAR SHOWROOM', '2025-06-23', '2025-06-23', 22, '2025-06-23 23:16:03', '2025-06-24 22:17:37', NULL),
(32, 'GB.P/C.V-3S CCTV/Hurgada/001041/2025', 'غبور', 'Hurgada CV Work shop', 'GB.P/C.V-3S CCTV', '2025-06-24', '2025-06-24', 22, '2025-06-24 22:42:58', '2025-06-24 22:42:58', NULL),
(33, '0211', 'GB.P', 'Fredy_32km_store_CCTV_passive', 'CCTV_passive', '2025-06-24', '2025-06-24', 22, '2025-06-24 22:56:08', '2025-06-24 22:56:08', NULL),
(34, '1234', 'Ghabour -2', 'Qalub K7', 'CCTV PASSIVE NETWORK', '2025-06-24', '2025-06-24', 1, '2025-06-24 23:40:43', '2025-06-28 22:23:07', NULL),
(35, '001', 'Gates', 'AUDAZ MALL', 'تركيب وتشغيل نظام الكاميرت والتحكم بالدخول والبيانات', '2025-07-01', '2025-07-10', 7, '2025-07-02 06:57:23', '2025-07-02 07:07:25', NULL),
(36, '002', 'السعيد للمقاولات', 'فندق اللؤلؤه الغردقة', 'توريد وتركيب وتشغيل (Data Center - VOIP - WIFI )', '2025-07-03', '2025-07-05', 7, '2025-07-03 15:48:28', '2025-07-03 15:48:28', NULL),
(37, '003', 'شركة ميناء القاهرة', 'مطار القاهرة صاله 3', 'رفع كفاءة المنظومه الداخلية - ذو الاحتياجات الخاصة-توريد وتركيب وتشغيل وبرمجة نظام Toilet Management- IOT', '2025-05-01', '2025-08-13', 8, '2025-07-03 17:58:47', '2025-07-13 20:30:18', NULL),
(38, '004', 'الرضا للمقاولات', 'بنك ناصر فرع المنيا ملوي', 'شبكة كاميرات المراقبة', '2025-04-23', '2025-07-03', 7, '2025-07-03 18:13:39', '2025-07-03 18:13:39', NULL),
(39, '005', 'الرضا للمقاولات', 'بنك ناصر فرع برج العرب', 'شبكة كاميرات المراقبة', '2025-04-23', '2025-04-26', 7, '2025-07-03 18:29:18', '2025-07-03 18:29:18', NULL),
(40, '006', 'الرضا للمقولات', 'بنك ناصر فرع سوهاج', 'تركيب وتشغيل منظومة الكاميرات والاكسيس كنترول', '2024-11-03', '2024-11-03', 7, '2025-07-04 02:03:03', '2025-07-04 02:03:03', NULL),
(41, 'GB.P/SAF CCTV/Sadat/001049/2025', 'Ghabour', 'Ghabour - Sadat factory(fence)', 'تعديل واصلاح الترنكات وتوصيل شبكة الكاميرات', '2025-07-01', '2025-10-01', 8, '2025-07-13 16:50:21', '2025-07-13 16:50:21', NULL),
(42, '..', '..', 'مطار العريش(أعمال تركيبات)', 'سحب كابلات كاملة-كابلات الداتا-كابلات تليفونات- كاملة Data center- Passive', '2025-07-13', '2025-07-13', 8, '2025-07-13 22:29:44', '2025-07-13 22:29:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_user`
--

CREATE TABLE `project_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_user`
--

INSERT INTO `project_user` (`id`, `project_id`, `user_id`) VALUES
(48, 34, 2),
(49, 34, 3),
(50, 34, 6),
(51, 34, 15),
(52, 34, 16),
(53, 34, 19),
(54, 35, 2),
(55, 35, 17),
(56, 35, 18),
(57, 35, 16),
(58, 35, 25),
(59, 35, 3),
(60, 35, 6),
(61, 35, 19),
(62, 36, 2),
(63, 36, 3),
(64, 36, 6),
(65, 36, 15),
(66, 37, 2),
(67, 37, 3),
(68, 37, 6),
(69, 37, 18),
(70, 38, 2),
(71, 38, 18),
(72, 38, 16),
(73, 39, 2),
(74, 39, 6),
(75, 40, 2),
(76, 40, 6),
(77, 30, 2),
(78, 30, 17),
(79, 30, 18),
(80, 30, 25),
(81, 30, 15),
(82, 41, 6),
(83, 41, 17),
(84, 41, 19),
(85, 41, 2),
(86, 42, 2),
(87, 42, 6),
(88, 42, 33),
(89, 42, 29),
(90, 42, 26);

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE `rewards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `reward_date` date NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci,
  `points` int(11) NOT NULL DEFAULT '0',
  `amount` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`id`, `user_id`, `reward_date`, `type`, `reason`, `points`, `amount`, `created_at`, `updated_at`) VALUES
(1, 3, '2025-07-01', NULL, 'الغردقة', 1, 1000.00, '2025-07-16 19:33:14', '2025-07-16 19:33:14');

-- --------------------------------------------------------

--
-- Table structure for table `salaries`
--

CREATE TABLE `salaries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `month` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `base_salary` decimal(10,2) NOT NULL,
  `task_score_percentage` int(11) DEFAULT NULL,
  `attendance_score_percentage` int(11) DEFAULT NULL,
  `final_salary` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `salaries`
--

INSERT INTO `salaries` (`id`, `user_id`, `month`, `base_salary`, `task_score_percentage`, `attendance_score_percentage`, `final_salary`, `created_at`, `updated_at`) VALUES
(1, 2, '4', 6500.00, 10, 10, 10000.00, NULL, '2025-07-09 01:38:18'),
(2, 1, NULL, 3500.00, NULL, NULL, 5000.00, '2025-05-07 09:46:57', '2025-07-06 00:21:10'),
(3, 3, NULL, 5000.00, NULL, NULL, 12500.00, '2025-05-07 10:23:19', '2025-07-09 01:39:50'),
(6, 6, NULL, 5850.00, NULL, NULL, 9000.00, '2025-05-27 10:16:18', '2025-07-09 01:39:09'),
(7, 7, NULL, 5.00, NULL, NULL, 7.00, '2025-06-10 09:00:40', '2025-06-18 05:22:44'),
(8, 8, NULL, 6500.00, NULL, NULL, 10000.00, '2025-06-13 14:25:46', '2025-07-14 22:45:58'),
(15, 15, NULL, 6500.00, NULL, NULL, 10000.00, '2025-06-18 23:57:21', '2025-06-18 23:57:21'),
(16, 16, NULL, 1.00, NULL, NULL, 5500.00, '2025-06-18 23:59:03', '2025-07-09 01:43:37'),
(17, 17, NULL, 1.00, NULL, NULL, 8000.00, '2025-06-19 00:00:49', '2025-07-12 16:13:50'),
(18, 18, NULL, 4550.00, NULL, NULL, 7000.00, '2025-06-19 00:01:40', '2025-07-16 19:22:45'),
(19, 19, NULL, 1.00, NULL, NULL, 9000.00, '2025-06-19 00:03:08', '2025-07-09 01:44:07'),
(20, 20, NULL, 1.00, NULL, NULL, 7000.00, '2025-06-19 00:16:58', '2025-07-16 19:15:52'),
(21, 21, NULL, 3900.00, NULL, NULL, 6000.00, '2025-06-22 20:42:48', '2025-07-03 17:33:54'),
(22, 22, NULL, 3900.00, NULL, NULL, 6000.00, '2025-06-22 22:33:45', '2025-07-09 01:40:59'),
(24, 24, NULL, 6500.00, NULL, NULL, 10000.00, '2025-06-23 23:14:33', '2025-07-09 01:41:34'),
(25, 25, NULL, 3900.00, NULL, NULL, 6000.00, '2025-06-27 03:08:48', '2025-07-09 01:42:20'),
(26, 26, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 20:02:41', '2025-07-12 17:17:27'),
(27, 27, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 20:04:18', '2025-07-03 22:30:09'),
(28, 28, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 20:05:36', '2025-07-12 17:18:35'),
(29, 29, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 20:07:47', '2025-07-12 17:18:10'),
(30, 30, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 20:08:35', '2025-07-03 22:29:52'),
(31, 31, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 20:09:59', '2025-07-12 17:20:56'),
(32, 32, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 20:10:50', '2025-07-12 17:19:11'),
(33, 33, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 20:11:53', '2025-07-12 17:16:52'),
(34, 34, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 21:46:11', '2025-07-03 22:28:38'),
(35, 35, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 21:47:16', '2025-07-09 01:42:51'),
(36, 36, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 21:48:29', '2025-07-03 22:28:05'),
(37, 37, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 21:49:28', '2025-07-14 23:09:12'),
(38, 38, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 21:50:25', '2025-07-14 23:08:43'),
(39, 39, NULL, 0.65, NULL, NULL, 1.00, '2025-07-03 21:51:45', '2025-07-09 01:45:37'),
(40, 40, NULL, 0.65, NULL, NULL, 1.00, '2025-07-05 21:04:06', '2025-07-05 21:04:06'),
(41, 41, NULL, 2600.00, NULL, NULL, 4000.00, '2025-07-05 21:05:58', '2025-07-05 21:05:58'),
(42, 42, NULL, 0.65, NULL, NULL, 1.00, '2025-07-09 01:53:39', '2025-07-09 01:53:39'),
(43, 43, NULL, 0.65, NULL, NULL, 1.00, '2025-07-16 23:38:09', '2025-07-16 23:38:09'),
(44, 44, NULL, 0.65, NULL, NULL, 1.00, '2025-07-16 23:38:44', '2025-07-16 23:38:44'),
(45, 45, NULL, 0.65, NULL, NULL, 1.00, '2025-07-16 23:39:08', '2025-07-16 23:39:08');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `due_date` date DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit_price` decimal(8,2) DEFAULT NULL,
  `tp` decimal(8,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `project_id`, `user_id`, `title`, `description`, `due_date`, `quantity`, `start_date`, `end_date`, `unit`, `unit_price`, `tp`, `created_at`, `updated_at`) VALUES
(117, 29, NULL, 'R&M Fiber optic cable armored multimode 50/125 8cor', 'Fiber optic cable armored multimode 50/125 8cor', NULL, 350, NULL, NULL, 'meter', 209.72, 73402.00, '2025-06-23 22:52:56', '2025-07-17 00:25:20'),
(118, 29, NULL, 'R&M Fiber optic sc connector simplex  multi', 'Fiber optic sc connector simplex  multi', NULL, 20, NULL, NULL, 'number', 151.00, 3020.00, '2025-06-23 22:52:56', '2025-07-17 01:01:50'),
(119, 29, NULL, 'R&M Fiber optic patch panel 12 port  loaded with 4sc coupler Duplex 50/125', 'Fiber optic patch panel 12 port  loaded with 4sc coupler Duplex 50/125', NULL, 5, NULL, NULL, 'number', 5872.00, 29360.00, '2025-06-23 22:52:56', '2025-07-17 01:01:50'),
(120, 29, NULL, 'R&M Fiber optic patch cord sc/lc Duplex multimode50/125 3m', 'Fiber optic patch cord sc/lc Duplex multimode50/125 3m', NULL, 10, NULL, NULL, 'number', 754.98, 7549.80, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(121, 29, NULL, 'Supplying & install Galvanized pipes 1 inches overall box accessories', 'Supplying & install Galvanized pipes 1 inches overall box accessories', NULL, 1500, NULL, NULL, 'meter', 293.60, 440400.00, '2025-06-23 22:52:56', '2025-07-17 01:01:50'),
(122, 29, NULL, 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', NULL, 6, NULL, NULL, 'number', 3774.92, 22649.52, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(123, 29, NULL, 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables.ر', 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables.', NULL, 75, NULL, NULL, 'meter', 629.15, 47186.25, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(124, 29, NULL, 'R&M Supplying & install Single faceplate', 'Supplying & install Single faceplate', NULL, 76, NULL, NULL, 'number', 1090.53, 82880.28, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(125, 29, NULL, 'R&M Supplying & install Cat6 UTP Patch Panel 24 Port', 'Supplying & install Cat6 UTP Patch Panel 24 Port', NULL, 5, NULL, NULL, 'number', 3858.80, 19294.00, '2025-06-23 22:52:56', '2025-07-17 01:01:50'),
(126, 29, NULL, 'R&M Supplying , install & test Cat 6 4 pair UTP ( Box = 500M )', 'Supplying , install & test Cat 6 4 pair UTP ( Box = 500M )', NULL, 15, NULL, NULL, 'number', 43621.27, 654319.05, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(127, 29, NULL, 'R&M Supplying & install UTP 1 MTcat6 patch cord RJ 45', 'Supplying & install UTP 1 MTcat6 patch cord RJ 45', NULL, 76, NULL, NULL, 'number', 377.49, 28689.24, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(128, 29, NULL, 'R&M Supplying & install UTP 3 MT cat6 patch cord RJ 45', 'Supplying & install UTP 3 MT cat6 patch cord RJ 45', NULL, 76, NULL, NULL, 'number', 545.27, 41440.52, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(129, 29, NULL, 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', NULL, 11, NULL, NULL, 'number', 5452.66, 59979.26, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(130, 29, NULL, 'Supplying & install Galvanized pole 4 inches x 3m with all accessories to be installed on the fence or street', 'Supplying & install Galvanized pole 4 inches x 3m with all accessories to be installed on the fence or street', NULL, 2, NULL, NULL, 'number', 7549.84, 15099.68, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(131, 29, NULL, 'Supplying & install Plastic ducts different sizes', 'Supplying & install Plastic ducts different sizes', NULL, 400, NULL, NULL, 'meter', 234.88, 93952.00, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(132, 29, NULL, 'supplying install thermal flexible', 'supplying install thermal flexible', NULL, 350, NULL, NULL, 'meter', 151.00, 52850.00, '2025-06-23 22:52:56', '2025-07-17 01:01:50'),
(133, 29, NULL, 'R&M Supplying & install Data rack 19\" 9u 600*560  include the Power distribution panel 6 way & fan unit', 'Supplying & install Data rack 19\" 9u 600*560  include the Power distribution panel 6 way & fan unit', NULL, 3, NULL, NULL, 'number', 10905.32, 32715.96, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(134, 29, NULL, 'R&M Supplying & install Data rack 19\" 27u 800*1000 include the Power distribution panel 6 way & fan unit', 'Supplying & install Data rack 19\" 27u 800*1000 include the Power distribution panel 6 way & fan unit', NULL, 2, NULL, NULL, 'number', 29360.47, 58720.94, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(135, 29, NULL, 'Rack mounted UPS 1KVA 15 min', 'Rack mounted UPS 1KVA 15 min', NULL, 4, NULL, NULL, 'number', 20174.84, 80699.36, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(136, 29, NULL, 'Rack mounted UPS 3KVA 15 min', 'Rack mounted UPS 3KVA 15 min', NULL, 1, NULL, NULL, 'number', 50751.67, 50751.67, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(137, 29, NULL, 'Supplying & install Power out let for  data out', 'Supplying & install Power out let for  data out', NULL, 4, NULL, NULL, 'number', 1258.31, 5033.24, '2025-06-23 22:52:56', '2025-07-17 00:37:21'),
(138, 30, NULL, 'R&M', 'Fiber optic cable armored multimode 50/125 8cor', NULL, 400, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(139, 30, NULL, 'R&M', 'Fiber optic sc connector simplex  mul', NULL, 32, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(140, 30, NULL, 'R&M', 'Fiber optic patch panel 12 port  loaded with 4sc coupler Duplex 50/125', NULL, 5, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(141, 30, NULL, 'R&M', 'Fiber optic patch cord sc/lc Duplex multimode50/125 3m', NULL, 20, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(142, 30, NULL, 'supplying install thermal flexible', 'supplying install thermal flexible', NULL, 150, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(143, 30, NULL, 'Supply & Install Trays 10*5 with cover including all fixing and installation,accessories', 'Supply & Install Trays 10*5 with cover including all fixing and installation,accessories', NULL, 450, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(144, 30, NULL, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', NULL, 52, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(145, 30, NULL, 'R&M', 'Supplying & install Single faceplate with Connection module cat .6, 1xRJ45/u, 10x', NULL, 52, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(146, 30, NULL, 'R&M', 'Supplying & install Cat6 UTP Patch Panel 24 Port', NULL, 5, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(147, 30, NULL, 'R&M', 'supply & install Cat6,U/ UTP,4P,450  MHZ,LSZH,grey,Eca', NULL, 3500, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(148, 30, NULL, 'R&M', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m', NULL, 52, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(149, 30, NULL, 'R&M', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , gray, RJ45/s-RJ45/s,3 m', NULL, 52, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(150, 30, NULL, 'R&M', 'Supplying & install Data rack 19\" 9u 800*800 include the Power distribution panel 6 way & fan unit', NULL, 4, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(151, 30, NULL, 'R&M', 'Supply & Install 19 \"27 u 800*800FCDD RSDD  rack', NULL, 1, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(152, 30, NULL, 'UPS 1 KVA 15 min backup rack mounted', 'UPS 1 KVA 15 min backup rack mounted', NULL, 4, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(153, 30, NULL, 'UPS 3 KVA 15 min backup rack mounted', 'UPS 3 KVA 15 min backup rack mounted', NULL, 1, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(154, 30, NULL, 'Supply & Install power outlet with cables 3*4 mm  to supply the main rack', 'Supply & Install power outlet with cables 3*4 mm  to supply the main rack', NULL, 5, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(155, 30, NULL, 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', NULL, 11, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(156, 30, NULL, 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', NULL, 8, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(157, 30, NULL, 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables.', 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables.', NULL, 100, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(158, 30, NULL, 'Testing & commissioning', 'Testing & commissioning', NULL, 1, NULL, NULL, 'ls', 0.00, 0.00, '2025-06-23 23:08:32', '2025-07-13 20:31:35'),
(159, 31, NULL, 'supplying install thermal flexible', 'supplying install thermal flexible', NULL, 50, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(160, 31, NULL, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', NULL, 14, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(161, 31, NULL, 'R&M', 'Supplying & install Single faceplate', NULL, 14, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(162, 31, NULL, 'R&M', 'Supplying & install Cat6 UTP Patch Panel 24 Por', NULL, 1, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(163, 31, NULL, 'R&M', 'supply & install Cat6,U/ UTP,4P,450  MHZ,LSZH,grey,Eca', NULL, 650, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(164, 31, NULL, 'R&M', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m', NULL, 14, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(165, 31, NULL, 'R&M', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , gray, RJ45/s-RJ45/s,3 m', NULL, 14, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(166, 31, NULL, 'Supplying & install Plastic ducts different sizes', 'Supplying & install Plastic ducts different sizes', NULL, 200, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(167, 31, NULL, 'R&M', 'Supplying & install Data rack 19\" 9u 800*800 include the Power distribution panel 6 way & fan unit', NULL, 1, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(168, 31, NULL, 'UPS 3 KVA 15 min backup rack mounted', 'UPS 3 KVA 15 min backup rack mounted', NULL, 1, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(169, 31, NULL, 'Supply & Install power outlet with cables 3*4 mm  to supply the main rack', 'Supply & Install power outlet with cables 3*4 mm  to supply the main rack', NULL, 1, NULL, NULL, 'number', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(170, 31, NULL, 'Testing & commissioning', '(Testing & commissioning (LS', NULL, 1, NULL, NULL, 'ls', 0.00, 0.00, '2025-06-23 23:16:03', '2025-06-24 22:17:37'),
(171, 32, NULL, 'R&M', 'Fiber optic cable armored multimode 50/125 8cor', NULL, 100, NULL, NULL, 'meter', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(172, 32, NULL, 'R&M', 'Fiber optic sc connector simplex  mu', NULL, 8, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(173, 32, NULL, 'R&M', 'Fiber optic patch panel 12 port  loaded with 4sc coupler Duplex 50/125', NULL, 2, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(174, 32, NULL, 'R&M', 'Fiber optic patch cord sc/lc Duplex multimode50/125 3m', NULL, 6, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(175, 32, NULL, 'supplying install thermal flexible', 'supplying install thermal flexible', NULL, 100, NULL, NULL, 'meter', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(176, 32, NULL, 'R&M', 'Supply & Install Trays 10*5 with cover including all fixing and installation,accessories .', NULL, 300, NULL, NULL, 'meter', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(177, 32, NULL, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', NULL, 42, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(178, 32, NULL, 'R&M', 'Supplying & install Single faceplate', NULL, 42, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(179, 32, NULL, 'R&M', 'Supplying & install Cat6 UTP Patch Panel 24 Port', NULL, 2, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(180, 32, NULL, 'R&M', 'supply & install Cat6,U/ UTP,4P,450  MHZ,LSZH', NULL, 3000, NULL, NULL, 'meter', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(181, 32, NULL, 'R&M', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m.', NULL, 42, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(182, 32, NULL, 'R&M', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , gray, RJ45/s-RJ45/s,3 m.', NULL, 42, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(183, 32, NULL, 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', NULL, 14, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(184, 32, NULL, 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', NULL, 4, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(185, 32, NULL, 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables.', 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables.', NULL, 75, NULL, NULL, 'meter', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(186, 32, NULL, 'Supplying & install Plastic ducts different sizes', 'Supplying & install Plastic ducts different sizes', NULL, 200, NULL, NULL, 'meter', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(187, 32, NULL, 'R&M', 'Supplying & install Data rack 19\" 9u 800*1000 include the Power distribution panel 6 way & fan unit', NULL, 1, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(188, 32, NULL, 'R&M', 'Supply & Install 19 \"27 u 800*800FCDD RSDD  rack', NULL, 1, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(189, 32, NULL, 'UPS 3 KVA 15 min backup rack mounted', 'UPS 3 KVA 15 min backup rack mounted', NULL, 2, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(190, 32, NULL, 'Supply & Install power outlet with cables 3*4 mm  to supply the main rack', 'Supply & Install power outlet with cables 3*4 mm  to supply the main rack', NULL, 2, NULL, NULL, 'number', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(191, 32, NULL, 'Testing & commissioning', 'Testing & commissioning', NULL, 1, NULL, NULL, 'ls', NULL, NULL, '2025-06-24 22:42:59', '2025-06-24 22:42:59'),
(192, 33, NULL, 'supplying install thermal flexible', 'supplying install thermal flexible', NULL, 50, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(193, 33, NULL, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', NULL, 13, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(194, 33, NULL, 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', NULL, 5, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(195, 33, NULL, 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', 'Number inspection rooms Size 0.60 × 0.60 × 0.70, and the price includes waterproofing (bitumen paint) for the room from the outside and internal and external whiteness and ground of ordinary concrete size of 1.30 × 1.30 × 0.15 m and cover double blossom', NULL, 2, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(196, 33, NULL, 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables', 'Supply and installation of plastic pipe diameter 3 \"(10 bar pressure) and the price includes all necessary drilling and bridge and all Alaaksstlesom installation with the work of guys to pull cables', NULL, 20, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(197, 33, NULL, 'R&M', 'Supplying & install Single faceplate with Connection module cat .6, 1xRJ45/u, 10x', NULL, 13, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(198, 33, NULL, 'R&M', 'Supplying & install Cat6 UTP Patch Panel 24 Port', NULL, 2, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(199, 33, NULL, 'R&M', 'supply & install Cable Cat6,U/ UTP,4P,450  MHZ,L', NULL, 1250, NULL, NULL, 'meter', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(200, 33, NULL, 'R&M', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m', NULL, 13, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(201, 33, NULL, 'R&M', NULL, NULL, 13, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(202, 33, NULL, 'R&M', NULL, NULL, 2, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(203, 33, NULL, 'UPS 1 KVA 15 min backup rack mounted', 'UPS 1 KVA 15 min backup rack mounted', NULL, 2, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(204, 33, NULL, 'Supply & Install power outlet with cables 3*4 mm  to supply the main rack', 'Supply & Install power outlet with cables 3*4 mm  to supply the main rack', NULL, 2, NULL, NULL, 'number', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(205, 33, NULL, 'Testing & commissioning', 'Testing & commissioning', NULL, 1, NULL, NULL, 'ls', 0.00, 0.00, '2025-06-24 22:56:09', '2025-06-25 20:33:06'),
(206, 34, NULL, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks', 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks', NULL, 47, '2025-06-26', '2025-06-26', 'number', 2340.20, 109989.40, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(207, 34, NULL, 'R310786', 'Supply & install Single faceplate WM 80x80, 2x1-port , pure white', NULL, 47, '2025-06-26', '2025-06-26', 'number', 676.05, 31774.35, '2025-06-24 23:40:43', '2025-06-27 03:04:18'),
(208, 34, NULL, 'R302373', 'Connection module cat .6, 1xRJ45/u, 10x', NULL, 47, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(209, 34, NULL, 'R875979', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , gray, RJ45/s-RJ45/s,3 m', NULL, 47, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(210, 34, NULL, 'R302310', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m', NULL, 47, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(211, 34, NULL, 'R138872', 'Supply & Install 19 \"27 u 800*800FCDD RSDD rack with PDU source power fully loaded', NULL, 1, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(212, 34, NULL, 'Supply & Install 19\" 1 U Patch Panel UTP CAT-6 24 port', 'Supply & Install 19\" 1 U Patch Panel UTP CAT-6 24 port', NULL, 3, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(213, 34, NULL, 'R35057', 'supply & install Cat6,U/ UTP,4P,450 MHZ,LSZH,grey,Eca 500 m', NULL, 5, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(214, 34, NULL, 'Supply & Install Trays 10*5 with cover including all fixing and installation,  accessori', 'Supply & Install Trays 10*5 with cover including all fixing and installation,  accessori', NULL, 100, '2025-06-26', '2025-06-26', 'meter', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(215, 34, NULL, 'Supply & Install steel mast for camera 50*200 mm', 'Supply & Install steel mast for camera 50*200 mm', NULL, 3, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(216, 34, NULL, 'Supply & Install steel mast for camera 100*400 mm', 'Supply & Install steel mast for camera 100*400 mm', NULL, 2, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(217, 34, NULL, 'Supply & Install thermal Flexible', 'Supply & Install thermal Flexible', NULL, 150, '2025-06-26', '2025-06-26', 'meter', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:30'),
(218, 34, NULL, 'Supply & Install UPVC Pipes 3\'\'', 'Supply & Install UPVC Pipes 3\'\'', NULL, 15, '2025-06-26', '2025-06-26', 'meter', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:31'),
(219, 34, NULL, 'Supply & Instal hnspection man hole 60cm x 60cm x 60cm with cover steel', 'Supply & Instal hnspection man hole 60cm x 60cm x 60cm with cover steel', NULL, 2, '2025-07-03', '2025-07-03', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:31'),
(220, 34, NULL, 'Supply & Install UPS 3K ( minimum 15 minuts output)', 'Supply & Install UPS 3K ( minimum 15 minuts output)', NULL, 1, '2025-06-26', '2025-06-26', 'number', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:31'),
(221, 34, NULL, 'Supply & Install power outlet with cables 3*4 mm to supply the main rack', 'Supply & Install power outlet with cables 3*4 mm to supply the main rack', NULL, 1, '2025-06-26', '2025-06-26', 'ls', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:31'),
(222, 34, NULL, 'Civil Work', 'Civil Work', NULL, 15, '2025-06-26', '2025-07-02', 'ls', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:31'),
(223, 34, NULL, 'Testing & commissioning', 'Testing & commissioning', NULL, 1, '2025-06-26', '2025-06-26', 'ls', 0.00, 0.00, '2025-06-24 23:40:43', '2025-06-28 22:25:31'),
(224, 35, NULL, 'Rack 9 U', 'تجميع وتركيب وتثبيت بمبني B1', NULL, 18, '2025-07-01', '2025-07-03', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(225, 35, NULL, 'كاميرا 5 ميجا UNV', 'تركيب وتأريج - ملحوظة تم التركيب ما عدا بدروم 1', NULL, 115, '2025-07-01', '2025-07-02', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(226, 35, NULL, 'HD 8 tera', 'تركيب عدد 22 هارد بأجهزة مبني 1', NULL, 22, '2025-07-05', '2025-07-05', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(227, 35, NULL, 'NVR xrn 6410b2', 'تركيب الاجهزة بمبني 1 بغرفة التحكم', NULL, 3, '2025-07-07', '2025-07-07', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(228, 35, NULL, 'camera wisenet QNO7080R', 'تركيب علي المبني من الخارج وربطهم بغرفط العاصمة', NULL, 16, '2025-07-02', '2025-07-08', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(229, 35, NULL, 'شاشة 40 سامسونج', 'تركيب بغرفة تحكم مبني 1', NULL, 7, '2025-07-02', '2025-07-07', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(230, 35, NULL, 'كايل فايبر سنجل مود 8 كور', 'مد وربط جميع الراكات (ستار) لمبني 1', NULL, 450, '2025-07-02', '2025-07-03', 'meter', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(231, 35, NULL, 'patch panel data', 'تركيب وتدبيس الباتش بانل علي كل الراكات مبني 1', NULL, 27, '2025-07-02', '2025-07-10', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(232, 35, NULL, 'باتش بانل فايبر', 'ODF تركيب وتجميع', NULL, 24, '2025-07-02', '2025-07-10', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(233, 35, NULL, 'راك 42 u', 'تركيب وتجميع بالغرفه الرئيسية', NULL, 1, '2025-07-08', '2025-07-08', 'number', 0.00, 0.00, '2025-07-02 06:57:28', '2025-07-02 07:07:25'),
(234, 36, NULL, 'Wifi Linksys', 'Wifi Linksys', NULL, 90, '2025-07-03', '2025-07-05', 'number', NULL, NULL, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(235, 36, NULL, 'Data Center', 'RACK and SW', NULL, 28, '2025-07-03', '2025-07-05', 'number', NULL, NULL, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(236, 36, NULL, 'IP Phone', 'تشغيل وبرمجة', NULL, 170, '2025-07-03', '2025-07-05', 'number', NULL, NULL, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(237, 37, NULL, 'zone (1-10) nework installation', 'مد الشبكة وتجهيز اماكن الحساسات - ذوي الاحتياجات + 10 نقط 7 كهربه و3 داتا و2 HDMI', NULL, 10, '2025-05-11', '2025-08-13', 'ls', 0.00, 0.00, '2025-07-03 17:58:53', '2025-07-13 20:30:18'),
(238, 38, NULL, 'تركيب وتشغيل 47 كاميار سامسونج و 4 اجهزة تسجيل', 'تركيب وتشغيل 47 كاميار سامسونج و 4 اجهزة تسجيل', NULL, 47, '2025-04-23', '2025-04-26', 'ls', NULL, NULL, '2025-07-03 18:13:44', '2025-07-03 18:13:44'),
(239, 39, NULL, 'تركيب وتشغيل 42 كاميرا بأجهزة التسجيل', 'تركيب وتشغيل 42 كاميرا بأجهزة التسجيل', NULL, 42, '2025-04-23', '2025-04-26', 'ls', NULL, NULL, '2025-07-03 18:29:23', '2025-07-03 18:29:23'),
(240, 40, NULL, 'تركيب ونشغيل منظمة الكاميرات والاكسيس كنترول', 'تركيب ونشغيل منظمة الكاميرات والاكسيس كنترول', NULL, 1, '2024-11-03', '2024-11-03', 'ls', NULL, NULL, '2025-07-04 02:03:09', '2025-07-04 02:03:09'),
(241, 41, NULL, 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', 'Supply and install of galvanize pipes of EMT, including all fixing and installation accessories from the outlet to the cable trays or racks.', NULL, 70, '2025-07-01', '2025-07-10', 'number', 1650.81, 115556.70, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(242, 41, NULL, 'Connection module cat .6, 1xRJ45/u, 10x', 'Connection module cat .6, 1xRJ45/u, 10x', NULL, 70, '2025-07-11', '2025-07-20', 'number', 229.28, 16049.60, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(243, 41, NULL, 'Supply & Install Patch Cord CAT. 6 ,U/UTP , gray, RJ45/s-RJ45/s,3 m.', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , gray, RJ45/s-RJ45/s,3 m.', NULL, 70, '2025-07-21', '2025-07-30', 'number', 1742.52, 121976.40, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(244, 41, NULL, 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m.', 'Supply & Install Patch Cord CAT. 6 ,U/UTP , 4P, RJ45/u-RJ45/u,1 m.', NULL, 70, '2025-07-31', '2025-08-09', 'number', 1375.67, 96296.90, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(245, 41, NULL, 'Supply & Install 19\" 12 u IP 55 outdoor rack 600x600 mm with PDU source power fully loaded', 'Supply & Install 19\" 12 u IP 55 outdoor rack 600x600 mm with PDU source power fully loaded', NULL, 1, '2025-08-10', '2025-08-10', 'number', 55026.94, 55026.94, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(246, 41, NULL, 'supply & install Fiber Cable Single Mode central loose tube cable outdoor- use, CSTA - steel tape armour, HDPE sheath - black , 01x24-fibers G652.D', 'supply & install Fiber Cable Single Mode central loose tube cable outdoor- use, CSTA - steel tape armour, HDPE sheath - black , 01x24-fibers G652.D', NULL, 650, '2025-08-11', '2025-08-13', 'meter', 247.62, 160953.00, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(247, 41, NULL, 'Supply & Install Patch cord fiber LC-Duplex PC-LC Duplex PC ,blue/blue,G.652.d,c/2,F8 2.0x4.1 mm , 3 m', 'Supply & Install Patch cord fiber LC-Duplex PC-LC Duplex PC ,blue/blue,G.652.d,c/2,F8 2.0x4.1 mm , 3 m', NULL, 22, '2025-08-14', '2025-08-16', 'number', 1283.96, 28247.12, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(248, 41, NULL, 'Supply & Install 19\" 1 U Patch Panel 24 P UTP CAT-6', 'Supply & Install 19\" 1 U Patch Panel 24 P UTP CAT-6', NULL, 8, '2025-08-17', '2025-08-18', 'number', 6878.37, 55026.96, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(249, 41, NULL, 'Supply & Install Patch Panel fiber 12 port loaded', 'Supply & Install Patch Panel fiber 12 port loaded', NULL, 9, '2025-08-19', '2025-08-19', 'number', 13756.74, 123810.66, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(250, 41, NULL, 'supply & install Cat6,U/ UTP,4P,450 MHZ,LSZH,grey,Eca 500 m', 'supply & install Cat6,U/ UTP,4P,450 MHZ,LSZH,grey,Eca 500 m', NULL, 9, '2025-08-20', '2025-08-22', 'number', 21093.66, 189842.94, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(251, 41, NULL, 'Supply & Install thermal Flexible', 'Supply & Install thermal Flexible', NULL, 150, '2025-08-23', '2025-08-23', 'meter', 119.22, 17883.45, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(252, 41, NULL, 'Supply & Install EMT Pipes 2\'\'', 'Supply & Install EMT Pipes 2\'\'', NULL, 120, '2025-08-24', '2025-08-25', 'meter', 1375.67, 165080.40, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(253, 41, NULL, 'Supply & Install cable Trays 10*5 with cover.', 'Supply & Install cable Trays 10*5 with cover.', NULL, 200, '2025-08-26', '2025-08-28', 'meter', 724.52, 144904.00, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(254, 41, NULL, 'Supply & Install cover for Trays 10*5 .', 'Supply & Install cover for Trays 10*5 .', NULL, 240, '2025-08-29', '2025-08-31', 'meter', 366.85, 88044.00, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(255, 41, NULL, 'Dismantling and reinstalling data racks on fences', 'Dismantling and reinstalling data racks on fences', NULL, 7, '2025-09-01', '2025-09-03', 'number', 1650.81, 11555.67, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(256, 41, NULL, 'Disassemble, straighten and reinstall 10cm cable tray on fences', 'Disassemble, straighten and reinstall 10cm cable tray on fences', NULL, 1, '2025-09-04', '2025-09-04', 'ls', 14673.85, 14673.85, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(257, 41, NULL, 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', 'Supplying & install Galvanized pole 3 inches x 2m with all accessories to be installed on the fence', NULL, 70, '2025-09-05', '2025-09-07', 'number', 3209.90, 224693.00, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(258, 41, NULL, 'Supplying & install Galvanized pole 3 inches x 4m with all accessories to be installed on the fence', 'Supplying & install Galvanized pole 3 inches x 4m with all accessories to be installed on the fence', NULL, 1, '2025-09-06', '2025-09-07', 'number', 6420.90, 6420.90, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(259, 41, NULL, 'Supply & Install steel ring bracket support 4 camera', 'Supply & Install steel ring bracket support 4 camera', NULL, 3, '2025-09-08', '2025-09-10', 'number', 917.20, 2751.60, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(260, 41, NULL, 'Supply & Install power outlet with cables 3*3m for feeding outdoor PTZ cam', 'Supply & Install power outlet with cables 3*3m for feeding outdoor PTZ cam', NULL, 3, '2025-09-11', '2025-09-13', 'number', 27513.47, 82540.41, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(261, 41, NULL, 'Supply & Install power outlet with cables 3*6m for feeding outdoor rackes', 'Supply & Install power outlet with cables 3*6m for feeding outdoor rackes', NULL, 8, '2025-09-14', '2025-09-17', 'number', 36684.63, 293477.04, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(262, 41, NULL, 'Civil Work', 'Civil Work', NULL, 60, '2025-09-18', '2025-09-20', 'meter', 4585.58, 275134.80, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(263, 41, NULL, 'Testing & commissioning', 'Testing & commissioning', NULL, 1, '2025-09-21', '2025-09-30', 'ls', 110053.90, 110053.90, '2025-07-13 16:50:26', '2025-07-13 17:47:59'),
(264, 42, NULL, 'اعمال السحب والتمديد والترقيم B01', 'Access Point', NULL, 83, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(265, 42, NULL, 'اعمال السحب والتمديد والترقيم B01', 'CCTV outdoor', NULL, 46, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(266, 42, NULL, 'اعمال السحب والتمديد والترقيم B01', 'CCTV indoor', NULL, 207, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(267, 42, NULL, 'اعمال السحب والتمديد والترقيم B01', 'Telephone', NULL, 200, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(268, 42, NULL, 'اعمال السحب والتمديد والترقيم B01', 'Data', NULL, 902, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(269, 42, NULL, 'اعمال السحب والتمديد والترقيم B03', 'CCTV outdoor', NULL, 3, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(270, 42, NULL, 'اعمال السحب والتمديد والترقيم B03', 'Telephone', NULL, 18, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(271, 42, NULL, 'اعمال السحب والتمديد والترقيم B03', 'Data', NULL, 15, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(272, 42, NULL, 'اعمال السحب والتمديد والترقيم B04', 'CCTV outdoor', NULL, 3, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(273, 42, NULL, 'اعمال السحب والتمديد والترقيم B04', 'Telephone', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(274, 42, NULL, 'اعمال السحب والتمديد والترقيم B07', 'Access Point', NULL, 4, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(275, 42, NULL, 'اعمال السحب والتمديد والترقيم B07', 'CCTV outdoor', NULL, 5, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(276, 42, NULL, 'اعمال السحب والتمديد والترقيم B07', 'CCTV indoor', NULL, 7, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(277, 42, NULL, 'اعمال السحب والتمديد والترقيم B07', 'Telephone', NULL, 3, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(278, 42, NULL, 'اعمال السحب والتمديد والترقيم B07', 'Data', NULL, 14, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(279, 42, NULL, 'اعمال السحب والتمديد والترقيم B14', 'CCTV outdoor', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(280, 42, NULL, 'اعمال السحب والتمديد والترقيم B14', 'Telephone', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(281, 42, NULL, 'اعمال السحب والتمديد والترقيم B14', 'Data', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(282, 42, NULL, 'اعمال السحب والتمديد والترقيم B32', 'CCTV outdoor', NULL, 12, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(283, 42, NULL, 'اعمال السحب والتمديد والترقيم B32', 'CCTV indoor', NULL, 8, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(284, 42, NULL, 'اعمال السحب والتمديد والترقيم B32', 'Telephone', NULL, 10, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(285, 42, NULL, 'اعمال السحب والتمديد والترقيم B32', 'Data', NULL, 9, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(286, 42, NULL, 'اعمال السحب والتمديد والترقيم B33-1', 'CCTV outdoor', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(287, 42, NULL, 'اعمال السحب والتمديد والترقيم B33-1', 'Telephone', NULL, 4, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(288, 42, NULL, 'اعمال السحب والتمديد والترقيم B33-1', 'Data', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(289, 42, NULL, 'اعمال السحب والتمديد والترقيم B33-2', 'CCTV outdoor', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(290, 42, NULL, 'اعمال السحب والتمديد والترقيم B33-2', 'Telephone', NULL, 4, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(291, 42, NULL, 'اعمال السحب والتمديد والترقيم B33-2', 'Data', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(292, 42, NULL, 'اعمال السحب والتمديد والترقيم B34', 'Access Point', NULL, 29, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(293, 42, NULL, 'اعمال السحب والتمديد والترقيم B34', 'CCTV outdoor', NULL, 5, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(294, 42, NULL, 'اعمال السحب والتمديد والترقيم B34', 'CCTV indoor', NULL, 65, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(295, 42, NULL, 'اعمال السحب والتمديد والترقيم B34', 'Telephone', NULL, 77, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(296, 42, NULL, 'اعمال السحب والتمديد والترقيم B34', 'Data', NULL, 101, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(297, 42, NULL, 'اعمال السحب والتمديد والترقيم B35', 'CCTV outdoor', NULL, 3, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(298, 42, NULL, 'اعمال السحب والتمديد والترقيم B35', 'Telephone', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(299, 42, NULL, 'اعمال السحب والتمديد والترقيم B35', 'Data', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(300, 42, NULL, 'اعمال السحب والتمديد والترقيم B37-1', 'CCTV outdoor', NULL, 1, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(301, 42, NULL, 'اعمال السحب والتمديد والترقيم B37-1', 'Telephone', NULL, 1, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(302, 42, NULL, 'اعمال السحب والتمديد والترقيم B37-2', 'CCTV outdoor', NULL, 1, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(303, 42, NULL, 'اعمال السحب والتمديد والترقيم B37-2', 'Telephone', NULL, 1, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(304, 42, NULL, 'اعمال السحب والتمديد والترقيم B39', 'Telephone', NULL, 1, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(305, 42, NULL, 'اعمال السحب والتمديد والترقيم B39', 'Data', NULL, 1, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(306, 42, NULL, 'اعمال السحب والتمديد والترقيم B40', 'CCTV outdoor', NULL, 4, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(307, 42, NULL, 'اعمال السحب والتمديد والترقيم B40', 'Telephone', NULL, 4, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(308, 42, NULL, 'اعمال السحب والتمديد والترقيم B40', 'Data', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(309, 42, NULL, 'اعمال السحب والتمديد والترقيم B58', 'CCTV outdoor', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(310, 42, NULL, 'اعمال السحب والتمديد والترقيم B58', 'Telephone', NULL, 1, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(311, 42, NULL, 'اعمال السحب والتمديد والترقيم B58', 'Data', NULL, 1, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(312, 42, NULL, 'اعمال السحب والتمديد مدخل المبني الرئاسي', 'CCTV outdoor', NULL, 4, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(313, 42, NULL, 'اعمال السحب والتمديد مدخل المبني الرئاسي', 'CCTV indoor', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(314, 42, NULL, 'اعمال السحب والتمديد مدخل المبني الرئاسي', 'Telephone', NULL, 3, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(315, 42, NULL, 'اعمال السحب والتمديد مدخل المبني الرئاسي', 'Data', NULL, 13, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(316, 42, NULL, 'اعمال السحب والتمديد مدخل محطة الكهرباء', 'CCTV outdoor', NULL, 4, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(317, 42, NULL, 'اعمال السحب والتمديد مدخل محطة الكهرباء', 'Telephone', NULL, 4, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(318, 42, NULL, 'اعمال السحب والتمديد مدخل محطة الكهرباء', 'Data', NULL, 2, '2025-07-13', '2025-07-13', 'number', NULL, NULL, '2025-07-13 22:29:49', '2025-07-13 22:29:49');

-- --------------------------------------------------------

--
-- Table structure for table `task_progress`
--

CREATE TABLE `task_progress` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `quantity_done` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_progress`
--

INSERT INTO `task_progress` (`id`, `task_id`, `user_id`, `date`, `quantity_done`, `created_at`, `updated_at`) VALUES
(19, 224, 17, '2025-07-12', 4, '2025-07-12 16:17:28', '2025-07-12 16:17:28'),
(20, 237, 2, '2025-07-14', 10, '2025-07-14 23:35:09', '2025-07-14 23:35:09'),
(21, 237, 2, '2025-07-14', 10, '2025-07-14 23:35:09', '2025-07-14 23:35:09');

-- --------------------------------------------------------

--
-- Table structure for table `task_user`
--

CREATE TABLE `task_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_user`
--

INSERT INTO `task_user` (`id`, `task_id`, `user_id`, `project_id`, `quantity`, `created_at`, `updated_at`) VALUES
(226, 159, 2, 34, NULL, NULL, NULL),
(227, 159, 6, 34, NULL, NULL, NULL),
(228, 206, 19, 34, 16, NULL, NULL),
(229, 206, 18, 34, 16, NULL, NULL),
(230, 207, 19, 34, 24, NULL, NULL),
(231, 208, 19, 34, 16, NULL, NULL),
(232, 209, 19, 34, 24, NULL, NULL),
(233, 211, 19, 34, 1, NULL, NULL),
(234, 212, 19, 34, 3, NULL, NULL),
(235, 214, 19, 34, 100, NULL, NULL),
(236, 215, 19, 34, 2, NULL, NULL),
(237, 216, 19, 34, 2, NULL, NULL),
(238, 217, 19, 34, 30, NULL, NULL),
(239, 217, 6, 34, 30, NULL, NULL),
(240, 217, 15, 34, 30, NULL, NULL),
(241, 217, 3, 34, 30, NULL, NULL),
(242, 217, 2, 34, 30, NULL, NULL),
(243, 218, 2, 34, 4, NULL, NULL),
(244, 218, 6, 34, 4, NULL, NULL),
(245, 218, 3, 34, 4, NULL, NULL),
(246, 218, 19, 34, 4, NULL, NULL),
(247, 219, 19, 34, 1, NULL, NULL),
(248, 219, 2, 34, 1, NULL, NULL),
(249, 219, 3, 34, 1, NULL, NULL),
(250, 219, 6, 34, 1, NULL, NULL),
(251, 220, 19, 34, 0, NULL, NULL),
(252, 220, 2, 34, 0, NULL, NULL),
(253, 220, 3, 34, 0, NULL, NULL),
(254, 220, 6, 34, 0, NULL, NULL),
(255, 221, 19, 34, 0, NULL, NULL),
(256, 221, 6, 34, 0, NULL, NULL),
(257, 221, 15, 34, 0, NULL, NULL),
(258, 221, 3, 34, 0, NULL, NULL),
(259, 221, 2, 34, 0, NULL, NULL),
(260, 222, 19, 34, 3, NULL, NULL),
(261, 222, 2, 34, 3, NULL, NULL),
(262, 222, 3, 34, 3, NULL, NULL),
(263, 222, 6, 34, 3, NULL, NULL),
(264, 222, 15, 34, 3, NULL, NULL),
(265, 223, 2, 34, 0, NULL, NULL),
(266, 223, 3, 34, 0, NULL, NULL),
(267, 223, 6, 34, 0, NULL, NULL),
(268, 223, 15, 34, 0, NULL, NULL),
(269, 223, 19, 34, 0, NULL, NULL),
(270, 206, 2, 34, 16, NULL, NULL),
(271, 207, 2, 34, 24, NULL, NULL),
(272, 208, 3, 34, 16, NULL, NULL),
(273, 208, 2, 34, 16, NULL, NULL),
(274, 209, 2, 34, 24, NULL, NULL),
(275, 215, 2, 34, 2, NULL, NULL),
(278, 224, 2, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(279, 224, 17, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(280, 224, 18, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(281, 224, 16, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(282, 224, 25, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(283, 224, 19, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(284, 225, 2, 35, 23, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(285, 225, 17, 35, 23, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(286, 225, 18, 35, 23, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(287, 225, 16, 35, 23, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(288, 225, 25, 35, 23, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(289, 226, 2, 35, 11, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(290, 226, 3, 35, 11, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(291, 227, 2, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(292, 227, 3, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(293, 228, 2, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(294, 228, 18, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(295, 228, 16, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(296, 228, 25, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(297, 228, 6, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(298, 228, 3, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(299, 228, 19, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(300, 228, 17, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(301, 229, 2, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(302, 229, 6, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(303, 229, 17, 35, 2, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(304, 230, 2, 35, 113, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(305, 230, 16, 35, 113, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(306, 230, 25, 35, 113, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(307, 230, 19, 35, 113, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(308, 231, 2, 35, 4, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(309, 231, 17, 35, 4, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(310, 231, 18, 35, 4, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(311, 231, 25, 35, 4, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(312, 231, 3, 35, 4, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(313, 231, 6, 35, 4, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(314, 231, 19, 35, 4, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(315, 232, 2, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(316, 232, 17, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(317, 232, 18, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(318, 232, 16, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(319, 232, 25, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(320, 232, 6, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(321, 232, 19, 35, 3, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(322, 233, 2, 35, 1, '2025-07-02 06:57:28', '2025-07-02 06:57:28'),
(323, 234, 2, 36, 23, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(324, 234, 3, 36, 23, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(325, 234, 6, 36, 23, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(326, 234, 15, 36, 23, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(327, 235, 2, 36, 7, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(328, 235, 3, 36, 7, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(329, 235, 6, 36, 7, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(330, 235, 15, 36, 7, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(331, 236, 2, 36, 43, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(332, 236, 3, 36, 43, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(333, 236, 6, 36, 43, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(334, 236, 15, 36, 43, '2025-07-03 15:48:33', '2025-07-03 15:48:33'),
(335, 237, 2, 37, 3, '2025-07-03 17:58:53', '2025-07-03 17:58:53'),
(336, 237, 3, 37, 3, '2025-07-03 17:58:53', '2025-07-03 17:58:53'),
(337, 237, 6, 37, 3, '2025-07-03 17:58:53', '2025-07-03 17:58:53'),
(338, 237, 18, 37, 3, '2025-07-03 17:58:53', '2025-07-03 17:58:53'),
(339, 238, 2, 38, 16, '2025-07-03 18:13:44', '2025-07-03 18:13:44'),
(340, 238, 18, 38, 16, '2025-07-03 18:13:44', '2025-07-03 18:13:44'),
(341, 238, 16, 38, 16, '2025-07-03 18:13:44', '2025-07-03 18:13:44'),
(342, 239, 2, 39, 21, '2025-07-03 18:29:23', '2025-07-03 18:29:23'),
(343, 239, 6, 39, 21, '2025-07-03 18:29:23', '2025-07-03 18:29:23'),
(344, 240, 2, 40, 1, '2025-07-04 02:03:09', '2025-07-04 02:03:09'),
(345, 240, 6, 40, 1, '2025-07-04 02:03:09', '2025-07-04 02:03:09'),
(346, 138, 2, 30, 80, NULL, NULL),
(347, 138, 17, 30, 80, NULL, NULL),
(348, 138, 18, 30, 80, NULL, NULL),
(349, 138, 25, 30, 80, NULL, NULL),
(350, 138, 15, 30, 80, NULL, NULL),
(351, 139, 2, 30, 6, NULL, NULL),
(352, 139, 17, 30, 6, NULL, NULL),
(353, 139, 18, 30, 6, NULL, NULL),
(354, 139, 25, 30, 6, NULL, NULL),
(355, 139, 15, 30, 6, NULL, NULL),
(356, 140, 2, 30, 1, NULL, NULL),
(357, 140, 17, 30, 1, NULL, NULL),
(358, 140, 18, 30, 1, NULL, NULL),
(359, 140, 25, 30, 1, NULL, NULL),
(360, 140, 15, 30, 1, NULL, NULL),
(361, 141, 2, 30, 4, NULL, NULL),
(362, 141, 17, 30, 4, NULL, NULL),
(363, 141, 18, 30, 4, NULL, NULL),
(364, 141, 25, 30, 4, NULL, NULL),
(365, 141, 15, 30, 4, NULL, NULL),
(366, 142, 2, 30, 30, NULL, NULL),
(367, 142, 17, 30, 30, NULL, NULL),
(368, 142, 18, 30, 30, NULL, NULL),
(369, 142, 25, 30, 30, NULL, NULL),
(370, 142, 15, 30, 30, NULL, NULL),
(371, 143, 2, 30, 90, NULL, NULL),
(372, 143, 17, 30, 90, NULL, NULL),
(373, 143, 18, 30, 90, NULL, NULL),
(374, 143, 25, 30, 90, NULL, NULL),
(375, 143, 15, 30, 90, NULL, NULL),
(376, 144, 2, 30, 10, NULL, NULL),
(377, 144, 17, 30, 10, NULL, NULL),
(378, 144, 18, 30, 10, NULL, NULL),
(379, 144, 25, 30, 10, NULL, NULL),
(380, 144, 15, 30, 10, NULL, NULL),
(381, 145, 2, 30, 10, NULL, NULL),
(382, 145, 17, 30, 10, NULL, NULL),
(383, 145, 18, 30, 10, NULL, NULL),
(384, 145, 25, 30, 10, NULL, NULL),
(385, 145, 15, 30, 10, NULL, NULL),
(386, 146, 2, 30, 1, NULL, NULL),
(387, 146, 17, 30, 1, NULL, NULL),
(388, 146, 18, 30, 1, NULL, NULL),
(389, 146, 25, 30, 1, NULL, NULL),
(390, 146, 15, 30, 1, NULL, NULL),
(391, 147, 2, 30, 700, NULL, NULL),
(392, 147, 17, 30, 700, NULL, NULL),
(393, 147, 18, 30, 700, NULL, NULL),
(394, 147, 25, 30, 700, NULL, NULL),
(395, 147, 15, 30, 700, NULL, NULL),
(396, 148, 2, 30, 10, NULL, NULL),
(397, 148, 17, 30, 10, NULL, NULL),
(398, 148, 18, 30, 10, NULL, NULL),
(399, 148, 25, 30, 10, NULL, NULL),
(400, 148, 15, 30, 10, NULL, NULL),
(401, 149, 2, 30, 10, NULL, NULL),
(402, 149, 17, 30, 10, NULL, NULL),
(403, 149, 18, 30, 10, NULL, NULL),
(404, 149, 25, 30, 10, NULL, NULL),
(405, 149, 15, 30, 10, NULL, NULL),
(406, 150, 2, 30, 1, NULL, NULL),
(407, 150, 17, 30, 1, NULL, NULL),
(408, 150, 18, 30, 1, NULL, NULL),
(409, 150, 25, 30, 1, NULL, NULL),
(410, 150, 15, 30, 1, NULL, NULL),
(411, 151, 2, 30, 0, NULL, NULL),
(412, 151, 17, 30, 0, NULL, NULL),
(413, 151, 18, 30, 0, NULL, NULL),
(414, 151, 25, 30, 0, NULL, NULL),
(415, 151, 15, 30, 0, NULL, NULL),
(416, 152, 2, 30, 1, NULL, NULL),
(417, 152, 17, 30, 1, NULL, NULL),
(418, 152, 18, 30, 1, NULL, NULL),
(419, 152, 25, 30, 1, NULL, NULL),
(420, 152, 15, 30, 1, NULL, NULL),
(421, 153, 2, 30, 0, NULL, NULL),
(422, 153, 17, 30, 0, NULL, NULL),
(423, 153, 18, 30, 0, NULL, NULL),
(424, 153, 25, 30, 0, NULL, NULL),
(425, 153, 15, 30, 0, NULL, NULL),
(426, 154, 2, 30, 1, NULL, NULL),
(427, 154, 17, 30, 1, NULL, NULL),
(428, 154, 18, 30, 1, NULL, NULL),
(429, 154, 25, 30, 1, NULL, NULL),
(430, 154, 15, 30, 1, NULL, NULL),
(431, 155, 2, 30, 2, NULL, NULL),
(432, 155, 17, 30, 2, NULL, NULL),
(433, 155, 18, 30, 2, NULL, NULL),
(434, 155, 25, 30, 2, NULL, NULL),
(435, 155, 15, 30, 2, NULL, NULL),
(436, 156, 2, 30, 2, NULL, NULL),
(437, 156, 17, 30, 2, NULL, NULL),
(438, 156, 18, 30, 2, NULL, NULL),
(439, 156, 25, 30, 2, NULL, NULL),
(440, 156, 15, 30, 2, NULL, NULL),
(441, 157, 2, 30, 20, NULL, NULL),
(442, 157, 17, 30, 20, NULL, NULL),
(443, 157, 18, 30, 20, NULL, NULL),
(444, 157, 25, 30, 20, NULL, NULL),
(445, 157, 15, 30, 20, NULL, NULL),
(446, 158, 2, 30, 0, NULL, NULL),
(447, 158, 17, 30, 0, NULL, NULL),
(448, 158, 18, 30, 0, NULL, NULL),
(449, 158, 25, 30, 0, NULL, NULL),
(450, 158, 15, 30, 0, NULL, NULL),
(451, 241, 2, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(452, 241, 6, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(453, 241, 17, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(454, 241, 19, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(455, 242, 2, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(456, 242, 6, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(457, 242, 17, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(458, 242, 19, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(459, 243, 2, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(460, 243, 6, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(461, 243, 17, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(462, 243, 19, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(463, 244, 2, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(464, 244, 6, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(465, 244, 17, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(466, 244, 19, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(467, 245, 2, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(468, 245, 6, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(469, 245, 17, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(470, 245, 19, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(471, 246, 2, 41, 163, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(472, 246, 6, 41, 163, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(473, 246, 17, 41, 163, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(474, 246, 19, 41, 163, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(475, 247, 2, 41, 6, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(476, 247, 6, 41, 6, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(477, 247, 17, 41, 6, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(478, 247, 19, 41, 6, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(479, 248, 2, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(480, 248, 6, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(481, 248, 17, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(482, 248, 19, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(483, 249, 2, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(484, 249, 6, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(485, 249, 17, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(486, 249, 19, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(487, 250, 2, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(488, 250, 6, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(489, 250, 17, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(490, 250, 19, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(491, 251, 2, 41, 38, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(492, 251, 6, 41, 38, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(493, 251, 17, 41, 38, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(494, 251, 19, 41, 38, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(495, 252, 2, 41, 30, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(496, 252, 6, 41, 30, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(497, 252, 17, 41, 30, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(498, 252, 19, 41, 30, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(499, 253, 2, 41, 50, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(500, 253, 6, 41, 50, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(501, 253, 17, 41, 50, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(502, 253, 19, 41, 50, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(503, 254, 2, 41, 60, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(504, 254, 6, 41, 60, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(505, 254, 17, 41, 60, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(506, 254, 19, 41, 60, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(507, 255, 2, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(508, 255, 6, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(509, 255, 17, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(510, 255, 19, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(511, 256, 2, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(512, 256, 6, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(513, 256, 17, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(514, 256, 19, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(515, 257, 2, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(516, 257, 6, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(517, 257, 17, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(518, 257, 19, 41, 18, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(519, 258, 2, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(520, 258, 6, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(521, 258, 17, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(522, 258, 19, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(523, 259, 2, 41, 1, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(524, 259, 6, 41, 1, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(525, 259, 17, 41, 1, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(526, 259, 19, 41, 1, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(527, 260, 2, 41, 1, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(528, 260, 6, 41, 1, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(529, 260, 17, 41, 1, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(530, 260, 19, 41, 1, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(531, 261, 2, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(532, 261, 6, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(533, 261, 17, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(534, 261, 19, 41, 2, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(535, 262, 2, 41, 15, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(536, 262, 6, 41, 15, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(537, 262, 17, 41, 15, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(538, 262, 19, 41, 15, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(539, 263, 2, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(540, 263, 6, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(541, 263, 17, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(542, 263, 19, 41, 0, '2025-07-13 16:50:26', '2025-07-13 16:50:26'),
(543, 264, 2, 42, 17, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(544, 264, 6, 42, 17, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(545, 264, 33, 42, 17, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(546, 264, 29, 42, 17, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(547, 264, 26, 42, 17, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(548, 265, 2, 42, 9, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(549, 265, 6, 42, 9, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(550, 265, 33, 42, 9, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(551, 265, 29, 42, 9, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(552, 265, 26, 42, 9, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(553, 266, 2, 42, 41, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(554, 266, 6, 42, 41, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(555, 266, 33, 42, 41, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(556, 266, 29, 42, 41, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(557, 266, 26, 42, 41, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(558, 267, 2, 42, 40, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(559, 267, 6, 42, 40, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(560, 267, 33, 42, 40, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(561, 267, 29, 42, 40, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(562, 267, 26, 42, 40, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(563, 268, 2, 42, 180, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(564, 268, 6, 42, 180, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(565, 268, 33, 42, 180, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(566, 268, 29, 42, 180, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(567, 268, 26, 42, 180, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(568, 269, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(569, 269, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(570, 269, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(571, 269, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(572, 269, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(573, 270, 2, 42, 4, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(574, 270, 6, 42, 4, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(575, 270, 33, 42, 4, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(576, 270, 29, 42, 4, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(577, 270, 26, 42, 4, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(578, 271, 2, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(579, 271, 6, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(580, 271, 33, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(581, 271, 29, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(582, 271, 26, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(583, 272, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(584, 272, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(585, 272, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(586, 272, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(587, 272, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(588, 273, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(589, 273, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(590, 273, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(591, 273, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(592, 273, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(593, 274, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(594, 274, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(595, 274, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(596, 274, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(597, 274, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(598, 275, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(599, 275, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(600, 275, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(601, 275, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(602, 275, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(603, 276, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(604, 276, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(605, 276, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(606, 276, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(607, 276, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(608, 277, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(609, 277, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(610, 277, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(611, 277, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(612, 277, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(613, 278, 2, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(614, 278, 6, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(615, 278, 33, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(616, 278, 29, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(617, 278, 26, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(618, 279, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(619, 279, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(620, 279, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(621, 279, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(622, 279, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(623, 280, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(624, 280, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(625, 280, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(626, 280, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(627, 280, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(628, 281, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(629, 281, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(630, 281, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(631, 281, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(632, 281, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(633, 282, 2, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(634, 282, 6, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(635, 282, 33, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(636, 282, 29, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(637, 282, 26, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(638, 283, 2, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(639, 283, 6, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(640, 283, 33, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(641, 283, 29, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(642, 283, 26, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(643, 284, 2, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(644, 284, 6, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(645, 284, 33, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(646, 284, 29, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(647, 284, 26, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(648, 285, 2, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(649, 285, 6, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(650, 285, 33, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(651, 285, 29, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(652, 285, 26, 42, 2, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(653, 286, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(654, 286, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(655, 286, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(656, 286, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(657, 286, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(658, 287, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(659, 287, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(660, 287, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(661, 287, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(662, 287, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(663, 288, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(664, 288, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(665, 288, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(666, 288, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(667, 288, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(668, 289, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(669, 289, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(670, 289, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(671, 289, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(672, 289, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(673, 290, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(674, 290, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(675, 290, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(676, 290, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(677, 290, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(678, 291, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(679, 291, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(680, 291, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(681, 291, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(682, 291, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(683, 292, 2, 42, 6, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(684, 292, 6, 42, 6, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(685, 292, 33, 42, 6, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(686, 292, 29, 42, 6, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(687, 292, 26, 42, 6, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(688, 293, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(689, 293, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(690, 293, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(691, 293, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(692, 293, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(693, 294, 2, 42, 13, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(694, 294, 6, 42, 13, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(695, 294, 33, 42, 13, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(696, 294, 29, 42, 13, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(697, 294, 26, 42, 13, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(698, 295, 2, 42, 15, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(699, 295, 6, 42, 15, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(700, 295, 33, 42, 15, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(701, 295, 29, 42, 15, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(702, 295, 26, 42, 15, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(703, 296, 2, 42, 20, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(704, 296, 6, 42, 20, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(705, 296, 33, 42, 20, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(706, 296, 29, 42, 20, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(707, 296, 26, 42, 20, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(708, 297, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(709, 297, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(710, 297, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(711, 297, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(712, 297, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(713, 298, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(714, 298, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(715, 298, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(716, 298, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(717, 298, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(718, 299, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(719, 299, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(720, 299, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(721, 299, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(722, 299, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(723, 300, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(724, 300, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(725, 300, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(726, 300, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(727, 300, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(728, 301, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(729, 301, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(730, 301, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(731, 301, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(732, 301, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(733, 302, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(734, 302, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(735, 302, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(736, 302, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(737, 302, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(738, 303, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(739, 303, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(740, 303, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(741, 303, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(742, 303, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(743, 304, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(744, 304, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(745, 304, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(746, 304, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(747, 304, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(748, 305, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(749, 305, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(750, 305, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(751, 305, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(752, 305, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(753, 306, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(754, 306, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(755, 306, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(756, 306, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(757, 306, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(758, 307, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(759, 307, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(760, 307, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(761, 307, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(762, 307, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(763, 308, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(764, 308, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(765, 308, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(766, 308, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(767, 308, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(768, 309, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(769, 309, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(770, 309, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(771, 309, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(772, 309, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(773, 310, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(774, 310, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(775, 310, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(776, 310, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(777, 310, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(778, 311, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(779, 311, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(780, 311, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(781, 311, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(782, 311, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(783, 312, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(784, 312, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(785, 312, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(786, 312, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(787, 312, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(788, 313, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(789, 313, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(790, 313, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(791, 313, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(792, 313, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(793, 314, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(794, 314, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(795, 314, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(796, 314, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(797, 314, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(798, 315, 2, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(799, 315, 6, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(800, 315, 33, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(801, 315, 29, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(802, 315, 26, 42, 3, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(803, 316, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(804, 316, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(805, 316, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(806, 316, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(807, 316, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(808, 317, 2, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(809, 317, 6, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(810, 317, 33, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(811, 317, 29, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(812, 317, 26, 42, 1, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(813, 318, 2, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(814, 318, 6, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(815, 318, 33, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(816, 318, 29, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49'),
(817, 318, 26, 42, 0, '2025-07-13 22:29:49', '2025-07-13 22:29:49');

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimated_value` decimal(10,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `name`, `estimated_value`, `description`, `qty`, `created_at`, `updated_at`) VALUES
(1, 'هيلتى', 1000.00, NULL, 5, '2025-05-07 12:01:18', '2025-06-19 01:00:34'),
(2, 'اراجة', 100.00, NULL, 1, '2025-05-07 12:05:06', '2025-06-19 00:59:07'),
(3, 'مفك', 50.00, 'مفك', 8, '2025-05-13 12:32:49', '2025-07-09 01:59:20'),
(4, 'هيلتي', 5000.00, 'Total', 1, '2025-07-09 01:58:42', '2025-07-09 01:58:42');

-- --------------------------------------------------------

--
-- Table structure for table `tool_assignments`
--

CREATE TABLE `tool_assignments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tool_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('assigned','returned','lost') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'assigned',
  `assigned_at` timestamp NULL DEFAULT NULL,
  `returned_at` timestamp NULL DEFAULT NULL,
  `lost_at` timestamp NULL DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tool_assignments`
--

INSERT INTO `tool_assignments` (`id`, `tool_id`, `user_id`, `quantity`, `status`, `assigned_at`, `returned_at`, `lost_at`, `notes`, `created_at`, `updated_at`) VALUES
(15, 1, 2, 1, 'assigned', '2025-07-03 00:10:39', NULL, NULL, NULL, '2025-07-03 00:10:39', '2025-07-03 00:10:39');

-- --------------------------------------------------------

--
-- Table structure for table `tool_deductions`
--

CREATE TABLE `tool_deductions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tool_assignment_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `processed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','acc','proj','employee','tech','managment') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'employee',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `must_change_password` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hire_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `status`, `must_change_password`, `created_at`, `updated_at`, `deleted_at`, `phone`, `hire_date`) VALUES
(1, 'كريم فايق ملاك', 'kmalak@trustits.net', 'admin', NULL, '$2y$12$t2OcX5Qzx.zUwGoaQniXwO0f0khOQ2HfSxHnROCDYD2aYL3v.fF6q', 'mWkQsMlv9uerMNuMWkvtdq3UyXZgWRMMOPndO9mqIp7Kjj5go879RvbkqGFl', 1, 0, '2025-04-06 10:50:55', '2025-07-06 00:21:10', NULL, '01009993245', '2019-06-01'),
(2, 'وليد جابر', 'waleed@trustits.net', 'employee', NULL, '$2y$12$A7YVf3ItSf3U1dp7QZisleuqJ4S4gTbmc0dx8ULt4mXpI7SvnboTC', NULL, 1, 0, '2025-04-06 13:15:00', '2025-07-09 01:38:18', NULL, '01097092022', NULL),
(3, 'محمد عادل', 'm.adel@trustits.net', 'employee', NULL, '$2y$12$z45G5NVn7LM3K7l53ymrV.HAvoDS/zYzIZ0k3yVrfW5J34iKX9t0W', '5i7n9xtMaM6llaFj7DtTWsA1FCLVEEEE1IxCiNskGplkuUbYcnIY5MgRh6Tk', 1, 0, '2025-05-07 10:23:19', '2025-07-09 01:39:50', NULL, '01016139184', NULL),
(6, 'احمد سعيد', 'ahmed.saied@trustits.net', 'employee', NULL, '$2y$12$GudQDK2Egu647AGRWRBYn.E7gmW3P9xvLPpXadO9QqluHxIFZFGNW', '9QIdWVRu9QRZHqbvMfYNMvlP1rRZvlWh8uZ4ErTr6JOsjEZQgfFVpVA5sIm7', 1, 0, '2025-05-27 10:16:18', '2025-07-09 01:39:09', NULL, '01154624822', NULL),
(7, 'محمد صلاح', 'msalah@trustits.net', 'admin', NULL, '$2y$12$Cy/45a4AqKJzjocghekwoe730fPWxEoD4J9is2jbEKDBOy4f6WIO6', 'WS7kkGLB39BsxTeTncZFtyRL56G1KDnbhTFO95zLfXSAzlFjBBQmi2C3MRWL', 1, 0, '2025-06-10 09:00:40', '2025-06-18 05:22:45', NULL, NULL, NULL),
(8, 'محمود صابر', 'tech.office@trustits.net', 'proj', NULL, '$2y$12$X6gtFQornbNcYkddvFALQu1/hXgm8HXd//L8FiSqf.M98i/3OAqNi', NULL, 1, 0, '2025-06-13 14:25:46', '2025-07-14 22:37:09', NULL, NULL, NULL),
(15, 'مراد', 'morad@trustits.net', 'employee', NULL, '$2y$12$KOlPyqVl5IT7a4VcQJk7ouU6rfycdEuHqNeis5CO7lQXg07AMBzqi', NULL, 1, 1, '2025-06-18 23:57:21', '2025-06-18 23:57:21', NULL, NULL, NULL),
(16, 'اسلام عادل', 'islam@trustits.net', 'employee', NULL, '$2y$12$z2OaIsXhKNOC1KkYOrdhJ.vnrnv0rFdf5XeARFIrwx52fqzZz6neW', NULL, 1, 1, '2025-06-18 23:59:03', '2025-07-09 01:43:37', NULL, '01105137808', NULL),
(17, 'سيف عماد', 'sif@trustits.net', 'employee', NULL, '$2y$12$UrOucYsEEv7S23Gd8JGyxOZRHRtlw69kLGYesbz8iM.MXhzVkmQCu', NULL, 1, 0, '2025-06-19 00:00:49', '2025-07-12 16:13:51', NULL, '01115144326', NULL),
(18, 'مصطفي هلال', 'mostafa@trustits.net', 'employee', NULL, '$2y$12$AFdWqgFg61mMYqcOl9d7jeF9nJsXhQcHrbfqHzyLitn4jOgK24oUW', NULL, 1, 0, '2025-06-19 00:01:40', '2025-07-09 01:46:28', NULL, '01004651392', NULL),
(19, 'محمود سالم', 'salem@trustits.net', 'employee', NULL, '$2y$12$weuQ4tNHrghc5fkMKwFtPO0.wRXKqvB0uhC.TfJuh3mCGyEiE/7H6', '8QKoNfddGUDLMrlcC7eUiy93mNCYW6ArfpaAVRpQiWJNAXkOfz2LDFffpJlv', 1, 0, '2025-06-19 00:03:08', '2025-07-09 01:44:07', NULL, '01144073600', NULL),
(20, 'هند صلاح', 'hend@trustits.net', 'acc', NULL, '$2y$12$F8BfTzXJhkEBoS50flyVU.aBlhdNqhZHh25.A5O6S5pGlrtVHmUTS', NULL, 1, 0, '2025-06-19 00:16:58', '2025-07-16 19:16:55', NULL, '01011223788', NULL),
(21, 'رضوي محمد', 'radwa@trustits.net', 'acc', NULL, '$2y$12$UFjTCDCexKHCm4Iaie9nAuUaHYAisUI3B8gRpef4gFNGXesJu8H2S', NULL, 1, 0, '2025-06-22 20:42:48', '2025-07-03 17:33:54', NULL, NULL, NULL),
(22, 'رضوي محمد رشوان', 'radwa1@trustits.net', 'tech', NULL, '$2y$12$VCbaCm33A/z8.hF2mAF/o.q2SnvvZm1paxzUgGKg7tRop0v2wckum', NULL, 1, 1, '2025-06-22 22:33:45', '2025-07-09 01:40:59', NULL, '01023335971', NULL),
(24, 'خالد ربيع', 'accounting@trustits.net', 'acc', NULL, '$2y$12$lzjWqFOMQAeVOIEDClAr5u9JngcYC5baRkdQ2sUcCdENknKvP..Zm', 'rt7dsCg32jWFreP4PqVXJKQqDTX4BQJEQYTZ5OYiTjgk0hUmFHARqhVS9wUT', 1, 0, '2025-06-23 23:14:33', '2025-07-09 01:41:34', NULL, '01002505712', NULL),
(25, 'هارون خالد', 'haron@trustits.net', 'employee', NULL, '$2y$12$KXmNH3fE9wKluCcYhEXTOOv3iJ5RDgKbdat2bjGu2k/KTU44j/iXy', NULL, 1, 1, '2025-06-27 03:08:48', '2025-07-09 01:42:20', NULL, '01068711159', NULL),
(26, 'ع م عبدالعزيز حسين عبد العزيز', 'a1@trustits.net', 'employee', NULL, '$2y$12$Z4DUpKuVZmfqH3UwWyF6VOWwxEWSao5qA042m4q9FJTb4YsBjqG16', NULL, 1, 0, '2025-07-03 20:02:41', '2025-07-12 17:17:27', NULL, NULL, NULL),
(27, 'ع م احمد رمضان محمد', 'a2@trustits.net', 'managment', NULL, '$2y$12$JJ6qYqCXR8KVnqKISPp7W.tv7dwTDhkoVMLD5RkqFeZ0hPjNX/ykK', NULL, 1, 0, '2025-07-03 20:04:18', '2025-07-03 22:30:09', NULL, NULL, NULL),
(28, 'ع م عبدالله ربيع', 'a3@trustits.net', 'employee', NULL, '$2y$12$xZHC/e70rQPKEhV2DH4HpuSQc2.WjwPX4AexhSfHchlYVIwcRIFqC', NULL, 1, 1, '2025-07-03 20:05:36', '2025-07-12 17:18:35', NULL, NULL, NULL),
(29, 'ع م احمد علي عبده', 'a4@trustits.net', 'employee', NULL, '$2y$12$Vj/NfWWwkuArsQ.XdiA1tucxll4pe/OlBnXIDZwPZ8zoVtPpaidya', NULL, 1, 1, '2025-07-03 20:07:47', '2025-07-12 17:17:51', NULL, NULL, NULL),
(30, 'ع م عبده احمد عبده محمد', 'a5@trustits.net', 'managment', NULL, '$2y$12$zrtUqCMTFVDoudjqEBSiEeyXaAGmSepCZotojwn6zFj7fcyWnMHOu', NULL, 1, 1, '2025-07-03 20:08:35', '2025-07-03 22:29:52', NULL, NULL, NULL),
(31, 'ع م محمد محمود جمعه', 'a6@trustits.net', 'employee', NULL, '$2y$12$pTFB81YzurMogmDU9crIf.8MjqKMiCx0I6uIC4Qi497xQuE74TPR2', NULL, 1, 1, '2025-07-03 20:09:59', '2025-07-12 17:20:56', NULL, NULL, NULL),
(32, 'ع م عبدالله فوزي محروس', 'a7@trustits.net', 'employee', NULL, '$2y$12$9pYXrbp4xvXyLqwbafN7ZeTlKKeIOeA8Kzc2pBIoCOVlkucMW5.WG', NULL, 1, 0, '2025-07-03 20:10:50', '2025-07-12 17:19:11', NULL, NULL, NULL),
(33, 'ع م هاني محمد قرني', 'a8@trustits.net', 'employee', NULL, '$2y$12$mtTHLpExwV4TZjqh25lx3O9YhQrs5p/pbdO0SIQwUNlCDjC9Bu6KG', NULL, 1, 1, '2025-07-03 20:11:53', '2025-07-12 17:16:52', NULL, '01007576720', NULL),
(34, 'هند صلاح ابراهيم', 'Hend1@trustits.net', 'managment', NULL, '$2y$12$WvnJpE3ROBLL/ev1VgbdP.5fjOBLtIc9Jf7abFDnOhBDXoTkCN0Se', NULL, 1, 1, '2025-07-03 21:46:11', '2025-07-03 22:28:38', NULL, NULL, NULL),
(35, 'مني صلاح ابراهيم', 'Mona1@trustits.net', 'managment', NULL, '$2y$12$2P7EKDZsOT2amfKfqQTZ4.OqDaogxKGk4ndGxO./Aa2xXmizjLgAK', NULL, 1, 0, '2025-07-03 21:47:16', '2025-07-09 01:42:51', NULL, '01121195616', NULL),
(36, 'رضوي محمد احمد', 'radwa2@trustits.net', 'managment', NULL, '$2y$12$WPtOz8SIjlDizx3gHDzD4ek5WwxA4M32FlTU9HZulyC1jRtQLGY4m', NULL, 1, 0, '2025-07-03 21:48:29', '2025-07-03 22:28:05', NULL, NULL, NULL),
(37, 'عمر بيبرس', 'omar@trustits.net', 'managment', NULL, '$2y$12$A4EhSN2LG3InMoK/OL3pmO/dR/tmwRBD2KmrqKjl72P5AJPopx3pK', NULL, 1, 1, '2025-07-03 21:49:28', '2025-07-14 23:09:12', NULL, NULL, NULL),
(38, 'هيثم خيري', 'H1@trustits.net', 'managment', NULL, '$2y$12$mOm8wfB8BrlB/sFypj7tE.mMs.5vXRqsD3wIGC6S.HDnwQZFUjYbq', NULL, 1, 1, '2025-07-03 21:50:25', '2025-07-14 23:08:43', NULL, NULL, NULL),
(39, 'عبد الرحمن عزب', 'ِAbdo@trustits.net', 'managment', NULL, '$2y$12$ZnWIeavo6Zj0PCmS3.8usu6T6nkTngDF5q1G8.x2UXsMO.HYzfISO', NULL, 1, 1, '2025-07-03 21:51:45', '2025-07-09 01:45:37', NULL, '01009919148', NULL),
(40, 'خالد ربيع شومان', 'accounting@trusits.net', 'employee', NULL, '$2y$12$Yx8S4HN.9yURvT5a9GjV9.QYfAzkmbDhKMOSNbmxoWWssn9sTeVj.', NULL, 1, 1, '2025-07-05 21:04:06', '2025-07-05 21:04:06', NULL, NULL, NULL),
(41, 'احمد حسن', 'a9@trustits.net', 'employee', NULL, '$2y$12$iNo/e13F2sTcUFziY4uPJe3GxAIsJIu0wuV2OFg3FSgWKjSi5Wsqi', NULL, 1, 1, '2025-07-05 21:05:58', '2025-07-05 21:05:58', NULL, NULL, NULL),
(42, 'محمد علي', 'a11@trustits.net', 'employee', NULL, '$2y$12$YfWUIUBwNk.zwnilXd19a.cjIeqyS36ToAf3W7odBUMxPOvGlH/lu', NULL, 1, 1, '2025-07-09 01:53:39', '2025-07-09 01:53:39', NULL, '01011084113', NULL),
(43, 'احمد علي عبده محمد', 'h@trustits.net', 'employee', NULL, '$2y$12$mjllbmIWaEvZ668y.u.00eT5OJw7zFMTPacO4/YdGerxwWhsRl416', NULL, 1, 0, '2025-07-16 23:38:09', '2025-07-16 23:38:09', NULL, '1486441', NULL),
(44, 'اسلام اسامه عبد المنعم', 'a@trustits.net', 'employee', NULL, '$2y$12$Ffvi6IpYQhyxgWR7pfh1/e6QalIEi7Lk2Fpk.Nc0xxMKEk3A9esH.', NULL, 1, 0, '2025-07-16 23:38:44', '2025-07-16 23:38:44', NULL, '1486441', NULL),
(45, 'ادهم احمد ابراهيم', 'q@trustits.net', 'employee', NULL, '$2y$12$p2ZTVO7NFQRzhj6/DCi35O17g35GvwJp/WT5QXrVNB9HfTyo8emva', NULL, 1, 0, '2025-07-16 23:39:08', '2025-07-16 23:39:08', NULL, '1486441', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `check_in` timestamp NULL DEFAULT NULL,
  `check_out` timestamp NULL DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `report_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_late` tinyint(4) DEFAULT NULL,
  `in_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `out_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`id`, `user_id`, `customer_id`, `check_in`, `check_out`, `notes`, `report_path`, `is_late`, `in_location`, `out_location`, `created_at`, `updated_at`) VALUES
(28, 1, 5, NULL, NULL, NULL, 'reports/p20iG3WtR0rbCQuGXxpWqZPek49j5fMgfROE25Xa.jpg', 1, NULL, NULL, '2025-07-03 00:02:33', '2025-07-03 02:07:54'),
(33, 1, 4, NULL, NULL, NULL, 'reports/HbLrQYQJwvM5a7YELU5Jh36CYXyX3m7Z9LqShhry.jpg', 1, NULL, NULL, '2025-07-09 18:54:34', '2025-07-09 20:21:33'),
(34, 17, 2, NULL, NULL, NULL, NULL, 1, NULL, NULL, '2025-07-12 16:23:49', '2025-07-12 16:23:49'),
(35, 1, 1, NULL, NULL, 'مطلوب زيارة اكتوبر ومقابله محمد فاوي لمعاينه وتعديل الكاميرات', 'reports/KxNwaqpAmZ1Dt0bDsNJvVLQt3E69B039RSD8P276.jpg', 1, NULL, NULL, '2025-07-14 20:17:31', '2025-07-14 20:28:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advances`
--
ALTER TABLE `advances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `advances_user_id_foreign` (`user_id`),
  ADD KEY `advances_project_id_forign` (`project_id`),
  ADD KEY `advances_given_by_foreign` (`given_by`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendances_user_id_foreign` (`user_id`),
  ADD KEY `attendances_project_id_foreign` (`project_id`),
  ADD KEY `attendances_customer_id_foreign` (`visit_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deductions`
--
ALTER TABLE `deductions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deductions_user_id_foreign` (`user_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_advance_id_foreign` (`advance_id`),
  ADD KEY `expenses_storedby_id_foreign` (`user_id`),
  ADD KEY `expenses_stored_by_foreign` (`stored_by`);

--
-- Indexes for table `extractions`
--
ALTER TABLE `extractions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `extractions_project_id_foreign` (`project_id`);

--
-- Indexes for table `extraction_items`
--
ALTER TABLE `extraction_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `extraction_items_extraction_id_foreign` (`extraction_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issues_user_id_foreign` (`user_id`),
  ADD KEY `issues_task_id_foreign` (`task_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loans_employee_id_foreign` (`employee_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_created_by_foreign` (`created_by`);

--
-- Indexes for table `project_user`
--
ALTER TABLE `project_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_user_project_id_foreign` (`project_id`),
  ADD KEY `project_user_user_id_foreign` (`user_id`);

--
-- Indexes for table `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rewards_user_id_foreign` (`user_id`);

--
-- Indexes for table `salaries`
--
ALTER TABLE `salaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salaries_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_project_id_foreign` (`project_id`),
  ADD KEY `tasks_user_id_foreign` (`user_id`);

--
-- Indexes for table `task_progress`
--
ALTER TABLE `task_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_progress_task_id_foreign` (`task_id`),
  ADD KEY `task_progress_user_id_foreign` (`user_id`);

--
-- Indexes for table `task_user`
--
ALTER TABLE `task_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_user_task_id_foreign` (`task_id`),
  ADD KEY `task_user_user_id_foreign` (`user_id`),
  ADD KEY `task_user_project_id_foreign` (`project_id`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tool_assignments`
--
ALTER TABLE `tool_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tool_assignments_tool_id_foreign` (`tool_id`),
  ADD KEY `tool_assignments_user_id_foreign` (`user_id`);

--
-- Indexes for table `tool_deductions`
--
ALTER TABLE `tool_deductions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tool_deductions_tool_assignment_id_foreign` (`tool_assignment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visits_user_id_foreign` (`user_id`),
  ADD KEY `visits_customer_id_foreign` (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advances`
--
ALTER TABLE `advances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `deductions`
--
ALTER TABLE `deductions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extractions`
--
ALTER TABLE `extractions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `extraction_items`
--
ALTER TABLE `extraction_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `project_user`
--
ALTER TABLE `project_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `salaries`
--
ALTER TABLE `salaries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=319;

--
-- AUTO_INCREMENT for table `task_progress`
--
ALTER TABLE `task_progress`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `task_user`
--
ALTER TABLE `task_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=818;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tool_assignments`
--
ALTER TABLE `tool_assignments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tool_deductions`
--
ALTER TABLE `tool_deductions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advances`
--
ALTER TABLE `advances`
  ADD CONSTRAINT `advances_given_by_foreign` FOREIGN KEY (`given_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `advances_project_id_forign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `advances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendance_visit_id_forign` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendances_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `deductions`
--
ALTER TABLE `deductions`
  ADD CONSTRAINT `deductions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_advance_id_foreign` FOREIGN KEY (`advance_id`) REFERENCES `advances` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `expenses_stored_by_foreign` FOREIGN KEY (`stored_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `expenses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `extractions`
--
ALTER TABLE `extractions`
  ADD CONSTRAINT `extractions_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `extraction_items`
--
ALTER TABLE `extraction_items`
  ADD CONSTRAINT `extraction_items_extraction_id_foreign` FOREIGN KEY (`extraction_id`) REFERENCES `extractions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `issues`
--
ALTER TABLE `issues`
  ADD CONSTRAINT `issues_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `issues_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_user`
--
ALTER TABLE `project_user`
  ADD CONSTRAINT `project_user_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rewards`
--
ALTER TABLE `rewards`
  ADD CONSTRAINT `rewards_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `salaries`
--
ALTER TABLE `salaries`
  ADD CONSTRAINT `salaries_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_progress`
--
ALTER TABLE `task_progress`
  ADD CONSTRAINT `task_progress_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_progress_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_user`
--
ALTER TABLE `task_user`
  ADD CONSTRAINT `task_user_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_user_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tool_assignments`
--
ALTER TABLE `tool_assignments`
  ADD CONSTRAINT `tool_assignments_tool_id_foreign` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tool_assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tool_deductions`
--
ALTER TABLE `tool_deductions`
  ADD CONSTRAINT `tool_deductions_tool_assignment_id_foreign` FOREIGN KEY (`tool_assignment_id`) REFERENCES `tool_assignments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `visits_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `visits_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

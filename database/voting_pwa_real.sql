-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 11:11 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `voting_pwa`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `campaign_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scheduled_on` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `candidate_id`, `campaign_id`, `scheduled_on`, `created_at`, `updated_at`) VALUES
(1, 1, '7F6Hh', '2023-06-08 07:50:53', '2023-06-08 06:51:06', '2023-06-08 06:51:06');

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('faculty','department') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `candidates`
--

INSERT INTO `candidates` (`id`, `user_id`, `post_id`, `type`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'department', '2023-06-08 12:44:28', '2023-06-08 12:44:28'),
(2, 2, 1, 'department', '2022-11-15 03:39:37', '2023-04-06 12:49:10'),
(3, 3, 1, 'department', '2023-04-18 12:49:10', '2022-12-20 17:28:37'),
(4, 4, 1, 'department', '2023-06-08 12:44:28', '2023-06-08 12:44:28'),
(5, 5, 1, 'department', '2022-11-15 03:39:37', '2023-04-06 12:49:10'),
(6, 6, 1, 'department', '2023-04-18 12:49:10', '2022-12-20 17:28:37'),
(7, 7, 1, 'department', '2023-06-08 12:44:28', '2023-06-08 12:44:28'),
(8, 8, 1, 'department', '2022-11-15 03:39:37', '2023-04-06 12:49:10'),
(9, 9, 2, 'department', '2023-04-18 12:49:10', '2022-12-20 17:28:37'),
(10, 10, 3, 'department', '2023-06-08 12:44:28', '2023-06-08 12:44:28'),
(11, 11, 2, 'department', '2022-11-15 03:39:37', '2023-04-06 12:49:10'),
(12, 12, 2, 'department', '2023-04-18 12:49:10', '2022-12-20 17:28:37'),
(13, 13, 2, 'department', '2022-11-15 03:39:37', '2023-04-06 12:49:10'),
(14, 14, 3, 'department', '2023-04-18 12:49:10', '2022-12-20 17:28:37'),
(15, 15, 4, 'department', '2022-11-15 03:39:37', '2023-04-06 12:49:10');

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
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_04_11_154036_create_posts_table', 1),
(6, '2023_04_11_154854_create_candidates_table', 1),
(7, '2023_04_11_155311_create_votes_table', 1),
(8, '2023_04_14_082525_create_winners_table', 1),
(9, '2023_04_23_115047_create_campaigns_table', 1),
(10, '2023_04_23_135458_create_videos_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` enum('president','vice president','secretary general','vice secretary general','financial secretary','treasurer','academic affairs officer','public relation officer','auditor 1','auditor 2','sports coordinator 1','sports coordinator 2','welfare officer','general organizer') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'president', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2022-11-16 00:11:19', '2023-04-06 20:49:10'),
(2, 'vice president', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2023-04-18 20:49:10', '2022-12-21 02:28:37'),
(3, 'secretary general', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2022-11-15 12:39:37', '2023-04-06 20:49:10'),
(4, 'vice secretary general', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2023-04-18 20:49:10', '2022-12-21 02:28:37'),
(5, 'financial secretary', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2022-10-26 12:29:58', '2023-03-11 20:39:37'),
(6, 'treasurer', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2023-04-18 20:49:10', '2022-12-21 02:28:37'),
(7, 'academic affairs officer', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2022-11-15 12:39:37', '2023-04-06 20:49:10'),
(8, 'public relation officer', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2023-04-18 20:49:10', '2022-12-21 02:28:37'),
(9, 'auditor 1', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2022-11-16 00:11:19', '2022-10-26 12:29:58'),
(10, 'auditor 2', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2023-04-18 20:49:10', '2022-12-21 02:28:37'),
(11, 'sports coordinator 1', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2023-03-15 11:39:37', '2023-03-15 11:39:37'),
(12, 'sports coordinator 2', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2023-04-18 20:49:10', '2022-12-21 02:28:37'),
(13, 'welfare officer', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2022-11-16 00:11:19', '2023-04-06 20:49:10'),
(14, 'general organizer', '                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!|                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos perspiciatis iure consequatur animi alias molestias recusandae est id architecto at nam ducimus consequuntur, maiores a cum quis impedit deserunt! Nobis!\r\n\r\n', '2023-04-18 20:49:10', '2022-12-21 02:28:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricule` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `matricule`, `faculty`, `department`, `option`, `level`, `photo`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Lilian Tabe', 'CT21A001', 'college of technology', 'computer engineering', 'software', 'level 200', 'users/MSChz6JP36DuUFmufYf0U3iDz1wxj7EBaEj1Cg3U.jpg', '$2y$10$04dULLtszeFfQu0YTORI2.68WONgSKQJyvtE.e7aLuE.KIB46XrjG', NULL, '2023-06-08 12:15:56', '2023-06-08 12:15:56'),
(2, 'Nfor Roland', 'CT21A002', 'college of technology', 'computer engineering', 'software', 'level 200', 'users/JzzKfEEFWfw6baabS3eh4hYXZtcx3OjcGLgH51Fy.jpg', '$2y$10$anmWLHdWaS/DqG.TVTNwP.A4RseMRHZHuUZA3YwVASF6a8FRi2.4i', NULL, '2023-06-08 12:42:30', '2023-06-08 12:42:30'),
(3, 'Joyce Atabong', 'CT21A003', 'college of technology', 'computer engineering', 'network', 'level 300', 'users/un8ctWjkuLToFmF7Ls4p6DGbfhYytQZe9aWq2x2e.jpg', '$2y$10$j.Lr2JB17minpVmU7dVBheQ4J/mzX7C4lO/kVaoeC4gMD24g0eAyG', NULL, '2023-06-09 05:06:39', '2023-06-09 05:06:39'),
(4, 'Lucie Ewang', 'CT21A004', 'college of technology', 'computer engineering', 'network', 'level 300', 'users/VJuKIUuphGreKAkV4DStYmlG0HrHUhmP1kovEHxY.jpg', '$2y$10$.wgKvCllRlUg5G0ShmwOKO215aRArnVx0agTXTUz7UbjdbxXYDAgi', NULL, '2023-06-09 05:12:27', '2023-06-09 05:12:27'),
(5, 'Abigail Njong', 'CT21A005', 'college of technology', 'computer engineering', 'network', 'level 300', 'users/5DZXioj22FkAbQHMYUdH6CMHBrHvpvqFtQmcDt2b.jpg', '$2y$10$7wTmbzbTH6BfjKmdqm7C8.CTRNoOWZ2Zn2zqeShH6J8VdvQqsekXK', NULL, '2023-06-09 05:13:49', '2023-06-09 05:13:49'),
(6, 'Princess Muana', 'CT21A006', 'college of technology', 'computer engineering', 'software', 'level 400', 'users/TPMBoxhcObxvXqnFXUVPemXVRo6HOzqCkNwqOkly.jpg', '$2y$10$2GeA0hSlwBtOsVW9SMZpt.1q0J/mtC2qtBTIGk2.nowYixy5IGIja', NULL, '2023-06-09 05:14:29', '2023-06-09 05:14:29'),
(7, 'Njoya Kindness', 'CT21A007', 'college of technology', 'computer engineering', 'software', 'level 400', 'users/pjosSizhMhGRXmKWrRshqffb4uaAAWZjZEbR3giZ.jpg', '$2y$10$aO6sHa7huLvdu1Anb4s7QuK/MSwVKZ16f/HIfIP.zXZA2fSsz36Se', NULL, '2023-06-09 05:15:16', '2023-06-09 05:15:16'),
(8, 'Gwei Michael', 'CT21A008', 'college of technology', 'computer engineering', 'software', 'level 400', 'users/FDZ7XOiBVr7qQew2BIqBhkgOXwCOGYQnjhPIvLvT.jpg', '$2y$10$.mnIG8SNKfoHjUmr7rFF/elkrWb1w85FYoLaErDzw/aqGDCevKWx6', NULL, '2023-06-09 05:16:32', '2023-06-09 05:16:32'),
(9, 'Armstrong Mangwa', 'CT21A009', 'college of technology', 'computer engineering', 'software', 'level 400', 'users/8xG2YZE4NvIoAlbPwCIJ13pqCab0dbPa7D13VqV0.jpg', '$2y$10$/l2EgacQTe9eOrQUMV6tJuTYvIzEXJpQBTv94tZMqgxK7YiOsz6pS', NULL, '2023-06-09 05:17:35', '2023-06-09 05:17:35'),
(10, 'Theresia Malle', 'CT21A010', 'college of technology', 'computer engineering', 'network', 'level 300', 'users/ryOJGSBDf4hZdSBW7ePGsghaZ25AX73kAhjbSDvp.jpg', '$2y$10$sneLGQEEYpI.tLm0jP2Oiej7q9AIvDIOdXUcsB9VQn3xGkQheend6', NULL, '2023-06-09 05:18:52', '2023-06-09 05:18:52'),
(11, 'Nde Armand', 'CT21A011', 'college of technology', 'computer engineering', 'network', 'level 300', 'users/DBhnwZ1QqfdIpCR1e1k0JBQF5Ue10INP5tLSFfW1.jpg', '$2y$10$sD75WglAOcZSunMXANEWmO33ZoW4jH.m6FObQwKrRIpjpTSYyeiaK', NULL, '2023-06-09 05:19:56', '2023-06-09 05:19:56'),
(12, 'Albert Wawa', 'CT21A012', 'college of technology', 'computer engineering', 'network', 'level 300', 'users/MKW8BXLHmHfdZHh232ACN3aT5eD50K3RGbcPrgNw.jpg', '$2y$10$OKrDPlJz207wjLx3RJifGOovD3Wf2eo2e3CI/bdCj0ss33A24Essa', NULL, '2023-06-09 05:20:45', '2023-06-09 05:20:45'),
(13, 'Einstein Aloy', 'CT21A013', 'college of technology', 'computer engineering', 'software', 'level 400', 'users/ke9WEeIp7EAyBvPqstIdcS7RyzuTJDvjMPefu3Yr.jpg', '$2y$10$O6/jXavSKZpaqO6MqHsl1O7z.BPwQAQPzipSbuWJ8o53dSB4qE8mu', NULL, '2023-06-09 05:21:49', '2023-06-09 05:21:49'),
(14, 'Eliness Manjong', 'CT21A014', 'college of technology', 'computer engineering', 'software', 'level 400', 'users/bN7HyQfOQcSDxlFIiLVpEIIoW6n7PwkyRFOUelFs.jpg', '$2y$10$rU3GJsYVPvcavODSbBnB1OZdLLrial0WS9./TNuZSe2t1gBRvtyN2', NULL, '2023-06-09 05:22:24', '2023-06-09 05:22:24'),
(15, 'Brenda Biya', 'CT21A015', 'college of technology', 'computer engineering', 'software', 'level 200', 'users/ynVMXSzGws6L9zWtebhmozMOx6KIFrmeDO20gfeR.jpg', '$2y$10$PpNTDaZi15ZFCRdVtXNPP.HoW5Fq3BNtL8w3p4SEt3M.wwCOFOZm2', NULL, '2023-06-09 05:28:58', '2023-06-09 05:28:58'),
(16, 'Adele Guana', 'CT21A016', 'college of technology', 'electrical engineering', 'power system', 'level 200', 'users/brJ1SqRXUiTPRaUboWpXa2pXQdpo1jrQ6AX2X6xM.jpg', '$2y$10$vWsH.gLqblXF/Wz/kndoreOGyUbtxuKc3WS4NCVVtEWbLLkFzErhu', NULL, '2023-06-09 05:29:43', '2023-06-09 05:29:43'),
(17, 'Francis Armand', 'CT21A017', 'college of technology', 'electrical engineering', 'power system', 'level 300', 'users/fPZcUo64T8K157Hl9IJLl0F776TBc52IeYQIpVvU.jpg', '$2y$10$dzz4Khdqww9eHPaVAu09f.he/J/472aFSm7T5iZr7bQQFM5RqqwiS', NULL, '2023-06-09 05:30:53', '2023-06-09 05:30:53'),
(18, 'Gabriel Asong', 'CT21A018', 'college of technology', 'electrical engineering', 'telecommunication', 'level 300', 'users/uFkVIWvddAsibyGaDlIJuzjZ0td5an9jvsBNIHna.jpg', '$2y$10$AA8ylD2k.IqgFWAncf1CXO6SZAokPYSgGGWHwX2fPmG61JdM.7I0u', NULL, '2023-06-09 05:32:41', '2023-06-09 05:32:41'),
(19, 'Ojong Martins', 'CT21A019', 'college of technology', 'electrical engineering', 'telecommunication', 'level 300', 'users/l5Ml1Yc80lcRcix3kYlhjS8sf66uQaHa6UlBRUMW.jpg', '$2y$10$rYzq/mmjy2Rx92yt2XAsK.PwBzoY1wG9foc2Xp5pAUAQ2ll.Dk8F2', NULL, '2023-06-09 05:33:22', '2023-06-09 05:33:22'),
(20, 'Blessing Obi', 'CT21A020', 'college of technology', 'electrical engineering', 'telecommunication', 'level 300', 'users/eieKGO79YCqpiG14Ec496OCPGui6yVXdDxRYyf3G.jpg', '$2y$10$FIkil8PaqUhlesFneDVy9emwkbRmkJUA6arZR0BqljT/mAFTgAhXS', NULL, '2023-06-09 05:34:47', '2023-06-09 05:34:47');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `voters` text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '[]',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `candidate_id`, `voters`, `created_at`, `updated_at`) VALUES
(1, 1, '[1]', '2023-06-08 06:38:40', '2023-06-08 06:39:19');

-- --------------------------------------------------------

--
-- Table structure for table `winners`
--

CREATE TABLE `winners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `candidate_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('department','faculty') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `winners`
--

INSERT INTO `winners` (`id`, `user_id`, `post_id`, `candidate_id`, `type`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'department', '2023-06-08 06:42:01', '2023-06-08 06:42:01'),
(2, 9, 2, 9, 'department', '2023-06-08 06:42:01', '2023-06-08 06:42:01'),
(3, 10, 3, 10, 'department', '2023-06-08 06:42:01', '2023-06-08 06:42:01'),
(4, 15, 4, 15, 'department', '2023-06-08 06:42:01', '2023-06-08 06:42:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaigns_candidate_id_foreign` (`candidate_id`);

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `candidates_user_id_foreign` (`user_id`),
  ADD KEY `candidates_post_id_foreign` (`post_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

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
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_matricule_unique` (`matricule`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_candidate_id_foreign` (`candidate_id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votes_candidate_id_foreign` (`candidate_id`);

--
-- Indexes for table `winners`
--
ALTER TABLE `winners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `winners_user_id_foreign` (`user_id`),
  ADD KEY `winners_post_id_foreign` (`post_id`),
  ADD KEY `winners_candidate_id_foreign` (`candidate_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `winners`
--
ALTER TABLE `winners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD CONSTRAINT `campaigns_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `candidates_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `candidates_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `winners`
--
ALTER TABLE `winners`
  ADD CONSTRAINT `winners_candidate_id_foreign` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `winners_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `winners_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

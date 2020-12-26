-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: campus
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conversation`
--

-- DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thread_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incomplete_application`
--

-- DROP TABLE IF EXISTS `incomplete_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incomplete_application` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `job_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incomplete_application`
--

LOCK TABLES `incomplete_application` WRITE;
/*!40000 ALTER TABLE `incomplete_application` DISABLE KEYS */;
/*!40000 ALTER TABLE `incomplete_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_application`
--

-- DROP TABLE IF EXISTS `job_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_application` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_id` varchar(255) DEFAULT NULL,
  `job_id` varchar(255) DEFAULT NULL,
  `applicant_id` varchar(255) DEFAULT NULL,
  `recruiter_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_application`
--

LOCK TABLES `job_application` WRITE;
/*!40000 ALTER TABLE `job_application` DISABLE KEYS */;
INSERT INTO `job_application` VALUES (1,'5eec4cf9f31cae31ae9ee456','5eeb113db049281598a8d1dc','5ecc8bd8256e562a8cce76c4','5ecc8bd8256e562a8cce76c4');
/*!40000 ALTER TABLE `job_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_job`
--

-- DROP TABLE IF EXISTS `saved_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `applicant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_job`
--

LOCK TABLES `saved_job` WRITE;
/*!40000 ALTER TABLE `saved_job` DISABLE KEYS */;
/*!40000 ALTER TABLE `saved_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `view_count`
--

-- DROP TABLE IF EXISTS `view_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `view_count` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `view_count`
--

LOCK TABLES `view_count` WRITE;
/*!40000 ALTER TABLE `view_count` DISABLE KEYS */;
/*!40000 ALTER TABLE `view_count` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-20 13:00:56

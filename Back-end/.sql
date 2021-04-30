/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 8.0.11 : Database - webtest
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`webtest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;

USE `webtest`;

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
                              `department` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                              PRIMARY KEY (`department`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Data for the table `department` */

insert  into `department`(`department`) values
('Institute of Leadership and Educational Advanced Development'),
('International Business School Suzhou'),
('School of Advanced Technology'),
('School of Design'),
('School of Film and Television Arts'),
('School of Humanities and Social Sciences'),
('School of Languages'),
('School of Science');

/*Table structure for table `email` */

DROP TABLE IF EXISTS `email`;

CREATE TABLE `email` (
                         `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                         `code` int(10) NOT NULL,
                         `dateStr` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                         PRIMARY KEY (`email`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Data for the table `email` */


/*Table structure for table `gender` */

DROP TABLE IF EXISTS `gender`;

CREATE TABLE `gender` (
                          `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                          PRIMARY KEY (`gender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Data for the table `gender` */

insert  into `gender`(`gender`) values
('Female'),
('Male');

/*Table structure for table `grade` */

DROP TABLE IF EXISTS `grade`;

CREATE TABLE `grade` (
                         `grade` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                         PRIMARY KEY (`grade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Data for the table `grade` */

insert  into `grade`(`grade`) values
('Year 1'),
('Year 2'),
('Year 3'),
('Year 4');

/*Table structure for table `info` */

DROP TABLE IF EXISTS `info`;

CREATE TABLE `info` (
                        `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                        `gender` varchar(10) COLLATE utf8mb4_bin DEFAULT NULL,
                        `department` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                        `grade` varchar(10) COLLATE utf8mb4_bin DEFAULT NULL,
                        `routine` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                        `contact` varchar(60) COLLATE utf8mb4_bin DEFAULT NULL,
                        `description` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
                        PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Data for the table `info` */

/*Table structure for table `routine` */

DROP TABLE IF EXISTS `routine`;

CREATE TABLE `routine` (
                           `routine` varchar(30) COLLATE utf8mb4_bin NOT NULL,
                           PRIMARY KEY (`routine`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Data for the table `routine` */

insert  into `routine`(`routine`) values
('After 11:30'),
('Before 11:30');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
                        `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                        `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                        `password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                        PRIMARY KEY (`email`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

/*Data for the table `user` */


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

CREATE TABLE `topic` (
                         `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `title` varchar(60) NOT NULL,
                         `post_time` VARCHAR(50) NOT NULL,
                         `create_by` VARCHAR(50) NOT NULL,
                         `gender` VARCHAR(50) NOT NULL,
                         `routine` VARCHAR(50) NOT NULL,
                         `location` VARCHAR(50) NOT NULL,
                         `user_number` INT DEFAULT 1,
                         `body` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


CREATE TABLE `topic_user` (
                              `email` VARCHAR(50) NOT NULL ,
                              `topic_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `application` (
                               `email` VARCHAR(50) NOT NULL ,
                               `topic_id` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

alter table application add column introduction varchar(255);
alter table application add column applytime varchar(255);
alter table application add column state int;


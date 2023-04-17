CREATE DATABASE IF NOT EXISTS cartoon;
USE cartoon;
CREATE TABLE `Casts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Characters` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Cast_Characters` (
    `cast_id` int DEFAULT NULL,
    `character_id` int DEFAULT NULL,
    KEY `cast_id` (`cast_id`),
    KEY `character_id` (`character_id`),
    CONSTRAINT `Cast_Characters_ibfk_1` FOREIGN KEY (`cast_id`) REFERENCES `Casts` (`id`),
    CONSTRAINT `Cast_Characters_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `Characters` (`id`)
);
INSERT INTO
    `Characters`
VALUES
    (1, 'Homer Simpson');
INSERT INTO
    `Casts`
VALUES
    (198, 'Dan Castellaneta');
INSERT INTO
    `Cast_Characters`
VALUES
    (198, 1);
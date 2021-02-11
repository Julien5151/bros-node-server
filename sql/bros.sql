CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `phone` varchar(255) UNIQUE,
  `address` varchar(255),
  `zipcode` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` ENUM ('visitor', 'bro', 'corporate', 'admin') NOT NULL,
  `created_at` datetime NOT NULL,
  `group_id` int
);

CREATE TABLE `friend_groups` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` ENUM ('friends', 'himym') NOT NULL,
  `created_at` datetime NOT NULL
);

ALTER TABLE `users` ADD FOREIGN KEY (`group_id`) REFERENCES `friend_groups` (`id`);

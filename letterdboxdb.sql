-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:8889
-- Время создания: Май 14 2020 г., 12:25
-- Версия сервера: 5.7.25
-- Версия PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `letterdbox`
--

-- --------------------------------------------------------

--
-- Структура таблицы `activity`
--

CREATE TABLE `activity` (
  `user_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `film_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `activity`
--

INSERT INTO `activity` (`user_id`, `film_id`, `film_title`, `action`, `date`) VALUES
(21, 2, 'mom and daughter', 'liked', '2020-04-05'),
(21, 2, 'mom and daughter', 'deleted like from', '2020-04-05'),
(21, 2, 'mom and daughter', 'deleted from watchlist', '2020-04-05'),
(21, 2, 'mom and daughter', 'added to watchlist', '2020-04-05'),
(21, 3, 'great daughter', 'liked', '2020-04-05'),
(21, 3, 'great daughter', 'deleted like from', '2020-04-05'),
(21, 4, 'great journey', 'added to watchlist', '2020-04-05'),
(21, 5, 'My thoughts are silent', 'deleted from watched film', '2020-04-05'),
(21, 4, 'great journey', 'deleted like from', '2020-04-05'),
(21, 4, 'great journey', 'liked', '2020-04-05'),
(21, 5, 'My thoughts are silent', 'deleted from watchlist', '2020-04-05'),
(21, 5, 'My thoughts are silent', 'added to watchlist', '2020-04-05'),
(21, 5, 'My thoughts are silent', 'watched', '2020-04-05'),
(21, 1, 'Thoughts of my mom', 'updated', '2020-04-05'),
(21, 1, 'Thoughts of my mom', 'added review to', '2020-04-05'),
(21, 3, 'great daughter', 'added to watchlist', '2020-04-06'),
(21, 1, 'Thoughts of my mom', 'deleted from watched film', '2020-04-06'),
(21, 3, 'great daughter', 'deleted from watched film', '2020-04-06'),
(21, 3, 'great daughter', 'liked', '2020-04-06'),
(21, 2, 'mom and daughter', 'liked', '2020-04-06'),
(21, 4, 'great journey', 'deleted like from', '2020-04-06'),
(21, 3, 'great daughter', 'deleted like from', '2020-04-06'),
(21, 1, 'Thoughts of my mom', 'added review to', '2020-04-07'),
(21, 1, 'Thoughts of my mom', 'watched', '2020-04-07'),
(21, 4, 'great journey', 'liked', '2020-04-12'),
(21, 3, 'great daughter', 'watched', '2020-04-12'),
(21, 2, 'mom and daughter', 'deleted from watched film', '2020-04-12'),
(21, 2, 'mom and daughter', 'deleted like from', '2020-04-19'),
(21, 1, 'Thoughts of my mom', 'deleted from watchlist', '2020-04-19'),
(21, 3, 'great daughter', 'liked', '2020-04-19'),
(21, 3, 'great daughter', 'updated', '2020-04-19'),
(21, 4, 'great journey', 'updated', '2020-04-19'),
(21, 2, 'mom and daughter', 'watched', '2020-04-21'),
(21, 2, 'mom and daughter', 'liked', '2020-04-21'),
(21, 2, 'mom and daughter', 'deleted from watched film', '2020-04-21'),
(21, 5, 'My thoughts are silent', 'deleted from watchlist', '2020-04-21'),
(21, 1, 'Thoughts of my mom', 'added to watchlist', '2020-04-21'),
(21, 1, 'Thoughts of my mom', 'deleted like from', '2020-04-21'),
(21, 3, 'great daughter', 'deleted like from', '2020-04-21'),
(21, 4, 'great journey', 'deleted from watched film', '2020-04-21'),
(21, 4, 'great journey', 'watched', '2020-04-25'),
(21, 4, 'great journey', 'added review to', '2020-04-25'),
(21, 5, 'My thoughts are silent', 'added review to', '2020-04-25'),
(21, 5, 'My thoughts are silent', 'updated review of', '2020-04-25'),
(21, 2, 'mom and daughter', 'watched', '2020-04-30'),
(21, 2, 'mom and daughter', 'added review to', '2020-04-30'),
(21, 5, 'My thoughts are silent', 'updated', '2020-04-30'),
(21, 1, 'Thoughts of my mom', 'added review to', '2020-05-01'),
(21, 1, 'Thoughts of my mom', 'deleted review of', '2020-05-01'),
(21, 1, 'Thoughts of my mom', 'deleted review of', '2020-05-02'),
(21, 1, 'Thoughts of my mom', 'added review to', '2020-05-02'),
(20, 5, 'My thoughts are silent', 'deleted review of', '2020-05-14'),
(20, 4, 'great journey', 'deleted like from', '2020-05-14'),
(20, 2, 'mom and daughter', 'updated review of', '2020-05-14'),
(20, 2, 'mom and daughter', 'updated', '2020-05-14'),
(20, 2, 'mom and daughter', 'deleted like from', '2020-05-14'),
(20, 2, 'mom and daughter', 'liked', '2020-05-14'),
(20, 2, 'mom and daughter', 'deleted review of', '2020-05-14'),
(20, 1, 'Thoughts of my mom', 'deleted from watched film', '2020-05-14'),
(20, 1, 'Thoughts of my mom', 'watched', '2020-05-14'),
(20, 1, 'Thoughts of my mom', 'liked', '2020-05-14'),
(20, 1, 'Thoughts of my mom', 'deleted from watchlist', '2020-05-14'),
(20, 1, 'Thoughts of my mom', 'added to watchlist', '2020-05-14');

-- --------------------------------------------------------

--
-- Структура таблицы `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `list_id`, `description`, `date`) VALUES
(1, 21, 10, 'Spirited Away made one hell of a jump within those 5 years from the last critic version of this list. Thanks for making a separate one for all of these btw. It\'s really fascinating to see the differences and similarities in the tastes of critics and audiences.\r\n\r\nSpirited Away made one hell of a jump within those 5 years from the last critic version of this list. Thanks for making a separate one for all of these btw. It\'s really fascinating to see the differences and similarities in the tastes of critics and audiences.\r\nSpirited Away made one hell of a jump within those 5 years from the last critic version of this list. Thanks for making a separate one for all of these btw. It\'s really fascinating to see the differences and similarities in the tastes of critics and audiences.\r\nSpirited Away made one hell of a jump within those 5 years from the last critic version of this list. Thanks for making a separate one for all of these btw. It\'s really fascinating to see the differences and similarities in the tastes of critics and audiences.\r\nSpirited Away made one hell of a jump within those 5 years from the last critic version of this list. Thanks for making a separate one for all of these btw. It\'s really fascinating to see the differences and similarities in the tastes of critics and audiences.\r\n\r\n', '2020-04-23'),
(2, 21, 10, 'ummm ok', '2020-04-23'),
(3, 21, 10, 'mo', '2020-04-23'),
(4, 21, 10, 'mom', '2020-04-23'),
(5, 21, 10, 'bruh', '2020-04-25'),
(6, 21, 10, 'whta', '2020-04-25'),
(8, 21, 10, 'bruhh', '2020-04-25'),
(9, 21, 10, 'bruhh', '2020-04-25'),
(10, 21, 10, 'what', '2020-04-25'),
(11, 21, 10, 'what', '2020-04-25'),
(15, 21, 10, 'ha laat onw', '2020-04-25'),
(16, 21, 10, 'what you mean', '2020-04-25'),
(17, 21, 10, 'what you mean', '2020-04-25'),
(18, 21, 10, 'okay', '2020-04-25'),
(19, 21, 10, '??', '2020-04-25'),
(20, 21, 10, 'now', '2020-04-25'),
(21, 21, 20, 'nice list', '2020-04-27'),
(22, 21, 20, 'just dance', '2020-04-27'),
(23, 21, 20, 'gonna be ok', '2020-04-27'),
(28, 23, 24, 'mmmmm', '2020-05-05'),
(32, 21, 24, 'ok its ok', '2020-05-01'),
(33, 21, 19, 'bbbb', '2020-05-03'),
(34, 20, 24, 'what', '2020-05-05');

-- --------------------------------------------------------

--
-- Структура таблицы `film`
--

CREATE TABLE `film` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `film`
--

INSERT INTO `film` (`id`, `title`, `year`, `description`, `photo`) VALUES
(1, 'Thoughts of my mom', 2019, 'Twenty-five-year-old Vadym earns a living recording and selling all kinds of different sounds; nevertheless, he’d rather exchange his life in Kyiv for a better future in far-flung Canada. Thus, when he gets a generous job offer which might help him realise his dream, he jumps at the chance; he soon sets off to record the sounds of animals indigenous to Ukraine and also a rare bird native to the Carpathians. The situation proves somewhat more complicated when Vadym’s companion on the trip turns out to be his mother… To the sounds of a synthesized music score, debuting Ukrainian director Antonio Lukich unfolds a visually creative road movie, in which he demonstrates a highly unusual talent for constructing tragicomic situations\r\nTwenty-five-year-old Vadym earns a living recording and selling all kinds of different sounds; nevertheless, he’d rather exchange his life in Kyiv for a better future in far-flung Canada. Thus, when he gets a generous job offer which might help him realise his dream, he jumps at the chance; he soon sets off to record the sounds of animals indigenous to Ukraine and also a rare bird native to the Carpathians. The situation proves somewhat more complicated when Vadym’s companion on the trip turns out to be his mother… To the sounds of a synthesized music score, debuting Ukrainian director Antonio Lukich unfolds a visually creative road movie, in which he demonstrates a highly unusual talent for constructing tragicomic situations\r\nTwenty-five-year-old Vadym earns a living recording and selling all kinds of different sounds; nevertheless, he’d rather exchange his life in Kyiv for a better future in far-flung Canada. Thus, when he gets a generous job offer which might help him realise his dream, he jumps at the chance; he soon sets off to record the sounds of animals indigenous to Ukraine and also a rare bird native to the Carpathians. The situation proves somewhat more complicated when Vadym’s companion on the trip turns out to be his mother… To the sounds of a synthesized music score, debuting Ukrainian director Antonio Lukich unfolds a visually creative road movie, in which he demonstrates a highly unusual talent for constructing tragicomic situations\r\n', 'https://a.ltrbxd.com/resized/film-poster/4/6/0/1/5/5/460155-1917-0-230-0-345-crop.jpg?k=f6915422ec'),
(2, 'mom and daughter', 2019, 'cool', 'https://a.ltrbxd.com/resized/film-poster/4/0/4/2/6/6/404266-uncut-gems-0-230-0-345-crop.jpg?k=bcbf4c8102'),
(3, 'great daughter', 2009, 'wow', 'https://a.ltrbxd.com/resized/film-poster/4/6/0/1/5/5/460155-1917-0-230-0-345-crop.jpg?k=f6915422ec'),
(4, 'great journey', 2008, 'wow!!', 'https://a.ltrbxd.com/resized/film-poster/4/2/6/1/3/1/426131-birds-of-prey-and-the-fantabulous-emancipation-of-one-har-0-230-0-345-crop.jpg?k=d3e387f01a'),
(5, 'My thoughts are silent', 2020, 'great film', 'https://a.ltrbxd.com/resized/film-poster/5/3/6/0/6/7/536067-my-thoughts-are-silent-0-300-0-450-crop.jpg?k=2ad8da1387 2x');

-- --------------------------------------------------------

--
-- Структура таблицы `follow`
--

CREATE TABLE `follow` (
  `follower` int(11) NOT NULL,
  `following` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `follow`
--

INSERT INTO `follow` (`follower`, `following`) VALUES
(29, 20),
(20, 28),
(20, 21),
(20, 22);

-- --------------------------------------------------------

--
-- Структура таблицы `liked_films`
--

CREATE TABLE `liked_films` (
  `film_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `liked_films`
--

INSERT INTO `liked_films` (`film_id`, `user_id`) VALUES
(3, 22),
(3, 20),
(5, 21),
(4, 21),
(2, 21),
(3, 25),
(4, 24),
(2, 24),
(4, 29),
(5, 28),
(3, 26),
(4, 26),
(2, 26),
(5, 26),
(5, 24),
(2, 20),
(1, 20);

-- --------------------------------------------------------

--
-- Структура таблицы `like_list`
--

CREATE TABLE `like_list` (
  `list_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `like_list`
--

INSERT INTO `like_list` (`list_id`, `user_id`) VALUES
(10, 21),
(24, 21),
(20, 21),
(24, 23),
(19, 21),
(24, 20),
(10, 20);

-- --------------------------------------------------------

--
-- Структура таблицы `list`
--

CREATE TABLE `list` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `ranked` tinyint(1) NOT NULL,
  `public` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `list`
--

INSERT INTO `list` (`id`, `user_id`, `title`, `description`, `ranked`, `public`) VALUES
(10, 20, 'we did it mom!', 'nice list!!!', 1, 1),
(19, 21, 'new test list', 'my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom my test list i love my mom', 1, 1),
(20, 21, 'other new list', 'other new list 2', 1, 0),
(22, 21, 'my mom', 'mm', 1, 0),
(23, 21, 'final', 'great!!', 0, 0),
(24, 21, 'what the actual fuck', 'mm', 1, 1),
(25, 20, '20th list', 'my nice list', 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `list_film`
--

CREATE TABLE `list_film` (
  `list_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `list_film`
--

INSERT INTO `list_film` (`list_id`, `film_id`, `rank`) VALUES
(10, 5, 4),
(10, 2, 1),
(19, 2, 1),
(20, 3, 2),
(20, 4, 1),
(20, 2, 3),
(22, 2, 1),
(23, 4, NULL),
(23, 2, NULL),
(10, 4, 2),
(24, 2, 1),
(19, 4, 2),
(20, 1, 4),
(10, 1, 3),
(22, 1, 2),
(23, 1, NULL),
(19, 1, 3),
(25, 4, NULL),
(25, 2, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `review`
--

INSERT INTO `review` (`id`, `user_id`, `film_id`, `text`, `date`) VALUES
(29, 23, 1, 'what a film wow mom is better than confa', '2020-03-24'),
(34, 22, 5, 'hellllllloooooo', '2020-04-25'),
(45, 21, 1, 'bruh sorry for that', '2020-05-02'),
(46, 23, 2, 'thats good', '2020-05-11'),
(47, 23, 3, 'its ok', '2020-05-11'),
(48, 23, 4, 'ok', '2020-05-03'),
(49, 20, 3, 'wow', '2020-05-04'),
(50, 28, 3, 'Bruh', '2020-05-11'),
(51, 28, 4, 'bruhhh', '2020-05-04'),
(52, 26, 1, 'bruh', '2020-05-05'),
(53, 25, 2, 'ok', '2020-05-08'),
(54, 29, 4, 'great', '2020-05-03');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(20, 'mariana', 'username1@email.com', '$2y$10$9h66DqZ8AxWtG2GrRD5fiuK2xpdIXnmXjai33OhI2UG6Zqy49t8nG'),
(21, 'usss', 'email@email', '$2y$10$PYaCSGvekMrwRrTGVwK/ruYgvoPmJPQxHVj8NOFdzPTM399Ajbod6'),
(22, 'us22', 'em@email', '$2y$10$KJPWT8QZAuT0c2GCkzJzT.7TXwopT8jh0bgyXXJlgRd72jfVJU36u'),
(23, 'user456', 'user456@email', '$2y$10$IlzfJY0R6gEfV7DFsyVVHOw1v5Py4XMtFX7eTD/mBWrJRMNshDSru'),
(24, 'filmuser1', 'filmuser1@email', 'pass'),
(25, 'filmuser2', 'filmuser2@email', 'pass'),
(26, 'filmuser3', 'filmuser3@email', 'pass'),
(27, 'filmuser4', 'filmuser4@email', 'pass'),
(28, 'filmuser5', 'filmuser5@email', 'pass'),
(29, 'filmuser7', 'filmuser7@emil', 'pass');

-- --------------------------------------------------------

--
-- Структура таблицы `watched_films`
--

CREATE TABLE `watched_films` (
  `film_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `watched_films`
--

INSERT INTO `watched_films` (`film_id`, `user_id`, `rating`, `date`) VALUES
(3, 20, NULL, '2020-03-01'),
(2, 20, 3, '2020-05-14'),
(1, 22, 3, '2020-03-17'),
(1, 23, 4, '2020-03-17'),
(5, 21, 2, '2020-04-05'),
(1, 21, 3, '2020-04-05'),
(3, 21, 3, '2020-04-19'),
(4, 21, 4, '2020-04-25'),
(2, 21, 3, '2020-04-30'),
(3, 24, 3, '2020-05-05'),
(4, 24, 5, '2020-05-03'),
(2, 25, 2, '2020-05-04'),
(2, 26, 3, '2020-05-05'),
(5, 27, 4, '2020-05-11'),
(1, 27, 2, '2020-05-06'),
(2, 27, 3, '2020-05-12'),
(3, 27, 2, '2020-05-04'),
(1, 20, NULL, '2020-05-14');

-- --------------------------------------------------------

--
-- Структура таблицы `watchlist`
--

CREATE TABLE `watchlist` (
  `film_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `watchlist`
--

INSERT INTO `watchlist` (`film_id`, `user_id`) VALUES
(4, 22),
(4, 23),
(1, 23),
(2, 21),
(4, 21),
(3, 21),
(1, 21),
(4, 20),
(2, 20),
(1, 20);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `activity`
--
ALTER TABLE `activity`
  ADD KEY `film_id` (`film_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `list_id` (`list_id`);

--
-- Индексы таблицы `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `follow`
--
ALTER TABLE `follow`
  ADD KEY `follower` (`follower`),
  ADD KEY `following` (`following`);

--
-- Индексы таблицы `liked_films`
--
ALTER TABLE `liked_films`
  ADD KEY `film_id` (`film_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `like_list`
--
ALTER TABLE `like_list`
  ADD KEY `list_id` (`list_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `list_film`
--
ALTER TABLE `list_film`
  ADD KEY `list_id` (`list_id`),
  ADD KEY `film_id` (`film_id`);

--
-- Индексы таблицы `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `film_id` (`film_id`),
  ADD KEY `review_ibfk_2` (`user_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `watched_films`
--
ALTER TABLE `watched_films`
  ADD KEY `film_id` (`film_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `watchlist`
--
ALTER TABLE `watchlist`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `film_id` (`film_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT для таблицы `film`
--
ALTER TABLE `film`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `list`
--
ALTER TABLE `list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `list` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follower`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`following`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `liked_films`
--
ALTER TABLE `liked_films`
  ADD CONSTRAINT `liked_films_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `liked_films_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `like_list`
--
ALTER TABLE `like_list`
  ADD CONSTRAINT `like_list_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `list` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `like_list_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `list_film`
--
ALTER TABLE `list_film`
  ADD CONSTRAINT `list_film_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `list_film_ibfk_2` FOREIGN KEY (`list_id`) REFERENCES `list` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `watched_films`
--
ALTER TABLE `watched_films`
  ADD CONSTRAINT `watched_films_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `watched_films_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `watchlist_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

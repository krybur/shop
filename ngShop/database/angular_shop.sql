-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Czas generowania: 20 Wrz 2017, 21:53
-- Wersja serwera: 10.1.13-MariaDB
-- Wersja PHP: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `angular_shop`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `items` text NOT NULL,
  `total` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`id`, `userid`, `name`, `email`, `items`, `total`, `status`) VALUES
(9, '31', 'kuba', 'po@po.pl', '[{"id":"274","nazwa":"Pomarancza","waga":"2.32","opis":"\\u015awie\\u017ca, mocno pomara\\u0144czowa, soczysta !!!","cena":"6.50","qty":"2"},{"id":"275","nazwa":"Jablko","waga":"2","opis":"Polskie, dobre, z polskiego sadu","cena":"2.5","qty":"1"}]', '15.5', 0),
(11, '44', 'kbr', 'ja@ja.pl', '[{"id":"286","nazwa":"WAR CAT GENERAL","waga":"7.5","opis":"Kot bojowy - dow\\u00f3dca","cena":"1000","qty":"1"}]', '1000', 1),
(12, '31', 'kuba', 'po@po.pl', '[{"id":"274","nazwa":"Pomarancza","waga":"2.32","opis":"\\u015awie\\u017ca, mocno pomara\\u0144czowa, soczysta !!!","cena":"6.50","qty":"1"},{"id":"276","nazwa":"ANANAS","waga":"1,5","opis":"Tani, okazja","cena":"6.5","qty":"2"},{"id":"278","nazwa":"Cytryna","waga":"1,5","opis":"Z Maroka, nadaje si\\u0119 do herbaty","cena":"3","qty":"1"}]', '22.5', 0),
(13, '44', 'kbr', 'ja@ja.pl', '[{"id":"274","nazwa":"Pomarancza","waga":"2,15","opis":"\\u015awie\\u017ca, mocno pomara\\u0144czowa, soczysta !!!","cena":"6.50","thumb":"203 (Kopiowanie).jpg","qty":"1"},{"id":"275","nazwa":"Jablko","waga":"2","opis":"Polskie, dobre, z polskiego sadu","cena":"2.5","thumb":"jj.jpg","qty":"1"}]', '9', 0),
(14, '31', 'kuba', 'po@po.pl', '[{"id":"274","nazwa":"Pomarancza","waga":"2,15","opis":"\\u015awie\\u017ca, mocno pomara\\u0144czowa, soczysta !!!","cena":"6.50","thumb":"203 (Kopiowanie).jpg","qty":"2"}]', '13', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(255) CHARACTER SET latin1 NOT NULL,
  `waga` varchar(255) CHARACTER SET latin1 NOT NULL,
  `opis` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `cena` varchar(255) CHARACTER SET latin1 NOT NULL,
  `thumb` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `nazwa`, `waga`, `opis`, `cena`, `thumb`) VALUES
(274, 'Pomarancza', '2,15', 'Świeża, mocno pomarańczowa, soczysta !!!', '6.50', '203 (Kopiowanie).jpg'),
(275, 'Jablko', '2', 'Polskie, dobre, z polskiego sadu', '2.5', 'jj.jpg'),
(276, 'ANANAS', '1,5', 'Tani, okazja', '6.5', 'indeks.jpg'),
(277, 'Gruszka', '0,5', 'Polska gruszka, idealna na sok', '2.6', 'gg.jpg'),
(278, 'Cytryna', '1,5', 'Z Maroka, nadaje się do herbaty', '3', 'indeks.jpg'),
(279, 'Arbuz', '3,2', 'Smaczny jak na arbuza', '7', 'a.jpg'),
(280, 'Banan', '0,7', 'Banana nie trzeba reklamowac', '1.99', '5.jpg'),
(281, 'Brzoskwinia', '0,25', 'Soczysta, miękka, słodka', '3.10', 'b.jpg'),
(283, 'Wisnie', '12', 'Polskie, nie pryskane', '15', 'wisnie.jpg'),
(284, 'Mango', '5', 'Chujowe', '100', '4956127-mango-wallpapers.jpg'),
(285, 'PEUGEOT EXPERT', '2000', 'Jedyny taki, perła, samochód roku 2017, drzwi jedyne słuszne, idealny na wyjazd do Chorwacji, idealny do zamieszkania na zawsze.', '120000', 'peugeot_expert_2.jpg'),
(286, 'WAR CAT GENERAL', '7.5', 'Kot bojowy - dowódca', '1000', 'f852d809415702edd9fd7bd3552891b6.jpg'),
(287, 'telefon', '0.8256', 'Samsung galaxy 7', '2500', 'galax.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `passconf` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`, `passconf`) VALUES
(31, 'kuba', 'po@po.pl', 'user', 'c6HsNvyNr.9U2', 'iii'),
(43, 'test', 'test@test.pl', 'user', 'c650dAPU6Fyjw', ''),
(44, 'kbr', 'ja@ja.pl', 'admin', 'c6IuItPlZ.BxU', ''),
(46, 'marysia', 'maria@wp.pl', 'user', 'c6SIzueS2Oj1.', 'adsd');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=288;
--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

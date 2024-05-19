-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2024 a las 16:08:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kurogestor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones`
--

CREATE TABLE `asignaciones` (
  `ID` int(11) NOT NULL,
  `ID_Proyecto` int(11) DEFAULT NULL,
  `ID_Usuario` int(11) DEFAULT NULL,
  `date_create` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignaciones`
--

INSERT INTO `asignaciones` (`ID`, `ID_Proyecto`, `ID_Usuario`, `date_create`) VALUES
(1, 1, 1, '2024-05-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `date_create` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`ID`, `Nombre`, `Descripcion`, `FechaInicio`, `FechaFin`, `date_create`) VALUES
(1, 'ProjectoFinal', 'Trabajo del Sena ', '2024-05-05', '2024-05-28', '2024-05-07'),
(2, 'Shorcut', 'Extra trabajo', '2024-05-07', '2024-05-15', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `ID` int(11) NOT NULL,
  `ID_Proyecto` int(11) DEFAULT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `Estado` enum('Pendiente','En curso','Completada') DEFAULT 'Pendiente',
  `date_create` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`ID`, `ID_Proyecto`, `Nombre`, `Descripcion`, `FechaInicio`, `FechaFin`, `Estado`, `date_create`) VALUES
(7, 1, 'maradona', 'nose', '2024-05-10', '2024-05-12', 'En curso', '2024-05-12'),
(8, 1, 'maradona', 'nose', '2024-05-10', '2024-05-12', 'En curso', '2024-05-12'),
(9, 2, 'mates', 'asdasd', '2024-05-11', '2024-05-18', 'En curso', '2024-05-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiration` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`id`, `user_id`, `token`, `expiration`, `created_at`) VALUES
(1, 1, '', '2024-05-07 12:42:05', '2024-05-07 15:42:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rol` enum('Administrador','Usuario') DEFAULT 'Usuario',
  `date_create` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `user`, `name`, `password`, `email`, `rol`, `date_create`) VALUES
(1, 'KaiDarksSS', 'Omar', '123456', 'omarshadow44@gmail.com', 'Administrador', '2024-05-03'),
(23, 'Michael', 'MichaelJackson', 'thebest', 'MichaleJackson@gmail.com', 'Usuario', '2024-05-08'),
(26, 'user', 'articunosa', 'das', 'user@example.com', '', '2024-05-09'),
(31, 'Mario', 'articuno', 'das', 'userer@example.com', '', '2024-05-09'),
(32, 'user25', 'user25', 'user25', 'user25@example.com', '', '2024-05-09'),
(33, 'use32', 'user32', 'user32', 'user32@example.com', '', '2024-05-09'),
(34, 'use34', 'user34', 'user34', 'user34@example.com', 'Administrador', '2024-05-09'),
(35, 'user50', 'charizard', 'pokeman', 'user50@example.com', '', '2024-05-10'),
(36, 'Lord', 'Lord', '123456', 'Lord@gmail.com', '', '2024-05-10'),
(37, 'CarlosManndonado', 'Messi', '15491', 'userMessi@example.com', 'Usuario', '2024-05-11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Proyecto` (`ID_Proyecto`),
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Proyecto` (`ID_Proyecto`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `token` (`user_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD CONSTRAINT `asignaciones_ibfk_1` FOREIGN KEY (`ID_Proyecto`) REFERENCES `proyectos` (`ID`),
  ADD CONSTRAINT `asignaciones_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`ID_Proyecto`) REFERENCES `proyectos` (`ID`);

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `token` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

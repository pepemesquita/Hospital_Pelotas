-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12/03/2024 às 22:13
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `hospital`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `complain`
--

CREATE TABLE `complain` (
  `ID_COMPLAIN` int(10) NOT NULL,
  `MENSAGEM` varchar(500) NOT NULL,
  `NOME` varchar(50) NOT NULL,
  `EMAIL` varchar(20) NOT NULL,
  `ASSUNTO` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `complain`
--

INSERT INTO `complain` (`ID_COMPLAIN`, `MENSAGEM`, `NOME`, `EMAIL`, `ASSUNTO`) VALUES
(1, 'wdawdws', 'awdawd', 'awdw', 'adwwd'),
(2, 'Definition of complain. intransitive verb. 1 : to express grief, pain, or discontent complaining about the weather. 2 : to make a formal accusation or charge He threatened to complain of him to the captain.', 'Isaiah L. Smith', 'gmhs13@yopmail.com', 'dafsgd'),
(3, 'redtfyguhijo', 'simanto', 'gmhs13@yopmail.com', 'ytguijopk['),
(4, 'abcabcbacbacbabc', 'Isaiah L. Smith', 'gmhs13@yopmail.com', 'dadsvfbgfng');

-- --------------------------------------------------------

--
-- Estrutura para tabela `consulta`
--

CREATE TABLE `consulta` (
  `ID_CONSULTA` int(10) NOT NULL,
  `PACIENTE_NOME` varchar(255) NOT NULL,
  `MEDICO_NOME` varchar(255) NOT NULL,
  `DEPTO_NOME` varchar(255) NOT NULL,
  `DATA` datetime NOT NULL,
  `HORA` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `consulta`
--

INSERT INTO `consulta` (`ID_CONSULTA`, `PACIENTE_NOME`, `MEDICO_NOME`, `DEPTO_NOME`, `DATA`, `HORA`) VALUES
(6, 'Roberto S.', 'Lucas B.', 'Orthopedics', '2023-03-26 00:00:00', '10:43 AM'),
(10, 'Alexandre P.', 'Paulo R.', 'Orthopedics', '2023-03-28 00:00:00', '14:43 AM');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contrato`
--

CREATE TABLE `contrato` (
  `ID_CONTRATO` int(10) NOT NULL,
  `FORNECEDOR` varchar(100) NOT NULL,
  `TIPO_CONTRATO` varchar(255) NOT NULL,
  `DATA_INICIO` date NOT NULL,
  `DATA_TERMINO` date NOT NULL,
  `RAZAO` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contrato`
--

INSERT INTO `contrato` (`ID_CONTRATO`, `FORNECEDOR`, `TIPO_CONTRATO`, `DATA_INICIO`, `DATA_TERMINO`, `RAZAO`) VALUES
(7, 'JJ SERVIÇOS MEDICOS', 'Medicamento', '2020-03-12', '2024-03-12', 'Corte de verbas');

-- --------------------------------------------------------

--
-- Estrutura para tabela `depto`
--

CREATE TABLE `depto` (
  `ID_DEPTO` int(11) NOT NULL,
  `DEPTO_NOME` varchar(255) NOT NULL,
  `DEPTO_DESC` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `depto`
--

INSERT INTO `depto` (`ID_DEPTO`, `DEPTO_NOME`, `DEPTO_DESC`) VALUES
(11, 'Intensive Care Unit (ICU)', 'What is an intensive care unit (ICU)? Intensive care refers to the specialised treatment given to patients who are acutely unwell and require critical medical care. An intensive care unit (ICU) provides the critical care and life support for acutely ill a'),
(16, 'Neurology', 'Neurology is a branch of medicine dealing with disorders of the nervous system. Neurology deals with the diagnosis and treatment of all categories of conditions and disease involving the central and peripheral nervous systems, including their coverings'),
(17, 'Opthalmology', 'dfvgbhjnkml'),
(18, 'Orthopedics', 'dfyuyuo'),
(19, 'Cancer Department', 'asyckuauhcioa'),
(20, 'ENT department', 'savcjaub');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fornecedor`
--

CREATE TABLE `fornecedor` (
  `ID_FORNECEDOR` int(10) NOT NULL,
  `NOME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `CNPJ` varchar(255) NOT NULL,
  `INICIO_CONTRATO` date NOT NULL,
  `AREA` varchar(255) NOT NULL,
  `VALOR` varchar(10) NOT NULL,
  `ENDERECO` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fornecedor`
--

INSERT INTO `fornecedor` (`ID_FORNECEDOR`, `NOME`, `EMAIL`, `CNPJ`, `INICIO_CONTRATO`, `AREA`, `VALOR`, `ENDERECO`) VALUES
(18, 'JJ SERVIÇOS MEDICOS', 'gmhs13@yopmail.com', '1568413196', '2020-03-26', 'Medicamentos', 'R$ 5000', 'Padre Anchieta, 1831, Centro, Pelotas - RS'),
(19, 'AURA OX HOSPITALARES', 'gmhs13@yopmail.com', '7865641399', '2020-03-26', 'Oxigenios', 'R$ 10000', 'General Osório 1731, Centro, Porto Alegre - RS'),
(20, 'HAUT EQUIPAMENTOS', 'gmhs13@yopmail.com', '0159651313', '0000-00-00', 'Equipamento de Emergencia', 'R$ 651320', 'Chico Buarque 821, Centro, Porto Alegre - RS');

-- --------------------------------------------------------

--
-- Estrutura para tabela `login`
--

CREATE TABLE `login` (
  `ID_LOGIN` int(255) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `login`
--

INSERT INTO `login` (`ID_LOGIN`, `USERNAME`, `PASSWORD`, `EMAIL`) VALUES
(1, 'test', 'test', 'abc123@gmail.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `medico`
--

CREATE TABLE `medico` (
  `ID_MEDICO` int(10) NOT NULL,
  `PNOME` varchar(255) NOT NULL,
  `SNOME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `CRM` varchar(20) NOT NULL,
  `DATA_NASC` date NOT NULL,
  `SEXO` char(1) NOT NULL,
  `ENDERECO` varchar(255) NOT NULL,
  `TELEFONE` varchar(20) NOT NULL,
  `IMAGE` text NOT NULL,
  `DEPTO_NOME` varchar(50) NOT NULL,
  `BIO` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `medico`
--

INSERT INTO `medico` (`ID_MEDICO`, `PNOME`, `SNOME`, `EMAIL`, `CRM`, `DATA_NASC`, `SEXO`, `ENDERECO`, `TELEFONE`, `IMAGE`, `DEPTO_NOME`, `BIO`) VALUES
(39, 'Plinio', 'Silva', 'plinio@gmail.com', '1234567820', '1978-09-12', 'M', '3125  Elkview Drive, Miami,33169', '53992212543', 'user-02.jpg', 'Intensive Care Unit (ICU)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum, enim porttitor tempor luctus, nulla lectus pellentesque quam'),
(41, 'SHAHID AFRIDI', 'ZIHAD', 'gmhs13@yopmail.com', '1234567821', '1998-03-16', 'M', '3125  Elkview Drive, Miami,33169', '7865641399', 'reservation.png', 'Intensive Care Unit (ICU)', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum, enim porttitor tempor luctus, nulla lectus pellentesque quam');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `ID_PRODUTOS` int(10) NOT NULL,
  `FABRICANTE` varchar(255) NOT NULL,
  `FORNECEDOR` varchar(255) NOT NULL,
  `NOME` varchar(255) NOT NULL,
  `VALIDADE` date NOT NULL,
  `TIPO` varchar(255) NOT NULL,
  `LOTE` varchar(255) NOT NULL,
  `QUANTIDADE` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`ID_PRODUTOS`, `FABRICANTE`, `FORNECEDOR`, `NOME`, `VALIDADE`, `TIPO`, `LOTE`, `QUANTIDADE`) VALUES
(4, 'Medley', 'JJ SERVIÇOS MEDICOS', 'Benzetacil', '2024-04-12', 'Antitérmico', '12345678', '100'),
(8, 'Medley', 'JJ SERVIÇOS MEDICOS', 'Ibuprofeno', '2024-04-12', 'Anti-inflamatório', '12345689', '200'),
(9, 'Medley', 'JJ SERVIÇOS MEDICOS', 'Berotec', '2024-04-12', ' Expectorante', '1234321', '20'),
(10, 'Medley', 'JJ SERVIÇOS MEDICOS', 'Dipirona', '2024-04-12', ' Antitérmico', '000001212', '100');

-- --------------------------------------------------------

--
-- Estrutura para tabela `receita`
--

CREATE TABLE `receita` (
  `ID_RECEITA` int(10) NOT NULL,
  `ID_CONSULTA` int(11) DEFAULT NULL,
  `PRODUTOS` varchar(255) DEFAULT NULL,
  `DESCRICAO` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `receita`
--

INSERT INTO `receita` (`ID_RECEITA`, `ID_CONSULTA`, `PRODUTOS`, `DESCRICAO`) VALUES
(1, 6, '4', 'Aplicação muscular para a melhora da dor na perna'),
(2, 10, '10', 'Dose de 54 gotas de 12 em 12 horas');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `ID` int(255) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `EMAIL_STATUS` varchar(20) NOT NULL,
  `RESET_TOKEN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`ID`, `USERNAME`, `EMAIL`, `PASSWORD`, `EMAIL_STATUS`, `RESET_TOKEN`) VALUES
(9, 'zihad', 'zihad.1d@yopmail.com', '123', 'verified', NULL),
(19, 'test', 'test555@yopmail.com', '123', 'verified', NULL),
(20, 'abc', 'gmhs13@yopmail.com', '12345', 'not_verified', NULL),
(21, 'alamin', 'te555@yopmail.com', 'abc', 'verified', NULL),
(55, 'Pedro Henrique', 'pepemesquita2@gmail.com', '22222222', 'verified', '1z7qxxsa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `verify`
--

CREATE TABLE `verify` (
  `ID` int(10) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `TOKEN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `verify`
--

INSERT INTO `verify` (`ID`, `USERNAME`, `EMAIL`, `TOKEN`) VALUES
(4, 'zihad', 'zihad.1d@yopmail.com', 'lp5ux5ik'),
(14, 'test', 'test555@yopmail.com', '3udlo9v6'),
(15, 'abc', 'gmhs13@yopmail.com', 'w2px024k'),
(16, 'alamin', 'te555@yopmail.com', 'ix8enxdh'),
(18, 'Pedro Henrique', 'pepemesquita2@gmail.com', 'mroqhble');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `complain`
--
ALTER TABLE `complain`
  ADD PRIMARY KEY (`ID_COMPLAIN`);

--
-- Índices de tabela `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`ID_CONSULTA`);

--
-- Índices de tabela `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`ID_CONTRATO`);

--
-- Índices de tabela `depto`
--
ALTER TABLE `depto`
  ADD PRIMARY KEY (`ID_DEPTO`);

--
-- Índices de tabela `fornecedor`
--
ALTER TABLE `fornecedor`
  ADD PRIMARY KEY (`ID_FORNECEDOR`);

--
-- Índices de tabela `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID_LOGIN`);

--
-- Índices de tabela `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`ID_MEDICO`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`ID_PRODUTOS`),
  ADD KEY `FK_FORNECEDOR` (`FORNECEDOR`),
  ADD KEY `FK_FABRICANTE` (`FABRICANTE`);

--
-- Índices de tabela `receita`
--
ALTER TABLE `receita`
  ADD PRIMARY KEY (`ID_RECEITA`),
  ADD KEY `FK` (`ID_CONSULTA`),
  ADD KEY `FK_PROD` (`PRODUTOS`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `verify`
--
ALTER TABLE `verify`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `complain`
--
ALTER TABLE `complain`
  MODIFY `ID_COMPLAIN` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `consulta`
--
ALTER TABLE `consulta`
  MODIFY `ID_CONSULTA` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `depto`
--
ALTER TABLE `depto`
  MODIFY `ID_DEPTO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `fornecedor`
--
ALTER TABLE `fornecedor`
  MODIFY `ID_FORNECEDOR` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `login`
--
ALTER TABLE `login`
  MODIFY `ID_LOGIN` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `medico`
--
ALTER TABLE `medico`
  MODIFY `ID_MEDICO` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de tabela `receita`
--
ALTER TABLE `receita`
  MODIFY `ID_RECEITA` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de tabela `verify`
--
ALTER TABLE `verify`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

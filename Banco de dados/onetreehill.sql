CREATE DATABASE onetreehill;
USE onetreehill;

CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome varchar(45) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  personagemFavorito VARCHAR(50) NOT NULL,
  senha VARCHAR(80) NOT NULL
);

CREATE TABLE quiz(
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
acertos INT,
perguntas INT DEFAULT 8,
fkUsuario INT,
FOREIGN KEY(fkUsuario) REFERENCES usuario(idUsuario)
);

INSERT INTO usuario (nome, email, personagemFavorito, senha) VALUES
('Haley James', 'haley@onetreehill.com', 'Nathan Scott', 'tutor123'),
('Mouth McFadden', 'mouth@onetreehill.com', 'Jimmy Edwards', 'comentarista'),
('Rachel Gatina', 'rachel@onetreehill.com', 'Brooke Davis', 'cheerleader');

SELECT * FROM usuario;

INSERT INTO quiz (nome, acertos, fkUsuario) VALUES
('Quiz Haley', 7, 1),         
('Quiz Mouth', 6, 3),         
('Quiz Rachel', 8, 2);       

SELECT * FROM quiz;

-- média de acertos por usuário 
SELECT  u.nome, 
AVG(q.acertos) AS media_acertos FROM usuario u
JOIN quiz q ON u.idUsuario = q.fkUsuario
GROUP BY u.idUsuario;
    
-- média todos os quizzes 
SELECT AVG(acertos) AS media_geral FROM quiz;


/*create database onetreehill;
use onetreehill;

create table usuario (
  idUsuario int primary key auto_increment,
  nome varchar(45) not null,
  email varchar(100) not null unique,
  personagemFavorito varchar(100) not null,
  senha varchar(100) not null
);

create table temporada (
  idTemporada int primary key auto_increment,
  numero int not null
);

create table episodio (
  idEpisodio int primary key auto_increment,
  titulo varchar(100) not null,
  numero int not null,
  fkTemporada int not null,
  constraint fk_epiTemp foreign key (fkTemporada) references temporada(idTemporada)
);

create table avaliacaoEpisodio (
  idAvaliacao int primary key auto_increment,
  assistido tinyint default 0,        
  reassistido tinyint default 0,       
  nota int check (nota >= 0 and nota <= 10), 
  dataAvaliacao datetime default current_timestamp,
  fkUsuario int,
  fkEpisodio int,
  constraint fk_user foreign key (fkUsuario) references usuario(idUsuario),
  constraint fk_epi foreign key (fkEpisodio) references episodio(idEpisodio)
);

CREATE TABLE favoritosTemporada (
  idFavorito INT PRIMARY KEY AUTO_INCREMENT,
  fkUsuario INT NOT NULL,
  fkTemporada INT NOT NULL,
  CONSTRAINT fk_favUser FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
  CONSTRAINT fk_favTemp FOREIGN KEY (fkTemporada) REFERENCES temporada(idTemporada),
  UNIQUE KEY unique_fav (fkUsuario, fkTemporada)  
);

insert into usuario (nome, email, personagemFavorito, senha)
values 
  ('Lucas Scott', 'lucas@email.com', 'Keith Scott', 'senhalucas'),
  ('Peyton Sawyer', 'peyton@email.com', 'Jake Jagielski', 'senhapeyton');

insert into temporada (numero)
values (1), (2);

insert into episodio (titulo, numero, fkTemporada)
values 
  ('Pilot', 1, 1),
  ('The Places You Have Come to Fear the Most', 2, 1),
  ('The Desperate Kingdom of Love', 1, 2),
  ('Truth Doesn’t Make a Noise', 2, 2);

insert into avaliacaoEpisodio (assistido, reassistido, nota, fkUsuario, fkEpisodio)
values 
  (1, 0, 8, 1, 1),  
  (1, 1, 9, 1, 2),   
  (1, 0, 10, 1, 3),  
  (0, 0, null, 1, 4),
  (1, 1, 10, 2, 1);  

-- 1. Total de episódios assistidos por temporada
select 
  t.numero as temporada, 
  count(a.idAvaliacao) as total_assistidos
from avaliacaoEpisodio a
join episodio e on a.fkEpisodio = e.idEpisodio
join temporada t on e.fkTemporada = t.idTemporada
where a.assistido = 1
group by t.numero;

-- 2. Média de avaliação por temporada
select 
  t.numero as temporada, 
  round(avg(a.nota), 2) as media_avaliacao
from avaliacaoEpisodio a
join episodio e on a.fkEpisodio = e.idEpisodio
join temporada t on e.fkTemporada = t.idTemporada
where a.nota is not null
group by t.numero;

-- 3. Episódios mais reassistidos
select 
  e.titulo, 
  count(*) as total_reassistido
from avaliacaoEpisodio a
join episodio e on a.fkEpisodio = e.idEpisodio
where a.reassistido = 1
group by e.titulo
order by total_reassistido desc;

select * from usuario;*/

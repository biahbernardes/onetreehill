-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
create database onetreehill;
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
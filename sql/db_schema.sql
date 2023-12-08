CREATE DATABASE IF NOT EXISTS nytapp;

USE nytapp;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS articles;




CREATE TABLE users
(
    userid       int not null AUTO_INCREMENT,
    username     varchar(64) not null,
    pwdhash      varchar(256) not null,
    bucketfolder varchar(48) not null,  -- random, unique name (UUID)
    PRIMARY KEY  (userid),
    UNIQUE       (username),
    UNIQUE       (bucketfolder)
);
ALTER TABLE users AUTO_INCREMENT = 10001;

CREATE TABLE articles
(
    articleid       int not null AUTO_INCREMENT,
    userid          int not null,
    url             varchar(256),
    headline        varchar(256) not null,
    pubdate         varchar(256),
    newsdesk        varchar(256),
    sectionname     varchar(256),
    author_first    varchar(256),
    author_last     varchar(256),
    bucketkey       varchar(256) not null,
    PRIMARY KEY (articleid)
);
ALTER TABLE articles AUTO_INCREMENT = 20001;

CREATE TABLE keywords
(
    articleid       int not null,
    keyword         varchar(256) not null,
    FOREIGN KEY (articleid) REFERENCES articles(articleid) ON DELETE CASCADE
);

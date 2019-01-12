CREATE TABLE user_authority (
  id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary, Auto increment',
  name VARCHAR(20) NOT NULL UNIQUE COMMENT 'Unique, Not null',
  power VARCHAR(4) NOT NULL DEFAULT '1' COMMENT 'Not null, Regex: ^(?:0|-?[1-9][0-9]{0,2})$'
)DEFAULT CHARACTER SET=utf8 ENGINE=InnoDB  COMMENT 'Picture Collection User Authority  Table';

INSERT INTO user_authority(id, name, power)
VALUES (9, 'Chaos', 999);
INSERT INTO user_authority(name, power)
VALUES ('Themis', 900);
INSERT INTO user_authority(name, power)
VALUES ('Hades', 800);
INSERT INTO user_authority(name, power)
VALUES ('Eunomia', 500);

INSERT INTO user_authority(name) VALUES ('Nuked');

INSERT INTO user_authority(name)
VALUES ('Apprentice');
INSERT INTO user_authority(name, power)
VALUES ('Footman', 2);
INSERT INTO user_authority(name, power)
VALUES ('Ranger', 3);
INSERT INTO user_authority(name, power)
VALUES ('Rider', 4);
INSERT INTO user_authority(name, power)
VALUES ('Saint', 5);
INSERT INTO user_authority(name, power)
VALUES ('Primate', 6);

TRUNCATE TABLE user_authority;

DROP TABLE user_authority;

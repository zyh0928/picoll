CREATE TABLE user_authority (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'primary',
  zh_CN VARCHAR(20) NOT NULL UNIQUE COMMENT 'chinese name',
  en_US VARCHAR(20) NOT NULL UNIQUE COMMENT 'english name',
  power VARCHAR(3) NOT NULL DEFAULT '1' COMMENT '/^[0-9]{1,3}$/',
  sort TINYINT UNSIGNED NOT NULL DEFAULT 0
) DEFAULT CHARACTER SET = utf8 ENGINE = InnoDB COMMENT 'Picture Collection User Authority  Table';

DROP TABLE IF EXISTS user_authority;

SHOW FULL COLUMNS FROM user_authority;

TRUNCATE TABLE user_authority;

INSERT INTO
  user_authority(id, zh_CN, en_US, power)
VALUES
  (9, '归藏', 'Chaos', 999);
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('知命', 'Themis', 900);
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('化境', 'Hades', 800);
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('登峰', 'Eunomia', 500);
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('喽啰', 'Nuked', 0);
INSERT INTO
  user_authority(zh_CN, en_US)
VALUES
  ('胠箧', 'Apprentice');
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('骈拇', 'Footman', 2);
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('达生', 'Ranger', 3);
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('在宥', 'Rider', 4);
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('至乐', 'Saint', 5);
INSERT INTO
  user_authority(zh_CN, en_US, power)
VALUES
  ('山木', 'Primate', 6);

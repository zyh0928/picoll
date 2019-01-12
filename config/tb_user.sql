CREATE TABLE user (
  id VARCHAR(36) NOT NULL PRIMARY KEY COMMENT 'Primary',
  account VARCHAR(20) NOT NULL UNIQUE COMMENT 'Unique, Not null, Regex: ^[a-zA-Z]\w{5,15}$',
  password VARCHAR(32) NOT NULL COMMENT 'Not null, Regex: ^\S{6,20}$',
  salt VARCHAR(36) COMMENT 'User password salt, uuid v4',
  nickname VARCHAR(20) NOT NULL UNIQUE COMMENT 'Unique, Not null, Regex ^\S{2,12}$',
  email VARCHAR(50) UNIQUE COMMENT 'Unique',
  phone VARCHAR(20) UNIQUE COMMENT 'Unique',
  token VARCHAR(36) COMMENT 'User token, uuid v4',
  created_at BIGINT UNSIGNED COMMENT 'Create time',
  login_at BIGINT UNSIGNED COMMENT 'Last login time',
  deleted_at BIGINT UNSIGNED COMMENT 'Nuked time',
  auth_id TINYINT UNSIGNED NOT NULL DEFAULT 14 COMMENT 'User authority'
)DEFAULT CHARACTER SET=utf8 ENGINE=InnoDB  COMMENT 'Picture Collection User Table';
  
DROP TABLE user;

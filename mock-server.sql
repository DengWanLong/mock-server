/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.156.126
 Source Server Type    : MySQL
 Source Server Version : 50166
 Source Host           : 192.168.156.126
 Source Database       : mock-server

 Target Server Type    : MySQL
 Target Server Version : 50166
 File Encoding         : utf-8

 Date: 05/24/2017 16:06:39 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `interface`
-- ----------------------------
DROP TABLE IF EXISTS `interface`;
CREATE TABLE `interface` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) NOT NULL COMMENT '项目ID（外键）',
  `interfaceName` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '接口名',
  `url` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '接口地址',
  `proxyURL` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '代理地址（后端提供的接口地址）',
  `requestType` enum('GET','POST','PUT','DELETE') COLLATE utf8_bin NOT NULL DEFAULT 'GET' COMMENT '请求类型',
  `openExact` int(1) NOT NULL COMMENT '是否开启精确匹配（匹配？之前的地址或全路径）',
  `params` varchar(100) COLLATE utf8_bin DEFAULT '' COMMENT '请求参数',
  `result` text COLLATE utf8_bin NOT NULL COMMENT '返回参数',
  `code` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '返回状态码',
  `openMock` int(1) NOT NULL COMMENT '开启mockjs',
  `openProxy` int(1) NOT NULL COMMENT '是否开启代理',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `ids_modelId` (`projectId`) USING BTREE,
  CONSTRAINT `FK_interface_model` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(30) NOT NULL COMMENT '项目名',
  `projectPrefix` varchar(50) NOT NULL COMMENT '项目前缀',
  `proxyURL` varchar(50) DEFAULT NULL COMMENT '代理地址（后端提供的接口地址）',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(36) NOT NULL DEFAULT '' COMMENT '密码',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'admin', 'fa8cd71eae531a18f29f5a6688de4d3e', '18601102484', '2017-05-03 11:33:13');
COMMIT;

-- ----------------------------
--  Table structure for `userAuth`
-- ----------------------------
DROP TABLE IF EXISTS `userAuth`;
CREATE TABLE `userAuth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT 'user表外键',
  `projectId` int(11) NOT NULL COMMENT 'model表外键',
  `isManage` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否拥有管理权限',
  PRIMARY KEY (`id`),
  KEY `ids_userAuth_user` (`userId`),
  KEY `ids_userAuth_mode` (`projectId`) USING BTREE,
  CONSTRAINT `FK_userAuth_model` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE NO ACTION,
  CONSTRAINT `FK_userAuth_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;

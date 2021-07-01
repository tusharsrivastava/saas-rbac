import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1625129229366 implements MigrationInterface {
    name = 'initial1625129229366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `abstract_user` (`id` varchar(36) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `username` varchar(255) NULL, `email` varchar(300) NULL, `password` varchar(255) NULL, `profileThumbnail` varchar(255) NULL, `firstName` varchar(255) NULL, `lastName` varchar(255) NULL, `type` varchar(255) NOT NULL, `createdById` varchar(36) NULL, `roleId` varchar(36) NULL, INDEX `IDX_0e03f373b5fbdc91fbe09bac9c` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `account` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, `accountType` varchar(10) NOT NULL, `accountOwnerId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `abstract_module` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, `key` varchar(3) NOT NULL, `type` varchar(255) NOT NULL, `parentId` varchar(36) NULL, UNIQUE INDEX `IDX_1fdbf80bf26aa1b1bd23446ce3` (`key`), INDEX `IDX_d9fcf878653640747079fce144` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, `key` varchar(3) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_128d7c8c9af53479d0b9e00eb5` (`key`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role_map` (`id` varchar(36) NOT NULL, `canRead` tinyint NOT NULL DEFAULT 0, `canWrite` tinyint NOT NULL DEFAULT 0, `moduleId` varchar(36) NULL, `roleId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `abstract_user` ADD CONSTRAINT `FK_99d62dce0f2f770d1d172c0849e` FOREIGN KEY (`createdById`) REFERENCES `abstract_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `abstract_user` ADD CONSTRAINT `FK_e2ffb52bed9923726b55a16d276` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `account` ADD CONSTRAINT `FK_b73783b4c1d16accc1fe6ffb5ab` FOREIGN KEY (`accountOwnerId`) REFERENCES `abstract_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `abstract_module` ADD CONSTRAINT `FK_4dd6aa567985cc069dd518916a9` FOREIGN KEY (`parentId`) REFERENCES `abstract_module`(`id`) ON DELETE SET NULL ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `role_map` ADD CONSTRAINT `FK_a7678a94d5cc05d93691151ec82` FOREIGN KEY (`moduleId`) REFERENCES `abstract_module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `role_map` ADD CONSTRAINT `FK_374912579aacd0968f7942e06df` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `role_map` DROP FOREIGN KEY `FK_374912579aacd0968f7942e06df`");
        await queryRunner.query("ALTER TABLE `role_map` DROP FOREIGN KEY `FK_a7678a94d5cc05d93691151ec82`");
        await queryRunner.query("ALTER TABLE `abstract_module` DROP FOREIGN KEY `FK_4dd6aa567985cc069dd518916a9`");
        await queryRunner.query("ALTER TABLE `account` DROP FOREIGN KEY `FK_b73783b4c1d16accc1fe6ffb5ab`");
        await queryRunner.query("ALTER TABLE `abstract_user` DROP FOREIGN KEY `FK_e2ffb52bed9923726b55a16d276`");
        await queryRunner.query("ALTER TABLE `abstract_user` DROP FOREIGN KEY `FK_99d62dce0f2f770d1d172c0849e`");
        await queryRunner.query("DROP TABLE `role_map`");
        await queryRunner.query("DROP INDEX `IDX_128d7c8c9af53479d0b9e00eb5` ON `role`");
        await queryRunner.query("DROP TABLE `role`");
        await queryRunner.query("DROP INDEX `IDX_d9fcf878653640747079fce144` ON `abstract_module`");
        await queryRunner.query("DROP INDEX `IDX_1fdbf80bf26aa1b1bd23446ce3` ON `abstract_module`");
        await queryRunner.query("DROP TABLE `abstract_module`");
        await queryRunner.query("DROP TABLE `account`");
        await queryRunner.query("DROP INDEX `IDX_0e03f373b5fbdc91fbe09bac9c` ON `abstract_user`");
        await queryRunner.query("DROP TABLE `abstract_user`");
    }

}

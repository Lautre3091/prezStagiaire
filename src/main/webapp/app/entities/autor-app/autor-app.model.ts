import { BaseEntity } from './../../shared';

export class AutorApp implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public books?: BaseEntity[],
    ) {
    }
}

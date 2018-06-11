import { BaseEntity } from './../../shared';

export class SagaApp implements BaseEntity {
    constructor(
        public id?: number,
        public sagaName?: string,
        public editorId?: number,
        public books?: BaseEntity[],
    ) {
    }
}

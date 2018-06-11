import { BaseEntity } from './../../shared';

export class EditorApp implements BaseEntity {
    constructor(
        public id?: number,
        public editorName?: string,
        public sagases?: BaseEntity[],
    ) {
    }
}

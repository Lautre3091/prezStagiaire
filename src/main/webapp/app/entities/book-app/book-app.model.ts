import { BaseEntity } from './../../shared';

export const enum Style {
    'FANTASY',
    'SCIFI',
    'THRILLER'
}

export class BookApp implements BaseEntity {
    constructor(
        public id?: number,
        public bookName?: string,
        public nbPage?: number,
        public releaseDate?: any,
        public style?: Style,
        public autorId?: number,
        public sagaId?: number,
    ) {
    }
}

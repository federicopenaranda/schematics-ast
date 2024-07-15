import { writeFileSync } from 'fs';
import { BasicPropType, createBasicTypeFile } from './utils/createType';

const basicTypes: BasicPropType[] = [
    { propName: 'userName', propType: 'string' },
    { propName: 'userAge', propType: 'number' },
    { propName: 'userActive', propType: 'boolean' },
];

const basicTypeContent = createBasicTypeFile(basicTypes, 'User');

writeFileSync('./src/user.model.ts', basicTypeContent);
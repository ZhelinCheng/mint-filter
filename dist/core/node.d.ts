import { Children } from './index';
interface NodeOptionsType {
    parent?: Node | undefined;
    word?: boolean;
    depth?: number;
}
export default class Node {
    key: string;
    word: boolean;
    parent: Node | undefined;
    children: Children;
    failure: Node | undefined;
    depth: number;
    constructor(key: string, options?: NodeOptionsType);
}
export {};

/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: node
 */
interface Children {
    [key: string]: Node;
}
export default class Node {
    key: string;
    word: boolean;
    parent: Node | undefined;
    children: Children;
    failure: Node | Children | undefined;
    constructor(key: string, parent?: Node | undefined, word?: boolean);
}
export {};

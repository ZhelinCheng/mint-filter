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
    children: Children;
    constructor(key: string, word?: boolean);
}
export {};

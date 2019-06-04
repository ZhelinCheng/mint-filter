/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
import Tree from './core/tree';
interface FilterValue {
    text: string;
    filter: Array<string>;
}
export default class Mint extends Tree {
    constructor(keywordsPath?: string);
    _filterFn(word: string): FilterValue;
    filterSync(word: string): FilterValue;
    filter(word: string): Promise<FilterValue>;
}
export {};

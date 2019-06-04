import Tree from './core/tree';
interface FilterValue {
    text: string;
    filter: Array<string>;
}
declare class Mint extends Tree {
    constructor(keywordsPath?: string);
    _filterFn(word: string): FilterValue;
    filterSync(word: string): FilterValue;
    filter(word: string): Promise<FilterValue>;
}
export = Mint;

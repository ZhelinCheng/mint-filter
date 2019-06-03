/**
 * Created by ChengZheLin on 2019/6/3.
 * Features: index
 */
/**
 * 读取文件内容
 * @param path {string} 文件路径
 */
export declare function readFile(path: string): string;
/**
 * 获取所有敏感词
 */
export declare function getAllKeywords(selfPath?: string): any;
/**
 * 创建Trie树
 * @param keywords
 */
export declare function createTrieTree(keywords: string[]): {};

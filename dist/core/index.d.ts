import Node from './node';
export interface Children {
    [key: string]: Node;
}
/**
 * 读取文件内容
 * @param path {string} 文件路径
 */
export declare function readFile(path: string): string;
/**
 * 获取所有敏感词
 */
export declare function getAllKeywords(selfPath?: string): Array<string>;

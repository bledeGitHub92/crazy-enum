export function iterable<K, T extends object = object>(map: Map<K, string>, cls: T): T & Iterable<{ value: K; text: string }> {
    // 将 Map 转换为 { value, text } 的数组
    const list = [...map].map(([value, text]) => ({ value, text }));

    // 实现 Symbol.iterator
    const iterableObj = {
        [Symbol.iterator](): Iterator<{ value: K; text: string }> {
            let index = 0;
            return {
                next(): IteratorResult<{ value: K; text: string }> {
                    if (index < list.length) {
                        return {
                            value: list[index++],
                            done: false,
                        };
                    }
                    return {
                        value: undefined as any, // 当 done 为 true 时，value 可以是 undefined
                        done: true,
                    };
                },
            };
        },
    };

    // 将 iterableObj 合并到 cls 中
    return Object.assign(cls, iterableObj);
}


// export function iterable<K, T extends object = object>(map: Map<K, string>, cls: T) {
//     const list = [...map].map(([k, v]) => ({
//         value: k,
//         text: v,
//     }));
//     const obj = {
//         [Symbol.iterator](): {
//             list: {
//                 value: K;
//                 text: string;
//             }[];
//             next: () => {
//                 value: {
//                     value: K;
//                     text: string;
//                 };
//                 done: boolean;
//             };
//         } {
//             let index = 0;
//             return {
//                 list: list,
//                 next() {
//                     if (index < this.list.length) {
//                         return {
//                             value: this.list[index++],
//                             done: false,
//                         };
//                     }
//                     return {
//                         value: this.list[index],
//                         done: true,
//                     };
//                 },
//             };
//         },
//     };
//     return Object.assign(cls, obj);
// }

export function enumerable<T>(obj: Record<string, any>, cls: new (...args: any[]) => T) {
    const keys = Object.keys(obj);
    for (const k of keys) {
        Object.assign(cls, { [k]: new cls(obj[k]) });
    }
}

export function iterable<K, T extends object = object>(map: Map<K, string>, cls: T): T & Iterable<{ value: K; text: string }> {
    const list = [...map].map(([value, text]) => ({ value, text }));
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
                        value: undefined as any,
                        done: true,
                    };
                },
            };
        },
    };

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

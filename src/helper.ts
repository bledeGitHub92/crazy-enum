export function iterable<K, T extends object = object>(map: Map<K, string>, cls: T) {
    const list = [...map].map(([k, v]) => ({
        value: k,
        description: v,
    }));
    const obj = {
        [Symbol.iterator](): {
            list: {
                value: K;
                description: string;
            }[];
            next: () => {
                value: {
                    value: K;
                    description: string;
                };
                done: boolean;
            };
        } {
            let index = 0;
            return {
                list: list,
                next() {
                    if (index < this.list.length) {
                        return {
                            value: this.list[index++],
                            done: false,
                        };
                    }
                    return {
                        value: this.list[index],
                        done: true,
                    };
                },
            };
        },
    };
    return Object.assign(cls, obj);
}

export function enumerable<T>(obj: Record<string, any>, cls: new (...args: any[]) => T) {
    const keys = Object.keys(obj);
    for (const k of keys) {
        Object.assign(cls, { [k]: new cls(obj[k]) });
    }
}

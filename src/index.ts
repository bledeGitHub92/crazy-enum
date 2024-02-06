function iterable<K, T extends object = object>(map: Map<K, string>, cls: T) {
    const list = [...map].map(([k, v]) => ({
        id: k,
        name: v,
    }));
    const obj = {
        [Symbol.iterator](): {
            list: {
                id: K;
                name: string;
            }[];
            next: () => {
                value: {
                    id: K;
                    name: string;
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

function enumerable<T>(obj: Record<string, any>, cls: new (...args: any[]) => T) {
    const keys = Object.keys(obj);
    for (const k of keys) {
        Object.assign(cls, { [k]: new cls(obj[k]) });
    }
}

interface IEnum<T> {
    readonly id: T;
    readonly name: string;
}

export default function Enum<K extends string, V>(ids: Record<K, V>, names: Record<K, string>) {
    const map = new Map<V, string>();
    for (const it of Object.keys(ids) as K[]) {
        map.set(ids[it], names[it]);
    }

    class InnerEnum implements IEnum<V> {
        constructor(public readonly id: V) {}

        static get<T extends InnerEnum>(this: new (id: V) => T, id: V): T {
            return new this(id);
        }

        get name() {
            return map.get(this.id) || "";
        }

        get valid() {
            return map.has(this.id);
        }
    }

    const iter = iterable(map, InnerEnum);
    enumerable(ids, InnerEnum);

    return InnerEnum as typeof InnerEnum &
        typeof iter & {
            readonly [key in K]: IEnum<V>;
        };
}

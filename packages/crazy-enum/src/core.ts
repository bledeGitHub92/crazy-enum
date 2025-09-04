import { iterable, enumerable } from "./helper";

export interface IEnumCreator<T> {
    readonly value: T;
    readonly text: string;
}

export function EnumFactory<K extends string, V>(values: Record<K, V>, texts: Record<K, string>) {
    const map = new Map<V, string>();
    for (const it of Object.keys(values) as K[]) {
        map.set(values[it], texts[it]);
    }

    class EnumCreator implements IEnumCreator<V> {
        constructor(public readonly value: V) {}

        static get<T extends EnumCreator>(this: new (id: V) => T, id: V): T {
            return new this(id);
        }

        get text() {
            return map.get(this.value) || "";
        }

        get valid() {
            return map.has(this.value);
        }
    }

    const iter = iterable(map, EnumCreator);
    enumerable(values, EnumCreator);

    return EnumCreator as typeof EnumCreator &
        typeof iter & {
            readonly [key in K]: IEnumCreator<V>;
        };
}

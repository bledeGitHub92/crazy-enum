import Enum from 'crazy-enum';


const K = {
    foo: 'foo',
    bar: 'bar',
};
const V = {
    foo: '1',
    bar: '2',
};

class A extends Enum(K, V) {
    isFoo() {
        return this.text === K.foo;
    }
}



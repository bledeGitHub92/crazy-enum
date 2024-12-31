import EnumFactory from "crazy-enum";

const values = {
    enabled: 1,
    disabled: 2,
};
const texts = {
    enabled: "启用",
    disabled: "禁用",
};

export default class Status extends EnumFactory(values, texts) {
}

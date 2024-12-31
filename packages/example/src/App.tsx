import { Descriptions, Select } from "antd";
import Status from "./enums/status";

export default function App() {
    return (
        <>
            <Descriptions title="基础" column={2}>
                <Descriptions.Item label={"status 文本"}>{Status.get(1).text || "-"}</Descriptions.Item>
                <Descriptions.Item label={"status 值"}>{Status.get(1).value || "-"}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="迭代器" column={2}>
                <Descriptions.Item label={"status"}>
                    <Select
                        style={{ width: "100%" }}
                        options={[...Status].map((it) => ({ label: it.text, value: it.value }))}
                    />
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}
import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    text: string;
    sender: Sender;
    timestamp: Time;
}
export type Time = bigint;
export enum Sender {
    user = "user",
    assistant = "assistant"
}
export interface backendInterface {
    getAll(): Promise<Array<Message>>;
    getRange(from: Time | null, to: Time | null): Promise<Array<Message>>;
    send(text: string, sender: Sender): Promise<Time>;
}

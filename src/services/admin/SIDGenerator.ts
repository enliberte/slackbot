export interface ISIDGenerator {
    generate(arg: string): string;
}

export default class SIDGenerator implements ISIDGenerator {
    generate(arg: string): string {
        return arg;
    }
}
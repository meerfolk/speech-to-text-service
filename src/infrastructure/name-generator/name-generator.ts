import { IFileNameGenerator } from "~/domain";

export class NameGenerator implements IFileNameGenerator {
    private numTo2DigitsString(num: number): string {
        return num.toString().padStart(2, '0');
    }

    public generate(): string {
        const now = new Date();

        const year = now.getFullYear()
            .toString()
            .slice(2);
        const month = this.numTo2DigitsString(now.getMonth() + 1);
        const date = this.numTo2DigitsString(now.getDate());
        const hours = this.numTo2DigitsString(now.getHours());
        const minutes = this.numTo2DigitsString(now.getMinutes());
        const seconds = this.numTo2DigitsString(now.getSeconds());

        return `${year}${month}${date}${hours}${minutes}${seconds}`;
    };
}

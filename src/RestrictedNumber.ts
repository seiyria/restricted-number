
export class RestrictedNumber {
    public maximum: number;
    public minimum: number;
    public __current: number;

    public get total(): number {
        return this.__current;
    }

    public set total(num: number) {
        this.__current = num;
    }

    constructor(minimum: number, maximum: number, current: number = maximum) {
        this.minimum = minimum;
        this.maximum = maximum;
        this.set(current);

        if(this.maximum < this.minimum) throw new Error('RestrictedNumber: Max should be above min');
    }

    // chainable operators
    public set(num: number): RestrictedNumber {
        num = Math.min(num, this.maximum);
        num = Math.max(num, this.minimum);
        this.__current = num;
        return this;
    }

    public add(num: number): RestrictedNumber {
        return this.set(this.__current + num);
    }

    public sub(num: number): RestrictedNumber {
        return this.add(-num);
    }

    public addOverMaximum(num: number): RestrictedNumber {
        this.maximum += num;
        return this.add(num);
    }

    public subUnderMinimum(num: number): RestrictedNumber {
        this.minimum -= num;
        return this.sub(num);
    }

    // max/min set functions

    public toMaximum(): RestrictedNumber {
        return this.set(this.maximum);
    }

    public toMinimum(): RestrictedNumber {
        return this.set(this.minimum);
    }

    public atMaximum(): boolean {
        return this.maximum <= this.total;
    }

    public atMinimum(): boolean {
        return this.minimum >= this.total;
    }

    // value checking functions

    public gt(num: number): boolean {
        return this.total > num;
    }

    public gte(num: number): boolean {
        return this.total >= num;
    }

    public lt(num: number): boolean {
        return this.total < num;
    }

    public lte(num: number): boolean {
        return this.total <= num;
    }

    // percentage functions

    public setToPercent(perc: number): RestrictedNumber {
        return this.set(perc * ((this.maximum - this.minimum) / 100));
    }

    public addPercent(perc: number): RestrictedNumber {
        return this.add(perc * ((this.maximum - this.minimum) / 100));
    }

    public subPercent(perc: number): RestrictedNumber {
        return this.addPercent(-perc);
    }

    public asPercent(): number {
        return Math.floor(this.total * (this.maximum / 100));
    }

    // percentage checking functions

    public gtPercent(perc: number): boolean {
        return this.asPercent() > perc;
    }

    public gtePercent(perc: number): boolean {
        return this.asPercent() >= perc;
    }

    public ltPercent(perc: number): boolean {
        return this.asPercent() < perc;
    }

    public ltePercent(perc: number): boolean {
        return this.asPercent() <= perc;
    }
}
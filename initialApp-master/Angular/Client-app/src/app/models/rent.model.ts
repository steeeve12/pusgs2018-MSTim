export class Rent {
    Id: number;
    Start: Date;
    End: Date;

    constructor(id: number, start: Date, end: Date) {
        this.Id = id;
        this.Start = start;
        this.End = end;
    }
}
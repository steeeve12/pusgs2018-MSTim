export class Impression {
    Id: number;
    Comment: string;
    Grade: number;
    Time: Date;

    constructor(id: number, comment: string, grade: number, time: Date) {
        this.Id = id;
        this.Comment = comment;
        this.Grade = grade;
        this.Time = time;
    }
}
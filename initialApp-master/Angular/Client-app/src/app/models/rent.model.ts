import { Branch } from "src/app/models/branch.model";

export class Rent {
    Id: number;
    Start: Date;
    End: Date;
    Branch1Id: number;
    Branch2Id: number;
    VehicleId: number;

    constructor(start: Date, end: Date, branch1Id: number, branch2Id: number, vehicleId: number) {
        this.Id = -1;
        this.Start = start;
        this.End = end;
        this.Branch1Id = branch1Id;
        this.Branch2Id = branch2Id;
        this.VehicleId = vehicleId;
    }
}
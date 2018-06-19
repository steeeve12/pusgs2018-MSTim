import {Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'vehicleSearch'
})
export class VehicleSearchPipe implements PipeTransform {
    transform(items: Array<any>, modelSearch: string, manufactorSearch: string, yearSearch: number, pricePerHourSearch: number, vehicleTypeSearch: string){
        if (items && items.length){
            return items.filter(item =>{
                if (modelSearch && item.Model.toLowerCase().indexOf(modelSearch.toLowerCase()) === -1){
                    return false;
                }
                if (manufactorSearch && item.Manufactor.toLowerCase().indexOf(manufactorSearch.toLowerCase()) === -1){
                    return false;
                }
                if (yearSearch && item.Year.toString().toLowerCase().indexOf(yearSearch.toString().toLowerCase()) === -1){
                    return false;
                }
                if (pricePerHourSearch && item.PricePerHour.toString().toLowerCase().indexOf(pricePerHourSearch.toString().toLowerCase()) === -1){
                    return false;
                }
                if (vehicleTypeSearch && item.VehicleType.Name.toLowerCase().indexOf(vehicleTypeSearch.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}
// import the packages  
import {  
    Injectable,  
    EventEmitter  
} from '@angular/core';  

import {  
    GetClockTime  
} from '../models/get-clock-time';  
// declare the global variables  
declare var $: any;

@Injectable()  
export class SignalRService {  
    // Declare the variables  
    private proxy: any;  
    private proxyName: string = 'notifications';  // naziv hub-a u Visual Studio
    private connection: any;  
    // create the Event Emitter  
    public messageReceived: EventEmitter < GetClockTime > ;  
    public connectionEstablished: EventEmitter < Boolean > ;  
    public connectionExists: Boolean;  
    constructor() {  
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter < Boolean > ();  
        this.messageReceived = new EventEmitter < GetClockTime > ();  
        this.connectionExists = false;  
        // create hub connection  
        this.connection = $.hubConnection("http://localhost:51680");  // adresa servera
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);  
        // register on server events
        if(!this.connectionExists)   {
            this.startConnection();            
        }
        this.registerOnServerEvents();  
        // call the connecion start method to start the connection to send and receive events.  
  
    }  
    // method to hit from client  
    public sendTime() {  
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('GetRealTime');  
    }  
    // check in the browser console for either signalr connected or not  
    private startConnection(): void {
        debugger
        this.connection.start().done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);  
            this.connectionEstablished.emit(true);  
            this.connectionExists = true;  
        }).fail((error: any) => {  
            debugger
            console.log('Could not connect ' + error);
            console.log('Stack trace: ' + error.stack);  
            this.connectionEstablished.emit(false);  
        });  
    }  
    private registerOnServerEvents(): void {  
        debugger;  
        this.proxy.on('setRealTime', (data: GetClockTime) => {  
            console.log('received in SignalRService: ' + JSON.stringify(data));  
            this.messageReceived.emit(data);  
        });  
    }  
}  
import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from "rxjs";

@Injectable()
export class WebSocketService {
    socket: io.Socket;

    constructor() {
        this.socket = io.connect('http://localhost:3000',{ transports : ['websocket'] });
        console.log(this.socket);
    }

    listen(eventname: string) : Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventname, (data: any) => {
                subscriber.next(data);
            })
        })
    }

    emit(eventname: string, data: any) {
        this.socket.emit(eventname, data);
    }
}
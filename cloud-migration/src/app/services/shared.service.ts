import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public editData: any = [];

  public subject = new Subject<any>();

  private dataSource = new BehaviorSubject(this.editData);

  currentData = this.dataSource.asObservable();

  changeData(data: any): void {
    this.dataSource.next(data);
  }
}

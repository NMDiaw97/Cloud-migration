import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteProviderService {

  constructor(private matDialog: MatDialog) { }
  ConfirmDelete(){
    this.matDialog.open(ConfirmDialogComponent)
  }
}


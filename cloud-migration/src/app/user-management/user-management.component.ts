import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../class/user';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  pageTitle!: string
;  displayedColumns = ['username', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource<User>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserManagementService
  ) { }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.pageTitle = 'User Management';
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getUsers().then( data => {
      console.log(data);
      this.dataSource.data = data.users;
    })
    .catch( e => {
      console.log(' error ', e);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = ( event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delete(username: string): void {
    this.deleteConfirmation(username);
  }

  deleteConfirmation(name: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm to drop this criterion ?'
      },
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.userService.deleteUser(name).then( data => {
          console.log(data);
        })
        .catch( e => {
          console.log(e);
        });
        this.router.navigate(['']);
      }
    });
  }
}

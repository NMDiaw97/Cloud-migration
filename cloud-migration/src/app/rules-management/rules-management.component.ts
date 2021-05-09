import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Rule } from '../class/rule';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { RulesService } from '../services/rules.service';

@Component({
  selector: 'app-rules-management',
  templateUrl: './rules-management.component.html',
  styleUrls: ['./rules-management.component.css']
})
export class RulesManagementComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Rule>();
  displayedColumns = ['name', 'criticity', 'complexity', 'availability', 'type', 'action'];
  formGroup!: FormGroup;
  selected = 'type';
  boolCreate = true;
  panelOpenState = false;
  status = false;
  pageTitle: string | undefined;
  formTitle: string | undefined;
  types!: string[];

  nameformGroup!: FormGroup;
  criticityformGroup!: FormGroup;
  complexityformGroup!: FormGroup;
  availabilityformGroup!: FormGroup;
  typeformGroup!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private ruleService: RulesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.getAllrules();
    this.newRuleForm();
    this.pageTitle = 'Regles'
    this.types = ['big data', 'web', 'mobile', 'default'];
  }

  getAllrules(): void {
    this.ruleService.getRules().then(data => {
      this.dataSource.data = data.rulesappcloudready;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newRuleForm(): void {
    this.formTitle = 'Add new Rule ';

    this.nameformGroup = this.formBuilder.group({
      name: ['', [Validators.required]]
    })

    this.criticityformGroup = this.formBuilder.group({
      criticity: ['', [Validators.required, Validators.max, Validators.min]]
    })

    this.complexityformGroup = this.formBuilder.group({
      complexity: ['', [Validators.required, Validators.max, Validators.min]]
    })

    this.availabilityformGroup = this.formBuilder.group({
      availability: ['', [Validators.required, Validators.min, Validators.max]]
    })

    this.typeformGroup = this.formBuilder.group({
      type: ['', [Validators.required]]
    })

  }

  reset(form: FormGroup): void {
    form.reset();
  }


  // tslint:disable-next-line:typedef
  getValue(formGroup: FormGroup) {
    return formGroup.controls;
  }


  submit(): void {
    
    const rule = new Rule();
    rule.name = this.getValue(this.nameformGroup).name.value;
    rule.criticity = this.getValue(this.criticityformGroup).criticity.value;
    rule.complexity = this.getValue(this.complexityformGroup).complexity.value;
    rule.availability = this.getValue(this.availabilityformGroup).availability.value;
    rule.type = this.getValue(this.typeformGroup).type.value;
    console.log(rule)
    if (this.boolCreate) {
      this.createRuleConfirmation(rule);
    }
    else {
      this.updateRuleConfirmation(rule);
      console.log(rule);
    }
  }

  createRuleConfirmation(rule: Rule): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm the creation of this new Rule !?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ruleService.setRule(rule).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
        this.router.navigate(['']);
      }
    });
  }

  deleteRuleConfirmation(name: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm to drop this criterion ?'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ruleService.deleteRule(name).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
        this.router.navigate(['']);
      }
    });
  }

  updateRuleConfirmation(rule: Rule): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirm tu update this Rule!'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ruleService.updateRule(rule).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
        this.router.navigate(['']);
      }
    });
  }

  edit(row: any): void {
    this.panelOpenState = true;
    this.formTitle = 'Update Rule ' + row.name;
    this.getValue(this.nameformGroup).name.setValue(row.name);
    this.getValue(this.criticityformGroup).criticity.setValue(row.criticity);
    this.getValue(this.complexityformGroup).complexity.setValue(row.complexity);
    this.getValue(this.availabilityformGroup).availability.setValue(row.availability);
    this.getValue(this.typeformGroup).type.setValue(row.type);
    this.status = true;
    this.boolCreate = false;
  }

  detail(row: any): void {
  }

  delete(name: string): void {
    this.deleteRuleConfirmation(name);
  }

  back(): void {
    this.newRuleForm();
    this.boolCreate = true;
    this.panelOpenState = false;
  }
}


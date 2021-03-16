import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Criteria } from '../class/criteria';
import { Rule } from '../class/rule';
import { ConfirmationDialogComponent } from '../criteria-management/confirmation-dialog/confirmation-dialog.component';
import { CriteriaStoreService } from '../services/criteria-store.service';
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
  boolCreate = true;
  panelOpenState = false;
  criterion0!: Criteria;
  criterion1!: Criteria;
  criterion2!: Criteria;
  status = false;
  pageTitle: string | undefined;
  formTitle: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private ruleService: RulesService,
    private criteriaService: CriteriaStoreService,
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
    this.getAllcriteriaValue();
  }

  getAllrules(): void {
    this.ruleService.getRules().then( data => {
      this.dataSource.data = data.rulesappcloudready;
      console.log(data);
    });
  }

  getAllcriteriaValue(): void {
    this.criteriaService.getCriteria().then( data => {
      console.log(' Criteria ', data.criteres);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = ( event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newRuleForm(): void {
    this.formTitle = 'Add new Rule ';
    this.formGroup = this.formBuilder.group({
       name: ['', Validators.required],
       criticity: ['', [Validators.required, Validators.max, Validators.min]],
       complexity: ['', [Validators.required, Validators.max, Validators.min]],
       availability: ['', [Validators.required, Validators.max, Validators.min]],
       type: ['', [Validators.required]]
     });
   }
  delete(name: string): void {
  }


  reset(form: FormGroup): void {
    form.reset();
  }


  // tslint:disable-next-line:typedef
  get f() {
    return this.formGroup.controls;
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const rule = new Rule();
    rule.name = this.f.name.value;
    rule.criticity = this.f.criticity.value;
    rule.complexity = this.f.complexity.value;
    rule.availability = this.f.availability.value;
    rule.type = this.f.type.value;
    if (this.boolCreate) {
      this.createRuleConfirmation(rule);
    }
  }

  createRuleConfirmation(rule: Rule): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
          message: 'Confirm the creation of this new Rule !?'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.ruleService.setRule(rule).then( data => {
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
  }

  detail(row: any): void {
  }
}


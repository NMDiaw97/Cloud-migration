import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Rule } from '../class/rule';
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
  status = false;
  pageTitle: string | undefined;
  formTitle: string | undefined;
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
    this.getAllruules();
    this.newRuleForm();
  }

  getAllruules(): void {
    this.ruleService.getRules().then( data => {
      this.dataSource.data = data.rulesappcloudready;
      console.log(data);
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
    console.log('new Data ', rule);
  }


  edit(row: any): void {
  }

  detail(row: any): void {
  }
}


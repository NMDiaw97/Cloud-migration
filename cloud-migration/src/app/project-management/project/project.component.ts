import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../class/project';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  formGroup!: FormGroup;
  pageTitle: string | undefined;
  formTitle = '';
  boolCreate = true;
  panelOpenState = false;

  constructor(private projectService: ProjectService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router) { }
  displayedColumns: string[] = ['project_name', 'application_type', 'dependencies', 'sla', 'environment', 'data_size', 'connected_applications', 'tech_requirements', 'cost_estimation'
    , 'cpu', 'disk', 'memory', 'number_of_vm', 'os_image', 'os_type', 'actions'];
  dataSource = new MatTableDataSource<Project>();

  ngOnInit(): void {
    this.projectForm()
    this.getAllProjects()
  }

  projectForm(): void {
    this.formGroup = this.formBuilder.group({
      'project_name': ['', Validators.required],
      'application_type': ['', Validators.required],
      'dependencies': ['', Validators.required],
      'sla': ['', Validators.required],
      'environment': ['', Validators.required],
      'data_size': ['', Validators.required],
      'connected_applications': ['', Validators.required],
      'tech_requirements': ['', Validators.required],
      'cost_estimation': ['', Validators.required],
      'cpu': ['', Validators.required],
      'disk': ['', Validators.required],
      'memory': ['', Validators.required],
      'os_image': ['', Validators.required],
      'os_type': ['', Validators.required],
      'number_of_vm': ['', Validators.required]

    }

    )
  }
  edit(row: any): void {
    this.panelOpenState = true
    this.formTitle = 'Modifier le projet';
    this.formGroup.controls.project_name.setValue(row.project_name)
    this.formGroup.controls.application_type.setValue(row.application_type)
    this.formGroup.controls.dependencies.setValue(row.dependencies)
    this.formGroup.controls.sla.setValue(row.sla)
    this.formGroup.controls.environment.setValue(row.environment)
    this.formGroup.controls.data_size.setValue(row.data_size)
    this.formGroup.controls.connected_applications.setValue(row.connected_applications)
    this.formGroup.controls.tech_requirements.setValue(row.tech_requirements)
    this.formGroup.controls.cost_estimation.setValue(row.cost_estimation)
    this.formGroup.controls.cpu.setValue(row.cpu)
    this.formGroup.controls.disk.setValue(row.disk)
    this.formGroup.controls.memory.setValue(row.memory)
    this.formGroup.controls.number_of_vm.setValue(row.number_of_vm)
    this.formGroup.controls.os_image.setValue(row.os_image)
    this.formGroup.controls.os_type.setValue(row.os_type)

    this.boolCreate = false
  }

  reset(form: FormGroup): void {
    form.reset();
  }

  delete(projecTName: string): void {
    this.deleteProjectConfirmation(projecTName);
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const projectinfo = new Project()
    projectinfo.project_name = this.formGroup.controls.project_name.value
    projectinfo.application_type = this.formGroup.controls.application_type.value
    projectinfo.dependencies = this.formGroup.controls.dependencies.value
    projectinfo.sla = this.formGroup.controls.sla.value
    projectinfo.environment = this.formGroup.controls.environment.value
    projectinfo.data_size = this.formGroup.controls.data_size.value
    projectinfo.connected_applications = this.formGroup.controls.connected_applications.value
    projectinfo.tech_requirements = this.formGroup.controls.tech_requirements.value
    projectinfo.cost_estimation = this.formGroup.controls.cost_estimation.value
    projectinfo.cpu = this.formGroup.controls.cpu.value
    projectinfo.disk = this.formGroup.controls.disk.value
    projectinfo.memory = this.formGroup.controls.memory.value
    projectinfo.number_of_vm = this.formGroup.controls.number_of_vm.value
    projectinfo.os_image = this.formGroup.controls.os_image.value
    projectinfo.os_type = this.formGroup.controls.os_type.value
    if (this.boolCreate) {
      this.createProjectConfirmation(projectinfo);

    }
    else {
      this.updateProjectConfirmation(projectinfo);
    }


    console.log(projectinfo)



  }


  private getAllProjects(): void {
    this.projectService.getProject().then(
      data => {
        this.dataSource.data = data.projects;
        console.log(data.projects)
      }
    ).catch(e => { console.log('error', e) })

  }

  createProjectConfirmation(projectInfo: Project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirmer la creation du projet?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.addProject(projectInfo).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
        this.router.navigate(['']);
      }
    }

    )
  }
  deleteProjectConfirmation(projectName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirmer la suppression de ce projet ?'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(projectName).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
        this.router.navigate(['']);
      }
    });
  }

  updateProjectConfirmation(projectInfo: Project): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '200px',
      data: {
        message: 'Confirmer la modification de ce projet?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.updateProject(projectInfo).then(data => {
          console.log(data);
        })
          .catch(e => {
            console.log(e);
          });
        this.router.navigate(['']);
      }
    });
  }





}

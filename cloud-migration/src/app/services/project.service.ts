import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../class/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl = environment.apiUrl;


  constructor( private http: HttpClient) { }

//list project
getProject():Promise<any>{
  return this.http.get<any>(`${this.apiUrl}/projects`).toPromise();
}


//update project
updateProject(project:Project):Promise<Project>{
  return this.http.put<Project>(`${this.apiUrl}/projects/${project.project_name}`, project).toPromise();


}


//delete project

deleteProject(projectName:string):Promise<string>{
  return this.http.delete<string>(`${this.apiUrl}/projects/${projectName}`).toPromise();


}



//adding a new project
addProject(project:Project):Promise<Project>{
  return this.http.post<Project>(`${this.apiUrl}/projects`,project).toPromise();
}


}


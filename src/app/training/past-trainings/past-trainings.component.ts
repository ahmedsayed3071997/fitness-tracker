import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  sub: Subscription;
  

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.sub = this.trainingService.finishedExericsesChanged.subscribe((exercises: Exercise[]) => { 
      exercises.map(ex=> ex.date = (ex.date as any).toDate().toDateString());
      this.dataSource.data = exercises  
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

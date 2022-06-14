import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

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
  
  constructor(private trainingService:TrainingService, private store:Store) { }

  ngOnInit(): void {
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises: Exercise[]) => { 
      // exercises.map(ex=> ex.date = (ex?.date as any).toDate().toDateString());
      this.dataSource.data = exercises.map(ex => {
        let obj: any = { ...ex };
        obj.dateString = (ex.date as any).toDate().toDateString()
        return obj;
      });
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
    
  }
}

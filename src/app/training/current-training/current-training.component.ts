import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { take } from 'rxjs/operators';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  @Output() trainingExit = new EventEmitter<void>();
  constructor(private dialog: MatDialog, private trainingService:TrainingService, private store:Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.startOrResumeTimer()  
  }
  
  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(exercise => {
      const step =  exercise.duration / 100 * 1000 
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExersice()
          clearInterval(this.timer)
        }
      },step)
    })
  }

  onStop() {
    clearInterval(this.timer);
   const dialogref =  this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
   });
    dialogref.afterClosed().subscribe(
      (result) => {
        if (result === true) {
          this.trainingService.cancelExercise(this.progress);
          
        } else {
          this.startOrResumeTimer()
        }
      }
    )
  }

}

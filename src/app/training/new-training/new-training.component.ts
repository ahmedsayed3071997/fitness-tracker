import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';
import { UiServiceService } from 'src/app/shared/ui-service.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
 
  @Output() startTraining = new EventEmitter<void>();

  exercises$: Observable<Exercise[]>;
  isLoading$:Observable<boolean> ;

  constructor(public trainingService:TrainingService, private uiService:UiServiceService, private store:Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.trainingService.fetchAvailableExercises();
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
  }

  onStartTraining(form:NgForm) {
    this.trainingService.startExercise(form.value.exersice);
  }
  ngOnDestroy(): void {
  }
}

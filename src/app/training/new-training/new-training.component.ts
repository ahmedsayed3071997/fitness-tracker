import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiServiceService } from 'src/app/shared/ui-service.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
 
  @Output() startTraining = new EventEmitter<void>();

  exercises: Exercise[];
  isLoading: boolean = false;
  exercisesSub: Subscription;
  loadingSub: Subscription;

  constructor(public trainingService:TrainingService, private uiService:UiServiceService) { }

  ngOnInit(): void {
    // this.exercises = this.db.collection('availableExercises').snapshotChanges() as Observable<Exercise[]>;
    this.trainingService.fetchAvailableExercises();
    this.exercisesSub = this.trainingService.exericsesChanged.subscribe(exercises => { 
      this.exercises = exercises
    })
    // this.exercises = this.trainingService.exericsesChanged;
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => { this.isLoading = isLoading });
  }

  onStartTraining(form:NgForm) {
    this.trainingService.startExercise(form.value.exersice);
  }
  ngOnDestroy(): void {
    if (this.exercisesSub) { 
      this.exercisesSub.unsubscribe();
    }
    if (this.loadingSub) { 
      this.loadingSub.unsubscribe();
    }
  }
}

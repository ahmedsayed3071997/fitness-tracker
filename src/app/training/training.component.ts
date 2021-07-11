import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exersiceSubscription: Subscription;

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.exersiceSubscription = this.trainingService.exericseChanged.subscribe(
      (exercise) => {
        exercise ? this.ongoingTraining = true: false
      }
    )
  }

}

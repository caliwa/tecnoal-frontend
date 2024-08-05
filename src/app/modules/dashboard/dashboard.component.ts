// src/app/modules/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule],

})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

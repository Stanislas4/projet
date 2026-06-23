import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JusticeDash } from "./dashboard/pages/justice-dash/justice-dash";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

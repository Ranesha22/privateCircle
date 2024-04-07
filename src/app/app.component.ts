import { Component } from '@angular/core';
import * as Sentry from '@sentry/browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'privateCircle';

  constructor(){
    // top row
Sentry.init({
  dsn: "https://9c290a5f5c76ce7da39b20da3956ab59@o4507045655805952.ingest.us.sentry.io/4507045670223872",
});

console.log('initiated')
setTimeout(()=>{
  throw new Error("Sentry test")
},5000)
  }
}

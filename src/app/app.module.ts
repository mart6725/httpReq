import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],      // http moodul on must 
  providers: [{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService, multi: true},       // j2rjekord loeb ka 
              {provide: HTTP_INTERCEPTORS,useClass: LoggingInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}

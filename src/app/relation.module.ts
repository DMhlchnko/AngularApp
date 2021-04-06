import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { RelationComponent } from './relation.component';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RelationComponent 
 ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [RelationComponent],
})
export class AppModule { }
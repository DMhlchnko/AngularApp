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
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  bootstrap: [RelationComponent],
})
export class AppModule { }
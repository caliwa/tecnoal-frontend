import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [MatDialogModule,MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  exports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule],
})
export class MaterialModule {}

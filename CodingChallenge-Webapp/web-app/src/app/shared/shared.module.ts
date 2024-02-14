import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormFieldModule,
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

const commonModules = [CommonModule, FormsModule, RouterModule];

const materialComponents = [
  MatAutocompleteModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
];

const components = [DeleteModalComponent];

@NgModule({
  declarations: [...components],
  exports: [...commonModules, ...materialComponents, ...components],
  imports: [...commonModules, ...materialComponents],
})
export class SharedModule {}

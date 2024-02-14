import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDataModel } from '../../models/modal.model';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalDataModel
  ) {}

  closeDialog() {
    this.dialogRef.close(false);
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../shared/components/delete-modal/delete-modal.component';
import { ModalModel } from '../shared/models/modal.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openDeleteModal(config: ModalModel) {
    const ref = this.dialog.open(DeleteModalComponent, {
      width: config.width || '500px',
      position: config.position || { top: '30px' },
      data: config.data,
    });
    return ref.afterClosed();
  }
}

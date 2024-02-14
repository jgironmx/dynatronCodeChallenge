import { DialogPosition } from '@angular/material/dialog';

export interface ModalModel {
  data: ModalDataModel;
  width?: string;
  position?: DialogPosition;
}

export interface ModalDataModel {
  title: string;
  content: string;
  closeText: string;
  okText: string;
}

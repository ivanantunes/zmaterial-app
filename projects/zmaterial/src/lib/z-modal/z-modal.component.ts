import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'z-modal',
  templateUrl: './z-modal.component.html',
  styleUrls: ['./z-modal.component.scss']
})
export class ZModalComponent implements OnInit {

  public showLog = false;

  @Output() isConfirmed = new EventEmitter<boolean>();

  constructor(
    private dialogRef: MatDialogRef<ZModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modal: any
  ) { }

  ngOnInit(): void {}

  public close(): void {
    this.dialogRef.close();
  }

  public closeConfirm(): void {
    this.isConfirmed.emit(false);
    this.close();
  }

  public acceptConfirm(): void {
    this.isConfirmed.emit(true);
    this.close();
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ZModalBase,
  ZModalConfirm,
  ZModalLog,
  ZModalType,
  ZModalManual,
  ZModalManualLog,
  ZModalManualConfirm
} from './interfaces';
import { ZModalComponent } from './z-modal.component';

@Injectable({
  providedIn: 'root'
})

/**
 * Service That Has Modals Call Functions.
 *
 * @author Ivan Antunes <ivanantnes75@gmail.com>
 * @copyright zmaterial
 */
export class ZModalService {

  constructor(private dialog: MatDialog) {}

  /**
   * Execute the Success Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTSuccess(config: ZModalBase): void {
    this.dialog.open(ZModalComponent, {
      width: config.width,
      height: config.height,
      disableClose: config.isDisableClose,
      data: {
        controlType: ZModalType.T_SUCCESS,
        title: config.title,
        description: config.description,
        btnCloseTitle: config.btnCloseTitle
      },
    });
  }

  /**
   * Execute the Success Log Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTSuccessLog(config: ZModalLog): void {
    this.dialog.open(ZModalComponent, {
      width: config.base.width,
      height: config.base.height,
      disableClose: config.base.isDisableClose,
      data: {
        controlType: ZModalType.T_SUCCESS_LOG,
        title: config.base.title,
        description: config.base.description,
        btnCloseTitle: config.base.btnCloseTitle,
        btnLogTitle: config.btnLogTitle,
        log: config.log
      }
    });
  }

  /**
   * Execute the Success Confirm Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTSuccessConfirm(config: ZModalConfirm): Observable<boolean> {
    const resp = this.dialog.open(ZModalComponent, {
      width: config.base.width,
      height: config.base.height,
      disableClose: config.base.isDisableClose,
      data: {
        controlType: ZModalType.T_SUCCESS_CONFIRM,
        title: config.base.title,
        description: config.base.description,
        btnCloseTitle: config.base.btnCloseTitle,
        btnConfirmTitle: config.btnConfirmTitle
      }
    });

    return resp.componentInstance.isConfirmed;
  }

  /**
   * Execute the Warning Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTWarning(config: ZModalBase): void {
    this.dialog.open(ZModalComponent, {
      width: config.width,
      height: config.height,
      disableClose: config.isDisableClose,
      data: {
        controlType: ZModalType.T_WARNING,
        title: config.title,
        description: config.description,
        btnCloseTitle: config.btnCloseTitle
      },
    });
  }

  /**
   * Execute the Warning Log Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTWarningLog(config: ZModalLog): void {
    this.dialog.open(ZModalComponent, {
      width: config.base.width,
      height: config.base.height,
      disableClose: config.base.isDisableClose,
      data: {
        controlType: ZModalType.T_WARNING_LOG,
        title: config.base.title,
        description: config.base.description,
        btnCloseTitle: config.base.btnCloseTitle,
        btnLogTitle: config.btnLogTitle,
        log: config.log
      }
    });
  }

  /**
   * Execute the Warning Confirm Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTWarningConfirm(config: ZModalConfirm): Observable<boolean> {
    const resp = this.dialog.open(ZModalComponent, {
      width: config.base.width,
      height: config.base.height,
      disableClose: config.base.isDisableClose,
      data: {
        controlType: ZModalType.T_WARNING_CONFIRM,
        title: config.base.title,
        description: config.base.description,
        btnCloseTitle: config.base.btnCloseTitle,
        btnConfirmTitle: config.btnConfirmTitle
      }
    });

    return resp.componentInstance.isConfirmed;
  }

  /**
   * Execute the Error Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTError(config: ZModalBase): void {
    this.dialog.open(ZModalComponent, {
      width: config.width,
      height: config.height,
      disableClose: config.isDisableClose,
      data: {
        controlType: ZModalType.T_ERROR,
        title: config.title,
        description: config.description,
        btnCloseTitle: config.btnCloseTitle
      },
    });
  }

  /**
   * Execute the Error Log Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTErrorLog(config: ZModalLog): void {
    this.dialog.open(ZModalComponent, {
      width: config.base.width,
      height: config.base.height,
      disableClose: config.base.isDisableClose,
      data: {
        controlType: ZModalType.T_ERROR_LOG,
        title: config.base.title,
        description: config.base.description,
        btnCloseTitle: config.base.btnCloseTitle,
        btnLogTitle: config.btnLogTitle,
        log: config.log
      }
    });
  }

  /**
   * Execute the Error Confirm Modal Template.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalTErrorConfirm(config: ZModalConfirm): Observable<boolean> {
    const resp = this.dialog.open(ZModalComponent, {
      width: config.base.width,
      height: config.base.height,
      disableClose: config.base.isDisableClose,
      data: {
        controlType: ZModalType.T_ERROR_CONFIRM,
        title: config.base.title,
        description: config.base.description,
        btnCloseTitle: config.base.btnCloseTitle,
        btnConfirmTitle: config.btnConfirmTitle
      }
    });

    return resp.componentInstance.isConfirmed;
  }

  /**
   * Execute the Manual Modal.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalManual(config: ZModalManual): void {
    this.dialog.open(ZModalComponent, {
      width: config.base.width,
      height: config.base.height,
      disableClose: config.base.isDisableClose,
      data: {
        controlType: ZModalType.M_ALERT,
        title: config.base.title,
        description: config.base.description,
        btnCloseTitle: config.base.btnCloseTitle,
        icon: config.icon,
        backgroundColor: config.backgroundColor
      },
    });
  }

  /**
   * Execute the Manual Log Modal.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalManualLog(config: ZModalManualLog): void {
    this.dialog.open(ZModalComponent, {
      width: config.base.base.width,
      height: config.base.base.height,
      disableClose: config.base.base.isDisableClose,
      data: {
        controlType: ZModalType.M_ALERT_LOG,
        title: config.base.base.title,
        description: config.base.base.description,
        btnCloseTitle: config.base.base.btnCloseTitle,
        btnLogTitle: config.btnLogTitle,
        log: config.log,
        icon: config.base.icon,
        backgroundColor: config.base.backgroundColor
      }
    });
  }

  /**
   * Execute the Manual Confirm Modal.
   *
   * @author Ivan Antunes <ivanantnes75@gmail.com>
   * @copyright zmaterial
   */
  public zModalManualConfirm(config: ZModalManualConfirm): Observable<boolean> {
    const resp = this.dialog.open(ZModalComponent, {
      width: config.base.base.width,
      height: config.base.base.height,
      disableClose: config.base.base.isDisableClose,
      data: {
        controlType: ZModalType.M_ALERT_CONFIRM,
        title: config.base.base.title,
        description: config.base.base.description,
        btnCloseTitle: config.base.base.btnCloseTitle,
        btnConfirmTitle: config.btnConfirmTitle,
        icon: config.base.icon,
        backgroundColor: config.base.backgroundColor
      }
    });

    return resp.componentInstance.isConfirmed;
  }
}

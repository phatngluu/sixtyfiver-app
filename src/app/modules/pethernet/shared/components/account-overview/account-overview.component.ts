import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { EthereumProviderExtension } from '../../models/ethereum-provider-extension';
import { Web3Service } from '../../services/web3.service';
import Web3 from 'web3';

@Component({
  selector: 'sf-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountOverviewComponent implements OnInit {
  public connectedAccounts: string[];
  public web3: Web3;
  public ethereumProvider: EthereumProviderExtension;

  constructor(
    private ref: ChangeDetectorRef,
    private web3Service: Web3Service) {
  }

  async ngOnInit() {
    await this.web3Service.initialize();
    this.connectedAccounts = await this.web3Service.getConnectedAccounts();
    this.ref.markForCheck();

    this.web3Service.accountChangedEvent.subscribe(() => {
      this.connectedAccounts = this.web3Service.connectedAccounts;
      this.ref.detectChanges();
    });
  }

  public connectAccountsWithMetaMask() {
    this.web3Service.connectMetamask();
  }
}

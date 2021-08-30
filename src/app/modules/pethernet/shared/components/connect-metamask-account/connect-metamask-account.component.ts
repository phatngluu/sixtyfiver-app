import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'sf-connect-metamask-account',
  templateUrl: './connect-metamask-account.component.html',
  styleUrls: ['./connect-metamask-account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectMetamaskAccountComponent implements OnInit {

  constructor(
    private web3Service: Web3Service,
  ) { }

  ngOnInit() {
  }

  public connectAccountsWithMetaMask() {
    this.web3Service.connectMetamask();
  }
}

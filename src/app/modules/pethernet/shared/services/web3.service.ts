import { EthereumProviderExtension } from './../models/ethereum-provider-extension';
import { AbstractResponse } from './../models/abstract-response';
import { environment } from './../../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { NzMessageService } from 'ng-zorro-antd/message';

import detectEthereumProvider from '@metamask/detect-provider'
import { AuthService } from 'src/app/shared/services/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConnectMetamaskAccountComponent } from '../components/connect-metamask-account/connect-metamask-account.component';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public web3: Web3;
  public ethereumProvider: EthereumProviderExtension;
  public contract: Contract;
  public contractABI: AbiItem[] = null;
  public contractAddress: string;
  public connectedAccounts: string[];
  private isInitialized: boolean = false;

  /** Events */
  public initializedEvent = new EventEmitter();
  public accountChangedEvent = new EventEmitter();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private modalService: NzModalService,
    private messageService: NzMessageService) {
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized === false) {
      if (this.contract === undefined) {
        await this.loadContract();
      }

      if (this.web3 === undefined || this.ethereumProvider === undefined) {
        this.connectMetaMask().then(() => {
          this.initializedEvent.emit();
          this.isInitialized = true;
        });
      }
    }
  }

  private async connectMetaMask(): Promise<void> {
    try {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider) {
        this.ethereumProvider = window.ethereum;

        // Set up Web3.js to work with Metamask
        await this.setupWeb3();
      } else {
        this.showModalBrowserNotSupportedEthereum();
      }
    } catch (err) {
      console.error("Cannot detect Ethereum provider.", err);
    };
  }

  private async setupWeb3(): Promise<void> {
    // Metamask has configured window.ethereum
    // If Metamask has been installed and configured. Then, Web3.givenProvider === window.ethereum
    // Initialize Web3 instance
    this.web3 = new Web3(Web3.givenProvider);
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);

    // Get connected account
    this.connectedAccounts = await this.web3.eth.getAccounts();
    if (this.connectedAccounts.length === 0) {
      this.showModalNoConnectedAccount();
    }
    window.ethereum.on('accountsChanged', (accounts) => {
      this.connectedAccounts = accounts;
      if (this.connectedAccounts.length === 0) {
        this.showModalNoConnectedAccount();
      }
      this.accountChangedEvent.emit();
      this.messageService.warning('Your acccount has been changed');
    });
  }

  private async loadContract(): Promise<void> {
    const contractAddressPromise = await this.http.get<AbstractResponse<string>>(environment.getContractAddress).toPromise();
    const contractABIPromise = await this.http.get<AbstractResponse<AbiItem[]>>(environment.getContractABI).toPromise();
    const contractInfo = await Promise.all([contractAddressPromise, contractABIPromise]);

    this.contractAddress = contractInfo[0].message;
    this.contractABI = contractInfo[1].message;
  }

  public async loadMinistryOfHealthAccountAddress(): Promise<string> {
    const genericOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getAccessToken()}`
      }),
      responseType: "json"
    }
    const res = await this.http.get<AbstractResponse<string>>(environment.getMinistryOfHealthAccountAddress, genericOptions).toPromise();

    return res.message;
  }

  public async getConnectedAccounts(): Promise<string[]> {
    if (this.web3 === undefined) return [];
    return await this.web3.eth.getAccounts();
  }

  public connectMetamask(): void {
    this.ethereumProvider.request({ method: 'eth_requestAccounts' });
  }

  private showModalBrowserNotSupportedEthereum(): void {
    this.modalService.create({
      nzTitle: 'Missing Ethereum provider.',
      nzContent: 'This app requires browser has an Ethereum provider. Please install Metamask extension.',
      nzMask: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzOkDisabled: true,
      nzCancelDisabled: true,
      nzOnOk: () => window.open('https://metamask.io')
    });
  }

  private showModalNoConnectedAccount(): void {
    const modalRef = this.modalService.create({
      nzTitle: 'No account is connected.',
      nzContent: ConnectMetamaskAccountComponent,
      nzMask: true,
      nzMaskClosable: false,
      nzClosable: false,
      nzOkDisabled: true,
      nzCancelDisabled: true,
      nzOnOk: () => window.open('https://metamask.io')
    });

    this.accountChangedEvent.subscribe(() => {
      if (this.connectedAccounts.length > 0) {
        modalRef.close();
      }
    })
  }
}

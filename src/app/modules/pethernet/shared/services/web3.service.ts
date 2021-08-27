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

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  getEthereumProvider(): import("../models/ethereum-provider-extension").EthereumProviderExtension {
    throw new Error('Method not implemented.');

  }
  public web3: Web3;
  public ethereumProvider: EthereumProviderExtension;
  public contract: Contract;
  public contractABI: AbiItem[] = null;
  public contractAddress: string;
  public connectedAccounts: string[];
  public MINISTRY_OF_HEALTH_ADDRESS: string;

  /** Events */
  public initializedEvent = new EventEmitter();
  public accountChangedEvent = new EventEmitter();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private messageService: NzMessageService) {
    // Connect metamask
    // this.connectMetaMask();

    // Load & initialize contract
    // this.loadContract();
  }

  public async initialize() : Promise<void> {
    if (this.web3 === undefined || this.ethereumProvider === undefined) {
      this.connectMetaMask();
    }

    if (this.contract === undefined) {
      await this.loadContract();
    }

    if (this.MINISTRY_OF_HEALTH_ADDRESS === undefined) {
      await this.loadMinistryOfHealthAccountAddress();
    }

    this.initializedEvent.emit();
  }

  private async connectMetaMask(): Promise<void> {
    try {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider) {
        this.ethereumProvider = window.ethereum;

        // Set up Web3.js to work with Metamask
        await this.setupWeb3();
      } else {
        this.messageService.error('Missing Ethereum provider. Please install Metamask extension.', { nzDuration: 0 });
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

    // Get connected account
    this.connectedAccounts = await this.web3.eth.getAccounts();
    window.ethereum.on('accountsChanged', (accounts) => {
      this.connectedAccounts = accounts;
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
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
  }

  private async loadMinistryOfHealthAccountAddress(): Promise<void> {
    const genericOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getAccessToken()}`
      }),
      responseType: "json"
    }
    const res = await this.http.get<AbstractResponse<string>>(environment.getMinistryOfHealthAccountAddress, genericOptions).toPromise();
    this.MINISTRY_OF_HEALTH_ADDRESS = res.message;
  }

  public async getConnectedAccounts(): Promise<string[]> {
    return await this.web3.eth.getAccounts();
  }

  public connectMetamask(): void {
    this.ethereumProvider.request({ method: 'eth_requestAccounts' });
  }
}

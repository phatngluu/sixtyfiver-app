import { EthereumProviderExtension } from './../models/ethereum-provider-extension';
import { AbstractResponse } from './../models/abstract-response';
import { environment } from './../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import Web3 from 'web3';
import { Account } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { Accounts } from 'web3-eth-accounts';
import { AbiItem } from 'web3-utils';
import { HttpProviderBase } from 'web3-core-helpers';
import { NzMessageService } from 'ng-zorro-antd/message';

import detectEthereumProvider from '@metamask/detect-provider'

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  getEthereumProvider(): import("../models/ethereum-provider-extension").EthereumProviderExtension {
    throw new Error('Method not implemented.');

  }
  private contractABI: AbiItem[] = null;
  private contractAddress: string;
  public contract: Contract;
  public web3: Web3;
  public ethereumProvider: EthereumProviderExtension;
  public connectedAccounts: string[];
  public initializedEvent = new EventEmitter(true);

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService) {
    // Load & initialize contract
    this.loadContract();

    this.connectMetaMask();
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
    this.initializedEvent.emit('nothing');

    // Get connected account
    this.connectedAccounts = await this.web3.eth.getAccounts();
    window.ethereum.on('accountsChanged', (accounts) => {
      this.connectedAccounts = accounts;
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

  public async getConnectedAccounts(): Promise<string[]> {
    return await this.web3.eth.getAccounts();
  }
}

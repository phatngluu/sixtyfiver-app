import { AbstractResponse } from './../models/abstract-response';
import { environment } from './../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Accounts } from 'web3-eth-accounts';
import { AbiItem } from 'web3-utils';
import { HttpProviderBase } from 'web3-core-helpers';
import { NzMessageService } from 'ng-zorro-antd/message';

import detectEthereumProvider from '@metamask/detect-provider'

declare let window: any;

interface MinistryOfHealthAddrRequest {
  method: string,
  params: unknown[]
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3;
  private web3Provider: HttpProviderBase;

  private contractABI: AbiItem[] = null;
  private contractAddress: string;
  private connectedAccounts: Accounts;


  public contract: Contract;

  constructor(
    private http: HttpClient,
    private messageService: NzMessageService) {

    this.connectMetaMask();

  }

  private async connectMetaMask(): Promise<void> {
    detectEthereumProvider().then((provider) => {
      if (provider) {
        this.messageService.success('Metamask connected. Application is ready to use.');
      } else {
        this.messageService.error('Metamask extension is required to use this application.', { nzDuration: 0 });
      }

      // Set up Web3.js to work with Metamask
      this.setupWeb3();
    }).catch((err) => {
        console.error("Cannot detect Ethereum provider.", err);
    });
  }

  private async setupWeb3(): Promise<void> {
    // Metamask has configured window.ethereum
    // If Metamask has been installed and configured. Web3.givenProvider === window.ethereum
    // Initialize Web3 instance
    this.web3 = new Web3(Web3.givenProvider);

    // Load & initialize contract
    await this.loadContract();
  }

  private async loadContract(): Promise<void> {
    const contractAddressPromise = await this.http.get<AbstractResponse<string>>(environment.getContractAddress).toPromise();
    const contractABIPromise = await this.http.get<AbstractResponse<AbiItem[]>>(environment.getContractABI).toPromise();
    const contractInfo = await Promise.all([contractAddressPromise, contractABIPromise]);

    this.contractAddress = contractInfo[0].message;
    this.contractABI = contractInfo[1].message;

    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
  }
}

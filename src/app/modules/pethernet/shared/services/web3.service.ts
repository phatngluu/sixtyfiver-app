import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import Web3 from 'web3';
declare let window: any;

interface MinistryOfHealthAddrRequest {
    method: string,
    params: unknown[]
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  web3: any;
  accounts: Array<String>;

  constructor() {
    // if (window.ethereum === undefined) {
    //   alert('Non-Ethereum browser detected. Install MetaMask');
    // } else {
    //   if (window.ethereum.isConnected()) {
    //     console.log("Connected to perform blockchain operation.");
    //   }
    // }

    this.loadWeb3();
  }

  async loadWeb3() {
    console.log(Web3);
    if (window.ethereum) {
        // window.web3 = new Web3(window.ethereum);

        // await window.ethereum.enable;
    } else if (window.web3) {
        // window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }
  }

  connectMetaMask(): Observable<any> {
    return from(window.ethereum.request({ method: 'eth_requestAccounts' }));
  }

  getMinistryOfHealthAddr(): Observable<any> {

    var request: MinistryOfHealthAddrRequest = {
      method: "checkDoctor",
      params: ["abc"]
    }

    return from(window.ethereum.request(request));
  }

  // interface RequestArguments {
  //   method: string;
  //   params?: unknown[] | object;
  // }

  // ethereum.request(args: RequestArguments): Promise<unknown>;
}

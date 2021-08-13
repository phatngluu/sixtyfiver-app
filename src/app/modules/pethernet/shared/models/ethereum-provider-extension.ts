// import { ProviderMessage, ProviderRpcError, ProviderConnectInfo, RequestArguments } from 'hardhat/types';

interface ProviderMessage {
  type: string;
  data: unknown;
}

export interface EthereumEvent {
    connect: any;
    disconnect: any;
    accountsChanged: Array<string>;
    chainChanged: string;
    message: ProviderMessage
}

export type EventKeys = keyof EthereumEvent;
export type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

export interface EthereumProviderExtension {
  autoRefreshOnNetworkChange?: boolean;
  chainId: string;
  isMetaMask?: boolean;
  isStatus?: boolean;
  networkVersion: string;
  selectedAddress: any;

  on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
  enable(): Promise<any>;
  request?: (request: { method: string, params?: Array<any> }) => Promise<any>
  /**
   * @deprecated
   */
  send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
  sendAsync: (request: any) => Promise<unknown>
}

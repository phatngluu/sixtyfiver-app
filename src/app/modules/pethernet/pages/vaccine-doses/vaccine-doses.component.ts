import { Web3Service } from './../../shared/services/web3.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './vaccine-doses.component.html',
  styleUrls: ['./vaccine-doses.component.css']
})
export class VaccinedosesComponent implements OnInit {

  constructor(
    private web3Service: Web3Service) {

  }

  ngOnInit(): void {
    this.web3Service.connectMetaMask().subscribe(console.log);
  }
}

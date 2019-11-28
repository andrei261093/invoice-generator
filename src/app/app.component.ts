import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Line {
  name: string;
  qty: string;
  price: number;
}

export interface Entity {
  name: string;
  address: string;
  cif: string;
  account: string;
  bank: string;
  regCom: string;
}

export interface Details {
  buyer: Entity;
  supplier: Entity;
  lines: Line[];
  invoice_number: string;
  invoice_series: string;
  invoice_date: Date;
  invoice_total_amount: number;
  observations: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'invoice-generator';

  invoice_series: string = "";
  invoice_number: string = "";
  invoice_date: Object = {};

  supplier = {} as Entity;
  buyer = {} as Entity;
  lines = [] as Line[];
  articleNames = [] as string[];
  totalAmount = 0;
  observations: string = "";

  constructor(private http: HttpClient) {
    this.supplier = JSON.parse(localStorage.getItem("supplier"));
    this.buyer = JSON.parse(localStorage.getItem("buyer"))

    this.invoice_date = new Date();
    this.invoice_number = localStorage.getItem("invoice_number");

    this.invoice_number = +this.invoice_number + 1 + "";

    this.invoice_series = localStorage.getItem("invoice_series");
    this.observations = localStorage.getItem("observations");
  
    if(this.supplier == null){
      this.supplier = {} as Entity;
      this.supplier.name = "";
      this.supplier.address = "";
      this.supplier.cif = "";
      this.supplier.account = "";
      this.supplier.bank = "";
      this.supplier.regCom = "";
    }
    
    if(this.buyer == null){
      this.buyer = {} as Entity;
      this.buyer.name = "";
      this.buyer.address = "";
      this.buyer.cif = "";
      this.buyer.account = "";
      this.buyer.bank = "";
      this.buyer.regCom = "";
    }

    this.articleNames.push("Activitati conform acord nr.1 din data de 15.11.2018, anexa nr. 12/12.11.2019");
  }

  setArticle(articleName, article){
      article.name = articleName;
  }

  addLine(){
    var line = {} as Line;
    line.qty = 1 + "";
    this.lines.push(line);
  }

  removeLine(article, articles){
    this.lines = this.lines.filter(obj => obj !== article);

    if(this.lines.length == 0){
      this.totalAmount = 0;
    }
  }

  isInvoiceOk(){
    debugger;
    if(this.lines.length == 0){
      alert("Adaugati cel putin o linie!");
      return false;
    }

    return true;
  }

  downloadFile(){

    if(!this.isInvoiceOk()){
      return;
    }

    var details = {} as Details;
    debugger;
    details.buyer = this.buyer;
    details.supplier = this.supplier;
    details.lines = this.lines;
    details.invoice_date = new Date(this.invoice_date['year'], this.invoice_date['month']-1, this.invoice_date['day']);
    details.invoice_number = this.invoice_number;
    details.invoice_series = this.invoice_series;
    details.invoice_total_amount = this.totalAmount;
    details.observations = this.observations;

    var headers = new Headers();

    const headersObject = new HttpHeaders();
    headersObject.append('Content-Type', 'application/x-www-form-urlencoded');
    headersObject.append('Cache-Control', 'no-cache');

    this.http.post(environment.serverUrl, details, {responseType: "blob", headers: headersObject, withCredentials: true}).subscribe(data => {
      //this.blob = new Blob([data], {type: 'application/pdf'});

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "factura.pdf";
      link.click();
    }, (error: {}) => {
      alert("Eroare la generarea farcturii!");
    });

    localStorage.setItem('buyer', JSON.stringify(this.buyer));
    localStorage.setItem('supplier', JSON.stringify(this.supplier));
    localStorage.setItem('invoice_number', this.invoice_number);
    localStorage.setItem('invoice_series', this.invoice_series);
    localStorage.setItem('observations', this.observations);
  }

  updateTotalAmount(){
    this.totalAmount = 0;
    this.lines.forEach(element => {
      this.totalAmount += element.price;
    });
  }

}

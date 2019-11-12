import { Component } from '@angular/core';

export interface Article {
  name: string;
  qty: string;
  price: string;
}

export interface Supplier {
  supplierName: string;
  supplierAddress: string;
  supplierCIF: string;
  supplierAccount: string;
  supplierBank: string;
  supplierRegCom: string;
}

export interface Buyer {
  buyerName: string;
  buyerAddress: string;
  buyerCIF: string;
  buyerAccount: string;
  buyerBank: string;
  buyerRegCom: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'invoice-generator';

  series: string = "MADI";
  number: string;
  date: Date = new Date();

  supplier = {} as Supplier;
  buyer = {} as Buyer;
  articles = [] as Article[];
  articleNames = [] as string[];

  constructor() {
    this.supplier.supplierName = "Iorga Marin Andrei Dumitru PFA";
    this.supplier.supplierAddress = "Str 1933, nr 2, Rosiori de Vede, Teleorman";
    this.supplier.supplierCIF = "40140682";
    this.supplier.supplierAccount = "RO83BRDE445SV28108124450";
    this.supplier.supplierBank = "BRD";
    this.supplier.supplierRegCom = "F34/319/12.11.2018";

    this.buyer.buyerName = "Enterprise Concept SRL";
    this.buyer.buyerAddress = "Strada Siriului, Nr 42-46 etaj 4, Sector 1 Bucuresti";
    this.buyer.buyerCIF = "RO18092333";
    this.buyer.buyerAccount = "RO33BTRLRONCRT0510670501";
    this.buyer.buyerBank = "Banca Transilvaniei Aviatiei";
    this.buyer.buyerRegCom = "J40/18363/2005";

    this.articleNames.push("Activitati conform acord nr.1 din data de 15.11.2018, anexa nr. 12/12.11.2019");
  }

  setArticle(articleName, article){
      article.name = articleName;
  }

  addLine(){
    var article = {} as Article;
    this.articles.push(article);
  }

  removeLine(article, articles){
    this.articles = this.articles.filter(obj => obj !== article);
  }

}

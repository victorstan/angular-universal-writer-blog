import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Formats {
  small: Small;
  medium: Medium;
  thumbnail: Thumbnail;
}

export interface Imagine {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Poezie {
  id: number;
  Continut: string;
  Titlu: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  Imagine: Imagine[];
  comments: any[];
}

// export class Poezie {
//   Id: number;
//   Titlu: string;
//   Continut: string;
//   Data: string;
//   Imagine: string;
// }

export class Litera {
  Left: number;
  Top: number;
  Delay: number;
  Valoare: string;
  FontSize: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ListaPoezii: Poezie[] = [];
  // tslint:disable-next-line: max-line-length
  Alfabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  ListaLitere: Litera[] = [];
  UrlApi = 'https://vikko-api.herokuapp.com/'
  constructor(
    private http: HttpClient) {
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.Paralax);
    
    this.DescarcaPoezii().then(() => {
      // const interval = setInterval(() => {
      //   const body = document.querySelector('#body') as HTMLElement;
      //   if (body !== null && body !== undefined) {
      //     clearInterval(interval);
      //   }
      // }, 200);
      this.GenereazaArrayLitere();
    });
  }

  CardMouseMove(e, index): void {
    const card = document.querySelector('#card-' + index) as HTMLElement;
    const inner = document.querySelector('#card-inner-' + index) as HTMLElement;
    const xVal = e.layerX;
    const yVal = e.layerY;
    const yRotation = -3 * ((xVal - card.clientWidth / 2) / card.clientWidth);
    const xRotation = 3 * ((yVal - card.clientHeight / 2) / card.clientHeight);
    const str = 'perspective(500px) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
    inner.style.transform = str;
    inner.style.transition = '';
  }

  DescarcaPoezii(): Promise<boolean> {
    return new Promise((response) => {
      const url = this.UrlApi + '/poezies';
      this.http.get(url).subscribe((res: Poezie[]) => {
        console.log(res);
        this.ListaPoezii = res;
        response(true);
      }, error => {
        console.log(error);
      });
    });
  }

  DescarcaToken(): Promise<boolean> {
    return new Promise((response) => {
      const url = this.UrlApi + '/poezies';
      this.http.get(url).subscribe((res: Poezie[]) => {
        console.log(res);
        this.ListaPoezii = res;
        response(true);
      }, error => {
        console.log(error);
      });
    });
  }

  CardMouseLeave(index): void {
    const inner = document.querySelector('#card-inner-' + index) as HTMLElement;
    inner.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
  }

  GenereazaArrayLitere() {
    this.Alfabet.forEach(litera => {
      let lit = new Litera();
      lit.Valoare = litera.toUpperCase();
      lit.Delay = this.Random(-5, 5);
      lit.Top = this.Random(5, 99);
      lit.Left = this.Random(5, 99);
      lit.Delay = this.Random(-5, 5);
      lit.FontSize = this.Random(24, 36);
      this.ListaLitere.push(lit);
    });
  }

  Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Paralax(ev) {
    console.log(ev);
    console.log(window.pageYOffset);
    console.log(document.body.scrollHeight);
    const header = document.querySelector('.header') as HTMLElement;
    // const footer = document.querySelector('.footer') as HTMLElement;
    header.style.transform = 'translateY(' + window.pageYOffset / 3 + 'px)';
    // if (window.pageYOffset > document.body.scrollHeight - (4 * 300)) {
    //   footer.style.transform = 'translateY(' + (document.body.scrollHeight - (3 * 300) - window.pageYOffset) + 'px)';
    //   console.log((document.body.scrollHeight - (3 * 300) - window.pageYOffset));
      
    // }
  }

}

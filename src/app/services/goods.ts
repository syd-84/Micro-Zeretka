import { Injectable, signal } from '@angular/core';

export type GoodsType = {
  id: string,
  name: string,
  description: string,
  imgSrc: string,
  price: number,
  category: string,
}

@Injectable({
  providedIn: 'root',
})

export class Goods {

  goods: GoodsType[] = [
    {
      id: crypto.randomUUID(),
      name: "Пральна машина вузька Electrolux EWS6406BU",
      description: "Програма протиаллергічного очищення парою видаляє 99.99 відсотків бактерій і вірусів Одяг виглядає як новий удвічі довше Завдяки цьому одяг зберігає свій вигляд довше, а вода і електроенергія витрачаються економніше.",
      imgSrc: "https://content.rozetka.com.ua/goods/images/big/627101185.webp",
      price: 14864,
      category: "technics"
    },
    {
      id: crypto.randomUUID(),
      name: "Графічний планшет Wacom Intuos S Black",
      description: "Графічний планшет Wacom Intuos, обладнаний легким надточним цифровим пером і завантажуваним програмним забезпеченням*, яке відповідає вашому стилю роботи. Виріб створений для того, щоб втілити ваші найсміливіші ідеї в життя.",
      imgSrc: "https://content2.rozetka.com.ua/goods/images/big/12233025.jpg",
      price: 3359,
      category: "technics"
    },
    {
      id: crypto.randomUUID(),
      name: "Однокамерний холодильник INTERLUX ILR-0095S",
      description: "Завдяки зручному однокамерному дизайну, він займає мінімум місця, але при цьому має достатній об'єм для зберігання продуктів — 83 л у холодильній камері та 10 л у морозильній. ",
      imgSrc: "https://content1.rozetka.com.ua/goods/images/big/374735795.jpg",
      price: 6199,
      category: "technics"
    },
    {
      id: crypto.randomUUID(),
      name: "Чоловічі крокси Crocs Echo Clog",
      description: "Чоловічі крокси Crocs Echo Clog в сучасному спортивному дизайні з масивною підошвою. Легкі та зручні, вони забезпечують комфорт при щоденному носінні.",
      imgSrc: "https://content1.rozetka.com.ua/goods/images/big/665027641.jpg",
      price: 3319,
      category: "clothes"
    },
    {
      id: crypto.randomUUID(),
      name: "Дощовик-пончо з капюшоном у чохлі oversize оливковий ",
      description: "Дощовик-пончо з капюшоном у чохлі – ідеальний аксесуар для подорожей. Легкий та компактний, він легко поміщається у рюкзак або сумку, забезпечуючи надійний захист від дощу під час подорожі.",
      imgSrc: "https://content.rozetka.com.ua/goods/images/big/618526082.png",
      price: 190,
      category: "clothes"
    },
    {
      id: crypto.randomUUID(),
      name: "Кавовий напій 3в1 MacCoffee ",
      description: "Розчинна MacCoffee Original 3 в 1 - це суміш добірних кавових зерен, немолочних вершків і цукру.",
      imgSrc: "https://content.rozetka.com.ua/goods/images/big/299026746.jpg",
      price: 378,
      category: "food"
    },
    {
      id: crypto.randomUUID(),
      name: "Цукерки в коробці Волинські солодощі Чорнослив з ядром волоського горіха",
      description: "Глазур кондитерська (вміст: цукор-пісок білий, жир кондитерський, какао-порошок, лецитин, ароматизатор шоколад, ванілін), чорнослив вялений, ядро волоського горіха обсмажене, цукор-пісок білий, вода.",
      imgSrc: "https://content1.rozetka.com.ua/goods/images/big/385685153.png",
      price: 179,
      category: "food"
    },
    {
      id: crypto.randomUUID(),
      name: "Корм для хвилястих папужок Versele-Laga Prestige Budgies",
      description: "Versele-Laga Prestige Вudgies ВЕРСЕЛЕ-ЛАГА ПРЕСТИЖ ПАПУЖКА — це традиційне повноцінне харчування для хвилястих та інших маленьких папужок.",
      imgSrc: "https://content1.rozetka.com.ua/goods/images/big/10694243.jpg",
      price: 225,
      category: "pet supplies"
    },
    {
      id: crypto.randomUUID(),
      name: "Переноска MP Bergamo Gipsy XS",
      description: "Зручна пластикова переноска MP Bergamo Gipsy XS smal для транспортування котів і невеликих собак. Дає змогу легко та з мінімальним стресом перевозити улюбленця, водночас убезпечивши його від можливих травм чи втечі.",
      imgSrc: "https://content1.rozetka.com.ua/goods/images/big/442561151.jpg",
      price: 387,
      category: "pet supplies"
    },
    {
      id: crypto.randomUUID(),
      name: "Упаковка капсул для прання Persil Power Caps Universal Deep Clean",
      description: "Гелеві капсули для прання Persil - трикамерні капсули з дозованою кількістю концентрованого засобу. Капсули Universal використовують для прання білих та світлих речей. ",
      imgSrc: "https://content1.rozetka.com.ua/goods/images/big/567968795.jpg",
      price: 938,
      category: "household chemicals"
    },
    {
      id: crypto.randomUUID(),
      name: "Паперові рушники Ruta Professiona",
      description: "Виготовлені з сировини з переважанням хвойної целюлози, що надає паперовим рушникам усі необхідні якості: добре вбирають рідину, міцні, не прилипає до харчових продуктів.",
      imgSrc: "https://content.rozetka.com.ua/goods/images/big/279976798.jpg",
      price: 159,
      category: "household chemicals"
    },
  ]

  categoriesGoods = [
    { category: 'technics', name: 'Техніка та інструменти' },
    { category: 'clothes', name: 'Одяг та взуття' },
    { category: 'food', name: 'Їжа та напої' },
    { category: 'pet supplies', name: 'Зоотовари' },
    { category: 'household chemicals', name: 'Побутова хімія' }
  ]

  currentGoods = signal(this.goods);

  delGoods(id: string | undefined) {
    this.currentGoods.update(goods => goods.filter(el => el.id !== id))
  }

  // constructor() {
  //   setInterval(() => {
  //     console.log(this.curentGoods())
  //   }, 1000)
  // }
}

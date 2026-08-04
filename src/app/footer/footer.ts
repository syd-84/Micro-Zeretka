import { Component } from '@angular/core';

interface FooterLink {
  title: string;
  url: string;
}

interface SocialLink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  readonly currentYear: number = new Date().getFullYear();

  readonly companyLinks: FooterLink[] = [
    { title: 'Про нас', url: '#about' },
    { title: 'Умови використання сайту', url: '#terms' },
    { title: 'Вакансії', url: '#vacancies' },
    { title: 'Контакти', url: '#contacts' }
  ];

  readonly helpLinks: FooterLink[] = [
    { title: 'Доставка та оплата', url: '#delivery' },
    { title: 'Гарантія та повернення', url: '#warranty' },
    { title: 'Відстежити замовлення', url: '#track' },
    { title: 'Питання та відповіді (FAQ)', url: '#faq' }
  ];

  readonly serviceLinks: FooterLink[] = [
    { title: 'Бонусна програма', url: '#bonus' },
    { title: 'Zeretka Premium', url: '#premium' },
    { title: 'Подарункові карти', url: '#gift-cards' },
    { title: 'Корпоративним клієнтам', url: '#corporate' }
  ];

  readonly socialLinks: SocialLink[] = [
    { name: 'Facebook', url: '#facebook' },
    { name: 'Instagram', url: '#instagram' },
    { name: 'Telegram', url: '#telegram' },
    { name: 'Viber', url: '#viber' }
  ];
}
# zMaterial


A lib developed based on [Angular Material]("https://material.angular.io/") using the [Angular CLI]("https://angular.io/") framework. Containing Customized Components and Templates.

<p align="center">
<a href="https://badge.fury.io/for/js/zmaterial"><img src="https://badge.fury.io/js/zmaterial.svg" alt="npm version" ></a>
<a href="https://www.npmjs.com/package/zmaterial"><img src="https://img.shields.io/badge/Downloads-0%2FWeekly-green" alt="npm downloads" ></a>
<a href="https://www.npmjs.com/package/zmaterial"><img alt="" src="https://img.shields.io/github/license/ivanantunes/zmaterial-app"></a>
<a href="https://www.npmjs.com/package/zmaterial"><img alt="" src="https://img.shields.io/github/stars/ivanantunes/zmaterial-app"></a>
<a href="https://www.npmjs.com/package/zmaterial"><img alt="" src="https://img.shields.io/github/forks/ivanantunes/zmaterial-app"></a>
<a href="https://www.npmjs.com/package/zmaterial"><img alt="" src="https://img.shields.io/github/issues/ivanantunes/zmaterial-app"></a>
</p>
<p align="center">
<a href="https://nodei.co/npm/zmaterial/"><img src="https://nodei.co/npm/zmaterial.png?downloads=true&downloadRank=true&stars=true"></a>
</p>

---

## Summary

1. [Develop Mode](#develop-mode)
2. [Install Library in Projects](#install-library-in-projects)
3. [Components](#components)

---

## Develop Mode
This part shows the development of the library
### Clone Project

- SSH
```
git clone git@github.com:ivanantunes/zmaterial-app.git
```
- HTTP
```
git clone https://github.com/ivanantunes/zmaterial-app.git
```
### Run Development Mode

To perform the tests we need to build the library and start the app later.

- Library Build
````
npm run watch-mod
````
- Start App
````
npm start
````
---

## Install Library in Projects

- Command to Install the Library in **Angular** Projects
````
npm install --save zmaterial
````

---

## Components

Below is the list of components that are available to use

1. [zMenu](#zMenu)
2. [zForms](#zForms)
3. [zReport](#zReport)

### zMenu

```html
<z-menu-material 
[titleProject]="" 
[logoProject]="" 
[showLogout]=""
[profile]=""
[menuItems]=""
(logout)="">
  <router-outlet></router-outlet>
</z-menu-material>
```

```typescript
imports: [
        // zMaterial
        ZModule.forRoot({
          languageData: translate
        }),
        ZMenuModule,
    ],
```
![zMenu Picture](/images/zMenu.png)

### zForms

````html
<z-form-material
[title]=""
[formProvider]=""
[showClearButton]=""
[submitText]=""
(submitValue)=""
></z-form-material>
````

````typescript
import { ZFormInputBase, ZFormInputText, ZFormProvider } from 'zmaterial';

export class MyComponent extends ZFormProvider {

  constructor() { super(); }

  getInputs(): Observable<ZFormInputBase<any>[]> {
    return of([
      new ZFormInputText({
        label: 'Login',
        key: 'login',
        type: 'text',
        required: true,
        layout: {
          cols: 100
        }
      }),
      new ZFormInputText({
        label: 'Password',
        key: 'password',
        type: 'password',
        required: true,
        layout: {
          cols: 100
        }
      }),
    ]);
  }
}
````

````typescript
    imports: [
        // zMaterial
        ZModule.forRoot({
          languageData: translate
        }),
        ZFormModule,
    ],

````

![zForm Picture](/images/zForm.png)

### zReport

```html
<z-report-material [reportProvider]=""></z-report-material>
```

```typescript
export class MyComponent extends ZReportProvider<PeriodicElement> implements OnInit {

  public ELEMENT_DATA: PeriodicElement[] = [
    {position: '1', name: 'Hydrogen', weight: '1.0079', symbol: 'H'},
    {position: '2', name: 'Helium', weight: '4.0026', symbol: 'He'},
    {position: '3', name: 'Lithium', weight: '6.941', symbol: 'Li'},
    {position: '4', name: 'Beryllium', weight: '9.0122', symbol: 'Be'},
    {position: '5', name: 'Boron', weight: '10.811', symbol: 'B'},
    {position: '6', name: 'Carbon', weight: '12.0107', symbol: 'C'},
    {position: '7', name: 'Nitrogen', weight: '14.0067', symbol: 'N'},
    {position: '8', name: 'Oxygen', weight: '15.9994', symbol: 'O'},
    {position: '9', name: 'Fluorine', weight: '18.9984', symbol: 'F'},
    {position: '10', name: 'Neon', weight: '20.1797', symbol: 'Ne'}
  ];

  constructor() { super(); }

  ngOnInit(): void {
  }

  public getReportDefinition(): ZReportDefinition<any>[] {
    return [
      {
        key: 'position',
        header: 'Position',
        order: 1,
        cell: (element: PeriodicElement) => {
          return element.position ;
        }
      },
      {
        key: 'name',
        header: 'Name',
        order: 2,
        cell: (element: PeriodicElement) => {
          return element.name;
        }
      },
      {
        key: 'weight',
        header: 'Weight',
        order: 3,
        cell: (element: PeriodicElement) => {
          return element.weight;
        }
      },
      {
        key: 'symbol',
        header: 'Symbol',
        order: 4,
        cell: (element: PeriodicElement) => {
          return element.symbol;
        }
      }
    ];
  }

  public getReportConfig(): ZReportConfig {
    return {
      title: 'zMaterial',
      image: {
        image: 'assets/no-profile.jpeg',
        type: 'JPEG'
      },
      reportTitle: 'Report Example',
      filters: [
        {title: 'My Filter', value: 'Value Filter'},
      ],
      actions: {
        pdf: true,
        xlsx: true,
        csv: true
      }
    };
  }

  public getReportData(): Observable<any[]> {
    return of(this.ELEMENT_DATA);
  }

}
```

```typescript
imports: [
        // zMaterial
        ZModule.forRoot({
          languageData: translate
        }),
        ZReportModule
    ],
```

![zReport Picture](/images/zReport.png)

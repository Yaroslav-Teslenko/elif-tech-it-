# crm_vladilen_v2

## Project setup

!! vue - 2x
Проект заточен на описание фронта, бекенд минимален.
Н-р, пагинацию в проде делают на сервере, то есть сервер отдает часть данных по запросу, а не все данные целиком

### npm пакеты

See [Configuration Reference](https://cli.vuejs.org/config/).

npm install vuelidate --save

npm install vuejs-paginate --save
https://www.npmjs.com/package/vuejs-paginate

npm i vue-chartjs@3.4.2 chart.js@2.8.0
npm i vue-chartjs@3.4.2
npm i chart.js@2.8.0

https://vue-chartjs.org/

## Project deploy

### hosting

https://console.firebase.google.com/u/0/project/vue-crm-81a51/hosting/sites

<Get Started>
1.Install Firebase CLI

    npm install -g firebase-tools

2.Initialize your project
Open a terminal window and navigate to or create a root directory for your web app

2.1 Sign in to Google

      firebase login

////

Если в первый раз

i Firebase optionally collects CLI usage and error reporting information to help improve our products. Data is collected in accordance with Google's privacy policy (https://policies.google.com/privacy) and is not used to identify you.

? Allow Firebase to collect CLI usage and error reporting information? Yes
i To change your data collection preference at any time, run `firebase logout` and log in again.

Visit this URL on this device to log in:
Waiting for authentication...

Приложение "Firebase CLI" запрашивает разрешение на доступ к вашему аккаунту Google

✔ Success! Logged in as lordwolf81@gmail.com

///

2.2 Initiate your project

Run this command from your app’s root directory:

    firebase init

- Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
- Use an existing project

- Select a default Firebase project for this directory:

      vue-crm-81a51 (vue-crm)

- What do you want to use as your public directory?

      public

- Configure as a single-page app (rewrite all urls to /index.html)? (y/N)

      yes

- Set up automatic builds and deploys with GitHub? ( no

- File public/index.html already exists. Overwrite? (y/N) no

✔ Skipping write of public/index.html
✔ Writing configuration info to firebase.json...
✔ Writing project information to .firebaserc...

✔ Firebase initialization complete!

3.Deploy to Firebase Hosting

When you’re ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:

    npm run build

В firebase.json

"public": "public", меняем на
"public": "dist",

    firebase deploy

After deploying, view your app at vue-crm-81a51.web.app

Need help? Check out the Hosting docs

### hosting error

index.js:25 Mixed Content:
The page at 'https://vue-crm-81a51.web.app/' was loaded over HTTPS, but requested an insecure resource 'http://data.fixer.io/api/latest?access_key=dfd69801fcdbe2cb1ed2927ce8cd2c52&symbols=USD,EUR,UAH'. This request has been blocked; the content must be served over HTTPS.

firebase работает с https, а fixer.io нам дает работать ъесплатно только с http.

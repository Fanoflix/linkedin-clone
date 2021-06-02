# LinkedIn-clone

## Project setup
> Run the following command in both .../Frontend and .../Backend directories

```
npm install
```

### Compiles and hot-reloads for Frontend demo and development

> Run the following command in .../Frontend directory
```
npm run serve
```

### Compiles and hot-reloads for Backend demo and development

> Run the following command in .../Backend directory
```
npm start
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Vue Configuration Reference](https://cli.vuejs.org/config/).

## Tasks checklist

Task | Status
---- | ----
Optimized, efficient and error handled REST APIs (with correct error codes). | :heavy_check_mark:
Authenticate through Javascript Web Token and store the user authentication information in vue global store (Vuex). | :heavy_check_mark:
Add and improve existing Search Engine Optimized DOM tags and structure. | :x:
Secure and persist user sessions by storing user authentication information in 'HttpOnly' cookie to prevent Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) attacks. | :x:
Reduce and limit the number of API calls by using socket.io for quick update of user bio and skills in Profile view. | :x:
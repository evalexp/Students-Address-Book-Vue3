# Student-Address-Book-Vue3

## Project setup
```
npm install
node .\node_modules\electron\install.js
```

### Compiles and hot-reloads for development
```
npm run serve
npm run start
```

### Compiles and minifies for production
```
npm run build
```

**Remmber to edit the main.js to Production environment**

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### About

This project inherited from my school work "Studnet-Address-Book", but I use vue3 to recode it and use component to develop.

Alsoly, I fix some security problem, now, node module could not run in the render process, but some module api could work, all the api must be exposed safely since it could use node module.

Vuex and Vue Router are not needed, you could remove folder /src/router & /src/store and remove dependencies, but remember to edit /src/main.ts


[webpack配置](https://github.com/qinshenxue/vue2-vue-router2-webpack2/tree/master)

```bash
# 切换淘宝源
npm config set registry https://registry.npm.taobao.org
npm set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass

# 初始化
npm i

# 构建
npm run dev
npm run build
```




```
|-- vue-stu
    |-- .babelrc
    |-- .editorconfig
    |-- .gitignore
    |-- index.tpl.html
    |-- LICENSE
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- README.md
    |-- yarn.lock
    |-- build **<- webpack 配置**
    |-- dist **<- 输出目录**
    |-- src
        |-- App.vue
        |-- main.js **<-vue配置**
        |-- router.js **<-vue-router config**
        |-- store.js **<- vuex config**
        |-- css
        |   |-- global.scss
        |-- images
        |   |-- avatar.jpg
        |-- views
            |-- Account.vue
            |-- Apply.vue
            |-- Cources.vue
            |-- Feedback.vue
            |-- Library.vue
            |-- Login.vue
            |-- Register.vue
            |-- Score.vue
```
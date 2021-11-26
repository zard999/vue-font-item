# font-shopping

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### options

1.  向服务器传递数据时的参数
    axios({
    method: 'get',
    url: '',
    params: { // 传递数据时这个配置项中的属性名叫 params

        }

    })

2.  路由传参
    - 普通的传参 无论是 params 格式或 query 格式 路由传参之后 数据都是存储在 this.$route 里面
    - 在对应组件当中，要使用 this.$route.(params/query)
    - props:true + params 格式 搭配使用 省了计算属性
      本质是让传递的数据和 this.$route 的耦合度降低，将传递的数据当成组件的属性来用在对应的组件中使用 props:['id', 'title', 'age']
    - props:function(){} + query 本质也是
3.  项目
    由于现在是项目，有很多的模块(业务功能)
    有些配置项或是设置需要进行分门别类
    比如在 components 里面放一边组件或公共组件
    路由组件一般是放在 views 或 pages 文件夹中
    添加路由或是 Vuex
4.  解决编程导航报错的问题
    在路由里面做统一处理 重写 push/replace 方法

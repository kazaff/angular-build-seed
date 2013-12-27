# angular-build-seed


## 基于AngularJS的开发框架模板

该项目用于解决试图以[AngularJS](http://angularjs.cn)为基础进行前端项目开发时要面对的一些问题：

* 项目基于模块的文件结构
* 多人合作开发的约定
* 常用的基于web的管理系统后台功能，例如：权限


## 背景

这个需求源自于公司的一个项目的前端重构，我被任命来完成这次重构。
我不能说旧的代码如何如何的糟糕，我只能说确实有必要进行一次彻底的重构，这并不是盲目的跟风，更不是为了重构而重构。

由于主要目的是为了完成现有项目的前端，所以部分设计是为了迁就现有功能模块的一种妥协，而之所以把该项目发布到github，是希望能给他人一个参考，也希望能得到大家的肯定，更希望能得到大家的宝贵意见~

## 依赖

* [AngularJS](http://angularjs.org) v1.2.0-rc2
* [RequireJS](http://www.requirejs.org) v2.1.8
* [Bootstrap](http://www.bootcss.com) v2.3.2


## 文件目录结构

~~~
app/						
	common/						-->通用模块文件夹
		controllers/			-->控制器文件夹
			menu.js				-->主菜单控制器
		directives/				-->指令文件夹
			action.js			-->用于应用中定义链接的指令
		services/				-->服务文件夹
			acl.js 				-->授权服务代码
			action.js			-->用于提供给action指令使用的认证服务
			auth.js 			-->认证服务代码
		init.js 				-->模块的初始化文件
	css/						-->项目的样式文件夹
	img/ 						-->项目的图片文件夹
	lib/ 						-->项目使用的第三方js库文件夹，包含requireJS，angularJS等
	modules/					-->业务模块文件夹，里面按照每个模块一个独立的文件夹来存放
		publish/ 				
			controllers/		-->模块下的控制器文件夹
				dashboard.js 	-->控制器代码文件
			templetes/			-->对应的视图文件夹
				dashboard.html 	-->视图文件
			init.js 			-->模块的初始化文件
			route.js 			-->模块的路由配置文件
		...
	utils/						-->工具集合文件夹
		loader.js 				-->用于加载模块的函数
		...
	app.js 						-->应用主模块文件
	bootstrap.js 				-->requireJS的配置及应用构建引导文件
	config.js 					-->应用的配置文件
	index.html 					-->应用的入口文件
mock/ 							-->模拟后端服务
~~~

![关系图](http://pic.yupoo.com/kazaff/D9SAL5yH/medish.jpg)

## 约定

每个模块(包含commom和modules下的每个文件夹)文件夹下，都应该包含`init.js`和`route.js`2个文件，前者是用来构造该模块，后者用来提供该模块的路由数据。

## 发布

执行在根目录下执行`grunt`，用于发布前的优化处理~
这里要说明的是，需要把系统所有依赖的文件集中的写在app/bootstrap.js的`require`方法的依赖参数数组中，方便grunt-contrib-requirejs的合并~

希望大家支持~
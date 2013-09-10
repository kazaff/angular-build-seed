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
* [RequireJS](http://www.requirejs.org) 2.1.8
* [Bootstrap](http://www.bootcss.com)vv2.3.2


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
		user/					-->用户模块
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

## 约定

每个模块(包含commom和modules下的每个文件夹)文件夹下，都应该包含`init.js`和`route.js`2个文件，前者是用来构造该模块，后者用来提供该模块的路由数据。

除此之外，还需要注意的是，由于项目采用的是`gbk`编码，但是实际测试中发现一个问题：ng提供的ngRoute服务异步加载的模板文件始终以`utf-8`来解析，奇怪的是入口文件是`gbk`编码的，这一点可以通过浏览器中的编码选项来验证，问题的细节记录在[这里](http://www.codingcool.com/2013/09/05/angularjs和该死的gbk乱码/)。
这个问题目前采用的解决方案是：

> 保证每个模块的视图文件的编码为`utf-8`！


## 承诺

由于本人只是刚进入前端开发，尤其是缺乏大项目的开发经验，所以可能存在很多不规范的地方，我会随着项目的发展，一点一点完善，争取做到标准化，包括项目部署，测试等环节~
目前打算研究一下yeoman，也可能使用百度的F.I.S来作为构建工具，测试则使用ng提供的方法！

希望大家支持~
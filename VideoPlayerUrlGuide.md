# 视频地址
视频URL并不是视频在线播放页面的地址，而是视频文件的地址

## 简易获取方法
1、按F12打开审查元素

2、Ctrl+F，搜索video字样，一般能搜索到一个 类似 ``<video class`` 开头的元素

3、复制 ``src = `` 等号后面的地址，粘贴到地址栏打开，如果是正在播放的纯视频页面（Chrome），则该地址有效
（包括B站等部分视频网站的解析链接有使用时间限制，过一段时间将无法播放，需要再次进行解析获得新的地址）


## 常用解析工具

### TamperMonkey 插件


* [B站解析插件 By XinLian](https://github.com/XinLian132243/BCMod/raw/master/VideoTool.user.js) ：一键获取B站外链

专门定制的一键解析视频外链的插件，在B站视频播放页 点工具栏 TamperMonkey 的图标下拉、或者右键>TamperMonkey>视频外链提取> 复制外链

### 在线解析网

（部分网站没法直接通过审查元素获取，可以搜索在线解析网站）

* [B站下载工具](https://zhouql.vip/bilibili/) ：干净、无广告的 B 站视频下载网站

点击**预览视频** 并且复制弹出的网址



* [贝贝BiliBili](https://xbeibeix.com/api/bilibili/) - B站视频下载  ：

 需输入验证码，复制 **MP4地址** 

* [哔哩哔哩视频解析下载](https://bilibili.iiilab.com ) 除了可以下载B站视频，还支持微博、秒拍、YouTube、微视、全民K歌等多个视频平台 ：

右键点击**下载视频** 并且复制链接地址 



> 网站引用自 https://zhuanlan.zhihu.com/p/654946879
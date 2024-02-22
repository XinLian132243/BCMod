// ==UserScript==
// @name         视频外链提取
// @namespace    https://www.bondageprojects.com/
// @version      0.1.0
// @description  视频外链提取工具
// @author       xl
// @include      /^https:\/\/(www\.)?bilibili\.com\/video\/BV.+\/
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // =======================================================================================

    var id=GM_registerMenuCommand ("复制外链", function(){
      
        var url = window.location.href;

        RequstVideoCode(url, (res, name, code)=>{

            if(res === true)
            {
                RequestBilibiliVideoUrl(code,(link)=>{
                    copyToClipboard(link);
                    alert("复制外链成功");
                } , OnFail);
            }
            else
            {
                OnFail();
            }

        });

     }, "");


    id=GM_registerMenuCommand ("复制视频名 + 外链", function(){
      
        var url = window.location.href;

        RequstVideoCode(url, (res, name, code)=>{

            if(res === true)
            {
                RequestBilibiliVideoUrl(code,(link)=>{
                    copyToClipboard(name + '\n' + link);
                    alert("视频名 + 外链成功");
                } , OnFail);
            }
            else
            {
                OnFail();
            }

        });


     }, "");

 
     id = GM_registerMenuCommand("复制所有分P视频名 + 外链", function() {
        var url = window.location.href;
    
        RequstVideoAllCode(url, (res, names, codes) => {
            if (res === true) {
                // 存储所有视频链接的数组
                const allLinks = [];
                let processedCount = 0;
    
                // 成功回调函数
                const handleSuccess = function(link, name, index) {
                    // 将解析的视频链接添加到数组中
                    allLinks[index] = {
                        name: name,
                        link: link
                    };
    
                    // 检查是否所有视频都已处理
                    processedCount++;
                    if (processedCount === codes.length) {
                        // 所有视频都已处理完毕，执行成功回调
                        const formattedLinks = allLinks.map(entry => entry.name + '\n' + entry.link).join('\n');
                        copyToClipboard(formattedLinks);
                        alert("复制所有分P视频名 + 外链成功");
                    }
                };
    
                // 失败回调函数
                const handleFail = function() {
                    // 任何一个视频解析失败都视为整体失败
                    OnFail();
                };
    
                // 遍历视频代码列表，并解析每个视频的链接
                codes.forEach((avci, index) => {
                    RequestBilibiliVideoUrl(avci, link => {
                        handleSuccess(link, names[index], index);
                    }, handleFail);
                });
            } else {
                OnFail();
            }
        });
    }, "");


     function OnFail()
     {
        alert("解析失败");
     }


     function RequstVideoCode(pageUrl, onRes)
     {        
         // 成功回调，同时传出得到的name 和 code
         var onSuccess = function(name,code)
         {
             onRes(true,name, code);
         }
         var onFail = function()
         {
             onRes(false);
         }

         var biliCmd = /BV([a-zA-Z0-9]+)/.exec(pageUrl)
         //B站地址
         if (biliCmd?.length > 0 )
         {          
             RequestBilibiliVideoInfo(biliCmd[1], onSuccess, onFail, 0);
             return;
         }
         biliCmd = /BV([a-zA-Z0-9]+)\?p=(\d+)/.exec(pageUrl)
         if (biliCmd?.length > 0 )
         {          
             RequestBilibiliVideoInfo(biliCmd[1], onSuccess, onFail, parseInt(biliCmd[2]));
             return;
         }
     }
            

     function RequstVideoAllCode(pageUrl, onRes)
     {        
         // 成功回调，同时传出得到的name 和 code
         var onSuccess = function(name,code)
         {
             onRes(true,name, code);
         }
         var onFail = function()
         {
             onRes(false);
         }

         var biliCmd = /BV([a-zA-Z0-9]+)/.exec(pageUrl)
         //B站地址
         if (biliCmd?.length > 0 )
         {          
             RequestAllBilibiliVideoInfo(biliCmd[1], onSuccess, onFail);
             return;
         }
     }
            


     function RequestBilibiliVideoInfo(bvid, onSuccess, onFail, pindex = 0)
     {
          var url = `https://api.bilibili.com/x/web-interface/view?bvid=BV${bvid}`;
          fetch(url).then(response =>response.json()).then(data =>{
  
              if (data && data.code == 0 && data.data != undefined) {
                  // 视频分P的情况
                  if(data.data.pages.length > 1)
                  {
                      onSuccess(data.data.title + " " + data.data.pages[pindex].part, `avid=${data.data.aid}&cid=${data.data.pages[pindex].cid}`);
                  }else{                    
                      onSuccess(data.data.title, `avid=${data.data.aid}&cid=${data.data.pages[0].cid}`);
                  }
  
              } else {
                  console.error('请求返回错误:', data);
                  onFail();
              }
          }).
          catch(error =>{
              console.error('POST请求失败', error);
              onFail();
          });
     }
  
     function RequestAllBilibiliVideoInfo(bvid, onSuccess, onFail) {
        var url = `https://api.bilibili.com/x/web-interface/view?bvid=BV${bvid}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.code === 0 && data.data !== undefined) {
                    // 存储视频标题和视频代码的数组
                    const titles = [];
                    const codes = [];
    
                    // 遍历视频页面列表
                    data.data.pages.forEach(page => {
                        const title = data.data.title + " " + page.part;
                        const code = `avid=${data.data.aid}&cid=${page.cid}`;
                        titles.push(title);
                        codes.push(code);
                    });
    
                    // 调用成功回调函数，并传入两个数组
                    onSuccess(titles, codes);
                } else {
                    console.error('请求返回错误:', data);
                    onFail();
                }
            })
            .catch(error => {
                console.error('POST请求失败', error);
                onFail();
            });
    }
  

     function RequestBilibiliVideoUrl(avci, onSuccess, onFail)
     {
          var url = `https://api.bilibili.com/x/player/playurl?${avci}&qn=80&type=mp4&platform=html5&high_quality=1`;
          fetch(url).then(response =>response.json()).then(data =>{
    
              if (data && data.code == 0 && data.data != undefined) {
                  onSuccess(data.data.durl[0].url);
              } else {
                  console.error('请求返回错误:', data);
                  onFail();
              }
          }).
          catch(error =>{
              console.error('POST请求失败', error);
              onFail();
          });
     }
  
    function copyToClipboard(text) {
        try {
            // 尝试复制文本到剪贴板
            navigator.clipboard.writeText(text);
        } catch (error) {
            console.error('复制操作出错:', error);
        }
    }

})();


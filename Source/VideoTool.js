// ==UserScript==
// @name         视频外链提取
// @namespace    https://www.bondageprojects.com/
// @version      0.1.0
// @description  视频外链提取工具
// @author       xl
// @include      /^https:\/\/(www\.)?bilibili\.com\/video\/BV.+\/
// @grant    GM_registerMenuCommand
// @grant    GM_unregisterMenuCommand
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
                } , OnFail);
            }
            else
            {
                OnFail();
            }

        });

     }, "");


    var id=GM_registerMenuCommand ("复制视频名 + 外链", function(){
      
        var url = window.location.href;

        RequstVideoCode(url, (res, name, code)=>{

            if(res === true)
            {
                RequestBilibiliVideoUrl(code,(link)=>{
                    copyToClipboard(name + '\n' + link);
                } , OnFail);
            }
            else
            {
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
            
     function HandleUrlFromVideoCode(code)
     {
         if(window.videoPlayer.urlCache[code] != null)
         {
             return;
         }

          // 成功回调，传出得到url
          var onSuccess = function(url)
          {
              window.videoPlayer.urlCache[code] = url;
          }
          var onFail = function()
          {
              
          }

          //B站URL
         var biliCmd = /avid=\d+&cid=\d+/.exec(code)
         if (biliCmd?.length > 0 )
         {          
             RequestBilibiliVideoUrl(biliCmd[0], onSuccess, onFail);
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


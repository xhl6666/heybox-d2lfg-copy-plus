// ==UserScript==
// @name         HeyBox D2LFG Copy+
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto add prefix string in HeyBox Destiny LFG tool.
// @author       You
// @match        https://api.xiaoheihe.cn/game/h5_activity/common_team?appid=1085660
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xiaoheihe.cn
// @require      https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.js
// @resource     swalStyle https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.css
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    let util = {
        getValue(name) {
            return GM_getValue(name);
        },

        setValue(name, value) {
            GM_setValue(name, value);
        },

        addStyle(id, tag, css) {
            tag = tag || 'style';
            let doc = document, styleDom = doc.getElementById(id);
            if (styleDom) return;
            let style = doc.createElement(tag);
            style.rel = 'stylesheet';
            style.id = id;
            tag === 'style' ? style.innerHTML = css : style.href = css;
            document.head.appendChild(style);
        },
    };

    GM_registerMenuCommand('⚙️ 设置', () => {
        let html = `<div style="font-size: 1em;">
                      <label class="starpassword-setting-label">游戏语言
                      <select id="S-starpassword-show-method" class="starpassword-select">
                        <option value="0" ${util.getValue('setting_language') == 0 ? 'selected' : ''}>繁體中文</option>
                        <option value="1" ${util.getValue('setting_language') == 1 ? 'selected' : ''}>简体中文</option>
                        <option value="2" ${util.getValue('setting_language') == 2 ? 'selected' : ''}>English</option>
                      </select>
                      </label>
                    </div>`;
        Swal.fire({
            title: 'HeyBox D2LFG Copy+',
            html,
            icon: 'info',
            showCloseButton: true,
            confirmButtonText: '保存',
            footer: '<div style="text-align: center;font-size: 1em;">Powered by <a href="https://github.com/xhl6666">Hitokage</a></div>',
            customClass: {
                container: 'starpassword-container',
                popup: 'starpassword-popup'
            }
        }).then((res) => {
            res.isConfirmed && history.go(0);
        });

        document.getElementById('S-starpassword-show-method').addEventListener('change', (e) => {
            util.setValue('setting_language', e.currentTarget.value);
        });
    });


    function editCopyText() {
        var prefix_str = "/加入 "
        let lang = util.getValue('setting_language') ? util.getValue('setting_language') : 0;
        if ( lang == 0 ) {
            prefix_str = "/加入 ";
        } else if ( lang == 1 ) {
            prefix_str = "/j ";
        } else if ( lang == 2 ) {
            prefix_str = "/join ";
        }
        var items = document.querySelectorAll('.copy-svg-0');
        for (var item of items){
            var bngid = item.dataset.clipboardText;
            if ( bngid.includes(prefix_str) ) continue;
            item.dataset.clipboardText = prefix_str + bngid;
        }
    }

    function listenInsert() {
        let lst = document.querySelector('.list');
        lst.addEventListener("DOMNodeInserted", function(event) {
            editCopyText()
        })
    }

    setTimeout(()=>{
        editCopyText()
        listenInsert()
    },500);
    
})();
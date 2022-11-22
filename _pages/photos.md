---
layout: page
title: Photos I Adore
permalink: /photos/
---
<script src="/assets/images.js"></script>

<style>
    /* dark theme baby */
    body {
        background: rgba(0,0,0,0) !important;
    }
    html {
        background: #000;
    }
    h1, h2, h3 {
        color: #FFF !important;
    }
    a {
        white-space: nowrap !important;
    }
    .wrapper-footer {
        background: #222 !important;
    }

    /* filter */
    #filter {
        background-image: url(/images/grain.png);
        background-size: 400px 400px;
        height: 0%;
        height: calc(100% - 111px);
        margin-top: 111px;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 1;
        filter: contrast(1.5);
        mix-blend-mode: overlay !important;
    }
    @media screen#filter {
    mix-blend-mode: normal !important;
    }
    /* styling photo list */
    .photo-children {
        max-width: 444px;
        margin: auto;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .photo-children>p{
        margin: 0;
        text-align: center;
        color: #aaa;
        font-size: 80%;
        margin-top: -5px;
    }
    .photo-date{
        font-size: 50%;
        opacity: 0.5;
        margin-top: 2px;
    }
</style>

<div id="filter"></div>
<p id="hero-title" style="color: #fff;text-align: center;">I took all of them.<br/>They are <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a> but you knew I wouldn't bother to sue you.</p>
<div id="photo-list"></div>

<script>
    // utility to convert dates
    function timeDifference(previous, current = Date.now()) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        var elapsed = current - previous;
        if (elapsed <= 0) {
            return "not long ago";
        } else if (elapsed < msPerMinute) {
            return Math.round(elapsed/1000) + ' second'+((Math.round(elapsed/1000)>1)?'s':'')+' ago';   
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minute'+((Math.round(elapsed/msPerMinute)>1)?'s':'')+' ago';   
        } else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour) + ' hour'+((Math.round(elapsed/msPerHour)>1)?'s':'')+' ago';   
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' day'+((Math.round(elapsed/msPerDay)>1)?'s':'')+' ago';   
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' month'+((Math.round(elapsed/msPerMonth)>1)?'s':'')+' ago';   
        } else {
            return Math.round(elapsed/msPerYear) + ' year'+((Math.round(elapsed/msPerYear)>1)?'s':'')+' ago';   
        }
    }

    // parse image list
    var loadCount = 0;
    function loadImageList(index) {
        loadCount++;

        // doc scroll position
        var currentPos = document.documentElement.scrollTop;

        // remove step loader
        while (document.getElementsByClassName("lazy-load-toggle").length > 0) {
            document.getElementsByClassName("lazy-load-toggle")[0].remove();
        }

        // load images
        var count = 0;
        do {
            count++;
            if (index) {
                for (let i = 0; i < imageList.length; i++) { 
                    if (imageList[i].index == index) {
                        var item = imageList[i];
                        count = loadLimit;
                        imageList.splice(i, 1);
                        loadCount = 0;
                    }
                }
            } else {
                var item = imageList.shift();
            }

            // build items and append
            if (item.date) {
                var dateHtml = timeDifference(Date.parse(item.date));
            } else {
                var dateHtml = `date unknown`;
            }
            dateHtml = `<p class="photo-date">` + dateHtml + ` <span class="click-to-share" photoId="`+item.index+`" style="cursor: pointer; font-size: 110%;"> ➶ </span></p>`
            if (item.ref) {
                var refHtml = " <a href='"+item.ref+"' target='_blank'>more</a>";
            } else {
                var refHtml = "";
            }
            var child = `
                <div class="photo-children">
                    <img src="`+item.url+`"/>
                    <p class="photo-des">`+item.des+refHtml+`</p>
                    `+dateHtml+`
                </div>
            `;
            document.getElementById("photo-list").insertAdjacentHTML('beforeend', child);
        } while (count < loadLimit && imageList.length > 0);

        // share buttons
        var shares = document.getElementsByClassName("click-to-share");
        Array.prototype.forEach.call(shares, function(element) {
            element.replaceWith(element.clone());
            element.addEventListener("click", function(){
                navigator.clipboard.writeText("https://beriru.wiki/photos/?loadSingle=" + element.getAttribute("photoId"));
                alert("link copied");
            });
        });

        // append bottom links
        if (imageList.length > 0) {
            // append load more
            document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div class="lazy-load-toggle" style="text-align:center; font-size: 130%;"><a class="no-underline" id="lazy-load-more">Load More</a></div>`);
            document.getElementById("lazy-load-more").addEventListener("click", function(){
                loadImageList();
            });

            // append load all after the 3rd try
            if (loadCount >= 3) {
                document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div class="lazy-load-toggle" style="text-align:center;"><a class="no-underline" id="lazy-load-all" style="filter: saturate(0); font-size: 80%; margin-top: 10px;">Load All (`+imageList.length+`)</a></div>`);
                document.getElementById("lazy-load-all").addEventListener("click", function(){
                    loadAll();
                });
            }
            
        } else {
            // fuck you adobe portfolio
            document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div style="text-align:center; font-size: 130%;"><a class="no-underline" style="filter: saturate(0);">The End</a></div>`);
        }

        // repos
        document.documentElement.scrollTop = currentPos;
    }

    

    // load all easter egg
    // loadAll
    function loadAll() {
        loadLimit = 999999999999999;
        loadImageList();
    }
    // type "all"
    window.addEventListener('keypress', (function() {
        var strToType = 'all',
            strTyped = '';
        return function(event) {
            var character = String.fromCharCode(event.which);
            strTyped += character;
            if (strToType.indexOf(strTyped) === -1) strTyped = '';
            else if (strTyped === strToType) {
                strTyped = '';
                loadAll();
            }
        };
    }()));

    // fix noir incompa
    document.getElementById("filter").style.setProperty('mix-blend-mode', 'overlay', 'important');

    // handle url param
    const urlParm = new URLSearchParams(window.location.search);

    // default flag
    var defaultLoad = true

    // load specific
    if (loadIndex = urlParm.get('loadSingle')) {
        if (loadIndex <= imageListLengthOri) {
            loadImageList(loadIndex);
            defaultLoad = false;
        }
    }

    // customise load limit
    var loadLimit = 5; // default
    if (cusLoadLimit = urlParm.get('loadLimit')) {
        if (cusLoadLimit > imageList.length || cusLoadLimit == 0) {
            loadLimit = imageList.length;
        } else {
            loadLimit = cusLoadLimit;
        }
    }

    // display single pic
    if (extImgSrc = urlParm.get('loadExt')) {
        defaultLoad = false;
        document.getElementsByTagName("h1")[0].remove();
        document.getElementById("hero-title").remove();
        var child = `
            <div class="photo-children">
                <img src="`+extImgSrc+`"/>
                <p class="photo-date">(external image)</p>
                <p class="photo-des"><a id="go-back">Close</a></p>
            </div>
        `;
        document.getElementById("photo-list").insertAdjacentHTML('beforeend', child);
        document.getElementById("go-back").addEventListener("click", function(){
            window.close();
        });
    }

    // global default
    if (!imageList) {
        document.getElementById("photo-list").innerHTML = `<p style="color: #fff;text-align: center;">Something is not right, please refresh the page.</p>`
    } else if (defaultLoad) {
        // load first 10
        loadImageList();
    }

    // no zoom and being naughty
    document.getElementsByClassName("")
</script>
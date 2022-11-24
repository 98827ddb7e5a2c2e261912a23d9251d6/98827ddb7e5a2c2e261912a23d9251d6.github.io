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
    #photo-list {
        margin-top: -30px;
    }
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
    .photo-des{
        opacity: 0.999;
    }
    .photo-date{
        font-size: 50%;
        opacity: 0.5;
        margin-top: 2px;
    }
</style>

<div id="filter"></div>
<p id="hero-title" style="color: #fff;text-align: center;">License: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a></p>
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
    function loadImageList(index, trueIndex = false, listName = "imageList") {
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
                if (trueIndex) {
                    var item = window[listName][index];
                    window[listName].splice(index, 1);
                } else {
                    for (let i = 0; i < window[listName].length; i++) { 
                        if (window[listName][i].index == index) {
                            var item = window[listName][i];
                            window[listName].splice(i, 1);
                        }
                    }
                }
                count = loadLimit;
                loadCount = 0;
            } else {
                var item = window[listName].shift();
            }

            // build items and append
            if (item.date) {
                var dateHtml = timeDifference(Date.parse(item.date));
            } else {
                var dateHtml = `date unknown`;
            }
            if (item.skip) {
                dateHtml = "🌟 Hidden Item - " + dateHtml;
            }
            dateHtml = `<p class="photo-date">` + dateHtml + ` <span class="click-to-share" photoId="`+item.index+`" style="cursor: pointer; font-size: 110%;"> ➶ </span></p>`
            if (item.ref) {
                if (item.skip) {
                    var refHtml = " <a href='"+item.ref+"'>related</a>";
                } else {
                    var refHtml = " <a href='"+item.ref+"' target='_blank'>more</a>";
                }
            } else {
                var refHtml = "";
            }

            var child = `
                <div class="photo-children">
                    <img class="photo-image" src="`+item.url+`"/>
                    <p class="photo-des">`+item.des+refHtml+`</p>
                    `+dateHtml+`
                </div>
            `;
            document.getElementById("photo-list").insertAdjacentHTML('beforeend', child);
        } while (count < loadLimit && window[listName].length > 0);

        // share buttons
        Array.prototype.forEach.call(document.getElementsByClassName("click-to-share"), function(element) {
            element.replaceWith(element.cloneNode(true));
        });
        Array.prototype.forEach.call(document.getElementsByClassName("click-to-share"), function(element) {
            element.addEventListener("click", function(){
                var link = "https://beriru.wiki/photos/?loadSingle=" + element.getAttribute("photoId");
                if (item.skip) {
                    link = link + "&hidden=yes";
                }
                console.log(link);
                navigator.clipboard.writeText(link).then(function(){
                    alert("link copied");
                });
            });
        });

        // append bottom links
        if (window[listName].length > 0) {
            // append load more
            document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div class="lazy-load-toggle" style="text-align:center; font-size: 130%;"><a class="no-underline" id="lazy-load-more">Load More</a></div>`);
            document.getElementById("lazy-load-more").addEventListener("click", function(){
                loadLimit = 5;
                loadImageList();
            });

            // append load all after the 3rd try
            if (loadCount >= 3) {
                document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div class="lazy-load-toggle" style="text-align:center;"><a class="no-underline" id="lazy-load-all" style="filter: saturate(0); font-size: 80%; margin-top: 10px;">Load All (`+window[listName].length+`)</a></div>`);
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
        loadLimit = imageList.length;
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
        var targetList = "imageList";
        if (urlParm.get('hidden') == "yes") {
            targetList = "hiddenList";
        }
        if (loadIndex <= window[targetList].length) {
            loadImageList(loadIndex, false, targetList);
            document.getElementsByClassName("lazy-load-toggle")[0].insertAdjacentHTML("beforebegin", `
                    <div class="random-toggle" style="text-align:center; font-size: 130%;"><a class="no-underline" id="new-random">I'm Feeling Lucky</a></div>
                `);
            document.getElementById("new-random").addEventListener("click", function(){
                getRandom(true);
            });
            document.getElementById('lazy-load-more').innerText = "View the Full List";
            document.getElementById('lazy-load-more').style.fontSize = "80%";
            document.getElementById('lazy-load-more').style.filter = "saturate(0)";
            defaultLoad = false;
        }
    }

    // load random one
    function getRandom(manual = false) {
        // remove current
        if (toRemove = document.getElementsByClassName("photo-children")[0]) {
            toRemove.remove();
        }

        // get random
        var targetList = "imageList";
        if (manual) {
            var probNormal = 90;
            var probHidden = 10;
            var loadTypeRand = Math.random() * (probNormal + probHidden - 1) + 1;
            if (loadTypeRand > probNormal) {
                targetList = "hiddenList";
            }
        }
        var loadTargetIndex = Math.random() * (window[targetList].length - 0) + 0;
        loadTargetIndex = Math.floor(loadTargetIndex);
        loadImageList(loadTargetIndex, true, targetList);

        // locate
        if (manual) {
            document.getElementsByClassName("photo-image")[0].addEventListener("load", function(){
                document.getElementsByClassName("photo-children")[0].scrollIntoView(); 
                window.scrollBy(0, -20);
            });
        }
         
        // add more random link
        if (toRemove = document.getElementsByClassName("random-toggle")[0]) {
            toRemove.remove();
        }
        if (imageList.length > 10) {
            document.getElementsByClassName("lazy-load-toggle")[0].insertAdjacentHTML("beforebegin", `
                <div class="random-toggle" style="text-align:center; font-size: 130%;"><a class="no-underline" id="new-random">I'm Feeling Lucky</a></div>
            `);
            document.getElementById("new-random").addEventListener("click", function(){
                getRandom(true);
            });
        }

        // adjust lazy load
        document.getElementById('lazy-load-more').innerText = "View the Full List";
        document.getElementById('lazy-load-more').style.fontSize = "80%";
        document.getElementById('lazy-load-more').style.filter = "saturate(0)";
        document.getElementById('lazy-load-more').addEventListener("click", function(){
            if (toRemove = document.getElementsByClassName("random-toggle")[0]) {
                toRemove.remove();
            }
        });
    }
    if (urlParm.get('loadRandom') == "yes") {
        // do random
        getRandom();

        // adjust hero
        document.getElementById("hero-title").insertAdjacentHTML("afterend", `<p style="color: #fff;text-align: center;">Here is a random one:</p>`);

        // disable default
        defaultLoad = false;
    }

    // customise load limit
    if (cusLoadLimit = urlParm.get('loadLimit')) {
        if (cusLoadLimit > imageList.length || cusLoadLimit == 0) {
            loadLimit = imageList.length;
        } else {
            loadLimit = cusLoadLimit;
        }
    }

    // display external pic
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
        var loadLimit = 5; // default
        loadImageList(false, false, "imageList");
    }

    // no zoom and being naughty
    document.getElementsByClassName("")
</script>
---
layout: page
title: Photos I Took
permalink: /photos/
---
<script src="/assets/images.js"></script>

<style>
    /* no scroll bar */
    ::-webkit-scrollbar {
        display: none;
    }

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
        width: 100%;
        width: calc(100% + 20px);
        margin-top: -30px;
        margin-left: -10px;
    }
    .photo-children {
        max-width: 666px;
        text-align: center;
        margin: auto;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .photo-children>p{
        margin: 0;
        text-align: center;
        color: #aaa;
        font-size: 80%;
        padding: 0 20px;
    }
    .photo-des{
        opacity: 0.999;
    }
    .photo-date{
        font-size: 50%;
        opacity: 0.5;
        margin-top: 2px;
    }
    .photo-image{
        max-height: 666px;
    }
</style>

<div id="filter"></div>
<p id="hero-title" style="color: #fff;text-align: center;">Last updated on <span id="photo-last-update">unknown</span>. <br/>License: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a></p>
<div id="photo-list"></div>

<script>
    fetch('https://api.github.com/repos/5cf2a7d4bf6e4cdb64b37b7a03b9f2f7/5cf2a7d4bf6e4cdb64b37b7a03b9f2f7.github.io/commits?path=/assets/images.js&page=1&per_page=1')
    .then(response => response.json())
    .then(data => {
      var timestamp = data[0].commit.committer.date;
      var date = new Date(timestamp).toISOString().split('T')[0];
      document.getElementById("photo-last-update").textContent = date;
    });
</script>

<script>
    // utility
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
    // search by index
    function searchByIndex(listName = "imageList", targetIndex, removeFound = false) {
        for (let i = 0; i < window[listName].length; i++) { 
            if (window[listName][i].index == targetIndex) {
                var foundItem = window[listName][i];
                if (removeFound) {
                    window[listName].splice(i, 1);
                }
                return foundItem;
            }
        }
        return false;
    }
    // search by parent
    function searchByParent(listName = "hiddenList", targetParent) {
        var listOfFound = [];
        for (let i = 0; i < window[listName].length; i++) { 
            if (window[listName][i].parent == targetParent) {
                listOfFound.push(window[listName][i]);
            }
        }
        if (listOfFound.length > 0) {
            return listOfFound;
        } else {
            return false;
        }
    }

    // parse image list
    var loadCount = 0;
    var imageListUsed = [];
    function loadImageList(targetIndex, trueIndex = false, listName = "imageList") {
        loadCount++;

        // doc scroll position
        var currentPos = document.documentElement.scrollTop;

        // remove step loader
        while (document.getElementsByClassName("lazy-load-toggle").length > 0) {
            document.getElementsByClassName("lazy-load-toggle")[0].remove();
        }

        // load images
        var count = 0;
        var prevDes = "";
        do {
            count++;
            if (targetIndex) {
                if (trueIndex) {
                    var item = window[listName][targetIndex];
                    window[listName].splice(targetIndex, 1);
                } else {
                    var item = searchByIndex(listName, targetIndex, removeFound = true);
                }
                count = window.loadLimit;
                loadCount = 0;
            } else {
                var item = window[listName].shift();
            }
            // backup
            imageListUsed.push(item);

            // build date field
            // get parent date if hidden
            if (item.skip && !item.date && item.parent > 0) {
                var parent = searchByIndex("imageList", item.parent, removeFound = false);
                if (!parent) {
                    parent = searchByIndex("imageListUsed", item.parent, removeFound = false);
                }
                if (parent) {
                    item.date = parent.date;
                }
            }
            // form base
            if (item.date) {
                var dateHtml = timeDifference(Date.parse(item.date));
            } else {
                var dateHtml = `date unknown`;
            }
            // add special tag for hidden
            if (item.skip && !urlParm.get('loadCollection')) {
                dateHtml = `<a class="no-underline">🌟</a> Hidden Item - ` + dateHtml;
            }
            if (item.parent == 0 && item.subs.split("|").length <= 1) {
                dateHtml = `<a class="no-underline">🌟🌟</a>` + dateHtml;
            }
            // finalise date
            dateHtml = `<p class="photo-date" photoTimestamp="`+item.date+`">` + dateHtml + ` <a class="click-to-share no-underline" photoId="`+item.index+`" style="padding-left: 3px; filter: saturate(0);"> 🔗 </a></p>`

            // build reference field
            if (item.ref) {
                var refHtml = " <a href='"+item.ref+"' target='_blank'>view more</a>";
            } else if (item.skip && (item.parent > 0 || (item.parent == 0 && item.subs.split("|").length > 1)) && !urlParm.get('loadCollection')) {
                var collectionLink = "/photos?loadCollection=" + item.parent;
                if (item.subs) {
                    collectionLink = collectionLink + "&subEntries=" + item.subs;
                }
                var refHtml = " <a href='"+collectionLink+"'>view related</a>";
            } else {
                var refHtml = "";
            }

            // build discriptions
            if (!urlParm.get('loadCollection') || refHtml || (!item.skip && !item.parent) || prevDes != item.des) {
                var desHtml = `<p class="photo-des">`+item.des+refHtml+`</p>`;
                prevDes = item.des;
            } else {
                var desHtml = "";
            }

            // append base
            if (!item.url.match(/^https:\/\//g)) {
                item.url = storageBase + item.url;
            }

            var child = `
                <div class="photo-children">
                    <img class="photo-image" src="`+item.url+`"/>
                    `+desHtml+`
                    `+dateHtml+`
                </div>
            `;
            document.getElementById("photo-list").insertAdjacentHTML('beforeend', child);
        } while (count < window.loadLimit && window[listName].length > 0);

        // share buttons
        Array.prototype.forEach.call(document.getElementsByClassName("click-to-share"), function(element) {
            element.replaceWith(element.cloneNode(true));
        });
        Array.prototype.forEach.call(document.getElementsByClassName("click-to-share"), function(element) {
            element.addEventListener("click", function(){
                var link = window.location.protocol + "//" + window.location.host + "/photos/?loadSingle=" + element.getAttribute("photoId");
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
                document.getElementsByClassName("site-avatar")[0].setAttribute("href", "/photos?loadRandom=yes");
                window.loadLimit = 5;
                loadImageList();
            });

            // append "load all" after the 1st try
            if (loadCount > 1) {
                document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div class="lazy-load-toggle" style="text-align:center;"><a class="no-underline" id="lazy-load-all" style="filter: saturate(0); font-size: 80%; margin-top: 10px;">Load All (`+window[listName].length+`)</a></div>`);
                document.getElementById("lazy-load-all").addEventListener("click", function(){
                    document.getElementsByClassName("site-avatar")[0].setAttribute("href", "/photos?loadRandom=yes");
                    loadAll();
                });
            }
            
        } else {
            // fuck you adobe portfolio
            document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div id="the-end" style="text-align:center; font-size: 130%;"><a class="no-underline" href="/photos?loadRandom=yes" style="filter: saturate(0);">The End</a></div>`);
        }

        // repos
        document.documentElement.scrollTop = currentPos;
    }


    // load all easter egg
    // loadAll
    function loadAll(hidden = false) {
        if (toRemove = document.getElementsByClassName("random-toggle")[0]) {
            toRemove.remove();
        }
        var loadTarget = "imageList";
        if (hidden) {
            loadTarget = "hiddenList";
        }
        window.loadLimit = window[loadTarget].length;
        loadImageList(false, false, loadTarget);
    }
    // type "all" -> load all
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
    // the dark side
    window.addEventListener('keypress', (function() {
        var strToType = 'iknowwhatiamdoing',
            strTyped = '';
        return function(event) {
            var character = String.fromCharCode(event.which);
            strTyped += character;
            if (strToType.indexOf(strTyped) === -1) strTyped = '';
            else if (strTyped === strToType) {
                strTyped = '';
                loadAll(true);
            }
        };
    }()));

    // fix noir incompa
    document.getElementById("filter").style.setProperty('mix-blend-mode', 'overlay', 'important');

    // check storage base and render
    var storageBase = "https://storage.beriru.wiki";
    var storageBackup = "https://raw.githubusercontent.com/98827ddb7e5a2c2e261912a23d9251d6/storage/master";
    async function storageFallback() {
        var response = await fetch(storageBase);        
        if (response.ok) {
          var content = await response.text();
          if (content != "of course it bloody works\n") {
            storageBase = storageBackup;
          }
        } else {
          storageBase = storageBackup;
        }
        console.log("Using: " + storageBase);
    }
    try {
        storageFallback();
    } catch (e) {
        console.log(e);
        storageBase = storageBackup;
    }

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
            document.getElementById('lazy-load-more').innerText = "View Latest";
            document.getElementById('lazy-load-more').style.fontSize = "80%";
            document.getElementById('lazy-load-more').style.filter = "saturate(0)";
            defaultLoad = false;
        }
    }

    // load collection by parent index
    function getCollction(collectionIndex, subCollectionIndexs = []) {
        var collection = [];

        // get parent
        var parent = searchByIndex("imageList", collectionIndex, removeFound = false);
        if (parent) {
            collection.push(parent);
        }

        // get children
        if (subCollectionIndexs.length > 0 && collectionIndex == 0) {
            subCollectionIndexs.forEach(function(index){
                var children = searchByIndex("hiddenList", index, removeFound = true);
                if (children) {
                    collection.push(children);
                }
            });
        } else {
            var childrens = searchByParent("hiddenList", collectionIndex);
            if (childrens.length > 0) {
                collection = collection.concat(childrens);
            }
        }

        // return
        return collection;
    }
    var collectionList = [];
    if (collectionIndex = urlParm.get('loadCollection')) {
        if (collectionIndex <= imageList.length && collectionIndex >= 0) {
            if (collectionIndex == 0 && urlParm.get('subEntries')) {
                var subEntries = urlParm.get('subEntries').split("|");
                collectionList = getCollction(collectionIndex, subEntries);
            } else {
                collectionList = getCollction(collectionIndex);
            }

            // draw the list
            window.loadLimit = collectionList.length;
            loadImageList(targetIndex = false, trueIndex = false, listName = "collectionList");

            // add collection link
            document.getElementById("the-end").insertAdjacentHTML("beforebegin", `
                <div  style="text-align:center; font-size: 130%; filter: saturate(0);"><a class="no-underline" id="copy-collection"> 🔗 </a></div>
            `);
            document.getElementById("copy-collection").addEventListener("click", function(){
                var link = window.location.href;
                console.log(link);
                navigator.clipboard.writeText(link).then(function(){
                    alert("collection link copied");
                });
            });

            // prevent default
            defaultLoad = false;
        }
    }

    // load random one
    var hitNormal = 0;
    var probNormal = 85;
    var probHidden = 15;
    var minHitAdj = 2;
    var improvOddAdj = 1;
    function getRandom(manual = false) {
        // remove current
        if (toRemove = document.getElementsByClassName("photo-children")[0]) {
            toRemove.remove();
        }

        // get type
        var targetList = "imageList";
        if (manual) {
            // rand and min hit
            var loadTypeRand = Math.random() * (probNormal + probHidden - 1) + 1;
            hitNormal++;
            if (loadTypeRand > probNormal || hitNormal >= (probNormal / probHidden) * minHitAdj) {
                targetList = "hiddenList";
                hitNormal = 0;
            } else {
                // improve odds
                if (probHidden < probNormal) {
                    probHidden = Math.floor(probHidden + (hitNormal * (1 / improvOddAdj)));
                }
            }
        }

        // get target
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
        document.getElementById('lazy-load-more').innerText = "View Latest";
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
            window.loadLimit = imageList.length;
        } else {
            window.loadLimit = cusLoadLimit;
        }
    }

    // display external pic
    if (extImgSrc = urlParm.get('loadExt')) {
        defaultLoad = false;
        document.getElementsByTagName("h1")[0].remove();
        document.getElementById("hero-title").remove();
        var child = `
            <div class="photo-children">
                <img class="photo-image" src="`+extImgSrc+`"/>
                <p class="photo-date">(external image)</p>
                <p class="photo-des"><a id="go-back">Close</a></p>
            </div>
        `;
        document.getElementById("photo-list").insertAdjacentHTML('beforeend', child);
        document.getElementById("go-back").addEventListener("click", function(){
            window.close();
        });
    }

    // alter avatar logic when it is not default or random
    if (!defaultLoad && urlParm.get('loadRandom') != "yes") {
        document.getElementsByClassName("site-avatar")[0].setAttribute("href", "/photos?loadRandom=yes");
    }

    // global default
    if (!imageList) {
        document.getElementById("photo-list").innerHTML = `<p style="color: #fff;text-align: center;">Something is not right, please refresh the page.</p>`
    } else if (defaultLoad) {
        // load first 10
        window.loadLimit = 5; // default
        loadImageList(false, false, "imageList");
    }

    
</script>
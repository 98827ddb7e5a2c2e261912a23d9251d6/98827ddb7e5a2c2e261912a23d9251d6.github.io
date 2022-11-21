---
layout: page
title: Photos I Love
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
        filter: contrast(2);
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
<p style="color: #fff;text-align: center;">I took most of them. All are <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a> but you knew I don't bother to sue you.</p>
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
    var loadLimit = 5;
    function loadImageList() {
        // doc scroll position
        var currentPos = document.documentElement.scrollTop;

        // remove step loader
        var lazyLoadMore = document.getElementById("lazy-load-more");
        if (lazyLoadMore) {
            document.getElementById("lazy-load-more").remove();
        }

        // load images
        var count = 0;
        do {
            count++;
            var item = imageList.shift();
            // build items and append
            if (item.date) {
                var dateHtml = `<p class="photo-date">`+timeDifference(Date.parse(item.date))+`</p>`;
            } else {
                var dateHtml = `<p class="photo-date">date unknown</p>`;
            }
            if (item.ref) {
                var refHtml = " <a href='"+item.ref+"' target='_blank'>(more)</a>";
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

        // append bottom links
        if (imageList.length > 0) {
            // append load more
            document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div style="text-align:center; font-size: 130%;"><a id="lazy-load-more">Load More</a></div>`);
            document.getElementById("lazy-load-more").addEventListener("click", function(){
                loadImageList();
            });
        } else {
            // portfolio is not ready
            // document.getElementById("photo-list").insertAdjacentHTML('beforeend', `<div style="text-align:center; font-size: 130%;"><a href="https://beriru.myportfolio.com/home" target="_blank">View More in Portfolio</a></div>`);
        }

        // repos
        document.documentElement.scrollTop = currentPos;
    }

    if (!imageList) {
        document.getElementById("photo-list").innerHTML = `<p style="color: #fff;text-align: center;">Something is not right, please refresh the page.</p>`
    } else {
        // load first 10
        loadImageList();
    }

    // fix noir incompa
    document.getElementById("filter").style.setProperty('mix-blend-mode', 'overlay', 'important');
</script>
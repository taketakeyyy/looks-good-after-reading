(function(){
    // スコープ汚染を防ぐため、即時関数で囲む
    const $: any = require('jquery');
    const domops: any = require('./utils/domops.ts');
    const storage: any = require('./utils/storage.ts');

    console.log("Hello World");

    // 以前に、この記事読んだことある？
    const loc = window.location.href//.split("/")[-1];
    const m = loc.match(/.*qiita\.com.*\/.*\/items\/(.+$)/);
    if(m === null) { return; }
    const article_id = m[1];
    const storage_data = storage.async_load_storage();

    console.log(storage_data[article_id]);
    if (storage_data[article_id] !== undefined) {
        // 読んだことある
        return;
    }

    // <button class="" title="Looks Good To Me!">のクリック・タッチを無効化する
    domops.change_enable_lgtm(false);

    // スクロールイベント追加
    $(window).on('load scroll', function() {
        domops.have_read();
        console.log("scrolling");
    });

})();
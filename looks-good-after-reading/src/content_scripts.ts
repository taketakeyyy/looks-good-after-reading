(function(){
    // スコープ汚染を防ぐため、即時関数で囲む
    const $: any = require('jquery');
    const util: any = require('./utils/util.ts');
    const domops: any = require('./utils/domops.ts');
    const storage: any = require('./utils/storage.ts');

    // <button class="" title="Looks Good To Me!">のクリック・タッチを無効化する
    domops.change_enable_lgtm(false);

    // スクロールイベント追加
    $(window).on('load scroll', function() {
        domops.have_read();
    });

    storage.async_load_storage()
    .then(function(load_data: any): string {
        // 以前に、この記事読んだことある？
        const article_id = util.get_article_id();
        if (article_id === "") { return "";}

        if (load_data[article_id] !== undefined) {
            // 読んだことある場合、最初からLGTM押してもいい。
            domops.change_enable_lgtm(true);
            return "have_read";
        }
        // 読んだことない場合
        return "have_not_read";
    })
    .then(function(result: string): void{
        // 読んだことなくても、LGTMがクリック済みならよ、それはもう†読んだ†ってことじゃあねえのか？
        if (result !== "have_not_read") {
            // LGTMが未クリックの場合、全部読んだらこの記事が保存されるだろう。
            return;
        }

        // LGTMがクリック済みなら、この記事を保存する
        if (domops.have_clicked_lgtm()){
            domops.change_enable_lgtm(true);
            const article_id = util.get_article_id();
            if (article_id === "") { return; }
            storage.save_article_I_have_read(article_id);
        }
    });



})();
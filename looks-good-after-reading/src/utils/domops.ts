import { async_load_storage } from "./storage";

const storage: any = require('./storage.ts');


export function disable_lgtm(): boolean {
    const divs = document.getElementsByClassName("it-Actions_item it-Actions_item-like likable");
    if (divs.length != 1){
        return false;
    }

    divs[0].setAttribute("style", "pointer-events: none;");
    return true;
}


export function change_enable_lgtm(enable: boolean) {
    /* lgtmをクリッカブルにするかどうか */
    const divs = document.getElementsByClassName("it-Actions_item it-Actions_item-like likable");
    if (divs.length != 1){
        return false;
    }

    if (enable) {
        divs[0].setAttribute("style", "pointer-events: auto;");
        return true;
    }
    else {
        divs[0].setAttribute("style", "pointer-events: none;");
        return true;
    }
}

export function have_read(): any {
    /*記事を読み終わったかの判定*/
    const win_scroll = $(window).scrollTop();
    const win_height = $(window).height();
    if (win_scroll === undefined || win_height === undefined){
        return false;
    }

    const scroll_pos = win_scroll + win_height;

    const target: (JQuery<HTMLElement> | undefined) = $(".it-Footer");
    if (target === undefined) { return false; }

    const ofs = target.offset();
    if(ofs === undefined) { return false; }
    if(ofs.top < scroll_pos) {
        // 読み終わった
        change_enable_lgtm(true);
        // 読んだことある記事を保存しておく
        // https://qiita.com/c_r_5/items/84f19475647baf0ebe1f
        const loc = window.location.href//.split("/")[-1];
        const m = loc.match(/.*qiita\.com.*\/.*\/items\/(.+$)/);
        if(m === null) {return true; }  // 保存せずに終了

        return Promise.resolve()
        .then(() => {
            storage.async_load_storage
        }).then(


        );
        save_article_read(m[1]);


        return true;
    }
    return false;
}


function save_article_read(artivle_id: string) {
    const data = storage.async_load_storage();
}


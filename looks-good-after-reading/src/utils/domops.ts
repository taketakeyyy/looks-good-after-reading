const util: any = require('./util.ts');
const storage: any = require('./storage.ts');

export function change_enable_lgtm(enable: boolean) {
    /* lgtmをクリッカブルにするかどうか */
    const run = (class_name: string, enable: boolean) => {
        const divs = document.getElementsByClassName(class_name);
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

    run("it-Actions_item it-Actions_item-like likable", enable);
    run("it-ActionsMobile_like likable", enable);
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
        // 読み終わったら、この記事を保存する
        change_enable_lgtm(true);

        const article_id = util.get_article_id();
        if(article_id === "") { return true; }
        storage.save_article_I_have_read(article_id);

        return true;
    }
    return false;
}

export function have_clicked_lgtm(): boolean{
    /*LGTMが既にクリック済みかを判定する*/
    const elems = document.getElementsByClassName("LgtmIcon__Lgtm-sc-1e4ee48-0 fSwhXv");
    return (elems.length !== 0);
}
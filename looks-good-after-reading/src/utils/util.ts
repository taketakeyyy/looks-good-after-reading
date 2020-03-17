export function get_article_id(): string{
    /*この記事のURLから、記事IDを作成して返す
    https://qiita.com/dich1/items/4878baxxxxxxxxxxff30
    というURLなら、"4878baxxxxxxxxxxff30"が記事ID
    */
    const loc = window.location.href  //.split("/")[-1];
    const m = loc.match(/.*qiita\.com.*\/.*\/items\/(.+$)/);
    if(m === null) { return ""; }
    return m[1];
}
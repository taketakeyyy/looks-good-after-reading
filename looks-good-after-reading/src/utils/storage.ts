// [START function]
export function async_load_storage(){
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(null, function(loaded_data){
            console.log(loaded_data);
            resolve();
            return;
        });
    });
}
// [END function]


// [START function]
export function save_article_I_have_read(article_id: string){
    /*
    設定をChromeのストレージに保存する

    Refs:
        https://dackdive.hateblo.jp/entry/2017/07/27/100000
        https://github.com/taketakeyyy/my-practice/blob/master/dotinstall/MyExtensions/04_OptionsUI/options.js
    */
    // 現在の状態を保存する
    // まず読み込んで、追加して、保存する
    let storage_data = async_load_storage();
    storage_data[article_id] = true;
    // saving_data["article_read"] = language_order;

    // chrome.storage.sync.set(saving_data);
}
// [END function]


// [START function]
export function remove_settings(target: string){
    /*データ削除*/
    chrome.storage.sync.remove(target);
}
// [END function]
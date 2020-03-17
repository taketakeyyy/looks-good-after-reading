// [START function]
export function async_load_storage(): Promise<{}>{
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(null, function(loaded_data){
            resolve(loaded_data);
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
    async_load_storage().then(function(storage_data: any){
        storage_data[article_id] = true;
        chrome.storage.sync.set(storage_data);
    });
}
// [END function]


// [START function]
export function remove_settings(target: string){
    /*データ削除*/
    chrome.storage.sync.remove(target);
}
// [END function]
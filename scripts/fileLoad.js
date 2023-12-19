window.addEventListener('DOMContentLoaded', (event) => {
    if (window.File && window.FileReader) {
        const elem_file_load = document.getElementById("file_load");
        elem_file_load.addEventListener("change", (event) => {
            const input_file = event.target.files[0];
            if (input_file.name.match('.json$')) {
                const f_reader = new FileReader();
                f_reader.onload = (event) => {
                    var options = { bootstrap: true, tableBordered: true };
                    var json = JSON.parse(event.target.result);
                    // プリザンターのテーブルの管理画面に合わせてプロパティを日本語に変換する
                    json['ヘッダ情報'] = json.HeaderInfo;
                    json['ヘッダ情報']['アセンブリバージョン'] = json.HeaderInfo.AssemblyVersion;
                    json['ヘッダ情報']['ベースサイトID'] = json.HeaderInfo.BaseSiteId;
                    json['ヘッダ情報']['サーバ'] = json.HeaderInfo.Server;
                    json['ヘッダ情報']['作成者'] = json.HeaderInfo.CreatorName;
                    json['ヘッダ情報']['パッケージ日時'] = json.HeaderInfo.PackageTime;
                    json['ヘッダ情報']['サイト情報'] = Object.assign({}, json.HeaderInfo.Convertors);
                    json.Sites.forEach(function (element, index) {
                        json['ヘッダ情報']['サイト情報'][index]['サイトID'] = json.HeaderInfo.Convertors[index].SiteId;
                        json['ヘッダ情報']['サイト情報'][index]['サイト名'] = json.HeaderInfo.Convertors[index].SiteTitle;
                        json['ヘッダ情報']['サイト情報'][index]['サイト種別'] = json.HeaderInfo.Convertors[index].ReferenceType;
                        json['ヘッダ情報']['サイト情報'][index]['データを含む'] = json.HeaderInfo.Convertors[index].IncludeData;
                    });
                    json['ヘッダ情報']['サイトのアクセス制御を含める'] = json.HeaderInfo.IncludeSitePermission;
                    json['ヘッダ情報']['レコードのアクセス制御を含める'] = json.HeaderInfo.IncludeRecordPermission;
                    json['ヘッダ情報']['項目のアクセス制御を含める'] = json.HeaderInfo.IncludeColumnPermission;
                    json['ヘッダ情報']['通知を含める'] = json.HeaderInfo.IncludeNotifications;
                    json['ヘッダ情報']['リマインダーを含める'] = json.HeaderInfo.IncludeReminders;
                    json['サイト情報'] = Object.assign({}, json.Sites);
                    json.Sites.forEach(function (element, index) {
                        // 基本情報
                        json['サイト情報'][index]['テナントID'] = json.Sites[index].TenantId;
                        json['サイト情報'][index]['親のサイトID'] = json.Sites[index].ParentId;
                        json['サイト情報'][index]['アクセス権の継承先サイトID'] = json.Sites[index].InheritPermission;
                        json['サイト情報'][index]['バージョン'] = json.Sites[index].SiteSettings.Version;
                        json['サイト情報'][index]['サイト種別'] = json.Sites[index].SiteSettings.ReferenceType;
                        json['サイト情報'][index]['サイト設定'] = json.Sites[index].SiteSettings;
                        // 全般
                        json['サイト情報'][index]['サイト設定']['全般'] = {};
                        json['サイト情報'][index]['サイト設定']['全般']['サイトID'] = json.Sites[index].SiteId;
                        json['サイト情報'][index]['サイト設定']['全般']['タイトル'] = json.Sites[index].Title;
                        json['サイト情報'][index]['サイト設定']['全般']['サイト名'] = json.Sites[index].SiteName;
                        json['サイト情報'][index]['サイト設定']['全般']['サイトグループ名'] = json.Sites[index].SiteGroupName;
                        json['サイト情報'][index]['サイト設定']['全般']['内容'] = json.Sites[index].Body;
                        json['サイト情報'][index]['サイト設定']['全般']['サイト種別'] = json.Sites[index].ReferenceType;
                        // ガイド
                        json['サイト情報'][index]['サイト設定']['ガイド'] = {};
                        json['サイト情報'][index]['サイト設定']['ガイド']['一覧画面のガイド'] = json.Sites[index].GridGuide;
                        json['サイト情報'][index]['サイト設定']['ガイド']['編集画面のガイド'] = json.Sites[index].EditorGuide;
                        json['サイト情報'][index]['サイト設定']['ガイド']['カレンダーのガイド'] = json.Sites[index].CalendarGuide;
                        json['サイト情報'][index]['サイト設定']['ガイド']['クロス集計のガイド'] = json.Sites[index].CrosstabGuide;
                        json['サイト情報'][index]['サイト設定']['ガイド']['ガントチャートのガイド'] = json.Sites[index].GanttGuide;
                        json['サイト情報'][index]['サイト設定']['ガイド']['バーンダウンチャートのガイド'] = json.Sites[index].BurnDownGuide;
                        json['サイト情報'][index]['サイト設定']['ガイド']['時系列チャートのガイド'] = json.Sites[index].TimeSeriesGuide;
                        json['サイト情報'][index]['サイト設定']['ガイド']['カンバンのガイド'] = json.Sites[index].KambanGuide;
                        json['サイト情報'][index]['サイト設定']['ガイド']['画像ライブラリのガイド'] = json.Sites[index].ImageLibGuide;
                        // サイト画像
                        json['サイト情報'][index]['サイト設定']['サイト画像'] = {};
                        // 一覧
                        json['サイト情報'][index]['サイト設定']['一覧'] = {};
                        json['サイト情報'][index]['サイト設定']['一覧']['一覧の設定'] = Object.assign({}, json.Sites[index].SiteSettings.GridColumns);
                        json['サイト情報'][index]['サイト設定']['一覧']['ページ当たりの表示件数'] = json.Sites[index].SiteSettings.GridPageSize;
                        json['サイト情報'][index]['サイト設定']['一覧']['一覧編集種別'] = json.Sites[index].SiteSettings.GridEditorType;
                        json['サイト情報'][index]['サイト設定']['一覧']['一覧上に履歴を表示'] = json.Sites[index].SiteSettings.HistoryOnGrid;
                        json['サイト情報'][index]['サイト設定']['一覧']['常に検索条件を要求する'] = json.Sites[index].SiteSettings.AlwaysRequestSearchCondition;
                        json['サイト情報'][index]['サイト設定']['一覧']['編集画面へのリンクを無効化'] = json.Sites[index].SiteSettings.DisableLinkToEdit;
                        // フィルタ
                        json['サイト情報'][index]['サイト設定']['フィルタ'] = {};
                        json['サイト情報'][index]['サイト設定']['フィルタ']['フィルタの設定'] = Object.assign({}, json.Sites[index].SiteSettings.FilterColumns);
                        json['サイト情報'][index]['サイト設定']['フィルタ']['「期限が近い」の日数（後）'] = json.Sites[index].SiteSettings.NearCompletionTimeAfterDays;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['「期限が近い」の日数（前）'] = json.Sites[index].SiteSettings.NearCompletionTimeBeforeDays;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['フィルタボタンを使用する'] = json.Sites[index].SiteSettings.UseFilterButton;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['フィルタ設定領域を使用する'] = json.Sites[index].SiteSettings.UseFiltersArea;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['否定フィルタを使用する'] = json.Sites[index].SiteSettings.UseNegativeFilters;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['項目連携を使用する'] = json.Sites[index].SiteSettings.UseRelatingColumnsOnFilter;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['未完了フィルタを使用する'] = json.Sites[index].SiteSettings.UseIncompleteFilter;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['自分フィルタを使用する'] = json.Sites[index].SiteSettings.UseOwnFilter;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['期限が近いを使用する'] = json.Sites[index].SiteSettings.UseNearCompletionTimeFilter;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['遅延フィルタを使用する'] = json.Sites[index].SiteSettings.UseDelayFilter;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['期限超過フィルタを使用する'] = json.Sites[index].SiteSettings.UseOverdueFilter;
                        json['サイト情報'][index]['サイト設定']['フィルタ']['検索フィルタを使用する'] = json.Sites[index].SiteSettings.UseSearchFilter;
                        // 集計
                        json['サイト情報'][index]['サイト設定']['集計'] = {};
                        if (typeof json.Sites[index].SiteSettings.Aggregations !== 'undefined') {
                            json.Sites[index].SiteSettings.Aggregations.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['集計']['集計の設定'] = Object.assign({}, json.Sites[index].SiteSettings.Aggregations);
                                json['サイト情報'][index]['サイト設定']['集計']['集計の設定'][index2]['ID'] = json.Sites[index].SiteSettings.Aggregations[index2].Id;
                                json['サイト情報'][index]['サイト設定']['集計']['集計の設定'][index2]['集計項目'] = json.Sites[index].SiteSettings.Aggregations[index2].GroupBy;
                                json['サイト情報'][index]['サイト設定']['集計']['集計の設定'][index2]['集計種別'] = json.Sites[index].SiteSettings.Aggregations[index2].Type;
                                json['サイト情報'][index]['サイト設定']['集計']['集計の設定'][index2]['集計対象'] = json.Sites[index].SiteSettings.Aggregations[index2].Target;
                            });
                        }
                        // エディタ
                        json['サイト情報'][index]['サイト設定']['エディタ'] = {};
                        json['サイト情報'][index]['サイト設定']['エディタ']['エディタの設定'] = json.Sites[index].SiteSettings.EditorColumnHash;
                        if (typeof json.Sites[index].SiteSettings.EditorColumnHash?.General !== 'undefined')
                            json['サイト情報'][index]['サイト設定']['エディタ']['エディタの設定']['全般'] = Object.assign({}, json.Sites[index].SiteSettings.EditorColumnHash.General);
                        json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'] = {};
                        json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'] = Object.assign({}, json.Sites[index].SiteSettings.Columns);
                        if (typeof json.Sites[index].SiteSettings.Columns !== 'undefined')
                            json.Sites[index].SiteSettings.Columns.forEach(function (element, index2) {
                                // 項目名
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ColumnName !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['項目名'] = json.Sites[index].SiteSettings.Columns[index2].ColumnName;
                                // 全般
                                json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般'] = {};
                                // 表示名
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].LabelText !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['表示名'] = json.Sites[index].SiteSettings.Columns[index2].LabelText;
                                // 配置
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].TextAlign !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['配置'] = json.Sites[index].SiteSettings.Columns[index2].TextAlign;
                                // 最大文字数
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].MaxLength !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['最大文字数'] = json.Sites[index].SiteSettings.Columns[index2].MaxLength;
                                // スタイル
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].FieldCss !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['スタイル'] = json.Sites[index].SiteSettings.Columns[index2].FieldCss;
                                // ビュワー切替
                                // 入力必須
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ValidateRequired !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['入力必須'] = json.Sites[index].SiteSettings.Columns[index2].ValidateRequired;
                                // 一括更新を許可
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].AllowBulkUpdate !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['一括更新を許可'] = json.Sites[index].SiteSettings.Columns[index2].AllowBulkUpdate;
                                // 重複禁止
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].NoDuplication !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['重複禁止'] = json.Sites[index].SiteSettings.Columns[index2].NoDuplication;
                                // 重複時のメッセージ
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].MessageWhenDuplicated !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['重複時のメッセージ'] = json.Sites[index].SiteSettings.Columns[index2].MessageWhenDuplicated;
                                // 既定値でコピー
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].CopyByDefault !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['既定値でコピー'] = json.Sites[index].SiteSettings.Columns[index2].CopyByDefault;
                                // 読取専用
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].EditorReadOnly !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['読取専用'] = json.Sites[index].SiteSettings.Columns[index2].EditorReadOnly;
                                // インポートのキー
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ImportKey !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['インポートのキー'] = json.Sites[index].SiteSettings.Columns[index2].ImportKey;
                                // 画像の登録を許可
                                // サムネイルサイズ
                                // エディタの書式
                                // 既定値
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].DefaultInput !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['既定値'] = json.Sites[index].SiteSettings.Columns[index2].DefaultInput;
                                // 書式
                                // NULL許容
                                // 単位
                                // 小数点以下桁数
                                // 端数処理種類
                                // コントロール種別（数値）
                                // 最小
                                // 最大
                                // 説明
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].Description !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['説明'] = json.Sites[index].SiteSettings.Columns[index2].Description;
                                // 入力ガイド
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].InputGuide !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['入力ガイド'] = json.Sites[index].SiteSettings.Columns[index2].InputGuide;
                                // タイトル結合
                                // タイトル区切り文字
                                // 選択肢一覧
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ChoicesText !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['選択肢一覧'] = json.Sites[index].SiteSettings.Columns[index2].ChoicesText;
                                // コントロール種別（分類）
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ChoicesControlType !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['コントロール種別'] = json.Sites[index].SiteSettings.Columns[index2].ChoicesControlType;
                                // 検索機能を使う
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].UseSearch !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['検索機能を使う'] = json.Sites[index].SiteSettings.Columns[index2].UseSearch;
                                // 複数選択
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].MultipleSelections !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['複数選択'] = json.Sites[index].SiteSettings.Columns[index2].MultipleSelections;
                                // 選択肢にブランクを挿入しない
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].NotInsertBlankChoice !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['選択肢にブランクを挿入しない'] = json.Sites[index].SiteSettings.Columns[index2].NotInsertBlankChoice;
                                // アンカー
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].Anchor !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['アンカー'] = json.Sites[index].SiteSettings.Columns[index2].Anchor;
                                // アンカーを新しいタブで開く
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].OpenAnchorNewTab !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['アンカーを新しいタブで開く'] = json.Sites[index].SiteSettings.Columns[index2].OpenAnchorNewTab;
                                // アンカー書式
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].AnchorFormat !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['アンカー書式'] = json.Sites[index].SiteSettings.Columns[index2].AnchorFormat;
                                // 自動ポストバック
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].AutoPostBack !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['自動ポストバック'] = json.Sites[index].SiteSettings.Columns[index2].AutoPostBack;
                                // 自動ポストバック時に返却する項目
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ColumnsReturnedWhenAutomaticPostback !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['自動ポストバック時に返却する項目'] = json.Sites[index].SiteSettings.Columns[index2].ColumnsReturnedWhenAutomaticPostback;
                                // 回り込みしない
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].NoWrap !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['回り込みしない'] = json.Sites[index].SiteSettings.Columns[index2].NoWrap;
                                // 非表示
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].Hide !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['非表示'] = json.Sites[index].SiteSettings.Columns[index2].Hide;
                                // フィールドCSS
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ExtendedFieldCss !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['フィールドCSS'] = json.Sites[index].SiteSettings.Columns[index2].ExtendedFieldCss;
                                // コントロールCSS
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ExtendedControlCss !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['コントロールCSS'] = json.Sites[index].SiteSettings.Columns[index2].ExtendedControlCss;
                                // フルテキストの種類
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].FullTextType !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['全般']['フルテキストの種類'] = json.Sites[index].SiteSettings.Columns[index2].FullTextType;
                                // 自動採番
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].MessageWhenDuplicated !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['自動採番'] = {};
                                // 書式
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].AutoNumberingFormat !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['自動採番']['書式'] = json.Sites[index].SiteSettings.Columns[index2].AutoNumberingFormat;
                                // リセット種別
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].AutoNumberingResetType !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['自動採番']['リセット種別'] = json.Sites[index].SiteSettings.Columns[index2].AutoNumberingResetType;
                                // 既定値
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].AutoNumberingDefault !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['自動採番']['既定値'] = json.Sites[index].SiteSettings.Columns[index2].AutoNumberingDefault;
                                // ステップ
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].AutoNumberingStep !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['自動採番']['ステップ'] = json.Sites[index].SiteSettings.Columns[index2].AutoNumberingStep;
                                // 入力検証
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].MessageWhenDuplicated !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['入力検証'] = {};
                                // クライアント正規表現
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ClientRegexValidation !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['入力検証']['クライアント正規表現'] = json.Sites[index].SiteSettings.Columns[index2].ClientRegexValidation;
                                // サーバ正規表現
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ServerRegexValidation !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['入力検証']['サーバ正規表現'] = json.Sites[index].SiteSettings.Columns[index2].ServerRegexValidation;
                                // エラーメッセージ
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].RegexValidationMessage !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['入力検証']['エラーメッセージ'] = json.Sites[index].SiteSettings.Columns[index2].RegexValidationMessage;
                                // 拡張HTML
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].MessageWhenDuplicated !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['拡張HTML'] = {};
                                // フィールドの前
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlBeforeField !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['拡張HTML']['フィールドの前'] = json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlBeforeField;
                                // ラベルの前
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlBeforeLabel !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['拡張HTML']['ラベルの前'] = json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlBeforeLabel;
                                // ラベルとコントロールの間
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlBetweenLabelAndControl !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['拡張HTML']['ラベルとコントロールの間'] = json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlBetweenLabelAndControl;
                                // コントロールの後
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlAfterControl !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['拡張HTML']['コントロールの後'] = json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlAfterControl;
                                // フィールドの後
                                if (typeof json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlAfterField !== 'undefined')
                                    json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2]['拡張HTML']['フィールドの後'] = json.Sites[index].SiteSettings.Columns[index2].ExtendedHtmlAfterField;
                            });
                        json['サイト情報'][index]['サイト設定']['エディタ']['見出しの最新ID'] = json.Sites[index].SiteSettings.SectionLatestId;
                        json['サイト情報'][index]['サイト設定']['エディタ']['見出し'] = Object.assign({}, json.Sites[index].SiteSettings.Sections);
                        json['サイト情報'][index]['サイト設定']['エディタ']['一括更新を許可'] = Object.assign({}, json.Sites[index].SiteSettings.BulkUpdateColumns);
                        json['サイト情報'][index]['サイト設定']['エディタ']['選択肢一覧'] = Object.assign({}, json.Sites[index].SiteSettings.Links);
                        json['サイト情報'][index]['サイト設定']['エディタ']['タブの最新ID'] = json.Sites[index].SiteSettings.TabLatestId;
                        json['サイト情報'][index]['サイト設定']['エディタ']['タブの設定'] = Object.assign({}, json.Sites[index].SiteSettings.Tabs);
                        json['サイト情報'][index]['サイト設定']['エディタ']['項目連携の設定'] = Object.assign({}, json.Sites[index].SiteSettings.RelatingColumns);
                        json['サイト情報'][index]['サイト設定']['エディタ']['自動バージョンアップ'] = json.Sites[index].SiteSettings.AutoVerUpType;
                        json['サイト情報'][index]['サイト設定']['エディタ']['コメントの編集を許可'] = json.Sites[index].SiteSettings.AllowEditingComments;
                        json['サイト情報'][index]['サイト設定']['エディタ']['コピーを許可'] = json.Sites[index].SiteSettings.AllowCopy;
                        json['サイト情報'][index]['サイト設定']['エディタ']['参照コピーを許可'] = json.Sites[index].SiteSettings.AllowReferenceCopy;
                        json['サイト情報'][index]['サイト設定']['エディタ']['コピー時に追加する文字'] = json.Sites[index].SiteSettings.CharToAddWhenCopying;
                        json['サイト情報'][index]['サイト設定']['エディタ']['分割を許可'] = json.Sites[index].SiteSettings.AllowSeparate;
                        json['サイト情報'][index]['サイト設定']['エディタ']['テーブルのロックを許可'] = json.Sites[index].SiteSettings.AllowLockTable;
                        json['サイト情報'][index]['サイト設定']['エディタ']['リンクを表示しない'] = json.Sites[index].SiteSettings.HideLink;
                        json['サイト情報'][index]['サイト設定']['エディタ']['レコードの遷移にAjaxを使用'] = json.Sites[index].SiteSettings.SwitchRecordWithAjax;
                        json['サイト情報'][index]['サイト設定']['エディタ']['自動ポストバック時にコマンドボタンを切り替える'] = json.Sites[index].SiteSettings.SwitchCommandButtonsAutoPostBack;
                        json['サイト情報'][index]['サイト設定']['エディタ']['削除時に画像を削除'] = json.Sites[index].SiteSettings.DeleteImageWhenDeleting;
                        // リンク
                        json['サイト情報'][index]['サイト設定']['リンク'] = {};
                        json['サイト情報'][index]['サイト設定']['リンク']['リンクの設定'] = Object.assign({}, json.Sites[index].SiteSettings.LinkColumns);
                        // 履歴
                        json['サイト情報'][index]['サイト設定']['履歴'] = {};
                        json['サイト情報'][index]['サイト設定']['履歴']['履歴の設定'] = Object.assign({}, json.Sites[index].SiteSettings.HistoryColumns);
                        json['サイト情報'][index]['サイト設定']['履歴']['履歴の復元を許可'] = json.Sites[index].SiteSettings.AllowRestoreHistories;
                        json['サイト情報'][index]['サイト設定']['履歴']['履歴の削除を許可'] = json.Sites[index].SiteSettings.AllowPhysicalDeleteHistories;
                        // 移動
                        json['サイト情報'][index]['サイト設定']['移動'] = {};
                        json['サイト情報'][index]['サイト設定']['移動']['移動先の設定'] = Object.assign({}, json.Sites[index].SiteSettings.MoveTargets);
                        // サマリ
                        json['サイト情報'][index]['サイト設定']['サマリ'] = {};
                        if (typeof json.Sites[index].SiteSettings.Summaries !== 'undefined') {
                            json.Sites[index].SiteSettings.Summaries.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['サマリ'] = Object.assign({}, json.Sites[index].SiteSettings.Summaries);
                                json['サイト情報'][index]['サイト設定']['サマリ'][index2]['データ保存先：サイト'] = json.Sites[index].SiteSettings.Summaries[index2].SiteId;
                                json['サイト情報'][index]['サイト設定']['サマリ'][index2]['データ保存先：サイト種別'] = json.Sites[index].SiteSettings.Summaries[index2].DestinationReferenceType;
                                json['サイト情報'][index]['サイト設定']['サマリ'][index2]['データ保存先：項目'] = json.Sites[index].SiteSettings.Summaries[index2].DestinationColumn;
                                json['サイト情報'][index]['サイト設定']['サマリ'][index2]['リンク項目'] = json.Sites[index].SiteSettings.Summaries[index2].LinkColumn;
                                json['サイト情報'][index]['サイト設定']['サマリ'][index2]['サマリ種別'] = json.Sites[index].SiteSettings.Summaries[index2].Type;
                                json['サイト情報'][index]['サイト設定']['サマリ'][index2]['ID'] = json.Sites[index].SiteSettings.Summaries[index2].Id;
                            });
                        }
                        // 計算式
                        if (typeof json.Sites[index].SiteSettings.Formulas !== 'undefined') {
                            json.Sites[index].SiteSettings.Formulas.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['計算式'] = Object.assign({}, json.Sites[index].SiteSettings.Formulas);
                                json['サイト情報'][index]['サイト設定']['計算式'][index2]['対象'] = json.Sites[index].SiteSettings.Formulas[index2].Target;
                                json['サイト情報'][index]['サイト設定']['計算式'][index2]['計算式'] = {};
                                json['サイト情報'][index]['サイト設定']['計算式'][index2]['計算式']['演算子の種類'] = json.Sites[index].SiteSettings.Formulas[index2].Formula.OperatorType;
                                json['サイト情報'][index]['サイト設定']['計算式'][index2]['計算式']['子要素'] = Object.assign({}, json.Sites[index].SiteSettings.Formulas[index2].Formula.Children);
                                json['サイト情報'][index]['サイト設定']['計算式'][index2]['条件'] = {};
                            });
                        }
                        // プロセス
                        if (typeof json.Sites[index].SiteSettings.Processes !== 'undefined') {
                            json.Sites[index].SiteSettings.Processes.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['プロセス'] = Object.assign({}, json.Sites[index].SiteSettings.Processes);
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['ID'] = json.Sites[index].SiteSettings.Processes[index2].Id;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['名称'] = json.Sites[index].SiteSettings.Processes[index2].Name;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['表示名'] = json.Sites[index].SiteSettings.Processes[index2].DisplayName;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般'] = {};
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['画面種別'] = json.Sites[index].SiteSettings.Processes[index2].ScreenType;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['現在の状況'] = json.Sites[index].SiteSettings.Processes[index2].CurrentStatus;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['変更後の状況'] = json.Sites[index].SiteSettings.Processes[index2].ChangedStatus;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['説明'] = json.Sites[index].SiteSettings.Processes[index2].Description;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['ツールチップ'] = json.Sites[index].SiteSettings.Processes[index2].Tooltip;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['確認メッセージ'] = json.Sites[index].SiteSettings.Processes[index2].ConfirmationMessage;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['成功メッセージ'] = json.Sites[index].SiteSettings.Processes[index2].SuccessMessage;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['OnClick'] = json.Sites[index].SiteSettings.Processes[index2].OnClick;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['実行種別'] = json.Sites[index].SiteSettings.Processes[index2].ExecutionType;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['アクション種別'] = json.Sites[index].SiteSettings.Processes[index2].ActionType;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['全般']['一括処理を許可'] = json.Sites[index].SiteSettings.Processes[index2].AllowBulkProcessing;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['入力検証'] = {};
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['入力検証']['入力検証種別'] = json.Sites[index].SiteSettings.Processes[index2].ValidationType;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['入力検証']['入力検証'] = Object.assign({}, json.Sites[index].SiteSettings.Processes[index2].ValidateInputs);
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件'] = {};
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['フィルター条件'] = {};
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['フィルター条件']['ID'] = json.Sites[index].SiteSettings.Processes[index2].View.Id;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['フィルター条件']['未完了'] = json.Sites[index].SiteSettings.Processes[index2].View.Incomplete;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['フィルター条件']['自分'] = json.Sites[index].SiteSettings.Processes[index2].View.Own;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['フィルター条件']['期限が近い'] = json.Sites[index].SiteSettings.Processes[index2].View.NearCompletionTime;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['フィルター条件']['遅延'] = json.Sites[index].SiteSettings.Processes[index2].View.Delay;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['フィルター条件']['期限超過'] = json.Sites[index].SiteSettings.Processes[index2].View.Overdue;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['フィルター条件']['検索'] = json.Sites[index].SiteSettings.Processes[index2].View.Search;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['条件']['エラーメッセージ'] = json.Sites[index].SiteSettings.Processes[index2].ErrorMessage;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['アクセス制御'] = {};
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['アクセス制御']['組織'] = Object.assign({}, json.Sites[index].SiteSettings.Processes[index2].Depts);
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['アクセス制御']['ユーザ'] = Object.assign({}, json.Sites[index].SiteSettings.Processes[index2].Users);
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['データの変更'] = Object.assign({}, json.Sites[index].SiteSettings.Processes[index2].DataChanges);
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['自動採番'] = {};
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['自動採番']['項目'] = json.Sites[index].SiteSettings.Processes[index2].AutoNumbering?.ColumnName;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['自動採番']['書式'] = json.Sites[index].SiteSettings.Processes[index2].AutoNumbering?.Format;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['自動採番']['リセット種別'] = json.Sites[index].SiteSettings.Processes[index2].AutoNumbering?.ResetType;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['自動採番']['既定値'] = json.Sites[index].SiteSettings.Processes[index2].AutoNumbering?.Default;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['自動採番']['ステップ'] = json.Sites[index].SiteSettings.Processes[index2].AutoNumbering?.Step;
                                json['サイト情報'][index]['サイト設定']['プロセス'][index2]['通知'] = Object.assign({}, json.Sites[index].SiteSettings.Processes[index2].Notifications);
                            });
                        }
                        // 状況による制御
                        if (typeof json.Sites[index].SiteSettings.StatusControls !== 'undefined') {
                            json.Sites[index].SiteSettings.StatusControls.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['状況による制御'] = Object.assign({}, json.Sites[index].SiteSettings.StatusControls);
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['ID'] = json.Sites[index].SiteSettings.StatusControls[index2].Id;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['名称'] = json.Sites[index].SiteSettings.StatusControls[index2].Name;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['説明'] = json.Sites[index].SiteSettings.StatusControls[index2].Description;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['状況'] = json.Sites[index].SiteSettings.StatusControls[index2].Status;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['全般'] = {};
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['全般']['読取専用'] = json.Sites[index].SiteSettings.StatusControls[index2].ReadOnly;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件'] = {};
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件']['ID'] = json.Sites[index].SiteSettings.StatusControls[index2].View.Id;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件']['未完了'] = json.Sites[index].SiteSettings.StatusControls[index2].View.Incomplete;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件']['自分'] = json.Sites[index].SiteSettings.StatusControls[index2].View.Own;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件']['期限が近い'] = json.Sites[index].SiteSettings.StatusControls[index2].View.NearCompletionTime;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件']['遅延'] = json.Sites[index].SiteSettings.StatusControls[index2].View.Delay;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件']['期限超過'] = json.Sites[index].SiteSettings.StatusControls[index2].View.Overdue;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件']['検索'] = json.Sites[index].SiteSettings.StatusControls[index2].View.Search;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['条件']['履歴も表示'] = json.Sites[index].SiteSettings.StatusControls[index2].View.ShowHistory;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['アクセス制御'] = {};
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['アクセス制御']['組織'] = json.Sites[index].SiteSettings.StatusControls[index2].Depts;
                                json['サイト情報'][index]['サイト設定']['状況による制御'][index2]['アクセス制御']['ユーザ'] = json.Sites[index].SiteSettings.StatusControls[index2].Users;
                            });
                        }
                        // ビュー
                        if (typeof json.Sites[index].SiteSettings.Views !== 'undefined') {
                            json.Sites[index].SiteSettings.Views.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['ビュー'] = Object.assign({}, json.Sites[index].SiteSettings.Views);
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['ID'] = json.Sites[index].SiteSettings.Views[index2].Id;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['名称'] = json.Sites[index].SiteSettings.Views[index2].Name;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['既定の表示'] = json.Sites[index].SiteSettings.Views[index2].DefaultMode;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['一覧の設定'] = Object.assign({}, json.Sites[index].SiteSettings.Views[index2].GridColumns);
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['フィルタと集計の設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['フィルタと集計の設定']['フィルタの表示種別'] = json.Sites[index].SiteSettings.Views[index2].FiltersDisplayType;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['フィルタと集計の設定']['集計の表示種別'] = json.Sites[index].SiteSettings.Views[index2].AggregationsDisplayType;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['コマンドボタンの設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['コマンドボタンの設定']['一括移動'] = json.Sites[index].SiteSettings.Views[index2].BulkMoveTargetsCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['コマンドボタンの設定']['一括削除'] = json.Sites[index].SiteSettings.Views[index2].BulkDeleteCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['コマンドボタンの設定']['インポート'] = json.Sites[index].SiteSettings.Views[index2].EditImportSettings;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['コマンドボタンの設定']['エクスポート'] = json.Sites[index].SiteSettings.Views[index2].OpenExportSelectorDialogCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['コマンドボタンの設定']['一括更新'] = json.Sites[index].SiteSettings.Views[index2].OpenBulkUpdateSelectorDialogCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['一覧']['コマンドボタンの設定']['編集モード'] = json.Sites[index].SiteSettings.Views[index2].EditOnGridCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルタの設定'] = Object.assign({}, json.Sites[index].SiteSettings.Views[index2].FilterColumns);
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルターの状態を保持'] = json.Sites[index].SiteSettings.Views[index2].KeepFilterState;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件']['未完了'] = json.Sites[index].SiteSettings.Views[index2].Incomplete;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件']['自分'] = json.Sites[index].SiteSettings.Views[index2].Own;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件']['期限が近い'] = json.Sites[index].SiteSettings.Views[index2].NearCompletionTime;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件']['遅延'] = json.Sites[index].SiteSettings.Views[index2].Delay;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件']['期限超過'] = json.Sites[index].SiteSettings.Views[index2].Overdue;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件']['検索'] = json.Sites[index].SiteSettings.Views[index2].Search;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件']['項目'] = json.Sites[index].SiteSettings.Views[index2].ColumnFilterHash;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['フィルタ']['フィルター条件']['履歴も表示'] = json.Sites[index].SiteSettings.Views[index2].ShowHistory;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['ソータ'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['ソータ']['ソートの状態を保持'] = json.Sites[index].SiteSettings.Views[index2].KeepSorterState;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['ソータ']['ソート条件'] = json.Sites[index].SiteSettings.Views[index2].ColumnSorterHash;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['エディタ'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['エディタ']['コマンドボタンの設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['エディタ']['コマンドボタンの設定']['更新'] = json.Sites[index].SiteSettings.Views[index2].UpdateCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['エディタ']['コマンドボタンの設定']['コピー'] = json.Sites[index].SiteSettings.Views[index2].OpenCopyDialogCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['エディタ']['コマンドボタンの設定']['参照コピー'] = json.Sites[index].SiteSettings.Views[index2].ReferenceCopyCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['エディタ']['コマンドボタンの設定']['移動'] = json.Sites[index].SiteSettings.Views[index2].MoveTargetsCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['エディタ']['コマンドボタンの設定']['メール'] = json.Sites[index].SiteSettings.Views[index2].EditOutgoingMail;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['エディタ']['コマンドボタンの設定']['削除'] = json.Sites[index].SiteSettings.Views[index2].DeleteCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カレンダー'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カレンダー']['カレンダーの設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カレンダー']['カレンダーの設定']['分類'] = json.Sites[index].SiteSettings.Views[index2].CalendarGroupBy;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カレンダー']['カレンダーの設定']['期間'] = json.Sites[index].SiteSettings.Views[index2].CalendarTimePeriod;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カレンダー']['カレンダーの設定']['項目'] = json.Sites[index].SiteSettings.Views[index2].CalendarFromTo;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カレンダー']['カレンダーの設定']['状況を表示'] = json.Sites[index].SiteSettings.Views[index2].CalendarShowStatus;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['クロス集計の設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['クロス集計の設定']['列の分類'] = json.Sites[index].SiteSettings.Views[index2].CrosstabGroupByX;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['クロス集計の設定']['行の分類'] = json.Sites[index].SiteSettings.Views[index2].CrosstabGroupByY;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['クロス集計の設定']['数値項目'] = json.Sites[index].SiteSettings.Views[index2].CrosstabColumns;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['クロス集計の設定']['集計種別'] = json.Sites[index].SiteSettings.Views[index2].CrosstabAggregateType;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['クロス集計の設定']['集計対象'] = json.Sites[index].SiteSettings.Views[index2].CrosstabValue;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['クロス集計の設定']['期間'] = json.Sites[index].SiteSettings.Views[index2].CrosstabTimePeriod;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['クロス集計の設定']['0の行を表示しない'] = json.Sites[index].SiteSettings.Views[index2].CrosstabNotShowZeroRows;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['コマンドボタンの設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['クロス集計']['コマンドボタンの設定']['エクスポート'] = json.Sites[index].SiteSettings.Views[index2].ExportCrosstabCommand;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['ガントチャート'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['ガントチャート']['ガントチャートの設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['ガントチャート']['ガントチャートの設定']['分類'] = json.Sites[index].SiteSettings.Views[index2].GanttGroupBy;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['ガントチャート']['ガントチャートの設定']['ソート'] = json.Sites[index].SiteSettings.Views[index2].GanttSortBy;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['時系列チャート'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['時系列チャート']['時系列チャートの設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['時系列チャート']['時系列チャートの設定']['分類'] = json.Sites[index].SiteSettings.Views[index2].TimeSeriesGroupBy;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['時系列チャート']['時系列チャートの設定']['集計種別'] = json.Sites[index].SiteSettings.Views[index2].TimeSeriesAggregateType;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['時系列チャート']['時系列チャートの設定']['集計対象'] = json.Sites[index].SiteSettings.Views[index2].TimeSeriesValue;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン']['カンバンの設定'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン']['カンバンの設定']['列の分類'] = json.Sites[index].SiteSettings.Views[index2].KambanGroupByX;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン']['カンバンの設定']['行の分類'] = json.Sites[index].SiteSettings.Views[index2].KambanGroupByY;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン']['カンバンの設定']['集計種別'] = json.Sites[index].SiteSettings.Views[index2].KambanAggregateType;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン']['カンバンの設定']['集計対象'] = json.Sites[index].SiteSettings.Views[index2].KambanValue;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン']['カンバンの設定']['最大列数'] = json.Sites[index].SiteSettings.Views[index2].KambanColumns;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン']['カンバンの設定']['集計表示'] = json.Sites[index].SiteSettings.Views[index2].KambanAggregationView;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['カンバン']['カンバンの設定']['状況を表示'] = json.Sites[index].SiteSettings.Views[index2].KambanShowStatus;
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['アクセス制御'] = {};
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['アクセス制御']['組織'] = Object.assign({}, json.Sites[index].SiteSettings.Views[index2].Depts);
                                json['サイト情報'][index]['サイト設定']['ビュー'][index2]['アクセス制御']['ユーザ'] = Object.assign({}, json.Sites[index].SiteSettings.Views[index2].Users);
                            });
                        }
                        // 通知
                        if (typeof json.Sites[index].SiteSettings.Notifications !== 'undefined') {
                            json.Sites[index].SiteSettings.Notifications.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['通知'] = Object.assign({}, json.Sites[index].SiteSettings.Notifications);
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['ID'] = json.Sites[index].SiteSettings.Notifications[index2].Id;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['通知種別'] = json.Sites[index].SiteSettings.Notifications[index2].Type;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['プレフィックス'] = json.Sites[index].SiteSettings.Notifications[index2].Prefix;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['アドレス'] = json.Sites[index].SiteSettings.Notifications[index2].Address;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['カスタムデザインを使用'] = json.Sites[index].SiteSettings.Notifications[index2].UseCustomFormat;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['書式'] = json.Sites[index].SiteSettings.Notifications[index2].Format;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['変更前の条件'] = json.Sites[index].SiteSettings.Notifications[index2].BeforeCondition;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['論理式'] = json.Sites[index].SiteSettings.Notifications[index2].AfterCondition;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['変更後の条件'] = json.Sites[index].SiteSettings.Notifications[index2].Expression;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['作成後'] = json.Sites[index].SiteSettings.Notifications[index2].AfterCreate;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['更新後'] = json.Sites[index].SiteSettings.Notifications[index2].AfterUpdate;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['削除後'] = json.Sites[index].SiteSettings.Notifications[index2].AfterDelete;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['コピー後'] = json.Sites[index].SiteSettings.Notifications[index2].AfterCopy;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['一括更新後'] = json.Sites[index].SiteSettings.Notifications[index2].AfterBulkUpdate;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['一括削除後'] = json.Sites[index].SiteSettings.Notifications[index2].AfterBulkDelete;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['インポート後'] = json.Sites[index].SiteSettings.Notifications[index2].AfterImport;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['無効'] = json.Sites[index].SiteSettings.Notifications[index2].Disabled;
                                json['サイト情報'][index]['サイト設定']['通知'][index2]['変更を監視する項目'] = Object.assign({}, json.Sites[index].SiteSettings.Notifications[index2].MonitorChangesColumns);
                            });
                        }
                        // リマインダー
                        if (typeof json.Sites[index].SiteSettings.Reminders !== 'undefined') {
                            json.Sites[index].SiteSettings.Reminders.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['リマインダー'] = Object.assign({}, json.Sites[index].SiteSettings.Reminders);
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['ID'] = json.Sites[index].SiteSettings.Reminders[index2].Id;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['リマインダー種別'] = json.Sites[index].SiteSettings.Reminders[index2].ReminderType;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['件名'] = json.Sites[index].SiteSettings.Reminders[index2].Subject;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['内容'] = json.Sites[index].SiteSettings.Reminders[index2].Body;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['行'] = json.Sites[index].SiteSettings.Reminders[index2].Line;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['宛先'] = json.Sites[index].SiteSettings.Reminders[index2].To;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['項目'] = json.Sites[index].SiteSettings.Reminders[index2].Column;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['開始日時'] = json.Sites[index].SiteSettings.Reminders[index2].StartDateTime;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['期間種別'] = json.Sites[index].SiteSettings.Reminders[index2].Type;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['範囲'] = json.Sites[index].SiteSettings.Reminders[index2].Range;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['過去に完了したものも送信'] = json.Sites[index].SiteSettings.Reminders[index2].SendCompletedInPast;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['該当が無い場合は送信しない'] = json.Sites[index].SiteSettings.Reminders[index2].NotSendIfNotApplicable;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['URLを送信しない'] = json.Sites[index].SiteSettings.Reminders[index2].NotSendHyperLink;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['期限切れを送信しない'] = json.Sites[index].SiteSettings.Reminders[index2].ExcludeOverdue;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['条件'] = json.Sites[index].SiteSettings.Reminders[index2].Condition;
                                json['サイト情報'][index]['サイト設定']['リマインダー'][index2]['無効'] = json.Sites[index].SiteSettings.Reminders[index2].Disabled;
                            });
                        }
                        // インポート
                        json['サイト情報'][index]['サイト設定']['インポート'] = {};
                        json['サイト情報'][index]['サイト設定']['インポート']['文字コード'] = json.Sites[index].SiteSettings.ImportEncoding;
                        json['サイト情報'][index]['サイト設定']['インポート']['キーが一致するレコードを更新する'] = json.Sites[index].SiteSettings.UpdatableImport;
                        json['サイト情報'][index]['サイト設定']['インポート']['既定のインポートキー'] = json.Sites[index].SiteSettings.DefaultImportKey;
                        // エクスポート
                        if (typeof json.Sites[index].SiteSettings.Exports !== 'undefined') {
                            json.Sites[index].SiteSettings.Exports.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['エクスポート'] = Object.assign({}, json.Sites[index].SiteSettings.Exports);
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般'] = {};
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般']['ID'] = json.Sites[index].SiteSettings.Exports[index2].Id;
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般']['名称'] = json.Sites[index].SiteSettings.Exports[index2].Name;
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般']['エクスポートの種類'] = json.Sites[index].SiteSettings.Exports[index2].Type;
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般']['区切り文字'] = json.Sites[index].SiteSettings.Exports[index2].DelimiterType;
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般']['ダブルクォートで囲う'] = json.Sites[index].SiteSettings.Exports[index2].EncloseDoubleQuotes;
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般']['エクスポート方式'] = json.Sites[index].SiteSettings.Exports[index2].ExecutionType;
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般']['ヘッダを出力する'] = json.Sites[index].SiteSettings.Exports[index2].Header;
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['全般']['エクスポートする項目'] = Object.assign({}, json.Sites[index].SiteSettings.Exports[index2].Columns);
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['アクセス制御'] = {};
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['アクセス制御']['組織'] = Object.assign({}, json.Sites[index].SiteSettings.Exports[index2].Depts);
                                json['サイト情報'][index]['サイト設定']['エクスポート'][index2]['アクセス制御']['ユーザ'] = Object.assign({}, json.Sites[index].SiteSettings.Exports[index2].Users);
                            });
                        }
                        // カレンダー
                        json['サイト情報'][index]['サイト設定']['カレンダー'] = {};
                        json['サイト情報'][index]['サイト設定']['カレンダー']['有効'] = json.Sites[index].SiteSettings.EnableCalendar;
                        // クロス集計
                        json['サイト情報'][index]['サイト設定']['クロス集計'] = {};
                        json['サイト情報'][index]['サイト設定']['クロス集計']['有効'] = json.Sites[index].SiteSettings.EnableCrosstab;
                        json['サイト情報'][index]['サイト設定']['クロス集計']['グラフを表示しない'] = json.Sites[index].SiteSettings.NoDisplayCrosstabGraph;
                        // ガントチャート
                        json['サイト情報'][index]['サイト設定']['ガントチャート'] = {};
                        json['サイト情報'][index]['サイト設定']['ガントチャート']['有効'] = json.Sites[index].SiteSettings.EnableGantt;
                        json['サイト情報'][index]['サイト設定']['ガントチャート']['進捗率を表示'] = json.Sites[index].SiteSettings.ShowGanttProgressRate;
                        // バーンダウンチャート
                        json['サイト情報'][index]['サイト設定']['バーンダウンチャート'] = {};
                        json['サイト情報'][index]['サイト設定']['バーンダウンチャート']['有効'] = json.Sites[index].SiteSettings.EnableBurnDown;
                        // 時系列チャート
                        json['サイト情報'][index]['サイト設定']['時系列チャート'] = {};
                        json['サイト情報'][index]['サイト設定']['時系列チャート']['有効'] = json.Sites[index].SiteSettings.EnableTimeSeries;
                        // カンバン
                        json['サイト情報'][index]['サイト設定']['カンバン'] = {};
                        json['サイト情報'][index]['サイト設定']['カンバン']['有効'] = json.Sites[index].SiteSettings.EnableKamban;
                        // 画像ライブラリ
                        json['サイト情報'][index]['サイト設定']['画像ライブラリ'] = {};
                        json['サイト情報'][index]['サイト設定']['画像ライブラリ']['有効'] = json.Sites[index].SiteSettings.EnableImageLib;
                        json['サイト情報'][index]['サイト設定']['画像ライブラリ']['ページ当たりの表示件数'] = json.Sites[index].SiteSettings.ImageLibPageSize;
                        // 検索
                        json['サイト情報'][index]['サイト設定']['検索'] = {};
                        json['サイト情報'][index]['サイト設定']['検索']['検索の種類'] = json.Sites[index].SiteSettings.SearchType;
                        json['サイト情報'][index]['サイト設定']['検索']['横断検索を無効化'] = json.Sites[index].SiteSettings.DisableCrossSearch;
                        json['サイト情報'][index]['サイト設定']['検索']['パンくずリストを含める'] = json.Sites[index].SiteSettings.FullTextIncludeBreadcrumb;
                        json['サイト情報'][index]['サイト設定']['検索']['サイトIDを含める'] = json.Sites[index].SiteSettings.FullTextIncludeSiteId;
                        json['サイト情報'][index]['サイト設定']['検索']['サイトのタイトルを含める'] = json.Sites[index].SiteSettings.FullTextIncludeSiteTitle;
                        json['サイト情報'][index]['サイト設定']['検索']['メールの件数'] = json.Sites[index].SiteSettings.FullTextNumberOfMails;
                        // メール
                        json['サイト情報'][index]['サイト設定']['メール'] = {};
                        json['サイト情報'][index]['サイト設定']['メール']['既定のアドレス帳'] = json.Sites[index].SiteSettings.AddressBook;
                        json['サイト情報'][index]['サイト設定']['メール']['既定の宛先To'] = json.Sites[index].SiteSettings.MailToDefault;
                        json['サイト情報'][index]['サイト設定']['メール']['既定の宛先Cc'] = json.Sites[index].SiteSettings.MailCcDefault;
                        json['サイト情報'][index]['サイト設定']['メール']['既定の宛先Bcc'] = json.Sites[index].SiteSettings.MailBccDefault;
                        // サイト統合
                        json['サイト情報'][index]['サイト設定']['サイト統合'] = {};
                        json['サイト情報'][index]['サイト設定']['サイト統合']['サイトID'] = json.Sites[index].SiteSettings.IntegratedSites;
                        // スタイル
                        if (typeof json.Sites[index].SiteSettings.Styles !== 'undefined') {
                            json.Sites[index].SiteSettings.Styles.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['スタイル'] = Object.assign({}, json.Sites[index].SiteSettings.Styles);
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['ID'] = json.Sites[index].SiteSettings.Styles[index2].Id;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['タイトル'] = json.Sites[index].SiteSettings.Styles[index2].Title;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['スタイル'] = json.Sites[index].SiteSettings.Styles[index2].Body;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先'] = {};
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['新規作成'] = json.Sites[index].SiteSettings.Styles[index2].New;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['編集'] = json.Sites[index].SiteSettings.Styles[index2].Edit;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['一覧'] = json.Sites[index].SiteSettings.Styles[index2].index;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['カレンダー'] = json.Sites[index].SiteSettings.Styles[index2].Calendar;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['クロス集計'] = json.Sites[index].SiteSettings.Styles[index2].Crosstab;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['ガントチャート'] = json.Sites[index].SiteSettings.Styles[index2].Gantt;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['バーンダウンチャート'] = json.Sites[index].SiteSettings.Styles[index2].BurnDown;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['時系列チャート'] = json.Sites[index].SiteSettings.Styles[index2].TimeSeries;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['カンバン'] = json.Sites[index].SiteSettings.Styles[index2].Kamban;
                                json['サイト情報'][index]['サイト設定']['スタイル'][index2]['出力先']['画像ライブラリ'] = json.Sites[index].SiteSettings.Styles[index2].ImageLib;
                            });
                        }
                        // スクリプト
                        if (typeof json.Sites[index].SiteSettings.Scripts !== 'undefined') {
                            json.Sites[index].SiteSettings.Scripts.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['スクリプト'] = Object.assign({}, json.Sites[index].SiteSettings.Scripts);
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['ID'] = json.Sites[index].SiteSettings.Scripts[index2].Id;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['タイトル'] = json.Sites[index].SiteSettings.Scripts[index2].Title;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['スクリプト'] = json.Sites[index].SiteSettings.Scripts[index2].Body;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先'] = {};
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['新規作成'] = json.Sites[index].SiteSettings.Scripts[index2].New;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['編集'] = json.Sites[index].SiteSettings.Scripts[index2].Edit;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['一覧'] = json.Sites[index].SiteSettings.Scripts[index2].index;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['カレンダー'] = json.Sites[index].SiteSettings.Scripts[index2].Calendar;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['クロス集計'] = json.Sites[index].SiteSettings.Scripts[index2].Crosstab;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['ガントチャート'] = json.Sites[index].SiteSettings.Scripts[index2].Gantt;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['バーンダウンチャート'] = json.Sites[index].SiteSettings.Scripts[index2].BurnDown;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['時系列チャート'] = json.Sites[index].SiteSettings.Scripts[index2].TimeSeries;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['カンバン'] = json.Sites[index].SiteSettings.Scripts[index2].Kamban;
                                json['サイト情報'][index]['サイト設定']['スクリプト'][index2]['出力先']['画像ライブラリ'] = json.Sites[index].SiteSettings.Scripts[index2].ImageLib;
                            });
                        }
                        // HTML
                        json['サイト情報'][index]['サイト設定']['HTML'] = {};
                        // サーバスクリプト
                        if (typeof json.Sites[index].SiteSettings.ServerScripts !== 'undefined') {
                            json.Sites[index].SiteSettings.ServerScripts.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'] = Object.assign({}, json.Sites[index].SiteSettings.ServerScripts);
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['ID'] = json.Sites[index].SiteSettings.ServerScripts[index2].Id;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['タイトル'] = json.Sites[index].SiteSettings.ServerScripts[index2].Title;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['名称'] = json.Sites[index].SiteSettings.ServerScripts[index2].Name;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['スクリプト'] = json.Sites[index].SiteSettings.ServerScripts[index2].Body;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件'] = {};
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['サイト設定の読み込み時'] = json.Sites[index].SiteSettings.ServerScripts[index2].WhenloadingSiteSettings;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['ビュー処理時'] = json.Sites[index].SiteSettings.ServerScripts[index2].WhenViewProcessing;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['レコード読み込み時'] = json.Sites[index].SiteSettings.ServerScripts[index2].WhenloadingRecord;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['計算式の前'] = {};
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['計算式の後'] = json.Sites[index].SiteSettings.ServerScripts[index2].AfterFormula;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['作成前'] = json.Sites[index].SiteSettings.ServerScripts[index2].BeforeCreate;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['作成後'] = json.Sites[index].SiteSettings.ServerScripts[index2].AfterCreate;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['更新前'] = json.Sites[index].SiteSettings.ServerScripts[index2].BeforeUpdate;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['更新後'] = json.Sites[index].SiteSettings.ServerScripts[index2].AfterUpdate;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['削除前'] = json.Sites[index].SiteSettings.ServerScripts[index2].BeforeDelete;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['削除後'] = json.Sites[index].SiteSettings.ServerScripts[index2].AfterDelete;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['画面表示の前'] = json.Sites[index].SiteSettings.ServerScripts[index2].BeforeOpeningPage;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['行表示の前'] = json.Sites[index].SiteSettings.ServerScripts[index2].BeforeOpeningRow;
                                json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2]['条件']['共有'] = json.Sites[index].SiteSettings.ServerScripts[index2].Shared;
                            });
                        }
                        // 公開
                        json['サイト情報'][index]['サイト設定']['公開'] = {};
                        json['サイト情報'][index]['サイト設定']['公開']['匿名ユーザに公開する'] = json.Sites[index].SiteSettings.Publish;
                        // サイトのアクセス制御
                        json['サイト情報'][index]['サイト設定']['サイトのアクセス制御'] = {};
                        json['サイト情報'][index]['サイト設定']['サイトのアクセス制御']['サイトのアクセス制御'] = Object.assign({}, json.Permissions);
                        json['サイト情報'][index]['サイト設定']['サイトのアクセス制御']['ID一覧'] = json.PermissionIdList;
                        json['サイト情報'][index]['サイト設定']['サイトのアクセス制御']['読取専用の場合は画面に表示しない'] = json.Sites[index].SiteSettings.NoDisplayIfReadOnly;
                        // レコードのアクセス制御
                        json['サイト情報'][index]['サイト設定']['レコードのアクセス制御'] = {};
                        json['サイト情報'][index]['サイト設定']['レコードのアクセス制御']['レコード作成時の許可'] = json.Sites[index].SiteSettings.PermissionForCreating;
                        json['サイト情報'][index]['サイト設定']['レコードのアクセス制御']['レコード更新時の許可'] = json.Sites[index].SiteSettings.PermissionForUpdating;
                        // 項目のアクセス制御
                        json['サイト情報'][index]['サイト設定']['項目のアクセス制御'] = {};
                        json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['作成時のアクセス制御'] = Object.assign({}, json.Sites[index].SiteSettings.CreateColumnAccessControls);
                        json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['読取り時のアクセス制御'] = Object.assign({}, json.Sites[index].SiteSettings.ReadColumnAccessControls);
                        json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'] = Object.assign({}, json.Sites[index].SiteSettings.UpdateColumnAccessControls);
                        if (typeof json.Sites[index].SiteSettings.UpdateColumnAccessControls !== 'undefined') {
                            json.Sites[index].SiteSettings.UpdateColumnAccessControls.forEach(function (element, index2) {
                                json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2]['項目名'] = json.Sites[index].SiteSettings.UpdateColumnAccessControls[index2].ColumnName;
                                if (typeof json.Sites[index].SiteSettings.UpdateColumnAccessControls[index2].Depts !== 'undefined') {
                                    json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2]['組織'] = Object.assign({}, json.Sites[index].SiteSettings.UpdateColumnAccessControls[index2].Depts);
                                }
                                if (typeof json.Sites[index].SiteSettings.UpdateColumnAccessControls[index2].Groups !== 'undefined') {
                                    json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2]['グループ'] = Object.assign({}, json.Sites[index].SiteSettings.UpdateColumnAccessControls[index2].Groups);
                                }
                                if (typeof json.Sites[index].SiteSettings.UpdateColumnAccessControls[index2].Users !== 'undefined') {
                                    json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2]['ユーザ'] = Object.assign({}, json.Sites[index].SiteSettings.UpdateColumnAccessControls[index2].Users);
                                }
                            });
                        }
                        // 変更履歴の一覧
                        json['サイト情報'][index]['サイト設定']['変更履歴の一覧'] = {};
                        // コメント
                        json['サイト情報'][index]['サイト設定']['コメント'] = json.Sites[index].SiteSettings.Comments;
                    });
                    // 不要なプロパティを削除する
                    delete json.HeaderInfo;
                    delete json.Sites;
                    delete json['ヘッダ情報'].AssemblyVersion;
                    delete json['ヘッダ情報'].BaseSiteId;
                    delete json['ヘッダ情報'].Server;
                    delete json['ヘッダ情報'].CreatorName;
                    delete json['ヘッダ情報'].PackageTime;
                    delete json['ヘッダ情報'].Convertors;
                    Object.values(json['サイト情報']).forEach(function (element, index) {
                        delete json['ヘッダ情報']['サイト情報'][index].SiteId;
                        delete json['ヘッダ情報']['サイト情報'][index].SiteTitle;
                        delete json['ヘッダ情報']['サイト情報'][index].ReferenceType;
                        delete json['ヘッダ情報']['サイト情報'][index].IncludeData;
                    });
                    delete json['ヘッダ情報'].IncludeSitePermission;
                    delete json['ヘッダ情報'].IncludeRecordPermission;
                    delete json['ヘッダ情報'].IncludeColumnPermission;
                    delete json['ヘッダ情報'].IncludeNotifications;
                    delete json['ヘッダ情報'].IncludeReminders;
                    Object.values(json['サイト情報']).forEach(function (element, index) {
                        delete json['サイト情報'][index]['サイト設定'].Styles;
                        delete json['サイト情報'][index]['サイト設定'].Scripts;
                        delete json['サイト情報'][index]['サイト設定'].ServerScripts;
                        delete json['サイト情報'][index]['サイト設定'].UseFilterButton;
                        delete json['サイト情報'][index]['サイト設定'].UseFiltersArea;
                        delete json['サイト情報'][index]['サイト設定'].UseNegativeFilters;
                        delete json['サイト情報'][index]['サイト設定'].UseRelatingColumnsOnFilter;
                        delete json['サイト情報'][index]['サイト設定'].UseIncompleteFilter;
                        delete json['サイト情報'][index]['サイト設定'].UseOwnFilter;
                        delete json['サイト情報'][index]['サイト設定'].UseNearCompletionTimeFilter;
                        delete json['サイト情報'][index]['サイト設定'].UseDelayFilter;
                        delete json['サイト情報'][index]['サイト設定'].UseOverdueFilter;
                        delete json['サイト情報'][index]['サイト設定'].UseSearchFilter;
                        // 基本情報
                        delete json['サイト情報'][index].TenantId;
                        delete json['サイト情報'][index].ParentId;
                        delete json['サイト情報'][index].InheritPermission;
                        delete json['サイト情報'][index].ReferenceType;
                        delete json['サイト情報'][index]['サイト設定'].ReferenceType;
                        delete json['サイト情報'][index]['サイト設定'].Version;
                        delete json['サイト情報'][index].SiteSettings;
                        // 全般
                        delete json['サイト情報'][index].SiteId;
                        delete json['サイト情報'][index].Title;
                        delete json['サイト情報'][index].SiteName;
                        delete json['サイト情報'][index].SiteGroupName;
                        delete json['サイト情報'][index].Body;
                        // ガイド
                        delete json['サイト情報'][index].GridGuide;
                        delete json['サイト情報'][index].EditorGuide;
                        delete json['サイト情報'][index].CalendarGuide;
                        delete json['サイト情報'][index].CrosstabGuide;
                        delete json['サイト情報'][index].GanttGuide;
                        delete json['サイト情報'][index].BurnDownGuide;
                        delete json['サイト情報'][index].TimeSeriesGuide;
                        delete json['サイト情報'][index].KambanGuide;
                        delete json['サイト情報'][index].ImageLibGuide;
                        // サイト画像
                        // 一覧
                        delete json['サイト情報'][index]['サイト設定'].GridColumns;
                        delete json['サイト情報'][index]['サイト設定'].GridPageSize;
                        delete json['サイト情報'][index]['サイト設定'].GridEditorType;
                        delete json['サイト情報'][index]['サイト設定'].HistoryOnGrid;
                        delete json['サイト情報'][index]['サイト設定'].AlwaysRequestSearchCondition;
                        delete json['サイト情報'][index]['サイト設定'].DisableLinkToEdit;
                        // フィルタ
                        delete json['サイト情報'][index]['サイト設定'].FilterColumns;
                        delete json['サイト情報'][index]['サイト設定'].NearCompletionTimeAfterDays;
                        delete json['サイト情報'][index]['サイト設定'].NearCompletionTimeBeforeDays;
                        // 集計
                        delete json['サイト情報'][index]['サイト設定'].Aggregations;
                        if (typeof json['サイト情報'][index]['サイト設定']['集計']['集計の設定'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['集計']['集計の設定']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定']['集計']['集計の設定'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['集計']['集計の設定'][index2].GroupBy;
                                delete json['サイト情報'][index]['サイト設定']['集計']['集計の設定'][index2].Type;
                                delete json['サイト情報'][index]['サイト設定']['集計']['集計の設定'][index2].Target;
                            });
                        }
                        // エディタ
                        if (typeof json['サイト情報'][index]['サイト設定']['エディタ']['エディタの設定'] !== 'undefined')
                            delete json['サイト情報'][index]['サイト設定']['エディタ']['エディタの設定'].General
                        if (typeof json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'] !== 'undefined')
                            Object.values(json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定'].EditorColumnHash;
                                delete json['サイト情報'][index]['サイト設定'].Columns;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ColumnName;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].LabelText;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].TextAlign;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].MaxLength;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].FieldCss;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ValidateRequired;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].AllowBulkUpdate;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].NoDuplication;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].MessageWhenDuplicated;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].CopyByDefault;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].EditorReadOnly;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ImportKey;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].DefaultInput;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].Description;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].InputGuide;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ChoicesText;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ChoicesControlType;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].UseSearch;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].MultipleSelections;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].NotInsertBlankChoice;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].Anchor;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].OpenAnchorNewTab;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].AnchorFormat;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].AutoPostBack;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ColumnsReturnedWhenAutomaticPostback;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].NoWrap;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].Hide;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ExtendedFieldCss;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ExtendedControlCss;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].FullTextType;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].AutoNumberingFormat;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].AutoNumberingResetType;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].AutoNumberingDefault;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].AutoNumberingStep;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ClientRegexValidation;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ServerRegexValidation;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].RegexValidationMessage;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ExtendedHtmlBeforeField;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ExtendedHtmlBeforeLabel;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ExtendedHtmlBetweenLabelAndControl;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ExtendedHtmlAfterControl;
                                delete json['サイト情報'][index]['サイト設定']['エディタ']['詳細設定'][index2].ExtendedHtmlAfterField;
                            });
                        delete json['サイト情報'][index]['サイト設定'].SectionLatestId;
                        delete json['サイト情報'][index]['サイト設定'].Sections;
                        delete json['サイト情報'][index]['サイト設定'].BulkUpdateColumns;
                        delete json['サイト情報'][index]['サイト設定'].Links;
                        delete json['サイト情報'][index]['サイト設定'].TabLatestId;
                        delete json['サイト情報'][index]['サイト設定'].Tabs;
                        delete json['サイト情報'][index]['サイト設定'].RelatingColumns;
                        delete json['サイト情報'][index]['サイト設定'].AutoVerUpType;
                        delete json['サイト情報'][index]['サイト設定'].AllowEditingComments;
                        delete json['サイト情報'][index]['サイト設定'].AllowCopy;
                        delete json['サイト情報'][index]['サイト設定'].AllowReferenceCopy;
                        delete json['サイト情報'][index]['サイト設定'].CharToAddWhenCopying;
                        delete json['サイト情報'][index]['サイト設定'].AllowSeparate;
                        delete json['サイト情報'][index]['サイト設定'].AllowLockTable;
                        delete json['サイト情報'][index]['サイト設定'].HideLink;
                        delete json['サイト情報'][index]['サイト設定'].SwitchRecordWithAjax;
                        delete json['サイト情報'][index]['サイト設定'].SwitchCommandButtonsAutoPostBack;
                        delete json['サイト情報'][index]['サイト設定'].DeleteImageWhenDeleting;
                        // リンク
                        delete json['サイト情報'][index]['サイト設定'].LinkColumns;
                        // 履歴
                        delete json['サイト情報'][index]['サイト設定'].HistoryColumns;
                        delete json['サイト情報'][index]['サイト設定'].AllowRestoreHistories;
                        delete json['サイト情報'][index]['サイト設定'].AllowPhysicalDeleteHistories;
                        // 移動
                        delete json['サイト情報'][index]['サイト設定'].MoveTargets;
                        // サマリ
                        delete json['サイト情報'][index]['サイト設定'].Summaries;
                        if (typeof json['サイト情報'][index]['サイト設定']['サマリ'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['サマリ']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定']['サマリ'][index2].SiteId;
                                delete json['サイト情報'][index]['サイト設定']['サマリ'][index2].DestinationReferenceType;
                                delete json['サイト情報'][index]['サイト設定']['サマリ'][index2].DestinationColumn;
                                delete json['サイト情報'][index]['サイト設定']['サマリ'][index2].LinkColumn;
                                delete json['サイト情報'][index]['サイト設定']['サマリ'][index2].Type;
                                delete json['サイト情報'][index]['サイト設定']['サマリ'][index2].Id;
                            });
                        }
                        // 計算式
                        delete json['サイト情報'][index]['サイト設定'].Formulas;
                        if (typeof json['サイト情報'][index]['サイト設定']['計算式'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['計算式']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定']['計算式'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['計算式'][index2].Target;
                                delete json['サイト情報'][index]['サイト設定']['計算式'][index2].Formula;
                            });
                        }
                        // プロセス
                        if (typeof json['サイト情報'][index]['サイト設定']['プロセス'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['プロセス']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定'].Processes;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].Name;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].DisplayName;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].ScreenType;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].CurrentStatus;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].ChangedStatus;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].Description;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].Tooltip;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].ConfirmationMessage;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].SuccessMessage;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].OnClick;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].ExecutionType;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].ActionType;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].AllowBulkProcessing;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].ValidationType;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].ValidateInputs;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].View;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].ErrorMessage;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].Depts;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].Users;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].DataChanges;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].AutoNumbering;
                                delete json['サイト情報'][index]['サイト設定']['プロセス'][index2].Notifications;
                            });
                        }
                        // 状況による制御
                        if (typeof json['サイト情報'][index]['サイト設定']['状況による制御'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['状況による制御']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定'].StatusControls;
                                delete json['サイト情報'][index]['サイト設定']['状況による制御'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['状況による制御'][index2].Name;
                                delete json['サイト情報'][index]['サイト設定']['状況による制御'][index2].Description;
                                delete json['サイト情報'][index]['サイト設定']['状況による制御'][index2].Status;
                                delete json['サイト情報'][index]['サイト設定']['状況による制御'][index2].ReadOnly;
                                delete json['サイト情報'][index]['サイト設定']['状況による制御'][index2].View;
                                delete json['サイト情報'][index]['サイト設定']['状況による制御'][index2].Depts;
                                delete json['サイト情報'][index]['サイト設定']['状況による制御'][index2].Users;
                            });
                        }
                        // ビュー
                        if (typeof json['サイト情報'][index]['サイト設定']['ビュー'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['ビュー']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定'].ViewLatestId;
                                delete json['サイト情報'][index]['サイト設定'].Views;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Name;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].DefaultMode;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].GridColumns;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].FiltersDisplayType;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].AggregationsDisplayType;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].BulkMoveTargetsCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].BulkDeleteCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].EditImportSettings;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].OpenExportSelectorDialogCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].OpenBulkUpdateSelectorDialogCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].EditOnGridCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].FilterColumns;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KeepFilterState;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Incomplete;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Own;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].NearCompletionTime;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Delay;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Overdue;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Search;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].ColumnFilterHash;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].ShowHistory;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KeepSorterState;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].ColumnSorterHash;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].UpdateCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].OpenCopyDialogCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].ReferenceCopyCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].MoveTargetsCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].EditOutgoingMail;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].DeleteCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CalendarGroupBy;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CalendarTimePeriod;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CalendarFromTo;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CalendarShowStatus;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CrosstabGroupByX;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CrosstabGroupByY;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CrosstabColumns;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CrosstabAggregateType;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CrosstabValue;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CrosstabTimePeriod;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].CrosstabNotShowZeroRows;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].ExportCrosstabCommand;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].GanttGroupBy;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].GanttSortBy;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].TimeSeriesGroupBy;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].TimeSeriesAggregateType;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].TimeSeriesValue;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KambanGroupByX;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KambanGroupByY;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KambanAggregateType;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KambanValue;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KambanColumns;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KambanAggregationView;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].KambanShowStatus;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Depts;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].Users;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].ApiColumnKeyDisplayType;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].ApiColumnValueDisplayType;
                                delete json['サイト情報'][index]['サイト設定']['ビュー'][index2].ApiDataType;
                            });
                        }
                        // 通知
                        if (typeof json['サイト情報'][index]['サイト設定']['通知'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['通知']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定'].Notifications;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].Type;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].Prefix;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].Address;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].UseCustomFormat;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].Format;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].BeforeCondition;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].AfterCondition;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].Expression;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].AfterCreate;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].AfterUpdate;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].AfterDelete;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].AfterCopy;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].AfterBulkUpdate;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].AfterBulkDelete;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].AfterImport;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].Disabled;
                                delete json['サイト情報'][index]['サイト設定']['通知'][index2].MonitorChangesColumns;
                            });
                        }
                        // リマインダー
                        if (typeof json['サイト情報'][index]['サイト設定']['リマインダー'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['リマインダー']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定'].Reminders;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].ReminderType;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Subject;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Body;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Line;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].To;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Column;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].StartDateTime;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Type;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Range;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].SendCompletedInPast;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].NotSendIfNotApplicable;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].NotSendHyperLink;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].ExcludeOverdue;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Condition;
                                delete json['サイト情報'][index]['サイト設定']['リマインダー'][index2].Disabled;
                            });
                        }
                        // インポート
                        delete json['サイト情報'][index]['サイト設定'].ImportEncoding;
                        delete json['サイト情報'][index]['サイト設定'].UpdatableImport;
                        delete json['サイト情報'][index]['サイト設定'].DefaultImportKey;
                        // エクスポート
                        if (typeof json['サイト情報'][index]['サイト設定']['エクスポート'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['エクスポート']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定'].Exports;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].Name;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].Type;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].DelimiterType;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].EncloseDoubleQuotes;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].ExecutionType;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].Header;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].Columns;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].Depts;
                                delete json['サイト情報'][index]['サイト設定']['エクスポート'][index2].Users;
                            });
                        }
                        // カレンダー
                        delete json['サイト情報'][index]['サイト設定'].EnableCalendar;
                        // クロス集計
                        delete json['サイト情報'][index]['サイト設定'].EnableCrosstab;
                        delete json['サイト情報'][index]['サイト設定'].NoDisplayCrosstabGraph;
                        // ガントチャート
                        delete json['サイト情報'][index]['サイト設定'].EnableGantt;
                        delete json['サイト情報'][index]['サイト設定'].ShowGanttProgressRate;
                        // バーンダウンチャート
                        delete json['サイト情報'][index]['サイト設定'].EnableBurnDown;
                        // 時系列チャート
                        delete json['サイト情報'][index]['サイト設定'].EnableTimeSeries;
                        // カンバン
                        delete json['サイト情報'][index]['サイト設定'].EnableKamban;
                        // 画像ライブラリ
                        delete json['サイト情報'][index]['サイト設定'].EnableImageLib;
                        delete json['サイト情報'][index]['サイト設定'].ImageLibPageSize;
                        // 検索
                        delete json['サイト情報'][index]['サイト設定'].SearchType;
                        delete json['サイト情報'][index].DisableCrossSearch;
                        delete json['サイト情報'][index]['サイト設定'].FullTextIncludeBreadcrumb;
                        delete json['サイト情報'][index]['サイト設定'].FullTextIncludeSiteId;
                        delete json['サイト情報'][index]['サイト設定'].FullTextIncludeSiteTitle;
                        delete json['サイト情報'][index]['サイト設定'].FullTextNumberOfMails;
                        // メール
                        delete json['サイト情報'][index]['サイト設定'].AddressBook;
                        delete json['サイト情報'][index]['サイト設定'].MailToDefault;
                        delete json['サイト情報'][index]['サイト設定'].MailCcDefault;
                        delete json['サイト情報'][index]['サイト設定'].MailBccDefault;
                        // サイト統合
                        delete json['サイト情報'][index]['サイト設定'].IntegratedSites;
                        // スタイル
                        if (typeof json['サイト情報'][index]['サイト設定']['スタイル'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['スタイル']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].Title;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].Body;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].New;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].Edit;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].index2;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].Calendar;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].Crosstab;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].Gantt;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].BurnDown;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].TimeSeries;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].Kamban;
                                delete json['サイト情報'][index]['サイト設定']['スタイル'][index2].ImageLib;
                            });
                        }
                        // スクリプト
                        if (typeof json['サイト情報'][index]['サイト設定']['スクリプト'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['スクリプト']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].Title;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].Body;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].New;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].Edit;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].index2;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].Calendar;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].Crosstab;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].Gantt;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].BurnDown;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].TimeSeries;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].Kamban;
                                delete json['サイト情報'][index]['サイト設定']['スクリプト'][index2].ImageLib;
                            });
                        }
                        // HTML
                        // サーバスクリプト
                        if (typeof json['サイト情報'][index]['サイト設定']['サーバスクリプト'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['サーバスクリプト']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].Id;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].Title;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].Name;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].Body;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].WhenloadingSiteSettings;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].WhenViewProcessing;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].WhenloadingRecord;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].AfterFormula;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].BeforeCreate;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].AfterCreate;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].BeforeUpdate;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].AfterUpdate;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].BeforeDelete;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].AfterDelete;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].BeforeOpeningPage;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].BeforeOpeningRow;
                                delete json['サイト情報'][index]['サイト設定']['サーバスクリプト'][index2].Shared;
                            });
                        }
                        // 公開
                        delete json['サイト情報'][index].Publish;
                        // サイトのアクセス制御
                        delete json.Permissions;
                        delete json.PermissionIdList;
                        delete json['サイト情報'][index]['サイト設定'].NoDisplayIfReadOnly;
                        // レコードのアクセス制御
                        delete json['サイト情報'][index]['サイト設定'].PermissionForCreating;
                        delete json['サイト情報'][index]['サイト設定'].PermissionForUpdating;
                        // 項目のアクセス制御
                        delete json['サイト情報'][index]['サイト設定'].CreateColumnAccessControls;
                        delete json['サイト情報'][index]['サイト設定'].ReadColumnAccessControls;
                        delete json['サイト情報'][index]['サイト設定'].UpdateColumnAccessControls;
                        if (typeof json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'] !== 'undefined') {
                            Object.values(json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御']).forEach(function (element, index2) {
                                delete json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2].ColumnName;
                                if (typeof json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2].Depts !== 'undefined') {
                                    delete json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2].Depts;
                                }
                                if (typeof json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2].Groups !== 'undefined') {
                                    delete json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2].Groups;
                                }
                                if (typeof json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2].Users !== 'undefined') {
                                    delete json['サイト情報'][index]['サイト設定']['項目のアクセス制御']['更新時のアクセス制御'][index2].Users;
                                }
                            });
                        }
                        // 変更履歴の一覧
                        // コメント
                        delete json['サイト情報'][index].Comments;
                        // データを含む場合は削除
                        delete json.Data;
                    });
                    // Displaying the JS Object/Array
                    $('#jsonView').jsonTable(json, options);
                };
                f_reader.readAsText(input_file);
            } else {
                alert("サイトパッケージを選択してください。");
                return false;
            }
        });
    } else {
        alert("File API is not available");
        return false;
    }
});
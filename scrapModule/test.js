var app = require('./scrapper');

let url = 'http://www.soribada.com/cs/list_view/';

let title = {"class" : "viewTitleFont"}; 
let contents = {"class" : "viewContent"};
let params =  [title, contents];

//*[@id="toc"]/ul/li[3] //xpath
// document.querySelector('#toc > ul > li:nth-child(3)')
// #toc > ul > li:nth-child(3)
let url02 = "http://www.soribada.com/cs/lists/member/1";
app.init();
for(var i = 0; i<15 ; i++){
    target_url = url+i;
    app.url(target_url);
    let test = app.scraping_type_attr(params).filter_tag([{'viewTitleFont' : 'span'}]).read();
    console.log(i+'page : ', test);
}
//app.readAll();

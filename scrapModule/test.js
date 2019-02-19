var app = require('./scrapper');
var app2 = require('./scrapper_selenium');
//let url = 'http://www.soribada.com/cs/list_view/';
//let url = 'https://www.soribada.com/cs/lists/member/1';
//let url = 'https://www.assacom.com/shop/member/winblue_pop.htm';
let url = 'https://kin.naver.com/index.nhn';


//*****************************************1번 속성명 테스트***********************************************************************/
//****************************************************************************************************************/
let title = {"class" : "viewTitleFont"}; 
let contents = {"class" : "viewContent"};
let params =  [title, contents];
//*[@id="toc"]/ul/li[3] //xpath
// document.querySelector('#toc > ul > li:nth-child(3)')
// #toc > ul > li:nth-child(3)
// app.init();
// for(var i = 0; i<15 ; i++){
//     target_url = url+i;
//     app.url(target_url);
//     let test = app.scraping_type_attr(params).filter_tag([{'viewTitleFont' : 'span'}]).read();
//     console.log(i+'page : ', test);
// }
//app.readAll();


//******************************************2번 DOM tree 테스트**********************************************************************/
//****************************************************************************************************************/

//body > div > table:nth-child(2) > tbody > tr:nth-child(14) > td  table > tbody > tr:nth-child(1)
//body > div > table:nth-child(2) > tbody > tr:nth-child(18) > td  table > tbody > tr:nth-child(1)
//body > div > table:nth-child(2) > tbody > tr:nth-child(16) > td > table > tbody > tr:nth-child(1)
//body > div > table:nth-child(2) > tbody > tr:nth-child(134) > td > div > table > tbody > tr:nth-child(1) > td



//body > div > table:nth-child(2) > tbody > tr:nth-child(14) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)
//body > div > table:nth-child(2) > tbody > tr:nth-child(16) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)
let cause;
// app.init();
// app.url(url);
//body > div > table:nth-child(2) > tbody > tr:nth-child(16) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)
// let error_code;
// let solution;
// let result = [];
// let obj;
// for(let i = 14 ; i<17; i+=2){
//     obj = {};
//     error_code = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td > table > tbody > tr:nth-child(1) > td';
//     cause = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td > table > tbody > tr:nth-child(2) > td:nth-child(2)';
//     solution = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td table > tbody > tr:nth-child(3) > td:nth-child(2)'
//     //obj['error_code'] = app.scraping_type_dom(error_code).read();
//     //console.log(obj['error_code']);
//     obj['cause'] = app.scraping_type_dom(cause).read();
//     //console.log(obj['cause']);
//     //obj['solution'] = app.scraping_type_dom(solution).read();
//     //console.log(obj['solution']);
//     result.push(obj);
// }
// for(let i = 18 ; i<135; i+=2){
//     obj = {};

//     error_code = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td > div> table > tbody > tr:nth-child(1) > td';
//     cause = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td > div > table > tbody > tr:nth-child(2) > td:nth-child(2)';
//     solution = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td table > tbody > tr:nth-child(3) > td:nth-child(2)'
//     //obj['error_code'] = app.scraping_type_dom(error_code).read();
//     //console.log(obj['error_code']);
//     obj['cause'] = app.scraping_type_dom(cause).read();
//     //console.log(obj['cause']);
//     //obj['solution'] = app.scraping_type_dom(solution).read();
//     //console.log(obj['solution']);
//     result.push(obj);
// }


//******************************************2번 selenium 테스트**********************************************************************/
//****************************************************************************************************************/
// params :  검색하고싶은 도메인 주소, 검색명, 
// 네이버의 경우(채택답변), 구글의 경우(채택답변)
app2.init();
app2.url(url).find_naver_knowlege('error');



/body > div > table:nth-child(2) > tbody > tr:nth-child(16) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)
let cause;
app.init();
app.url(url);
//body > div > table:nth-child(2) > tbody > tr:nth-child(16) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)
let error_code;
let solution;
let result = [];
let obj;
for(let i = 14 ; i<17; i+=2){
    obj = {};
    error_code = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td > table > tbody > tr:nth-child(1) > td';
    cause = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td > table > tbody > tr:nth-child(2) > td:nth-child(2)';
    solution = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td table > tbody > tr:nth-child(3) > td:nth-child(2)'
    //obj['error_code'] = app.scraping_type_dom(error_code).read();
    //console.log(obj['error_code']);
    obj['cause'] = app.scraping_type_dom(cause).read();
    //console.log(obj['cause']);
    //obj['solution'] = app.scraping_type_dom(solution).read();
    //console.log(obj['solution']);
    result.push(obj);
}
for(let i = 18 ; i<135; i+=2){
    obj = {};

    error_code = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td > div> table > tbody > tr:nth-child(1) > td';
    cause = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td > div > table > tbody > tr:nth-child(2) > td:nth-child(2)';
    solution = 'body > div > table:nth-child(2) > tbody > tr:nth-child('+i+') > td table > tbody > tr:nth-child(3) > td:nth-child(2)'
    //obj['error_code'] = app.scraping_type_dom(error_code).read();
    //console.log(obj['error_code']);
    obj['cause'] = app.scraping_type_dom(cause).read();
    //console.log(obj['cause']);
    //obj['solution'] = app.scraping_type_dom(solution).read();
    //console.log(obj['solution']);
    result.push(obj);
}

//휘영이에게!
//휭이!ㅎㅎ 먼저, 생일 축하해!! 어느덧, 나와 함께 보내는 3번째 생일이네!? ㅎㅎ
//시간이 너무 빠르게 느껴진다 ㅜ. 이렇게 가면 금방 꼬부랑 할아버지가 될 거 같아... 
//왜이렇게 시간이 빨리 지나갈까 생각해보았는데... 너무 행복해서인가봐~!!! ㅋㅋ 휘영이랑 만나고서는
//뭐든게 다 좋고, 행복하고 그랬어. 2년이 지났지만 난 여전히 울 휭이가 너무 사랑스러워! 
//머리부터 발끝까지! ㅎㅎㅎ 너무 많은 매력을 갖고 있어서 그런가!? ㅋㅋ 어쩔 때는 귀엽고~ 
//어쩔 때는 사랑스럽고~ 어쩔 때는 섹시하고~ 어쩔 때는 존경스럽고~~ 매력둥이신가요!? ㅋㅋㅋㅋ
//음! 이번에 3번째 그림은 나랑 같이 있는 모습을 원해서 우리가 전주 갔을 때 한복 입었던 휘영이의 모습이
//너무너무 이뻐서 그 때의 사진을 그려봤오! ㅎㅎ 마음에 들었으면 좋겠다. 
//지금까지 우리가 만나온 시간들을 생각해보면 작년 생일 이후에도 우리도 참 많은 일이 있었던 거 같아.
//전주, 부산, 울산, 제주도도 다녀오고~ 이사해서 우리 같이 지낼 새 집도 얻고~
//나는 회사다니다 다시 백수됐다가~ 새로 직장도 다시 다니고.. ㅋㅋ 나름 다이나믹해! 그칭!?
//그리고 가장 당황했던 어머님이랑 현진이 온 날! ㅋㅋㅋ 진짜 시트콤 같았지.. ㅋㅋ 아직 그 때 생각하면
//떨려!! 그리고 작년에는 울 휭이가 학교다니느랴, 멘토링에 간호평가까지 겹쳐서 힘들어 했징.. 그 때
//내가 울 휭이 너무 힘든거 잘 몰라주기도 했고... ㅠ 
//******************************************2번 selenium 테스트**********************************************************************/
//****************************************************************************************************************/
// params :  검색하고싶은 도메인 주소, 검색명, 
// 네이버의 경우(채택답변), 구글의 경우(채택답변)



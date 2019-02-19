const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const Builder = webdriver.Builder;
const Key = webdriver.Key
const until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
// #s_content > div.section > ul > li:nth-child(1) > dl > dt > a
// VM492:1 Uncaught SyntaxError: Invalid or unexpected token
// #s_content > div.section > ul > li:nth-child(2) > dl > dt > a
// VM589:1 Uncaught SyntaxError: Invalid or unexpected token
// #s_content > div.section > ul > li:nth-child(10) > dl > dt > a
let app = {
    init : ()=>{
        this.title = '';
        this.contents = '';
        this.solution = '';
    },
    url : (url)=>{
        if(url!=null&&url!=undefined){
            this.url = url;
        }
        return app;
    },
    find_naver_knowlege : async (str)=>{
        driver.get(this.url);
        await driver.findElement(By.name('query')).sendKeys(str);
        await driver.findElement(By.className('search_btn')).click();
        let flag = true;
        while(flag){
            let link_a = await driver.findElements(By.className('_searchListTitleAnchor'));
            let parent = driver.getWindowHandle();
            for(let i = 0 ; i < link_a.length; i++){
                await link_a[i].click();
                let windows = await driver.getAllWindowHandles();
                await driver.switchTo().window(windows[1]);
                let target = await driver.findElement(By.tagName('div._answerList > div')).findElements(By.tagName('div.c-heading-answer__body > div'));
                //채택된 답변일 경우 2
                if(target.length == 2){
                    let title = await driver.findElement(By.className('title')).getText(); 
                    let contents = await driver.findElement(By.className('c-heading__content')).getText(); 
                    let solution = await driver.findElement(By.className('c-heading-answer__content-user')).getText(); 
                    console.log(title);
                    console.log(contents);
                    console.log(solution);
                }
                await driver.close();
                await driver.switchTo().window(parent);
            }
            let cur_page = parseInt(await driver.findElement(By.tagName('div.s_paging > strong')).getText()); //현재페이지 1
            cur_page = parseInt(cur_page%10) != 0 ? parseInt(cur_page%10) : 10;
            let paging_a = await driver.findElements(By.tagName('div.s_paging > a')); //9
            let com_page ="";
            let count = 0;
            for(let j = 0; j<paging_a.length; j++){
                com_page = await paging_a[j].getText(); //2부터시작~
                if(com_page != '다음페이지' && com_page !='이전페이지'){
                    com_page = parseInt(com_page%10) != 0 ? parseInt(com_page%10) : 10;
                }
                if(com_page == parseInt(cur_page)+1){
                    count = 1;
                    await paging_a[j].click();
                    break;                    
                }else if(com_page=='다음페이지'){
                    console.log('확인')
                    count = 1;
                    await paging_a[j].click();
                    break; 
                }
            }
            if(count == 0){
                flag = false;
                console.log('더이상 페이지가 없습니다.');
            }
        }
       // console.log(page_btn)
    }
}

module.exports = app;




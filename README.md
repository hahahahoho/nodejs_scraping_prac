# Scraping 실전 : cheeio, selenium

#### Web Scraping : 컴퓨터 소프트웨어 기술로 웹 사이트들에서 원하는 정보를 추출하는 것을 의미합니다.

이전에 올린 scraping_basic에서는 스크래핑에 대한 상세한 설명과 어떻게 구현할 것인지 보다는 스크래핑에 대한 간략한 이해와 어떻게 웹사이트를 불러와 스크래핑을 할 수 있는지에 대한 설명을 하였습니다.

이번에는 좀 더 스크래핑에 대한 구체적인 설명과 어떻게 코드를 짰는지, 그리고 활용방안에 대해서 얘기 하겠습니다. 코드는 많이 미숙합니다. ㅠㅠ 혹시 더 효율적으로 짤 수 있는 방법을 알고 계신다면 꼭 피드백 받고 싶습니다!.

무튼, 스크래핑이란 위에서 말한 것 처럼 컴퓨터 소프트웨어 기술로 웹 사이트에서 원하는 데이터를 추출하는 것을 의미합니다. 

파이썬에는 beautiful_soup라는 라이브러리가 있습니다. 스크래핑을 편안하게 해줄 아주 유용한 도구죠. nodejs에는 비슷한 기능을 하는 라이브러리를 찾기 힘들었습니다. 그래서! 파이썬에서 제공하는 beautiful_soup라는 라이브러리와 같이 비슷한 기능을 낼 수 있도록 직접 만들어봤습니다.

먼저, 만들면서 가장 중요하게 생각한 부분입니다.

1. ##### 스크래핑이란 기본적으로 분명한 목적이 있어야 합니다.

   -> 크롬 검색기를 이용하여 직접 서칭하여 데이터를 찾겠다. 또는 어떤 홈페이지에서 url주소를 통하여 이동하는 데이터들의 정보를 찾겠다와 같이 분명한 목적이 있어야 합니다. 이번에는 간단하게 url패턴을 통해 원하는 데이터를 가져올 것입니다.

   **사실 목적에 맞는 알고리즘을 적용할 수 있으면, 구글과 같이 웹사이트들을 자동으로 돌아다니면서 원하는 데이터를 가져올 수도 있겠지만 이 부분은 제가 설명드릴 수 없는 부분이라 생략하겠습니다. ㅜ

2. ##### 패턴을 분석하여 그에 맞게 코드를 짜야 합니다. 

   ->예를 들어, 한 페이지를 크롤링한다고 가정합니다. 그 웹페이지는 어지러운 듯 보이지만 데이터를 넣는 태그에서 일정한 규칙을 찾을 수 있을 겁니다. 반복문을 통해 출력되는 구조라던가 class이름, data속성 이름, css 등을 통해 규칙을 찾을 수 있습니다. 우리는 이제 규칙을 통해 코드를 작성하여 원하는 데이터를 가져와야 합니다.



이제 코드를 보면서 설명드리겠습니다.

```
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
```

scrapper.js는 제가 만든 스크래핑 모듈파일입니다. 함께 올려놓았으니 확인하시고 편한대로 사용하시면 되겠습니다 ^^. 

지금은 class, id, name, data속성을 찾아서 원하는 데이터를 가져오는 것만 되는데 조만간 xpath를 이용한 태그구조를 통해 데이터를 가져오는 기능과, text를 확인하여 데이터를 가져오는 기능을 추가 할 것 입니다. 그리고 최종적으로 구글 등과 같은 검색엔진을 통해 원하는 내용을 입력하여 검색하고 검색 된 내용의 페이지의 정보를 가져오는 것도 추가하겠습니다.

- init() : 모듈 초기화 작업을 합니다.
- url(param : string) : 원하는 웹페이지 주소를 입력 받고 셋팅합니다.
- scraping_type_attr(param : [ {'속성명', '값'} ]) : 객체로 담겨진 배열을 받아 원하는 데이터를 스크래핑하여 결과값을 저장합니다.
- filter_tag( [{'속성값' : 'tag명'}] ) : 앞에서 스크래핑한 결과값 중 원하는 속성값을 가진 태그와 작성한 태그가 일치한지 아닌지 판별 후 아닐 경우 삭제, 일치할 경우 넘어갑니다. 
- read() : 페이지를 스크래핑 할 때마다 최근 추가된 결과값만 배열형태로 리턴합니다.
- readAll() : 모든 페이지 결과 값을 배열로 저장하여 한번에 리턴합니다.

스크래핑을 만들면서 가장 헷갈렸던 점은 this객체 입니다. 일반적인 javascript에서의 this객체와 nodejs에서의 객체는 조금 달랐습니다.  이 부분은 저도 이해만 어느정도 한 것이라 자세하게 설명은 못드리겠네요.. ㅜ 

this에 대해서 정확히 알면 앞으로 코드작성할 때 정말 좋은 점과 효율성이 높아지니 꼭 찾아보셔서 본인의 것으로 만드셨으면 하는 바램입니다.

==============================================================================

#### *추가

이전에 말했던 태그구조를 통해 데이터를 가져오는 방법도 추가하였습니다. 

태그구조를 통해 가져오는 방법은! 역시나 먼저 패턴분석이 우선입니다. 해당 페이지에 갖고 오고싶은 리스트의 태그구조 규칙을 찾아야합니다.  

쉽게 찾는 방법은 그림을 보시면 됩니다! ^^

![](.\img\selector_copy.png)

아래 사용하는 코드입니다. 가져온 태그 셀렉터를 각각의 변수에 담아주시고 scraping_type_dom()이라는 함수의 파라미터로 넣고 read()를 호출하면 텍스트 값이 담기게 됩니다.

```
app.init(); 
app.url(url); //원하는 페이지의 url주소를 parameter로 입력합니다.

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
```

코드는 위와 동일하게 scrapper.js파일에 있습니다. 혹시 더 효율적으로 잘 짤 수 있는 방법에 대해서 피드백 주신다면 정말 정말 감사하겠습니다. 아직 초보라 많이 미숙하네요 ㅜㅜ..

=============================================================================

## Selenium

이번 주제는 크롤러를 도와주는 selenium을 이용하여 브라우저를 통제하고 크롤링하는 방법에 대해서 입니다.  셀레니움이란 웹브로우저 엔진을 띄어서 html을 해석하고 코드를 작성하여 브라우저와 html태그를 통제할 수 있도록 도와주는 모듈이라 할 수 있겠습니다.

먼저 ,

` npm install selenuim-webdrive --save` 

명령어를 통해 모듈을 다운 받습니다. 

사용방법은 이렇게 하시면 되겠습니다.

```
var app2 = require('./scrapper_selenium');
app2.init();
app2.url(url).find_naver_knowlege('error');
```

매우 간단하죠?. 사실 코드는 그리 간단하지 않은데 사용면에서 간편하게 하기 위해 노력하였답니다. 깃에 올라와 있는 scrapper_selenium.js파일을 열어보시면 코드를 확인할 수 있습니다.

셀레니움에서 가장 중요한 거는 각 **브라우저 드라이버가 꼭 프로젝트 루트 경로에 있어야 합니다**.

그래야 nodejs에서 이를 인식하고 해당 웹브라우저 드라이버를 이용하여 selenium 모듈을 정상적으로 작동할 수 있습니다.

제 프로젝트에 보시면 **chromedriver.exe** 파일이 바로 드라이버입니다. 검색하시면 쉽게 나오니 해당 페이지에서 다운받거나 제가 사용하는 드라이버를 다운받아 사용하시면 되겠습니다. 

또한 **javaSDK를** 꼭 설치해주셔야 합니다. 구글드라이버가 이를 기반으로 동작하기 때문입니다.

그리고 2번째 중요한 것은 **동기화 시키는 작업**입니다. 아무래도 nodejs는 비동기 방식으로 작동하기 때문에 웹브라우저를 통해 통제하는 작업에서 순서가 꼭! 필요하게 됩니다. 

예를들어, html페이지가 다 읽히지 않았는데 태그를 찾으려 한다면 오류가 발생하겠죠? 이를 해결하기 위한 방법은 promise객체를 사용할 수도 있고 time을 설정하여 처리하는 방법 그리고 제가 사용한 async 와 await를 사용하는 방법이 있습니다. 제가 사용한 방법은 최신 브라우저에서만 작동하기 때문에 호환성을 위해서는 꼭! 바벨을 통해서 순수 javascript코드로 변환하여 주시길 바랍니다.

마지막으로 어떻게 브라우저를 동작시키고 html태그를 조작하는지 알아야 겠죠? 그럴려면 필요한 함수들을 알아야 할 것입니다. 아래에 제가 참고한 함수들의 리스트를 적어 놓겠습니다.

#### 설정

```
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const Builder = webdriver.Builder;
const Key = webdriver.Key
const until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
```

#### WEB Element 조작

- clear() – innerHTML = ” 과 같은 효과를 일으킵니다.
- click() – 해당 엘리먼트를 클릭합니다.
- findElement(By..) – 자손엘리먼트 중 하나를 가져옵니다.
- findElements(By..) – 자손엘리먼트 여러개를 배열로 가져옵니다.
- getAttribute(속성명) – 속성값을 가져옵니다.
- getCssValue(속성명) – 속성에 해당되는 스타일값은 계산된 값입니다.
- getLocation() – 웹페이지 위치상의 x,y를 나타내는 포인트를 반환합니다.
- getRect() – Rectangle 구조로 width, height를 포함하여 반환합니다.
- getSize() – Dimension 구조로 width, height를 반환합니다.
- getTagName() – 태그명을 반환합니다(소문자로)
- getText() – innerText값을 가져옵니다.
- isDisplayed() – 화면에 표시된 것인가 아닌가 판정합니다.
- isEnabled() – 보통 input계열의 태그가 enable상태인지 판정합니다.
- isSelected() – 선택된 상태인지를 반환합니다.
- sendKeys() – 해당 태그에 키보드 입력을 실시합니다.
- submit() – form인 경우 submit을 실시합니다.

#### By를 이용한 element 불러오기

- By.id(id)
- By.name(name)
- By.className(class)
- By.tagName(tagname)
- By.linkText(A태그의 text값)
- By.partialLinkText(A태그의 일부 text값)
- By.cssSelector(selector)
- By.xpath(xpath)



#### driver객체에 관련한 함수들

- driver.manage()

  – Options객체를 반환합니다. Options객체는 아래와 같은 메소드를 제공합니다.

  1. addCookie({name,value,domain,path,expiry,secure,httpOnly}) – 쿠키를 추가합니다.
  2. deleteAllCookies() – 모든 쿠키를 삭제합니다.
  3. deleteCookie(name) – 특정 쿠키를 삭제합니다.
  4. getCookies() – then의 v로 쿠키배열을 반환하는데 각 배열요소는 {name,value,domain,path,expiry}형태의 오브젝트입니다.
  5. getCookie(name) – 특정 쿠키를 얻어옵니다. 위와 같고 단일오브젝트를 반환합니다.
  6. logs() – Logs객체를 반환합니다. 이 객체는 브라우저에서 console.log 등에 쓴 값을 가져옵니다.
     - get(type) – 해당 type에 대한 로그를 가져옵니다. 한 번 가져오면 그 뒤로는 새것만 가져옵니다.
     - getAvailableLogTypes() – 해당 브라우저가 지원하는 로그 타입을 배열로 반환합니다.
  7. timeouts() – Timeouts 객체를 반환합니다. 묵시적 대기를 설명할때 등장한 적이 있습니다. 메소드는 다음과 같습니다.
     - implicitlyWait(ms) – 묵지적 대기를 설정합니다.
     - setScriptTimeout(ms) – 브라우저 내의 스크립트 타입아웃값을 조정할 수 있습니다. 0이하가 되면 타임아웃이 없어집니다.
     - pageLoadTimeout(ms) – 페이지로딩을 위해 대기할 시간을 정할 수 있습니다.
  8. window() – Window객체를 반환합니다. 현재 브라우저 그 자체입니다.
     - getPosition() – 브라우저의 윈도우상 위치를 {x, y} 로 반환합니다.
     - setPosition(x, y) – 브라우저의 위치를 옮깁니다.
     - getSize() – 브라우저 크기를 {width, height}로 얻습니다.
     - setSize(width, height) – 브라우저의 크기를 조정합니다.
     - maximize() – 브라우저를 최대화합니다.

- driver.navigate()

  – Navigation객체를 반환합니다. 이 객체는 back(), forward()와 같이 브라우저에서 버튼 네비게이션이 하는 일을 시킬 수 있습니다.

  1. to(url) – 특정 url로 이동시킵니다.
  2. back() – 뒤로가기
  3. forward() – 앞으로 가기
  4. refresh() – 리로딩

- driver.switchTo()

  – 브라우저 내에서 제어권을 옯겨주는 TargetLocator객체를 반환합니다. 이를 통해 다이얼로그, 아이프레임, 팝업창 등으로 이동해다니면서 작업할 수 있습니다.

  1. activeElement() – 해당 창의 루트(doc 또는 doc.body 또는 doc.documentElement)웹엘리먼트를 반환합니다.
  2. defaultContent() – 원래 driver가 가리키던 창으로 제어를 되돌립니다.
  3. frame(id)- 지정한 프레임으로 제어권을 옮깁니다.
  4. window(nameOrHandle) – 지정한 윈도우로 제어권을 옮깁니다. 이때 이름은 팝업을 띄울 때 윈도우의 이름으로 지정한 값입니다.
  5. alert() – alert, confirm, prompt 등의 다이얼로그로 제어권을 옮깁니다. Alert객체를 반환합니다.
     - getText() – 다이얼로그의 텍스트값을 읽습니다.
     - authenticateAs(username, password) – 기본인증 등 인증창인 경우 아이디, 비번을 입력합니다.
     - accept() – 확인버튼을 누릅니다.
     - dismiss() – 취소버튼을 누릅니다.
     - sendKeys(text) – prompt 등에 텍스트값을 타이핑해줍니다.



##### 위에 함수들은 하나하나 설명하기에는 어려우니 직접 사용해보거나 찾아보시면 되겠습니다.

출처 : https://www.bsidesoft.com/?p=2233
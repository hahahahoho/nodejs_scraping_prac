var request = require("request"); //웹서버에 request요청을 위한 모듈
var cheerio = require("cheerio"); //불러온 텍스트를 html형태로 load하여 제이쿼리 형태로 사용하게 만들어주는 모듈
var request = require('sync-request'); //request요청을 동기적으로 사용할 때 사용한다.
var charset = require('charset');
var iconv = require('iconv-lite');

// console.log('//////////////');
// console.log(module.exports); //{}빈객체
// console.log(module.exports ==global); //{}빈객체 false
// console.log(this);
// console.log(this == module.exports); //true
// console.log('//////////////');
let app = {
    "init" : ()=>{
        this.result = [];
        this.count = 0;
        this.url = '';
    },
    "url" : (url)=>{
        if(url!=null&&url!=undefined){
            this.url = url;
        }
        return app;
    },
    "count" : ()=>{
        return this.result.count;
    },
    "filter_tag" : (arr)=>{            //[{'title', 'tagName'}, {'contents', 'tagName'}];
        if(this.result.length != 0 && this.check == 'y'){
            let filter_trg;
            let key;
            for(let i=this.loop_length; i>0; i--){
                filter_trg = this.result[this.result.length-i]; // 타겟 모양 {'title' : [array]}
                key = Object.keys(filter_trg)[0]
                if(filter_trg != undefined && filter_trg[key].length != 0){
                    ; //비교할 타이틀과 태그를 확인
                    for(let j = 0; j<arr.length; j++){ //비교대상 arr길이
                        let tag_key = Object.keys(arr[j])[0]; //비교대상 속성명
                        //속성명이 일치하고 태그명이 다를 때 배열에서 삭제.
                        if(key == tag_key){
                            let del_check = []; //1(true)일경우 삭제, 0일경우 path         
                            for(let z = 0; z<filter_trg[key].length; z++){
                                if(arr[j][tag_key] != filter_trg[key][z][0].name){
                                    del_check.push(1); 
                                }else{
                                    del_check.push(0);
                                }
                            }
                            let length = del_check.length;
                            let count =0;
                            for(let x = 0; x<length; x++){
                                if(del_check[count] == 1){
                                    del_check.splice(count, 1);
                                    this.result[this.result.length-i][key].splice(count, 1);
                                }else{
                                    count++;
                                }    
                                
                            }
                        }
                    }
                }
            }

        }
        return app;
    },   
    "scraping_type_dom" : (target)=>{
        this.loop_length = 1;
        let res = request('GET', this.url);
        const enc = charset(res.headers, res.body);
        const i_result = iconv.decode(res.body, enc);
        let $ = cheerio.load(i_result); //html jquery change
        let obj = {};
        obj['target'] = [];

        console.log($(target).text());        //문자열 파싱필요
        if($(target).length == 0){
            this.check = 'n';
        }else{
            obj['target'].push($(target));
            this.result.push(obj);
            this.check = 'y';
        }
        return app
    },
    "scraping_type_attr" : (arr)=>{ //data eaxmple obj_title >> [{"class" : "title"}, {"class" : "contents"}]
        this.loop_length = arr.length;
        this.count = 0;
        let res = request('GET', this.url);
        let $ = cheerio.load(res.getBody('utf8')); //html jquery change
        for(let i = 0; i<arr.length; i++){
            let obj = {};
            let key = Object.keys(arr[i])[0];
            let attr_name = arr[i][key];
            obj[attr_name] = [];
            if(key=='class'){ //배열로 결과값 가져옴
                for(let j =0; j< $('.'+attr_name).length; j++){
                    $($('.'+attr_name)[j])[0]['my_index'] = j+1;
                    obj[attr_name].push($($('.'+attr_name)[j]));
                }
            }else if(key=='id'){ //단 한개의 값
                for(let j =0; j< $('#'+attr_name).length; j++){
                    $($('#'+attr_name)[j])[0]['my_index'] = j+1;
                    obj[attr_name].push($($('#'+attr_name)[j]));
                }
            }else if(key=='name'){ //배열로 결과값 가져옴
                for(let j =0; j< $('[name="'+attr_name+'"]').length; j++){
                    $($('[name="'+attr_name+'"]')[j])[0]['my_index'] = j+1;
                    obj[attr_name].push($($('[name="'+attr_name+'"]')[j]));
                }
            }else if(key=='css'){
                
            }else if(key.includes('data')){ //배열로 결과값 가져옴
                for(let j =0; j< $('['+attr_name+']').length; j++){
                    $($('['+attr_name+']')[j])[0]['my_index'] = j+1;
                    obj[attr_name].push($($('['+attr_name+']')[j]));
                }
            }
            this.check = 'y';
            try{
                this.result.push(obj);
                this.count++;
            }catch(err){
                console.log(err);
            }

        }
        //console.log(this.result)
        //this.title = $('.'+titleName).text();
        //this.contents = $('.'+conName).text();
        //console.log(this); // 그럼 왜 여기는 아직 {}이냐? 새로만들어진듯... 근데 어디서 만들어졌을까??? 할당되지 않은 app의 this를 가르치는거 같음. app의 this를 가르키는것!
        //그럼 사용해도 된다는 판단이 나옴. 왜냐 app그 자체의 this이므로 중복될 가능성이 없으므로...
        //console.log(module.exports); // app객체가 만들어지면서 module.exports에는 app을 가르킴
        return app;
    },
    //현재페이지 스크래핑 데이터 return
    "read" : ()=>{
        let result = [];
        if(this.check == 'y'){  
            for(let i=this.loop_length; i>0; i--){
                let obj = {};
                let filter_trg = this.result[this.result.length-i];
                if(filter_trg != undefined){
                    //console.log(filter_trg);
                    let key = Object.keys(filter_trg)[0];
                    for(let j = 0 ; j<filter_trg[key].length; j++){
                        if(filter_trg[key][j][0].my_index != undefined){
                            let index = filter_trg[key][j][0].my_index;
                        }
                        //console.log(filter_trg[key][j][0])
                        obj[key] = filter_trg[key][j].text();
                    }
                    result.push(obj);
                }
                
            }
        }else{
            console.log('존재하지 않는 값');
        }
        return result; 
    },
    //domtag 데이터 추출 시 정규식을 이용하여 문자열 정렬 후 return
    "read_regex" : ()=>{

    },
    //모든 페이지 스크래핑 데이터 return
    "readAll" : ()=>{
        let result = [];
        for(let i = 0; i<this.result.length; i++){
            let obj = {};
            let key = Object.keys(this.result[i])[0];
            for(let j = 0 ; j<this.result[i][key].length; j++){
                let index = this.result[i][key][j][0].my_index;
                obj[key+index] = this.result[i][key][j].text();
            }
            
            result.push(obj);
        }
        return result;
    }
};
module.exports = app;

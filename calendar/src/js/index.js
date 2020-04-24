//当前的年月日，和星期
var date=new Date();         //当前的日期对象
var year=date.getFullYear(); //当前的年份
var month=date.getMonth()+1; //当前的月份
var day=date.getDate();      //当前的日子
                 //当前是星期几

var lhead=document.getElementById("lhead");
var rhead=document.getElementById("rhead");

var lrows=document.getElementsByClassName("lrows");
var rrows=document.getElementsByClassName("rrows");






function getleftMoth(year,month){                   //返回左表月
   if(month==1){
    return 12;
   }
   return month-1;
}


function getRightDate(year,month){         //返回右表当前年月
  if(month==12){
    return {y:year+1,m:1};
  }
  return {y:year,m:month+1};
}

function getRightMonth(year,month){    //返回右表月份
  if(month==12){
    return 1;
  }
  return month+1;
}



addEventRight();

var lmonth=getleftMoth(year,month);

addEvent();


var ry=getRightDate(year,month).y;
var rm=getRightDate(year,month).m;
var rmonth=getRightMonth(ry,rm);


 
initThead();  //表头初始话


//1............静态的页面初始化.............................
   
   //a.表头
   function initThead(){
       //当前的年月
       // for(var i=0;i<2;i++){
       // 	 var sp=document.createElement("span");
       //   lhead.appendChild(sp);
       //   sp.style.marginLeft="50px";
       //   var sp1=document.createElement("span");
       //   sp1.style.marginLeft="50px";
       //   rhead.appendChild(sp1);
       // }
       //左表头
       lhead.children[0].innerText=lmonth+"月";
       lhead.children[1].innerText=year+"年"+month+"月";

       //右表头
       rhead.children[0].innerText=ry+"年"+rm+"月";
       rhead.children[1].innerText=rmonth+"月";
   }



   //b.表体填充函数...............................................................................
     function initTbody(lrows,year,month){
       //1.左表填充，即当前月有多少天，填到表里去
       var y=year;
       var m=month;
       var firstday=returnWeek(y,m); //每个月的第一天是星期几
       var allday=monthDay(y,m);  //每个月有多少天
       var row=0;//行数
       var col=firstday;//列数
       var first=1
       lrows[row].children[firstday-1].innerText=first;
       if(y==current().year && m==current().month && first==current().date){
        lrows[row].children[firstday-1].style.color="red";
       }else{
        lrows[row].children[firstday-1].style.color="gray";
       }
       for(var i=row;i<6;i++){
           for(var j=col;j<7;j++){
              first++;
              lrows[i].children[j].innerText=first;
               if(y==current().year && m==current().month && first==current().date){
                lrows[i].children[j].style.color="red";
              }else if(y==current().year && m==current().month && first>current().date){
                lrows[i].children[j].style.color="blue";
              }else{
                lrows[i].children[j].style.color="gray";
              }
              
              if(first==allday){
                i=6;
                break;
               }
           }
           col=0;           
       }
     }

    // 表体初始化
    initTbody(lrows,year,month); //左表
    initTbody(rrows,ry,rm);      //右表
    

    

//2.工具函数
     //输入年月份，返回天数............................................................................................
     function monthDay(year,month){
      if(month==1 || month==3 || month==7 || month==8 || month==10 || month==12){
         return 31;
      }else if(month==4 || month==6 || month==9 || month==11){
        return 30;
      }else if( (year%400==0 ||(year%4==0&&year%100!=0)) && month==2 ){   //判断是否为润年
            return 29;
       }else{
            return 28;
        }
     }

     //输入年，月，日(一个月多少天)来放回每个月的一号是星期几........................................................................
     function returnWeek(year,month){
      var y=String(year);               //整型转换为字符串
      var m=String(month); 
      var days=String(1);
      var s=y+"/"+m+"/"+days;          //字符串的赋值
      var weeks=new Date(s).getDay();  //new Date("年/月/日")
      if(weeks==0){
        return 7;
      }
      return weeks;
     }


     //事件函数..........................................................................................................................
     function addEvent(){
        lhead.children[0].addEventListener("click",function(){
            lmonth--;
            if(lmonth==0){
               lmonth=12;
               year--;     
            }     
             month--;
             if(month==0){
              month=12;
             } 
              ry=getRightDate(year,month).y;
              rm=getRightDate(year,month).m;
              rmonth=getRightMonth(ry,rm);
              initThead();
              clearTable(lrows);     //清空左表，点击一次需要更新列表，应为之前的可能没被占用，造成无法修改
              clearTable(rrows);    //清空右表
              initTbody(lrows,year,month); //左表
              initTbody(rrows,ry,rm);      //右表
        })
     }

      function addEventRight(){
        rhead.children[1].addEventListener("click",function(){
            month++;
            if(month==13){
              year++;
              month=1;
            }
              lmonth=getleftMoth(year,month);
              ry=getRightDate(year,month).y;
              rm=getRightDate(year,month).m;
              rmonth=getRightMonth(ry,rm);
              initThead();
              clearTable(lrows);     //清空左表，点击一次需要更新列表，应为之前的可能没被占用，造成无法修改
              clearTable(rrows);    //清空右表
              initTbody(lrows,year,month); //左表
              initTbody(rrows,ry,rm);      //右表
        })
      }


      //清空表函数
      function clearTable(lrows){
        for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
          lrows[i].children[j].innerText=null;    //给innerText清空，赋值赋予的是null
          }
        } 
      }

      //获取当前日期
      function current(){
        var curdate=new Date();
        var curyear=curdate.getFullYear();
        var curmonth=curdate.getMonth()+1;
        var curday=curdate.getDate();
           return{
                   year:curyear,
                   month:curmonth,
                   date:curday
           }
      }

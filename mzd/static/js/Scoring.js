// querySelector는 id를 찾는지, class를 찾는지 분명히 해줘야 함 ex) id는 앞에 #붙임. 

const fileUpload= document.querySelector("#fileupload-form");
const fileUploadInput= document.querySelector("#fileupload-form input");

//document가 아닌 바로 변수를 통해서 form을 찾을 수 있음. 
function fileuploadSubmit(event){
  event.preventDefault();//submit 시 페이지 새로고침을 방지
  console.dir(fileUploadInput.value);
  };

//submit 시 prevent default| 
fileUpload.addEventListener("submit",fileuploadSubmit);

//Scoring 비디오 element

/*//////////////////////////////////////////////////////////////////////
Scorlist 정의
*///////////////////////////////////////////////////////////////////////

let scoreList= []; //스코어링 점수 배열
let scorelistMale0=[];
let scorelistFemale0=[];

const scoreMaleMean=64;

let scorelistMale=[79, 83, 81, 83, 82, 82, 80, 80, 80, 80, 80, 79, 80, 80, 80, 82, 83, 82, 80, 78, 74, 72, 72, 74, 74, 74, 74, 74, 72, 71, 71, 72, 71, 72, 73, 72, 73, 75, 78, 81, 84, 76, 70, 64, 58, 55, 51, 50, 49, 48, 49, 48, 47, 46, 46, 47, 46, 47, 47, 48, 47, 49, 48, 47, 47, 48, 46, 46, 44, 43, 44, 42, 39, 39, 38, 
  39, 39, 39, 40, 39, 39, 39, 41, 41, 43, 44, 45, 46, 46, 47, 46, 46, 46, 49, 50, 50, 50, 53, 53, 54, 54, 55, 55, 56, 56, 58, 60, 60, 57, 58, 57, 58, 55, 58, 56, 56, 59, 60, 60, 60, 62, 61, 62, 62, 66, 64, 69, 69, 71, 74, 73, 73, 69, 69, 68, 69, 72, 72, 72, 73, 74, 73, 73, 73, 74, 73, 74, 73, 72, 75, 72, 74, 73, 74, 75,
   75, 73, 74, 71, 72, 73, 72, 71, 72, 73, 76, 76, 77, 75, 75, 75, 75, 73, 73, 74, 75, 76, 74, 74, 74, 74, 74, 75, 76, 75, 76, 78];

for (k=0; k<187; k+=23) {
  scorelistMale0.push(scorelistMale[k])
}

const scoreFemaleMean=82;

const scorelistFemale=[76, 71, 73, 70, 71, 72, 72, 72, 73, 72, 73, 73, 73, 73, 73, 73, 72, 73, 74, 74, 74, 75, 79, 79, 80, 81, 80, 80, 80, 80, 80, 81, 82, 83, 83, 83, 83, 84, 86, 86, 86, 77, 73, 70, 71, 69, 75, 81, 89, 91, 93, 93, 93, 94, 94, 93, 92, 91, 90, 90, 91, 90, 89, 89, 88, 87, 88, 88, 86, 87, 86, 87, 87, 86, 86, 86, 87, 86, 85, 85, 84, 84, 84, 84, 84, 83, 83, 83, 84, 85, 83, 80, 78, 74, 78, 79, 83, 87, 90, 90, 92, 91, 91, 91, 91, 92, 91, 91, 91, 89, 90, 89, 90, 87, 89, 89, 86, 86, 86, 86, 84, 87, 86, 86, 83, 77, 80, 78, 78, 77, 77, 79, 78, 78, 78, 80, 79, 80, 80, 81, 81, 82, 81, 82, 83, 83, 83, 83, 84, 79, 81, 78, 80, 78, 78, 77, 78, 79, 82, 81, 82, 80, 78, 78, 78, 81, 80, 79, 77, 77, 77, 76, 76, 77, 76, 74, 74, 75, 75, 74, 75, 75, 73, 75, 78, 80, 82, 82, 82, 80, 80, 76];

for (k=0; k<192; k+=23) {
  scorelistFemale0.push(scorelistFemale[k])
}


/*//////////////////////////////////////////////////////////////////////
Scoring 함수 정의
*///////////////////////////////////////////////////////////////////////

//영상 정하기

const scoreStart= document.querySelector("#scoreStart")
const scoreEnd= document.querySelector("#scoreEnd")

const scoreVideo= document.querySelector("#scorevideo0")
let source= document.createElement("source")

const scoreLinkMale0= "https://mztod.s3.ap-northeast-2.amazonaws.com/AlphaPose_user2_LoveDive_0.mp4"
const scoreLinkFemale0= "https://mztod.s3.ap-northeast-2.amazonaws.com/AlphaPose_user_LoveDive_0.mp4"

// https://offbyone.tistory.com/241 참고함.

//score 위치에 score 표시

function defineScoreVideo(){
  if(fileUploadInput.value==="C:\\fakepath\\user2_LoveDive_0.mp4"){
    //scorelist에 재건 춤 score 저장
    scoreList=scorelistMale0;
    source.setAttribute('src',"https://mztod.s3.ap-northeast-2.amazonaws.com/AlphaPose_user2_LoveDive_0.mp4")
    source.setAttribute('type','video/mp4');
    scoreVideo.appendChild(source);
  }
  // upload한 영상이 전문 댄서 영상이면)
  if(fileUploadInput.value==="C:\\fakepath\\user_LoveDive_0.mp4"){
    //scorelist에 전문 댄서 춤 score 저장
    scoreList=scorelistFemale0;
    source.setAttribute('src',"https://mztod.s3.ap-northeast-2.amazonaws.com/AlphaPose_user_LoveDive_0.mp4")
    source.setAttribute('type','video/mp4');
    scoreVideo.appendChild(source);
};
};

let index=0;
let score= null;

function printScore(){
    defineScoreVideo();
    if(scoreList.length>index){
    score= scoreList[index++];
    document.querySelector("#scoreList").innerText=score;
  }
};

let timer= null;
//scoreprint 함수를 timer 간격으로 실행
scoreStart.addEventListener("click",function(){
  scoreVideo.play();
  printScore();
  timer=setInterval(printScore,800);
});


//스코어링을 중지
scoreEnd.addEventListener("click",function(){
    if(timer!=null){
        clearInterval(timer)
    }
});


//스코어링 영상 재생
//스코어링 영상 주소 변수 생성

if(window.addEventListener){
  window.addEventListener('load', function(){
      if(window.HTMLVideoElement){
          var player = document.getElementById('scorevideo0');
          player.addEventListener("ended", function(){
            if(fileUploadInput.value==="C:\\fakepath\\user2_LoveDive_0.mp4"){
              alert("당신의 평균 점수는 63점입니다. 다시 연습해 보세요!")
            }else if(fileUploadInput.value==="C:\\fakepath\\user_LoveDive_0.mp4"){
              alert("당신의 평균 점수는 81점입니다. 다음 동작으로 넘어가세요!")
            }
            })
          }});
        };

/*/////////////////////////////////////////////////////////////////
Axios 통신- estimated video, scorelist받아오기
//////////////////////////////////////////////////////////////*/
AWS.config.update({
  accessKeyId: "AKIA4Y43KNAXD5IMOPNF",
  secretAccessKey: "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"
});

AWS.config.region = 'ap-northeast-2';


//출처: https://medium.com/watcha/%EC%9B%B9%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94-%EB%85%B9%ED%99%94%EC%95%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0-70142ce28994
/*//////////////////////////////////////////////////////////////////////
Webcam
*///////////////////////////////////////////////////////////////////////

const videoOutput = document.getElementById('video-output');
const startBtn = document.getElementById('start-btn');
const pauseBtn= document.getElementById('pause-btn');
const finishBtn = document.getElementById('finish-btn');
const downloadBtn = document.getElementById('download-btn');

let mediaStream = null;
let mediaRecorder = null;
let recordedMediaURL =null;


// querySelector는 id를 찾는지, class를 찾는지 분명히 해줘야 함 ex) id는 앞에 #붙임. 

const filenameForm= document.querySelector("#filename-form");
const filenameInput= document.querySelector("#filename-form input");

// 유저의 카메라로 부터 입력을 사용할 수 있도록 요청
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (newMediaStream) {
    mediaStream = newMediaStream;

    // 카메라의 입력을 실시간으로 비디오 태그에서 확인
    videoOutput.srcObject = mediaStream;
    videoOutput.onloadedmetadata = function (e) {
      videoOutput.play();
    };
  });

  
// 5초 후 시작 하는 리스트 및 함수printThree()
const threeList= ["5초 후 녹화를 시작합니다!",4,3,2,1,"Start!",""]
let num=0;
let second=null;

function printThree(){
  if(threeList.length>num){
    second= threeList[num++];
    document.querySelector("#threelist").innerText=second;
}
};


let timeSec=null;
let recordUrl=null;
// 녹화 시작 버튼 클릭 시 빌생하는 이벤트 핸들러 등록
startBtn.addEventListener('click', function () {
  printThree();
  timeSec= setInterval(printThree,1000);

  let recordedChunks = [];
  // 1.MediaStream을 매개변수로 MediaRecorder 생성자를 호출
  // 이거는 웹캠 화면을 호출

  mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: 'video/webm ; codecs="opus" '});
  

  // 2. 전달받는 데이터를 처리하는 이벤트 핸들러 등록
  //여기서부터 사실상 
  mediaRecorder.ondataavailable = function (event) {
    if (event.data && event.data.size > 0) {
      console.log('ondataavailable');
      recordedChunks.push(event.data);
    }
  }

  // 3. 녹화 중지 이벤트 핸들러 등록
  pauseBtn.addEventListener('click', function () {
    mediaRecorder.pause();
  });

  mediaRecorder.onstop = function () {
  // createObjectURL로 생성한 url을 사용하지 않으면 revokeObjectURL 함수로 지워줘야합니다.
  // 그렇지 않으면 메모리 누수 문제가 발생합니다.
  if (recordedMediaURL) {
    URL.revokeObjectURL(recordedMediaURL);
  }

  const blob = new Blob(recordedChunks, { type: 'video/mp4;' });
  recordedMediaURL = URL.createObjectURL(blob);
  videoOutput.src = recordedMediaURL;//  저장되는 bloburl을 videoOutput element src에 저장

  };

  setTimeout(function(){
  mediaRecorder.start();
  },6000);

});
// 녹화 종료 버튼 클릭 시 빌생하는 이벤트 핸들러 등록
finishBtn.addEventListener('click', function () {
  if (mediaRecorder) {
    // 5. 녹화 중지
    mediaRecorder.stop();
    alert("녹화 종료. 다시 녹화를 하려면 Reset 해주세요.")
    //녹화 save버튼 누르면 웹캠 비디오 화면 사라진다.
    videoOutput.load();
  }
});


// 다운로드 버튼 클릭 시 발생하는 이벤트 핸들러 등록
downloadBtn.addEventListener('click', function () {
  console.log('recordedMediaURL : ', recordedMediaURL);
  if (recordedMediaURL) {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = recordedMediaURL;
    link.download = filenameInput.value;
    link.click();
    document.body.removeChild(link);
  }
});

function filenameSubmit(event){
  event.preventDefault(); //submit 시 페이지 새로고침을 방지
  console.dir(filenameInput.value);
}

//submit 시 prevent default|
filenameForm.addEventListener("submit",filenameSubmit);


/*//////////////////////////////////////////////////////////////////////
video logic
*///////////////////////////////////////////////////////////////////////

//출처: https://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_html&wr_id=292171


if(window.addEventListener){
  window.addEventListener('load', function(){
      if(window.HTMLVideoElement){
          var player = document.getElementById('teachVideo');
          player.addEventListener("ended", function(){
              alert("이제 자신의 동작을 채점하면서 학습해보세요")
              // 동영상 재생이 끝나면 실행될 코드\
                  if(player.canPlayType("video/mp4")){
                    //레이블 영상0 재생
                      player.src = "https://mztod.s3.ap-northeast-2.amazonaws.com/practice_LoveDive_0.mp4";
  
                    player.play();
                }

          });
        }
    }, false);
  };




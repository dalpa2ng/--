let pet_name = "물개"; 

let myBodyColor = "#EBEBFF";    // 몸
let myShadowColor = "#D8D8F7";  // 몸 그림자

let currentAction = "normal";   
// 'normal', 'eat', 'happy', 'angry', 'bath', 'sleep'

let actionStartTime = 0;    // 액션이 시작된 시점의 시간을 저장
let displayDuration = 3000; // 액션 유지 시간

function setup() {
  createCanvas(windowWidth, windowHeight);

  // --- 외부 기능 설정 (날씨 및 카메라) ---
  loadWeather();      // 날씨 데이터 받아오기 (위치 자동 감지)
  setupFaceCam();     // 표정 인식 모델 로드 (아직 웹캠은 안 켜짐)
}

function draw() {
  background(220);

  // 창문 그리기 
  drawWindow(250, 170, 250, 180);

  // 웹캠 버튼 (다른 버튼들과 같은 라인)
  drawFaceCamButton(530, height - 125, 120, 120);

  // 웹캠이 켜져 있을 때만 미리보기 표시
  if (faceCamActive) {
    drawFaceCamPreview(width - 220, 50, 200, 150);
  }

  applyFacialMoodToHappiness(); 
  applyWeatherToHappiness();


  // 현재 상태가 'sleep'이고, 시작한 지 3초가 지났다면 'normal'로 복귀!
  if (currentAction === "sleep" && millis() - actionStartTime >= displayDuration) {
    currentAction = "normal";
  } else if (currentAction === "eat" && millis() - actionStartTime >= displayDuration) {
    currentAction = "normal";
  } else if (currentAction === "happy" && millis() - actionStartTime >= displayDuration) {
    currentAction = "normal";
  } else if (currentAction === "angry" && millis() - actionStartTime >= displayDuration) {
    currentAction = "normal";
  } else if (currentAction === "bath" && millis() - actionStartTime >= displayDuration) {
    currentAction = "normal";
  } 

  // 기존에 만들어두신 상태별 몸 그리기 함수들
  if (currentAction === "normal") {
    normal_body();
  } else if (currentAction === "eat") {
    eat_body();
  } else if (currentAction === "happy") {
    happy_body();
  } else if (currentAction === "angry") {
    angry_body();
  } else if (currentAction === "bath") {
    bath_body();
  } else if (currentAction === "sleep") {
    sleep_body();
  }

  condition_hunger();  
  condition_happiness();
  condition_fatigue();
  level_up();

  if (typeof drawPaletteButton === 'function') drawPaletteButton();
  if (typeof showPalette !== 'undefined' && showPalette) { drawColorOptions(); }
}


// 표정에 따라 행복도 반영
function applyFacialMoodToHappiness() {
  if (facialMood === 'happy') {
    happiness += 0.2;
    happiness = constrain(happiness, 0, 175);
  } else if (facialMood === 'sad') {
    happiness -= 0.1;
    happiness = constrain(happiness, 0, 175);
  }
}

// 날씨에 따라 행복도 반영
function applyWeatherToHappiness() {
  if (!weatherLoaded) return;
  if (weatherCondition === 'clear') {
    happiness += 0.02;
    happiness = constrain(happiness, 0, 175);
  } else if (weatherCondition === 'rain' || weatherCondition === 'snow') {
    happiness -= 0.02;
    happiness = constrain(happiness, 0, 175);
  }
}
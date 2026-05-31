let hunger;
hunger = 175;

// [ ai ]
let cooldownTime_hunger = 10000;     // 쿨타임 10초 (10000밀리초)
let lastClickedTime_hunger = -10000; // 처음에는 바로 클릭할 수 있도록 초기화
let buttonPressed_hunger = false;    // 버튼 눌림 상태
let pressTime_hunger = 0;            // 버튼 눌린 시간

function condition_hunger() {

  // 배고픔 상태창을 만드는 코드
  noStroke();

  // 상태창 그림자
  fill(0, 0, 0, 30);
  rect(14, 14, 220, 70, 15);

  // 상태창 배경 (그라디언트 효과)
  fill(245);
  rect(10, 10, 220, 70, 15);

  // 테두리
  stroke(200);
  strokeWeight(2);
  noFill();
  rect(10, 10, 220, 70, 15);

  // 제목
  noStroke();
  fill(60);
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("배고픔", 25, 23);

  // 게이지 배경 (음각 효과)
  fill(210);
  rect(25, 50, 180, 20, 10);

  fill(230);
  rect(25, 51, 180, 18, 10);

  // 배고픔 상태에 따라 색이 변하도록 함 
  let gaugeWidth = map(hunger, 0, 175, 0, 180);

  noStroke();
  if (hunger >= 80) {
    // 녹색 그라디언트
    fill(100, 200, 100);
    rect(25, 50, gaugeWidth, 10, 10);
    fill(76, 175, 80);
    rect(25, 60, gaugeWidth, 10, 10);
  }
  else if (hunger < 80 && hunger >= 30) {
    // 노란색 그라디언트
    fill(255, 220, 50);
    rect(25, 50, gaugeWidth, 10, 10);
    fill(255, 193, 7);
    rect(25, 60, gaugeWidth, 10, 10);
  }
  else if (hunger < 30) {
    // 빨간색 그라디언트
    fill(255, 100, 100);
    rect(25, 50, gaugeWidth, 10, 10);
    fill(244, 67, 54);
    rect(25, 60, gaugeWidth, 10, 10);
  }

  // 게이지 하이라이트
  fill(255, 255, 255, 100);
  rect(25, 50, gaugeWidth, 5, 10);

  // 게이지 수치 표시
  fill(60);
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(int(hunger) + " / 175", 115, 60);

  // 배고픔 게이지가 줄게하는 코드, 최소와 최대를 설정함
  hunger = constrain(hunger, 0, 175);
  hunger -= 0.01;

  // 배고픔 게이지가 다 닳았을때 게임오버가 뜨게함
  if (hunger <= 0) {
    fill(0, 0, 0, 220);
    rect(0, 0, windowWidth, windowHeight);

    // Game Over 텍스트 그림자
    fill(0, 0, 0, 150);
    textSize(60);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Game Over", width / 2 + 3, height / 2 - 17);

    fill(255, 50, 50);
    text("Game Over", width / 2, height / 2 - 20);

    textSize(20);
    textStyle(NORMAL);
    fill(200);
    text("배고픔 게이지가 0이 되었습니다", width / 2, height / 2 + 30);
  }

  // [ ai ]
  // 1. 현재 쿨타임이 도는 중인지 확인
  let timePassed_hunger = millis() - lastClickedTime_hunger;
  let isCooldown_hunger = timePassed_hunger < cooldownTime_hunger;

  // 버튼 눌림 애니메이션 처리
  let pressOffset = 0;
  if (buttonPressed_hunger) {
    if (millis() - pressTime_hunger < 150) {
      pressOffset = 4;
    } else {
      buttonPressed_hunger = false;
    }
  }

  // 2. [시각 효과] 쿨타임 중이면 전체적으로 흐리게(투명하게) 보이도록 설정
  let btnAlpha = isCooldown_hunger ? 120 : 255;

  // 버튼 그림자
  noStroke();
  fill(0, 0, 0, 40);
  rect(14, height - 126 + pressOffset, 120, 120, 15);

  // 먹이주기 버튼 배경 (그라디언트)
  fill(255, 255, 255, btnAlpha);
  rect(10, height - 130 + pressOffset, 120, 120, 15);

  // 버튼 테두리
  stroke(200, 200, 200, btnAlpha);
  strokeWeight(2);
  noFill();
  rect(10, height - 130 + pressOffset, 120, 120, 15);

  noStroke();

  // 쿨타임 진행도 원형 표시
  if (isCooldown_hunger) {
    let cooldownProgress = timePassed_hunger / cooldownTime_hunger;

    // 진행 배경
    fill(0, 0, 0, 80);
    ellipse(70, height - 70 + pressOffset, 110, 110);

    // 진행 게이지
    fill(100, 200, 255, 150);
    arc(70, height - 70 + pressOffset, 110, 110, -PI/2, -PI/2 + TWO_PI * cooldownProgress);

    // 남은 시간 표시
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let remainingTime = ceil((cooldownTime_hunger - timePassed_hunger) / 1000);
    text(remainingTime + "초", 70, height - 70 + pressOffset);
  }

  // 그릇 디자인 (그림자 추가)
  fill(200, 200, 200, btnAlpha * 0.5);
  noStroke();
  ellipse(32, height - 78 + pressOffset, 16, 16);
  ellipse(32, height - 62 + pressOffset, 16, 16);
  ellipse(112, height - 78 + pressOffset, 16, 16);
  ellipse(112, height - 62 + pressOffset, 16, 16);
  rect(32, height - 76 + pressOffset, 80, 12);

  fill(240, 240, 240, btnAlpha);
  ellipse(30, height - 80 + pressOffset, 16, 16);
  ellipse(30, height - 64 + pressOffset, 16, 16);
  ellipse(110, height - 80 + pressOffset, 16, 16);
  ellipse(110, height - 64 + pressOffset, 16, 16);
  rect(30, height - 78 + pressOffset, 80, 12);

  // 고기 아이콘 그림자
  fill(0, 0, 0, btnAlpha * 0.3);
  rect(47, height - 96 + pressOffset, 50, 50, 15);

  // 고기 아이콘
  fill(165, 42, 42, btnAlpha);
  rect(45, height - 98 + pressOffset, 50, 50, 15);

  // 고기 하이라이트
  fill(200, 80, 70, btnAlpha);
  ellipse(55, height - 83 + pressOffset, 12, 12);
  ellipse(70, height - 88 + pressOffset, 15, 15);
  ellipse(85, height - 83 + pressOffset, 12, 12);

  // 고기 디테일
  fill(140, 30, 30, btnAlpha);
  ellipse(58, height - 75 + pressOffset, 8, 8);
  ellipse(82, height - 75 + pressOffset, 8, 8);

  // 버튼 라벨
  fill(100, 100, 100, btnAlpha);
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("먹이주기", 70, height - 38 + pressOffset);

  // 쿨타임 아닐 때 호버 효과 힌트
  if (!isCooldown_hunger) {
    fill(100, 200, 100, btnAlpha * 0.3);
    ellipse(70, height - 70 + pressOffset, 95, 95);
  }

}
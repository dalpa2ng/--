let happiness;
happiness = 175;

let cooldownTime_happiness = 10000;
let lastClickedTime_happiness = -10000;
let buttonPressed_happiness = false;
let pressTime_happiness = 0;

function condition_happiness() {
  translate(20, 0)

  // 행복도 상태창을 만드는 코드
  noStroke();

  // 상태창 그림자
  fill(0, 0, 0, 30);
  rect(224, 14, 220, 70, 15);

  // 상태창 배경 (그라디언트 효과)
  fill(245);
  rect(220, 10, 220, 70, 15);

  // 테두리
  stroke(200);
  strokeWeight(2);
  noFill();
  rect(220, 10, 220, 70, 15);

  // 제목
  noStroke();
  fill(60);
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("행복도", 235, 23);

  // 게이지 배경 (음각 효과)
  fill(210);
  rect(235, 50, 180, 20, 10);

  fill(230);
  rect(235, 51, 180, 18, 10);

  // 행복도 상태에 따라 색이 변하도록 함 
  let gaugeWidth = map(happiness, 0, 175, 0, 180);

  noStroke();
  if (happiness >= 80) {
    fill(100, 200, 100);
    rect(235, 50, gaugeWidth, 10, 10);
    fill(76, 175, 80);
    rect(235, 60, gaugeWidth, 10, 10);
  }
  else if (happiness < 80 && happiness >= 30) {
    fill(255, 220, 50);
    rect(235, 50, gaugeWidth, 10, 10);
    fill(255, 193, 7);
    rect(235, 60, gaugeWidth, 10, 10);
  }
  else if (happiness < 30) {
    fill(255, 100, 100);
    rect(235, 50, gaugeWidth, 10, 10);
    fill(244, 67, 54);
    rect(235, 60, gaugeWidth, 10, 10);
  }

  // 게이지 하이라이트
  fill(255, 255, 255, 100);
  rect(235, 50, gaugeWidth, 5, 10);

  // 게이지 수치 표시
  fill(60);
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(int(happiness) + " / 175", 325, 60);

  // 행복도 게이지가 줄게하는 코드, 최소와 최대를 설정함
  happiness = constrain(happiness, 0, 175);
  happiness -= 0.03;


  // 행복도 게이지가 다 닳았을때 게임오버가 뜨게함
  if (happiness <= 0) {
    fill(0, 0, 0, 220);
    rect(0, 0, windowWidth, windowHeight);

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
    text("행복도 게이지가 0이 되었습니다", width / 2, height / 2 + 30);
  }

  // 1. 현재 쿨타임이 도는 중인지 확인
  let timePassed_happiness = millis() - lastClickedTime_happiness;
  let isCooldown_happiness = timePassed_happiness < cooldownTime_happiness;

  // 버튼 눌림 애니메이션 처리
  let pressOffset = 0;
  if (buttonPressed_happiness) {
    if (millis() - pressTime_happiness < 150) {
      pressOffset = 4;
    } else {
      buttonPressed_happiness = false;
    }
  }

  // 2. [시각 효과] 쿨타임 중이면 전체적으로 흐리게(투명하게) 보이도록 설정
  let btnAlpha = isCooldown_happiness ? 120 : 255;

  // 버튼 그림자
  noStroke();
  fill(0, 0, 0, 40);
  rect(124, height - 126 + pressOffset, 120, 120, 15);

  // 말걸기 버튼 배경
  fill(255, 255, 255, btnAlpha);
  rect(120, height - 130 + pressOffset, 120, 120, 15);

  // 버튼 테두리
  stroke(200, 200, 200, btnAlpha);
  strokeWeight(2);
  noFill();
  rect(120, height - 130 + pressOffset, 120, 120, 15);

  noStroke();

  // 쿨타임 진행도 원형 표시
  if (isCooldown_happiness) {
    let cooldownProgress = timePassed_happiness / cooldownTime_happiness;

    fill(0, 0, 0, 80);
    ellipse(180, height - 70 + pressOffset, 110, 110);

    fill(100, 200, 255, 150);
    arc(180, height - 70 + pressOffset, 110, 110, -PI/2, -PI/2 + TWO_PI * cooldownProgress);

    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let remainingTime = ceil((cooldownTime_happiness - timePassed_happiness) / 1000);
    text(remainingTime + "초", 180, height - 70 + pressOffset);
  }

  // 말풍선 몸통 그림자
  fill(0, 0, 0, btnAlpha * 0.2);
  rect(150, height - 93 + pressOffset, 70, 50, 15);

  // 말풍선 몸통
  fill(255, 255, 255, btnAlpha);
  stroke(0, 0, 0, btnAlpha);
  strokeWeight(2);
  rect(148, height - 95 + pressOffset, 70, 50, 15);

  // 말풍선 꼬리
  fill(255, 255, 255, btnAlpha);
  triangle(168, height - 45 + pressOffset, 178, height - 45 + pressOffset, 163, height - 30 + pressOffset);
  stroke(0, 0, 0, btnAlpha);
  line(168, height - 45 + pressOffset, 163, height - 30 + pressOffset);
  line(178, height - 45 + pressOffset, 163, height - 30 + pressOffset);

  // 말풍선과 꼬리 경계 가리기
  noStroke();
  fill(255, 255, 255, btnAlpha);
  rect(168, height - 49 + pressOffset, 9, 5, 5);

  // 말풍선 안에 하트 그리기
  fill(255, 150, 150, btnAlpha);
  ellipse(175, height - 73 + pressOffset, 12, 12);
  ellipse(185, height - 73 + pressOffset, 12, 12);
  triangle(168, height - 68 + pressOffset, 192, height - 68 + pressOffset, 180, height - 58 + pressOffset);

  // 버튼 라벨
  fill(100, 100, 100, btnAlpha);
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("말걸기", 180, height - 38 + pressOffset);

  // 쿨타임 아닐 때 호버 효과 힌트
  if (!isCooldown_happiness) {
    fill(255, 150, 200, btnAlpha * 0.3);
    ellipse(180, height - 70 + pressOffset, 95, 95);
  }

}
let fatigue;
fatigue = 0;

let cooldownTime_fatigue1 = 10000;
let lastClickedTime_fatigue1 = -10000;
let buttonPressed_fatigue1 = false;
let pressTime_fatigue1 = 0;

let cooldownTime_fatigue2 = 10000;
let lastClickedTime_fatigue2 = -10000;
let buttonPressed_fatigue2 = false;
let pressTime_fatigue2 = 0;

function condition_fatigue() {
  translate(20, 0)

  // 피로도 상태창을 만드는 코드
  noStroke();

  // 상태창 그림자
  fill(0, 0, 0, 30);
  rect(434, 14, 220, 70, 15);

  // 상태창 배경
  fill(245);
  rect(430, 10, 220, 70, 15);

  // 테두리
  stroke(200);
  strokeWeight(2);
  noFill();
  rect(430, 10, 220, 70, 15);

  // 제목
  noStroke();
  fill(60);
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("피로도", 445, 23);

  // 게이지 배경 (음각 효과)
  fill(210);
  rect(445, 50, 180, 20, 10);

  fill(230);
  rect(445, 51, 180, 18, 10);

  // 피로도 상태에 따라 색이 변하도록 함 
  let gaugeWidth = map(fatigue, 0, 175, 0, 180);

  noStroke();
  if (fatigue <= 100) {
    fill(100, 200, 100);
    rect(445, 50, gaugeWidth, 10, 10);
    fill(76, 175, 80);
    rect(445, 60, gaugeWidth, 10, 10);
  }
  else if (fatigue > 100 && fatigue <= 145) {
    fill(255, 220, 50);
    rect(445, 50, gaugeWidth, 10, 10);
    fill(255, 193, 7);
    rect(445, 60, gaugeWidth, 10, 10);
  }
  else if (fatigue > 145) {
    fill(255, 100, 100);
    rect(445, 50, gaugeWidth, 10, 10);
    fill(244, 67, 54);
    rect(445, 60, gaugeWidth, 10, 10);
  }

  // 게이지 하이라이트
  fill(255, 255, 255, 100);
  rect(445, 50, gaugeWidth, 5, 10);

  // 게이지 수치 표시
  fill(60);
  textSize(12);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(int(fatigue) + " / 175", 535, 60);

  // 피로도 게이지가 늘게하는 코드, 최소와 최대를 설정함
  fatigue = constrain(fatigue, 0, 175);
  fatigue += 0.01;

  // 피로도 게이지가 다 채워졌을 때 게임오버가 뜨게함
  if (fatigue >= 175) {
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
    text("피로도 게이지가 가득 찼습니다", width / 2, height / 2 + 30);
  }

  // === 씻기기 버튼 ===
  let timePassed_fatigue1 = millis() - lastClickedTime_fatigue1;
  let isCooldown_fatigue1 = timePassed_fatigue1 < cooldownTime_fatigue1;

  
  
  let pressOffset1 = 0;
  if (buttonPressed_fatigue1) {
    if (millis() - pressTime_fatigue1 < 150) {
      pressOffset1 = 4;
    } else {
      buttonPressed_fatigue1 = false;
    }
  }

  let btnAlpha1 = isCooldown_fatigue1 ? 120 : 255;

  // 버튼 그림자
  noStroke();
  fill(0, 0, 0, 40);
  rect(234, height - 126 + pressOffset1, 120, 120, 15);

  // 버튼 배경
  fill(255, 255, 255, btnAlpha1);
  rect(230, height - 130 + pressOffset1, 120, 120, 15);

  // 버튼 테두리
  stroke(200, 200, 200, btnAlpha1);
  strokeWeight(2);
  noFill();
  rect(230, height - 130 + pressOffset1, 120, 120, 15);

  noStroke();

  // 쿨타임 진행도
  if (isCooldown_fatigue1) {
    let cooldownProgress = timePassed_fatigue1 / cooldownTime_fatigue1;

    fill(0, 0, 0, 80);
    ellipse(290, height - 70 + pressOffset1, 110, 110);

    fill(100, 200, 255, 150);
    arc(290, height - 70 + pressOffset1, 110, 110, -PI/2, -PI/2 + TWO_PI * cooldownProgress);

    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let remainingTime = ceil((cooldownTime_fatigue1 - timePassed_fatigue1) / 1000);
    text(remainingTime + "초", 290, height - 70 + pressOffset1);
  }

  push();
  // 샤워기 손잡이 그림자
  stroke(100, 100, 100, btnAlpha1 * 0.3);
  strokeWeight(8);
  line(282, height - 38 + pressOffset1, 297, height - 63 + pressOffset1);

  // 샤워기 손잡이
  stroke(180, 180, 180, btnAlpha1);
  strokeWeight(8);
  line(280, height - 40 + pressOffset1, 295, height - 65 + pressOffset1);

  // 샤워기 헤드 그림자
  fill(150, 150, 150, btnAlpha1 * 0.3);
  stroke(100, 100, 100, btnAlpha1 * 0.3);
  strokeWeight(2);
  ellipse(302, height - 73 + pressOffset1, 25, 25);

  // 샤워기 헤드
  fill(200, 200, 200, btnAlpha1);
  stroke(130, 130, 130, btnAlpha1);
  strokeWeight(2);
  ellipse(300, height - 75 + pressOffset1, 25, 25);

  // 물줄기 효과
  stroke(100, 150, 255, btnAlpha1);
  strokeWeight(2);
  line(305, height - 80 + pressOffset1, 320, height - 78 + pressOffset1);
  line(303, height - 75 + pressOffset1, 318, height - 68 + pressOffset1);
  line(300, height - 70 + pressOffset1, 315, height - 60 + pressOffset1);
  pop();

  // 버튼 라벨
  fill(100, 100, 100, btnAlpha1);
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("씻기기", 290, height - 38 + pressOffset1);

  if (!isCooldown_fatigue1) {
    fill(100, 200, 255, btnAlpha1 * 0.3);
    ellipse(290, height - 70 + pressOffset1, 95, 95);
  }

  // === 재우기 버튼 ===
  let timePassed_fatigue2 = millis() - lastClickedTime_fatigue2;
  let isCooldown_fatigue2 = timePassed_fatigue2 < cooldownTime_fatigue2;

  let pressOffset2 = 0;
  if (buttonPressed_fatigue2) {
    if (millis() - pressTime_fatigue2 < 150) {
      pressOffset2 = 4;
    } else {
      buttonPressed_fatigue2 = false;
    }
  }

  let btnAlpha2 = isCooldown_fatigue2 ? 120 : 255;

  // 버튼 그림자
  noStroke();
  fill(0, 0, 0, 40);
  rect(364, height - 126 + pressOffset2, 120, 120, 15);

  // 버튼 배경
  fill(255, 255, 255, btnAlpha2);
  rect(360, height - 130 + pressOffset2, 120, 120, 15);

  // 버튼 테두리
  stroke(200, 200, 200, btnAlpha2);
  strokeWeight(2);
  noFill();
  rect(360, height - 130 + pressOffset2, 120, 120, 15);

  noStroke();

  // 쿨타임 진행도
  if (isCooldown_fatigue2) {
    let cooldownProgress = timePassed_fatigue2 / cooldownTime_fatigue2;

    fill(0, 0, 0, 80);
    ellipse(420, height - 70 + pressOffset2, 110, 110);

    fill(100, 200, 255, 150);
    arc(420, height - 70 + pressOffset2, 110, 110, -PI/2, -PI/2 + TWO_PI * cooldownProgress);

    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    let remainingTime = ceil((cooldownTime_fatigue2 - timePassed_fatigue2) / 1000);
    text(remainingTime + "초", 420, height - 70 + pressOffset2);
  }

  push();

  let bx = 360 + 60; 
  let by = height - 110 + 55 + pressOffset2;

  // 침대 프레임 그림자
  stroke(50, 30, 10, btnAlpha2 * 0.3);
  strokeWeight(3);
  noFill();
  line(bx - 35 + 2, by - 3, bx - 35 + 2, by + 17);
  line(bx + 35 + 2, by - 3, bx + 35 + 2, by + 17);
  line(bx - 35 + 2, by + 12, bx + 35 + 2, by + 12);

  // 침대 프레임
  stroke(80, 50, 20, btnAlpha2);
  strokeWeight(3);
  line(bx - 35, by - 5, bx - 35, by + 15);
  line(bx + 35, by - 5, bx + 35, by + 15);
  line(bx - 35, by + 10, bx + 35, by + 10);

  // 매트리스 그림자
  fill(220, 218, 205, btnAlpha2 * 0.3);
  strokeWeight(1.5);
  rect(bx - 33, by - 3, 70, 15, 3);

  // 매트리스
  fill(250, 248, 235, btnAlpha2);
  stroke(80, 50, 20, btnAlpha2);
  strokeWeight(1.5);
  rect(bx - 35, by - 5, 70, 15, 3);

  // 베개
  fill(255, 255, 255, btnAlpha2);
  stroke(80, 50, 20, btnAlpha2);
  strokeWeight(1);
  rect(bx - 32, by - 20, 28, 16, 3);
  rect(bx + 4, by - 20, 28, 16, 3);

  // 이불
  fill(173, 216, 230, btnAlpha2);
  strokeWeight(1.5);
  rect(bx - 35, by + 1, 70, 12, 2);

  pop();

  // 버튼 라벨
  fill(100, 100, 100, btnAlpha2);
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("재우기", 420, height - 38 + pressOffset2);

  if (!isCooldown_fatigue2) {
    fill(173, 216, 230, btnAlpha2 * 0.3);
    ellipse(420, height - 70 + pressOffset2, 95, 95);
  }

}
let level = 1;
let experience = 0;
 

function level_up() {
  translate(-40, 0)
  // -------------------------------------------------------------
  // 1. 프로필 창 UI (배고픔 상태창 아래, 겹치지 않게)
  // -------------------------------------------------------------
  noStroke();

  // 프로필 창 그림자
  fill(0, 0, 0, 30);
  rect(14, 94, 220, 80, 15);

  // 프로필 창 배경 (그라디언트 효과)
  fill(245);
  rect(10, 90, 220, 80, 15);

  // 테두리
  stroke(200);
  strokeWeight(2);
  noFill();
  rect(10, 90, 220, 80, 15);

  noStroke();

  // 프로필 이미지 그림자
  fill(0, 0, 0, 30);
  ellipse(52, 132, 52, 52);

  // 프로필 이미지 배경
  fill(240);
  ellipse(50, 130, 52, 52);

  // 프로필 이미지
  fill(200, 200, 255);
  ellipse(50, 130, 48, 48);

  // 프로필 테두리
  noFill();
  stroke(150);
  strokeWeight(2);
  ellipse(50, 130, 48, 48);
  noStroke();

  // 레벨 뱃지 그림자
  fill(0, 0, 0, 40);
  ellipse(52, 108, 28, 28);

  // 레벨 뱃지 배경 (금색)
  fill(255, 215, 0);
  ellipse(50, 106, 28, 28);

  // 레벨 뱃지 테두리
  noFill();
  stroke(200, 165, 0);
  strokeWeight(2);
  ellipse(50, 106, 28, 28);
  noStroke();

  // 레벨 텍스트
  fill(80);
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("Lv." + level, 50, 106);

  // 사용자명
  fill(60);
  textSize(18);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("username", 80, 100);

  // 경험치 라벨
  fill(100);
  textSize(11);
  textStyle(NORMAL);
  text("EXP", 80, 122);

  // 경험치바 배경 (음각 효과)
  fill(210);
  rect(80, 135, 140, 18, 9);

  fill(230);
  rect(80, 136, 140, 16, 9);

  // 경험치바 (그라디언트)
  let expWidth = map(experience, 0, 70, 0, 140);
  fill(150, 255, 150);
  rect(80, 135, expWidth, 9, 9);
  fill(100, 220, 100);
  rect(80, 144, expWidth, 9, 9);

  // 경험치바 하이라이트
  fill(255, 255, 255, 100);
  rect(80, 135, expWidth, 5, 9);

  // 경험치 수치 표시
  fill(60);
  textSize(11);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(int(experience) + " / 70", 150, 144);

  // -------------------------------------------------------------
  // 2. 상태 요약 창 UI (프로필창 아래, 겹치지 않게)
  // -------------------------------------------------------------
  // 상태 요약 창 그림자
  fill(0, 0, 0, 30);
  rect(14, 184, 220, 80, 15);

  // 상태 요약 창 배경
  fill(245);
  rect(10, 180, 220, 80, 15);

  // 테두리
  stroke(200);
  strokeWeight(2);
  noFill();
  rect(10, 180, 220, 80, 15);

  noStroke();

  translate(0, -5);

  // 제목
  fill(60);
  textSize(14);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("상태 요약", 25, 193);

  // 배고픔 게이지
  fill(80);
  textSize(11);
  textStyle(NORMAL);
  text("🍖", 25, 215);

  fill(210);
  rect(45, 213, 165, 12, 6);
  fill(230);
  rect(45, 214, 165, 10, 6);

  let hungerWidth = map(hunger, 0, 175, 0, 165);
  if (hunger >= 80) {
    fill(100, 200, 100);
    rect(45, 213, hungerWidth, 6, 6);
    fill(76, 175, 80);
    rect(45, 219, hungerWidth, 6, 6);
  } else if (hunger >= 30) {
    fill(255, 220, 50);
    rect(45, 213, hungerWidth, 6, 6);
    fill(255, 193, 7);
    rect(45, 219, hungerWidth, 6, 6);
  } else {
    fill(255, 100, 100);
    rect(45, 213, hungerWidth, 6, 6);
    fill(244, 67, 54);
    rect(45, 219, hungerWidth, 6, 6);
  }

  // 피로도 게이지
  fill(80);
  textSize(11);
  text("💤", 25, 232);

  fill(210);
  rect(45, 230, 165, 12, 6);
  fill(230);
  rect(45, 231, 165, 10, 6);

  let fatigueWidth = map(fatigue, 0, 175, 0, 165);
  if (fatigue <= 100) {
    fill(100, 200, 100);
    rect(45, 230, fatigueWidth, 6, 6);
    fill(76, 175, 80);
    rect(45, 236, fatigueWidth, 6, 6);
  } else if (fatigue <= 145) {
    fill(255, 220, 50);
    rect(45, 230, fatigueWidth, 6, 6);
    fill(255, 193, 7);
    rect(45, 236, fatigueWidth, 6, 6);
  } else {
    fill(255, 100, 100);
    rect(45, 230, fatigueWidth, 6, 6);
    fill(244, 67, 54);
    rect(45, 236, fatigueWidth, 6, 6);
  }

  // 행복도 게이지
  fill(80);
  textSize(11);
  text("❤️", 25, 249);

  fill(210);
  rect(45, 247, 165, 12, 6);
  fill(230);
  rect(45, 248, 165, 10, 6);

  let happinessWidth = map(happiness, 0, 175, 0, 165);
  if (happiness >= 80) {
    fill(100, 200, 100);
    rect(45, 247, happinessWidth, 6, 6);
    fill(76, 175, 80);
    rect(45, 253, happinessWidth, 6, 6);
  } else if (happiness >= 30) {
    fill(255, 220, 50);
    rect(45, 247, happinessWidth, 6, 6);
    fill(255, 193, 7);
    rect(45, 253, happinessWidth, 6, 6);
  } else {
    fill(255, 100, 100);
    rect(45, 247, happinessWidth, 6, 6);
    fill(244, 67, 54);
    rect(45, 253, happinessWidth, 6, 6);
  }

  // -------------------------------------------------------------
  // 3. 게임 로직 및 레벨업 시스템
  // -------------------------------------------------------------
  if (experience >= 70) {
    level += 1;
    experience = 0;
  }

  // 게임 오버 조건
  if (fatigue >= 175 || happiness <= 0 || hunger <= 0) {
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
    text("게임 종료", width / 2, height / 2 + 30);
  }
}
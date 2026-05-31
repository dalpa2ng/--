let faceMeshModel;
let faceVideo;
let detectedFaces = [];

// 다른 파일에서 읽을 전역 변수
let facialMood = 'none';
let smileScore = 0;
let faceCamActive = false;

// === 자동 보정 시스템 ===
let baselineScore = null;       // 사용자의 무표정 기준선
let isCalibrating = false;      // 보정 중인지 여부
let calibrationSamples = [];    // 보정 중 수집되는 샘플
const CALIBRATION_DURATION = 90; // 보정 샘플 수 (약 3초)

// 기준선 대비 변화량 임계치
const SMILE_DELTA = 0.08;  // 기준선보다 +0.08 이상 → 웃음
const SAD_DELTA = 0.08;    // 기준선보다 -0.08 이하 → 슬픔

// 버튼 눌림 애니메이션
let buttonPressed_facecam = false;
let pressTime_facecam = 0;

// ============================================
// 초기 세팅 (setup에서 한 번 호출)
// ============================================
function setupFaceCam() {
  // 모델만 로드, 웹캠은 아직 안 켬
  faceMeshModel = ml5.faceMesh({
    maxFaces: 1,
    refineLandmarks: false,
    flipHorizontal: true
  });

  console.log('[facecam] 모델 로드 완료. 버튼을 눌러 시작하세요.');
}

// ============================================
// 웹캠 켜기 - 버튼 누를 때만
// ============================================
function startFaceCam() {
  if (faceCamActive) return;

  // 여기서 웹캠 열기
  faceVideo = createCapture(VIDEO);
  faceVideo.size(320, 240);
  faceVideo.hide();

  // 감지 시작
  faceMeshModel.detectStart(faceVideo, gotFaces);
  faceCamActive = true;
  startCalibration();
  console.log('[facecam] 표정 인식 시작 - 보정 중...');
}

// ============================================
// 웹캠 끄기 - 정말로 꺼버리기
// ============================================
function stopFaceCam() {
  if (!faceCamActive) return;

  faceMeshModel.detectStop();

  // 웹캠 스트림 완전 종료
  if (faceVideo) {
    faceVideo.remove();
    faceVideo = null;
  }

  faceCamActive = false;
  facialMood = 'none';
  baselineScore = null;
  console.log('[facecam] 표정 인식 중지');
}

// ============================================
// 보정 (캘리브레이션)
// ============================================
function startCalibration() {
  isCalibrating = true;
  calibrationSamples = [];
  baselineScore = null;
}

// 수동 재보정 (UI 버튼 등에서 호출 가능)
function recalibrate() {
  if (faceCamActive) {
    startCalibration();
    console.log('[facecam] 재보정 시작');
  }
}

// ============================================
// 얼굴 감지 및 처리
// ============================================
function gotFaces(results) {
  detectedFaces = results;

  if (detectedFaces.length > 0) {
    processFace(detectedFaces[0]);
  } else {
    facialMood = 'none';
  }
}

function processFace(face) {
  const kp = face.keypoints;

  // 입꼬리 좌우
  const leftCorner = kp[61];
  const rightCorner = kp[291];
  // 눈 바깥 (얼굴 크기 정규화 기준)
  const leftEye = kp[33];
  const rightEye = kp[263];

  const eyeDistance = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
  const mouthWidth = dist(leftCorner.x, leftCorner.y, rightCorner.x, rightCorner.y);
  const ratio = mouthWidth / eyeDistance;

  smileScore = ratio;

  // 보정 중이면 샘플 수집
  if (isCalibrating) {
    calibrationSamples.push(ratio);

    if (calibrationSamples.length >= CALIBRATION_DURATION) {
      // 평균값을 기준선으로 저장
      const sum = calibrationSamples.reduce((a, b) => a + b, 0);
      baselineScore = sum / calibrationSamples.length;
      isCalibrating = false;
      console.log('[facecam] 보정 완료. 기준선:', baselineScore.toFixed(3));
    }

    facialMood = 'calibrating';
    return;
  }

  // 보정 끝났으면 기준선 대비 판정
  if (baselineScore !== null) {
    const delta = ratio - baselineScore;

    if (delta >= SMILE_DELTA) {
      facialMood = 'happy';
    } else if (delta <= -SAD_DELTA) {
      facialMood = 'sad';
    } else {
      facialMood = 'neutral';
    }
  }
}

// ============================================
// 웹캠 미리보기 그리기
// ============================================
function drawFaceCamPreview(x, y, w, h) {
  push();

  if (!faceCamActive) {
    // 웹캠 꺼진 상태
    fill(220);
    noStroke();
    rect(x, y, w, h);
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(14);
    text('웹캠 꺼짐', x + w/2, y + h/2);
  } else {
    // 웹캠 영상
    image(faceVideo, x, y, w, h);

    // 상단 상태 바
    fill(0, 0, 0, 150);
    noStroke();
    rect(x, y, w, 25);

    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);

    let label = '';
    if (isCalibrating) {
      const progress = Math.floor((calibrationSamples.length / CALIBRATION_DURATION) * 100);
      label = `🎯 무표정 유지... ${progress}%`;
    } else if (facialMood === 'happy') {
      label = '😊 행복';
    } else if (facialMood === 'sad') {
      label = '😢 슬픔';
    } else if (facialMood === 'neutral') {
      label = '😐 무표정';
    } else {
      label = '얼굴 없음';
    }

    text(label, x + 8, y + 12);

    // 보정 중 안내 메시지
    if (isCalibrating) {
      fill(0, 0, 0, 180);
      rect(x, y + h - 30, w, 30);
      fill(255);
      textAlign(CENTER, CENTER);
      text('카메라를 보고 평소 표정을 유지하세요', x + w/2, y + h - 15);
    }
  }

  pop();
}

// ============================================
// 표정 인식 버튼 그리기
// ============================================
function drawFaceCamButton(x, y, w, h) {
  push();

  // 버튼 눌림 애니메이션
  let pressOffset = 0;
  if (buttonPressed_facecam) {
    if (millis() - pressTime_facecam < 150) {
      pressOffset = 4;
    } else {
      buttonPressed_facecam = false;
    }
  }

  // 버튼 그림자
  fill(0, 0, 0, 40);
  noStroke();
  rect(x + 4, y + 4 + pressOffset, w, h, 15);

  // 버튼 배경 (상태별 그라디언트)
  if (faceCamActive) {
    fill(255, 100, 100);  // 활성화 시 빨간색
  } else {
    fill(100, 200, 255);  // 비활성화 시 파란색
  }
  rect(x, y + pressOffset, w, h, 15);

  // 상단 하이라이트
  fill(255, 255, 255, 150);
  rect(x, y + pressOffset, w, h/2, 15, 15, 0, 0);

  // 버튼 테두리
  noFill();
  stroke(255);
  strokeWeight(3);
  rect(x, y + pressOffset, w, h, 15);

  noStroke();

  // 카메라 아이콘
  let cx = x + w/2;
  let cy = y + h/2 + pressOffset;

  // 카메라 몸체 그림자
  fill(0, 0, 0, 50);
  rect(cx - 28, cy - 13, 60, 40, 5);
  rect(cx - 13, cy - 21, 30, 10, 3);

  // 카메라 몸체
  fill(60);
  rect(cx - 30, cy - 15, 60, 40, 5);

  // 카메라 상단 돌출부
  fill(80);
  rect(cx - 15, cy - 23, 30, 10, 3);

  // 렌즈 (바깥)
  fill(30);
  ellipse(cx, cy + 5, 28, 28);

  // 렌즈 (중간)
  fill(50);
  ellipse(cx, cy + 5, 22, 22);

  // 렌즈 (안쪽 반사)
  if (faceCamActive) {
    fill(255, 100, 100);
  } else {
    fill(100, 150, 255);
  }
  ellipse(cx, cy + 5, 16, 16);

  // 렌즈 하이라이트
  fill(255, 255, 255, 150);
  ellipse(cx - 4, cy + 2, 6, 6);

  // 웹캠 켜진 상태 표시 (깜빡이는 LED + 광채)
  if (faceCamActive && frameCount % 60 < 30) {
    // LED 광채
    fill(255, 0, 0, 80);
    ellipse(x + w - 18, y + 18 + pressOffset, 18, 18);
    // LED
    fill(255, 0, 0);
    ellipse(x + w - 18, y + 18 + pressOffset, 12, 12);
    // LED 하이라이트
    fill(255, 150, 150);
    ellipse(x + w - 20, y + 16 + pressOffset, 5, 5);
  }

  // 버튼 라벨
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  if (faceCamActive) {
    text('표정인식 OFF', cx, y + h - 18 + pressOffset);
  } else {
    text('표정인식 ON', cx, y + h - 18 + pressOffset);
  }

  // 비활성화 시 호버 효과 힌트
  if (!faceCamActive) {
    fill(100, 200, 255, 80);
    ellipse(cx, cy, 95, 95);
  }

  pop();
}

// 버튼 클릭 영역 판정 (mousePressed에서 호출)
function isFaceCamButtonClicked(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w &&
         mouseY >= y && mouseY <= y + h;
}
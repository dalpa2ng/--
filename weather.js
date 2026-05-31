// ============================================
// 날씨 API 모듈 (담당: 정유린)
// ============================================
// 사용법:
//   - setup()에서 loadWeather() 호출
//   - weatherCondition: 'clear' | 'clouds' | 'rain' | 'snow'
//   - weatherCity: 현재 감지된 도시명 (영어)
// ============================================

const WEATHER_API_KEY = 'c337280e4796a80cf040594eced72498';

// 다른 파일에서 읽을 전역 변수
let weatherCondition = 'clear';
let weatherTemp = 20;
let weatherCity = 'Seoul';
let weatherLoaded = false;

// 날씨 데이터 받아오기 (위치 자동 감지)
function loadWeather() {
  // 1. 브라우저에 위치 권한 요청
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // 성공: 위도/경도로 날씨 조회
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log('[weather] 위치 감지됨:', lat, lon);
        fetchWeatherByCoords(lat, lon);
      },
      // 실패 또는 거절: 서울로 fallback
      (error) => {
        console.log('[weather] 위치 권한 거절. 서울로 fallback');
        fetchWeatherByCity('Seoul');
      },
      { timeout: 5000 } // 5초 안에 응답 없으면 실패 처리
    );
  } else {
    // 브라우저가 위치 기능 지원 안 함
    console.log('[weather] 위치 기능 미지원. 서울로 fallback');
    fetchWeatherByCity('Seoul');
  }
}

// 좌표로 날씨 가져오기
function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  loadJSON(url, parseWeatherData);
}

// 도시명으로 날씨 가져오기 (fallback용)
function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
  loadJSON(url, parseWeatherData);
}

// 받아온 데이터 처리
function parseWeatherData(data) {
  const main = data.weather[0].main.toLowerCase();
  
  if (main === 'clear') {
    weatherCondition = 'clear';
  } else if (main === 'rain' || main === 'drizzle' || main === 'thunderstorm') {
    weatherCondition = 'rain';
  } else if (main === 'snow') {
    weatherCondition = 'snow';
  } else {
    weatherCondition = 'clouds';
  }
  
  weatherTemp = data.main.temp;
  weatherCity = data.name;
  weatherLoaded = true;
  
  console.log(`[weather] ${weatherCity}: ${weatherCondition}, ${weatherTemp}°C`);
}

// 창문 그리기
function drawWindow(x, y, w, h) {
  push();
  clip(() => rect(x, y, w, h));
  noStroke();
  
  if (weatherCondition === 'clear') {
    fill(135, 206, 235);
  } else if (weatherCondition === 'clouds') {
    fill(180, 180, 190);
  } else if (weatherCondition === 'rain') {
    fill(100, 110, 130);
  } else if (weatherCondition === 'snow') {
    fill(220, 225, 230);
  }
  rect(x, y, w, h);
  
  if (weatherCondition === 'rain') {
    drawRain(x, y, w, h);
  } else if (weatherCondition === 'snow') {
    drawSnow(x, y, w, h);
  } else if (weatherCondition === 'clouds') {
    drawClouds(x, y, w, h);
  }
  
  pop();
  
  // 창틀
  push();
  noFill();
  stroke(80);
  strokeWeight(4);
  rect(x, y, w, h);
  pop();
}

function drawRain(x, y, w, h) {
  stroke(200, 220, 255, 180);
  strokeWeight(2);
  for (let i = 0; i < 30; i++) {
    let rx = x + (frameCount * 2 + i * 37) % w;
    let ry = y + (frameCount * 8 + i * 53) % h;
    line(rx, ry, rx - 3, ry + 40);
  }
}

function drawSnow(x, y, w, h) {
  noStroke();
  fill(255);
  for (let i = 0; i < 25; i++) {
    let sx = x + (i * 47 + sin(frameCount * 0.02 + i) * 20) % w;
    let sy = y + (frameCount * 1.5 + i * 31) % h;
    circle(sx, sy, 4);
  }
}

function drawClouds(x, y, w, h) {
  noStroke();
  fill(255, 255, 255, 150);
  for (let i = 0; i < 4; i++) {
    let cx = x + (frameCount * 0.3 + i * 100) % (w + 120) - 60;
    let cy = y + 20 + i * 18;
    ellipse(cx, cy, 80, 35);
  }
}
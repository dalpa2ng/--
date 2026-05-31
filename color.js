let showPalette = false; 

// 버튼 위치 및 크기 변수
let paletteX = 0;           
let paletteY = 30;    
let paletteW = 120;  
let paletteH = 120;

let palettePressOffset = 0;
let paletteBtnAlpha = 255; 

// 버튼 디자인
function drawPaletteButton() {
  paletteX = width - paletteW - 30; 
  
  push();
  
  noStroke();
  fill(0, 0, 0, 40);
  rect(paletteX + 4, paletteY + 4 + palettePressOffset, paletteW, paletteH, 15);

  fill(255, 255, 255, paletteBtnAlpha);
  rect(paletteX, paletteY + palettePressOffset, paletteW, paletteH, 15);

  stroke(200, 200, 200, paletteBtnAlpha);
  strokeWeight(2);
  noFill();
  rect(paletteX, paletteY + palettePressOffset, paletteW, paletteH, 15);
  
  // 글씨
  noStroke();
  fill(100, 100, 100, paletteBtnAlpha);
  textSize(14);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("색상변경", paletteX + paletteW / 2, paletteY + paletteH - 28 + palettePressOffset);
  
  push();
  noStroke();
  translate(paletteX + 60, paletteY + 45 + palettePressOffset);
  
  // 원 배경
  fill("#E1E1FF4D");
  ellipse(0, 15, 95, 95);

  rotate(radians(-35)); 

  // 붓 그림자
  fill(0, 0, 0, 30);
  rect(-3, -28, 8, 55, 4);

  // 붓
  fill("#A2896B"); 
  rect(-5, -25, 10, 55, 4);

  fill("#85684C");
  rect(-5, -25, 10, 10, 2);

  // 금속
  fill("#E0D4B7"); 
  stroke(180);
  strokeWeight(1);
  rect(-6, 25, 12, 10, 1);

  // 붓모
  noStroke();
  fill("#D3B9A0"); 
  triangle(-6, 35, 6, 35, 0, 55);
  ellipse(0, 37, 12, 12); 

  // 물감
  fill("#B8B8DA"); 
  triangle(-4, 43, 4, 43, 0, 53);
  ellipse(0, 45, 6, 8); 
  
  pop();
  
  pop(); 
} 

// 색상 옵션 디자인
function drawColorOptions() {
  let colors = [
    { name: "purple", body: "#EBEBFF", shadow: "#D8D8F7" },
    { name: "mint", body: "#E7FFFA", shadow: "#B9ECE4" },
    { name: "pink", body: "#FCE3F0", shadow: "#FFCEE7" },
    { name: "yellow", body: "#FFF6DD", shadow: "#F2E3BC" }
  ];

  push();
  for (let i = 0; i < colors.length; i++) {
    let optX = paletteX;
    let optY = paletteY + paletteH + 15 + (i * 55);
    let optW = paletteW; 
    let optH = 45;  

    if (mouseX >= optX && mouseX <= optX + optW && mouseY >= optY && mouseY <= optY + optH) {
      stroke(100);
      strokeWeight(3);
    } else {
      stroke(200);
      strokeWeight(1.5);
    }

    fill(colors[i].body);
    rect(optX, optY, optW, optH, 10);

    noStroke();
    fill(80);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(colors[i].name, optX + optW / 2, optY + optH / 2);
  }
  pop();
}

// 마우스 클릭 처리
function checkPaletteClick() {
  paletteX = width - paletteW - 30; 
  
  if (mouseX >= paletteX && mouseX <= paletteX + paletteW && 
      mouseY >= paletteY && mouseY <= paletteY + paletteH) {
    showPalette = !showPalette; 
    return;
  }

  if (showPalette) {
    let colors = [
      { body: "#EBEBFF", shadow: "#D8D8F7" },
      { body: "#E7FFFA", shadow: "#B9ECE4" },
      { body: "#FCE3F0", shadow: "#FFCEE7" },
      { body: "#FFF6DD", shadow: "#F2E3BC" }
    ];

    for (let i = 0; i < colors.length; i++) {
      let optX = paletteX;
      let optY = paletteY + paletteH + 15 + (i * 55);
      let optW = paletteW;
      let optH = 45;

      if (mouseX >= optX && mouseX <= optX + optW && 
          mouseY >= optY && mouseY <= optY + optH) {
        
        myBodyColor = colors[i].body;
        myShadowColor = colors[i].shadow;
        break;
      }
    }
  }
}
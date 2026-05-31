function angry_body () {
  push();
  translate(width / 2, height / 2); 
  
  translate(-200, -200);

  if (currentAction === "angry") drawAngry();

function drawAngry() {
  noStroke(); // 몸+다리
  fill(myShadowColor);
  ellipse(172, 303, 40, 50);
  ellipse(228, 303, 40, 50);
  ellipse(200, 255, 130, 130);
  fill(myBodyColor);
  ellipse(200, 250, 130, 130);
  ellipse(175, 300, 40, 50);
  ellipse(225, 300, 40, 50);
  
  push();
  translate(144, 240); // 팔
  rotate(radians(20)); 
  fill(myShadowColor);
  ellipse(2, 3, 34, 57);
  fill(myBodyColor);
  ellipse(0, 0, 34, 65);
  pop();

  push();
  translate(256, 240);
  rotate(radians(-20)); 
  fill(myShadowColor);
  ellipse(-2, 3, 38, 57);
  fill(myBodyColor);
  ellipse(0, 0, 38, 65);
  pop();
  
  fill(myShadowColor); // 머리
  ellipse(200, 187, 120, 95);
  fill(myBodyColor);
  ellipse(200, 184, 120, 95);
  
  fill("#4B4B4D"); // 눈
  push();
  translate(172, 185);
  rotate(radians(10)); 
  ellipse(0, 0, 15, 10);
  fill(255);
  ellipse(-1, -1, 4, 3);
  pop();
  
  push();
  translate(228, 185);
  rotate(radians(-10)); 
  ellipse(0, 0, 15, 10);
  fill(255);
  ellipse(-1, -1, 4, 3);
  pop();
  
  push(); // 화난거1
for (let i = 50; i > 0; i -= 2) {
  fill(255, 0, 0, (50 - i) * 0.3); 
  ellipse(200, 182, i, i * 0.35); 
}
  pop();
  
  ellipse(195, 195, 12, 8); // 코+입
  ellipse(205, 195, 12, 8);
  
  fill(myBodyColor);
  ellipse(195, 192, 12, 8);
  ellipse(205, 192, 12, 8);
  
  fill("#4B4B4D");
  ellipse(200, 193, 8, 5);
  
  stroke("#4B4B4D"); // 눈썹
  strokeWeight(2);
  line(169, 172, 177, 176);
  line(223, 176, 231, 172);
  
  push(); // 화난거2
  noFill()
  stroke(255, 0, 0); 
  strokeWeight(3);  
  translate(235, 155);  
  arc(-7, -7, 12, 12, 0, HALF_PI);
  arc(10, -7, 12, 12, HALF_PI, PI);
  arc(-7, 10, 12, 12, TWO_PI-HALF_PI, TWO_PI);
  arc(10, 10, 12, 12, PI, TWO_PI-HALF_PI); 
  pop();

  noStroke(); // 배
  fill(255);
  ellipse(200, 268, 63, 60);
  
  noFill(); // 머리카락
  stroke("#4B4B4D");
  strokeWeight(1);
  push();
  translate(200, 126);
  rotate(radians(-60));
  arc(0, 0, 25, 20, 50, PI);
  pop();
}
  pop();
}
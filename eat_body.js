function eat_body () {
  push();
  translate(width / 2, height / 2); 
  
  translate(-200, -200);
 
  if (currentAction === "eat") drawEat();

function drawEat() {
  noStroke(); // 몸+다리
  fill(myShadowColor);
  ellipse(172, 303, 40, 50);
  ellipse(228, 303, 40, 50);
  ellipse(200, 255, 130, 130);
  fill(myBodyColor);
  ellipse(200, 250, 130, 130);
  ellipse(175, 300, 40, 50);
  ellipse(225, 300, 40, 50);
  

  push(); // 팔
  translate(144, 240);
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
  
  ellipse(195, 195, 12, 8); // 코+입
  ellipse(205, 195, 12, 8);
  
  fill(myBodyColor);
  ellipse(195, 192, 12, 8);
  ellipse(205, 192, 12, 8);
 
  fill("#4B4B4D");
  ellipse(214, 197, 14, 15);
  ellipse(185, 197, 14, 13);
  
  fill(myBodyColor);
  ellipse(217, 197, 14, 15);
  ellipse(182, 197, 14, 13);
  
  fill("#4B4B4D");
  ellipse(200, 193, 8, 5);
  
  stroke("#4B4B4D"); // 눈썹
  line(169, 170, 177, 171);
  line(223, 171, 231, 170);

  noStroke(); // 배
  fill(255);
  ellipse(200, 268, 63, 60);
  
  fill("#E7CDA6"); // 음식 부스러기
  ellipse(180, 200, 6, 4);
  ellipse(175, 197, 5, 3);
  ellipse(220, 199, 6, 4);
  
  push(); // 포크
  translate(122, 240);
  rotate(radians(-35));
  fill(255);
  rect(-2.5, -5, 5, 25); 
  ellipse(0, -5, 18, 18); 
  triangle(-6, -10, -2, -10, -4, -20);
  triangle(-2, -10, 2, -10, 0, -20);
  triangle(2, -10, 6, -10, 4, -20);
  ellipse(0, 20, 5, 5);
  pop();
  
  push(); // 수저
  translate(278, 240);
  rotate(radians(35));
  fill(255);
  rect(-2.5, -5, 5, 25); 
  ellipse(0, -5, 18, 18); 
  ellipse(0, 20, 5, 5);
  pop();
  
  noFill(); // 머리카락
  stroke("#4B4B4D");
  push();
  translate(200, 126);
  rotate(radians(-60));
  arc(0, 0, 25, 20, 50, PI);
  pop();
}
  pop();
}
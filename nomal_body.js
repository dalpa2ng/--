function normal_body () {
  push();
  translate(width / 2, height / 2); 
  
  translate(-200, -200);
  
  if (currentAction === "normal") drawNormal();

  pop();

function drawNormal() {
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
  
  ellipse(195, 195, 12, 8); // 코+입
  ellipse(205, 195, 12, 8);
  
  fill(myBodyColor);
  ellipse(195, 192, 12, 8);
  ellipse(205, 192, 12, 8);
  
  fill("#4B4B4D");
  ellipse(200, 193, 8, 5);
  
  stroke("#4B4B4D"); // 눈썹
  line(169, 173, 177, 175);
  line(223, 175, 231, 173);

  noStroke(); // 배
  fill(255);
  ellipse(200, 268, 63, 60);
  
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
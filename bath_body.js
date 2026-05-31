function bath_body () {
  push();
  translate(width / 2, height / 2); 
  
  translate(-200, -200);
  
  
if (currentAction === "bath") drawBath();

function drawBath() {
  noStroke(); // 물
  fill("#B7EDFF");
  ellipse(180, 330, 120, 26);
  ellipse(235, 333, 62, 28);
  fill("#B3EAFD");
  ellipse(180, 330, 100, 16);
  ellipse(235, 333, 46, 15);
  
  fill(myShadowColor); // 몸+다리
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
  rotate(radians(-60)); 
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
  ellipse(0, 0, 15, 3);
  pop();
  
  push();
  translate(228, 185);
  rotate(radians(-10)); 
  ellipse(0, 0, 15, 3);
  pop();
  
  ellipse(195, 195, 12, 8); // 코+입
  ellipse(205, 195, 12, 8);
  
  fill(myBodyColor);
  ellipse(195, 192, 12, 8);
  ellipse(205, 192, 12, 8);
  
  fill("#4B4B4D");
  ellipse(200, 193, 8, 5);
  
  stroke("#4B4B4D"); // 눈썹
  line(169, 173, 177, 173);
  line(223, 173, 231, 173);

  noStroke(); // 배
  fill(255);
  ellipse(200, 268, 63, 60);
  
  push();
  fill("#FFF1AC"); // 스펀지
  translate(260, 240);
  rotate(radians(-20))
  rect(0, 0, 40, 30, 6); 
  pop();
  
  fill("#D5F7F8"); // 비눗방울
  stroke(255);
  ellipse(245, 230, 16, 16);
  ellipse(165, 275, 12, 12);
  ellipse(215, 260, 20, 20);
  ellipse(294, 260, 10, 10);
  fill("#D6F4FD"); 
  ellipse(190, 290, 10, 10);
  ellipse(160, 150, 18, 18);
  fill("#E3F3FF"); 
  stroke("#B6ECF8")
  ellipse(171, 147, 12, 12);
  ellipse(275, 190, 14, 14);
  ellipse(285, 265, 15, 15);

  
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
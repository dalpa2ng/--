function sleep_body () {
  push();
  translate(width / 2, height / 2); 
  
  translate(-200, -200);

  if (currentAction === "sleep") drawSleep();

function drawSleep() {
  push();
  translate(0, 100);

  translate(200, 200); 
  rotate(radians(90)); 
  translate(-200, -200); 

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
  
  fill("#BECDF5"); // 베개
  rect(164, 150, 110, 60, 15);

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
  
  fill("#DDEAFF"); // 이불
  rect(118, 250, 170, 100, 10);
  fill(255);
  rect(118, 250, 170, 20, 10);
  
 
  noFill(); // 머리카락
  stroke("#4B4B4D");
  push();
  translate(200, 126);
  rotate(radians(-60));
  arc(0, 0, 25, 20, radians(50), PI); 
  pop();

  pop();

  push(); //zzz
  fill("#4949AD");
  noStroke();
  textSize(16);
  textStyle(BOLD);
  text("Z", 250, 203);
  textSize(22);
  text("Z", 265, 185);
  textSize(28);
  text("Z", 280, 165);
  pop();
}
  pop();
}
function happy_body () {
  push();
  translate(width / 2, height / 2); 
  
  translate(-200, -200);

  if (currentAction === "happy") drawHappy();

function drawHappy() {
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
  translate(144, 230); // 팔
  rotate(radians(130)); 
  fill(myShadowColor);
  ellipse(2, 3, 34, 57);
  fill(myBodyColor);
  ellipse(0, 0, 34, 65);
  pop();

  push();
  translate(256, 230);
  rotate(radians(-130)); 
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
  ellipse(172, 185, 15, 13);
  ellipse(228, 185, 15, 13);
  
  fill(myBodyColor);
  ellipse(172, 188, 16, 13);
  ellipse(228, 188, 16, 13);
  
  stroke("#4B4B4D"); // 코+입
  fill("#FDBADC");
  ellipse(200, 198, 14, 16);
  
  noStroke()
  fill("#4B4B4D");
  ellipse(195, 195, 12, 8);
  ellipse(205, 195, 12, 8);
  
  fill(myBodyColor);
  ellipse(195, 192, 12, 8);
  ellipse(205, 192, 12, 8);
  
  fill("#4B4B4D");
  ellipse(200, 193, 8, 5);
  
  stroke("#4B4B4D"); // 눈썹
  line(169, 170, 177, 172);
  line(223, 172, 231, 170);

  noStroke(); // 배
  fill(255);
  ellipse(200, 268, 63, 60);
  
  fill("#FAD6E9"); // 볼터치
  ellipse(170, 195, 13, 7);
  ellipse(230, 195, 13, 7);
  
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
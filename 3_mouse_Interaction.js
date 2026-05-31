function mousePressed() {
  
  // -------------------------------------------------------------
  // 1. 색상 변경
  // -------------------------------------------------------------
  if (typeof checkPaletteClick === 'function') { checkPaletteClick(); }
  
  
  // -------------------------------------------------------------
  // 2. 먹이주기
  // -------------------------------------------------------------
  if (mouseX >= 10 && mouseX <= 130 && mouseY >= height - 130 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_hunger >= cooldownTime_hunger) {
      buttonPressed_hunger = true;
      pressTime_hunger = millis();

      hunger += 50;
      hunger = constrain(hunger, 0, 175);
      experience += 5;
      experience = constrain(experience, 0, 70);
      
      currentAction = "eat";
      actionStartTime = millis(); // 💡 모션 시작 시간 기록 추가
      lastClickedTime_hunger = millis(); 
    }
  }

  // -------------------------------------------------------------
  // 3. 말풍선 (행복도)
  // -------------------------------------------------------------
  if (mouseX >= 140 && mouseX <= 260 && mouseY >= height - 130 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_happiness >= cooldownTime_happiness) {
      let key_interaction;
      key_interaction = prompt("이름을 불러주세요!");
      if (key_interaction === pet_name) {
        buttonPressed_happiness = true;
        pressTime_happiness = millis();
        console.log("좋아하네요");

        happiness += 50;
        happiness = constrain(happiness, 0, 175);
        experience += 5;
        experience = constrain(experience, 0, 70);

        currentAction = "happy";
        actionStartTime = millis(); // 💡 모션 시작 시간 기록 추가
        lastClickedTime_happiness = millis(); 
      }
    }
  }

  // -------------------------------------------------------------
  // 4. 씻기기
  // -------------------------------------------------------------
  if (mouseX >= 250 && mouseX <= 370 && mouseY >= height - 130 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_fatigue1 >= cooldownTime_fatigue1) {
      buttonPressed_fatigue1 = true;
      pressTime_fatigue1 = millis();

      fatigue -= 50;
      fatigue = constrain(fatigue, 0, 175);
      experience += 5;
      experience = constrain(experience, 0, 70);
      
      currentAction = "bath";
      actionStartTime = millis(); // 💡 모션 시작 시간 기록 추가
      lastClickedTime_fatigue1 = millis(); 
    }
  }

  // -------------------------------------------------------------
  // 5. 재우기
  // -------------------------------------------------------------
  if (mouseX >= 380 && mouseX <= 500 && mouseY >= height - 130 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_fatigue2 >= cooldownTime_fatigue2) {
      buttonPressed_fatigue2 = true;
      pressTime_fatigue2 = millis();

      fatigue -= 50;
      fatigue = constrain(fatigue, 0, 175);
      experience += 5;
      experience = constrain(experience, 0, 70);
      
      currentAction = "sleep";
      actionStartTime = millis(); // (기존에 잘 작성하셨던 부분)
      lastClickedTime_fatigue2 = millis(); 
    }
  }
}
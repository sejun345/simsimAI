function handleInput(event) {
    if (event.key === 'Enter') {
        const userInput = document.getElementById('user-input').value.trim();
        
        if (userInput !== "") {
            const cleanedInput = userInput.replace(/\s+/g, '').toLowerCase();
            
            addMessage(userInput, "user");

            // 언어 감지 및 번역 처리
            detectLanguage(userInput, (detectedLanguage) => {
                if (detectedLanguage !== 'ko') {  // 입력 언어가 한국어가 아니라면
                    translateText(userInput, 'ko', (translatedText) => {
                        const aiResponse = getAIResponse(translatedText);
                        addMessage(aiResponse, "ai");
                    });
                } else {
                    const aiResponse = getAIResponse(cleanedInput);
                    addMessage(aiResponse, "ai");
                }
            });
            document.getElementById('user-input').value = '';
        }
    }
}

// 언어 감지 함수 (예시로 Google Translate API를 사용)
function detectLanguage(text, callback) {
    const url = `https://translation.googleapis.com/language/translate/v2/detect?key=YOUR_GOOGLE_API_KEY`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text
        })
    })
    .then(response => response.json())
    .then(data => {
        const language = data.data.detections[0][0].language;
        callback(language);
    })
    .catch(error => {
        console.error("Error detecting language:", error);
        callback('en');  // 기본 언어를 영어로 설정
    });
}
function getAIResponse(cleanedInput) {
    let aiResponse = '';

    if (cleanedInput.includes('자기소개')) {
        aiResponse = "저는 심심이 빰치는 ai입니다. 베타버전이라 오류가 많을 수 있습니다!";
    } else if (cleanedInput.includes('안녕')) {
        aiResponse = "안녕하세요! 무엇을 도와드릴까요?";
    } else if (cleanedInput.includes('날씨')) {
        aiResponse = "날씨는 모르지만, 항상 기분 좋은 날을 만들어드릴 수 있어요!";
    } else if (cleanedInput.includes('개발')) {
        aiResponse = '이 test용 ai는 <a href="http://github.com/sejun345">se_U</a>와 chat gpt가 기여했습니다!';
    }
    // 다른 입력에 대한 AI 응답 처리...

    else {
        aiResponse = "저는 아직 학습중입니다.";
    }

    return aiResponse;
}
function addMessage(message, type) {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add(type === 'user' ? 'user-message' : 'ai-message');
    messageElement.innerHTML = message;  // Use innerHTML to render the <a> tag
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}

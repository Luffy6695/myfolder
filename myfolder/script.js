// Chatbot knowledge base
const chatbotKnowledge = {
    coding: {
        html: "HTML is the standard markup language for creating web pages. It describes the structure of a web page and consists of elements that tell the browser how to display the content.",
        css: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. It handles the look and formatting of web pages.",
        python: "Python is a high-level, interpreted programming language known for its simple syntax and readability. It's great for beginners and is widely used in web development, data science, and AI.",
        java: "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It's known for its 'Write Once, Run Anywhere' capability."
    },
    gameDevelopment: {
        "2d": "2D game development focuses on creating games with flat, two-dimensional graphics. It's often easier to start with and can create engaging gameplay experiences.",
        "3d": "3D game development involves creating games with three-dimensional graphics. It's more complex than 2D development but can create immersive virtual worlds.",
        unity: "Unity is a popular cross-platform game engine used to create both 2D and 3D games. It uses C# as its primary programming language.",
        unreal: "Unreal Engine is a powerful game engine known for its high-quality graphics. It's commonly used for creating AAA games and uses C++ as its programming language."
    },
    artAndCraft: {
        painting: "Painting is the practice of applying paint, pigment, color or other medium to a surface. There are many techniques including oil, watercolor, and acrylic painting.",
        drawing: "Drawing is a form of visual art that creates images on a surface, typically paper, using instruments like pencils, pens, or charcoal.",
        printmaking: "Printmaking is the process of creating artworks by printing, typically on paper. Common techniques include woodcut, etching, and lithography.",
        ceramic: "Ceramics involves creating objects from clay that are made permanent by heat. It includes pottery, tiles, and sculptural works."
    },
    music: {
        composition: "Music composition is the process of creating new musical pieces. It involves understanding melody, harmony, rhythm, and musical structure.",
        harmony: "Harmony in music refers to the combination of different musical notes played simultaneously to create chords and chord progressions.",
        melody: "Melody is a sequence of musical notes that form the main tune in a piece of music. It's the part you might find yourself humming or singing.",
        rhythm: "Rhythm is the pattern of regular or irregular pulses in music. It includes concepts like tempo, meter, and beat patterns."
    },
    finance: {
        cashFlow: "Cash flow refers to the movement of money in and out of a business. It's crucial for understanding a company's liquidity and financial health.",
        profitability: "Profitability measures a business's ability to generate profit relative to its revenue, assets, or investments.",
        forecasting: "Financial forecasting involves predicting future financial outcomes based on historical data and market trends.",
        investing: "Investing is the process of allocating resources (usually money) with the expectation of generating income or profit over time."
    }
};

// Topics with official website URLs
const topics = {
    coding: {
        html: "https://www.w3schools.com/html/",
        css: "https://www.w3schools.com/css/",
        python: "https://www.python.org/",
        java: "https://www.java.com/"
    },
    gameDevelopment: {
        "2d": "https://www.udemy.com/topic/2d-game-development/",
        "3d": "https://www.udemy.com/topic/3d-game-development/",
        unity: "https://unity.com/learn",
        unreal: "https://www.unrealengine.com/learn"
    },
    artAndCraft: {
        painting: "https://www.skillshare.com/browse/painting",
        drawing: "https://www.skillshare.com/browse/drawing",
        printmaking: "https://www.coursera.org/courses?query=printmaking",
        ceramic: "https://www.masterclass.com/articles/ceramic-art"
    },
    music: {
        composition: "https://www.berklee.edu/music-composition",
        harmony: "https://www.musictheory.net/lessons",
        melody: "https://www.udemy.com/topic/melody/",
        rhythm: "https://www.musictheory.net/lessons/11"
    },
    finance: {
        cashFlow: "https://www.investopedia.com/terms/c/cashflow.asp",
        profitability: "https://www.investopedia.com/terms/p/profitabilityratios.asp",
        forecasting: "https://www.investopedia.com/terms/f/financial-forecast.asp",
        investing: "https://www.investor.gov/introduction-investing"
    }
};

function generateBotResponse(input) {
    input = input.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        return "Hello! How can I help you today? You can ask me about coding, game development, art and craft, music, or finance!";
    }

    for (const domain in chatbotKnowledge) {
        for (const topic in chatbotKnowledge[domain]) {
            if (input.includes(topic.toLowerCase())) {
                return chatbotKnowledge[domain][topic];
            }
        }
    }

    const domains = {
        coding: "I can help you learn about HTML, CSS, Python, and Java. What specific topic interests you?",
        "game development": "I can tell you about 2D/3D game development, Unity, and Unreal Engine. What would you like to know?",
        "art": "I can discuss painting, drawing, printmaking, and ceramics. What interests you?",
        music: "I can help you understand composition, harmony, melody, and rhythm. What would you like to learn about?",
        finance: "I can explain cash flow, profitability, forecasting, and investing. What topic interests you?"
    };

    for (const domain in domains) {
        if (input.includes(domain)) {
            return domains[domain];
        }
    }

    return "I'm not sure about that. Can you ask something about coding, game development, art, music, or finance?";
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Chat functionality
    const chatIcon = document.getElementById('chatIcon');
    const chatbox = document.getElementById('chatbox');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');

    if (chatIcon && chatbox && closeChat && sendMessage && userInput) {
        chatIcon.addEventListener('click', () => {
            chatbox.style.display = chatbox.style.display === 'none' || chatbox.style.display === '' ? 'flex' : 'none';
        });

        closeChat.addEventListener('click', () => {
            chatbox.style.display = 'none';
        });

        sendMessage.addEventListener('click', sendChatMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    // Login functionality
    const loginSubmit = document.getElementById('loginSubmit');
    if (loginSubmit) {
        loginSubmit.addEventListener('click', handleLogin);
    }

    // Domain selection
    const domainSelect = document.getElementById('domain');
    if (domainSelect) {
        domainSelect.addEventListener('change', handleDomainSelection);
    }

    // Topic selection
    const topicLink = document.getElementById('topicLink');
    if (topicLink) {
        topicLink.addEventListener('click', handleTopicSelection);
    }
});

function sendChatMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message) {
        displayMessage(message, 'user-message');
        const botResponse = generateBotResponse(message);
        setTimeout(() => {
            displayMessage(botResponse, 'bot-message');
        }, 1000);
        userInput.value = '';
    }
}

function displayMessage(message, className) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleLogin() {
    const name = document.getElementById('name').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    if (name && username && password && confirmPassword) {
        if (password === confirmPassword) {
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('redirectoryPage').classList.remove('hidden');
        } else {
            alert('Passwords do not match!');
        }
    } else {
        alert('Please fill all fields!');
    }
}

function handleDomainSelection() {
    const domain = document.getElementById('domain').value;
    const topicContainer = document.getElementById('topicContainer');
    const topicSelect = document.getElementById('topicSelect');

    if (domain) {
        topicContainer.classList.remove('hidden');
        topicSelect.innerHTML = '<option value="">Choose a topic</option>';
        for (const topic in topics[domain]) {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
            topicSelect.appendChild(option);
        }
    } else {
        topicContainer.classList.add('hidden');
    }
}

function handleTopicSelection() {
    const domain = document.getElementById('domain').value;
    const topic = document.getElementById('topicSelect').value;

    if (domain && topic) {
        window.open(topics[domain][topic], '_blank');
    } else {
        alert('Please select both a domain and a topic.');
    }
}
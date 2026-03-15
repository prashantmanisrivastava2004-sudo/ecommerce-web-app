const searchInput = document.getElementById('searchInput');
const categorySections = document.querySelectorAll('.category-section');

function filterCategory(category) {
    categorySections.forEach(section => {
        if (section.id === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    categorySections.forEach(section => {
        if (section.id.toLowerCase().includes(query) || query === '') {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
});

const toggleBtn = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("close-chat");

toggleBtn.onclick = () => {
chatbot.style.display = "flex";
};

closeChat.onclick = () => {
chatbot.style.display = "none";
};

const input = document.getElementById("chat-input");
const chat = document.getElementById("chat-messages");

input.addEventListener("keypress", async function(e){

if(e.key==="Enter"){

let message=input.value;

chat.innerHTML+=`<div class="user">${message}</div>`;

input.value="";

const response = await fetch("http://localhost:3000/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message})
});

const data=await response.json();

chat.innerHTML+=`<div class="bot">${data.reply}</div>`;

chat.scrollTop=chat.scrollHeight;

}

});
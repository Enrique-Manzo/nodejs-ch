// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        }
    }
});


const socket = io();

socket.on("conexionOK", data => {
    console.log(data.messages)
    document.getElementById("messages_list").innerHTML = data.messages.map(message => `<li><strong class="chat_email">${message.user}</strong>
     <span class="chat_date">${new Date().toLocaleString()}</span>:
     <span class="chat_message">${message.text}</span></li>`).join("");
     
})

const btn = document.getElementById("btn_send");

const userMessage = document.getElementById("user_message");
const userEmail = document.getElementById("user_email")

btn.addEventListener("click", ()=>{
    if (userEmail.value.length > 1 &&  userEmail.value.includes("@")) {
        socket.emit("message", {user: userEmail.value, text: userMessage.value})
        userMessage.value = "";
    }
})
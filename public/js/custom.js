const socket = io();

// LIVE PRODUCTS

if (window.location.href === "http://localhost:8080/watches" || window.location.href === "http://localhost:8080/") {
    
    socket.emit("retrieveWatches")
        
    
    Handlebars.registerHelper('isFeatured', function (featured) {
        return featured == "Featured";
    });
    socket.on("watchesData", data => {
                
        const htmlString = `{{#each watches}}
        <div class="{{#if (isFeatured this.tag)}}col-md-6 {{else}}col-sm-6 col-xl-3{{/if}}">
        <div class="box">
            <a>
            <div class="img-box">
                <img src="{{this.image}}" alt="">
            </div>
            <div class="detail-box">
                <h6>
                {{this.name}}
                </h6>
                <h6>
                Price:
                <span>
                    {{this.price}}
                </span>
                </h6>
            </div>
            <div class="new">
                <span>
                {{this.tag}}
                </span>
            </div>
            </a>
        </div>
        </div>
        {{/each}}`;

        const template = Handlebars.compile(htmlString)
        const html = template({watches: data.watches})
        document.getElementById("watches__section").innerHTML = html

    })

    const viewAllBtn = document.getElementById("btn_send_product");

    const productName = document.getElementById("product_name");
    const productPrice = document.getElementById("product_price");
    const productTag = document.getElementById("product_tag");
    const productImage = document.getElementById("product_image");

    viewAllBtn.addEventListener("click", ()=>{
        socket.emit("pushWatchAndRetrieve", {id: String(new Date().getTime()), watch_name: productName.value, price: productPrice.value, tag: productTag.value, image: productImage.value})
    })
}

// CHAT APP
/*
if (window.location.href === "http://localhost:8080/chat") {
    socket.emit("requestMessages", ()=>{
        socket.on("conexionOK", data => {
            document.getElementById("messages_list").innerHTML = data.messages.map(message => `<li><strong class="chat_email">${message.author.alias}</strong>
            <img class="chat_avatar" src="${message.author.avatar}">
            <span class="chat_message">${message.text}</span></li>`).join("");
        })


        const btn = document.getElementById("btn_send");

        const userEmail = document.getElementById("user_email");
        const name = document.getElementById("user_name");
        const surname = document.getElementById("user_surname");
        const age = document.getElementById("user_age");
        const nickname = document.getElementById("user_nickname");
        const avatar = document.getElementById("user_avatar");
        const userMessage = document.getElementById("user_message");

        btn.addEventListener("click", ()=>{
            if (userEmail.value.length > 1 &&  userEmail.value.includes("@")) {
                socket.emit("message", {
                    author: {
                        id: userEmail.value,
                        nombre: name.value,
                        apellido: surname.value,
                        edad: age.value,
                        alias: nickname.value,
                        avatar: avatar.value,

                    },
                    text: userMessage.value
                })
                userMessage.value = "";
            }
        })
    })

}
*/

// NEW CHAT APP

if (window.location.href === "http://localhost:8080/chat") {
    socket.emit("requestMessages")
    socket.on("conexionOK", data => {
        document.getElementById("chat_messages_new").innerHTML = data.messages.map(message =>        
        `
        <div class="chat-message-right pb-4">
            <div>
                <img src="${message.author.avatar}" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">2:33 am</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                <div class="font-weight-bold mb-1">${message.author.alias}</div>
                ${message.text}
            </div>
        </div>
        `).join("");
    })
}

// LOGIN MANAGEMENT

const loginManagement = () => {

    const loginUsername = document.getElementById("login_username").value;
    const loginPassword = document.getElementById("login_password").value;

    document.getElementById("button_container").innerHTML = "<div>LOADING...</div>";

    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            username: loginUsername,
            password: loginPassword
        })
        })
        .then( (response) => { 
            
            if (response.status == 200) {
                window.location.replace("/");
            }
        });


}

if (window.location.href === "http://localhost:8080/login") {
    document.getElementById("login_button").addEventListener("click", loginManagement);
}

// REGISTRATION MANAGEMENT

const registrationManagement = () => {

    const loginUsername = document.getElementById("login_username").value;
    const loginPassword = document.getElementById("login_password").value;

    document.getElementById("button_container").innerHTML = "<div>LOADING...</div>";

    fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            username: loginUsername,
            password: loginPassword
        })
        })
        .then( (response) => { 
            
            if (response.status == 200) {
                window.location.replace("/");
            }
        });
}

if (window.location.href === "http://localhost:8080/signup") {
    document.getElementById("registration_button").addEventListener("click", registrationManagement);
}

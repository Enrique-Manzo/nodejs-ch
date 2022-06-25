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

// LIVE PRODUCTS

if (window.location.href === "http://localhost:8080/watches" || window.location.href === "http://localhost:8080/") {
    Handlebars.registerHelper('isFeatured', function (featured) {
        return featured == "Featured";
      });
    socket.on("watchesData", data => {
        console.log("listening")
        const htmlString = `{{#each watches}}
        <div class="{{#if (isFeatured this.tag)}}col-md-6 {{else}}col-sm-6 col-xl-3{{/if}}">
        <div class="box">
            <a>
            <div class="img-box">
                <img src="{{this.image}}" alt="">
            </div>
            <div class="detail-box">
                <h6>
                {{this.watch_name}}
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

    console.log(viewAllBtn)
    viewAllBtn.addEventListener("click", ()=>{
        socket.emit("requestWatchesData", {id: String(new Date().getTime()), watch_name: productName.value, price: productPrice.value, tag: productTag.value, image: productImage.value})
    })
}

// CHAT APP

if (window.location.href === "http://localhost:8080/chat") {
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

}

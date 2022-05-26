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

    socket.on("watchesData", data => {
        console.log("listening")
        const htmlString = `{{#each watches}}
        <div class="{{#if this.featured}}col-md-6 {{else}}col-sm-6 col-xl-3{{/if}}">
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

    console.log(viewAllBtn)
    viewAllBtn.addEventListener("click", ()=>{
        console.log("requestWatchesData")
        socket.emit("requestWatchesData", {name: productName.value, price: productPrice.value, tag: productTag.value, image: productImage.value})
    })
}

// CHAT APP

if (window.location.href === "http://localhost:8080/chat") {
    socket.on("conexionOK", data => {
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

}
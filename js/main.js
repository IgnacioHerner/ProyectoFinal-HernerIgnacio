const miCarrito = new Carrito([]);

mostrarProductos();
mostrarCarrito();
mostrarTotalCarrito();
programarBotonesCarritos();

function mostrarProductos()
{
    products.forEach(element => {
        const div = document.createElement("div");
        div.className ="card"
        div.innerHTML=`
        
            <img src='${element.image}'style="
            display: flex;
            justify-content: space-around;
            align-items: center;
            width="50px"/> <br>
            <h3>${element.title}</h3><br/>
            <p>Precio: $${element.price}</p><br/>
        `
        const btn = document.createElement('button')
        btn.className = "btn_agregar"
        btn.innerText="Agregar Al carrito"
        btn.addEventListener('click', ()=>{
            const productoParaCarrito = {
                ...element,
                cantidad:1,
            }

            miCarrito.agregarProducto(productoParaCarrito);
            mostrarCarrito();
            console.log("Carrito" , miCarrito);
        })

        div.appendChild(btn);
        document.body.appendChild(div);
    });

}

function mostrarCarrito()
{
    const divCarrito = document.getElementById("carrito");
    divCarrito.className = "carrito_compras"
    divCarrito.innerHTML="";
    miCarrito.productos.forEach(element=>{
        const div = document.createElement("div");
        div.innerHTML=`
        
            <img src='${element.image}' width="60px"/> <br>
            ${element.title}<br/>
            $${element.price*element.cantidad}<br/>
            Cantidad: ${element.cantidad}

        `
        divCarrito.appendChild(div)

        const btnBorrar = document.createElement('button')
        btnBorrar.className="btn_borrar"
        btnBorrar.innerHTML="BORRAR"
        btnBorrar.addEventListener('click',()=>{

            borrarProducto(element);

        })
        div.appendChild(btnBorrar);

        divCarrito.appendChild(div)
        
    })

    mostrarTotalCarrito();
}

function mostrarTotalCarrito()
{
     const divTotal = document.getElementById("totalCarrito");
     divTotal.innerHTML="";
     total = miCarrito.calcularTotal();
     
     divTotal.innerHTML="TOTAL: $"+total.toFixed(2);

}

function programarBotonesCarritos()
{
    programarVaciarCarrito();
}

function programarVaciarCarrito()
{
    const btn = document.getElementById('vaciarCarrito')
    btn.addEventListener('click', ()=>{
        miCarrito.vaciarCarrito();
        mostrarCarrito();
    })
}

function borrarProducto(producto)
{
    miCarrito.borrarProducto(producto);
    mostrarCarrito();
}

// Eventos BOTON

const boton1 = document.getElementById("boton1");
boton1.addEventListener("click", ()=>{

  Swal.fire({
    title:'Hola',
    text:'Que tema desea?',
    icon:'question',
    confirmButtonText:'Dark Mode',
    cancelButtonText:'Light Mode',
    showCancelButton: true,
  }).then((result)=>{
    if(result.isConfirmed)
    {
      document.body.setAttribute("style", "background-color: #082032");
      
    }
    else
    {
      document.body.setAttribute("style", "background-color: white");
    }
  })
  
});

// FETCH

programarMenuInicial();

const mainContainer = document.getElementById("appContainer");

function programarMenuInicial() {

   programarBotonAdmin();
   programarBotonPreview();

}

function programarBotonPreview() {
   const btn = document.getElementById("ver")
   btn.addEventListener("click", () => {

      cargarPosts();
   })
}

function cargarPosts() {
   fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => response.json())
      .then((json) => mostrarDatos(json))
      .catch(() => alert("intente de nuevo"))
}

function mostrarDatos(data) {
   const div = document.getElementById("appContainer");
   div.innerText = "";
   data.forEach(blogPost => {

      const { title, body, id } = blogPost

      const divPost = document.createElement("div");
      divPost.innerHTML = `<h2>${title}</h2>
                          <p>
                           ${body}
                          </p>
                          <hr />
      `
      const btn = document.createElement("button")
      btn.innerText = "Ver más..."
      btn.addEventListener("click", () =>

         cargarPost(id)

      );
      divPost.appendChild(btn);
      div.appendChild(divPost)

   })
}

function programarBotonAdmin() {

   const btn = document.getElementById("admin")
   btn.addEventListener("click", () => {

      agregarPost();
   })

}

function agregarPost() {
   let title = prompt("Ingrese el titulo")
   let contenido = prompt("Ingrese el contenido")

   fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
         title: title,
         body: contenido,
         userId: 1,
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then(() => alert("POST INSERTADO CORRECTAMENTE"));


}


async function cargarPost(id) {

   try {
      let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      let json = await response.json();
      mostrarPost(json)
   }
   catch{
      alert("OCURRIO UN ERROR");
   }

   /*
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => mostrarPost(json))
   */

}


function mostrarPost(post) {

   const { title, body } = post;

   const div = document.getElementById("appContainer");
   div.innerText = "";
   const divPost = document.createElement("div");
   divPost.innerHTML = `<h1>${title}</h1>
                      <p>${body}</p>`

   div.appendChild(divPost);
}
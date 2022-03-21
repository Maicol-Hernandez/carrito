const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    getResponse();
    if (localStorage.getItem('carrito')) {
       carrito =  JSON.parse(localStorage.getItem('carrito'))
       showCart()
    }
});
cards.addEventListener('click', (e) => {
    addCarrito(e)
})

items.addEventListener('click', (e) => {
    btnAction(e)
    
});


const getResponse = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCards(data)
    } catch (error) {
        console.log(error);
    }
};

const pintarCards = data => {
    cards.innerHTML = ""
    data.forEach(producto => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('h5').textContent = producto.title
        clone.querySelector('p').textContent = producto.precio
        clone.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        clone.querySelector('.btn-dark').dataset.id = producto.id
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}

const addCarrito = (e) => {
    if (e.target.classList.contains('btn-dark')) {

        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = (objeto) => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        precio: objeto.querySelector('p').textContent,
        title: objeto.querySelector('h5').textContent,
        cantidad: 1
    }
    carrito.hasOwnProperty(producto.id) === true ? producto.cantidad = carrito[producto.id].cantidad + 1 : producto.cantidad = 1
    carrito[producto.id] = { ...producto }
    showCart()
}

const showCart = () => {
    items.innerHTML = ""
    Object.values(carrito).forEach((producto) => {
        const clone = templateCarrito.cloneNode(true)
        clone.querySelector('th').textContent = producto.id
        clone.querySelectorAll('td')[0].textContent = producto.title
        clone.querySelectorAll('td')[1].textContent = producto.cantidad
        clone.querySelector('.btn-info').dataset.id = producto.id
        clone.querySelector('.btn-danger').dataset.id = producto.id
        clone.querySelector('span').textContent = producto.cantidad * producto.precio
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    showFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const showFooter = () => {
    // emptyCart()
    const totalItems = calcularTotal()
    // console.log('totalItems :>> ', totalItems);
    footer.innerHTML = ""
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar! &#129297;</th>`
        return
    }
    const clone = templateFooter.cloneNode(true)
    clone.querySelectorAll('td')[0].textContent = totalItems.nCantidad
    clone.querySelector('span').textContent = totalItems.nPrecio
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciarCarrito = document.getElementById('vaciar-carrito');
    btnVaciarCarrito.addEventListener('click', () => {
        carrito = {}
        showCart()
    });

}

const calcularTotal = () => {
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)
    return { nCantidad, nPrecio }
}

const btnAction = (e) => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        showCart()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad --
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]    
        }
          showCart()
    }
e.stopPropagation()
}


const btnActionDecremente = (e) => {
    console.log(' :>> ', );
   
    e.stopPropagation()
}
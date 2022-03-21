let nIntervalId;
const cambiaDeColor = () => {
    nIntervalId = setInterval(getResponse, 4000)
}
const flasheaText = () => {
    const oElem = document.getElementById('mi_mensaje')
    console.log("oElem",oElem)
    oElem.style.color = oElem.style.color == "red" ? "blue" :  "red"
}
const detenerCambioDeColor = () => {
    clearInterval(nIntervalId)
}

const getResponse = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        console.log(data);
        // pintarCards(data)
    } catch (error) {
        console.log(error);
    }
};
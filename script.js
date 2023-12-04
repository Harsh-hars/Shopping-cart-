

let cards = document.querySelector("#cards");

// responsible for generating card 
let generatecard = () => {
    return (cards.innerHTML = items.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];

        return ` <div class="card" id = product-id-${id}>
   <img src=${img}>
   <div class="txt-container">
       <h3>${name}</h3>
       <p>${desc}</p>
       <div class="btn">
           <h2>$${price}</h2>
           <div class="button">
               <i  class="bi bi-dash" onclick="decrement(${id})"></i>
               <div class="quantity" id=${id}> ${search.item === undefined ? 0 : search.item}</div>
               <i class="bi bi-plus" onclick="increment(${id})"></i>
           </div>
       </div>
   </div>
</div>`
    }).join()) // here join used to combine without any white space 

}

// basket will store objects containing id and 
// items selected
let basket = JSON.parse(localStorage.getItem("data")) || [];
// let basket =localStorage.getItem("data") || [];

console.log(basket)

let increment = (id) => {
    // select the div with product id basically 
    // it select div of quantity
    let selectedItem = id;

    // check if basket have that product id 
    // serach for the selected item
    let search = basket.find((x) => x.id === selectedItem.id);

    // if basket not has presence of id
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    // if then increase the item
    else {
        search.item += 1;
    }
    update(selectedItem.id);
    // console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));


};

let decrement = (id) => {
    let selectedItem = id;
    // console.log(selectedItem);
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined) return;
    else if (search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    // console.log(basket);
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)

    localStorage.setItem("data", JSON.stringify(basket));

}
// whenever the value will change 
// it will reflect into UI...
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

// basically this function will increase 
// the count of the cart
let calculation = () => {
    let cartitems = document.getElementById("cartamount");
    // console.log(basket.map((x) => x.item).reduce(calcu))
    // console.log(basket)
    function calcu(x, y) {
        return x + y;
    }
    cartitems.innerHTML = basket.map((x) => x.item).reduce(calcu, 0);
}

calculation();
generatecard();


let shopingcart = document.getElementById("shopingcart")
let label = document.getElementById("label")

// basket will store objects containing id and 
// items selected
let basket = JSON.parse(localStorage.getItem("data")) || [];
// let basket =localStorage.getItem("data") || [];





let calculation = () => {
    let cartitems = document.getElementById("cartamount");
    // console.log(basket.map((x) => x.item).reduce(calcu))
    // console.log(basket)
    function calcu(x, y) {
        return x + y;
    }
    cartitems.innerHTML = basket.map((x) => x.item).reduce(calcu, 0);
}



let generatecard = () => {
    if (basket.length !== 0) {
        return (shopingcart.innerHTML = basket.map((x) => {
            let { id, item } = x; // destructuring what we need is this contains
            let search = items.find((y) => y.id === id)
            console.log(basket)
            return `

        <div class="cart-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">
          <div class="title">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash"></i>
              <div id=${id} class="no">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus"></i>
          </div>

          <h3>$ ${item * search.price}</h3>
        </div>
      </div>
        `

        }))
    } else {
        shopingcart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class ="btn-home">Back-to-home<button>
        </a>
        `
    }
}

let decrement = (id) => {
    let selectedItem = id;
    // console.log(selectedItem);
    let search = basket.find((x) => x.id === selectedItem.id)  //check if the id of selected cart is inside basket
    if (search === undefined) return; // not found then return
    else if (search.item === 0) { // if item not present return 
        return;
    } else {
        search.item -= 1; // decrement
    }
    // console.log(basket);
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0) // basket updated to contain only non 0 item
    generatecard()
    localStorage.setItem("data", JSON.stringify(basket));

}

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
    generatecard();
    localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalamount()
}

let removeItem = (id) => {
    let selecteditem = id;
    basket = basket.filter((x) => selecteditem.id !== x.id);
    generatecard();
    totalamount()

    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
}

let totalamount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { id, item } = x;
            let search = items.find((y) => y.id === id) || [];
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        console.log(amount);
        label.innerHTML = `
<h2>Total-bill : $${amount}</h2>
<div class="buttons">
<button class="checkout">Checkout</button>
<button onclick="clearCart()" class="removeAll">Clear-Cart</button>
</div>

`
    }
    else { return }
}



let clearCart=()=>{
    basket = [];
    generatecard();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation()
}


totalamount()
generatecard()
calculation();
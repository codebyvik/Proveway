const ItemContainer = document.getElementById("item-container");
const total = document.getElementById("total-price");

const itemData = [
  {
    id: 1,
    qty: 1,
    name: "Unit",
    desc: "Standard Price",
    popular: false,
    offerPrice: 10.0,
    price: 24.0,
    discountPercentage: 10,
    currency: "USD",
    options: {
      size: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      color: ["Black", "Red", "Green", "Yellow", "Blue"],
    },
  },
  {
    id: 2,
    qty: 2,
    name: "Unit",
    desc: "",
    popular: true,
    offerPrice: 18.0,
    price: 24.0,
    discountPercentage: 20,
    currency: "USD",
    options: {
      size: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      color: ["Black", "Red", "Green", "Yellow", "Blue"],
    },
  },
  {
    id: 3,
    qty: 3,
    name: "Unit",
    desc: "",
    popular: false,
    offerPrice: 24.0,
    price: 24.0,
    discountPercentage: 20,
    currency: "USD",
    options: {
      size: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      color: ["Black", "Red", "Green", "Yellow", "Blue"],
    },
  },
];

let selectedItem = 1; // Default selected item

// Function to render cards
const renderCards = () => {
  ItemContainer.innerHTML = itemData
    ?.map((item) => {
      return `<div class="card ${selectedItem === item?.id ? "active" : ""}" data-id="${item.id}">
                ${
                  item?.popular
                    ? `<div class="popular-flag-bg"></div>
                       <div class="popular-flag">
                           <h4>MOST POPULAR</h4>
                       </div>`
                    : ""
                }
                <div class="card-row">
                    <div class="card-details">
                        <input type="radio" name="units" value="${item?.id}" ${
        item?.id === selectedItem ? "checked" : ""
      }>
                        <div class="item-details">
                            <div class="name-offer">
                                <h4 class="item-name">${item?.qty} ${item?.name}</h4>
                                <p class="item-discount">${item?.discountPercentage}% off</p>
                            </div>
                            ${item?.desc ? `<p class="description">${item?.desc}</p>` : ""}
                        </div>
                    </div>
                    <div class="item-price">
                        <h4>${item?.offerPrice} ${item?.currency}</h4>
                        <p>${item?.price} ${item?.currency}</p>
                    </div>
                </div>
                <div class="card-row card-row-2 ${selectedItem === item?.id ? "active" : ""}">
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Size</td>
                                <td>Color</td>
                            </tr>
                            ${Array.from({ length: item.qty })
                              .map(
                                (_, index) => `
                                <tr>
                                    <td>#${index + 1}</td>
                                    <td class="size-option option">
                                        <select name="size">
                                            ${item.options.size
                                              .map(
                                                (size) => `<option value="${size}">${size}</option>`
                                              )
                                              .join("")}
                                        </select>
                                    </td>
                                    <td class="color-option option">
                                        <select name="color">
                                            ${item.options.color
                                              .map(
                                                (color) =>
                                                  `<option value="${color}">${color}</option>`
                                              )
                                              .join("")}
                                        </select>
                                    </td>
                                </tr>`
                              )
                              .join("")}
                        </tbody>
                    </table>
                </div>
              </div>`;
    })
    .join("");

  // Attach event listeners to all cards
  const cards = document.getElementsByClassName("card");
  Array.from(cards).forEach((card) => {
    card.addEventListener("click", () => {
      selectedItem = parseInt(card.dataset.id);
      const newSelectedItem = itemData?.find((item) => item?.id === selectedItem);
      total.innerText = `${newSelectedItem?.offerPrice} ${newSelectedItem?.currency}`;
      renderCards();
    });

    const selectOptions = card.querySelectorAll("select");
    selectOptions.forEach((select) => {
      select.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  });
};

const newSelectedItem = itemData?.find((item) => item?.id === selectedItem);
total.innerText = `${newSelectedItem?.offerPrice} ${newSelectedItem?.currency}`;

// Initial render
renderCards();

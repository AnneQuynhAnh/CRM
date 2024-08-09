document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      name: "Hiflex 3.2 dzem",
      specifications: [
        "Chừa Biên",
        "Đóng Khoen",
        "Dán Nối , Chừa Biên",
        "Dán nối , đóng khoen",
      ],
      prices: {
        "Chừa Biên": 50,
        "Đóng Khoen": 55,
        "Dán Nối , Chừa Biên": 60,
        "Dán nối , đóng khoen": 65,
      },
      giaBatDu: 25,
    },
    {
      name: "Hiflex 3.6 dzem",
      specifications: [
        "Chừa Biên",
        "Đóng Khoen",
        "Dán Nối , Chừa Biên",
        "Dán nối , đóng khoen",
      ],
      prices: {
        "Chừa Biên": 55,
        "Đóng Khoen": 60,
        "Dán Nối , Chừa Biên": 65,
        "Dán nối , đóng khoen": 70,
      },
      giaBatDu: 30,
    },
    {
      name: "Hiflex 3.8 dzem",
      specifications: [
        "Chừa Biên",
        "Đóng Khoen",
        "Dán Nối , Chừa Biên",
        "Dán nối , đóng khoen",
      ],
      prices: {
        "Chừa Biên": 65,
        "Đóng Khoen": 70,
        "Dán Nối , Chừa Biên": 75,
        "Dán nối , đóng khoen": 80,
      },
      giaBatDu: 35,
    },
  ];

  let selectedProduct = products[0];
  let cart = [];

  const searchBar = document.getElementById("searchBar");
  const addProductButton = document.getElementById("addProductButton");
  const addToCartButtonPopup = document.getElementById("addToCartButtonPopup");
  const suggestions = document.getElementById("suggestions");
  const productDetails = document.getElementById("productDetails");
  const specifications = document.getElementById("specifications");
  const lengthInput = document.getElementById("length");
  const widthInput = document.getElementById("width");
  const pricePerM2 = document.getElementById("pricePerM2");
  const totalSize = document.getElementById("totalSize");
  const printingMoney = document.getElementById("printingMoney");
  const leftMaterial = document.getElementById("leftMaterial");
  const perPieceMoney = document.getElementById("perPieceMoney");
  const totalMoney = document.getElementById("totalMoney");
  const quantityInput = document.getElementById("quantity");
  const addToCartButton = document.getElementById("addToCartButton");
  const noteTextarea = document.getElementById("note");
  const printIcon = document.getElementById("printIcon");
  const cartIcon = document.getElementById("cartIcon");
  const cartPopup = document.getElementById("cartPopup");
  const cartItems = document.getElementById("cartItems");
  const closeCartButton = document.getElementById("closeCartButton");
  const nextButton = document.getElementById("nextButton");
  const finalizationDiv = document.getElementById("finalizationDiv");
  const finalCustomerDetails = document.getElementById("finalCustomerDetails");
  const finalCartItems = document.getElementById("finalCartItems");
  const finalPrintIcon = document.getElementById("finalPrintIcon");
  const closeFinalizationButton = document.getElementById(
    "closeFinalizationButton"
  );
  const customerNameInput = document.getElementById("customerName");
  const customerPhoneInput = document.getElementById("customerPhone");

  searchBar.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    suggestions.innerHTML = "";
    if (query) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      filteredProducts.forEach((product) => {
        const suggestionDiv = document.createElement("div");
        suggestionDiv.textContent = product.name;
        suggestionDiv.addEventListener("click", function () {
          displayProductDetails(product);
          suggestions.style.display = "none";
        });
        suggestions.appendChild(suggestionDiv);
      });
      suggestions.style.display = "block";
    } else {
      suggestions.style.display = "none";
    }
  });

  addProductButton.addEventListener("click", function () {
    clearForm();
  });

  addToCartButtonPopup.addEventListener("click", function () {
    addToCart();
    cartPopup.classList.add("hidden");
  });

  cartIcon.addEventListener("click", function () {
    cartPopup.classList.toggle("hidden");
    displayCartItems();
  });

  closeCartButton.addEventListener("click", function () {
    cartPopup.classList.add("hidden");
  });

  nextButton.addEventListener("click", function () {
    finalizeOrder();
  });

  finalPrintIcon.addEventListener("click", function () {
    printFinalOrder();
  });

  closeFinalizationButton.addEventListener("click", function () {
    finalizationDiv.classList.add("hidden");
  });

  addToCartButton.addEventListener("click", function () {
    addToCart();
  });

  function displayProductDetails(product) {
    selectedProduct = product;
    document.getElementById("productName").textContent = product.name;
    specifications.innerHTML = product.specifications
      .map((spec) => `<option value="${spec}">${spec}</option>`)
      .join("");
    specifications.value = product.specifications[0];
    pricePerM2.textContent = product.prices[specifications.value];
    lengthInput.value = "";
    widthInput.value = "";
    totalSize.textContent = "0.00";
    printingMoney.textContent = "0.00";
    leftMaterial.textContent = "0.00";
    perPieceMoney.textContent = "0.00";
    totalMoney.textContent = "0.00";
    quantityInput.value = 1;
    noteTextarea.value = "";
    productDetails.classList.remove("hidden");
  }

  specifications.addEventListener("change", function () {
    pricePerM2.textContent = selectedProduct.prices[this.value];
    calculateTotal();
  });

  lengthInput.addEventListener("input", calculateTotal);
  widthInput.addEventListener("input", calculateTotal);
  quantityInput.addEventListener("input", calculateTotal);

  function calculateTotal() {
    const length = parseFloat(lengthInput.value) || 0;
    const width = parseFloat(widthInput.value) || 0;
    const totalSizeValue = length * width;
    totalSize.textContent = totalSizeValue.toFixed(2);
    const pricePerM2Value = parseFloat(pricePerM2.textContent);
    const quantity = parseInt(quantityInput.value) || 1;

    const printingMoneyValue = totalSizeValue * pricePerM2Value;
    printingMoney.textContent = printingMoneyValue.toFixed(2);

    let leftMaterialValue = 0;
    const khoIN = 3;
    const giaBatDu = selectedProduct.giaBatDu;

    if (length % khoIN === 0 || width % khoIN === 0) {
      leftMaterialValue = 0;
    } else if (length > khoIN && width > khoIN) {
      let a = Math.ceil(length / khoIN) * khoIN;
      if (Math.abs(a - length) >= Math.abs(a - khoIN - length)) {
        a -= khoIN;
      }
      let b = Math.ceil(width / khoIN) * khoIN;
      if (Math.abs(b - width) >= Math.abs(b - khoIN - width)) {
        b -= khoIN;
      }

      let extra, side;
      if (Math.abs(a - length) < Math.abs(b - width)) {
        extra = a - length;
        side = width;
      } else {
        extra = b - width;
        side = length;
      }
      leftMaterialValue = Math.abs(extra * side * giaBatDu);
    } else {
      if (width < khoIN || length < khoIN) {
        const extra = khoIN - Math.min(width, length);
        const sizeLeftMaterial = khoIN - extra;
        leftMaterialValue = sizeLeftMaterial * giaBatDu;
      }
    }
    leftMaterial.textContent = leftMaterialValue.toFixed(2);

    const perPieceMoneyValue = printingMoneyValue + leftMaterialValue;
    perPieceMoney.textContent = perPieceMoneyValue.toFixed(2);

    const totalMoneyValue = perPieceMoneyValue * quantity;
    totalMoney.textContent = totalMoneyValue.toFixed(2);
  }

  function addToCart() {
    const productName = selectedProduct.name;
    const specification = specifications.value;
    const quantity = parseInt(quantityInput.value);
    const total = parseFloat(totalMoney.textContent);
    const note = noteTextarea.value;

    cart.push({
      name: productName,
      specification: specification,
      quantity: quantity,
      total: total,
      note: note,
    });

    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    clearForm();
  }

  function displayCartItems() {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<div class="cart-item">${item.quantity}x ${item.name}, ${
        item.specification
      }: ${item.total.toFixed(
        2
      )} VND<button class="delete-button" onclick="deleteCartItem(${index})"><i class="fas fa-times"></i></button></div><div>Ghi chú: ${
        item.note
      }</div>`;
      cartItems.appendChild(li);
    });
  }

  window.deleteCartItem = function (index) {
    cart.splice(index, 1);
    displayCartItems();
  };

  function clearForm() {
    lengthInput.value = "";
    widthInput.value = "";
    totalSize.textContent = "0.00";
    printingMoney.textContent = "0.00";
    leftMaterial.textContent = "0.00";
    perPieceMoney.textContent = "0.00";
    totalMoney.textContent = "0.00";
    quantityInput.value = 1;
    noteTextarea.value = "";
  }

  function finalizeOrder() {
    // Get customer details
    const customerName = customerNameInput.value;
    const customerPhone = customerPhoneInput.value;

    // Update finalization div with customer details
    finalCustomerDetails.innerHTML = `
        <p>Tên khách hàng: ${customerName}</p>
        <p>Số điện thoại khách hàng: ${customerPhone}</p>
      `;

    // Update finalization div with cart items
    finalCartItems.innerHTML = "";
    cart.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `
          <div>${item.quantity}x ${item.name}, ${
        item.specification
      }: ${item.total.toFixed(2)} VND</div>
          <div>Ghi chú: ${item.note}</div>
        `;
      finalCartItems.appendChild(itemDiv);
    });

    // Hide cart popup and show finalization div
    cartPopup.classList.add("hidden");
    finalizationDiv.classList.remove("hidden");
  }

  function printFinalOrder() {
    // Hide final print icon and close button before printing
    finalPrintIcon.style.display = "none";
    closeFinalizationButton.style.display = "none";

    // Trigger print
    window.print();

    // Restore final print icon and close button after printing
    finalPrintIcon.style.display = "block";
    closeFinalizationButton.style.display = "block";
  }

  printIcon.addEventListener("click", function () {
    productDetails.classList.add("printable");
    window.print();
    productDetails.classList.remove("printable");
  });

  // Initial display of the first product details
  displayProductDetails(products[0]);
});

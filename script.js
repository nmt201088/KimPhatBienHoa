let goldPrices = {};

function calculateSellPrices() {
    const price9999 = parseFloat(document.getElementById("price9999").value) * 1000; // Ngàn đồng -> đồng
    if (!price9999) {
        alert("Vui lòng nhập giá vàng 9999!");
        return;
    }

    // Tính giá bán ra
    goldPrices["9999"] = { sell: price9999, buy: price9999 - 150000 };
    goldPrices["980"] = { sell: Math.round((price9999 * 0.985 / 0.9999) / 10000) * 10000, buy: 0 };
    goldPrices["950"] = { sell: Math.round((price9999 * 0.95 / 0.9999) / 10000) * 10000, buy: 0 };
    goldPrices["680"] = { sell: Math.round((price9999 * 0.7 / 0.9999) / 10000) * 10000, buy: 0 };
    goldPrices["610"] = { sell: Math.round((price9999 * 0.63 / 0.9999) / 10000) * 10000, buy: 0 };
    goldPrices["10K"] = { sell: Math.round((price9999 * 0.446 / 0.9999) / 10000) * 10000, buy: 0 };

    // Tính giá mua vào
    goldPrices["980"].buy = goldPrices["980"].sell - 300000;
    goldPrices["950"].buy = goldPrices["950"].sell - 200000;
    goldPrices["680"].buy = goldPrices["680"].sell - 400000;
    goldPrices["610"].buy = goldPrices["610"].sell - 400000;
    goldPrices["10K"].buy = goldPrices["10K"].sell - 500000;

    alert("Đã cập nhật giá bán và mua vào!");
}

function calculateNewPrice() {
    const weightNew = parseFloat(document.getElementById("weightNew").value);
    const goldType = document.getElementById("goldType").value;
    const laborCost = parseFloat(document.getElementById("laborCost").value) * 1000; // Ngàn đồng -> đồng

    if (!weightNew || !laborCost || !goldPrices[goldType]) {
        alert("Vui lòng nhập đầy đủ thông tin và giá vàng trước!");
        return;
    }

    const newPrice = (weightNew * goldPrices[goldType].sell) + laborCost;
    document.getElementById("newPriceResult").innerText = `Giá sản phẩm mới: ${newPrice.toLocaleString()} đồng`;
}

function calculateOldPrice() {
    const weightOld = parseFloat(document.getElementById("weightOld").value);
    const weightNew = parseFloat(document.getElementById("weightNew").value) || 0;
    const oldGoldType = document.getElementById("oldGoldType").value;
    const exchangeUnitPrice = parseFloat(document.getElementById("exchangeUnitPrice").value) * 10000; // Ngàn đồng -> đồng

    if (!weightOld || !exchangeUnitPrice || !goldPrices[oldGoldType]) {
        alert("Vui lòng nhập đầy đủ thông tin và giá vàng trước!");
        return;
    }

    let oldPrice;
    if (weightNew >= weightOld) {
        oldPrice = weightOld * (goldPrices[oldGoldType].sell - exchangeUnitPrice);
    } else {
        const weightDiff = weightOld - weightNew;
        const diffValue = weightDiff * goldPrices[oldGoldType].buy;
        const newValue = weightNew * (goldPrices[oldGoldType].sell - exchangeUnitPrice);
        oldPrice = diffValue + newValue;
    }

    document.getElementById("oldPriceResult").innerText = `Giá vàng cũ: ${oldPrice.toLocaleString()} đồng`;
}

function calculateExchange() {
    const newPriceText = document.getElementById("newPriceResult").innerText;
    const oldPriceText = document.getElementById("oldPriceResult").innerText;

    if (!newPriceText || !oldPriceText) {
        alert("Vui lòng tính giá mới và giá cũ trước!");
        return;
    }

    const newPrice = parseFloat(newPriceText.replace(/[^\d]/g, ""));
    const oldPrice = parseFloat(oldPriceText.replace(/[^\d]/g, ""));
    const exchangePrice = newPrice - oldPrice;

    let result;
    if (exchangePrice < 0) {
        result = `Khách nhận lại: ${Math.abs(exchangePrice).toLocaleString()} đồng`;
    } else {
        result = `Khách trả thêm: ${exchangePrice.toLocaleString()} đồng`;
    }

    document.getElementById("exchangeResult").innerText = `Giá đổi: ${result}`;
}
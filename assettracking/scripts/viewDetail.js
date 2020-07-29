$(function () {
    var newMyData = JSON.parse(window.localStorage.getItem('clickedViewedDetail'));
    console.log(newMyData);

    $('.detailedResult').append(`<li><span>asset name : </span>${newMyData.assetName}</li>`);
    $('.detailedResult').append(`<li><span>category : </span>${newMyData.category}</li>`);
    $('.detailedResult').append(`<li><span>assigned date : </span>${newMyData.assignedDate}</li>`);
    $('.detailedResult').append(`<li><span>assigned to : </span>${newMyData.assignedTo}</li>`);
    $('.detailedResult').append(`<li><span>purchase date : </span>${newMyData.purchaseDate}</li>`);
    $('.detailedResult').append(`<li><span>price : </span>${newMyData.assetPrice}</li>`);
    $('.detailedResult').append(`<li><span>location : </span>${newMyData.assetLocation}</li>`);
    $('.detailedResult').append(`<li><span>status : </span>${newMyData.assetStatus}</li>`);
    $('.detailedResult').append(`<li><span>model number : </span>${newMyData.modelNumber}</li>`);
    $('.detailedResult').append(`<li><span>serial number : </span>${newMyData.serialNumber}</li>`);
    $('.detailedResult').append(`<li><span>condition : </span>${newMyData.assetCondition}</li>`);
    $('.detailedResult').append(`<li><span>expiry date : </span>${newMyData.expiryDate}</li>`);
    $('.detailedResult').append(`<li><span>returned date : </span>${newMyData.returnedDate}</li>`);
    $('.detailedResult').append(`<li><span>warranty info. : </span>${newMyData.warrantyInfo}</li>`);
    $('.detailedResult').append(`<li><span>additional info. : </span>${newMyData.additionalInfo}</li>`);

    if (newMyData.recieptUrl == "") {
        $('.itemImage').html(`<img src="../assets/noImage.png" alt="${newMyData.assetName} image">`);
    } else {

        $('.itemImage').html(`<img src="${newMyData.recieptUrl}" alt="${newMyData.assetName} image">`);
    }
}); 
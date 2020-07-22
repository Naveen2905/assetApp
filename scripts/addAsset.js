$(function () {

    // const dbRef = firebase.database().ref();
    // console.log(dbRef);

    $('.addAssetInfo').on('submit', function (e) {
        e.preventDefault();
        const assetName = $('#assetName').val();
        const assetCategory = $('#category').val();
        const assignedDate = $('#assignedDate').val();       
        const purchaseDate = $('#purchaseDate').val();
        const location = $('#location').val();
        const price = $('#price').val();
        const condition = $('#condition').val();
        const warrantyInfo = $('#warrantyInfo').val();
        const returnedDate = $('#returnedDate').val();
        // const recieptUpload = $('#recieptUpload').val();
        const expiryDate = $('#expiryDate').val();
        const additionalInfo = $('#additionalInfo').val();
        const status = $('#status').val();
        const modelNumber = $('#modelNumber').val();
        const serialNumber = $('#serialNumber').val();

        $('input[type=text],input[type=number],input[type=date],select').val(''); //To Reset the form fields

        
    })


});
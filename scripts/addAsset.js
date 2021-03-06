$(function () {

    // add new option to category
    $('.addCategory').click(function(e) {
        e.preventDefault()
        let buttonInput = prompt('Category Name')

        $('#category').append(`<option value="${buttonInput}">${buttonInput}</option>`)
    })

    $('.addAssetInfo').on('submit', function (e) {
        e.preventDefault();
        let assetName = $('#assetName').val();
        let assetCategory = $('#category').val();
        let assignedDate = $('#assignedDate').val();
        let assignedTo = $('#assignedTo').val();
        let purchaseDate = $('#purchaseDate').val();
        let location = $('#location').val();
        let purchasePrice = $('#purchasePrice').val();
        let resaleValue = $('#resaleValue').val();
        let condition = $('#condition').val();
        let warrantyInfo = $('#warrantyInfo').val();
        let returnedDate = $('#returnedDate').val();
        let expiryDate = $('#expiryDate').val();
        let additionalInfo = $('#additionalInfo').val();
        let status = $('#status').val();
        let modelNumber = $('#modelNumber').val();
        let serialNumber = $('#serialNumber').val();
        let recieptUrl = $('.recieptImage').attr('src');
        let assetUrl = $('.assetImage').attr('src');

        // condition if the field is blank append with "-"

        if (assetName == "") {
            assetName = "&#8212"
        }
        if (assetCategory == null) {
            assetCategory = "&#8212"
        }
        if (assignedDate == "") {
            assignedDate = "&#8212"
        }
        if (assignedTo == "") {
            assignedTo = "&#8212"
        }
        if (purchaseDate == "") {
            purchaseDate = "&#8212"
        }
        if (location == "") {
            location = "&#8212"
        }
        if (purchasePrice == "") {
            purchasePrice = " &#8212"
        }
        if (resaleValue == "") {
            purchasePrice = " &#8212"
        }
        if (condition == null) {
            condition = "&#8212"
        }
        if (warrantyInfo == "") {
            warrantyInfo = "&#8212"
        }
        if (returnedDate == "") {
            returnedDate = "&#8212"
        }
        if (expiryDate == "") {
            expiryDate = "&#8212"
        }
        if (additionalInfo == "") {
            additionalInfo = "&#8212"
        }
        if (status == null) {
            status = "&#8212"
        }
        if (modelNumber == "") {
            modelNumber = "&#8212"
        }
        if (serialNumber == "") {
            serialNumber = "&#8212"
        }



        // Firebase Realtime Database --------------------------- 
        const dbRef = firebase.database().ref();

        // creating object to push to database 
        const assetInformation = {
            assetName: assetName,
            category: assetCategory,
            assignedDate: assignedDate,
            assignedTo: assignedTo,
            purchaseDate: purchaseDate,
            assetLocation: location,
            assetPurchasePrice: purchasePrice,
            assetResaleValue : resaleValue,
            assetCondition: condition,
            warrantyInfo: warrantyInfo,
            returnedDate: returnedDate,
            expiryDate: expiryDate,
            additionalInfo: additionalInfo,
            assetStatus: status,
            modelNumber: modelNumber,
            serialNumber: serialNumber,
            recieptUrl: recieptUrl,
            assetUrl : assetUrl,
        }
        // Pushed to firebase db 
        const firebaseObj = dbRef.push(assetInformation, function () {
            swal("Saved!!", "Information saved successfully!", "success");
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        //To Reset the form fields
        $('input[type=text],input[type=number],input[type=date],select').val('');
        $('.recieptImage').attr('src', '');
        $('.assetImage').attr('src', '');


        // Get data from firebase code is in welcome js file.....

    })

    // Firebase Storage ------------------

    //Reciept Image upload
    let imgUrl;
    const uploader = $('#uploader');
    const fileButton = $('#fileButton');
    //Listen for file selection

    fileButton.change(function (e) {
        //Get the File
        const file = e.target.files[0];
        // Create Storage Ref 
        const storageRef = firebase.storage().ref('reciepts/' + file.name)
        // Upload File
        const task = storageRef.put(file);
        //Update Progress Bar
        task.on('state_changed',

            function progress(snapshot) {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader[0].value = percentage;

            },

            function error(err) {

            },

            function complete() {
                //After uploading finishes it will reset the input
                fileButton.val('');
                uploader[0].value = 0;

                $('.successUpload').css('display', 'block');
                //Hide Success Message after 3 secs
                setTimeout(function () {
                    $('.successUpload').css('display', 'none');
                }, 3000)

                //Get ImageUrl
                var firebaseRef = firebase.storage()
                var newRef = firebaseRef.ref();
                newRef.child('reciepts/' + file.name).getDownloadURL().then(function (url) {
                    $(".recieptImage").attr("src", url);
                })
            }
        )

    })

    //Asset Image upload
    let assetImgUrl;
    const assetUploader = $('#assetUploader');
    const assetFileButton = $('#assetUpload');
    //Listen for file selection

    assetFileButton.change(function (e) {
        //Get the File
        const file = e.target.files[0];
        // Create Storage Ref 
        const storageRef = firebase.storage().ref('assets/' + file.name)
        // Upload File
        const task = storageRef.put(file);
        //Update Progress Bar
        task.on('state_changed',

            function progress(snapshot) {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                assetUploader[0].value = percentage;

            },

            function error(err) {

            },

            function complete() {
                //After uploading finishes it will reset the input
                fileButton.val('');
                assetUploader[0].value = 0;

                $('.successAssetUpload').css('display', 'block');
                //Hide Success Message after 3 secs
                setTimeout(function () {
                    $('.successAssetUpload').css('display', 'none');
                }, 3000)

                //Get Asset ImageUrl
                var firebaseRef = firebase.storage()
                var newRef = firebaseRef.ref();
                newRef.child('assets/' + file.name).getDownloadURL().then(function (url) {
                    $(".assetImage").attr("src", url);
                })
            }
        )

    })

});
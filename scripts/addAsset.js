$(function () {

    $('.addAssetInfo').on('submit', function (e) {
        e.preventDefault();
        const assetName = $('#assetName').val();
        const assetCategory = $('#category').val();
        const assignedDate = $('#assignedDate').val();
        const assignedTo = $('#assignedTo').val();
        const purchaseDate = $('#purchaseDate').val();
        const location = $('#location').val();
        const price = $('#price').val();
        const condition = $('#condition').val();
        const warrantyInfo = $('#warrantyInfo').val();
        const returnedDate = $('#returnedDate').val();
        const expiryDate = $('#expiryDate').val();
        const additionalInfo = $('#additionalInfo').val();
        const status = $('#status').val();
        const modelNumber = $('#modelNumber').val();
        const serialNumber = $('#serialNumber').val();
        const recieptUrl = $('.recieptImage').attr('src');
        // Firebase Realtime Database --------------------------- 
        const dbRef = firebase.database().ref();

        // creating object to push to database 
        const assetInformation = {
            assetName: assetName,
            category : assetCategory,
            assignedDate: assignedDate,
            assignedTo : assignedTo,
            purchaseDate: purchaseDate,
            assetLocation: location,
            assetPrice: `$${price}`,
            assetCondition: condition,
            warrantyInfo: warrantyInfo,
            returnedDate: returnedDate,
            expiryDate: expiryDate,
            additionalInfo: additionalInfo,
            assetStatus: status,
            modelNumber: modelNumber,
            serialNumber: serialNumber,
            recieptUrl: recieptUrl,
        }
        // Pushed to firebase db 
        const firebaseObj = dbRef.push(assetInformation, function () {
            swal("Saved!!", "Information saved successfully!", "success");
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        //To Reset the form fields
        $('input[type=text],input[type=number],input[type=date],select').val('');
        $('.recieptImage').attr('src', '');


        // Get data from firebase code is in welcome js file.....

    })

    // Firebase Storage ------------------
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
                    // console.log(url);
                    $(".recieptImage").attr("src", url);
                })
            }
        )

    })

});
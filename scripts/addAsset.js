$(function () {



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
        const expiryDate = $('#expiryDate').val();
        const additionalInfo = $('#additionalInfo').val();
        const status = $('#status').val();
        const modelNumber = $('#modelNumber').val();
        const serialNumber = $('#serialNumber').val();

        // Firebase Realtime Database --------------------------- 
        const dbRef = firebase.database().ref();

        // creating object to push to database 
        const assetInformation = {
            assetName: assetName,
            category: assetCategory,
            assignedDate: assignedDate,
            purchaseDate: purchaseDate,
            assetLocation: location,
            assetPrice: price,
            assetCondition: condition,
            warrantyInfo: warrantyInfo,
            returnedDate: returnedDate,
            expiryDate: expiryDate,
            additionalInfo: additionalInfo,
            assetStatus: status,
            modelNumber: modelNumber,
            serialNumber: serialNumber,
        }

        // Pushed to firebase db 
        const firebaseObj = dbRef.push(assetInformation);

        //To Reset the form fields
        $('input[type=text],input[type=number],input[type=date],select').val('');

        dbRef.on('value', (data) => {
            console.log(data.val());
        });

    })

    // Firebase Storage ------------------

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
                $('#filedrag').text('Success!!');
            }
        )

    })


});
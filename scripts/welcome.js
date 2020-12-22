var mainApp = {}

$(function () {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
            placeHolderUserImage = `../assets/userImagePlaceholder.png`;

            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            user.providerData.forEach(function (profile) {
                $('.userName').html(profile.displayName)

                if (profile.photoURL == null) {
                    $('.userPhoto').append(`<img class='placeholderImage' src="${placeHolderUserImage}" alt="${profile.displayName} Image">`)
                }
                else {
                    $('.userPhoto').append(`<img class='userImage' src="${profile.photoURL}" alt="${profile.displayName} Image">`)
                }
            });

        }
        else {
            uid = null
            window.location.replace('index.html')
        }
    });
    function logOut() {
        firebase.auth().signOut()
    }

    mainApp.logOut = logOut;

    // Moment.js for date and time on the page 
    const dateTime = moment().format('YYYY-MMMM-DD, hh:mm A');

    $('.currentDate').html(dateTime)

    const dbRef = firebase.database().ref();
    dbRef.on('value', (data) => {
        const dataInfo = data.val();
        //Individual Data points by looping through the firebase db object
        const assetNameArray = [];
        const categoryArray = [];
        const assignedDateArray = [];
        const assignedToArray = [];
        const purchasePriceArray = [];
        const locationArray = [];
        const conditionArray = [];
        const viewDetailsArray = []; //ToDo ------------------------
        const statusArray = [];
        const priceArray = []
        const resaleArray = []
        for (key in dataInfo) {
            const individualDataInfo = dataInfo[key];
            assetNameArray.push(`<p><span>&#9632</span> ${individualDataInfo.assetName}</p>`);
            categoryArray.push(`<p>${individualDataInfo.category}</p>`);
            assignedDateArray.push(`<p>${individualDataInfo.assignedDate}</p>`);
            assignedToArray.push(`<p>${individualDataInfo.assignedTo}</p>`);
            purchasePriceArray.push(`<p>${individualDataInfo.assetPurchasePrice}</p>`);
            locationArray.push(`<p>${individualDataInfo.assetLocation}</p>`);
            conditionArray.push(`<p>${individualDataInfo.assetCondition}</p>`);
            statusArray.push(`<p>${individualDataInfo.assetStatus}</p>`);
            viewDetailsArray.push(`<form action="../viewDetails.html">
            <input type='submit' value='View Details' name=${key}>
            <button title='Delete' class='deleteRecord' name=${key}><svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><g transform="matrix(0 1 -1 0 17 0)"><path d="m5.5 11.5 6-6"/><path d="m5.5 5.5 6 6"/></g></g></svg></button>
            </form>`)

            priceArray.push(parseInt(individualDataInfo.assetPurchasePrice));
            resaleArray.push(parseInt(individualDataInfo.assetResaleValue));
        }

        $('.assetData').html(assetNameArray);
        $('.categoryData').html(categoryArray);
        $('.assignedDateData').html(assignedDateArray);
        $('.assignedToData').html(assignedToArray);
        $('.purchasePriceData').html(purchasePriceArray);
        $('.locationData').html(locationArray);
        $('.conditionData').html(conditionArray);
        $('.statusData').html(statusArray);
        $('.viewDetailsData').html(viewDetailsArray);


        $('.viewDetailsData').on('click', 'input', function () {
            const clickedButton = this.name;
            console.log(clickedButton);

            for (k in dataInfo) {
                if (clickedButton == k) {
                    const clickedViewedDetail = dataInfo[k];
                    // console.log(clickedViewedDetail);
                    var myData = JSON.stringify(clickedViewedDetail);
                    window.localStorage.setItem('clickedViewedDetail', myData);

                }
            }
        });

        //Delete The record
        $('.viewDetailsData').on('click', 'button', function (e) {
            e.preventDefault()
            const deleteButton = this.name; // db key
            dbRef.child(deleteButton).remove();
        })


        // Filter Assigned to Data

        $('.searchForm').on('submit', (e) => {
            e.preventDefault();
            function lowerFirstLetter(string) {
                return string.charAt(0).toLowerCase() + string.slice(1);
            }
            let searchString = $('.searchString').val();
            searchString = lowerFirstLetter(searchString);
            // Assigned To

            dbRef.orderByChild('assignedTo').equalTo(searchString).on("value", function (snapshot) {
                const filterDataInfo = snapshot.val();
                const assetNameArray = [];
                const categoryArray = [];
                const assignedDateArray = [];
                const assignedToArray = [];
                const purchasePriceArray = [];
                const locationArray = [];
                const conditionArray = [];
                const viewDetailsArray = []; //ToDo ------------------------
                const statusArray = [];
                const priceArray = []
                const resaleArray = []

                for (k in filterDataInfo) {
                    const individualFilterDataInfo = filterDataInfo[k];
                    console.log(individualFilterDataInfo);

                    assetNameArray.push(`<p><span>&#9632</span> ${individualFilterDataInfo.assetName}</p>`);
                    categoryArray.push(`<p>${individualFilterDataInfo.category}</p>`);
                    assignedDateArray.push(`<p>${individualFilterDataInfo.assignedDate}</p>`);
                    assignedToArray.push(`<p>${individualFilterDataInfo.assignedTo}</p>`);
                    purchasePriceArray.push(`<p>${individualFilterDataInfo.assetPurchasePrice}</p>`);
                    locationArray.push(`<p>${individualFilterDataInfo.assetLocation}</p>`);
                    conditionArray.push(`<p>${individualFilterDataInfo.assetCondition}</p>`);
                    statusArray.push(`<p>${individualFilterDataInfo.assetStatus}</p>`);
                    viewDetailsArray.push(`<form action="../viewDetails.html">
            <input type='submit' value='View Details' name=${k}>
            <button title='Delete' class='deleteRecord' name=${k}><svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)"><circle cx="8.5" cy="8.5" r="8"/><g transform="matrix(0 1 -1 0 17 0)"><path d="m5.5 11.5 6-6"/><path d="m5.5 5.5 6 6"/></g></g></svg></button>
            </form>`)
                    priceArray.push(parseInt(individualFilterDataInfo.assetPurchasePrice));
                    resaleArray.push(parseInt(individualFilterDataInfo.assetResaleValue));
                }

                $('.assetData').html(assetNameArray);
                $('.categoryData').html(categoryArray);
                $('.assignedDateData').html(assignedDateArray);
                $('.assignedToData').html(assignedToArray);
                $('.purchasePriceData').html(purchasePriceArray);
                $('.locationData').html(locationArray);
                $('.conditionData').html(conditionArray);
                $('.statusData').html(statusArray);
                $('.viewDetailsData').html(viewDetailsArray);

                // Adding purchase price and resale value
                $('.totalPurchaseValue').on('click', (e) => {
                    e.preventDefault();
                    const totalP = priceArray.reduce((a, b) => a + b, 0)
                    const totalR = resaleArray.reduce((a, b) => a + b, 0)
                    swal(`Total Purchase Price - $${totalP}`, `Total Resale Value - $${totalR}`);
                })

            });

        })

        // Sorting Category
        $('.categorySort').on('click', (e) => {
            e.preventDefault();
            console.log('Sorted');
        })

        // Adding purchase price and resale value
        $('.totalPurchaseValue').on('click', (e) => {
            e.preventDefault();
            const totalP = priceArray.reduce((a, b) => a + b, 0)
            const totalR = resaleArray.reduce((a, b) => a + b, 0)
            swal(`Total Purchase Price - $${totalP}`, `Total Resale Value - $${totalR}`);
        })

    });

});
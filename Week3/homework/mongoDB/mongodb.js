const { MongoClient } = require('mongodb');

async function main() {
    const URL = "mongodb+srv://omerbkk06:19901992@hyf-f6uwe.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = new MongoClient(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    try {
        // Connecting to the MongoDB cluster and database
        await client.connect();
        const db = client.db('world');

        //1. Create a new record (document) for a new city (your home town, say)
        await createNewCity(db, {
            capital_no : 101,
            name : "Gotham",
            CountryCode : "NLD",
            District : "Zuid-Holland",
            Population : 50000
         }); 

        //2.Update that record with a new population
        await updateCityByName(db,'Gotham',{Population: 17000});

        //3. Read the document that you just updated in two ways : finding by the city name, and then by the country code
        await findOneCityByName(db, "Gotham");
        await findOneCityByCountryCode(db, "NLD");

        //4. Delete the city
        await deleteCityByName(db, "Gotham");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function createNewCity(db, newCity) {
    const result = await db.collection("city").insertOne(newCity);
    console.log(`New city created with the following id: ${result.insertedId}`);
}

async function findOneCityByName(db,value) {
    result = await db.collection("city").findOne({name: value});

    if (result) {
        console.log(`Found a city in the collection with the name '${value}':`);
        console.log(result);
    } else {
        console.log(`No city found with the name '${value}'`);
    }
}

//Because there will be more than one city in the given country code, we will use toArray() and then find the city with other terms like name again.
async function findOneCityByCountryCode(db,value) {
    result = await db.collection("city").find({CountryCode: value}).toArray();
    const city = result.find(city => city.name = "Gotham");

    if (result) {
        console.log(`Found a city in the collection with the country code '${value}':`);
        console.log(result);
    } else {
        console.log(`No city found with the country code '${value}'`);
    }
}

async function updateCityByName(db, name, updates) {
    result = await db.collection("city")
        .updateOne({name}, {
            $set: updates
        });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function deleteCityByName(db, cityName) {
    result = await db.collection("city")
            .deleteOne({ name: cityName });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
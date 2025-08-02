
export type dataInfo = {
    "id": number,
      "title": string,
      "description": string,
      "category": string,
      "price": number,
      "discountPercentage": number,
      "rating": number,
      "stock": number,
      "tags": string[],
      "brand": string,
      "sku": string,
      "weight": number,
      "dimensions": dimensionsInfo,
      "warrantyInformation": string,
      "shippingInformation": string,
      "availabilityStatus": string,
      "reviews": reviewsInfo[],
      "returnPolicy": string,
      "minimumOrderQuantity": number,
      "meta": metaInfo,
      "thumbnail": string,
      "images": string[]
    }

    export type dimensionsInfo = {
        "width": number,
        "height": number,
        "depth": number
  }

      export type reviewsInfo = {
          "rating": number,
          "comment": string,
          "date": string,
          "reviewerName": string,
          "reviewerEmail": string
        }
      

      export type metaInfo = {
        "createdAt": string,
        "updatedAt": string,
        "barcode": string,
        "qrCode": string
  }









  export type UserInfo = {
    "id": number,
    "firstName": string,
    "lastName": string,
    "maidenName": string,
    "age": number,
    "gender": string,
    "email": string,
    "phone": string,
    "username": string,
    "password": string,
    "birthDate": string,
    "image": string,
    "bloodGroup": string,
    "height": number,
    "weight": number,
    "eyeColor": string,
    "hair": {
        "color": string,
        "type": string
    },
    "ip": string,
    "address": {
        "address": string,
        "city": string,
        "state": string,
        "stateCode": string,
        "postalCode": string,
        "coordinates": {
            "lat": number,
            "lng": number
        },
        "country": string
    },
    "macAddress": string,
    "university": string,
    "bank": {
        "cardExpire": string,
        "cardNumber": string,
        "cardType": string,
        "currency": string,
        "iban": string
    },
    "company": {
        "department": string,
        "name": string,
        "title": string,
        "address": {
            "address": string,
            "city": string,
            "state": string,
            "stateCode": string,
            "postalCode": string,
            "coordinates": {
                "lat": number,
                "lng": number
            },
            "country": string
        }
    },
    "ein": string,
    "ssn": string,
    "userAgent": string,
    "crypto": {
        "coin": string,
        "wallet": string,
        "network": string
    },
    "role": string
    }




  export type ChartsInfo = {
      "id": number,
      "products": [
          {
              "id": number,
              "title": string,
              "price": number,
              "quantity": number,
              "total":number,
              "discountPercentage": number,
              "discountedTotal": number,
              "thumbnail": string
          },
      ],
      "total": number,
      "discountedTotal": number,
      "userId": number,
      "totalProducts": number,
      "totalQuantity": number
    }



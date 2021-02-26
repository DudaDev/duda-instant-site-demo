const API_BASE = "https://isipluhi96.execute-api.us-east-1.amazonaws.com/prod";
const headers = {
  'Content-Type': 'application/json'
}

const userId = "my-test-user-123";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("input#instantSiteSubmitButton").addEventListener('click', (event) => {

    const templateId = document.querySelector("[name='templateId']").value;
    const businessName = document.querySelector("[name='business_name']").value;
    const streetAddress = document.querySelector("[name='streetAddress']").value;
    const city = document.querySelector("[name='city']").value;
    const region = document.querySelector("[name='region']").value;
    const country = document.querySelector("[name='country']").value;
    const postalCode = document.querySelector("[name='postalCode']").value;
    const phoneNumber = document.querySelector("[name='phoneNumber']").value;
    const email = document.querySelector("[name='email']").value;
    const logoUrl = document.querySelector("[name='logoUrl']").value;
    const overview = document.querySelector("[name='overview']").value;
    const services = document.querySelector("[name='services']").value;
    const aboutUs = document.querySelector("[name='aboutUs']").value;
    const businessImage = document.querySelector("[name='businessImage']").value;
    const businessDescription = document.querySelector("[name='business_description']").value;
    if (templateId && businessName && streetAddress && city && region && country && postalCode && phoneNumber && email && logoUrl && overview && services && aboutUs && businessImage && businessDescription) {
      return validate({
        templateId: templateId,
        siteContent: {
          "location_data":{
            "phones":[
              {
                "phoneNumber":phoneNumber,
                "label":"Main"
              }
            ],
            "emails":[
              {
                "emailAddress":email,
                "label":"Main"
              }
            ],
            "label": businessName,
            "social_accounts":{
              "tripadvisor":null,
              "youtube":null,
              "facebook":null,
              "yelp":null,
              "pinterest":null,
              "google_plus":null,
              "linkedin":null,
              "instagram":null,
              "snapchat":null,
              "twitter":null,
              "rss":null,
              "vimeo":null,
              "reddit":null
            },
            "address":{
              "streetAddress": streetAddress,
              "postalCode": postalCode,
              "region": region,
              "city": city,
              "country": country
            },
            "address_geolocation":`${streetAddress}, ${city}, ${region} ${postalCode}, ${country}"`,
            "geo":{
              "longitude":null,
              "latitude":null
            },
            "logo_url":logoUrl,
            "business_hours":[
              {
                "days":[
                  "MON",
                  "TUE",
                  "WED",
                  "THU",
                  "FRI"
                ],
                "open":"08:00",
                "close":"17:00"
              }
            ]
          },
          "site_texts":{
            "overview":overview,
            "services":services,
            "custom":[],
            "about_us":aboutUs
          },
          "business_data":{
            "name":businessName,
            "logo_url":logoUrl
          },
          "site_images":[
            {
              "label":"Site Image",
              "url":businessImage,
              "alt":"Site Image"
            }
          ]
        }
      });
    } else {
      alert("Complete all fields.");
    }
  });
});

const validate = async function(data) {
    document.querySelector("progress").value=10
    document.querySelector("#instantSiteSubmitButton").setAttribute("value","Creating site ...");
    const siteName = await createSite(data.templateId);
    document.querySelector("progress").value=30
    document.querySelector("#instantSiteSubmitButton").setAttribute("value","Uploading content ...");
    await uploadContent(siteName, data.siteContent);
    document.querySelector("progress").value=60
    document.querySelector("#instantSiteSubmitButton").setAttribute("value","Creating user ...");
    await createUser(userId);
    document.querySelector("progress").value=80
    document.querySelector("#instantSiteSubmitButton").setAttribute("value","Granting user access ...");
    await grantUserAccess(userId, siteName);
    document.querySelector("progress").value=90
    document.querySelector("#instantSiteSubmitButton").setAttribute("value","Logging in ...");
    const ssolink = await getSSOLink(userId, siteName);
    document.querySelector("progress").value=100
    document.querySelector("#instantSiteSubmitButton").setAttribute("value","Redirecting ...");
    window.location.href = ssolink;
}

const createSite = async function(templateId) {
  const url = `${API_BASE}/sites`
  const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
          templateId: templateId
      })
  };
  const response = await fetch(url, options)
  const json = await response.json();
  const siteName = json.siteName;
  return siteName
}

const uploadContent = async function(siteName, siteDetails) {
  const url = `${API_BASE}/sites/${siteName}`
  const options = {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(siteDetails)
  };
  return fetch(url, options);
}

const publishSite = async function(siteName) {
  const url = `${API_BASE}/sites/${siteName}/versions`
  const options = {
      method: 'POST',
      headers: headers
  };
  return fetch(url, options);
}

const createUser = async function(userId) {
  const url = `${API_BASE}/users`
  const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        userId: userId
      })
  };
  return fetch(url, options);
}

const deleteSite = async function(siteName) {
  const url = `${API_BASE}/sites/${siteName}`
  const options = {
      method: 'DELETE',
      headers: headers
  };
  return fetch(url, options);
}

const deleteSites = async function(siteNames) {
  const url = `${API_BASE}/sites`
  const options = {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(siteNames)
  };
  return fetch(url, options);
}

const getSites = async function() {
  const url = `${API_BASE}/sites/${siteName}/versions`
  const options = {
      method: 'GET',
      headers: headers
  };
  const response = await fetch(url, options);
  const sites = await response.json();
  return sites
}

const getSSOLink = async function(userId, siteName) {
  const url = `${API_BASE}/users/${userId}/accessFor/${siteName}`
  const options = {
      method: 'GET',
      headers: headers
  };
  const response = await fetch(url, options);
  const json = await response.json();
  return json.url
}

const grantUserAccess = async function(userId, siteName) {
  const url = `${API_BASE}/users/${userId}/accessFor/${siteName}`
  const options = {
      method: 'POST',
      headers: headers
  };
  const response = await fetch(url, options);
  const json = await response.json();
  return json.url
}

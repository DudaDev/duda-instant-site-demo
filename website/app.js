const API_BASE = "https://wsr9qfo9t0.execute-api.us-east-1.amazonaws.com/prod";
const headers = {
  'Content-Type': 'application/json'
}

const userId = "my-test-user-123";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("input#instantSiteSubmitButton").addEventListener('click', (event) => {

    const templateId = document.querySelector("[name='template_id']").value;
    const businessName = document.querySelector("[name='business_name']").value;
    const street = document.querySelector("[name='street']").value;
    const city = document.querySelector("[name='city']").value;
    const state = document.querySelector("[name='state']").value;
    const country = document.querySelector("[name='country']").value;
    const zipCode = document.querySelector("[name='zipCode']").value;
    const phoneNumber = document.querySelector("[name='phoneNumber']").value;
    const email = document.querySelector("[name='email']").value;
    const businessImage = document.querySelector("[name='businessImage']").value;
    const businessDescription = document.querySelector("[name='business_description']").value;

    return validate({
      "template_id": templateId,
      "site_details": {
        "site_business_info": {
          "business_name": businessName,
          "address": {
            "street": street,
            "city": city,
            "state": state,
            "country": country,
            "zip_code": zipCode
          },
          "phone_number": phoneNumber,
          "email": email,
        },
        "site_seo": {
          "og_image": businessImage,
          "title": businessName,
          "description": businessDescription
        }
      }
    });

  });
});

const validate = async function(data) {
  console.log("validating....");
  if (data.template_id.length > 0 &&
  data.site_details.site_business_info.business_name.length > 0 &&
  data.site_details.site_business_info.address.street.length > 0 &&
  data.site_details.site_business_info.address.city.length > 0 &&
  data.site_details.site_business_info.address.state.length > 0 &&
  data.site_details.site_business_info.address.country.length > 0 &&
  data.site_details.site_business_info.address.zip_code.length > 0 &&
  data.site_details.site_business_info.phone_number.length > 0 &&
  data.site_details.site_business_info.email.length > 0 &&
  data.site_details.site_seo.og_image.length > 0 &&
  data.site_details.site_seo.title.length > 0 &&
  data.site_details.site_seo.description.length) {
    console.log("Making a site with template: " + data.template_id);
    document.querySelector("progress").value=20
    const siteName = await createSite(data.template_id);
    document.querySelector("progress").value=40
    await uploadContent(siteName, data.site_details);
    document.querySelector("progress").value=60
    await createUser(userId);
    document.querySelector("progress").value=80
    await grantUserAccess(userId, siteName);
    document.querySelector("progress").value=90
    const ssolink = await getSSOLink(userId, siteName);
    document.querySelector("progress").value=100
    document.querySelector("#instantSiteSubmitButton").setAttribute("value","Your site has been created, stand by.");
    window.location.href = ssolink;
  } else {
    alert("Complete all fields.");
  }
}

const createSite = async function(templateId) {
  const url = `${API_BASE}/sites`
  const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
          template_id: templateId
      })
  };
  const response = await fetch(url, options);
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
  const url = `${API_BASE}/users/${siteName}/accessFor/${siteName}`
  const options = {
      method: 'GET',
      headers: headers
  };
  const response = await fetch(url, options);
  const json = await response.json();
  return json.url
}

const grantUserAccess = async function(userId, siteName) {
  const url = `${API_BASE}/users/${siteName}/accessFor/${siteName}`
  const options = {
      method: 'POST',
      headers: headers
  };
  const response = await fetch(url, options);
  const json = await response.json();
  return json.url
}

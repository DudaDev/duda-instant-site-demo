import './InstantSiteForm.css';

function InstantSiteForm() {
  return (
      <div className='container instantSiteForm'>
        <h1>Simple Instant Site</h1>
        <p>Enter your business information below to create a site:</p>
        <div id="instantSite" action="#">
            <h2>Template</h2>
            <select class="block" name="templateId">
            <option value="1013306">Creative Portfolio</option>
            <option value="1008302">Ice Cream Shop</option>
            <option value="1005052">Soap & Suds</option>
            <option value="1002785">My Bicycle Blog</option>
            </select>
            <h2>Business Details</h2>
            <input class="block" type="text" name="business_name" placeholder="Business Name"/>
            <textarea class="block" type="text" rows="4" name="overview" placeholder="Overview"></textarea>
            <textarea class="block" type="text" rows="4" name="aboutUs" placeholder="About Us"></textarea>
            <textarea class="block" type="text" rows="4" name="services" placeholder="Services"></textarea>
            <h2>Address</h2>
            <input class="block" type="text" name="streetAddress" placeholder="Street"/>
            <input class="inline" type="text" name="city" placeholder="City"/>
            <input class="inline" type="text" name="region" placeholder="Region"/>
            <input class="inline" type="text" name="country" placeholder="Country"/>
            <input class="inline" type="text" name="postalCode" placeholder="Postal Code"/>

            <h2>Contact Information</h2>
            <input class="block" type="text" name="phoneNumber" placeholder="Phone Number"/>
            <input class="block" type="text" name="email" placeholder="Email"/>

            <h2>Content</h2>
            <input class="block" type="text" name="businessImage" placeholder="Background Image URL"/>
            <input class="block" type="text" name="logoUrl" placeholder="Logo Image URL"/>
            <textarea class="block" type="text" rows="4" name="business_description" placeholder="Description"></textarea>
            <progress max="100" value="0"></progress>
            <input class="block" type="submit" id="instantSiteSubmitButton" value="Create Site" />

        </div>
      </div>
  );
}

export default InstantSiteForm;
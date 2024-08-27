Certainly! Below is a complete rewrite of the program, incorporating the suggestions for improved modularization, reusability, error handling, and state management.

### Project Structure

```
src/
|-- components/
|   |-- Footer.js
|   |-- NavBar.js
|   |-- NewDownloadRequest.js
|   |-- FormField.js
|-- config/
|   |-- apiConfig.json
|   |-- navConfig.json
|-- services/
|   |-- apiService.js
|-- utils/
|   |-- validation.js
|-- App.js
|-- index.js
```

### 1. **Setting Up the Project**

Run the following commands to create the project and install necessary dependencies:

```bash
npx create-react-app spo-site-downloader
cd spo-site-downloader
npm install bootstrap react-bootstrap
```

### 2. **Include Bootstrap**

Add Bootstrap to your `src/index.js`:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

### 3. **Reusable Form Field Component**

Create a reusable `FormField` component for handling input fields in `src/components/FormField.js`:

```javascript
import React from 'react';
import { Form } from 'react-bootstrap';

const FormField = ({ label, type, value, onChange, error, placeholder, as = "input", options = [], ...props }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {type === 'select' ? (
        <Form.Control as="select" value={value} onChange={onChange} isInvalid={!!error} {...props}>
          <option value="">Select an option...</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control
          as={as}
          type={type}
          value={value}
          onChange={onChange}
          isInvalid={!!error}
          placeholder={placeholder}
          {...props}
        />
      )}
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormField;
```

### 4. **NavBar Component**

Create a `NavBar` component in `src/components/NavBar.js`:

```javascript
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = ({ config, onNavClick }) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">SPO Site Downloader</Navbar.Brand>
      <Nav className="mr-auto">
        {config.navLinks.map((link, index) => (
          <Nav.Link key={index} href="#" onClick={() => onNavClick(link.name)}>
            {link.name}
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
```

### 5. **Footer Component**

Create a `Footer` component in `src/components/Footer.js`:

```javascript
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center mt-4">
      <p>© 2024 Morgan Stanley. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
```

### 6. **API Service for Fetching Data**

Create a centralized API service in `src/services/apiService.js`:

```javascript
export const fetchSiteUrls = async () => {
  try {
    const response = await fetch('/api/getSiteUrls');
    if (!response.ok) {
      throw new Error('Failed to fetch site URLs');
    }
    const data = await response.json();
    return data.sites;
  } catch (error) {
    console.error('Error fetching site URLs:', error);
    return [];
  }
};
```

### 7. **Validation Utilities**

Create validation utilities in `src/utils/validation.js`:

```javascript
export const validateForm = ({ siteUrl, assetType, downloadLocation }, availableUrls) => {
  const errors = {};

  // Site URL validation
  if (!siteUrl) {
    errors.siteUrl = 'Site URL is required.';
  } else if (!availableUrls.some(url => url.siteUrl === siteUrl)) {
    errors.siteUrl = 'Site URL is not valid.';
  }

  // Asset Type validation
  if (!assetType) {
    errors.assetType = 'Asset type is required.';
  } else if (assetType !== 'Site' && !downloadLocation) {
    errors.downloadLocation = 'Download location is required for the selected asset type.';
  }

  return errors;
};
```

### 8. **New Download Request Component**

Create the `NewDownloadRequest` form component in `src/components/NewDownloadRequest.js`:

```javascript
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormField from './FormField';
import { fetchSiteUrls } from '../services/apiService';
import { validateForm } from '../utils/validation';

const NewDownloadRequest = () => {
  const [siteUrl, setSiteUrl] = useState('');
  const [assetType, setAssetType] = useState('');
  const [downloadLocation, setDownloadLocation] = useState('');
  const [comments, setComments] = useState('');
  const [isZipRequired, setIsZipRequired] = useState(false);
  const [errors, setErrors] = useState({});
  const [availableUrls, setAvailableUrls] = useState([]);
  const [siteId, setSiteId] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  useEffect(() => {
    const loadUrls = async () => {
      const sites = await fetchSiteUrls();
      setAvailableUrls(sites);
    };

    loadUrls();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formValues = { siteUrl, assetType, downloadLocation };
    const validationErrors = validateForm(formValues, availableUrls);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const selectedSite = availableUrls.find(url => url.siteUrl === siteUrl);
      setSiteId(selectedSite.siteId);

      const requestData = {
        siteDownloadRequest: {
          siteUrl,
          assetType,
          siteId,
          downloadRootLocation: downloadLocation,
          comments,
          isZipRequired,
        },
      };
      console.log('Submitting form', requestData);
      // Submit form logic...
    }
  };

  const handleAssetTypeChange = (value) => {
    setAssetType(value);
    setShowAdditionalFields(value !== 'Site');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        label="Site URL"
        type="text"
        value={siteUrl}
        onChange={(e) => setSiteUrl(e.target.value)}
        error={errors.siteUrl}
        placeholder="Start typing to search..."
      />

      <Form.Group controlId="formAssetType">
        <Form.Label>Asset Type</Form.Label>
        <Row>
          {['Site', 'Library', 'List', 'Folder'].map(type => (
            <Col key={type}>
              <Form.Check
                type="radio"
                label={type}
                name="assetType"
                value={type}
                checked={assetType === type}
                onChange={(e) => handleAssetTypeChange(e.target.value)}
                isInvalid={!!errors.assetType}
              />
            </Col>
          ))}
        </Row>
        {errors.assetType && <div className="text-danger">{errors.assetType}</div>}
      </Form.Group>

      {showAdditionalFields && (
        <>
          <FormField
            label="Enter Asset Name to Download"
            type="text"
            value={downloadLocation}
            onChange={(e) => setDownloadLocation(e.target.value)}
            error={errors.downloadLocation}
            placeholder="Enter asset name"
          />

          <FormField
            label="Enter Relative URL Only"
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter relative URL"
          />
        </>
      )}

      <Form.Group controlId="formZip">
        <Form.Label>Do you want to zip the content?</Form.Label>
        <Row>
          <Col>
            <Form.Check
              type="radio"
              label="Yes"
              name="zip"
              value={true}
              checked={isZipRequired === true}
              onChange={() => setIsZipRequired(true)}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              name="zip"
              value={false}
              checked={isZipRequired === false}
              onChange={() => setIsZipRequired(false)}
            />
          </Col>
        </Row>
      </Form.Group>

      <FormField
        label="Comments"
        as="textarea"
        rows={3}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Enter comments (optional)"
      />

      <Button type="submit" variant="primary" disabled={Object.keys(errors).length > 0}>
        Submit
      </Button>
    </Form>
  );
};

export default NewDownloadRequest;
```

### 9. **Main Application (App.js)**

Finally, update the `App.js` to bring everything together:

```javascript


import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NewDownloadRequest from './components/NewDownloadRequest';
import navConfig from './config/navConfig.json';

function App() {
  const [pageTitle, setPageTitle] = useState("New Download Request");

  const handleNavClick = (title) => {
    setPageTitle(title);
  };

  return (
    <div>
      <NavBar config={navConfig} onNavClick={handleNavClick} />
      <h1 className="text-center my-4">{pageTitle}</h1>
      {pageTitle === "New Download Request" && <NewDownloadRequest />}
      {/* Add other pages as needed */}
      <Footer />
    </div>
  );
}

export default App;
```

### Conclusion

This updated solution improves upon the previous code by incorporating:

1. **Modularization**: The use of utility functions, a centralized API service, and reusable form components improves the structure and maintainability of the code.
2. **Error Handling**: The application now includes better error handling for API requests and form submissions.
3. **State Management**: The `useState` and `useEffect` hooks are utilized appropriately, with the potential to scale to more complex state management solutions if necessary.
4. **Styling**: Bootstrap is leveraged effectively to maintain a consistent and responsive UI.

This version is more maintainable, scalable, and better aligned with best practices for a React application.

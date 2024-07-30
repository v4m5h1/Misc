 #Misc

---
Certainly! I'll provide detailed step-by-step instructions to build a React data entry form named "SPO Site Downloader" using Bootstrap and React in Visual Studio Code. Let's break this down into manageable steps:

Step 1: Set up the project

1. Open Visual Studio Code.
2. Open a terminal within VS Code (View > Terminal).
3. Navigate to your desired project directory.
4. Create a new React project:
   ```
   npx create-react-app spo-site-downloader
   cd spo-site-downloader
   ```
5. Install necessary dependencies:
   ```
   npm install react-bootstrap bootstrap axios formik yup
   ```

Step 2: Set up the project structure

1. In the `src` folder, create the following structure:
   ```
   src/
   ├── components/
   │   ├── SiteUrlInput.js
   │   ├── AssetsCheckbox.js
   │   ├── ZipRadio.js
   │   ├── DownloadLocation.js
   │   └── SubmitButton.js
   ├── App.js
   ├── App.css
   └── index.js
   ```

Step 3: Set up the main App component

1. Open `src/App.js` and replace its content with:

```jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SiteUrlInput from './components/SiteUrlInput';
import AssetsCheckbox from './components/AssetsCheckbox';
import ZipRadio from './components/ZipRadio';
import DownloadLocation from './components/DownloadLocation';
import SubmitButton from './components/SubmitButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const validationSchema = Yup.object().shape({
  siteUrl: Yup.string().url('Invalid URL format').required('Site URL is required'),
  assets: Yup.array().min(1, 'At least one asset must be selected'),
  zipContent: Yup.boolean(),
  downloadLocation: Yup.string().required('Download location is required'),
});

function App() {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">SPO Site Downloader</h1>
          <p className="text-center mb-4">Download SharePoint Online site content easily</p>
          <Formik
            initialValues={{
              siteUrl: '',
              assets: [],
              zipContent: false,
              downloadLocation: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <SiteUrlInput />
                <AssetsCheckbox />
                <ZipRadio />
                <DownloadLocation />
                <SubmitButton isSubmitting={isSubmitting} />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
```

Step 4: Create subcomponents

1. Create `SiteUrlInput.js`:

```jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import axios from 'axios';

const SiteUrlInput = () => {
  const validateSiteUrl = async (value) => {
    if (!value) {
      return 'Site URL is required';
    }
    
    if (!/^https?:\/\/.+/.test(value)) {
      return 'Invalid URL format';
    }
    
    try {
      const response = await axios.get(`https://api.example.com/validate-url?url=${encodeURIComponent(value)}`);
      if (!response.data.exists) {
        return 'URL does not exist';
      }
    } catch (error) {
      return 'Error validating URL';
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="siteUrl">Site URL</Form.Label>
      <Field
        name="siteUrl"
        validate={validateSiteUrl}
      >
        {({ field, form }) => (
          <Form.Control
            {...field}
            type="text"
            id="siteUrl"
            placeholder="Enter site URL"
            isInvalid={form.errors.siteUrl && form.touched.siteUrl}
            aria-describedby="siteUrlFeedback"
          />
        )}
      </Field>
      <ErrorMessage name="siteUrl" component={Form.Control.Feedback} type="invalid" id="siteUrlFeedback" />
    </Form.Group>
  );
};

export default SiteUrlInput;
```

2. Create `AssetsCheckbox.js`:

```jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

const AssetsCheckbox = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Assets</Form.Label>
      <div>
        <Field name="assets" type="checkbox" value="all" as={Form.Check} label="All" id="asset-all" />
        <Field name="assets" type="checkbox" value="library" as={Form.Check} label="Library" id="asset-library" />
        <Field name="assets" type="checkbox" value="list" as={Form.Check} label="List" id="asset-list" />
        <Field name="assets" type="checkbox" value="folders" as={Form.Check} label="Folders" id="asset-folders" />
      </div>
      <ErrorMessage name="assets" component={Form.Text} className="text-danger" />
    </Form.Group>
  );
};

export default AssetsCheckbox;
```

3. Create `ZipRadio.js`:

```jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { Field } from 'formik';

const ZipRadio = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Do you want to zip the content?</Form.Label>
      <div>
        <Field name="zipContent" type="radio" value={false} as={Form.Check} label="No" id="zip-no" defaultChecked />
        <Field name="zipContent" type="radio" value={true} as={Form.Check} label="Yes" id="zip-yes" />
      </div>
    </Form.Group>
  );
};

export default ZipRadio;
```

4. Create `DownloadLocation.js`:

```jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

const DownloadLocation = () => {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="downloadLocation">Download Location</Form.Label>
      <Field name="downloadLocation">
        {({ field, form }) => (
          <Form.Control
            {...field}
            type="file"
            id="downloadLocation"
            webkitdirectory="true"
            directory="true"
            isInvalid={form.errors.downloadLocation && form.touched.downloadLocation}
            aria-describedby="downloadLocationFeedback"
          />
        )}
      </Field>
      <ErrorMessage name="downloadLocation" component={Form.Control.Feedback} type="invalid" id="downloadLocationFeedback" />
    </Form.Group>
  );
};

export default DownloadLocation;
```

5. Create `SubmitButton.js`:

```jsx
import React from 'react';
import { Button } from 'react-bootstrap';

const SubmitButton = ({ isSubmitting }) => {
  return (
    <Button variant="primary" type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </Button>
  );
};

export default SubmitButton;
```

Step 5: Update `src/App.css` for custom styling

```css
.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.is-invalid {
  border-color: #dc3545;
}

.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
```

Step 6: Update `public/index.html` for favicon and title

1. Add a favicon to your `public` folder (e.g., `favicon.ico`).
2. Open `public/index.html` and update the `<head>` section:

```html
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta
    name="description"
    content="SPO Site Downloader - Download SharePoint Online site content easily"
  />
  <title>SPO Site Downloader</title>
</head>
```

Step 7: Run and test the application

1. In the terminal, run:
   ```
   npm start
   ```
2. Open a web browser and navigate to `http://localhost:3000` to see your form.

This implementation creates a responsive, accessible, and visually appealing form using React and Bootstrap. It includes all the required fields with appropriate validations, error handling, and styling. The form is split into subcomponents for better maintainability, and it uses Formik for form management and Yup for validation.

Remember to replace the placeholder API URL in the `SiteUrlInput` component with your actual API endpoint for URL validation.

Would you like me to explain or break down any part of this code further?

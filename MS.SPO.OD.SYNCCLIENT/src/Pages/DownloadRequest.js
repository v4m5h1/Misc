import React from 'react';
import useFormFile from '../hooks/downloadFormValidation';
import { CustomRadioGroup } from '../CustomComponents/CustomRadio'; // Import your CustomRadioGroup component
import ToastMessage from '../CustomComponents/ToastMessage';
import apiConfig from '../config/apiConfig';
import assetOptions from '../config/assetsOptionsConfig.json';
import CustomInput from '../CustomComponents/CustomInput'; // Import your CustomInput component
import ToggleSwitch from '../CustomComponents/CustomToggle'; // Import your ToggleSwitch component
import CustomButton from '../CustomComponents/CustomButton';

const FormFile = () => {
  const {
    formData,
    setFormData,
    handleInputChange,
    handleGroupChange,
    handleSubmit,
    handleRadioChange,
    errors,
    showToast,
    setShowToast,
    toastMessage,
    loading,
    apiStatus,
    isFormValid,
  } = useFormFile(apiConfig);

  const isAssetsEnabled = assetOptions
    .filter((asset) => asset.addtlInfo)
    .map((asset) => asset.value)
    .includes(formData.selection);
  console.log(apiStatus)


  return (
    <div className={` ${apiStatus.success ? 'w-full flex ' : 'block'} ml-10 `}>
      <div className={`${apiStatus.success ? 'w-2/3 ml-5 float-left ' : ' my-2'} mx-6  rounded-xl`}>
        <div className="p-8 mt-10 mb-10 bg-white rounded-lg shadow-lg">
          <h4 className="text-3xl font-semibold text-center">Download Request</h4>

          <form onSubmit={handleSubmit}>
            <CustomInput
              label="Site URL"
              value={formData.siteURL || ''}
              onChange={handleInputChange}
              name="siteURL"
              error={errors.siteURL}
              placeholder="Enter Site URL"
            />

            <div className={`${isAssetsEnabled ? '' : 'mb-6'}`}>
              <CustomRadioGroup
                label={'Assets'}
                options={assetOptions}
                selectedValue={formData.selection}
                onChange={handleRadioChange}
                error={errors.selection}
              />

              {isAssetsEnabled &&
                formData.formGroups.map((group, index) => (
                  <div key={index} className="mb-6">
                    <CustomInput
                      label={`Enter ${formData.selection} Name`}
                      value={group.relativeURL || ''}
                      onChange={(e) => handleGroupChange(index, e)}
                      name={`relativeURLs[${index}]`}
                      error={errors[`relativeURLs[${index}]`]}
                      placeholder={`Enter ${formData.selection.toLowerCase()} name`}
                    />
                    <CustomInput
                      label={`Enter ${formData.selection} Relative URL`}
                      value={group.relativeURLName || ''}
                      onChange={(e) => handleGroupChange(index, e)}
                      name={`relativeURLName${index}`}
                      error={errors[`relativeURLName${index}`]}
                      placeholder={`Enter relative URL for ${formData.selection.toLowerCase()}`}
                    />
                  </div>
                ))}
            </div>

            <CustomInput
              label="Download Location"
              value={formData.downloadLocation || ''}
              onChange={handleInputChange}
              name="downloadLocation"
              error={errors.downloadLocation}
              placeholder="Enter location"
            />

            <div className="mb-6">
              <label>
                Do you want to zip the content? <span className="text-red-600">*</span>
              </label>
              <ToggleSwitch
                isChecked={formData.zipChecked || false}
                onToggle={() => setFormData({ ...formData, zipChecked: !formData.zipChecked })}
              />
            </div>

            <CustomInput
              label="Comment"
              value={formData.comment || ''}
              onChange={handleInputChange}
              name="comment"
              error={errors.comment}
              placeholder="Enter your comment"
            />


            <CustomButton
              disabled={loading || !isFormValid}
              type="submit"
              size='md'
              label="SUBMIT"
              variant={`${loading ? 'secondary' : 'primary'}`}
              block={false}
              customStyles={{ marginVertical: '10px' }}
            />

            <div className="mt-6 text-center">
              {apiStatus.message && (
                <span
                  className={`p-2 text-white ${apiStatus.success ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {apiStatus.success
                    ? 'Submitted Successfully. Review submitted information on screen.'
                    : 'Submission Failed. Review submitted information on screen.'}
                </span>
              )}
            </div>
          </form>

          <ToastMessage
            show={showToast}
            onClose={() => setShowToast(false)}
            message={toastMessage}
          />
        </div>
      </div>

      <div className={`${apiStatus.success ? 'w-1/3 mt-10 float-right ' : 'hidden'}`}>
        <pre className='flex flex-col'>
          <b>Information Submitted</b>



          <br />
          {apiStatus.success &&
            apiStatus.message &&
            JSON.parse(apiStatus.message) &&
            JSON.parse(apiStatus.message).siteDownloadRequestAssets
            ? JSON.stringify(
              JSON.parse(apiStatus.message).siteDownloadRequestAssets,
              null,
              2
            )
            : ''}
        </pre>
      </div>
    </div>
  );
};

export default FormFile;

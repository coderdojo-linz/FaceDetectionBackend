const classes = ['Webcam Picture']; //change if you add more classes

function getFaceImageUri(className, idx) {
  if (className === 'Webcam Picture' && idx === 1) {
    return `/images/${className}/${className}1.png`;
  } else if (className === 'Webcam Picture' && idx === 2) {
    return `/images/${className}/${className}2.png`;
  }
}

function renderFaceImageSelectList(selectListId, onChange, initialValue) {
  const indices = [1, 2];
  function renderChildren(select) {
    classes.forEach(className => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = className;
      select.appendChild(optgroup);
      indices.forEach(imageIdx =>
        renderOption(
          optgroup,
          `${className} ${imageIdx}`,
          getFaceImageUri(className, imageIdx)
        )
      )
    })
  }

  renderSelectList(
    selectListId,
    onChange,
    getFaceImageUri(initialValue.className, initialValue.imageIdx), renderChildren);
}

// fetch first image of each class and compute their descriptors
async function createBbtFaceMatcher(numImagesForTraining = 1) {
  const maxAvailableImagesPerClass = 2;
  numImagesForTraining = Math.min(numImagesForTraining, maxAvailableImagesPerClass);

  const labeledFaceDescriptors = await Promise.all(classes.map(
    async className => {
      const descriptors = [];
      for (let i = 1; i < (numImagesForTraining + 1); i++) {
        const img = await faceapi.fetchImage(getFaceImageUri(className, i));
        descriptors.push(await faceapi.computeFaceDescriptor(img));
      }

      return new faceapi.LabeledFaceDescriptors(className, descriptors);
    }
  ));
  return new faceapi.FaceMatcher(labeledFaceDescriptors);
}
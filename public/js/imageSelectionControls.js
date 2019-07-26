async function onSelectedImageChanged(uri) {
  const img = await faceapi.fetchImage(uri)
  $(`#inputImg`).get(0).src = img.src
  updateResults()
}

async function loadImageFromUrl(url) {
  const img = await requestExternalImage($('#imgUrlInput').val())
  $('#inputImg').get(0).src = img.src
  updateResults()
}

function renderImageSelectList(selectListId, onChange, initialValue, withFaceExpressionImages) {
  let images = [1, 2].map(idx => `bbt${idx}.jpg`) //change if you add more classes

  function renderChildren(select) {
    images.forEach(imageName =>
      renderOption(
        select,
        imageName,
        imageName
      )
    )
  }

  renderSelectList(
    selectListId,
    onChange,
    initialValue,
    renderChildren
  )
}

function initImageSelectionControls(initialValue = 'bbt1.jpg', withFaceExpressionImages = false) {
  renderImageSelectList(
    '#selectList',
    async (uri) => {
      await onSelectedImageChanged(uri)
    },
    initialValue,
    withFaceExpressionImages
  )
  onSelectedImageChanged($('#selectList select').val())
}
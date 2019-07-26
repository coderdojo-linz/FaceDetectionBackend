/*async function requestExternalImage(imageUrl) {
  const res = await fetch('fetch_external_image', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ imageUrl })
  })
  if (!(res.status < 400)) {
    console.error(res.status + ' : ' + await res.text());
    throw new Error('failed to fetch image from url: ' + imageUrl);
  }

  let blob;
  try {
    blob = await res.blob();
    return await faceapi.bufferToImage(blob);
  } catch (e) {
    console.error('received blob:', blob);
    console.error('error:', e);
    throw new Error('failed to load image from url: ' + imageUrl);
  }
}*/

function renderNavBar(navbarId, exampleUri) {
  const examples = [
    {
      uri: 'bbt_face_similarity',
      name: 'BBT Face Similarity'
    }
  ];

  const pageContainer = $('.page-container').get(0);

  const header = document.createElement('h3');
  header.innerHTML = examples.find(ex => ex.uri === exampleUri).name;
  pageContainer.insertBefore(header, pageContainer.children[0]);

  $('.button-collapse').sideNav({ menuWidth: 260 });
}

function renderSelectList(selectListId, onChange, initialValue, renderChildren) {
  const select = document.createElement('select');
  $(selectListId).get(0).appendChild(select);
  renderChildren(select);
  $(select).val(initialValue);
  $(select).on('change', (e) => onChange(e.target.value));
  $(select).material_select();
}

function renderOption(parent, text, value) {
  if (value !== undefined) {
    //creates option element and puts it into the list
    const option = document.createElement('option');
    option.innerHTML = text;
    option.value = value;
    parent.appendChild(option);
  }
}
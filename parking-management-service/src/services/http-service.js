const fetch = require('node-fetch');
const FormData = require('form-data');


async function getVehcleNo(file){
    let form = new FormData();
    form.append('file', file.data, {
        contentType: file.mimetype,
        name: 'file',
        filename: file.name,
      });
    const response = await fetch('https://httpbin.org/post', {method: 'POST', body: form});
    const data = await response.json();
    return data;
}

module.exports={
    getVehcleNo
}
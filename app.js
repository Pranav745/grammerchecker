var output = document.querySelector(".output");
var input = document.querySelector("#exampleDataList");
var btn = document.querySelector("#check-grammer");
const apiKey = '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'; // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const endpoint = 'https://api.openai.com/v1/completions'; // Replace 'https://api.openai.com/v1/your/endpoint' with the appropriate API endpoint URL provided by the OpenAI API documentation

// output.addEventListener("change", function () {
//     const textElement = document.querySelector('.output');
//     const words = textElement.textContent.split(' ');
//     textElement.output = ''; // Clear the text content

//     words.forEach((word, index) => {
//         const span = document.createElement('span');
//         span.output = word + ' ';
//         span.style.opacity = 0;
//         span.style.animation = `appear 0.5s ${index * 0.08}s forwards`;
//         textElement.appendChild(span);
//     });
// });


btn.addEventListener('click', function () {
    let data = input.value;
    const requestData = {
        prompt: `correct the grammer : ${data}`,
        model: 'gpt-3.5-turbo-instruct'
    };


    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) {
                console.log("Error occured");
                // throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {

            output.innerHTML = '';
            console.log('Response:' + JSON.stringify(data, null, 2));
            let jsonString = JSON.stringify(data.choices[0].text, null, 2);
            let cleanedString = jsonString.replace(/\\n/g, '');
            const words = cleanedString.split(' ');

            output.style.padding = '10px';

            output.innerHTML = 'Your Corrected sentence :\n';

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.opacity = 0;
                span.style.animation = `appear 0.5s ${index * 0.08}s forwards`;
                span.output = word;

                output.appendChild(span);
            });


        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            // Log additional information from the error object
            console.log('Error message:', error.message);
            console.log('Error stack:', error.stack);
            console.log('Response object:', error.response);
        });


});







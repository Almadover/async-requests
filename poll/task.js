const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

async function loadPoll() {
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
    const pollData = await response.json();
    pollTitle.innerText = pollData.data.title;

    pollData.data.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('poll__answer');
        button.innerText = answer;
        button.addEventListener('click', async () => {
            alert('Спасибо, ваш голос засчитан!');

            const voteData = `vote=${pollData.id}&answer=${index}`;

            const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: voteData
            });

            const result = await response.json();
            displayResults(result);
        });
        pollAnswers.appendChild(button);
    });
}

function displayResults(result) {
    let resultString = "<h2>Результаты голосования:</h2><ul>";
    result.stat.forEach(stat => {
        resultString += `<li>${stat.answer}: ${stat.votes} голосов</li>`;
    });
    resultString += "</ul>";
    document.body.innerHTML += resultString;
}

loadPoll();
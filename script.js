const { useState } = React;

const App = () => {
    const [numbersBefore, setNumbersBefore] = useState([]);
    const [numbersAfter, setNumbersAfter] = useState([]);
    const [average, setAverage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNumbers = async (numberId) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:3000/numbers/${numberId}`);
            const { numbersBefore, numbersAfter, average } = response.data;
            setNumbersBefore(numbersBefore);
            setNumbersAfter(numbersAfter);
            setAverage(average);
        } catch (error) {
            console.error('Failed to fetch numbers:', error);
            setError('Failed to fetch numbers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        React.createElement('div', { className: 'App' },
            React.createElement('h1', null, 'Average Calculator'),
            React.createElement('button', { onClick: () => fetchNumbers('p'), disabled: loading }, 'Fetch Prime Numbers'),
            React.createElement('button', { onClick: () => fetchNumbers('f'), disabled: loading }, 'Fetch Fibonacci Numbers'),
            React.createElement('button', { onClick: () => fetchNumbers('e'), disabled: loading }, 'Fetch Even Numbers'),
            React.createElement('button', { onClick: () => fetchNumbers('r'), disabled: loading }, 'Fetch Random Numbers'),

            React.createElement('h2', null, 'Numbers Before:'),
            React.createElement('p', null, numbersBefore.join(', ')),

            React.createElement('h2', null, 'Numbers After:'),
            React.createElement('p', null, numbersAfter.join(', ')),

            React.createElement('h2', null, 'Average:'),
            React.createElement('p', null, average),

            error && React.createElement('div', { className: 'error' }, error),
            loading && React.createElement('div', { className: 'loading' }, 'Loading...')
        )
    );
};

ReactDOM.render(React.createElement(App), document.getElementById('app'));

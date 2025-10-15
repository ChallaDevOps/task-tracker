import './setupTests';

describe('setupTests (jest-dom integration)', () => {
    test('toHaveTextContent matcher is registered', () => {
        const el = document.createElement('div');
        el.textContent = 'Hello React';
        expect(el).toHaveTextContent(/react/i);
    });

    test('toBeInTheDocument matcher is registered', () => {
        const el = document.createElement('span');
        el.textContent = 'present';
        document.body.appendChild(el);
        expect(el).toBeInTheDocument();
        document.body.removeChild(el);
    });
});
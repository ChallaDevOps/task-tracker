const React = require('react');

afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    document.body.innerHTML = '';
});

test('calls ReactDOM.createRoot with #root and renders <App/> inside StrictMode', () => {
    document.body.innerHTML = '<div id="root"></div>';

    const renderMock = jest.fn();
    const createRootMock = jest.fn(() => ({ render: renderMock }));
    const AppMock = () => null;

    jest.doMock('react-dom/client', () => ({ createRoot: createRootMock }));
    jest.doMock('./App', () => ({ __esModule: true, default: AppMock }));
    jest.doMock('./reportWebVitals', () => ({ __esModule: true, default: jest.fn() }));

    jest.isolateModules(() => {
        require('./index');
    });

    const rootEl = document.getElementById('root');
    expect(createRootMock).toHaveBeenCalledTimes(1);
    expect(createRootMock).toHaveBeenCalledWith(rootEl);

    expect(renderMock).toHaveBeenCalledTimes(1);
    const renderedElement = renderMock.mock.calls[0][0];
    expect(React.isValidElement(renderedElement)).toBe(true);
    expect(renderedElement.type).toBe(React.StrictMode);

    const child = renderedElement.props.children;
    expect(React.isValidElement(child)).toBe(true);
    expect(child.type).toBe(AppMock);
});

test('calls reportWebVitals once', () => {
    document.body.innerHTML = '<div id="root"></div>';

    const reportWebVitalsMock = jest.fn();
    const renderMock = jest.fn();
    jest.doMock('react-dom/client', () => ({ createRoot: () => ({ render: renderMock }) }));
    jest.doMock('./App', () => ({ __esModule: true, default: () => null }));
    jest.doMock('./reportWebVitals', () => ({ __esModule: true, default: reportWebVitalsMock }));

    jest.isolateModules(() => {
        require('./index');
    });

    expect(reportWebVitalsMock).toHaveBeenCalledTimes(1);
});
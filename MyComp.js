'use strict';

const e = React.createElement;

class MyComp extends React.Component {
    render() {
        return 'You liked this.';
    }
}

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
console.log(22222)
root.render(e('FilesComponent'));
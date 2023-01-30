'use strict';

const e = React.createElement;

class FilesComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

  render() {
//     if (this.state.liked) {
      return 'You liked this.';
//     }

    // return (
    //     <button onClick={() => this.setState({ liked: true })}>
    //     Нравится
    //   </button>
    // );
  }
}

const domContainer = document.querySelector('#app');
const root = ReactDOM.createRoot(domContainer);
console.log(22222)
root.render(e('FilesComponent'));
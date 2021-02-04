import './App.css';

function App() {

  let audio;
  let audioSource;

  let actualKeySet = new Set();
  actualKeySet.add('A');
  actualKeySet.add('S');
  actualKeySet.add('D');
  actualKeySet.add('F');
  actualKeySet.add('G');
  actualKeySet.add('H');
  actualKeySet.add('J');
  actualKeySet.add('W');
  actualKeySet.add('E');
  actualKeySet.add('T');
  actualKeySet.add('Z');
  actualKeySet.add('U');

  window.addEventListener('keydown', (event) => {
      if(actualKeySet.has(event.key.toUpperCase())) {
          audioSource = event.key.toUpperCase();
          audio = new Audio("http://www.piano-midi.de/mp3/albeniz/alb_esp1.mp3");
          audio.play();
      }
      else {
          console.log("This key won't play any tune!")
      }
  })


return (

<div className="container">
    <div className="white-keys">
        <kbd>A</kbd>
        <kbd>S</kbd>
        <kbd>D</kbd>
        <kbd>F</kbd>
        <kbd>G</kbd>
        <kbd>H</kbd>
        <kbd>J</kbd>
    </div>

    <div className="black-keys">
        <kbd className="key-u">U</kbd>
        <kbd className="key-y">Z</kbd>
        <kbd className="key-t">T</kbd>
        <kbd className="key-e">E</kbd>
        <kbd className="key-w">W</kbd>
    </div>

</div>

  );
  }

export default App;

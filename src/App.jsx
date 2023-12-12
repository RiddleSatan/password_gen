import "./App.css";
import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [allownum, setallownum] = useState(false);
  const [allowchar, setallowchar] = useState(false);
  const [password, setpassword] = useState("");
  const passref = useRef(null);

  const passgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allownum) {
      str += "0123456789";
    }
    if (allowchar) {
      str += "!@#$%^&*()";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, allownum, allowchar, setpassword]);

  const copytoclip = useCallback(() => {
    passref.current?.select()
    passref.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passgen();
  }, [length, allowchar, allownum, passgen]);
  return (
    <div className="bg-black w-full h-screen flex justify-center text-orange-400">
      <div className="w-1/3 h-28 flex flex-col   items-center rounded-xl  top-5  relative bg-gray-700">
        <h2 className="text-black ">Password-Generator</h2>
        <div className="my-2">
          <input
            type="text"
            className="rounded "
            readOnly
            ref={passref}
            value={password}
            placeholder="Your Password"
          />
          <button className="bg-blue-900 rounded w-14 " onClick={copytoclip}>
            Copy
          </button>
        </div>
        <div className="w-72 h-10 rounded-xl gap-1 flex justify-center items-center relative">
          <input
            className="w-72 h-10 bg-cyan-800 cursor-pointer"
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
          <input
            type="checkbox"
            defaultChecked={allownum}
            id="numberInput"
            onChange={() => {
              setallownum((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Number</label>
          <input
            type="checkbox"
            defaultChecked={allowchar}
            id="characterInput"
            onChange={() => {
              setallowchar((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;

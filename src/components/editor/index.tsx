import React, { useEffect, useRef } from 'react';

const Editor = () => {
  const p = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    p.current!.innerText = '';
    p.current!.parentElement!.onblur = () => {
      p.current!.parentElement!.style.visibility = 'hidden';
    };
  }, []);

  const handleInput = () => {
    console.log(p.current?.textContent);
  };

  return (
    <div className="editor-container">
      <div id="editor" className="editor" contentEditable="true" suppressContentEditableWarning={true}>
        <p ref={p} onInput={handleInput}></p>
      </div>
    </div>
  );
};

export default Editor;

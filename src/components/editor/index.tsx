import React, { FC, useEffect, useRef } from 'react';

interface EditorProps {
  id: number | null;
}

const Editor: FC<EditorProps> = (props) => {
  const { id } = props;
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
      </div>{id}
    </div>
  );
};

export default Editor;

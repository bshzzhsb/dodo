import React, { FC, useRef, useState } from 'react';

import Todo from '@/components/todo';
import Editor from '@/components/editor';
import { DodoProps } from '@/svg-components';
import { svg } from '@/constants/namespace';

import './index.less';

const todoList: DodoProps[] = [
  {
    id: 0,
    content: 'complete todo & done timeline development',
    startTime: new Date(),
  },
  {
    id: 1,
    content: 'complete todo & done timeline development1',
    startTime: new Date(),
  },
  {
    id: 2,
    content: 'complete todo & done timeline development2',
    startTime: new Date(),
  },
];

const Home: FC = () => {
  const dodo = useRef<HTMLDivElement>(null);
  const [id, setId] = useState<number | null>(null);

  const onDblclick = (id: number) => {
    setId(id);
  }

  return (
    <div className="home">
      <div ref={dodo} className="dodo-container">
        <svg id="dodo" width="100%" height="100%" xmlns={svg}>
          <Todo todoList={todoList} onDblclick={onDblclick} />
        </svg>
        <Editor id={id} />
      </div>
    </div>
  );
};

export default Home;

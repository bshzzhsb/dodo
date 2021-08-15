import React, { FC, useEffect, useRef } from 'react';

import Todo from '@/components/todo';
import Editor from '@/components/editor';
import Dodo, { DodoProps } from '@/svg-components';
import { SVG_XMLNS } from '@/constants/svg';

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

  useEffect(() => {
    // const todoList: DodoProps[] = [
    //   {
    //     id: 0,
    //     content: 'complete todo & done timeline development',
    //     startTime: new Date(),
    //   },
    //   {
    //     id: 1,
    //     content: 'complete todo & done timeline development1',
    //     startTime: new Date(),
    //   },
    //   {
    //     id: 2,
    //     content: 'complete todo & done timeline development2',
    //     startTime: new Date(),
    //   },
    // ];
    // Dodo.init(dodo.current!.firstChild as SVGElement, todoList);
  });

  return (
    <div className="home">
      <div ref={dodo} className="dodo-container">
        <svg id="dodo" width="100%" height="100%" xmlns={SVG_XMLNS}>
          <Todo todoList={todoList} />
        </svg>
        <Editor />
      </div>
    </div>
  );
};

export default Home;

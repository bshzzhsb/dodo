import React, { FC, useEffect, useRef } from 'react';

import dodo from '@/svg-components';
import { getTranslate } from '@/utils/style';
import { toEven } from '@/utils/number';
import { DodoProps } from '@/schema/dodo';

interface TodoProps {
  todoList: DodoProps[];
}

const Todo: FC<TodoProps> = (props) => {
  const { todoList } = props;
  const todo = useRef<SVGGElement>(null);

  useEffect(() => {
    dodo.createDodoTimeline(todoList);
  });

  // const createDodo = (dodoList: DodoProps[]) => {
  //   dodoList.forEach((dodo, i) => {
  //     const hiddenSpan = document.getElementById('#hidden-span') as HTMLSpanElement;
  //     hiddenSpan.innerText = dodo.content;
  //     let { width } = hiddenSpan.getBoundingClientRect();
  //     width = toEven(width);
  //     const g = document.createElement('g');
  //     g.style.transform = `translate(0, ${64 * i})`;

  //     const path = document.createElement('path');
  //     path.setAttribute('d', drawOutline(width));
  //     path.setAttribute('stroke', '#ffffff');
  //     path.setAttribute('stroke-width', '1');
  //     path.setAttribute('stroke-dasharray', 'true');
  //     path.setAttribute('fill', '#ffffff');
  //     g.appendChild(path);

  //     const foreignObject = document.createElement('g');

  //     g.ondblclick = function (e: Event) {
  //       e.stopPropagation();
  //       e.preventDefault();
  //       const translate = getTranslate(g.style.transform);
  //       const todoTranslate = getTranslate(todo.current!.style.transform);
  //       const editor = document.getElementById('editor') as HTMLDivElement;
  //       editor.style.left = `${translate[0] + todoTranslate[0] - 8}px`;
  //       editor.style.right = `${translate[1] + todoTranslate[1] - 15}px}`;
  //       editor.style.visibility = 'visible';
  //       (editor.children[0] as HTMLParagraphElement).innerText = g.innerText;
  //       document.getElementById('editor')!.focus();
  //       document.execCommand('selectAll', false);
  //     };
  //     todo.current!.append(g);
  //   });
  // };

  // const drawOutline = (w: number, h: number = 46) => {
  //   const halfH = h / 2;
  //   return `M 0 -${halfH} h ${w} a ${halfH} ${halfH} 0 0 1 0 ${h} h -${w} a ${halfH} ${halfH} 0 0 1 0 -${h} z`;
  // }

  return <g ref={todo} id="todo"></g>;
};

export default Todo;

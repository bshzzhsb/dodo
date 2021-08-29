import React, { FC, useEffect, useRef } from 'react';

import dodo from '@/svg-components';
import { DodoProps } from '@/schema/dodo';

interface TodoProps {
  todoList: DodoProps[];
  onDblclick: (id: number) => void;
}

const Todo: FC<TodoProps> = (props) => {
  const { todoList, onDblclick } = props;
  const todo = useRef<SVGGElement>(null);

  useEffect(() => {
    dodo.createDodoTimeline(todoList, onDblclick);
  });

  return <g ref={todo} id="todo"></g>;
};

export default Todo;

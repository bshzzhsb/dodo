import * as d3 from 'd3';

import { getTranslate } from '@/utils/style';
import { toEven } from '@/utils/number';
import { select } from '@/utils/dom';

export interface DodoProps {
  id: number;
  content: string;
  startTime: Date;
  endTime?: Date;
  deadline?: Date;
}

class Dodo {
  createDodoTimeline(dodoList: DodoProps[]) {
    const dodo = select('#dodo');
    const todo = select('#todo');
    dodo
      .on('wheel', (e) => {
        d3.select('#editor').style('visibility', 'hidden');
        const translate = getTranslate(todo.style('transform'));
        todo.attr('transform', `translate(${translate[0] - e.deltaX}, ${translate[1] - e.deltaY})`);
      })
      .select('g')
      .attr('transform', `translate(0, 0)`);
    dodo.on('mousedown', () => {
      // d3.select('#editor').style('visibility', 'hidden');
      dodo.on('mousemove', (moveEvent) => {
        const translate = getTranslate(todo.style('transform'));
        const { movementX, movementY } = moveEvent;
        todo.attr('transform', `translate(${translate[0] + movementX}, ${translate[1] + movementY})`);
      });
      dodo.on('mouseup', () => {
        dodo.on('mousemove', null);
      });
    });
    // d3.select('.dodo-container')
    //   .append('div')
    //   .attr('class', 'editor-container')
    //   .append('div')
    //   .attr('class', 'editor blank')
    //   .attr('id', 'editor')
    //   .attr('contenteditable', true)
    //   .append('p')
    //   .text('');

    d3.select('body')
      .append('span')
      .attr('id', 'hidden-span')
      .style('position', 'absolute')
      .style('white-space', 'nowrap')
      .style('visibility', 'hidden');

    dodoList.forEach((dodo, i) => {
      this.createDodo(dodo, i);
    });
    const { width: dodoWidth, height: dodoHeight } = (dodo.node() as SVGElement).getBoundingClientRect();
    const { width: todoWidth, height: todoHeight } = (todo.node() as SVGGElement).getBBox();
    todo.attr(
      'transform',
      `translate(${toEven((dodoWidth - todoWidth) / 2)}, ${toEven((dodoHeight - todoHeight) / 2)})`
    );
  }

  createDodo(dodo: DodoProps, i: number) {
    let { width } = (d3.select('#hidden-span').text(dodo.content).node() as HTMLSpanElement).getBoundingClientRect();
    width = toEven(width);
    const g = d3
      .select('#todo')
      .append('g')
      .attr('transform', `translate(0, ${64 * i})`);
    g.on('dblclick', function (e) {
      e.stopPropagation();
      e.preventDefault();
      const translate = getTranslate(g.style('transform'));
      const todoTranslate = getTranslate(d3.select('#todo').style('transform'));
      console.log(e);
      d3.select('#editor')
        .style('left', `${translate[0] + todoTranslate[0] - 8}px`)
        .style('top', `${translate[1] + todoTranslate[1] - 15}px`)
        .style('visibility', 'visible')
        .select('p')
        .text(g.text());
      document.getElementById('editor')!.focus();
      document.execCommand('selectAll', false);
      console.log(this);
    });
    g.append('path')
      .attr('stroke', '#ffffff')
      .attr('fill', '#ffffff')
      .attr('d', this.drawOutline(width))
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', true);
    g.append('g')
      .attr('transform', `translate(0, -11)`)
      .append('foreignObject')
      .attr('width', width)
      .attr('height', 22)
      .append('xhtml:div')
      .attr('class', 'todo-item-container')
      .append('p')
      .attr('class', 'todo-item')
      .text(dodo.content);
  }

  drawOutline(w: number, h: number = 46) {
    const halfH = h / 2;
    return `M 0 -${halfH} h ${w} a ${halfH} ${halfH} 0 0 1 0 ${h} h -${w} a ${halfH} ${halfH} 0 0 1 0 -${h} z`;
  }
}

export default new Dodo();

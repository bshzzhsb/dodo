import { getTransform, generateTransform } from '@/utils/style';
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
  createDodoTimeline(dodoList: DodoProps[], onDblclick: (id: number) => void) {
    const dodo = select('#dodo');
    const todo = select('#todo');
    dodo
      .on('wheel', (e: WheelEvent) => {
        if (e.ctrlKey) {
          const { scale, skew, translate } = getTransform(todo.style('transform'));
          if (e.deltaY !== 0) {
            const deltaScale = e.deltaY < 0 ? (scale[0] > 0.1 ? -0.1 : 0) : 0.1;
            todo.style('transform', generateTransform([scale[0] + deltaScale, scale[1] + deltaScale], skew, translate));
          }
        } else {
          select('#editor').style('visibility', 'hidden');
          const { scale, skew, translate } = getTransform(todo.style('transform'));
          todo.style('transform', generateTransform(scale, skew, [translate[0] - e.deltaX, translate[1] - e.deltaY]));
        }
      })
      .select('g')
      .style('transform', `matrix(1, 0, 0, 1, 0, 0)`);
    dodo.on('mousedown', () => {
      const handleMoveEvent = (moveEvent: MouseEvent) => {
        const { scale, skew, translate } = getTransform(todo.style('transform'));
        const { movementX, movementY } = moveEvent;
        [translate[0], translate[1]] = [translate[0] + movementX, translate[1] + movementY];
        todo.style(
          'transform',
          `matrix(${scale[0]},  ${skew[0]}, ${skew[1]}, ${scale[1]}, ${translate[0]}, ${translate[1]})`
        );
      };
      dodo.on('mousemove', handleMoveEvent);
      dodo.on('mouseup', () => {
        dodo.off('mousemove', handleMoveEvent);
      });
    });

    select('body')
      .append('span')
      .attr('id', 'hidden-span')
      .style('position', 'absolute')
      .style('whiteSpace', 'nowrap')
      .style('visibility', 'hidden');

    dodoList.forEach((dodo, i) => {
      this.createDodo(dodo, i, onDblclick);
    });
    const { width: dodoWidth, height: dodoHeight } = dodo.selection.getBoundingClientRect();
    const { width: todoWidth, height: todoHeight } = (todo.selection as SVGGElement).getBBox();
    todo.style(
      'transform',
      generateTransform([1, 1], [0, 0], [toEven((dodoWidth - todoWidth) / 2), toEven((dodoHeight - todoHeight) / 2)])
    );
  }

  createDodo(dodo: DodoProps, i: number, onDblclick: (id: number) => void) {
    let { width } = select('#hidden-span').text(dodo.content).selection.getBoundingClientRect();
    width = toEven(width);
    const g = select('#todo')
      .append('g')
      .style('transform', `translate(0, ${64 * i}px)`);
    g.on('dblclick', function (e) {
      onDblclick(dodo.id);
      e.stopPropagation();
      e.preventDefault();
      const { translate } = getTransform(g.style('transform'));
      const { translate: todoTranslate } = getTransform(select('#todo').style('transform'));
      console.log(e);
      select('#editor')
        .style('left', `${translate[0] + todoTranslate[0] - 8}px`)
        .style('top', `${translate[1] + todoTranslate[1] - 15}px`)
        .style('visibility', 'visible')
        .select('p')
        .text(g.text());
      document.getElementById('editor')!.focus();
      document.execCommand('selectAll', false);
    });
    g.append('path')
      .attr('stroke', '#ffffff')
      .attr('fill', '#ffffff')
      .attr('d', this.drawOutline(width))
      .attr('stroke-width', '1')
      .attr('stroke-dasharray', 'true');
    g.append('g')
      .style('transform', `translate(0, -11px)`)
      .append('foreignObject')
      .attr('width', `${width}`)
      .attr('height', '22')
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

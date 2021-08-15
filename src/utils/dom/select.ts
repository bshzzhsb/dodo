interface CSSStyle {
  fontSize: string;
  transform: string;
}

type ValueOf<T> = T[keyof T];

class NodeSelect {
  private selection: HTMLElement | SVGElement;

  constructor(selector: string | HTMLElement | SVGElement) {
    if (typeof selector === 'string') {
      this.selection = document.querySelector(selector) ?? document.createElement('div');
    } else {
      this.selection = selector;
    }
  }

  on(eventType: string, listener: (e: any) => void): NodeSelect {
    this.selection.addEventListener(eventType, listener);
    return this;
  }

  off(eventType: string, listener: () => void): NodeSelect {
    this.selection.removeEventListener(eventType, listener);
    return this;
  }

  append(tagName: string, returnChild: boolean = true): NodeSelect {
    const node = document.createElement(tagName);
    this.selection.append(node);
    return returnChild ? new NodeSelect(node) : this;
  }

  style(styleName: keyof CSSStyle): string;
  style(styleName: keyof CSSStyle, value: string): NodeSelect;
  style(styleName: keyof CSSStyle, value?: string): NodeSelect | string {
    if (value === undefined) {
      return this.selection.style[styleName];
    } else {
      this.selection.style[styleName] = value;
      return this;
    }
  }

  attr(key: string, value?: string): NodeSelect | string {
    if (typeof value !== 'undefined') {
      this.selection.setAttribute(key, value);
      return this;
    } else {
      return this.selection.getAttribute(key)!;
    }
  }

  text(content?: string): NodeSelect | string {
    if (typeof content !== 'undefined') {
      this.selection.textContent = content;
      return this;
    } else {
      return this.selection.textContent ?? '';
    }
  }

  select(selector: string): NodeSelect {
    return new NodeSelect(
      (this.selection.querySelector(selector) ?? document.createElement('div')) as HTMLElement | SVGElement
    );
  }
}

export function select(selector: string): NodeSelect {
  return new NodeSelect(selector);
}

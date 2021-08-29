import { namespace } from '@/utils/namespace';
import { xhtml } from '@/constants/namespace';

interface CSSStyle {
  fontSize: string;
  transform: string;
  visibility: string;
  position: string;
  whiteSpace: string;
  left: string;
  top: string;
}

type Node = HTMLElement | SVGElement;

class NodeSelect {
  selection: Node;

  constructor(selector: string | Node) {
    if (typeof selector === 'string') {
      this.selection = document.querySelector(selector) ?? document.createElement('div');
    } else {
      this.selection = selector;
    }
  }

  append(tagName: string, returnChild: boolean = true): NodeSelect {
    const document = this.selection.ownerDocument,
      uri = this.selection.namespaceURI;
    const fullName = namespace(tagName);
    let node = null;
    if (fullName.namespace !== undefined) {
      node = document.createElementNS(fullName.namespace, tagName);
    } else {
      node =
        uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(tagName)
          : document.createElementNS(uri, tagName);
    }
    this.selection.append(node);
    return returnChild ? new NodeSelect(node as Node) : this;
  }

  on(eventType: string, listener: (e: any) => void): NodeSelect {
    this.selection.addEventListener(eventType, listener);
    return this;
  }

  off(eventType: string, listener: (e: any) => void): NodeSelect {
    this.selection.removeEventListener(eventType, listener);
    return this;
  }

  style(styleName: keyof CSSStyle): string;
  style(styleName: keyof CSSStyle, value: string): NodeSelect;
  style(styleName: keyof CSSStyle, value?: string): NodeSelect | string {
    if (value === undefined) {
      return (
        this.selection.ownerDocument.defaultView?.getComputedStyle(this.selection).getPropertyValue(styleName) ?? ''
      );
    } else {
      this.selection.style.setProperty(styleName, value);
      return this;
    }
  }

  attr(key: string): string;
  attr(key: string, value: string): NodeSelect;
  attr(key: string, value?: string): NodeSelect | string {
    if (value === undefined) {
      return this.selection.getAttribute(key)!;
    } else {
      this.selection.setAttribute(key, value);
      return this;
    }
  }

  text(): string;
  text(content: string): NodeSelect;
  text(content?: string): NodeSelect | string {
    if (content === undefined) {
      return this.selection.textContent ?? '';
    } else {
      this.selection.textContent = content;
      return this;
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
